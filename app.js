const express = require('express');
const app = express();

const fs = require('fs');
const { userInfo } = require('os');

const moduleOne = require('./static/modules/module-1');


const ReadFile = (file) => {
    fs.readFile(file, 'utf8', function (error, data) {
        if (error) throw error;
        console.log("Асинхронное чтение...");
        console.log(data);
    });
};

const WriteFile = (file, text) => {
    fs.writeFile('hello.txt', text, function (error) {
        if (error) throw error;
        console.log("Асинхронная запись файла...");
        let data = fs.readFileSync(file, 'utf8');
        console.log(data);
    });
};

const DeleteFile = (file) => {
    fs.unlink(file, (err) => {
        if (err) console.log(err);
        console.log("Удаление файла...");
        console.log(`${file} was deleted`);
    });
};

app.get('/', function (request, response) {
    response.end('Hello from Express!');
    let file = "hello.txt";
    console.log(ReadFile(file));
    WriteFile(file, "Hello World!");
    console.log(ReadFile(file));
    // DeleteFile(file);
    console.log(`Дата запроса: ${moduleOne.date}`);
    console.log(moduleOne.getMessage(userInfo().username));
});


app.listen(3000);

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err);
});