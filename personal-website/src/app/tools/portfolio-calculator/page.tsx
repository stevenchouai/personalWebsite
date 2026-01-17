import { Container } from "@/components/Container";
import { PortfolioCalculator } from "@/components/PortfolioCalculator";

export const metadata = {
  title: "Portfolio Allocation Calculator",
  description:
    "Input your current holdings, visualize allocation, and save snapshots like year-begin vs year-end.",
};

export default function PortfolioCalculatorPage() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <section className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Portfolio Allocation
            <span className="text-[color:var(--muted)]">
              {" "}
              — Holdings visualizer
            </span>
          </h1>
          <p className="muted mt-4 max-w-2xl text-base leading-7 sm:text-lg">
            输入你当前的持仓市值，查看每类资产所占比例，并在不同时间点保存快照，方便对比例如“年初 vs 年末”的资产配置变化。
          </p>
        </section>

        <PortfolioCalculator />
      </Container>
    </div>
  );
}

