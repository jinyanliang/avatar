#dialog.js
> 3.1.0
> 依赖base.js 


##tip()
自动消失类提示窗

```javascript
tip(txt, {
  type,
  color,
})
```

- txt:string：提示文字
- type:bool：提示正确或是错误
- color:string：图标颜色

##alert()
警告窗口

```javascript
alert(txt, {
  header,
  type,
  title,
  color,
})
```

- txt:string：提示文字
- header:string：窗口名称
- type:string：图标种类，可选warn,error,confirm，默认warn
- color:string：图标颜色
- title:string：提示标题

##confirm()
确认窗口

```javascript
confirm(txt, {
  header,
  type,
  title,
  color,
})
```

- txt:string：提示文字
- header:string：窗口名称
- type:string：图标种类，可选warn,error,confirm，默认confirm
- color:string：图标颜色
- title:string：提示标题

###使用注意
该方法为异步操作，返回一个Promise对象，点击确认返回true，取消或关闭返回false。
由于无法实现原生弹窗的阻塞效果，不要在该函数内执行其他操作。

##input()
输入窗口

```javascript
input(header)
```

- header:string：窗口名称

###使用注意
该方法为异步操作，返回一个Promise对象，点击确认返回输入内容，关闭返回false。
由于无法实现原生弹窗的阻塞效果，不要在该函数内执行其他操作。

##custom()
自定义窗口

```javascript
custom(selector, allowClose = true)
```

- selector:string：选择器，已存在的DOM节点
- allowClose:bool：是否允许通过点击其他区域关闭，默认为true


##close()
关闭窗口
```javascript
close()
```


##closeCustom()
关闭自定义窗口
```javascript
closeCustom()
```

可以通过给任何元素设置关闭类来关闭：
```html
<any class="dialog-close"></any>
```

##链式关闭窗口
```javascript
closeCustom().close()
close().closeCustom()
```

##使用示例

```javascript
dialog.alert('发生了一个错误', {type: 'error'})
document.addEventListener('click', async () => {
  const txt = await dialog.input()
  console.log(txt)
})
; (async () => {
  if (await dialog.confirm()) {
    console.log('点击了确定按钮')
  } else {
    console.log('点击了取消按钮')
  }
})()
```
