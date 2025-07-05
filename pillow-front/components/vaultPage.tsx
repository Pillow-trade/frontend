import { Button } from "@/components/ui/button";
import { useLogin, useWallets, usePrivy } from "@privy-io/react-auth";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import WithdrawDepositCard from "./withdrawDepositForm";

export default function PillowPage() {
  const { login } = useLogin({});
  const { wallets } = useWallets(); // ⬅️ new
  const { authenticated } = usePrivy(); // ⬅️ new

  // ------------------------------------------------------------------ //
  //   Connection status & button label
  // ------------------------------------------------------------------ //
  const walletAddr = wallets?.find((w) => !!w.address)?.address;
  const isConnected = authenticated && !!walletAddr;

  // e.g. 0x12…B3F4  (6 chars front, 4 back)
  const truncated = isConnected
    ? `${walletAddr!.slice(0, 6)}…${walletAddr!.slice(-4)}`
    : "Connect";

  return (
    <div className="min-h-screen bg-[#0F1116] text-white/90 font-['Inter']">
      <nav className="bg-[#0F1116] pt-8 pb-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" aria-label="Pillow Home" className="flex items-center">
            <Image
              src="/pillow.png"
              width={280}
              height={80}
              priority
              alt="Pillow logo"
            />
          </Link>

          <Button
            className="bg-gradient-to-r from-[#2962FF] to-[#5C6BFF] hover:from-[#2962FF]/90 hover:to-[#5C6BFF]/90 rounded-xl h-10 px-6"
            aria-label={isConnected ? "Wallet connected" : "Connect wallet"}
            onClick={login} // Re-opens Privy modal even when connected
          >
            {truncated}
          </Button>
        </div>
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
                  80% capital guarantee and profit lock-in, invested in ETH and
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
                          80%
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

          <WithdrawDepositCard onConnect={login} />
        </div>
      </div>
    </div>
  );
}
