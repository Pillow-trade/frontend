import { useLogin, useWallets, usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check } from "lucide-react";
import { useState } from "react";

function WalletButton() {
  const { login } = useLogin();
  const { wallets } = useWallets();
  const { authenticated } = usePrivy();

  const walletAddr = wallets?.find((w) => !!w.address)?.address;
  const isConnected = authenticated && !!walletAddr;

  const truncated =
    walletAddr && `${walletAddr.slice(0, 6)}…${walletAddr.slice(-4)}`;

  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (!walletAddr) return;
    await navigator.clipboard.writeText(walletAddr);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
    setOpen(false);
  };

  return (
    <div className="relative">
      <Button
        className="flex items-center gap-1 bg-gradient-to-r from-[#2962FF] to-[#5C6BFF] hover:from-[#2962FF]/90 hover:to-[#5C6BFF]/90 rounded-xl h-10 px-4"
        aria-label={isConnected ? "Wallet connected" : "Connect wallet"}
        onClick={() => (isConnected ? setOpen((o) => !o) : login())}
      >
        {isConnected ? truncated : "Connect"}
        {isConnected && (
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        )}
      </Button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-[#1B1E24] p-2 shadow-lg">
          <button
            onClick={copyAddress}
            className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-white/90 hover:bg-white/10"
          >
            Copy publicKey
            {copied ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16h8M8 12h8m-5 8h5a2 2 0 002-2V7a2 2 0 00-2-2h-5m-1 12H6a2 2 0 01-2-2V5a2 2 0 012-2h5"
                />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default WalletButton;
