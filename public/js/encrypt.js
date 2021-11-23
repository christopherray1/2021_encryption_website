var originalAlphabet = {0:"a", 1:"b", 2:"c", 3:"d", 4:"e", 5:"f", 6:"g", 7:"h", 8:"i", 9:"j", 10:"k", 11:"l", 12:"m", 13:"n", 14:"o", 15:"p", 16:"q", 17:"r", 18:"s", 19:"t", 20:"u", 21:"v", 22:"w", 23:"x", 24:"y", 25:"z"};


function encrypt() {

    var textToEncrypt = [];
    var inputText = document.querySelector("#inputText").value;

    var enteredText = String(inputText).toLowerCase();
    textToEncrypt = enteredText.split(" ");
    console.log(textToEncrypt);
    
    var outputText = document.querySelector("#outputText");

    

    //var keysToChange = [];
    var encryptedText = "";
    
    textToEncrypt.forEach(word => {
        
        for (var i = 0; i < word.length; i++) {

            for (let key of Object.keys(originalAlphabet)) {
    
                if (originalAlphabet[key] == word[i]) {
                    //console.log(key);
                    if ((parseInt(key) + 3) == 26) {
                        //keysToChange.push((0));
                        encryptedText += originalAlphabet[0];
                    } else if ((parseInt(key) + 3) == 27) {
                        //keysToChange.push((1));
                        encryptedText += originalAlphabet[1];
                    } else if ((parseInt(key) + 3) == 28) {
                        //keysToChange.push((2));
                        encryptedText += originalAlphabet[2];
                    } else {
                        //keysToChange.push((parseInt(key) + 3))
                        encryptedText += originalAlphabet[(parseInt(key) + 3)];
                    }
                    
                }
            }
            
        }
        encryptedText += " ";

    });
    
    
    // for (var i =0; i < keysToChange.length; i++) {
    //     encryptedText += originalAlphabet[keysToChange[i]];
    // }



    outputText.innerHTML = encryptedText;
    
    

}