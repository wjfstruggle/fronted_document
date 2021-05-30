"use strict";
var Home;
(function (Home) {
    var Header = /** @class */ (function () {
        function Header() {
            var elem = document.createElement('div');
            elem.innerText = 'this is header';
            document.body.appendChild(elem);
        }
        return Header;
    }());
    var Content = /** @class */ (function () {
        function Content() {
            var elem = document.createElement('div');
            elem.innerText = 'this is content';
            document.body.appendChild(elem);
        }
        return Content;
    }());
    var Footer = /** @class */ (function () {
        function Footer() {
            var elem = document.createElement('div');
            elem.innerText = 'this is footer';
            document.body.appendChild(elem);
        }
        return Footer;
    }());
    var Page = /** @class */ (function () {
        function Page() {
            new Header();
            new Content();
            new Footer();
        }
        return Page;
    }());
    Home.Page = Page;
})(Home || (Home = {}));
