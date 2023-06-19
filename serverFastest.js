const express = require('express');
const app = express();
const { Worker, isMainThread, workerData } = require('worker_threads');

const MAX_CONCURRENT_WORKERS = 2;
const taskQueue = [];

function processNextTask() {
    if (taskQueue.length > 0) {
        const task = taskQueue.shift();
        const worker = new Worker('./worker.js', { workerData: task.data });

        worker.on('message', (result) => {
            task.callback(result);
            processNextTask();
        });
    }
}

function enqueueTask(data, callback) {
    taskQueue.push({ data, callback });
    if (taskQueue.length <= MAX_CONCURRENT_WORKERS) {
        processNextTask();
    }
}

let counter = 0;

app.get('/', (req, res) => {
    counter++;
    res.status(200).json({ counter });
});

app.get('/heavy', (req, res) => {
    enqueueTask(null, (data) => {
        res.status(200).json({ data });
    });
});

app.get('/beavy', (req, res) => {
    const worker = new Worker('./worker.js');
    worker.on('message', (data) => {
        res.status(200).json({ data });
    });
});

app.listen(1337, () => console.log('server listening on 1337'));
