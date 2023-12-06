// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract TestContract{

    uint value;

    constructor() { }

    function setValue(uint a) public returns (uint) {
        value = a;

        value;
    }
}