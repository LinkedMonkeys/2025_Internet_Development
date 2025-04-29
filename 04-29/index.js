"use strict";

const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/hello/:name/:times', (req, res) => {
    const theName = req.params.name;
    const theTimes = req.params.times;
    console.log('Attached to the base route.');
    // res.render(filename, paramters);
    res.render('hello', {name: theName, times: theTimes});
});

app.get('/example', (req, res) => {
    console.log('Attached to example route.');
    res.send('This is an example route.');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});