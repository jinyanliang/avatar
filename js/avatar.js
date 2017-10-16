'use strict'
class Avatar {

  /**
   * @param  {string|el} wrap
   * @param  {object} opt
   */
  constructor(wrap, opt) {
    if (typeof wrap === 'string') {
      wrap = document.querySelector(wrap)
    }
    // HTML模板
    const HTML = `<main class="main"
                      style="width:${opt.vw}px;height:${opt.vw}px;border:solid 1px #ccc;position:relative;overflow:hidden;">
  <div class="view"><b></b></div>
</main>
<div>
  <canvas width="${opt.cw}" height="${opt.cw}" style="border-radius:50%;margin:0 auto;display:block;"></canvas>
</div>
<input class="file" type="file">`
    const self = this
    // 储存dom元素
    self._el = {}
    const el = self._el
    wrap.innerHTML = HTML
    el.main = wrap.querySelector('.main')
    el.file = wrap.querySelector('.file')
    el.cvs = wrap.querySelector('canvas')
    self.cvs = el.cvs
    // 可视区模板
    self.template = `<div class="view" style="width:${opt.vw / 3}px;height:${opt.vw / 3}px;box-shadow:0 0 ${opt.vw}px ${opt.vw * 2}px rgba(255,255,255,.8);border-radius:50%;position:absolute;z-index:5;cursor:move;cursor:-webkit-grab;">
        <b style="width: 7px;height: 7px;position: absolute;cursor: nw-resize;border: solid 1px black;border-radius: 50%;background-color: white;right: 5px;bottom: 5px;"></b>
        </div>`
    /**
     * @desc  重新绘制canvas区域图像
     */
    const updateViewport = () => {
      let ctx = el.cvs.getContext('2d')
      ctx.drawImage(self.img, el.view.offsetLeft / self.img.scale, el.view.offsetTop / self.img.scale, el.view.offsetWidth / self.img.scale, el.view.offsetHeight / self.img.scale, 0, 0, opt.cw, opt.cw)
    }
    /**
     * @param  {any} r
     * @desc  获取调整大小的圆点位置
     */
    const getDotPosition = r => {
      // 减5是因为点的半径和边框
      return Math.sqrt(((3 * r * r) - 2 * r * Math.sqrt(2 * r * r)) / 2) - 5
    }
    /**
     * @param  {any} r
     * @desc  设置调整大小的圆点位置
     */
    const setDotPosition = r => {
      el.dot.style.right = `${r}px`
      el.dot.style.bottom = `${r}px`
    }
    /**
     * @param  {object} e
     * @desc  抓起圆形区域
     */
    const grap = function(e) {
      e.preventDefault()
      let ox = e.clientX
      let oy = e.clientY
      let ol = el.view.offsetLeft
      let ot = el.view.offsetTop
      this.onmousemove = function(e) {
        let nx = e.clientX
        let ny = e.clientY
        el.view.style.left = `${ol + nx - ox}px`
        el.view.style.top = `${ot + ny - oy}px`
        if (ol + nx - ox <= 0) el.view.style.left = 0
        if (ot + ny - oy <= 0) el.view.style.top = 0
        let max = el.main.offsetWidth - el.view.offsetWidth - 2
        if (ol + nx - ox >= max) el.view.style.left = `${max}px`
        if (ot + ny - oy >= max) el.view.style.top = `${max}px`
        updateViewport()
      }
      this.onmouseup = function() {
        this.onmousemove = null
        this.onmouseup = null
      }
      this.onmouseleave = function() {
        this.onmousemove = null
        this.onmouseup = null
      }
    }
    /**
     * @param  {any} e
     * @desc  滚轮缩放
     */
    const zoomWheel = function(e) {
      if (e.deltaY > 0) self.vWidth--
      if (e.deltaY < 0) self.vWidth++
      if (self.vWidth + el.view.offsetLeft >= opt.vw + 1) self.vWidth--
      if (self.vWidth + el.view.offsetTop >= opt.vw + 1) self.vWidth--
      this.style.width = `${self.vWidth}px`
      this.style.height = `${self.vWidth}px`
      setDotPosition(getDotPosition(self.vWidth / 2))
      updateViewport()
    }
    /**
     * @param  {any} e
     * @desc  抓取缩放
     */
    const zoomGrap = function(e) {
      e.preventDefault()
      el.view.removeEventListener('mousedown', grap)
      const ox = e.clientX
      const oy = e.clientY
      const w = el.view.offsetWidth
      el.main.onmousemove = function(e) {
        const nx = e.clientX
        const ny = e.clientY
        let x
        if (nx - ox > 0 && ny - oy > 0) {
          x = nx - ox > ny - oy ? nx - ox : ny - oy
          if (x >= opt.vw - el.view.offsetLeft - w) x = opt.vw - el.view.offsetLeft - w
          if (x >= opt.vw - el.view.offsetTop - w) x = opt.vw - el.view.offsetTop - w
        } else if (nx - ox < 0 && ny - oy < 0) {
          x = nx - ox < ny - oy ? nx - ox : ny - oy
          x = (w + x) < 20 ? -80 : x
        }
        el.view.style.width = `${w + x}px`
        el.view.style.height = `${w + x}px`
        self.vWidth = el.view.offsetWidth
        setDotPosition(getDotPosition((self.vWidth) / 2))
        updateViewport()
      }
      el.main.onmouseup = function() {
        el.main.onmousemove = null
        el.main.onmouseup = null
        self.vWidth = el.view.offsetWidth
        el.view.addEventListener('mousedown', grap)
      }
      el.main.onmouseleave = function() {
        el.main.onmousemove = null
        el.main.onmouseup = null
        self.vWidth = el.view.offsetWidth
        el.view.addEventListener('mousedown', grap)
      }
    }
    const getFile = function() {
      const file = this.files[0]
      if (!file.type.match(/image.*/)) {
        alert('该文件不是图片！')
        return false
      }
      const reader = new FileReader()
      reader.onload = function() {
        const url = reader.result
        self.img = new Image()
        self.img.src = url
        self.img.onload = () => {
          // 图片过小导致图片布局与剪切位置不符
          if (self.img.width > 300 || self.img.height > 300) {
            self.img.style.maxWidth = '100%'
            self.img.style.maxHeight = '100%'

            // 显示长度 : 实际图长度
            self.img.scale = self.img.width >= self.img.height ? opt.vw / self.img.width : opt.vw / self.img.height
            el.main.innerHTML = self.template
            el.view = wrap.querySelector('.view')
            el.dot = el.view.querySelector('b')
            self.vWidth = el.view.offsetWidth
            setDotPosition(getDotPosition(self.vWidth / 2))
            el.view.addEventListener('mousedown', grap)
            el.view.addEventListener('wheel', zoomWheel)
            el.dot.addEventListener('mousedown', zoomGrap)
            el.main.appendChild(self.img)
            updateViewport()
          } else {
            window.dialog ? window.dialog.alert('图片尺寸太小') : alert('图片尺寸太小')
          }
        }
      }
      reader.readAsDataURL(file)
    }
    el.file.addEventListener('change', getFile)
  }
  get URL() {
    if (this._el.main.querySelector('img')) {
      return this.cvs.toDataURL()
    } else {
      return false
    }
  }
  // getURL() {
  //   // if (this._el.file.value && !this._el.file.value.type.match(/image.*/)) {
  //   if (this._el.main.querySelector('img')) {
  //     return this.cvs.toDataURL()
  //   } else {
  //     return false
  //   }
  // }
}
