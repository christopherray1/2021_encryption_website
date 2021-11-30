//
// decryption function and logic based off of logic written by logan 
// found in encrypt.js.
//


var originalAlphabet = {0:"a", 1:"b", 2:"c", 3:"d", 4:"e", 5:"f", 6:"g", 7:"h", 8:"i", 9:"j", 10:"k",
                       11:"l", 12:"m", 13:"n", 14:"o", 15:"p", 16:"q", 17:"r", 18:"s", 19:"t", 20:"u", 21:"v", 22:"w", 23:"x", 24:"y", 25:"z"};

function caesarDecrypt() {

  var textToDecrypt = [];  // Array to pass words/word to, to decrypt
  var inputText = document.querySelector("#inputCeasarDecrypt").value;  // grab the input text

  var enteredText = String(inputText).toLowerCase(); // Convert inputText to lowercase
  textToDecrypt = enteredText.split(" "); // split up input text by space and pass to empty array textToDecrypt
  
  
  var outputText = document.querySelector("#outputCeasarDecrypt"); // Select our output text box

  

  
  var encryptedText = ""; // our encrypted text will go here
  
  textToDecrypt.forEach(word => {  // Step through our textToDecrypt array
      
      for (var i = 0; i < word.length; i++) {  // Step through each letter of our word in our for each loop

          if (Number.isInteger(parseInt(word[i]))) { // Catch user entering a number into input box
              encryptedText = "You can not encrypt or decrypt numbers with Caesar Encryption. Please Retype your phrase.";
              break;
          } else {

              for (let key of Object.keys(originalAlphabet)) { // Step through each key in our originalAlphabet associative array and compare to the current letter we are checking in the word,
                                                              // then add the new letter to our encryptedText output message
                  if (originalAlphabet[key] == word[i]) {
                      if ((parseInt(key) - 3) == -3) {         // If the current key that was grabbed from the checked letter in our word is = 26, this means it is out of the scope of the array.
                          encryptedText += originalAlphabet[23];// So we set the encrypted letter equal to the first letter of the alphabet. (x with a shift of 3 will be a)
                      } else if ((parseInt(key) - 3) == -2) { // 27 = b
                          encryptedText += originalAlphabet[24];
                      } else if ((parseInt(key) - 3) == -1) { // 28 = c
                          encryptedText += originalAlphabet[25];
                      } else {
                          encryptedText += originalAlphabet[(parseInt(key) - 3)]; // Every other letter, we can shift by three, since it will not be out of the array's scope
                      }
                      
                  }
              }

          }
          
      }
      encryptedText += " "; // add a space at the end of the word, incase there are multiple words

  });
  
  outputText.innerHTML = encryptedText; // Set our output test box equal to our encrypted text
  
};
