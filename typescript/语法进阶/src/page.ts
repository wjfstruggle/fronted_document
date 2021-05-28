let page:string = '张三'

// console.log(page)

class Header {
  constructor() {
    let elem = document.createElement('div')
    elem.innerText = 'this is header'
    document.body.appendChild(elem)
  }
}
class Content {
  constructor() {
    let elem = document.createElement('div')
    elem.innerText = 'this is content'
    document.body.appendChild(elem)
  }
}
class Footer {
  constructor() {
    let elem = document.createElement('div')
    elem.innerText = 'this is footer'
    document.body.appendChild(elem)
  }
}
class Page {
  constructor() {
    new Header();
    new Content();
    new Footer();
  }
}
