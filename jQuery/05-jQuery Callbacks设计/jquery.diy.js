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
  var rejectExp = /^<(\w+)\s*\/?>/
  // 存储Callbacks中控制回调的状态信息
  var optionsCache = {}
  // 匹配一个或多个空格
  var spaceExp = /\s+/
  // jQuery内部使用的一个公用实例对象
  var rootjQuery
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
        
      } else if (selector.nodeType) { // Element对象 $(document) $(window) $(this)
        this[0] = selector
        this.length = 1
        return this
      } else if (jQuery.isFunction(selector)) { // $(function () { console.log('dom 加载完成咯') })
        rootjQuery.ready(selector)
      } 
    },
    ready: function (selector) {
      document.addEventListener('DOMContentLoaded', jQuery.ready, false)
      if (jQuery.isReady) {
        // 如果DOM加载完成，则直接调用回调函数
        selector.call(jQuery)
      } else {
        jQuery.readyList.push(selector)
      }
    },
    css: function (name, value) {
      return jQuery.access(this, name, value, function(elem, name, value) {
        if (!jQuery.isUndefined(value)) {
          // set
          return jQuery.style(elem[0], name, value)
        }
          // get
        return jQuery.curCss(elem[0], name, value)
      })
    },
    text: function (name) {
      debugger
      return jQuery.access(this, name, name, function(elem, name) {
        if (!jQuery.isUndefined(name)) {
          // set
          return jQuery.setText(elem[0],name)
        }
        return jQuery.getText(elem[0])
      })
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
    isUndefined: function (u) {
      return typeof u === 'undefined'
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
          while (jQuery.isUndefined(second[j])) {
            first[f++] = second[j++]
          }
        }
      }
      return first
    },
    parseHTML: function (data, context) {
      if (!data || jQuery.isUndefined(data)) {
        return null
      }
      var parse = rejectExp.exec(data)
      return [context.createElement(parse[1])]
    },
    each: function (target, fn, context) {
      // jQuery中，利用length属性来判断对象，还是数组
      var length = target.length
      // 我这里的判断是以数组和对象来判断，
      // max使用的是context来判断，感觉都差不多???
      if (!jQuery.isUndefined(length)) {
        if (jQuery.isNumber(length)) {
          // 数组的情况
          if (context) {
            for (var i = 0; i < length; i++) {
              var current = target[i]
              fn.apply(current, context)
            }
          } else {
            for (var i = 0; i < length; i++) {
              var current = target[i]
              fn.call(current, i, current)
            }
          }
        }
      } else {
        // 对象的情况
        if (context) {
          for (var prop in target) {
            fn.apply(target, context)
          }
        } else {
          for (var prop in target) {
            fn.call(target, prop, target[prop])
          }
        }
      }
    },
    // 标识dom加载状态
    isReady: false,
    // 存储dom加载完成后需要执行的回调函数
    readyList: [],
    ready: function() {
      if (jQuery.readyList && jQuery.readyList.length) {
        jQuery.each(jQuery.readyList, function(i, fn) {
          this.call(rootjQuery)
        })
        jQuery.readyList = null
      }
    },
    /* 根据用户传入的参数个数，来判断用户行为 */
    /*
            $('#box').css('background')
            $('#box').css('background', 'red')
            $('#box').css({
              'fontSize': '16px',
              'color': 'red',
              'backgroundColor': 'black'
            })
    
    */
    /**
     * 
     * @param {jQuery实例对象，如$('#box')} elem 
     * @param {属性名或者对象} name 
     * @param {属性值或者undefined} value 
     * @param {回调函数} callback 
     */
    access: function access(elem, name, value, callback) {
      var length = elem.length
      // set 1：形如：$('#box').css('background', 'red')
      if (!jQuery.isUndefined(value)) {
        return callback(elem, name, value)
      }
      // set 2：形如：
      /**
       * $('#box').css({
           'fontSize': '16px',
           'color': 'red',
           'backgroundColor': 'black'
         })
       */
      if (jQuery.isPlainObject(name)) {
        for (var item in name) {
          access.call(jQuery, elem, item, name[item], callback)
        }
        return elem
      }

      if (length) {
        return callback(elem, name)
      }
    },
    style: function (elem, name, value) {
      if (!jQuery.isUndefined(value)) {
        elem.style[name] = value
      }
      return elem
    },
    curCss: function (elem, name) {
      if (elem && elem.length) {
        if (window.getComputedStyle) {
          return window.getComputedStyle(elem).getPropertyValue(name)
        }
      }
    },
    setText (elem, value) {
      var nodeType = elem.nodeType
      if (nodeType === 1) {
        elem.textContent = value
      }
      return elem
    },
    getText (elem) {
      var nodeType = elem.nodeType
      /**
       * 节点类型：
       *   1代表元素节点
       *   9代表Document节点 
       *   11代表DocumentFragment节点
       */  
      if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        return elem.textContent    
      }
    },
    Callbacks: function (options) {
      // 传入的options不为空且是字符串，则从对象缓存中获取对应的值，或者创建一个
      debugger
      options = jQuery.isString(options) ? (optionsCache[options] || createOptions(options)) : {}
      // 回调函数列表
      let list = []
      // 起使索引
      let start = 0
      // 当前索引
      let currentIndex = 0
      // 结束索引
      let end = 0
      // 是否执行过一次fire方法
      let isFired = false
      /* memory的两个作用：
      1、避免在memory模式下，fire方法第一次执行前，调用add方法会立即调用当前的回调函数；
      2、在memory模式下，将fire()携带的参数通过memory变量传递给add方法；
      */
      let memory 
      function fire (data) {
        // debugger
        let args = arguments
        end = list.length
        currentIndex = start || 0
        // 重置起始索引（主要为了在没参数的时候，能从头执行回调列表）
        start = 0
        isFired = true
        /* 这句代码是精华，避免在memory模式时，add时立即执行回调函数时无法传参;
        这里巧妙的将之前调用fire方法的参数，赋值给了memory */
        memory = options.memory && data 
        for (; currentIndex < end; currentIndex++) {
          if (list[currentIndex].apply(data[0], data[1]) === false && options.stopOnFalse === true) {
            break
          }
        }
      }
      let self = {
        // 订阅者
        add () {
          let startLength = list.length
          jQuery.each(arguments, function (i, fn){
            if (jQuery.isFunction(fn)) {
              list.push(fn)
            }
          })
         // 在memory模式下，如果从未执行fire()方法，则add不应该立即执行
         /*  if (options.memory) {
            start = startLength
            fire() // 如果没有memory变量，这种调用方式无法传递参数
          } */
          if (memory) {
            start = startLength
            fire(memory)
          }
        },
        // 给list回调列表中的callback 指定上下文对象
        fireWith (context, args) {
          args = [context, args]
          /* 当不是once的时候，可以随意执行fire方法
          当是once的时候，只有从未执行过fire()方法，才能去调用fire() */
          if (!options.once || !isFired) {
            fire(args)
          }
        },
        // 发布者
        fire () {
          self.fireWith(this, arguments)
          return this         
        }
      }
      return self
    }
  })
  /**
   * 
   * @param { String } options 
   * @return { Object } {}
   */
  function createOptions (options) {
    var object = optionsCache[options] = {}
    // options可能是一个字符串，也有可能是以空格分隔的多个字符串，所以需要分隔
    jQuery.each(options.split(spaceExp), function (index, item) {
      // 改变了object，也就改变了optionsCache[options]
      object[item] = true
    })
    return object
  }
  rootjQuery = jQuery(document)
  window.$ = window.jQuery = jQuery
})