"use client";

import * as React from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTonWallet } from "@tonconnect/ui-react";
import ConnectWallet from "./connect-wallet";
import { TacSdk, RawSender, Network } from "tac-sdk";
import { ethers } from "ethers";
import { toNano } from "@ton/ton";

const EVM_TKA_ADDRESS = "0x59470DE4Ac9EdbEee5fb0e40b6d5164d84A2F11B";
const TVM_TKA_ADDRESS = "EQBLi0v_y-KiLlT1VzQJmmMbaoZnLcMAHrIEmzur13dwOmM1";

const EVM_TKB_ADDRESS = "0xC21055458a009fe2e95eBe37A8894A0a703c3835";
const TVM_TKB_ADDRESS = "EQCsQSo54ajAorOfDUAM-RPdDJgs0obqyrNSEtvbjB7hh2oK";

const UNISWAPV2_PROXY_ADDRESS = "0x2D478BffCEbF652e1Cb7e32Db9C674E10e873e57";

export function TokenSwap() {
  const [sellAmount, setSellAmount] = React.useState<number>(0);

  const wallet = useTonWallet();

  const handleSwap = async () => {
    try {
      const tacSdk = new TacSdk({
        network: Network.Testnet,
      });

      // create evm proxy msg
      const abi = new ethers.AbiCoder();
      const encodedParameters = abi.encode(
        ["uint256", "uint256", "address[]", "address", "uint256"],
        [
          Number(toNano(sellAmount)),
          Number(toNano(sellAmount)),
          [EVM_TKA_ADDRESS, EVM_TKB_ADDRESS],
          UNISWAPV2_PROXY_ADDRESS,
          19010987500,
        ]
      );

      const evmProxyMsg = {
        evmTargetAddress: UNISWAPV2_PROXY_ADDRESS,
        methodName:
          "swapExactTokensForTokens(uint256,uint256,address[],address,uint256)",
        encodedParameters,
      };

      // create sender abstraction
      const mnemonic =
        "ffd73dd0a151228c63b65629150ae8ddfd697f7775b131a17fc313be755db728";
      const sender = new RawSender(mnemonic);

      // create JettonTransferData
      const jettons = [];
      jettons.push({
        fromAddress: await sender.getSenderAddress(Network.Testnet),
        tokenAddress: TVM_TKA_ADDRESS,
        jettonAmount: sellAmount,
        tonAmount: 0.35,
      });

      const tx = await tacSdk.sendShardJettonTransferTransaction(
        jettons,
        evmProxyMsg,
        sender
      );

      console.log(tx);

      console.log("transation submitted");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-3 rounded-3xl bg-[#131313] z-20  ">
      <div className="">
        {/* Sell Section */}
        <div className="space-y-2 border border-border rounded-2xl p-4">
          <div className="text-md text-gray-400">Sell</div>
          <div className="relative">
            <Input
              type="text"
              placeholder="0"
              value={sellAmount}
              onChange={(e) => {
                if (Number(e.target.value) > 0) {
                  setSellAmount(Number(e.target.value));
                }
              }}
              className=" h-16 text-white bg-transparent border-none focus-visible:ring-0 p-0 placeholder:text-gray-400"
              style={{
                fontSize: "2rem",
              }}
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <Button
                variant="ghost"
                className="h-10 gap-2 rounded-full bg-gray-900 hover:bg-gray-800 hover:text-white text-white"
              >
                <div className="w-6 h-6 rounded-full bg-[#627EEA] flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="18"
                    viewBox="0 0 12 18"
                    fill="none"
                    className="text-white"
                  ></svg>
                </div>
                ABC
              </Button>
            </div>
          </div>
          <div className="text-sm text-gray-500">${sellAmount.toFixed(2)}</div>
        </div>

        {/* Arrow Divider */}
        <div className="flex justify-center -mt-8 -mb-4">
          <div className="w-14 h-14 rounded-2xl bg-[#1B1B1B] border-4 border-[#131313] flex items-center justify-center">
            <ArrowDown className="text-gray-400" />
          </div>
        </div>

        {/* Buy Section */}
        <div className="space-y-2 bg-[#1B1B1B] rounded-2xl p-4">
          <div className="text-xl text-gray-300">Buy</div>
          <div className="relative">
            <Input
              type="text"
              disabled
              value={sellAmount}
              className=" h-16 text-white bg-transparent border-none focus-visible:ring-0 p-0 placeholder:text-gray-400"
              style={{
                fontSize: "2rem",
              }}
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <Button
                variant="ghost"
                className="h-10 gap-2 rounded-full bg-primary/10 hover:bg-primary/20 hover:text-white text-white  "
              >
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="18"
                    viewBox="0 0 12 18"
                    fill="none"
                    className="text-white"
                  ></svg>
                </div>
                XYZ
              </Button>
            </div>
          </div>
        </div>

        {/* Get Started Button */}
        {wallet ? (
          <ConnectWallet
            text="Swap"
            onClick={handleSwap}
            disabled={sellAmount === 0}
            className="w-full h-14 rounded-2xl mt-2 text-lg bg-primary text-white"
          />
        ) : (
          <Button className="w-full h-14 rounded-2xl mt-2 text-lg hover:text-white">
            Get started
          </Button>
        )}
      </div>
    </div>
  );
}
