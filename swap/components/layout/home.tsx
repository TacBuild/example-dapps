import { TokenSwap } from "@/components/swap";
import Header from "@/components/layout/header";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="mt-20 flex flex-col items-center justify-center gap-10">
        <h1 className="text-white text-6xl font-medium text-center leading-[1.2]">
          Swap anytime, <br /> anywhere on TAC
        </h1>
        <TokenSwap />
        <p className="text-gray-400 text-center text-md w-1/4">
          This is just an example application to demostrate the Uniswap V2
          contracts on TAC. <span className="text-primary">Learn more</span>
        </p>
      </div>
    </div>
  );
}
