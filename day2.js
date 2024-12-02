import { readFileSync } from 'fs';

const records = [];
readFileSync('day2_input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    records.push(line.split(" ").map(a => parseInt(a)));
});


const isSafe = r => {
    let decreasing = true;
    if(r[0] - r[1] < 0) {
        decreasing = false;
    } else if(r[0] - r[1] === 0) {
        return false;
    }

    for(let i = 0; i < r.length - 1; i++) {
        let result = r[i] - r[i + 1];
        if(result === 0 || Math.abs(result) > 3) {
            return false;
        }

        if(result < 0 && decreasing) {
            return false;
        }

        if(result > 0 && !decreasing) {
            return false;
        }
    }

    return true;
};

// PART 1
let safe = 0;
records.forEach(r => {
    if(isSafe(r)) {
        safe++;
    }
});

console.log("PART 1", safe);

// PART 2
safe = 0;
records.forEach(r => {
    if(isSafe(r)) {
        safe++;
    } else {
        for(let i = 0; i < r.length; i++) {
            if(isSafe(r.toSpliced(i, 1))) {
                safe++;
                break;
            }
        }
    }
});

console.log("PART 2", safe);
