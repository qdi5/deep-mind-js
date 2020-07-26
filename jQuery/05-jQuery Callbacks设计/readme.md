 
###  使用forEach的缺点：
- 不好控制循环退出
- 无法设置循环开始的位置  

```javascript
list.forEach(function (i, fn) {
  fn.apply(_this, args)
})
```javascript
