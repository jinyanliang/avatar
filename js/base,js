'use strict'
let Aki = function(selector) {
  /*eslint new-cap: 0*/
  return new Aki.prototype.init(selector)
}
Aki.fn = Aki.prototype = {
  constructor: Aki,
  length: 0,
  splice: [].splice,
  selector: '',
  datapool: {},
  init: function(selector) {
    if (!selector) { return this }
    if (typeof selector === 'string') { // 直接通过字符串获取
      selector = selector.trim()
      let elm
      if (selector.charAt(0) === '#' && !selector.match('\\s')) {
        selector = selector.substring(1)
        this.selector = selector
        elm = document.getElementById(selector)
        this[0] = elm
        this.length = 1
        return this
      } else {
        elm = document.querySelectorAll(selector)
        for (let i = 0; i < elm.length; i++) {
          this[i] = elm[i]
        }
        this.selector = selector
        this.length = elm.length
        return this
      }
    } else if (typeof selector === 'object') { // 获取一个已存在的对象
      if (selector.length) { // 假如这个对象是一个数组，则按顺序存进Aki
        for (let i = 0, length = selector.length; i < length; i++) {
          this[i] = selector[i]
        }
        this.length = selector.length
      } else {
        this[0] = selector
        this.length = 1
      }
    } else {
      console.warn(`$(${selector})没有选取到任何元素，生成新的实例失败`)
      return this
    }
  },
  each(fn) {

    // 遍历Aki下的所有DOM对象，this指向原生DOM
    for (let i = 0; i < this.length; i++) {
      if (fn.call(this[i], i) === false) break
    }
    return this
  },
  size() {
    return this.length
  },
  get() {

    // 如果参数是一个数字，返回对应DOM
    if (arguments.length && typeof arguments[0] === 'number') {
      return this[arguments[0]]
    } else if (arguments.length) {
      console.warn(`get(${arguments[0]})不是一个正确的长度范围`)
      return this[0]
    } else {  // 如果不传参数，返回所有DOM集合
      let arr = []
      for (let i = 0; i < this.length; i++) {
        arr.push(this[i])
      }
      return arr
    }
  },
  attr() {
    if (arguments.length === 1) {
      let opt = arguments[0]
      if (typeof opt === 'string') {
        return this[0].getAttribute(opt)
      } else {
        this.each(function() {
          for (let i in opt) {
            this.setAttribute(i, opt[i])
          }
        })
      }
    } else if (arguments.length >= 2) {
      let opt = arguments[0]
      let set = arguments[1]
      if (typeof set === 'function') {
        this.each(function() {
          this.setAttribute(opt, set())
        })
      } else {
        this.each(function() {
          this.setAttribute(opt, set.toString())
        })
      }
    } else {
      console.error('attr()至少需要一个参数')
    }
    return this
  },
  removeAttr(key) {
    this.each(function() {
      this.removeAttribute(key)
    })
    return this
  },
  addClass(str) {
    let arr = str.split(' ')

    // 可以通过addClass('foo bar baz')的方式来添加多个类
    this.each(function() {
      for (let i in arr) {
        this.classList.add(arr[i])
      }
    })
  },
  removeClass(str) {
    let arr = str.split(' ')
    this.each(function() {
      for (let i in arr) {
        this.classList.remove(arr[i])
      }
    })
    return this
  },
  toggleClass(str) {
    let arr = str.split(' ')
    this.each(function() {
      for (let i in arr) {
        this.classList.toggle(arr[i])
      }
    })
    return this
  },
  hasClass(str) {
    let flag = false
    let arr = str.split(' ')
    this.each(function() {
      for (let i in arr) {
        if (this.classList.contains(arr[i])) {
          flag = true
          return false
        }
      }
    })
    return flag
  },
  css() {
    if (arguments.length === 1) {
      let opt = arguments[0]
      if (typeof opt === 'string') {
        return window.getComputedStyle(this[0]).getPropertyValue(opt)
      } else if (Aki.isPlainObject(opt)) {
        this.each(function() {
          for (let i in opt) {
            this.style[i] = opt[i]
          }
        })
        return this
      } else {
        console.warn('css()参数不正确')
        return this
      }
    } else if (arguments.length >= 2) {
      let key = arguments[0]
      let val = arguments[1]
      this.each(function() {
        this.style[key] = val
      })
      return this
    } else {
      return window.getComputedStyle(this[0])
    }
  },
  html(txt) {
    if (typeof txt === 'undefined') {
      return this[0].innerHTML
    } else {
      this.each(function() {
        this.innerHTML = txt
      })
      return this
    }
  },
  text(txt) {
    if (typeof txt === 'undefined') {
      return this[0].innerText
    } else {
      this.each(function() {
        this.innerText = txt
      })
      return this
    }
  },

  addSpin() {
    this.each(function() {
      if (this.tagName === 'INPUT') {
        this.oldvalue = this.value
        this.value = '请稍后…'
      } else {
        this.oldinner = this.innerHTML
        this.innerHTML = '<i class="fa fa-spinner fa-spin"></i>'
      }
      this.style.pointerEvents = 'none'
      this.isSpin = true
    })
    return this
  },
  removeSpin(time) {
    this.each(function() {
      if (!this.isSpin) {
        console.warn('没有添加等待状态就使用了移除方法')
        return false
      }
      if (time) {
        setTimeout(() => {
          if (this.tagName === 'INPUT') {
            this.value = this.oldvalue
          } else {
            this.innerHTML = this.oldinner
          }
          this.style.pointerEvents = 'auto'
        }, time)
      } else {
        if (this.tagName === 'INPUT') {
          this.value = this.oldvalue
        } else {
          this.innerHTML = this.oldinner
        }
        this.style.pointerEvents = 'auto'
      }
    })
    return this
  },
  animation() {
    let name = 'pulse'
    let time = 400
    let delay = 0
    let fn
    const agmt = arguments
    if (agmt.length === 1) {
      if (typeof agmt[0] === 'string') {
        name = agmt[0]
      } else if (typeof agmt[0] === 'number') {
        time = agmt[0]
      } else if (typeof agmt[0] === 'function') {
        fn = agmt[0]
      }
    } else if (agmt.length === 2) {
      if (typeof agmt[0] === 'string') {
        name = agmt[0]
        if (typeof agmt[1] === 'function') {
          fn = agmt[1]
        } else {
          time = agmt[1]
        }
      } else if (typeof agmt[0] === 'number') {
        time = agmt[0]
        if (typeof agmt[1] === 'function') {
          fn = agmt[1]
        } else {
          delay = agmt[1]
        }
      }
    } else if (agmt.length === 3) {
      if (typeof agmt[0] === 'string') {
        name = agmt[0]
        time = agmt[1]
        if (typeof agmt[2] === 'function') {
          fn = agmt[2]
        } else {
          delay = agmt[2]
        }
      } else if (typeof agmt[0] === 'number') {
        time = agmt[0]
        delay = agmt[1]
        fn = agmt[2]
      }
    } else {
      name = agmt[0]
      time = agmt[1]
      delay = agmt[2]
      fn = agmt[3]
    }
    this.each(function() {
      const self = this
      setTimeout(function() {
        self.classList.add('animated', name)
        setTimeout(function() {
          self.classList.remove('animated', name)
          if (fn) fn()
        }, time)
      }, delay)
    })
  },
  on(type, fn) {
    this.each(function() {
      this.addEventListener(type, fn)
    })
  },
  off(type, fn) {
    this.each(function() {
      this.removeEventListener(type, fn)
    })
  },
}
Aki.prototype.init.prototype = Aki.fn
window.Aki = window.$ = Aki
Aki.extend = Aki.fn.extend = function() {
  /*eslint one-var:0 */
  let options, name, src, copy, copyIsArray, clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false

  // 如果第一个参数是boolean型，可能是深度拷贝
  if (typeof target === 'boolean') {
    deep = target
    target = arguments[1] || {}

    // 跳过boolean和target，从第3个开始
    i++
  }

  // target不是对象也不是函数，则强制设置为空对象
  if (typeof target !== 'object' && !Aki.isFunction(target)) {
    target = {}
  }

  // 如果只传入一个参数，则认为是对Aki扩展
  if (length === i) {
    target = this
    i--
  }
  for (; i < length; i++) {

    // 只处理非空参数
    if ((options = arguments[i]) != null) {

      // 拓展基础对象
      for (name in options) {
        src = target[name]
        copy = options[name]

        // 避免循环引用
        if (target === copy) {
          continue
        }

        // 深度拷贝且值是纯对象或数组，则递归
        if (deep && copy && (Aki.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

          // 如果copy是数组
          if (copyIsArray) {
            copyIsArray = false

            // clone为src的修正值
            clone = src && Array.isArray(src) ? src : []

            // 如果copy的是对象
          } else {

            // clone为src的修正值
            clone = src && Aki.isPlainObject(src) ? src : {}
          }

          // 递归调用Aki.extend
          target[name] = Aki.extend(deep, clone, copy)

          // 不能拷贝空值
        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }
  // 返回更改后的对象
  return target
}

Aki.extend({
  isPlainObject(obj) {
    if (typeof obj !== 'object' || obj.nodeType || obj === window) return false
    if (obj.constructor && !obj.constructor.prototype.hasOwnProperty('isPrototypeOf')) return false
    return true
  },
  draw(oImg, w, h) {
    let image = new Image()
    image.src = oImg.src
    if (image.width > 0 && image.height > 0) {
      if (image.width / image.height >= w / h) {
        if (image.width > w) {
          oImg.width = w
          oImg.height = (image.height * w) / image.width
        } else {
          oImg.width = image.width
          oImg.height = image.height
        }
      } else {
        if (image.height > h) {
          oImg.height = h
          oImg.width = (image.width * h) / image.height
        } else {
          oImg.width = image.width
          oImg.height = image.height
        }
      }
      oImg.dataset.size = `${image.width}x${image.height}`
    }
  },
})
