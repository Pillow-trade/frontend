import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CushionPage() {
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
          <h1 className="text-lg font-bold">CUSHION</h1>
        </div>
        <Button
          className="bg-gradient-to-r from-[#2962FF] to-[#5C6BFF] hover:from-[#2962FF]/90 hover:to-[#5C6BFF]/90 rounded-xl h-10 px-6"
          aria-label="Connect wallet"
        >
          Connect
        </Button>
      </nav>
    </div>
  );
}
