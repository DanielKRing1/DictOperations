"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// MODIFICATION OPERATIONS
function filterDict(originalDict, conditionToPass) {
    var filteredDict = {};
    for (var key in originalDict) {
        var value = originalDict[key];
        if (conditionToPass(key, value))
            filteredDict[key] = value;
    }
    return filteredDict;
}
function mutateDict(originalDict, mutate) {
    var mutatedDict = {};
    for (var key in originalDict) {
        var value = originalDict[key];
        var mutatedValue = mutate(key, value);
        mutatedDict[key] = mutatedValue;
    }
    return mutatedDict;
}
// COPY OPERATIONS
function copyDictRm(originalDict, blacklistKeys) {
    return filterDict(originalDict, function (key, value) { return !blacklistKeys.includes(key); });
}
function copyDictKeep(originalDict, whitelistKeys) {
    return filterDict(originalDict, function (key, value) { return whitelistKeys.includes(key); });
}
// OPERATOR OPERATIONS
// Subtraction
function subDictScalar(dict, scalar) {
    return mutateDict(dict, function (key, value) { return value - scalar; });
}
function subScalarDict(scalar, dict) {
    return mutateDict(dict, function (key, value) { return scalar - value; });
}
/**
 * Subtract subsequent Dictionaries from the first provided Dictionaries to get the sum of each key in an array of Dictionaries
 *
 * @param dicts Array of Dictionaries attributes to be summed up into a single Dictionary
 */
function subDicts() {
    var dicts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        dicts[_i] = arguments[_i];
    }
    // 1. Init to first dict
    var minuendDict = Object.assign({}, dicts[0]);
    // 2. Subtract each subsequent dict from difference
    for (var i = 1; i < dicts.length; i++) {
        var subtrahendDict = dicts[i];
        for (var key in subtrahendDict) {
            var subtrahend = subtrahendDict[key];
            minuendDict[key] -= subtrahend;
        }
    }
    return minuendDict;
}
// Division
function divideDictScalar(dict, scalar) {
    return mutateDict(dict, function (key, value) { return value / scalar; });
}
function divideScalarDict(scalar, dict) {
    return mutateDict(dict, function (key, value) { return scalar / value; });
}
function divideDicts(a, b) {
    var keysToDivideOn = getIntersectingDictKeys(a, b);
    var dividedDict = {};
    for (var _i = 0, keysToDivideOn_1 = keysToDivideOn; _i < keysToDivideOn_1.length; _i++) {
        var key = keysToDivideOn_1[_i];
        dividedDict[key] = a[key] / b[key];
    }
    return dividedDict;
}
// Addition
function sumDictScalar(dict, scalar) {
    var newDict = {};
    return mutateDict(dict, function (key, value) { return value + scalar; });
}
/**
 * Add up an array of Dictionaries to get the sum of each key in an array of Dictionaries
 *
 * @param dicts Array of Dictionaries attributes to be summed up into a single Dictionary
 */
function sumDicts() {
    var dicts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        dicts[_i] = arguments[_i];
    }
    var summedDict = {};
    for (var _a = 0, dicts_1 = dicts; _a < dicts_1.length; _a++) {
        var dict = dicts_1[_a];
        for (var key in dict) {
            if (!summedDict.hasOwnProperty(key))
                summedDict[key] = 0;
            var addend = dict[key];
            summedDict[key] += addend;
        }
    }
    return summedDict;
}
// Multiplication
function multiplyDictScalar(dict, scalar) {
    return mutateDict(dict, function (key, value) { return value * scalar; });
}
function multiplyDicts(a, b) {
    var keysToDivideOn = getIntersectingDictKeys(a, b);
    var multipliedDict = {};
    for (var _i = 0, keysToDivideOn_2 = keysToDivideOn; _i < keysToDivideOn_2.length; _i++) {
        var key = keysToDivideOn_2[_i];
        multipliedDict[key] = a[key] * b[key];
    }
    return multipliedDict;
}
// Other operations
/**
 * "Add up" an array of Dictionaries, then apply some averaging export function to each key to get the (potentially weighted) "average" of each key in an array of Dictionaries
 *
 * @param dicts Array of Dictionaries attributes to be averaged up into a single Dictionary
 */
function avgDicts(getAvg) {
    var dicts = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        dicts[_i - 1] = arguments[_i];
    }
    var summedDict = {};
    var occurenceDict = {};
    for (var _a = 0, dicts_2 = dicts; _a < dicts_2.length; _a++) {
        var dict = dicts_2[_a];
        for (var key in dict) {
            if (!summedDict.hasOwnProperty(key)) {
                summedDict[key] = 0;
                occurenceDict[key] = 0;
            }
            var addend = dict[key];
            summedDict[key] += addend;
            occurenceDict[key]++;
        }
    }
    var avgedDict = {};
    for (var key in summedDict) {
        var sum = summedDict[key];
        var count = occurenceDict[key];
        avgedDict[key] = getAvg(sum, count);
    }
    return avgedDict;
}
// UNION AND INTERSECTION OPERATIONS
/**
 * Given n dicts, get the keys that are present in all n dicts
 *
 * @param dicts
 */
function getIntersectingDictKeys() {
    var dicts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        dicts[_i] = arguments[_i];
    }
    var totalDicts = dicts.length;
    var keyCounter = {};
    for (var _a = 0, dicts_3 = dicts; _a < dicts_3.length; _a++) {
        var dict = dicts_3[_a];
        for (var key in dict) {
            if (!keyCounter.hasOwnProperty(key))
                keyCounter[key] = 0;
            keyCounter[key]++;
        }
    }
    var intersectingKeys = [];
    for (var key in keyCounter) {
        var count = keyCounter[key];
        if (count === totalDicts)
            intersectingKeys.push(key);
    }
    return intersectingKeys;
}
exports.default = {
    filterDict: filterDict,
    mutateDict: mutateDict,
    copyDictRm: copyDictRm,
    copyDictKeep: copyDictKeep,
    subDictScalar: subDictScalar,
    subScalarDict: subScalarDict,
    subDicts: subDicts,
    divideDictScalar: divideDictScalar,
    divideScalarDict: divideScalarDict,
    divideDicts: divideDicts,
    sumDictScalar: sumDictScalar,
    sumDicts: sumDicts,
    multiplyDictScalar: multiplyDictScalar,
    multiplyDicts: multiplyDicts,
    avgDicts: avgDicts,
    getIntersectingDictKeys: getIntersectingDictKeys,
};
