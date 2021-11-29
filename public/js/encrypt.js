var originalAlphabet = {0:"a", 1:"b", 2:"c", 3:"d", 4:"e", 5:"f", 6:"g", 7:"h", 8:"i", 9:"j", 10:"k",
                       11:"l", 12:"m", 13:"n", 14:"o", 15:"p", 16:"q", 17:"r", 18:"s", 19:"t", 20:"u", 21:"v", 22:"w", 23:"x", 24:"y", 25:"z"};

var polybiusSquareRowValues = {"a": 1, "b": 1, "c": 1, "d": 1, "e": 1, "f": 2, "g": 2, "h": 2, "i": 2, "j": 2, "k": 3, "l": 3, "m": 3, "n": 3,
                              "o": 3, "p": 4, "q": 4, "r": 4, "s": 4, "t": 4, "u": 5, "v": 5, "w": 5, "x": 5, "z": 5};

var polybiusSquareColumnValues = {"a": 1, "b": 2, "c": 3, "d": 4, "e": 5, "f": 1, "g": 2, "h": 3, "i": 4, "j": 5, "k": 1, "l": 2, "m": 3, "n": 4,
                                 "o": 5, "p": 1, "q": 2, "r": 3, "s": 4, "t": 5, "u": 1, "v": 2, "w": 3, "x": 4, "z": 5};

function caesarEncrypt() {

    var textToEncrypt = [];  // Array to pass words/word to, to encrypt
    var inputText = document.querySelector("#caesarInputText").value;  // grab the input text

    var enteredText = String(inputText).toLowerCase(); // Convert inputText to lowercase
    textToEncrypt = enteredText.split(" "); // split up input text by space and pass to empty array textToEncrypt
    
    
    var outputText = document.querySelector("#caesarOutputText"); // Select our output text box

    

    
    var encryptedText = ""; // our encrypted text will go here
    
    textToEncrypt.forEach(word => {  // Step through our textToEncrypt array
        
        for (var i = 0; i < word.length; i++) {  // Step through each letter of our word in our for each loop

            for (let key of Object.keys(originalAlphabet)) { // Step through each key in our originalAlphabet associative array and compare to the current letter we are checking in the word,
                                                             // then add the new letter to our encryptedText output message
                if (originalAlphabet[key] == word[i]) {
                    if ((parseInt(key) + 3) == 26) {         // If the current key that was grabbed from the checked letter in our word is = 26, this means it is out of the scope of the array.
                        encryptedText += originalAlphabet[0];// So we set the encrypted letter equal to the first letter of the alphabet. (x with a shift of 3 will be a)
                    } else if ((parseInt(key) + 3) == 27) { // 27 = b
                        encryptedText += originalAlphabet[1];
                    } else if ((parseInt(key) + 3) == 28) { // 28 = c
                        encryptedText += originalAlphabet[2];
                    } else {
                        encryptedText += originalAlphabet[(parseInt(key) + 3)]; // Every other letter, we can shift by three, since it will not be out of the array's scope
                    }
                    
                }
            }
            
        }
        encryptedText += " "; // add a space at the end of the word, incase there are multiple words

    });
    
    outputText.innerHTML = encryptedText; // Set our output test box equal to our encrypted text
    
}

function polybiusEncrypt() {

    var textToEncrypt = String(document.querySelector("#polybiusInputText").value).toLowerCase(); // grab input text and cast to lower case
    var outputTextBox = document.querySelector("#polybiusOutputText"); // grab output text box
    var encryptedText = ""; // setup our output message

    for (var i =0; i < textToEncrypt.length; i++) { // Step through each letter in the input text
        
        if (checkIfLetterInArraysP(textToEncrypt[i], polybiusSquareRowValues)) { // if our function call is true, grab the row and column value of the letter and add to our output message
            encryptedText += polybiusSquareRowValues[textToEncrypt[i]];
            encryptedText += polybiusSquareColumnValues[textToEncrypt[i]];
        }
        
    }

    outputTextBox.innerHTML = encryptedText; // set our output message


    function checkIfLetterInArraysP(letter, rowsArray) { // function to check if current letter is in our polybius square, we only check if it is in the rows, because
                                                         // this covers all possible letters
        if (rowsArray[letter]) { // Return true if our letter is in the polybius square
            return true;
        } else { // every other character, return false. Meaning y or a number or (),&,^,% etc.
            return false;
        }

    }

}