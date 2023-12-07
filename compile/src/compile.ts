import { getInput } from '@actions/core';

const path = getInput('path');

console.log(`contract path is ${path}!`);