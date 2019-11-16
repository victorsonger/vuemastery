class Dep {
  constructor() {
    this.subscribe = [];
  }
  depend() {
    if (target && !this.subscribe.includes(target)) {
      this.subscribe.push(target);
    }
  }
  notify() {
    this.subscribe.forEach(sub => sub());
  }
}

const dep = new Dep();

let target = null; // 为何此处要把target设为一个全局变量，而非只是作为传入watcher的参数去使用？
function watcher(myFunc) {
  target = myFunc;
  dep.depend();
  target();
  target = null;
}

let price = 5;
let quantity = 2;
let total = 0;

watcher(() => {
  total = price * quantity;
});
