const { parentPort } = require('worker_threads');

let total = 0;
const startTime = Date.now();

for (let i = 0; i < 5000000000; i++) {
    total++;
}

const endTime = Date.now();
const executionTime = `${(endTime - startTime) / 1000} seconds`

parentPort.postMessage({ executionTime });
