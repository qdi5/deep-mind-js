var Observer = (function() {
  var __messages = {}
  return {
    // 消息注册；将订阅者注册的消息推入到消息队列中。
    regist (type, fn) {
      console.log('注册')
      if (typeof __messages[type] === 'undefined') {
        __messages[type] = [fn]
      } else {
        __messages[type].push(fn)
      }
      return this
    },
    // 发布消息；当观察者发布一个消息时，将所有订阅者订阅的消息一次执行。
    fire (type, args) {
      console.log('发布')
      if (!__messages[type]) {
        return
      }
      var events = {
        type,
        args
      }
      i = 0
      len = __messages[type].length
      for (; i < len; i++) {
        __messages[type][i].call(this, events)
      }
      return this
    },
    // 注销方法；将订阅者注销的消息从消息队列中清除。
    remove (type, fn) {
      console.log('移除')
      if (__messages[type] instanceof Array) {
        // 从最后一个消息动作遍历
        var i = __messages[type].length - 1
        for (; i >= 0; i--) {
          // 如果存在该动作则在消息动作序列中移除相应动作
          __messages[type][i] === fn && __messages[type].splice(i, 1)
        }
      }
      return this
    }
  }
})()