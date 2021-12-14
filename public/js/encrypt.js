var originalAlphabet = {1:"a", 2:"b", 3:"c", 4:"d", 5:"e", 6:"f", 7:"g", 8:"h", 9:"i", 10:"j", 11:"k",
                       12:"l", 13:"m", 14:"n", 15:"o", 16:"p", 17:"q", 18:"r", 19:"s", 20:"t", 21:"u", 22:"v", 23:"w", 24:"x", 25:"y", 26:"z"};

var polybiusSquareRowValues = {"a": 1, "b": 1, "c": 1, "d": 1, "e": 1, "f": 2, "g": 2, "h": 2, "i": 2, "j": 2, "k": 3, "l": 3, "m": 3, "n": 3,
                              "o": 3, "p": 4, "q": 4, "r": 4, "s": 4, "t": 4, "u": 5, "v": 5, "w": 5, "x": 5, "z": 5};

var polybiusSquareColumnValues = {"a": 1, "b": 2, "c": 3, "d": 4, "e": 5, "f": 1, "g": 2, "h": 3, "i": 4, "j": 5, "k": 1, "l": 2, "m": 3, "n": 4,
                                 "o": 5, "p": 1, "q": 2, "r": 3, "s": 4, "t": 5, "u": 1, "v": 2, "w": 3, "x": 4, "z": 5};

// var atBashValues = {"z":"a", "y":"b", "x":"c", "w":"d", "v":"e", "u":"f", "t":"g", "s":"h", "r":"i", "q":"j", "p":"k",
//                        "o":"l", "n":"m", "m":"n", "l":"o", "k":"p", "j":"q", "i":"r", "h":"s", "g":"t", "f":"u", "e":"v", "d":"w", "c":"x", "b":"y", "a":"z", " ":" "};
var alphabetStringSpan = "defghijklmnopqrstuvwxyzabc";

function caesarEncrypt() {

    
    
    
    try {

        var textToEncrypt = [];  // Array to pass words/word to, to encrypt
        var inputText = document.querySelector("#caesarInputText").value;  // grab the input text

        var enteredText = String(inputText).toLowerCase(); // Convert inputText to lowercase
        textToEncrypt = enteredText.split(" "); // split up input text by space and pass to empty array textToEncrypt
        
        
        var outputText = document.querySelector("#caesarOutputText"); // Select our output text box

        var alphabetShift = document.querySelector("#caesarShift").value; // Select our shift

        var encryptedText = ""; // our encrypted text will go here
        
        var newAlphabetString = "";
        var isShifted = false;
        var shiftedAlphaSpan = document.querySelector("#shiftedAlphabet");

        if (parseInt(alphabetShift) < 0 || parseInt(alphabetShift) > 26) { // This is for catching the user entering negative numbers and/or numbers higher than 26
            encryptedText = "Invalid Shift. Enter a number 0-26 to shift by";
        } else {
            
            
            textToEncrypt.forEach(word => {  // Step through our textToEncrypt array
                
                for (var i = 0; i < word.length; i++) {  // Step through each letter of our word in our for each loop

                    if (Number.isInteger(parseInt(word[i]))) { // Catch user entering a number into input box
                        encryptedText = "You can not encrypt numbers with Caesar Encryption. Please retype your phrase.";
                        break;
                    } else {

                        if (!isShifted) { // to check if the alphabet has been shifted/displayed for user

                            for (let key of Object.keys(originalAlphabet)) {
                                

                                if ((parseInt(key) + parseInt(alphabetShift)) > 26) {         
                                    newAlphabetString += originalAlphabet[(parseInt(key) + parseInt(alphabetShift)) - 26];
                                } else {
                                    newAlphabetString += originalAlphabet[(parseInt(key) + parseInt(alphabetShift))]; 
                                }

                            }
                            isShifted = true;
                            if (!newAlphabetString == "") {
                                alphabetStringSpan = newAlphabetString;
                            }
                        }

                        for (let key of Object.keys(originalAlphabet)) { // Step through each key in our originalAlphabet associative array and compare to the current letter we are checking in the word,
                                                                        // then add the new letter to our encryptedText output message
                            if (originalAlphabet[key] == word[i]) {
                                if ((parseInt(key) + parseInt(alphabetShift)) > 26) {         // If the current key that was grabbed from the checked letter in our word is > 26, this means it is out of the scope of the array.
                                    encryptedText += originalAlphabet[(parseInt(key) + parseInt(alphabetShift)) - 26];// So we set the encrypted letter equal to the key + the shift - 26. (x with a shift of 4 will be b)
                                } else {
                                    encryptedText += originalAlphabet[(parseInt(key) + parseInt(alphabetShift))]; // Every other letter, we can shift by whatever the user specified, since it will not be out of the array's scope
                                }
                                
                            }
                        }

                    }
                    
                }
                encryptedText += " "; // add a space at the end of the word, incase there are multiple words

            });
            
            

        }
        outputText.innerHTML = encryptedText; // Set our output test box equal to our encrypted text
        shiftedAlphaSpan.innerHTML = alphabetStringSpan;
        
        
    } catch (err) {
        alert(err.message);
    }
    
}

function polybiusEncrypt() {

    try {
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
    } catch (err) {
        alert(err.message);
    }

}

//Chris's work on atbash encryption
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////

// function atBashEncrypt() {

//     var textToEncrypt = (document.querySelector("#atBashInputText").value).toLowerCase(); // grab input text and cast to lower case
//     var outputTextBox = document.querySelector("#atBashOutputText"); // grab output text box
//     var encryptedText = ""; // setup our output message
    
//     if (!(/^[a-zA-Z\s]*$/.test(textToEncrypt))) { // Checks to see if you entered something that wasnt a letter or a space.

//         encryptedText = "Please only use letters.";

//     } else { // The else goes on with the rest of the program

//     for (var i =0; i < textToEncrypt.length; i++) { // Step through each letter in the input text
        
        
            
//             encryptedText += atBashValues[textToEncrypt[i]];

        
        
//     }

// }

    

//     outputTextBox.innerHTML = encryptedText;

// }

function atbashEncrypt() {
    try {

    var textToEncrypt = [];  // Array to pass words/word to, to encrypt

    var inputText = document.querySelector("#atbashInputText").value;  // grab the input text

    var enteredText = String(inputText).toLowerCase(); // Convert inputText to lowercase
    textToEncrypt = enteredText.split(" "); // split up input text by space and pass to empty array textToEncrypt
    
    
    var outputText = document.querySelector("#atbashOutputText"); // Select our output text box


    var encryptedText = ""; // our encrypted text will go here
    
    textToEncrypt.forEach(word => {  // Step through our textToEncrypt array
        
        for (var i = 0; i < word.length; i++) {  // Step through each letter of our word in our for each loop

            if (Number.isInteger(parseInt(word[i]))) { // Catch user entering a number into input box
                encryptedText = "You can not encrypt numbers with Atbash Encryption. Please retype your phrase.";
                break;
            } else if ((/[a-z]/).test(word[i])) {  // check if current char of the word(s) is a letter

                for (let key of Object.keys(originalAlphabet)) { // Step through each key in our originalAlphabet associative array and compare to the current letter we are checking in the word,
                                                                // then add the new letter to our encryptedText output message
                    if (originalAlphabet[key] == word[i]) {
                        if (parseInt(key) <= 13) {         // If the current key that was grabbed from the checked letter in our word is <= 12, this means it is on the first half of alphabet
                            encryptedText += originalAlphabet[(0 - parseInt(key)) + 27]; // So we take the key value and subtract it from zero and add 26 to it to get our letter. (Ex. 0 - 3 = -3 + 26 = 23....Which would be c turns into x)
                        } else if (parseInt(key) > 13 && parseInt(key) <= 26) { // If key is greater than 12 and less than or equal to 25 it is on the second half of the alphabet
                            encryptedText += originalAlphabet[Math.abs(parseInt(key) - 27)]; // So we take the absolute value of the key - 25. (Ex. 21-25 = -4 absolute value is 4.... which would be v turns into e)
                        }
                        
                    }
                }

            } else { // Catch any other type of symbol or character that is not a letter.
                encryptedText = "You may only enter letters from the alphabet to encrypt.";
                break;
            }
            
        }
        encryptedText += " "; // add a space at the end of the word, incase there are multiple words

    });
    
    outputText.innerHTML = encryptedText; // Set our output test box equal to our encrypted text
    } catch {
    alert(err.message);

    }

}

