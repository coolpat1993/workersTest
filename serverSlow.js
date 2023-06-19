const express = require('express');
const app = express();

let counter = 0;
app.get('/', (req, res) => {
    counter++;
    res.status(200).json({ counter })
})

app.get('/heavy', (req, res) => {
    let total = 0;
    for (let i = 0; i < 5000000000; i++) {
        total++;
    }
    res.status(200).json({ total })
})

app.listen(1337, () => console.log('server listening on 1337'))