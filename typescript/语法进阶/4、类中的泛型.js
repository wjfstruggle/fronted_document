"use strict";
var dataManage = /** @class */ (function () {
    function dataManage(data) {
        this.data = data;
    }
    dataManage.prototype.getItem = function (index) {
        return this.data[index];
    };
    return dataManage;
}());
var data = new dataManage(['111']);
// 泛型
var dataManage2 = /** @class */ (function () {
    function dataManage2(data) {
        this.data = data;
    }
    dataManage2.prototype.getItem = function (index) {
        return this.data[index].name;
    };
    return dataManage2;
}());
var data2 = new dataManage2([
    {
        name: 'wujf'
    }
]);
