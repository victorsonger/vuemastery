let data = {
  price: 5,
  quantity: 2
};

let total = null;
Object.keys(data).forEach(key => {
  let internalValue = data[key]; // 设置属于这个属性的intervalue （被封装在这一次循环的作用域里）
  Object.defineProperty(data, key, {
    get() {
      console.log(`获取属性 ${key}： ${internalValue}`);
      return internalValue;
    },
    set(newVal) {
      console.log(`将属性 ${key}设置为：${newVal}`);
      internalValue = newVal;
    }
  });
});

total = data.price * data.quantity;
