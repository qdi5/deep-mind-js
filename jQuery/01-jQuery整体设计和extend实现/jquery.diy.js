;(function(global, factory) {
  factory(global);
})(typeof window !== 'undefined' ? window : this, function (window) {
  var class2type = {}
  var toString = class2type.toString
  
  function jQuery () {
    return new fn()
  }
  function fn() {

  }
  jQuery.prototype = {
    init: function () {
      return 'jQuery初始化方法'
    }  
  }
  jQuery.fn = fn.prototype = jQuery.prototype
  jQuery.extend = jQuery.fn.extend = function () {
    // 目标对象（被扩展的对象）
    var target = arguments[0]
    // 传递给函数的参数个数
    var length = arguments.length
    // 循环arguments的初使索引
    var i = 1
    // 属性名
    var name
    // 是否深拷贝
    var isDeep
    // 复制的是否是数组
    var copyIsArray
    var clone
    // 如果第一个参数是布尔值
    if (typeof target === 'boolean') {
      isDeep = target
      target = arguments[1]
      i = 2
    }

    // 确保函数的目标参数为Object
    if (typeof target !== 'object') {
      target = {}
    }
    // 一个参数  $.extend(a) 或者是 $.fn.extend(a)
    // 给jQuery本身扩展，或者是给jQuery的实例扩展
    if (length === 1) {
      target = this
      i--
    }

    for (; i < length; i++) {
      var current = arguments[i]
      // 差距  // arguments[i]临界值判断
      // 这里还不能调用jQuery.isPlainObject，因为isPlainObject还没有扩展到jQuery上
      // 所以，这里用个简单的判断
      if (current !== null) {
        // 当for in循环对象的时候，name是属性名
        // 当for in循环数组的时候，name是索引
        for (name in current) {
          // 需要考虑，被扩展对象target对应的属性值是否是对象或数组，如果是的情况，需要将值赋值给clone
          var src = target[name];
          var val = current[name];
          if (
            isDeep &&
            (jQuery.isPlainObject(val) || (copyIsArray = jQuery.isArray(val)))
          ) {
            console.log(copyIsArray);
            if (copyIsArray) {
              //  差距  // src可能为undefined，如果是undefined，直接赋值为[]，减少后续代码运行
              clone = src && jQuery.isArray(src) ? src : [];
              // 防止后面的循环中，copyIsArray一直是true
              copyIsArray = false;
            } else {
              //  差距  // src可能为undefined，如果是undefined，直接赋值为{}，减少后续代码运行
              clone = src && jQuery.isPlainObject(src) ? src : {};
            }
            target[name] = jQuery.extend(isDeep, clone, val);
          } else {
            if (typeof val !== "undefined") {
              target[name] = val;
            }
          }
        }
      }
    }
    return target
  }
  jQuery.extend({

    isPlainObject: function (obj) {
      return toString.call(obj) === "[object Object]";
    },
    isArray: function (ary) {
      return toString.call(ary) === '[object Array]'
    }
  })
  window.$ = window.jQuery = jQuery
})