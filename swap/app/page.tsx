import React from "react";
import { TonProvider } from "@/lib/ton";
import Home from "@/components/layout/home";

export default function Page() {
  return (
    <TonProvider>
      <Home />
    </TonProvider>
  );
}
