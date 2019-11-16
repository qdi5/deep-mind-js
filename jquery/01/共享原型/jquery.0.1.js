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
  root.$ = root.jQuery = jQuery
 })(this);
