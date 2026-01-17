"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface Holding {
  id: string;
  name: string;
  category: string;
  value: string;
}

interface SnapshotHolding {
  name: string;
  category: string;
  value: number;
}

interface Snapshot {
  id: string;
  label: string;
  createdAt: string;
  holdings: SnapshotHolding[];
}

const SNAPSHOT_STORAGE_KEY = "portfolio-calculator-snapshots";

const COLORS = [
  "#0ea5e9",
  "#22c55e",
  "#f97316",
  "#a855f7",
  "#ef4444",
  "#14b8a6",
  "#eab308",
  "#6366f1",
  "#06b6d4",
  "#84cc16",
];

function parseNumber(value: string): number {
  const n = parseFloat(value);
  if (Number.isNaN(n) || !Number.isFinite(n) || n < 0) return 0;
  return n;
}

function loadSnapshots(): Snapshot[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SNAPSHOT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as Snapshot[];
  } catch {
    return [];
  }
}

function saveSnapshots(snapshots: Snapshot[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SNAPSHOT_STORAGE_KEY, JSON.stringify(snapshots));
  } catch {
  }
}

function formatCurrency(value: number) {
  if (!Number.isFinite(value)) return "-";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(date: string) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleString();
}

export function PortfolioCalculator() {
  const [holdings, setHoldings] = useState<Holding[]>([
    { id: "1", name: "S&P 500 ETF", category: "Index", value: "60000" },
    { id: "2", name: "China A-shares", category: "Equity", value: "30000" },
    { id: "3", name: "Cash", category: "Cash", value: "10000" },
  ]);
  const [snapshots, setSnapshots] = useState<Snapshot[]>(() => loadSnapshots());
  const [snapshotLabel, setSnapshotLabel] = useState("");
  const [selectedA, setSelectedA] = useState<string | null>(() => {
    const initial = loadSnapshots();
    if (initial.length > 0) {
      return initial[0].id;
    }
    return null;
  });
  const [selectedB, setSelectedB] = useState<string | null>(() => {
    const initial = loadSnapshots();
    if (initial.length > 1) {
      return initial[initial.length - 1].id;
    }
    return null;
  });

  useEffect(() => {
    saveSnapshots(snapshots);
  }, [snapshots]);

  useEffect(() => {
    let cancelled = false;

    const fetchSnapshots = async () => {
      try {
        const response = await fetch("/api/portfolio-snapshots");
        if (!response.ok) {
          return;
        }
        const json = await response.json();
        if (cancelled) return;
        const remoteSnapshots = (json.snapshots ?? []) as Snapshot[];
        if (remoteSnapshots.length === 0) {
          return;
        }
        setSnapshots(remoteSnapshots);
        if (!selectedA && remoteSnapshots.length > 0) {
          setSelectedA(remoteSnapshots[0].id);
        }
        if (!selectedB && remoteSnapshots.length > 1) {
          setSelectedB(remoteSnapshots[remoteSnapshots.length - 1].id);
        }
      } catch {
      }
    };

    fetchSnapshots();

    return () => {
      cancelled = true;
    };
  }, [selectedA, selectedB]);

  const totalValue = useMemo(() => {
    return holdings.reduce((sum, h) => sum + parseNumber(h.value), 0);
  }, [holdings]);

  const chartData = useMemo(() => {
    if (totalValue <= 0) return [];
    return holdings
      .map((h) => {
        const v = parseNumber(h.value);
        if (v <= 0) return null;
        return {
          name: h.name || "Unnamed",
          value: v,
          percentage: (v / totalValue) * 100,
        };
      })
      .filter(Boolean) as Array<{ name: string; value: number; percentage: number }>;
  }, [holdings, totalValue]);

  const canSaveSnapshot = totalValue > 0 && holdings.some((h) => parseNumber(h.value) > 0 && h.name.trim().length > 0);

  const handleHoldingChange = (id: string, field: keyof Holding, value: string) => {
    setHoldings((prev) =>
      prev.map((h) => (h.id === id ? { ...h, [field]: value } : h)),
    );
  };

  const handleAddRow = () => {
    const nextId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setHoldings((prev) => [
      ...prev,
      { id: nextId, name: "", category: "", value: "" },
    ]);
  };

  const handleRemoveRow = (id: string) => {
    setHoldings((prev) => prev.filter((h) => h.id !== id));
  };

  const handleSaveSnapshot = async () => {
    if (!canSaveSnapshot) return;
    const now = new Date();
    const label =
      snapshotLabel.trim().length > 0
        ? snapshotLabel.trim()
        : `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
            now.getDate(),
          ).padStart(2, "0")}`;

    const preparedHoldings: SnapshotHolding[] = holdings
      .map((h) => {
        const v = parseNumber(h.value);
        if (v <= 0 || h.name.trim().length === 0) return null;
        return {
          name: h.name.trim(),
          category: h.category.trim() || "Uncategorized",
          value: v,
        };
      })
      .filter(Boolean) as SnapshotHolding[];

    const localSnapshot: Snapshot = {
      id: `${now.getTime()}-${Math.random().toString(16).slice(2)}`,
      label,
      createdAt: now.toISOString(),
      holdings: preparedHoldings,
    };

    try {
      const response = await fetch("/api/portfolio-snapshots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label,
          holdings: preparedHoldings,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        const savedSnapshot = (json.snapshot as Snapshot) ?? localSnapshot;
        setSnapshots((prev) => [...prev, savedSnapshot]);
        if (!selectedA) setSelectedA(savedSnapshot.id);
        else if (!selectedB) setSelectedB(savedSnapshot.id);
      } else {
        setSnapshots((prev) => [...prev, localSnapshot]);
        if (!selectedA) setSelectedA(localSnapshot.id);
        else if (!selectedB) setSelectedB(localSnapshot.id);
      }
    } catch {
      setSnapshots((prev) => [...prev, localSnapshot]);
      if (!selectedA) setSelectedA(localSnapshot.id);
      else if (!selectedB) setSelectedB(localSnapshot.id);
    }

    setSnapshotLabel("");
  };

  const snapshotA = snapshots.find((s) => s.id === selectedA) || null;
  const snapshotB = snapshots.find((s) => s.id === selectedB) || null;

  const buildSnapshotChartData = (snapshot: Snapshot | null) => {
    if (!snapshot) return [];
    const total = snapshot.holdings.reduce((sum, h) => sum + h.value, 0);
    if (total <= 0) return [];
    return snapshot.holdings.map((h) => ({
      name: h.name,
      value: h.value,
      percentage: (h.value / total) * 100,
    }));
  };

  const snapshotDataA = useMemo(() => buildSnapshotChartData(snapshotA), [snapshotA]);
  const snapshotDataB = useMemo(() => buildSnapshotChartData(snapshotB), [snapshotB]);

  return (
    <div className="space-y-8">
      <div className="card p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight mb-2">
          当前持仓输入
        </h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          按照当前市值填写每一类资产，这样可以看到整体资产配置比例。
        </p>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="min-w-full border-separate border-spacing-y-2 px-4 sm:px-0">
            <thead>
              <tr className="text-xs text-[var(--muted)]">
                <th className="text-left px-4 py-2">资产名称</th>
                <th className="text-left px-4 py-2 hidden sm:table-cell">类别</th>
                <th className="text-left px-4 py-2">当前市值 (USD)</th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody>
              {holdings.map((h) => (
                <tr key={h.id}>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={h.name}
                      onChange={(e) =>
                        handleHoldingChange(h.id, "name", e.target.value)
                      }
                      placeholder="例如 S&P 500 ETF"
                      className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                    />
                  </td>
                  <td className="px-4 py-2 hidden sm:table-cell">
                    <input
                      type="text"
                      value={h.category}
                      onChange={(e) =>
                        handleHoldingChange(h.id, "category", e.target.value)
                      }
                      placeholder="股票 / 债券 / 现金"
                      className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      inputMode="decimal"
                      value={h.value}
                      onChange={(e) =>
                        handleHoldingChange(h.id, "value", e.target.value)
                      }
                      placeholder="0"
                      min="0"
                      className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                    />
                  </td>
                  <td className="px-4 py-2 text-right align-middle">
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(h.id)}
                      className="text-xs text-[var(--muted)] hover:text-red-500"
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleAddRow}
            className="btn btn-ghost text-sm"
          >
            + 添加一行
          </button>
          <div className="text-sm text-[var(--muted)]">
            当前总市值约为{" "}
            <span className="font-semibold text-[var(--foreground)]">
              {formatCurrency(totalValue)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight mb-2">
            当前资产配置
          </h2>
          <p className="text-sm text-[var(--muted)] mb-4">
            饼图展示每一类资产在总体中的占比，帮助你快速判断是否符合目标配置。
          </p>

          {chartData.length === 0 ? (
            <div className="rounded-lg border border-dashed border-black/10 p-6 text-sm text-[var(--muted)]">
              请先在上方输入持仓数据（至少一项市值大于 0）。
            </div>
          ) : (
            <div className="h-[260px] sm:h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius="80%"
                    label={(entry) =>
                      `${entry.name} ${entry.percentage.toFixed(1)}%`
                    }
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(
                      value: number | string,
                      _name: string,
                      payload: { payload?: { percentage?: number } },
                    ) => {
                      const v =
                        typeof value === "number" ? value : Number(value);
                      const p =
                        typeof payload?.payload?.percentage === "number"
                          ? payload.payload.percentage
                          : 0;
                      return [
                        `${formatCurrency(v)} (${p.toFixed(1)}%)`,
                        "市值",
                      ];
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="card p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight mb-2">
            保存配置快照
          </h2>
          <p className="text-sm text-[var(--muted)] mb-4">
            当你在年初、年中或任何重要时间点时，点击保存快照，后面就可以对比不同时间的资产比例，比如“年初 vs 年末”。
          </p>

          <div className="space-y-3">
            <input
              type="text"
              value={snapshotLabel}
              onChange={(e) => setSnapshotLabel(e.target.value)}
              placeholder="例如：2025 年初、2025 年末、加仓后"
              className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
            />
            <button
              type="button"
              onClick={handleSaveSnapshot}
              disabled={!canSaveSnapshot}
              className={`btn btn-primary w-full text-sm ${
                !canSaveSnapshot ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              保存当前配置为快照
            </button>
          </div>

          {snapshots.length > 0 ? (
            <div className="mt-6 space-y-3">
              <div className="flex flex-wrap gap-3">
                <div className="flex-1 min-w-[140px]">
                  <label className="block text-xs font-medium mb-1">
                    快照 A（例如：年初）
                  </label>
                  <select
                    value={selectedA ?? ""}
                    onChange={(e) =>
                      setSelectedA(e.target.value || null)
                    }
                    className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                  >
                    <option value="">未选择</option>
                    {snapshots.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 min-w-[140px]">
                  <label className="block text-xs font-medium mb-1">
                    快照 B（例如：年末）
                  </label>
                  <select
                    value={selectedB ?? ""}
                    onChange={(e) =>
                      setSelectedB(e.target.value || null)
                    }
                    className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                  >
                    <option value="">未选择</option>
                    {snapshots.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-xs font-semibold text-[var(--muted)] mb-1">
                    快照 A
                  </div>
                  {snapshotDataA.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-black/10 p-3 text-xs text-[var(--muted)]">
                      选择一个快照后，这里会展示对应时间点的资产配置。
                    </div>
                  ) : (
                    <div className="h-[220px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={snapshotDataA}
                            dataKey="value"
                            nameKey="name"
                            outerRadius="80%"
                            label={(entry) =>
                              `${entry.name} ${entry.percentage.toFixed(1)}%`
                            }
                          >
                            {snapshotDataA.map((entry, index) => (
                              <Cell
                                key={entry.name}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(
                              value: number | string,
                              _name: string,
                              payload: { payload?: { percentage?: number } },
                            ) => {
                              const v =
                                typeof value === "number"
                                  ? value
                                  : Number(value);
                              const p =
                                typeof payload?.payload?.percentage === "number"
                                  ? payload.payload.percentage
                                  : 0;
                              return [
                                `${formatCurrency(v)} (${p.toFixed(1)}%)`,
                                "市值",
                              ];
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                  {snapshotA && (
                    <div className="mt-1 text-[10px] text-[var(--muted)]">
                      保存时间：{formatDate(snapshotA.createdAt)}
                    </div>
                  )}
                </div>

                <div>
                  <div className="text-xs font-semibold text-[var(--muted)] mb-1">
                    快照 B
                  </div>
                  {snapshotDataB.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-black/10 p-3 text-xs text-[var(--muted)]">
                      选择另一个快照，就可以和左边对比，比如“年初 vs 年末”。
                    </div>
                  ) : (
                    <div className="h-[220px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={snapshotDataB}
                            dataKey="value"
                            nameKey="name"
                            outerRadius="80%"
                            label={(entry) =>
                              `${entry.name} ${entry.percentage.toFixed(1)}%`
                            }
                          >
                            {snapshotDataB.map((entry, index) => (
                              <Cell
                                key={entry.name}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(
                              value: number | string,
                              _name: string,
                              payload: { payload?: { percentage?: number } },
                            ) => {
                              const v =
                                typeof value === "number"
                                  ? value
                                  : Number(value);
                              const p =
                                typeof payload?.payload?.percentage === "number"
                                  ? payload.payload.percentage
                                  : 0;
                              return [
                                `${formatCurrency(v)} (${p.toFixed(1)}%)`,
                                "市值",
                              ];
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                  {snapshotB && (
                    <div className="mt-1 text-[10px] text-[var(--muted)]">
                      保存时间：{formatDate(snapshotB.createdAt)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-lg border border-dashed border-black/10 p-4 text-xs text-[var(--muted)]">
              目前还没有任何快照。建议在每年年初、年末各保存一次，这样可以清楚看到资产配置如何随时间变化。
            </div>
          )}
        </div>
      </div>

      <div className="card p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight mb-3">
          使用建议
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-[var(--muted)]">
          <p>
            这个持仓计算器不会把你的数据上传到服务器，所有持仓和历史快照都只保存在浏览器本地的
            localStorage 中。
          </p>
          <p>
            如果你更换浏览器、清理浏览数据或换电脑，这些记录会丢失。如果需要长期记录，可以定期导出截图，或者后续接入云端存储服务。
          </p>
        </div>
      </div>
    </div>
  );
}

