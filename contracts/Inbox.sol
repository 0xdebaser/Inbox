pragma solidity ^0.4.17;
// linter warnings (red underline) about pragma version can ignored!

// contract code will go here

contract Inbox {
    
    string public message;

    //Constructor function b/c it has same name as contract
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }

}