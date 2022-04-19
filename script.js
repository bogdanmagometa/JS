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

function reverseString3(toReverse) {
    let newString = '';
    for (let idx = toReverse.length - 1; idx >= 0; --idx) {
        newString += toReverse[idx];
    }
    return newString
}

console.log(reverseString1("123"));
console.log(reverseString2("123"));
console.log(reverseString3("123"));
