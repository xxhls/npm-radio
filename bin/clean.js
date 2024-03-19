import fs from "fs";
import path from "path";

function emptyDir(path) {
    const files = fs.readdirSync(path);
    files.forEach(file => {
        const filePath = `${path}/${file}`;
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            emptyDir(filePath);
        } else {
            fs.unlinkSync(filePath);
        }
    });
}

function rmEmptyDir(path, level=0) {
    const files = fs.readdirSync(path);
    if (files.length > 0) {
        let tempFile = 0;
        files.forEach(file => {
            tempFile++;
            rmEmptyDir(`${path}/${file}`, 1);
        });
        if (tempFile === files.length && level !== 0) {
            fs.rmdirSync(path);
        }
    }
    else {
        level !==0 && fs.rmdirSync(path);
    }
}

function clearDir(path) {
    emptyDir(path);
    rmEmptyDir(path);
}

const distPath = path.join(process.cwd(), 'dist');
clearDir(distPath);
