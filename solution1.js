const fs = require('fs');
const { runCommands } = require('./commandOperations');

const inputData = fs.readFileSync('./inputs/input.txt', 'utf-8');
const inputArray = inputData.split('\n');

try {
  const { accumulator } = runCommands(inputArray);
  console.log('Accumulator:', accumulator);
} catch (err) {
  console.error(err);
}