// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract TestContract1{

    uint value;

    constructor() { }

    function setValue(uint a) public returns (uint) {
        value = a;

        value;
    }
}