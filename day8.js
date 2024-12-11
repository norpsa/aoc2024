import { readFileSync } from 'fs';

const input = [];
readFileSync('day8_input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    input.push(line.split(''));
});

const antennas = new Set();
const locations = new Map();

for(let y = 0; y < input.length; y++) {
    for(let x = 0; x < input[0].length; x++) {
        if(input[y][x] !== '.') {
            if(antennas.has(input[y][x])) {
                locations.get(input[y][x]).push({x, y});
            } else {
                locations.set(input[y][x], [{x, y}]);
                antennas.add(input[y][x]);
            }
        }
    }
}

let antinodes = [];

locations.forEach((locs, antenna) => {
    for(let i = 0; i < locs.length; i++) {
        for(let j = i + 1; j < locs.length; j++) {
            let xDiff = locs[i].x - locs[j].x;
            let yDiff = locs[i].y - locs[j].y;

            let newAntinodes = [];
            newAntinodes.push({ x: locs[i].x + xDiff, y: locs[i].y + yDiff });
            newAntinodes.push({ x: locs[j].x - xDiff, y: locs[j].y - yDiff });

            newAntinodes.forEach(n => {
                if(n.x < 0 || n.y < 0 || n.x >= input[0].length || n.y >= input.length) {
                    return;
                }

                if(antinodes.find(a => a.x === n.x && a.y === n.y)) {
                    return;
                }

                antinodes.push(n);
            });
        }
    }
});

console.log("PART 1", antinodes.length);

antinodes = [];

locations.forEach((locs, antenna) => {
    for(let i = 0; i < locs.length; i++) {
        for(let j = i + 1; j < locs.length; j++) {
            let xDiff = locs[i].x - locs[j].x;
            let yDiff = locs[i].y - locs[j].y;

            // Antenna locations also contain antinodes
            let antiNodeX = locs[i].x;
            let antiNodeY = locs[i].y;
            while(antiNodeX >= 0 && antiNodeX < input[0].length && antiNodeY >= 0 && antiNodeY < input.length) {
                if(!antinodes.find(a => a.x === antiNodeX && a.y === antiNodeY)) {
                    antinodes.push({x: antiNodeX, y: antiNodeY});
                }
                antiNodeX += xDiff;
                antiNodeY += yDiff;
            }

            antiNodeX = locs[j].x;
            antiNodeY = locs[j].y;
            while(antiNodeX >= 0 && antiNodeX < input[0].length && antiNodeY >= 0 && antiNodeY < input.length) {
                if(!antinodes.find(a => a.x === antiNodeX && a.y === antiNodeY)) {
                    antinodes.push({x: antiNodeX, y: antiNodeY});
                }
                antiNodeX -= xDiff;
                antiNodeY -= yDiff;
            }
        }
    }
});

console.log("PART 2", antinodes.length);
