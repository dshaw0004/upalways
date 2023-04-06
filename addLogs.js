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


module.exports = logToFile