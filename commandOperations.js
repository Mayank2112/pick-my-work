// Global variables
let accumulator = 0;
let index = 0;
const traversedPath = []

/**
 * Increement index value
 */
const increementIndexByOne = () => index++;

/**
 * Add value to accumulator and also increement index value
 * @param {Number} value
 */
const addValueToAccumulator = value => {
  accumulator += Number(value);
  increementIndexByOne();
};

/**
 * Add value to index
 * @param {Number} value
 */
const addIndexValue = value => {
  index += Number(value);
};

const operation = {
  'nop': increementIndexByOne,
  'acc': addValueToAccumulator,
  'jmp': addIndexValue
};

/**
 * Run commands from commandsArray
 * @param {Array} commandsArray
 */
module.exports.runCommands = commandsArray => {
  // Reset variables
  accumulator = 0;
  index = 0;
  traversedPath.length = 0

  while(true) {
    // Returns when try to run already executed command
    if (traversedPath.includes(index)) {
      return { accumulator, traversedPath, index, completed: false };
    }

    // Returns when last command is executed.
    if (index == commandsArray.length) {
      return { accumulator, traversedPath, index, completed: true };
    } 

    // Returns when input is not appropriate
    if (index < 0 || index > commandsArray.length) {
      throw 'Invalid Input';
    }
    traversedPath.push(index);
    const command = commandsArray[index].split(' ');
    operation[command[0]](command[1]);
  }
};

