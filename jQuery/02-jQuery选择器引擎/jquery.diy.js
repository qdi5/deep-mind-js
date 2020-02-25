;(function(global, factory) {
  factory(global);
})(typeof window !== 'undefined' ? window : this, function (window) {
  var class2type = {}
  var toString = class2type.toString
  var match, elem
  // 匹配html字符串，如<div>，或id选择器
  // ?: 代表参与匹配，但是不捕获
  // \s*(<[\w\W]+>)[^>]* 如果缺少最后的[^>]*，则无法匹配<div>6这种情况
  // \s*(<[\w\W]+>) 匹配以<开头，以及>结尾的整个字符串（中间无论是什么字符都会匹配成功） 
  var rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/
  var rejectExp = /^<(\w+)\s*\/?>$/
  function jQuery(selector, context) {
    return new jQuery.fn.init(selector, context)
  }
  jQuery.prototype = {
    // length的作用：确保jQuery.merge(this, [])正常运行
    length: 0,
    init: function (selector, context) {
      // 选择器传入的是字符串的情况
      if (jQuery.isString(selector)) {
        // html字符串
        if (selector[0] === '<' && selector[selector.length - 1] === '>' && selector.length >= 3) {
          match = [null, selector, null]
        } else {
          match = rquickExpr.exec(selector)
        }
        if (match && match[1]) {
          // html字符串，形如<div>这种字符串，创建dom
          jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context : document))
          return this
        } else {
          // id字符串，查询dom
          elem = document.getElementById(match[2])
          this[0] = elem
          this.length = 1
        }
        
      } else if (selector.nodeType) { // Element对象
        this[0] = selector
        this.length = 1
        return this
      }

      
    }  
  }
  jQuery.fn = jQuery.prototype.init.prototype = jQuery.prototype
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
    isArray: function (arr) {
      return toString.call(arr) === '[object Array]'
    },
    isFunction: function (arr) {
      return typeof arr === 'function'
    },
    isNumber: function (num) {
      return typeof num === 'number' 
    },
    isString: function (str) {
      return typeof str === 'string'
    },
    // 将类数组对象转换为真正的数组
    /**
     * 
     * @param {类数组} arr 
     */
    makeArray: function (arr) {
      let result = []
      if (arr && arr.length) {
        return jQuery.merge(result, arr)
      }
    },
    // 合并传入的两个数据（数组或对象）
    /**
     * 
     * @param {数组} first 
     * @param {数组，或者是key为数字的对象} second 
     */
    merge: function (first, second) {
      debugger
      let f = first.length
      let s = second.length
      let j = 0
      if (jQuery.isNumber(s)) {
        for (let i = 0; i < s; i++) {
          first[f++] = second[i]
        }
      } else {
        if (jQuery.isPlainObject(second)) {
          while (typeof second[j] !== 'undefined') {
            first[f++] = second[j++]
          }
        }
      }
      return first
    },
    parseHTML: function (data, context) {
      if (!data || typeof data !== 'string') {
        return null
      }
      var parse = rejectExp.exec(data)
      return context.createElement(parse[1])
    }
  })
  window.$ = window.jQuery = jQuery
})