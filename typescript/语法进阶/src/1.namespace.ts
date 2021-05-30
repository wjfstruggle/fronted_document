///<reference path='./components.ts' />
namespace Home {
  export namespace Name {
    export const techer: Components.User = {
      name: "wujf",
    };
  }
  export class Page {
    constructor() {
      new Components.Header();
      new Components.Content();
      new Components.Footer();
    }
  }
}
