import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLogin } from "@privy-io/react-auth";

export default function CushionPage() {
  const { login } = useLogin({
    // onComplete: () => router.push("/vaultPage"),
  });
  const [activeAction, setActiveAction] = useState<"deposit" | "withdraw">(
    "deposit"
  );

  return (
    <div className="min-h-screen bg-[#0F1116] text-white/90 font-['Inter']">
      {/* Top Navbar */}
      <nav className="flex items-center justify-between px-6 lg:px-8 pt-8 pb-8">
        <div className="flex items-center gap-3">
          {/* Pillow-shaped logo */}
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-[#0F1116] rounded-sm"></div>
          </div>
          <h1 className="text-lg font-bold">PILLOW</h1>
        </div>
        <Button
          className="bg-gradient-to-r from-[#2962FF] to-[#5C6BFF] hover:from-[#2962FF]/90 hover:to-[#5C6BFF]/90 rounded-xl h-10 px-6"
          aria-label="Connect wallet"
          onClick={login}
        >
          Connect
        </Button>
      </nav>
      <div className="px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row gap-16 xl:gap-24 max-w-7xl mx-auto">
          {/* Left Column */}
          <div className="max-w-lg flex-grow">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  ETH capital protected
                </h2>
                <p className="text-white/70 text-lg">
                  60% capital guarantee and profit lock-in, invested in ETH and
                  rebalancing to USDC
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
