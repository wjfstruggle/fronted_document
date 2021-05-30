namespace Components {
  export interface User {
    name: string;
  }
  export class Header {
    constructor() {
      let elem = document.createElement("div");
      elem.innerText = "this is header";
      document.body.appendChild(elem);
    }
  }
  export class Content {
    constructor() {
      let elem = document.createElement("div");
      elem.innerText = "this is content";
      document.body.appendChild(elem);
    }
  }
  export class Footer {
    constructor() {
      let elem = document.createElement("div");
      elem.innerText = "this is footer";
      document.body.appendChild(elem);
    }
  }
}
