import { readFileSync } from 'fs';

const equations = [];
readFileSync('day7_input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    const parts = line.split(': ');
    equations.push({ result: parseInt(parts[0]), numbers: parts[1].split(' ').map(a => parseInt(a))});
});

const solve = (currentSum, remainingNumbers) => {
    if(remainingNumbers.length === 1) {
        return [currentSum + remainingNumbers[0], currentSum * remainingNumbers[0]];
    } else {
        return [...solve(currentSum + remainingNumbers[0], remainingNumbers.slice(1)), ...solve(currentSum * remainingNumbers[0], remainingNumbers.slice(1))]
    }
}

const solveWithConcat = (currentSum, remainingNumbers) => {
    if(remainingNumbers.length === 1) {
        return [currentSum + remainingNumbers[0], currentSum * remainingNumbers[0],
         parseInt(`${currentSum}${remainingNumbers[0]}`)];
    } else {
        return [...solveWithConcat(currentSum + remainingNumbers[0], remainingNumbers.slice(1)), ...solveWithConcat(currentSum * remainingNumbers[0], remainingNumbers.slice(1)),
        ...solveWithConcat(parseInt(`${currentSum}${remainingNumbers[0]}`), remainingNumbers.slice(1))]
    }

}

let sum = 0;
equations.forEach(e => {
    let options = solve(e.numbers[0], e.numbers.slice(1));
    if(options.find(a => a === e.result)) {
        sum += e.result;
    }
});

console.log("PART 1", sum);

sum = 0;
equations.forEach(e => {
    let options = solveWithConcat(e.numbers[0], e.numbers.slice(1));
    if(options.find(a => a === e.result)) {
        sum += e.result;
    }
});

console.log("PART 2", sum);