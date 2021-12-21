// SPDX-License-Identifier: MIT

pragma solidity >= 0.4.0 <= 0.8.10;

import 'openzeppelin-solidity/contracts/access/Ownable.sol';

contract Greeter is Ownable {
    string private message;
    // address private owner;

/*
    constructor() {
        owner = msg.sender;
    }

    modifier privilaged() {
        require(msg.sender == owner, 'called by address that is not the owner');
        _;
    }

    function getOwner() public view returns(address) {
        return owner;
    }
*/
    function greet() external pure returns(string memory) {
        return 'Hello World !!';
    }

    function setDynamicMessage(string calldata m) external /* privilaged */ onlyOwner {
        message = m;
    }

    function dynamicMessage() external view returns(string memory) {
        return message;
    }
}
