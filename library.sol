// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Library {
    address public owner;
    mapping(uint256 => bool) public books;

    constructor() {
        owner = msg.sender;
    }

    function addBook(uint256 bookId) public {
        require(msg.sender == owner, "Only the owner can add books");
        books[bookId] = true;
    }
}
