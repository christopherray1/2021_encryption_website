//
// decryption function and logic based off of logic written by logan 
// found in encrypt.js.
//


var originalAlphabet = {0:"a", 1:"b", 2:"c", 3:"d", 4:"e", 5:"f", 6:"g", 7:"h", 8:"i", 9:"j", 10:"k",
                       11:"l", 12:"m", 13:"n", 14:"o", 15:"p", 16:"q", 17:"r", 18:"s", 19:"t", 20:"u", 21:"v", 22:"w", 23:"x", 24:"y", 25:"z"};

// var polybiusSquareRowValues = {"a": 1, "b": 1, "c": 1, "d": 1, "e": 1, "f": 2, "g": 2, "h": 2, "i": 2, "j": 2, "k": 3, "l": 3, "m": 3, "n": 3,
                              // "o": 3, "p": 4, "q": 4, "r": 4, "s": 4, "t": 4, "u": 5, "v": 5, "w": 5, "x": 5, "z": 5};

// var polybiusSquareColumnValues = {"a": 1, "b": 2, "c": 3, "d": 4, "e": 5, "f": 1, "g": 2, "h": 3, "i": 4, "j": 5, "k": 1, "l": 2, "m": 3, "n": 4,
                                 // "o": 5, "p": 1, "q": 2, "r": 3, "s": 4, "t": 5, "u": 1, "v": 2, "w": 3, "x": 4, "z": 5};

// Kept these here for my own reference I wasnt quite sure if I understood how this cypher worked.

var polybiusSquareReverseKey = { 11 : "a" , 12 : "b", 13 : "c", 14 : "d", 15 : "e", 21 : "f", 22 : "g",23 : "h", 24 : "i", 25 : "j", 31 : "k", 32 : "l", 33 : "m", 
                                 34 : "n", 35 : "o", 41 : "p", 42 : "q", 43 : "r", 44 : "s", 45 : "t", 51 : "u", 52 : "v", 53 : "w", 54 : "x", 55 : "z"}; 
                                 // This is the number pair of each of the letters for this method of encryption

var atBashValues = {"z":"a", "y":"b", "x":"c", "w":"d", "v":"e", "u":"f", "t":"g", "s":"h", "r":"i", "q":"j", "p":"k",
                   "o":"l", "n":"m", "m":"n", "l":"o", "k":"p", "j":"q", "i":"r", "h":"s", "g":"t", "f":"u", "e":"v", "d":"w", "c":"x", "b":"y", "a":"z", " ":" "};

var pastDecryption = [];

var timesRun = 0;

var textToDecryptCR = document.querySelector("#inputCeasarDecrypt").value;
var outputTextBoxCR = document.querySelector("#outputCeasarDecrypt"); // Select our output text box

var textToDecryptPB = (document.querySelector("#inputPolybiusDecrypt").value); // takes text from 'encrypted text' box
var outputTextBoxPB = document.querySelector("#outputPolybiusDecrypt"); // targets the 'clear text' output box

var textToDecryptAB = (document.querySelector("#atBashDecrypt").value).toLowerCase(); // grab input text and cast to lower case
var outputTextBoxAB = document.querySelector("#atBashClear"); // grab output text box

function caesarDecrypt() {

try {  

  var textToDecrypt = [];  // Array to pass words/word to, to decrypt
  var textToDecryptCR = document.querySelector("#inputCeasarDecrypt").value;  // grab the input text

  var enteredText = String(textToDecryptCR).toLowerCase(); // Convert inputText to lowercase
  textToDecrypt = enteredText.split(" "); // split up input text by space and pass to empty array textToDecrypt
  
  
  var outputTextBoxCR = document.querySelector("#outputCeasarDecrypt"); // Select our output text box

  

  
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

              pastDecryption.push("Ceaser - " + textToDecrypt + " to " + encryptedText);

          }
          
      }
      encryptedText += " "; // add a space at the end of the word, incase there are multiple words

  });  

  outputTextBoxCR.innerHTML = encryptedText; // Set our output test box equal to our encrypted text

} catch(err) {
  alert(err.message);
}
  
}

function polybiusDecrypt() {

   try {
    var textToDecryptPB = (document.querySelector("#inputPolybiusDecrypt").value); // takes text from 'encrypted text' box
    var textDecryptArray = []; // Allows the input to be grouped into sets of two
    var outputTextBoxPB = document.querySelector("#outputPolybiusDecrypt"); // targets the 'clear text' output box
    var decryptedText = ""; // setup our output message

    if (/^[a-zA-Z]+$/.test(textToDecryptPB)) { // Checks to see if you typed anything that was a letter 

        decryptedText = "Please only use number pairs that coorilate with a letter. (No letters, or non numeric charecters)";

    }

    

    for (var i = 0; i<textToDecryptPB.length-1; i+=2) { // Takes the input text and puts it in groups of two, allowing us to match those number pairings with the above key array

        textDecryptArray.push((textToDecryptPB[i]+''+textToDecryptPB[i+1]));

       }

    for (var i =0; i < textDecryptArray.length; i++) { // Step through each letter in the input text
        
        decryptedText += polybiusSquareReverseKey[textDecryptArray[i]]; // matches each number pair with its letter value
        
    }

    if (decryptedText.includes('undefined')) { // Checks for number pairs that wouldnt have a letter (aka wrong number pairs)

        decryptedText = "Please only use number pairs that coorilate with a letter. (No letters, or non numeric charecters)";

    } else {

        pastDecryption.push("Polybius - " + textToDecryptPB + " to " + decryptedText);


    }

         

    outputTextBoxPB.innerHTML = decryptedText; // set our output message


    function checkIfLetterInArraysP(letter, rowsArray) { // function to check if current letter is in our polybius square, we only check if it is in the rows, because
                                                         // this covers all possible letters
        if (rowsArray[letter]) { // Return true if our letter is in the polybius square
            return true;
        } else { // every other character, return false. Meaning y or a number or (),&,^,% etc.
            return false;
        }

    }
   } catch (err) {
    alert(err.message);
   }
}

function atBashDecrypt() {

        try {

        
        var decryptedTextAB = ""; // setup our output message
        
        if (!(/^[a-zA-Z\s]*$/.test(textToDecryptAB))) { // Checks to see if you entered something that wasnt a letter or a space.

            decryptedTextAB = "Please only use letters.";

        } else { // The else goes on with the rest of the program

        for (var i =0; i < textToDecryptAB.length; i++) { // Step through each letter in the input text
            
            
                
            decryptedTextAB += atBashValues[textToDecryptAB[i]];

            
            
        }

        pastDecryption.push("Atbash - " + textToDecryptAB + " to " + decryptedTextAB);

        }

        

        outputTextBoxAB.innerHTML = decryptedTextAB;
    } catch {
        alert(err.message);

    }

}

// function submitDecrpyt() {

//     pastDecryption.push("Atbash - " + textToDecryptAB + " to " + decryptedTextAB);

//     pastDecryption.push("Polybius - " + textToDecryptPB + " to " + decryptedText);

//     pastDecryption.push("Ceaser - " + textToDecrypt + " to " + encryptedText);

// }

function pastDecryptions() {

    var pastDecryptOutput = document.querySelector("#pastDecryptOutput"); // Grabs the output area of the list

    if (timesRun >= 1) { // function to erase previous list after button is clicked, used more than once because there should be no list the first time

        pastDecryptOutput.innerHTML = ""; // sets output back to nothing
        
    } else {


    }

    var extraLength = pastDecryption.length - 10; // finds how many extra numbers there might be as the list caps at the past 10

    // console.log(extraLength + " " + pastDecryption.length); 

    if (pastDecryption.length >= 9) { // Finds out if 1. The length of the array with the past results is above 10, then 2. sets it to 10

        pastDecryption.splice(0, extraLength); // takes only the last 10

    }

        for (i = 0; i < pastDecryption.length && i <= 9; i++){ // Sets/Displays the output

            pastDecryptOutput.innerHTML += (i+1) + ": " + pastDecryption[i] + "<br>";
    
        }
    
    

    timesRun+=1; // incraments the times run var for the first if statement on line 165


}
