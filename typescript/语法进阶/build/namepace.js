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
var State;
(function (State) {
    State[State["OFFLINE"] = 0] = "OFFLINE";
    State[State["ONLINE"] = 1] = "ONLINE";
    State[State["DELELTED"] = 2] = "DELELTED";
})(State || (State = {}));
function getResult(status) {
    if (status == State.ONLINE) {
        return 'online';
    }
    else if (status == State.OFFLINE) {
        return 'offline';
    }
    else if (status == State.DELELTED) {
        return 'deleted';
    }
    return 'error';
}
// 泛型，泛指的类型
function join(first, second) {
    return "" + first + second;
}
join(1, 2);
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
var Components;
(function (Components) {
    var Header = /** @class */ (function () {
        function Header() {
            var elem = document.createElement("div");
            elem.innerText = "this is header";
            document.body.appendChild(elem);
        }
        return Header;
    }());
    Components.Header = Header;
    var Content = /** @class */ (function () {
        function Content() {
            var elem = document.createElement("div");
            elem.innerText = "this is content";
            document.body.appendChild(elem);
        }
        return Content;
    }());
    Components.Content = Content;
    var Footer = /** @class */ (function () {
        function Footer() {
            var elem = document.createElement("div");
            elem.innerText = "this is footer";
            document.body.appendChild(elem);
        }
        return Footer;
    }());
    Components.Footer = Footer;
})(Components || (Components = {}));
///<reference path='./components.ts' />
var Home;
(function (Home) {
    var Name;
    (function (Name) {
        Name.techer = {
            name: "wujf",
        };
    })(Name = Home.Name || (Home.Name = {}));
    var Page = /** @class */ (function () {
        function Page() {
            new Components.Header();
            new Components.Content();
            new Components.Footer();
        }
        return Page;
    }());
    Home.Page = Page;
})(Home || (Home = {}));
