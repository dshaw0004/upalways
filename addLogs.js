const fs = require('fs');

function logToFile(caseNumber, message) {
  let fileName;
  if (caseNumber === 1) { //case 1 : when successfully url added
    fileName = 'success.txt';
  } else if (caseNumber === 2) { //case 2 : when something wrong to add the url
    fileName = 'error.txt';
  } else {
    console.log('Invalid case number');
    return;
  }
  fs.appendFile(fileName, message + '\n', (err) => {
    if (err) throw err;
    console.log('Log saved to ' + fileName);
  });
}

// // Example usage:
// logToFile(1, 'This is a log message for case 1');
// logToFile(2, 'This is a log message for case 2');
module.exports = logToFile