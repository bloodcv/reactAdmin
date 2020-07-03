function recursiveComparison(objA, objB, flag) {
  for (let key in objA) {
      // 如果objA的key不存在objB中,比较结果为false
      if (!objB.hasOwnProperty(key)) flag = false;
      // 递归调用compareDeeply,进行比较
      flag = compareDeeply(objA[key], objB[key]);
      // 当每一次递归调用递归compareDeeply的结果为false时，跳出循环
      if (!flag) break;
  }
  return flag;
}

const utils = {
  isArray: (value) => Array.isArray(value),
  isObject: (value) => typeof (value) === "object",
  getLength: (value) => {
      if (utils.isArray(value)) return value.length;
      if (utils.isObject(value)) return Object.keys(value).length;
  }
}

function compareDeeply(objA, objB) {
  // 如果objA和objB的类型不全为Object,比较结果为两者严格相等===
  if (!utils.isObject(objA) || !utils.isObject(objB)) return objA === objB;
  // objA和objB都是Object，先判断类型是否全为Object或者Array
  if (objA.constructor !== objB.constructor) return false;
  // objA和objB都是Object,先比较两个obj的长度
  if (utils.getLength(objA) !== utils.getLength(objB)) return false;
  // 执行到此处时，说明要比较的两个对象的长度相等，类型为object / array
  return recursiveComparison(objA, objB, true);
}

export default compareDeeply;
