import React, { useState } from "react";
import { useLogin, useWallets, usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";

export default function WithdrawDepositCard() {
  const [activeAction, setActiveAction] = useState<"deposit" | "withdraw">(
    "deposit"
  );
  const [amount, setAmount] = useState("");

  const { login } = useLogin();
  const { wallets } = useWallets();
  const { authenticated } = usePrivy();

  // Connected = user has authenticated **and** at least one wallet has an address.
  const isWalletConnected =
    authenticated && (wallets?.some((w) => !!w.address) ?? false);

  console.log("isWalletConnected:", isWalletConnected);
  console.log("wallets:", wallets);
  console.log("authenticated:", authenticated);
  console.log("login:", login);

  const primaryLabel = isWalletConnected
    ? activeAction === "deposit"
      ? "Deposit"
      : "Withdraw"
    : "Connect";

  const handlePrimaryClick = () => {
    if (!isWalletConnected) {
      login();
      return;
    }

    console.log(`${primaryLabel} ${amount || "0.0"} USDC`);
  };

  return (
    <div className="max-w-sm flex-shrink-0">
      <Card className="bg-white/5 border-white/10 rounded-2xl p-6 shadow-lg space-y-6">
        <div className="flex bg-white/5 rounded-2xl p-1">
          <button
            onClick={() => setActiveAction("deposit")}
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
              activeAction === "deposit"
                ? "bg-gradient-to-r from-[#2962FF] to-[#5C6BFF] text-white"
                : "text-white/70 hover:text-white"
            }`}
            aria-label="Switch to deposit mode"
            type="button"
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
            type="button"
          >
            Withdraw
          </button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount" className="text-sm font-medium text-white/50">
            Amount
          </Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/50 font-medium">USDC</span>
            </div>
            <Input
              id="amount"
              type="number"
              min="0"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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

        <Button
          className="w-full bg-gradient-to-r from-[#2962FF] to-[#5C6BFF] hover:from-[#2962FF]/90 hover:to-[#5C6BFF]/90 rounded-2xl h-12 text-base font-medium"
          onClick={handlePrimaryClick}
        >
          {primaryLabel}
        </Button>
      </Card>
    </div>
  );
}
