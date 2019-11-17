/**
  *
  * @param p 父对象
  * @param c 子对象(不填默认为{})
  * @returns 继承父对象的属性
  */
//深拷贝对象
function deepCopy(p, c, isDeep) {
  var c = c || {};
  for (var i in p) {
    if (p.hasOwnProperty(i)) {
      if (typeof p[i] === 'object') {
        c[i] = (p[i].constructor === Array) ? [] : {};
        deepCopy(p[i], c[i], true);
      } else {
        c[i] = p[i];
      }
    }
  }
  return c;
}