---
title: Fluid 主题安装与美化
date: 2022/3/25
category: 技术
tag: 
  - 建站
  - 技术
math: true
---

# Fluid 主题安装与美化

> 生命在于折腾。生命不息，折腾不止。
> 
>——Lancher（中）

记录一下<del>折腾</del>建站的过程~~

## 安装 Fluid 主题

要求已经安装 Hexo 博客，如果你还没有安装，请<a href="https://hexo.io/zh-cn/docs/">点此</a>参照教程安装 Hexo。

首先执行命令创建博客。myblog 可以换成其它名称。

```shell
hexo init myblog
```

此时会在目录下创建 myblog 文件夹。

之后进入该文件夹，执行命令安装 Fluid 主题。

```shell
cd myblog
npm install --save hexo-theme-fluid
```

然后在博客目录（myblog）下新建`_config.fluid.yml` ，并将以下的内容复制进去。

之后修改博客目录下的`_config.yml` :

```yaml
theme: fluid  # 指定主题

language: zh-CN  # 指定语言，会影响主题显示的语言，按需修改
```

执行命令创建关于页面。

```sh
hexo new page about
```

创建成功后修改 `/source/about/index.md`，添加 `layout` 属性。

```yaml
---
title: 标题
layout: about
---
```

打开命令行执行`hexo s`，用浏览器打开`http://localhost:4000/`，就可以看到 fluid 主题的网站了。至此主题安装完成。

## 主题配置及美化

### 站点信息

打开 hexo 配置文件`_config.yml` , 找到最上面的 site 一行进行修改。

```yaml
# Site
title: Descarts #站点标题
subtitle: '' #副标题
description: '' #描述
keywords: #关键词
author: Lancher #站点作者
language: zh-CN #语言
timezone: '' #时区，如不填写则默认系统时区
```

之后打开 fluid 配置文件 `_config.fluid.yml` 修改两处。

```yaml
navbar:
  # 导航栏左侧的标题，为空则按 hexo config 中 `title` 显示
  # The title on the left side of the navigation bar. If empty, it is based on `title` in hexo config
  blog_title: "Lancher's blog"
```

```yaml
# 首页副标题的独立设置
# Independent config of home page subtitle
slogan:
  enable: true

  # 为空则按 hexo config.subtitle 显示
  # If empty, text based on `subtitle` in hexo config
  text: "I think, therefore I am."
```

### 数学公式

fluid 提供了两种渲染器，Mathjax 与 Katex。Katex 的渲染速度明显快于 Mathjax。然而不知道是安装出错还是 Katex 本身的问题，Katex 渲染出来的公式非常丑！无法忍受！因此还是换成了 Mathjax。同时 Typora 也使用 Mathjax，兼容性更好一点。

首先打开`_config.fluid.yml` 把`math`下的`engine`指定为 mathjax。

```yaml
math:
  # 开启后文章默认可用，自定义页面如需使用，需在 Front-matter 中指定 `math: true`
  # If you want to use math on the custom page, you need to set `math: true` in Front-matter
  enable: true

  # 开启后，只有在文章 Front-matter 里指定 `math: true` 才会在文章页启动公式转换，以便在页面不包含公式时提高加载速度
  # If true, only set `math: true` in Front-matter will enable math, to load faster when the page does not contain math
  specific: true

  # Options: mathjax | katex
  engine: mathjax
```

上面的`specific`建议设置为`true`，以提高加载速度。但是如此一来，需要在需要渲染的文章的`Front-matter`中指定`math: true`。

之后执行命令卸载自带渲染器，并安装mathjax对应的渲染器。

```sh
npm uninstall hexo-renderer-marked --save
npm install hexo-renderer-pandoc --save
```

之后**[安装 Pandoc](https://github.com/jgm/pandoc/blob/master/INSTALL.md)**。

安装完后执行`hexo clean`。

效果大概是这个样子。

```
$$
E=mc^2
$$
```


$$
E=mc^2
$$
还是蛮好看的。

### Mac样式代码块并添加代码折叠功能

在`source`文件夹下新建`css`文件夹，并新建文件`codeblock.css` 。把下面的代码复制进去。

```css
figure.highlight {
  background: #21252b;
  border-radius: 5px;
  box-shadow: 0 4px 7px 0 rgba(0, 0, 0, .4);
  padding-top: 30px
}

figure.highlight::before {
  background: #fc625d;
  border-radius: 50%;
  box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
  content: ' ';
  height: 12px;
  left: 12px;
  margin-top: -20px;
  position: absolute;
  width: 12px;
}



figure.highlight .fas.fa-angle-down {
  transform: none;
  transition: transform 0.2s ease-in-out;
}
figure.highlight .fas.fa-angle-down.collapsed {
  transform: rotate(-90deg);
}
figure.highlight > i {
  color: #777;
  margin-left: 10px;
  line-height: 2rem;
}
.highlight-btn-container > span {
  position: absolute;
  color: #777;
  margin-left: 20px;
  font-weight: bold;
}
figure.highlight td:first-child {
  position: sticky;
  left: 0;
  z-index: 1;
}
.copy-btn {
  top: 5px;
  font-size: 1rem;
}
.copy-btn > i {
  font-size: 0.875rem;
  font-weight: bold;
}
.copy-btn-dark {
  color: #2f4f4f;
}
.fa-angle-down{
  color: #777;
  position: absolute;
  top:6px; 
}



.highlight-btn-container
{
  position: absolute;
  left:48%;
  top:-0px;
}

figure.highlight table {
  border-radius: 0 0 5px 5px;
  
}
```

在`source`文件夹下新建`js`文件夹，并新建文件`codeblock.js` 。把下面的代码复制进去。

```javascript
// 获取唯一 ID
function getUuiD() {
  return Math.random().toString(36).substring(2, 8) + Date.now().toString(36);
}

function addLanguage() {
  // 获取所有 figure.highlight 元素
  var hs = $("figure.highlight");
  for (var i = 0; i < hs.length; i++) {
    // 获取代码语言
    var lang = hs[i].firstChild.firstChild.firstChild.lastChild.firstChild.firstChild.classList[1];
    // 折叠块的 id
    var id = `kiyan-collapse-${getUuiD()}`;
    // 折叠按钮
    var btn = `<i class="fas fa-angle-down" type="button" data-toggle="collapse" data-target="#${id}"></i>`;
    // 代码语言
    var span = `<span>${lang}</span>`;
    // 折叠块包裹原来的内容
    var div = `<div class="collapse show" id="${id}">${hs[i].innerHTML}</div>`;
    var btndiv=`<div class="highlight-btn-container">`+btn+span+`</div>`;
    hs[i].innerHTML = btndiv + div;
  }
}

$(document).ready(addLanguage);
```

然后打开`_config.fluid.yml`，寻找`custom_css`与`custom_js`。然后改成：

```yaml
custom_css:
	- css/codeblock.css
	- //use.fontawesome.com/releases/v5.15.4/css/all.css
custom_js:
	- js/codeblock.js
```

大功告成。效果参照本站。

这里js代码的基本逻辑是将整个代码块作为一个整体装入“黑箱”，然后利用 bootstrap 的 collapse 方法实现类似下拉菜单的效果。

刚开始只显示一部分代码，点击按钮时可以显示更多的效果更好，不过貌似不是那么好实现。如果沿用上面的思路，就需要将一部分HTML代码装入“黑箱”。这件事本身就很麻烦，大概要写一堆循环以及各种乱七八糟的Dom方法。所以这个的具体写法我还在摸索中。实现了再更新到文章里。

大功告成。效果参照本站。

### 美化按钮边框、滚动条

原版的方边框实在是太！丑！了！我们将其圆润一下。

在`css`文件夹下新建`custom.css`，并把以下代码复制进去。

```css
::-webkit-scrollbar {
  width: 10px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #a6a6a6;
  border-radius: 1rem;
  min-height: 60px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #757575;
}
::-webkit-scrollbar-thumb:active {
  background-color: #424242;
}
::-webkit-scrollbar-corner {
  background-color: transparent;
}
[data-user-color-scheme='dark'] ::-webkit-scrollbar-thumb {
  background-color: #687582;
}
[data-user-color-scheme='dark'] ::-webkit-scrollbar-thumb:hover {
  background-color: #9da8b3;
}
[data-user-color-scheme='dark'] ::-webkit-scrollbar-thumb:active {
  background-color: #c5d0db;
}
.copy-btn {
  font-size: 1rem;
}
.copy-btn > i {
  font-size: 0.875rem;
  font-weight: bold;
}
.copy-btn-dark {
  color: #2f4f4f;
}
figure.highlight td:first-child {
  position: sticky;
  left: 0;
  z-index: 1;
}
.category .row {
  border-radius: 1rem;
}
.category .category-item {
  border-radius: 1rem;
}
.category .category-post-list {
  border-radius: 1rem;
}
.list-group {
  border-radius: 1rem;
}
.list-group-item {
  border-radius: 1rem;
}
.links .card-body {
  border-radius: 1rem;
}
.navbar .nav-item .nav-link {
  border-radius: 0.5rem;
}
.navbar .dropdown-menu {
  border-radius: 0.5rem;
}
.navbar .dropdown-item {
  border-radius: 0.25rem;
}
#board {
  border-radius: 1rem;
}
#scroll-top-button {
  border-radius: 1rem;
}
```

之后和上面一样，修改`custom_css` 

```yaml
custom_css:
	- css/custom.css
```

### 修改鼠标点击效果

#### 烟花

将鼠标点击效果改为烟花。首先在`source`文件夹下新建`js`文件夹，并新建文件`fireworks.js` 。把下面的代码复制进去。

```javascript
class Circle {
  constructor({ origin, speed, color, angle, context }) {
    this.origin = origin
    this.position = { ...this.origin }
    this.color = color
    this.speed = speed
    this.angle = angle
    this.context = context
    this.renderCount = 0
  }

  draw() {
    this.context.fillStyle = this.color
    this.context.beginPath()
    this.context.arc(this.position.x, this.position.y, 2, 0, Math.PI * 2)
    this.context.fill()
  }

  move() {
    this.position.x = (Math.sin(this.angle) * this.speed) + this.position.x
    this.position.y = (Math.cos(this.angle) * this.speed) + this.position.y + (this.renderCount * 0.3)
    this.renderCount++
  }
}

class Boom {
  constructor ({ origin, context, circleCount = 16, area }) {
    this.origin = origin
    this.context = context
    this.circleCount = circleCount
    this.area = area
    this.stop = false
    this.circles = []
  }

  randomArray(range) {
    const length = range.length
    const randomIndex = Math.floor(length * Math.random())
    return range[randomIndex]
  }

  randomColor() {
    const range = ['8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    return '#' + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range)
  }

  randomRange(start, end) {
    return (end - start) * Math.random() + start
  }

  init() {
    for(let i = 0; i < this.circleCount; i++) {
      const circle = new Circle({
        context: this.context,
        origin: this.origin,
        color: this.randomColor(),
        angle: this.randomRange(Math.PI - 1, Math.PI + 1),
        speed: this.randomRange(1, 6)
      })
      this.circles.push(circle)
    }
  }

  move() {
    this.circles.forEach((circle, index) => {
      if (circle.position.x > this.area.width || circle.position.y > this.area.height) {
        return this.circles.splice(index, 1)
      }
      circle.move()
    })
    if (this.circles.length == 0) {
      this.stop = true
    }
  }

  draw() {
    this.circles.forEach(circle => circle.draw())
  }
}

class CursorSpecialEffects {
  constructor() {
    this.computerCanvas = document.createElement('canvas')
    this.renderCanvas = document.createElement('canvas')

    this.computerContext = this.computerCanvas.getContext('2d')
    this.renderContext = this.renderCanvas.getContext('2d')

    this.globalWidth = window.innerWidth
    this.globalHeight = window.innerHeight

    this.booms = []
    this.running = false
  }

  handleMouseDown(e) {
    const boom = new Boom({
      origin: { x: e.clientX, y: e.clientY },
      context: this.computerContext,
      area: {
        width: this.globalWidth,
        height: this.globalHeight
      }
    })
    boom.init()
    this.booms.push(boom)
    this.running || this.run()
  }

  handlePageHide() {
    this.booms = []
    this.running = false
  }

  init() {
    const style = this.renderCanvas.style
    style.position = 'fixed'
    style.top = style.left = 0
    style.zIndex = '999999999999999999999999999999999999999999'
    style.pointerEvents = 'none'

    style.width = this.renderCanvas.width = this.computerCanvas.width = this.globalWidth
    style.height = this.renderCanvas.height = this.computerCanvas.height = this.globalHeight

    document.body.append(this.renderCanvas)

    window.addEventListener('mousedown', this.handleMouseDown.bind(this))
    window.addEventListener('pagehide', this.handlePageHide.bind(this))
  }

  run() {
    this.running = true
    if (this.booms.length == 0) {
      return this.running = false
    }

    requestAnimationFrame(this.run.bind(this))

    this.computerContext.clearRect(0, 0, this.globalWidth, this.globalHeight)
    this.renderContext.clearRect(0, 0, this.globalWidth, this.globalHeight)

    this.booms.forEach((boom, index) => {
      if (boom.stop) {
        return this.booms.splice(index, 1)
      }
      boom.move()
      boom.draw()
    })
    this.renderContext.drawImage(this.computerCanvas, 0, 0, this.globalWidth, this.globalHeight)
  }
}

const cursorSpecialEffects = new CursorSpecialEffects()
cursorSpecialEffects.init()
```

代码参考了这篇文章：[在Hexo+NexT博客中设置鼠标点击特效 | CodeHeap (gitee.io)](https://jrbcode.gitee.io/posts/80095cae.html)

然后打开`_config.fluid.yml`，寻找`custom_js`。然后改成：

```yaml
custom_js:
	- js/fireworks.js
```

大功告成！

还有其它的点击效果，可根据需求选取。

#### 爱心

```javascript
!function(e,t,a){function n(){c(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"),o(),r()}function r(){for(var e=0;e<d.length;e++)d[e].alpha<=0?(t.body.removeChild(d[e].el),d.splice(e,1)):(d[e].y--,d[e].scale+=.004,d[e].alpha-=.013,d[e].el.style.cssText="left:"+d[e].x+"px;top:"+d[e].y+"px;opacity:"+d[e].alpha+";transform:scale("+d[e].scale+","+d[e].scale+") rotate(45deg);background:"+d[e].color+";z-index:99999");requestAnimationFrame(r)}function o(){var t="function"==typeof e.onclick&&e.onclick;e.onclick=function(e){t&&t(),i(e)}}function i(e){var a=t.createElement("div");a.className="heart",d.push({el:a,x:e.clientX-5,y:e.clientY-5,scale:1,alpha:1,color:s()}),t.body.appendChild(a)}function c(e){var a=t.createElement("style");a.type="text/css";try{a.appendChild(t.createTextNode(e))}catch(t){a.styleSheet.cssText=e}t.getElementsByTagName("head")[0].appendChild(a)}function s(){return"rgb("+~~(255*Math.random())+","+~~(255*Math.random())+","+~~(255*Math.random())+")"}var d=[];e.requestAnimationFrame=function(){return e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,1e3/60)}}(),n()}(window,document);
```

#### 爆炸

```javascript
"use strict";function updateCoords(e){pointerX=(e.clientX||e.touches[0].clientX)-canvasEl.getBoundingClientRect().left,pointerY=e.clientY||e.touches[0].clientY-canvasEl.getBoundingClientRect().top}function setParticuleDirection(e){var t=anime.random(0,360)*Math.PI/180,a=anime.random(50,180),n=[-1,1][anime.random(0,1)]*a;return{x:e.x+n*Math.cos(t),y:e.y+n*Math.sin(t)}}function createParticule(e,t){var a={};return a.x=e,a.y=t,a.color=colors[anime.random(0,colors.length-1)],a.radius=anime.random(16,32),a.endPos=setParticuleDirection(a),a.draw=function(){ctx.beginPath(),ctx.arc(a.x,a.y,a.radius,0,2*Math.PI,!0),ctx.fillStyle=a.color,ctx.fill()},a}function createCircle(e,t){var a={};return a.x=e,a.y=t,a.color="#F00",a.radius=0.1,a.alpha=0.5,a.lineWidth=6,a.draw=function(){ctx.globalAlpha=a.alpha,ctx.beginPath(),ctx.arc(a.x,a.y,a.radius,0,2*Math.PI,!0),ctx.lineWidth=a.lineWidth,ctx.strokeStyle=a.color,ctx.stroke(),ctx.globalAlpha=1},a}function renderParticule(e){for(var t=0;t<e.animatables.length;t++){e.animatables[t].target.draw()}}function animateParticules(e,t){for(var a=createCircle(e,t),n=[],i=0;i<numberOfParticules;i++){n.push(createParticule(e,t))}anime.timeline().add({targets:n,x:function(e){return e.endPos.x},y:function(e){return e.endPos.y},radius:0.1,duration:anime.random(1200,1800),easing:"easeOutExpo",update:renderParticule}).add({targets:a,radius:anime.random(80,160),lineWidth:0,alpha:{value:0,easing:"linear",duration:anime.random(600,800)},duration:anime.random(1200,1800),easing:"easeOutExpo",update:renderParticule,offset:0})}function debounce(e,t){var a;return function(){var n=this,i=arguments;clearTimeout(a),a=setTimeout(function(){e.apply(n,i)},t)}}var canvasEl=document.querySelector(".fireworks");if(canvasEl){var ctx=canvasEl.getContext("2d"),numberOfParticules=30,pointerX=0,pointerY=0,tap="mousedown",colors=["#FF1461","#18FF92","#5A87FF","#FBF38C"],setCanvasSize=debounce(function(){canvasEl.width=2*window.innerWidth,canvasEl.height=2*window.innerHeight,canvasEl.style.width=window.innerWidth+"px",canvasEl.style.height=window.innerHeight+"px",canvasEl.getContext("2d").scale(2,2)},500),render=anime({duration:1/0,update:function(){ctx.clearRect(0,0,canvasEl.width,canvasEl.height)}});document.addEventListener(tap,function(e){"sidebar"!==e.target.id&&"toggle-sidebar"!==e.target.id&&"A"!==e.target.nodeName&&"IMG"!==e.target.nodeName&&(render.play(),updateCoords(e),animateParticules(pointerX,pointerY))},!1),setCanvasSize(),window.addEventListener("resize",setCanvasSize,!1)}"use strict";function updateCoords(e){pointerX=(e.clientX||e.touches[0].clientX)-canvasEl.getBoundingClientRect().left,pointerY=e.clientY||e.touches[0].clientY-canvasEl.getBoundingClientRect().top}function setParticuleDirection(e){var t=anime.random(0,360)*Math.PI/180,a=anime.random(50,180),n=[-1,1][anime.random(0,1)]*a;return{x:e.x+n*Math.cos(t),y:e.y+n*Math.sin(t)}}function createParticule(e,t){var a={};return a.x=e,a.y=t,a.color=colors[anime.random(0,colors.length-1)],a.radius=anime.random(16,32),a.endPos=setParticuleDirection(a),a.draw=function(){ctx.beginPath(),ctx.arc(a.x,a.y,a.radius,0,2*Math.PI,!0),ctx.fillStyle=a.color,ctx.fill()},a}function createCircle(e,t){var a={};return a.x=e,a.y=t,a.color="#F00",a.radius=0.1,a.alpha=0.5,a.lineWidth=6,a.draw=function(){ctx.globalAlpha=a.alpha,ctx.beginPath(),ctx.arc(a.x,a.y,a.radius,0,2*Math.PI,!0),ctx.lineWidth=a.lineWidth,ctx.strokeStyle=a.color,ctx.stroke(),ctx.globalAlpha=1},a}function renderParticule(e){for(var t=0;t<e.animatables.length;t++){e.animatables[t].target.draw()}}function animateParticules(e,t){for(var a=createCircle(e,t),n=[],i=0;i<numberOfParticules;i++){n.push(createParticule(e,t))}anime.timeline().add({targets:n,x:function(e){return e.endPos.x},y:function(e){return e.endPos.y},radius:0.1,duration:anime.random(1200,1800),easing:"easeOutExpo",update:renderParticule}).add({targets:a,radius:anime.random(80,160),lineWidth:0,alpha:{value:0,easing:"linear",duration:anime.random(600,800)},duration:anime.random(1200,1800),easing:"easeOutExpo",update:renderParticule,offset:0})}function debounce(e,t){var a;return function(){var n=this,i=arguments;clearTimeout(a),a=setTimeout(function(){e.apply(n,i)},t)}}var canvasEl=document.querySelector(".fireworks");if(canvasEl){var ctx=canvasEl.getContext("2d"),numberOfParticules=30,pointerX=0,pointerY=0,tap="mousedown",colors=["#FF1461","#18FF92","#5A87FF","#FBF38C"],setCanvasSize=debounce(function(){canvasEl.width=2*window.innerWidth,canvasEl.height=2*window.innerHeight,canvasEl.style.width=window.innerWidth+"px",canvasEl.style.height=window.innerHeight+"px",canvasEl.getContext("2d").scale(2,2)},500),render=anime({duration:1/0,update:function(){ctx.clearRect(0,0,canvasEl.width,canvasEl.height)}});document.addEventListener(tap,function(e){"sidebar"!==e.target.id&&"toggle-sidebar"!==e.target.id&&"A"!==e.target.nodeName&&"IMG"!==e.target.nodeName&&(render.play(),updateCoords(e),animateParticules(pointerX,pointerY))},!1),setCanvasSize(),window.addEventListener("resize",setCanvasSize,!1)};
```

#### 社会主义核心价值观

```javascript
var a_idx = 0;
jQuery(document).ready(function($) {
  $("body").click(function(e) {
    var a = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正" ,"法治", "爱国", "敬业", "诚信", "友善");
    var $i = $("<span/>").text(a[a_idx]);
    var x = e.pageX,
      y = e.pageY;
    $i.css({
      "z-index": 99999,
      "top": y - 28,
      "left": x - a[a_idx].length * 8,
      "position": "absolute",
      "color": "#ff7a45"
    });
    $("body").append($i);
    $i.animate({
      "top": y - 180,
      "opacity": 0
    }, 1500, function() {
      $i.remove();
    });
    a_idx = (a_idx + 1) % a.length;
  });
});
```

### 修改网页字体

打开`_config.fluid.yml` 找到`font`

```yaml
# 主题字体配置
# Font
font:
  font_size: 20px
  font_family: 
  letter_spacing: 0.02em
  code_font_size: 85%
```

如果要使用系统自带字体，只需设置`font_family`参数即可。下面主要介绍如何使用自定义字体。

在`css`文件夹下新建`font.css`然后输入以下内容：

```css
@font-face {
  font-family: "ZCOOLXiaoWei-Regular";
  src: url("./FZFWZhuZiAYuanJWM.TTF");
}

head,body{
  font-family: 'ZCOOLXiaoWei-Regular', Times, serif;
  font-size: large;
}
```

这里的`font-face`是引入外部字体。`font-family`是字体名称。`src`是字体文件地址，可以是本地文件也可以是在线字体链接（比如google font）。但是要注意一点：本地字体动辄几M甚至十几M，可能会严重拖慢网页加载速度。因此建议使用在线字体或字体托管服务。<span class="mask">我是找不到想要的在线字体，才使用本地字体的……好在带宽30M的腾讯云挺给力的</span>

然后设置`custom_css`

```yaml
custom_css:
	- js/font.css
```

最后把`_config.fluid.yml`下的`font_family`改成对应的字体名称即可。

### 添加全站总字数统计

{% note danger %}
涉及对源代码的修改，请提前备份！
{% endnote %}


fluid 只支持单篇文章的字数统计，不支持全站总字数统计，无法满足我们的虚荣心，那么该怎么办呢？

答案是引入`hexo-WordCount`插件！

首先安装`hexo-WordCount`插件。

```shell
npm i --save hexo-wordcount
```

安装之后打开 fluid 文件夹（npm安装应该是`node_modules/hexo-theme-fluid`，其它安装方式应该是`theme/fluid`） 。找到`layout/_partial/footer.ejs`。然后改成下面的样子。

```ejs
<footer class="text-center mt-5 py-3">
  <span style="font-size: medium;" class="post-count">全站文章总字数：<%= totalcount(site) %>，继续加油哦！</span>
  <div class="footer-content">
    <%- theme.footer.content %>
  </div>  
  <%- partial('_partial/statistics.ejs') %>
  <%- partial('_partial/beian.ejs') %>
  <% if(theme.web_analytics.cnzz) { %>
    <!-- cnzz Analytics Icon -->
    <span id="cnzz_stat_icon_<%= theme.web_analytics.cnzz %>" style="display: none"></span>
  <% } %>     
</footer>
```

保存即可。

不过 fluid 采用的字数统计插件应该不是`hexo-WordCount`插件，因此会有些统计结果会有些出入。<del>Who care? 只要能满足虚荣心就好。</del> 



