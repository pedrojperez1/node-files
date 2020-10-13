const fs = require('fs');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("An error occured:", err);
            process.kill(1);
        }
        console.log(data)
    })
}

cat(process.argv[2])