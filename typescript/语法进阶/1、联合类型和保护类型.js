"use strict";
// 类型断言的方式
function trainAnimate(animal) {
    if (animal.fly) {
        animal.sing();
    }
    else {
        animal.bark();
    }
}
// in 语法类型保护
function trainAnimate2(animal) {
    if ('sing' in animal) {
        animal.sing();
    }
    else {
        animal.bark();
    }
}
// typeof 数据类型检测
function add(one, tow) {
    if (typeof one === 'string' || typeof tow === 'string') {
        return "" + one + tow;
    }
    else {
        return one + tow;
    }
}
var countObj = /** @class */ (function () {
    function countObj() {
    }
    return countObj;
}());
// instanceof 数据类型检测
function addSecond(one, tow) {
    if (one instanceof countObj && tow instanceof countObj) {
        return one.count + tow.count;
    }
    else {
        return 0;
    }
}
