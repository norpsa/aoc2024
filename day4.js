import { readFileSync } from 'fs';

const input = [];
readFileSync('day4_input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    input.push(line.split(''));
});

const diffs = [{x: -1, y: -1}, {x: -1, y: 0}, {x: -1, y: 1}, {x: 0, y: -1}, {x: 0, y: 1}, {x: 1, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}];
const word = ['X', 'M', 'A', 'S'];

let occurences = 0;
for(let x = 0; x < input[0].length; x++) {
    for(let y = 0; y < input.length; y++) {
        // Start looking
        if(input[y][x] === word[0]) {
            diffs.forEach(d => {
                for(let i = 1; i < word.length; i++) {
                    if(y + i*d.y < 0 || y + i*d.y >= input.length || x + i*d.x < 0 || x + i*d.x >= input[0].length) {
                        return;
                    }

                    if(input[y + i*d.y][x + i*d.x] !== word[i]) {
                        return;
                    }
                }
                occurences++;
            });
        }
    }
}

console.log("PART 1", occurences);

const cross = [{x: -1, y: -1}, {x: 1, y: 1}, {x: -1, y: 1}, {x: 1, y: -1}];

let xmases = 0;
for(let x = 1; x < input[0].length - 1; x++) {
    for(let y = 1; y < input.length - 1; y++) {
        // Start looking
        if(input[y][x] === 'A') {
            let letters = [];
            cross.forEach(d => {
                letters.push(input[y + d.y][x + d.x]);
            });
            if(letters.filter(a => a === 'M').length === 2 && letters.filter(a => a === 'S').length === 2) {
                if(input[y - 1][x - 1] !== input[y + 1][x + 1]) {
                    xmases++;
                }

            }
        }
    }
}

console.log("PART 2", xmases);

