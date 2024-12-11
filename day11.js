import { readFileSync } from 'fs';
import { after } from 'node:test';

let input = [];
readFileSync('day11_input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    input = line.split(' ');
});

let rocks = input;
console.log(rocks);
for(let i = 0; i < 25; i++) {
    let newRocks = [];
    rocks.forEach(r => {
        if(r === '0') {
            newRocks.push('1');
        } else if(r.length % 2 === 0) {
            newRocks.push(r.substring(0, r.length / 2));
            newRocks.push(parseInt(r.substring(r.length / 2)).toString());
        } else {
            newRocks.push((parseInt(r)*2024).toString());
        }
    });
    rocks = newRocks;
}

console.log("PART 1", rocks.length);

let unique = new Set();
rocks.forEach(a => unique.add(parseInt(a)));
console.log(unique.size);

let after25 = new Map();
unique.forEach(u => {
    let rocks = [u.toString()];
    for(let i = 0; i < 25; i++) {
        let newRocks = [];
        rocks.forEach(r => {
            if(r === '0') {
                newRocks.push('1');
            } else if(r.length % 2 === 0) {
                newRocks.push(r.substring(0, r.length / 2));
                newRocks.push(parseInt(r.substring(r.length / 2)).toString());
            } else {
                newRocks.push((parseInt(r)*2024).toString());
            }
        });
        rocks = newRocks;
    }
    after25.set(u.toString(), rocks);
});

let notfound = [];
after25.forEach((rocks, value) => {
    rocks.forEach(r => {
        if(!after25.has(r)) {
            notfound.push(r);
        }
    });
});

notfound.forEach(u => {
    console.log(u);
    let rocks = [u];
    for(let i = 0; i < 25; i++) {
        let newRocks = [];
        rocks.forEach(r => {
            if(r === '0') {
                newRocks.push('1');
            } else if(r.length % 2 === 0) {
                newRocks.push(r.substring(0, r.length / 2));
                newRocks.push(parseInt(r.substring(r.length / 2)).toString());
            } else {
                newRocks.push((parseInt(r)*2024).toString());
            }
        });
        rocks = newRocks;
    }
    after25.set(u, rocks);
});
console.log("SUMMAA");
// eli nyt on tiedossa mitkä kivet tulee alunperin 25 jälkeen
// sitten näistä jokaiselle on tiedossa mitä niistä tulee 25 jälkeen
let sum = 0;
unique.forEach(r => {
    let sumForStone = 0;
    after25.get(r.toString()).forEach(a => {
        sumForStone += after25.get(a).length;
    });
    console.log(r);
    sum += sumForStone*rocks.filter(a => a === r.toString()).length;
});

console.log(sum);
