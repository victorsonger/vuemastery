let data = {
  price: 5,
  quantity: 2
};

class Dep {
  constructor() {
    this.subscribes = [];
  }
  depend() {
    console.log('target--', target);
    if (target && !this.subscribes.includes(target)) {
      this.subscribes.push(target);
    }
  }
  notify() {
    this.subscribes.forEach(sub => sub());
  }
}

Object.keys(data).forEach(key => {
  let internalValue = data[key];

  const dep = new Dep();
  Object.defineProperty(data, key, {
    get() {
      console.log(`target in ${key}'s get: ${target}`);
      dep.depend();
      console.log(`internalValue in ${key}'s' get: ${internalValue}`);
      return internalValue;
    },
    set(newVal) {
      console.log(`set ${key} to ${newValue}`);
      internalValue = newVal;
      dep.notify();
    }
  });
});

function watcher(myFunc) {
  target = myFunc;
  target();
  target = null;
}

watcher(() => {
  data.total = data.price * data.quantity;
});

