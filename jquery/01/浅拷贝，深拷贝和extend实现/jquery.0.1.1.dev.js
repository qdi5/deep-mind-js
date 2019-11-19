(function(root) {
  // jQuery构造函数
  let jQuery = function() {
    return new jQuery.prototype.init()
  }
  jQuery.fn = jQuery.prototype = {
    init: function () {
      console.log('这里是初始化方法')
    },
    css: function () {
      console.log('这里是css方法')
    }
  }
  jQuery.fn.init.prototype = jQuery.fn
  jQuery.fn.extend = jQuery.extend = function () {
    let length = arguments.length
    //  被扩展的目标对象
    let target
    // 是否深拷贝？
    let deep = false
    // 拷贝的对象是否是数组
    let copyIsArray = false
    if (length === 1) {
      target = this
      let extendObj = arguments[0]
      for (let attr in extendObj) {
        if (typeof extendObj[attr] !== 'undefined') {
          target[attr] = extendObj[attr]
        }
      }
    } else {
      if (typeof arguments[0] === 'boolean') {
        deep = arguments[0]
        target = arguments[1]
        for (let i = 2; i < length; i++) {
          let current = arguments[i]
          for (let attr in current) {
            let currentValue = current[attr]
            if (deep) {
              if (
                jQuery.isPlainObject(currentValue) ||
                (copyIsArray = jQuery.isArray(currentValue))
              ) {
                if (copyIsArray) {
                  // 如果是数组，则遍历数组，将普通值，直接push，引用值，继续使用浅拷贝方法拷贝过来
                 function dgs(currentValue) {
                    let result = []
                    let obj = {}
                    for (let item of currentValue) {
                      if (jQuery.isPlainObject(item)) {
                        if (jQuery.isArray(item)) {
                          dgs(item)
                        } else {
                          jQuery.extend(true, obj, item);
                          result.push(obj);
                        }
                      } else {
                        result.push(item);
                      }
                    }
                    return result;
                  }
                  let result = dgs(currentValue);
                  target[attr] = result
                } else {
                  let tObj = {}
                  // 如果是数组
                  jQuery.extend(true, tObj, currentValue);
                  target[attr] = tObj
                }
              } else {
                target[attr] = current[attr]
              }
            } else {
              target[attr] = current[attr]
            }
          }
        }
      } else {
        target = arguments[0]
        for (let i = 1; i < length; i++) {
          let current = arguments[i]
          for (let attr in current) {
            target[attr] = current[attr]
          }
        }
      }
    }
  }
  jQuery.extend({
    isPlainObject: function (value) {
      return typeof value === 'object'
    },
    isArray: Array.isArray || function (value) {
      return toString.call(value).toLowerCase() === '[object array]'
    }
  })
  root.$ = root.jQuery = jQuery
 })(this)
