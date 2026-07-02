const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Tizul Islam\\Downloads\\Resume Of Samin Israr Ravi.pdf');

// Find all occurrences of URI references in PDF
const text = content.toString('binary');
const regex = /\/URI\s*\(([^)]+)\)/g;
let match;
const urls = [];
while ((match = regex.exec(text)) !== null) {
    urls.push(match[1]);
}

console.log("Extracted URLs:");
console.log(urls);
