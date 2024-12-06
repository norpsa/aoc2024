import { readFileSync } from 'fs';

const input = [];
readFileSync('day6_input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    input.push(line.split(''));
});

// Find start
let startX = 0;
let startY = 0;
for(let y = 0; y < input.length; y++) {
    for(let x = 0; x < input[0].length; x++) {
        if(input[y][x] === '^') {
            startX = x;
            startY = y;
            input[y][x] = 'X';
            break;
        }
    }
}

const directions = [{ x: 0, y: -1 }, {x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 0}];

let dir = 0;
let inside = true;
let posX = startX;
let posY = startY;

while(inside) {
    let moved = false;
    while(!moved) {
        let tempX = posX + directions[dir].x;
        let tempY = posY + directions[dir].y;
        // Päästään ulos
        if(tempX < 0 || tempY < 0 || tempX >= input[0].length || tempY >= input.length) {
            inside = false;
            break;
        }

        if(input[tempY][tempX] === '#') {
            if(dir < directions.length - 1) {
                dir++;
            } else {
                dir = 0;
            }
        } else {
            posX = tempX;
            posY = tempY;
            moved = true;
            input[posY][posX] = 'X';
        }
    }
}

console.log("PART 1", input.reduce((l, a) =>  a.filter(x => x === 'X').length + l, 0));


let obstrucs = 0;
for(let y = 0; y < input.length; y++) {
    for(let x = 0; x < input[0].length; x++) {
        // Tsekataan vaan ne jossa on käyty ekalla harjotuksella
        if(input[y][x] === 'X' && !(y === startY && y === startX)) {
            input[y][x] = '#';
            inside = true;
            let looping = false;
            posX = startX;
            posY = startY;
            dir = 0;
            let visited = [];
            while(inside && !looping) {
                let moved = false;
                while(!moved) {
                    let tempX = posX + directions[dir].x;
                    let tempY = posY + directions[dir].y;
                    // Päästään ulos
                    if(tempX < 0 || tempY < 0 || tempX >= input[0].length || tempY >= input.length) {
                        inside = false;
                        break;
                    }        
            
                    if(input[tempY][tempX] === '#') {
                        if(dir < directions.length - 1) {
                            dir++;
                        } else {
                            dir = 0;
                        }
                    } else {
                        // jos on menty samassa paikassa samaan suuntaan niin sit alkaa luuppaan
                        if(visited.find(a => a.x === tempX && a.y === tempY && a.dir === dir)) {
                            looping = true;
                            obstrucs++;
                        }
                        posX = tempX;
                        posY = tempY;
                        moved = true;
                        visited.push({x: posX, y: posY, dir: dir});
                    }
                }
            }
            input[y][x] = '.';
        }
    }
}

console.log("PART 2", obstrucs);