"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId="cmcpcp4o100wcjp0nwneosqii"
      //   clientId="client-WY6N5NwdFH9oABSeCjm9DpiWaAp572AnQzJNZndNo7WXa"
      config={{
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
