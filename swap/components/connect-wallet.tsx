"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useTonConnectModal, useTonWallet } from "@tonconnect/ui-react";

export default function ConnectWallet({
  text,
  onClick,
  className,
  disabled = false,
}: {
  text: string;
  onClick: () => void;
  className: string;
  disabled: boolean;
}) {
  const { open } = useTonConnectModal();
  const wallet = useTonWallet();

  const shortAddress = wallet?.account.address.slice(0, 6) + "...";

  return (
    <Button
      disabled={disabled}
      onClick={wallet ? onClick : open}
      className={className}
    >
      {text ? text : wallet ? `Connected (${shortAddress})` : "Connect Wallet"}
    </Button>
  );
}
