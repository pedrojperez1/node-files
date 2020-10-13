const fs = require('fs');
const axios = require('axios');
const { URL } = require('url');

function cat(path, writeTo) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("An error occured:", err);
            process.kill(1);
        }
        if (writeTo) {
            writeToFile(data, writeTo);
        } else {
            console.log(data);
        }
    });
}

function webCat(url, writeTo) {
     axios.get(url)
        .then(data => {
            if (writeTo) {
                writeToFile(data.data, writeTo);
            }
            else {
                console.log(data.data);
            }
        })
        .catch(err => {
            console.log("An error occured:", err);
            process.kill(1);
        })
}

function writeToFile(data, path) {
    fs.writeFile(path, data, 'utf8', err => {
        if (err) {
            console.log("An error occured:", err);
            process.kill(1);
        }
        console.log(`Successful write to ${path}`);
    })
}

function isUrl(text) {
    try {
        const url = new URL(text);
        return true;
    } catch {
        return false;
    }
}

if (process.argv[2] == "--out") {
    const outputPath = process.argv[3];
    const inputPath = process.argv[4];
    if (isUrl(inputPath)) {
        webCat(inputPath, outputPath);
    } else {
        cat(inputPath, outputPath);
    }

} else {
    const inputPath = process.argv[2]
    if (isUrl(inputPath)) {
        webCat(inputPath);
    } else {
        cat(inputPath);
    }
}

