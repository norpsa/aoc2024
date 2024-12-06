import { readFileSync } from 'fs';

let input;
readFileSync('day3_input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    input += line;
});

const countSumForPart = (part) => {
    const re = /mul\(\d+,\d+\)/g;
    const mults = [...part.matchAll(re)];

    let sum = 0;
    mults.forEach(m => {
        let numbers = m[0].substr(4, m[0].length - 5).split(",").map(a => parseInt(a));
        sum += numbers[0]*numbers[1];
    });

    return sum;
};

console.log("PART 1", countSumForPart(input));

// PART 2
const parts = input.split("don't()");

let sum = 0;
sum += countSumForPart(parts[0]);

for(let i = 1; i < parts.length; i++) {
    let split = parts[i].split("do()");
    for(let j = 1; j < split.length; j++) {
        sum += countSumForPart(split[j]);
    }
}

console.log("PART 2", sum);