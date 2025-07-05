import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLogin } from "@privy-io/react-auth";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";

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
              <Tabs defaultValue="vault" className="w-full">
                <TabsList className="bg-white/5 border border-white/10 rounded-2xl p-1">
                  <TabsTrigger
                    value="vault"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#2962FF] data-[state=active]:to-[#5C6BFF] data-[state=active]:text-white rounded-xl"
                    aria-label="View vault performance"
                  >
                    Vault Performance
                  </TabsTrigger>
                  <TabsTrigger
                    value="your"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#2962FF] data-[state=active]:to-[#5C6BFF] data-[state=active]:text-white rounded-xl"
                    aria-label="View your performance"
                  >
                    Your Performance
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="vault" className="mt-6">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <Card className="bg-white/5 border-white/10 rounded-2xl p-4 shadow-lg">
                      <div className="space-y-1">
                        <p className="text-sm text-white/60">
                          Performance (APY)
                        </p>
                        <p
                          className="text-xl font-semibold text-white"
                          role="status"
                        >
                          0.19%
                        </p>
                      </div>
                    </Card>
                    <Card className="bg-white/5 border-white/10 rounded-2xl p-4 shadow-lg">
                      <div className="space-y-1">
                        <p className="text-sm text-white/60">TVL</p>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-blue-400" />
                          <p
                            className="text-xl font-semibold text-white"
                            role="status"
                          >
                            42
                          </p>
                        </div>
                      </div>
                    </Card>
                    <Card className="bg-white/5 border-white/10 rounded-2xl p-4 shadow-lg">
                      <div className="space-y-1">
                        <p className="text-sm text-white/60">
                          Protection floor
                        </p>
                        <p
                          className="text-xl font-semibold text-white"
                          role="status"
                        >
                          60%
                        </p>
                      </div>
                    </Card>
                    <Card className="bg-white/5 border-white/10 rounded-2xl p-4 shadow-lg">
                      <div className="space-y-1">
                        <p className="text-sm text-white/60">Rebalancing</p>
                        <p
                          className="text-xl font-semibold text-white"
                          role="status"
                        >
                          1 Day
                        </p>
                      </div>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Performance Breakdown
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                          <span className="text-white/70">
                            Total Earnings (All)
                          </span>
                          <span className="font-medium" role="status">
                            —
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                          <span className="text-white/70">
                            Max Daily Drawdown
                          </span>
                          <span className="font-medium" role="status">
                            —
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                          <span className="text-white/70">30D Volume</span>
                          <span className="font-medium" role="status">
                            —
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="your" className="mt-6">
                  <div className="text-center py-8 text-white/60">
                    Connect your wallet to view your performance
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Deposit withdraw to put in ca component */}
          <div className="max-w-sm flex-shrink-0">
            <Card className="bg-white/5 border-white/10 rounded-2xl p-6 shadow-lg space-y-6">
              {/* Deposit/Withdraw Toggle */}
              <div className="flex bg-white/5 rounded-2xl p-1">
                <button
                  onClick={() => setActiveAction("deposit")}
                  className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                    activeAction === "deposit"
                      ? "bg-gradient-to-r from-[#2962FF] to-[#5C6BFF] text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                  aria-label="Switch to deposit mode"
                >
                  Deposit
                </button>
                <button
                  onClick={() => setActiveAction("withdraw")}
                  className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                    activeAction === "withdraw"
                      ? "bg-gradient-to-r from-[#2962FF] to-[#5C6BFF] text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                  aria-label="Switch to withdraw mode"
                >
                  Withdraw
                </button>
              </div>

              <p className="text-sm text-white/60">
                Deposited funds are subject to a 2 hours redemption period.
              </p>

              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-medium">
                  Amount
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-white/50 font-medium">
                      USDC
                    </span>
                  </div>
                  <Input
                    id="amount"
                    type="text"
                    placeholder="0.0"
                    className="bg-white/5 border-white/10 text-white rounded-xl h-12 pl-20 pr-4 text-right text-lg"
                    aria-label="Enter amount in USDC"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-white/60">Balance</span>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-blue-400" />
                  <span role="status" className="text-white">
                    0 → 0
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
