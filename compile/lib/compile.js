"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const path = (0, core_1.getInput)('path');
console.log(`contract path is ${path}!`);
