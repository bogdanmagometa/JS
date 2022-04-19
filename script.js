function reverseString1(toReverse) { // split/join
    return toReverse.split("").reverse().join("");
}

function reverseString2(toReverse) { // recursive
    if (toReverse === '') {
        return '';
    }
    let len = toReverse.length;
    return toReverse[len - 1] + reverseString2(toReverse.substring(0,  len-1));
}

function reverseString3(toReverse) { // iterative #1
    let newString = '';
    for (let idx = toReverse.length - 1; idx >= 0; --idx) {
        newString += toReverse[idx];
    }
    return newString;
}

function reverseString4(toReverse) { // iterative #2
    let newString = '';
    for (let ch of toReverse) {
        newString = ch + newString;
    }
    return newString;
}

function reverseString5(toReverse) { // iterative #3
    let newString = '';
    for (let idx in toReverse) {
        newString = toReverse[idx] + newString;
    }
    return newString;
}

let testStr = "1234";

console.log(reverseString1(testStr));
console.log(reverseString2(testStr));
console.log(reverseString3(testStr));
console.log(reverseString4(testStr));
console.log(reverseString5(testStr));
