"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";

export function TonProvider({ children }: { children: React.ReactNode }) {
  return (
    <TonConnectUIProvider manifestUrl="https://<YOUR_APP_URL>/tonconnect-manifest.json">
      {children}
    </TonConnectUIProvider>
  );
}
