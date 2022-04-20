const reverseStringSplit = function (toReverse) {
    return toReverse.split("").reverse().join("");
}

const reverseStringRecursive = function (toReverse) {
    if (toReverse === '') {
        return '';
    }
    let len = toReverse.length;
    return toReverse[len - 1] + reverseStringRecursive(toReverse.substring(0,  len-1));
}

const reverseStringIterative1 = function (toReverse) {
    let newString = '';
    for (let idx = toReverse.length - 1; idx >= 0; --idx) {
        newString += toReverse[idx];
    }
    return newString;
}

const reverseStringIterative2 = function (toReverse) {
    let newString = '';
    for (let ch of toReverse) {
        newString = ch + newString;
    }
    return newString;
}

const reverseStringIterative3 = function (toReverse) {
    let newString = '';
    for (let idx in toReverse) {
        newString = toReverse[idx] + newString;
    }
    return newString;
}

const reverseStringIterative4 = function (toReverse) {
    let newStringArray = [];
    toReverse.split('').forEach((value, i, arr) => {
        newStringArray.splice(0, 0, value);
    });
    return newStringArray.join('');
}

const testStr = "12345";
const allMethods = [reverseStringSplit, reverseStringRecursive, reverseStringIterative1, reverseStringIterative2, reverseStringIterative3, reverseStringIterative4];

for (const method of allMethods) {
    console.log(method(testStr));
}
