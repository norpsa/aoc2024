import { readFileSync } from 'fs';

const input = [];
readFileSync('day10_input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    input.push(line.split('').map(a => parseInt(a)));
});

const trailheads = [];

for(let y = 0; y < input.length; y++) {
    for(let x = 0; x < input[0].length; x++) {
        if(input[y][x] === 0) {
            trailheads.push({x, y});
        }
    }
}

const diffs = [{x: -1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}, {x: 1, y: 0},];

// Ratkoo nyt molemmat osat kun en jaksanut refaktoroida
const solveRoute = (routes) => {
    let routeEnds = [];
    let routeSum = 0;
    while(routes.length > 0) {
        let currentNode = routes.pop();
        const x = currentNode.x;
        const y = currentNode.y;
        if(input[currentNode.y][currentNode.x] === 9) {
            if(!routeEnds.find(a => a.x === currentNode.x && a.y === currentNode.y)) {
                routeEnds.push({x, y});
            }
            routeSum++;
        } else {
            diffs.forEach(d => {
                if(x + d.x < 0 || y + d.y < 0 || x + d.x >= input[0].length || y + d.y >= input.length) {
                    return;
                }
                if(input[y + d.y][x + d.x] === (input[currentNode.y][currentNode.x] + 1)) {
                    routes.push({ x: x + d.x, y: y + d.y});
                }
            });
        }
    }
    return routeSum;
}

let sum = 0;
trailheads.forEach(h => {
    sum += solveRoute([h]);
});
console.log(sum);