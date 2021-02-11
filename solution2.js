const fs = require('fs');
const { runCommands } = require('./commandOperations');

const inputData = fs.readFileSync('./inputs/input.txt', 'utf-8');
const inputArray = inputData.split('\n');
let result, originalTraversedPath;

try {
  result = runCommands(inputArray);
  originalTraversedPath = result.traversedPath;
} catch (err) {
  console.error(err);
}

/**
 * Change each jmp or nop in original traversed path, one by one
 * from last and run commands again to check whether it is completed or not.
 */
if (result) {
  for(let counter = originalTraversedPath.length - 1; counter >= 0; counter--){
    const editedArray = [...inputArray];
    const currentCommand = editedArray[originalTraversedPath[counter]];

    if (result.completed) {
      break;
    }
    if (currentCommand.includes('acc')) {
      continue;
    }
    if (currentCommand.includes('nop')) {
      editedArray[originalTraversedPath[counter]] = currentCommand.replace('nop', 'jmp');
    }
    else if (currentCommand.includes('jmp')) {
      editedArray[originalTraversedPath[counter]] = currentCommand.replace('jmp', 'nop');
    }
    try {
      result = runCommands(editedArray);
    } catch (err) {
      continue;
    }
  }

  if (result.completed) {
    console.log('Accumulator:', result.accumulator);
  }
  else {
    console.log('No possible solution!! Try with different input.');
  }
}