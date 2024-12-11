import { readFileSync } from 'fs';

const input = [];
readFileSync('day9_input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    line.split('').map(a => parseInt(a)).forEach(i => input.push(i));
});

const file = [];

let number = 0;
let numberMode = true;

input.forEach(a => {
    if(numberMode) {
        for(let i = 0; i < a; i++) {
            file.push(number);
        }
        number++;
    } else {
        for(let i = 0; i < a; i++) {
            file.push(-1);
        }
    }
    numberMode = !numberMode;
});

let startIndex = 0;
let endIndex = file.length - 1;

while(startIndex < endIndex) {
    if(file[startIndex] !== -1) {
        startIndex++;
    } else {
        while(file[endIndex] === -1) {
            endIndex--;
        }
        file[startIndex] = file[endIndex];
        file[endIndex] = -1;
        startIndex++;
        endIndex--;
    }
}

let i = 0;
let sum = 0;
while(file[i] !== -1) {
    sum += i*file[i];
    i++;
}

console.log("PART 1", sum);

const disk = [];

number = 0;
numberMode = true;

let sizes = new Map();

input.forEach(a => {
    if(numberMode) {
        sizes.set(number, a);
        for(let i = 0; i < a; i++) {
            disk.push(number);
        }
        number++;
    } else {
        for(let i = 0; i < a; i++) {
            disk.push(-1);
        }
    }
    numberMode = !numberMode;
});

// numero on yhden liian iso alkuun
number--;
while(number > 0) {
    // katsotaan montako pitäisi olla ja etsitään niille kolo, joka on ennen kuin ensimmäinen esiintymä
    // kun löytyy niin muutetaan ne ensin -1
    // sitten lätkästään ne koloon
    // siirrytään seuraavaan
    // jos ei löydy koloa, siirrytään seuraavaan

    let firstIndex = disk.findIndex(a => a === number);
    let neededSize = sizes.get(number);
    let consecutiveEmpty = 0;
    let startOfEmpty = 0;
    let spaceFound = false;
    for(let i = 0; i < firstIndex; i++) {
        if(disk[i] === -1) {
            consecutiveEmpty++;
        } else {
            consecutiveEmpty = 0;
        }

        if(consecutiveEmpty === neededSize) {
            startOfEmpty = i - neededSize + 1;
            spaceFound = true;
            break;
        }
    }
    if(spaceFound) {
        for(let i = 0; i < neededSize; i++) {
            disk[startOfEmpty + i] = number;
            disk[firstIndex + i] = -1;
        }
    }
    number--;
}
sum = 0;
for(let i = 0; i < disk.length; i++) {
    if(disk[i] !== -1) {
        sum += i*disk[i];
    }
}

console.log("PART 2", sum);