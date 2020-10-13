const fs = require('fs');
const axios = require('axios');
const { URL } = require('url');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("An error occured:", err);
            process.kill(1);
        }
        console.log(data)
    })
}

function webCat(url) {
     axios.get(url)
        .then(data => {
            console.log(data.data)
        })
        .catch(err => {
            console.log("An error occured:", err)
        })
}

const input = process.argv[2]
try {
    const url = new URL(input)
    webCat(url.href)
} catch {
    cat(input)
}
