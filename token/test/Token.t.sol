// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {ExampleToken} from "../src/token.sol";

contract SimpleTokenTest is Test {
    ExampleToken public token;
    address public owner;
    address public user1;
    address public user2;
    uint256 public initialSupply;

    function setUp() public {
        owner = address(this);
        user1 = address(0x1);
        user2 = address(0x2);
        initialSupply = 1000000 * 10**18;
        
        // Deploy token
        token = new ExampleToken("Test Token", "TST", 18, initialSupply);
    }

    function test_InitialState() public {
        assertEq(token.name(), "Test Token");
        assertEq(token.symbol(), "TST");
        assertEq(token.decimals(), 18);
        assertEq(token.totalSupply(), initialSupply);
        assertEq(token.balanceOf(owner), initialSupply);
    }

    function test_Transfer() public {
        uint256 amount = 1000 * 10**18;
        token.transfer(user1, amount);
        
        assertEq(token.balanceOf(user1), amount);
        assertEq(token.balanceOf(owner), initialSupply - amount);
    }

    function testFail_TransferInsufficientBalance() public {
        uint256 amount = initialSupply + 1;
        token.transfer(user1, amount);
    }

    function test_Approve() public {
        uint256 amount = 1000 * 10**18;
        token.approve(user1, amount);
        
        assertEq(token.allowance(owner, user1), amount);
    }

    function test_TransferFrom() public {
        uint256 amount = 1000 * 10**18;
        
        // First approve user1 to spend tokens
        token.approve(user1, amount);
        
        // Use user1 to transfer tokens from owner to user2
        vm.prank(user1);
        token.transferFrom(owner, user2, amount);
        
        assertEq(token.balanceOf(user2), amount);
        assertEq(token.balanceOf(owner), initialSupply - amount);
        assertEq(token.allowance(owner, user1), 0);
    }

    function testFail_TransferFromInsufficientAllowance() public {
        uint256 amount = 1000 * 10**18;
        
        // Try to transfer without approval
        vm.prank(user1);
        token.transferFrom(owner, user2, amount);
    }

    function testFuzz_Transfer(uint256 amount) public {
        // Bound the amount to be within the total supply
        amount = bound(amount, 0, initialSupply);
        
        token.transfer(user1, amount);
        assertEq(token.balanceOf(user1), amount);
        assertEq(token.balanceOf(owner), initialSupply - amount);
    }

    function testFuzz_Approve(uint256 amount) public {
        token.approve(user1, amount);
        assertEq(token.allowance(owner, user1), amount);
    }

    function test_TransferEmitsEvent() public {
        uint256 amount = 1000 * 10**18;
        
        vm.expectEmit(true, true, false, true);
        emit ExampleToken.Transfer(owner, user1, amount);
        
        token.transfer(user1, amount);
    }

    function test_ApproveEmitsEvent() public {
        uint256 amount = 1000 * 10**18;
        
        vm.expectEmit(true, true, false, true);
        emit ExampleToken.Approval(owner, user1, amount);
        
        token.approve(user1, amount);
    }
}