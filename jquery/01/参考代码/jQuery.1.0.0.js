/*
* @Author: Administrator
* @Date:   2018-10-30 20:40:51
* @Last Modified by:   Administrator
* @Last Modified time: 2018-10-30 22:41:16
*/
(function(root){
   var jQuery = function(){    //构造函数  函数对象
      return new jQuery.prototype.init();  
   }

   jQuery.fn = jQuery.prototype = {  //原型对象
      init: function(){
        
      },
      css: function(){
      	console.log("di~~didi~~")
      },
      //....
   }

   jQuery.fn.init.prototype =  jQuery.fn;

   /*
     工具函数   $.extend()  this  $.fn.extend()  this  
     1：参数必须为引用类型    2：参数不能为空
    */
    jQuery.extend = jQuery.prototype.extend = function(){ 
       // 被扩展的对象
       var target = arguments[0] ||{};   //arguments[0]  false  null  undefined
       // 参数个数
       var length = arguments.length; 
       // 循环起始值
       var i = 1;
       // 拷贝类型（浅拷贝、深拷贝）
       var deep = false; 
       // 当前循环中的参数对象
       var option;
       // 当前循环中的参数对象的属性
       var name;
       // 当前循环中的参数对象的值
       var copy;
       var src;
       var copyIsArray;
       var clone;
      // 当第一个参数是boolean时
      if( typeof target === "boolean" ) {   //$.extend(true,obj,result);
             deep = target;
             target = arguments[1];   // target  不改变他的引用
             i = 2;
       }
      // 当第一个参数不是对象时
      if( typeof target !== "object" ) {
             target = {};
       }
           
      //参数1   实例扩展  本身扩展  
      // 只有一个参数的时候；（扩展本身与实例扩展）
      if( length == i ) {
        // 扩展本身时，this指向jQuery对象；扩展实例时，this指向jQuery的实例对象
        target = this
        i--;   //0   
      }
      
      //参数2以上   任意对象扩展 (arguments[0])  1  $.extend(obj,result);
      for( ;i<length; i++ ) {
         if(( option = arguments[i] ) !== null ) {
            for( name in option ) {
            	src = target[name];   // obj.list
            	copy = option[name];
            	//result.age   result.sex  result.list
                //deep true 深拷贝
                if( deep && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {   
                   if( copyIsArray ) {   //true 被拷贝的值是个数组 []
                     copyIsArray = false;
                     clone = src && jQuery.isArray(src) ? src : [];
                   } else {   // 被拷贝的值是个对象 {}
                     clone = src && jQuery.isPlainObject(src) ? src : {};
                   }
                   target[name] = jQuery.extend( deep, clone, copy  );
                } 
                // 浅拷贝的逻辑
                else if( copy !== undefined ){
                 target[name] = copy ;    //age  sex  list
                }
            }
         }
      }
      return target;
   }


   jQuery.extend({
   	//类型检测的方法    object对象     
   	 isPlainObject: function( obj ){
       return typeof obj === "object";
   	 },

   	 isArray: function(obj){   //array对象
       return toString.call(obj) === "[object Array]";
   	 }

   });
   
   root.$ = root.jQuery = jQuery;
})(this);    //window



//选择器引擎    jquery      
// DOM         access  
// derferred    异步编程的解决方案    promise    1.5.xxx   1.8.xxx    2.0.3
// 
// $.xxxx        $().xxx