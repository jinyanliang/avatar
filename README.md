#avatar.js
> 1.0.0
>
> 头像上传插件

##构造函数
###Avatar(el, options)
- el:String|Element：初始化的容器
- options:{vw:Number, cw:Number}：配置参数，分别是图片容器尺寸和剪切头像尺寸

##实例属性
- URL

###URL
剪切后图片的base64

##示例代码
```javascript
const avatar = new Avatar('.avatar', {vw: 300, cw: 150})
console.log(avatar.URL) // 须先上传本地图片才能读取到该属性
```
