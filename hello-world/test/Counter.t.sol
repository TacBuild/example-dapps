// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


import {Test, console} from "forge-std/Test.sol";
import {HelloWorld} from "../src/hello-tac.sol";

contract HelloWorldTest is Test {
    HelloWorld public helloWorld;
    
    event GreetingChanged(string newGreeting, address changedBy);

    function setUp() public {
        helloWorld = new HelloWorld();
    }

    function test_InitialGreeting() public view {
        assertEq(helloWorld.getGreeting(), "Hello TAC!");
    }

    function test_SetGreeting() public {
        string memory newGreeting = "Hello from foundry!";
        
        vm.expectEmit(true, true, true, true);
        emit GreetingChanged(newGreeting, address(this));
        
        helloWorld.setGreeting(newGreeting);
        assertEq(helloWorld.getGreeting(), newGreeting);
    }

    function testFuzz_SetGreeting(string memory randomGreeting) public {
        helloWorld.setGreeting(randomGreeting);
        assertEq(helloWorld.getGreeting(), randomGreeting);
    }


}

