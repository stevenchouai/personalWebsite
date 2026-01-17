import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

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

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase environment variables are not configured");
  }

  return createClient(url, key);
}

const DEFAULT_USER_ID = "default";

export async function GET() {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("portfolio_snapshots")
      .select("*")
      .eq("user_id", DEFAULT_USER_ID)
      .order("created_at", { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch snapshots" },
        { status: 500 },
      );
    }

    type SnapshotRow = {
      id: string;
      label: string;
      created_at: string;
      holdings_json: SnapshotHolding[];
    };

    const snapshots: Snapshot[] =
      (data as SnapshotRow[] | null)?.map((row) => ({
        id: row.id,
        label: row.label,
        createdAt: row.created_at,
        holdings: row.holdings_json,
      })) ?? [];

    return NextResponse.json({ snapshots });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Supabase not configured", details: message },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const label: string = body.label ?? "";
    const holdings: SnapshotHolding[] = body.holdings ?? [];

    if (!label || !holdings || holdings.length === 0) {
      return NextResponse.json(
        { error: "Label and holdings are required" },
        { status: 400 },
      );
    }

    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("portfolio_snapshots")
      .insert({
        user_id: DEFAULT_USER_ID,
        label,
        holdings_json: holdings,
      })
      .select("*")
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to save snapshot" },
        { status: 500 },
      );
    }

    const snapshot: Snapshot = {
      id: data.id,
      label: data.label,
      createdAt: data.created_at,
      holdings: data.holdings_json as SnapshotHolding[],
    };

    return NextResponse.json({ snapshot });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Supabase not configured", details: message },
      { status: 500 },
    );
  }
}
