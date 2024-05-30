/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let tempString1 = ""
    let tempString2 = ""
    let i = 0
    let  currentStarter = 0
    if (s.length < 2){
        return s.length
    }
    for(const letter of s){
        if(!tempString2.includes(letter)){
            tempString2 += letter
        }else{
            currentStarter += tempString1.length
            if(tempString2.length >= tempString1.length){
                tempString1 = tempString2
            }
            i = (i==s.length-1) ? i-1 : i
            tempString2 = s.slice(tempString2.indexOf(letter)+1+currentStarter, i+1)
        }
        i++
    }
    return Math.max(tempString1.length, tempString2.length)
};



//Method 2



var lengthOfLongestSubstring = function (s) {
    if (s.length <= 2) {
        if (s.length == 0) return 0;
        if (s.length == 1) return 1;
        return s[0] == s[1] ? 1 : 2;
    }

    const substrings = new Set([])
    const recordedLetters = new Set([]);
    let lastIndex = 0;
    for (let i = 0; i < s.length; i++) {
        const letter = s[i];
        console.log("i =- ", i)
        console.log("letter =- ", letter)
        console.log("lastIndex =- ", lastIndex)
        if (recordedLetters.has(letter)) {
            recordedLetters.clear();
            const substring = s.slice(lastIndex, i);
            substrings.add(substring);
            lastIndex = i;
            i--;
            console.log("recordedLetters =- ", Array.from(recordedLetters))
            console.log("substrings =- ", Array.from(substrings))
            continue;
        } else {
            recordedLetters.add(letter);
            if (i == s.length - 1) {
                const substring = s.slice(lastIndex, i + 1);
                console.log(substring)
                substrings.add(substring);
            }
            console.log("recordedLetters =- ", Array.from(recordedLetters))
            console.log("substrings =- ", Array.from(substrings))
        }

    }

    const resultArray = Array.from(substrings).sort((a, b) => a.length - b.length).reverse();
    console.log(resultArray)
    return resultArray[0].length;
};
