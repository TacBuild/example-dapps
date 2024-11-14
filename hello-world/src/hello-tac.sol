// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract HelloWorld {
    string private greeting = "Hello TAC!";
    
    event GreetingChanged(string newGreeting, address changedBy);
    
    function getGreeting() public view returns (string memory) {
        return greeting;
    }
    
    function setGreeting(string memory _newGreeting) public {
        greeting = _newGreeting;
        emit GreetingChanged(_newGreeting, msg.sender);
    }
}