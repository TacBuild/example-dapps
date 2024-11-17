// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {ExampleToken} from "../src/token.sol";

contract CounterScript is Script {
    ExampleToken public token;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        token = new ExampleToken("Test Token", "TST", 18, 1000);

        vm.stopBroadcast();
    }
}
