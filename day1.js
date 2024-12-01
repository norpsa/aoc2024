import { readFileSync } from 'fs';

const first = [];
const second = [];
readFileSync('day1_input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    let row = line.split("   ");
    first.push(parseInt(row[0]));
    second.push(parseInt(row[1]));

});

first.sort((a,b) => a - b);
second.sort((a,b) => a - b);

// PART 1
let differences = 0;
for(let i = 0; i < first.length; i++) {
    differences += Math.abs(first[i] - second[i]);
}

console.log("PART 1", differences);

let similarity = 0;
const counts = new Map([...new Set(second)].map(
    x => [x, second.filter(y => y === x).length]
));

first.forEach(a => {
    let count = counts.get(a);
    if(count) {
        similarity += a*count;
    }
});

console.log("PART 2", similarity);