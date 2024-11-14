// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {HelloWorld} from "../src/hello-tac.sol";

contract HelloWorldScript is Script {
    HelloWorld public helloWorld;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        helloWorld = new HelloWorld();
        
        console.log("Initial greeting:", helloWorld.getGreeting());

        vm.stopBroadcast();
    }
}