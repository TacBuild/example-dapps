"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";

export function TonProvider({ children }: { children: React.ReactNode }) {
  return (
    <TonConnectUIProvider manifestUrl="https://www.jsonkeeper.com/b/ZKTK">
      {children}
    </TonConnectUIProvider>
  );
}
