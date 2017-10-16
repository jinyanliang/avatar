'use strict'
class Dialog {
  constructor() {
    const self = this
    const customHeap = document.createElement('div')
    customHeap.id = 'd-heap'
    customHeap.style.display = 'none'
    this.heap = customHeap
    document.body.appendChild(customHeap)
    this.c = () => {
      this.close()
    }
    this.cc = () => {
      this.closeCustom()
    }
    Aki('.dialog-close').on('click', this.cc)
    this.timer = null
    this.icon = {
      success(color) {
        return `<path fill="${color ? color : '#fff'}" d="M111 143c5,-3 15,-15 20,-20l40 -40c12,-12 16,-6 25,2 7,7 16,14 5,25 -16,14 -43,43 -59,59 -30,29 -28,33 -45,17 -13,-14 -26,-26 -39,-40 -19,-19 -16,-18 0,-34 12,-12 14,-8 23,2l30 29zm-104 -1c2,17 7,32 15,44 6,10 11,18 20,25 8,8 14,14 25,20 7,3 13,6 21,9 17,6 34,7 53,5 61,-7 112,-65 104,-134 -8,-62 -64,-112 -135,-104 -61,7 -113,64 -103,135z"/>`
      },
      error(color) {
        return `<path fill="${color ? color : 'red'}" d="M123 97c4,-2 18,-18 22,-22 13,-13 17,-9 28,2 11,11 13,14 1,26 -7,8 -15,15 -22,22 7,7 14,15 21,22 12,12 12,15 0,26 -10,11 -14,16 -27,3 -7,-7 -16,-15 -22,-22 -3,2 -19,18 -22,22 -13,13 -16,9 -27,-2 -11,-11 -14,-14 -2,-27 8,-7 15,-15 22,-22 -3,-4 -16,-16 -21,-21 -12,-12 -12,-15 0,-27 11,-10 14,-16 27,-2 6,6 18,15 22,22zm-116 44c3,23 13,45 27,61 9,11 20,20 32,26 7,4 13,7 21,9 17,6 33,7 52,5 27,-3 47,-14 65,-31 28,-25 41,-62 37,-101 -8,-60 -63,-110 -133,-101 -59,7 -111,63 -101,132z"/>`
      },
      warn(color) {
        return `<path fill="${color ? color : 'khaki'}" d="M143 165c5,5 3,14 3,20 0,23 3,21 -32,20 -12,0 -9,-10 -9,-20 0,-10 -3,-20 9,-20 6,0 23,-1 29,0zm-37 -16c-2,-8 -2,-77 -3,-95 0,-6 0,-9 7,-9 5,0 11,0 16,0 22,0 22,-2 22,11 -1,14 -2,89 -4,92 -5,4 -31,3 -38,1zm-99 -8c8,66 68,110 134,103 66,-8 112,-70 104,-135 -9,-65 -69,-111 -135,-103 -66,8 -112,69 -103,135z"/>`
      },
      confirm(color) {
        return `<path fill="${color ? color : 'khaki'}" d="M107 166c5,-1 32,-2 36,0 1,0 2,-1 3,7 0,8 0,26 -2,31 -6,2 -31,2 -37,0 -3,-6 -2,-32 0,-38zm-37 -83c-1,-13 33,-47 74,-36 29,8 53,39 36,68 -5,8 -11,13 -20,18 -4,2 -7,5 -11,8 -1,2 -2,4 -3,6 0,1 -1,4 -1,4 -1,3 0,1 -2,3 -3,2 -26,1 -31,1 -13,-1 -5,-24 4,-33 2,-2 7,-6 10,-8 6,-4 16,-7 18,-14 6,-15 -19,-28 -37,-10l-7 9c-4,5 -8,1 -12,-1 -5,-5 -14,-11 -18,-15zm-63 58c3,26 16,52 35,69 28,27 59,38 99,34 61,-7 112,-65 104,-134 -8,-62 -65,-112 -135,-104 -61,7 -113,64 -103,135z"/>`
      },
    }
    this.template = {
      tip(...opt) {
        return `<div id="d-tip" style="width:300px;height:70px;background-color:rgba(0,0,0,.7);color:#fff;position:fixed;left:50%;top:50%;margin-left:-150px;margin-top:-35px;display:flex;justify-content:center;align-items:center;z-index:100">
          <svg width="35px" viewBox="0 0 250 250">
            <g>
              ${opt[0] ? self.icon.success(opt[1]) : self.icon.error(opt[1])}
            </g>
          </svg>
          <span>${opt[2]}</span>
        </div>`
      },
      normal(...opt) {
        return `<div id="d-bg" style="position:fixed;width:100%;height:100%;left:0;top:0;background-color:rgba(99,99,99,.5);display:flex;justify-content:center;align-items:center;z-index:99">
          <section id="d-normal" style="width:400px;border-radius:3px;overflow:hidden;box-shadow:1px 1px 5px rgba(99,99,99,.4);background-color:#fff;">
            <header style="background-color:#eee;display:flex;justify-content:space-between;align-items:center;height:35px;padding:5px 15px;">
              <span>${opt[0]}</span>
              <svg id="d-btn-close" width="20" viewBox="0 0 250 250">
                <g>
                  <path fill="#666" d="M36 63l29 -28c4,-4 10,-4 14,0l49 49 49 -50c4,-3 11,-3 15,0l28 29c4,4 4,10 0,14l-50 49 51 51c4,4 4,10 0,14l-28 29c-4,3 -11,3 -14,0l-51 -51 -50 50c-4,4 -11,4 -14,0l-29 -28c-4,-4 -4,-11 0,-14l50 -51 -49 -49c-4,-3 -4,-10 0,-14z"/>
                </g>
              </svg>
            </header>
            <div style="display:flex;padding:10px;">
              <div>
                <svg width="50" viewBox="0 0 250 250">
                  <g>
                    ${(opt[1] === 'error' && self.icon.error(opt[2])) || (opt[1] === 'warn' && self.icon.warn(opt[2])) || (opt[1] === 'confirm' && self.icon.confirm(opt[2]))}
                  </g>
                </svg>
              </div>
              <div style="margin:0 10px;">
                <p>${opt[3]}</p>
                <p style="font-size:14px;color:gray;">${opt[4]}</p>
              </div>
            </div>
            <footer style="display:flex;justify-content:flex-end;padding:0 20px 20px;">
              <button id="d-btn-ok" style="margin:0 10px;color:#fff;background-color:#73b352;border-radius:3px;border:none;width:55px;height:30px;">确定</button>
              ${opt[5] ? '<button id="d-btn-cancel" style="background-color:#eee;border-radius:3px;border:none;width:55px;height:30px;">取消</button>' : ''}
            </footer>
          </section>
        </div>`
      },
      input(...opt) {
        return `<div id="d-bg" style="position:fixed;width:100%;height:100%;left:0;top:0;background-color:rgba(99,99,99,.5);display:flex;justify-content:center;align-items:center;z-index:99">
          <section id="d-input" style="width:550px;border-radius:3px;overflow:hidden;box-shadow:1px 1px 5px rgba(99,99,99,.4);background-color:#fff;">
            <header style="background-color:#eee;display:flex;justify-content:center;align-items:center;height:35px;padding:5px 15px;position:relative;">
              ${opt[0]}
              <svg id="d-btn-close" width="20" viewBox="0 0 250 250" style="position:absolute;right:15px;top:13px;">
                <g>
                  <path fill="#666" d="M36 63l29 -28c4,-4 10,-4 14,0l49 49 49 -50c4,-3 11,-3 15,0l28 29c4,4 4,10 0,14l-50 49 51 51c4,4 4,10 0,14l-28 29c-4,3 -11,3 -14,0l-51 -51 -50 50c-4,4 -11,4 -14,0l-29 -28c-4,-4 -4,-11 0,-14l50 -51 -49 -49c-4,-3 -4,-10 0,-14z"/>
                </g>
              </svg>
            </header>
            <div style="padding:20px;">
              <textarea id="d-textarea" style="resize:none;width:504px;height:230px;"></textarea>
            </div>
            <footer style="display:flex;justify-content:flex-end;padding:0 20px 20px;">
              <button id="d-btn-ok" style="color:#fff;background-color:#73b352;border-radius:3px;border:none;width:100px;height:40px;">确定</button>
            </footer>
          </section>
        </div>`
      },
    }
  }
  // 一段时间自动消
  tip(txt = '操作成功', { type = true, color = 'white' } = {}) {
    const tp = this.template.tip(type, color, txt)
    const isExisted = document.getElementById('d-tip')
    if (isExisted !== null) {
      isExisted.outerHTML = tp
    } else {
      document.body.insertAdjacentHTML('beforeEnd', tp)
    }
    const wd = document.getElementById('d-tip')
    wd.classList.add('animated', 'fadeIn')
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      wd.classList.remove('animated', 'fadeIn')
      wd.classList.add('hide')
    }, 2000)
  }

  setDom(html) {
    const isExisted = document.getElementById('d-bg')
    if (isExisted !== null) {
      isExisted.outerHTML = html
      isExisted.classList.remove('hide')
    } else {
      document.body.insertAdjacentHTML('beforeEnd', html)
    }
  }

  // 需要点击确定
  alert(txt = '请选择其他的操作', {header = '提示', type = 'warn', title = '此操作不可行', color = 'red'} = {}) {
    const self = this
    const tp = this.template.normal(header, type, color, title, txt, false)
    this.setDom(tp)
    const wd = document.getElementById('d-normal')
    wd.classList.add('animated', 'zoomIn')
    const close = () => {
      wd.classList.remove('animated', 'zoomIn')
      self.close()
    }
    document.getElementById('d-btn-ok').addEventListener('click', close)
    document.getElementById('d-btn-close').addEventListener('click', close)
  }

  // 有取消和确定按钮
  confirm(txt = '该操作不可撤销', {header = '提示', type = 'confirm', title = '确定要进行此操作吗？', color = 'khaki'} = {}) {
    const self = this
    const tp = this.template.normal(header, type, color, title, txt, true)
    this.setDom(tp)
    const wd = document.getElementById('d-normal')
    wd.classList.add('animated', 'zoomIn')
    const close = () => {
      wd.classList.remove('animated', 'zoomIn')
      self.close()
    }
    return new Promise(resolve => {
      document.getElementById('d-btn-ok').addEventListener('click', () => {
        close()
        resolve(true)
      })
      document.getElementById('d-btn-cancel').addEventListener('click', () => {
        close()
        resolve(false)
      })
      document.getElementById('d-btn-close').addEventListener('click', () => {
        close()
        resolve(false)
      })
    })
  }

  // 可以输入内容
  input(header = '请输入内容') {
    const self = this
    const tp = this.template.input(header)
    this.setDom(tp)
    const wd = document.getElementById('d-input')
    wd.classList.add('animated', 'fadeInDown')
    const close = () => {
      wd.classList.remove('animated', 'fadeInDown')
      self.close()
    }
    return new Promise(resolve => {
      document.getElementById('d-btn-ok').addEventListener('click', () => {
        close()
        resolve(document.getElementById('d-textarea').value)
      })
      document.getElementById('d-btn-close').addEventListener('click', () => {
        close()
        resolve(false)
      })
    })
  }

  // 复杂的弹出窗口
  custom(selector, allowClose = true) {
    const isExisted = document.getElementById('d-bg-custom')
    const node = document.querySelector(selector)
    node.classList.remove('hide')
    node.addEventListener('click', e => {
      e.stopPropagation()
    })
    if (isExisted !== null) {
      isExisted.innerHTML = ''
      isExisted.appendChild(node)
      isExisted.classList.remove('hide')
    } else {
      document.body.insertAdjacentHTML('beforeEnd', '<div id="d-bg-custom" style="position:fixed;width:100%;height:100%;left:0;top:0;background-color:rgba(99,99,99,.5);display:flex;justify-content:center;align-items:center;z-index:9"></div>')
      const bg = document.getElementById('d-bg-custom')
      bg.appendChild(node)
    }
    if (allowClose === true) {
      document.getElementById('d-bg-custom').addEventListener('click', this.cc)
    } else {
      document.getElementById('d-bg-custom').removeEventListener('click', this.cc)
    }
    node.classList.add('animated', 'fadeInDown')
  }

  // 关闭窗口
  close() {
    const bg = document.getElementById('d-bg')
    bg.classList.add('animated', 'fadeOut')
    setTimeout(() => {
      bg.classList.add('hide')
      bg.classList.remove('animated', 'fadeOut')
    }, 500)
    return this
  }

  // 关闭窗口
  closeCustom() {
    const bg = document.getElementById('d-bg-custom')
    Array.from(bg.children).forEach(i => {
      this.heap.appendChild(i)
    })
    bg.classList.add('animated', 'fadeOut')
    setTimeout(() => {
      bg.classList.add('hide')
      bg.classList.remove('animated', 'fadeOut')
    }, 500)
    return this
  }
}
window.dialog = new Dialog()
