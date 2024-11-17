"use client";

import * as React from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TokenSwap() {
  const [sellAmount, setSellAmount] = React.useState<number>(0);

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
              onChange={(e) => setSellAmount(Number(e.target.value))}
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
        <Button className="w-full h-14 rounded-2xl mt-2 text-lg hover:text-white">
          Get started
        </Button>
      </div>
    </div>
  );
}
