(function(root) {
  // jQuery构造函数
  let jQuery = function() {
    return new jQuery.prototype.init()
  }
  jQuery.prototype = {
    init: function () {
      console.log('这里是初始化方法')
    },
    css: function () {
      console.log('这里是css方法')
    }
  }
  jQuery.prototype.init.prototype = jQuery.prototype
  root.$ = root.jQuery = jQuery
 })(this);
