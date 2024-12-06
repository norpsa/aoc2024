import { readFileSync } from 'fs';

const rules = new Map();
let modeChange = false;
const records = [];
readFileSync('day5_input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    if(!line) {
        modeChange = true;
    } else if(!modeChange) {
        let parts = line.split("|").map(a => parseInt(a));
        if(!rules.has(parts[0])) {
            rules.set(parts[0], [parts[1]]);
        } else {
            rules.get(parts[0]).push(parts[1]);
        }
    } else {
        records.push(line.split(",").map(a => parseInt(a)));
    }
});

let sum = 0;
const invalids = [];
records.forEach(r => {
    let pagesBefore = new Set();
    let valid = true;
    r.forEach(p => {
        let pRules = rules.get(p);
        if(pRules) {
            pRules.forEach(a => {
                if(pagesBefore.has(a)) {
                    valid = false;
                    return;
                }
            });
            if(!valid) {
                return;
            }
        }
        pagesBefore.add(p);
    });
    if(valid) {
        sum += r[(r.length - 1) / 2];
    } else {
        invalids.push(r);
    }
});

console.log("Part 1", sum);

let invalidSum = 0;
invalids.forEach(r => {
    let book = [];
    r.forEach(p => {
        let pRules = rules.get(p);
        let validPage = true;
        if(pRules) {
            pRules.forEach(a => {
                if(book.findIndex(i => i === a) !== -1) {
                    validPage = false;
                }
            });
        }
        if(validPage) {
            book.push(p);
        } else {
            for(let i = 0; i < book.length; i++) {
                if(pRules.findIndex(a => a === book[i]) !== -1) {
                    book = [...book.slice(0, i).concat([p], book.slice(i))];
                    break;
                }
            }
        }
    });
    invalidSum += book[(r.length - 1) / 2];
});

console.log("PART 2", invalidSum);