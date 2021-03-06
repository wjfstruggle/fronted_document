### 高频笔试题包括  

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8b60b016e914b3a81dde77aea8bc3b2~tplv-k3u1fbpfcp-watermark.image?)

#### Q1、BFC专题  

##### 1、防止高度坍塌4种方案  

> 问题重现

- 子元素浮动，还会对父元素造成影响。  
- 如果子元素浮动起来，就不占用普通文档流的位置。 父元素高度就会失去支撑，也称为高度坍塌  。

**俯视高度坍塌的效果**  

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99ba19aa5f0b4c838f7fc1692440bb8d~tplv-k3u1fbpfcp-watermark.image?)

- 即使有部分元素留在普通文档流布局中支撑着父元素，如果浮动起来的元素高度高于留下的元素。那么浮动元素的高度会超出父元素边框，用户体验同样不好！  

> 不好的解决方法

- ~~给父元素设置固定高度~~  
- 缺点: 多数情况下，父元素高度由内容撑起，很难提前固定父元素的高度。  

> 解决: 防止高度坍塌， 4种方案：

###### 方案一：

- 为父元素设置overflow:hidden属性。  
- 原理: CSS中的overflow :hidden属性会强制要求父元素必须包裹住所有内部浮动的元素， 以及所有元素的margin范围。  

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c70189e7266446aeb5bd540eff8c6604~tplv-k3u1fbpfcp-watermark.image?)

**代码实现：**

```css
<body>
  <div class="father">
    <div class="content"></div>
    <div class="sidebar"></div>
  </div>
</body>
<style>
  .father{
    background-color: aqua;
    overflow: hidden;
  }
  .content{
    height: 200px;
    width: 200px;
    background-color: blueviolet;
    float: left;
  }
  .sidebar{
    height: 200px;
    width: 200px;
    background-color: rgb(69, 65, 73);
    float: left;
  }
</style>
```

- 缺点， 如果刚好父元素有些超范围的子元素内容需要显示(比如，个别position定位的子菜单项)，不想隐藏，就会发生冲突。  

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc4faa2a2d7a48589c2500836e212456~tplv-k3u1fbpfcp-watermark.image?)



###### 方案二：

- 在父元素内的结尾追加一个空子元素，并设置空子元素清除浮动影响（`clear:both`） 。
- 原理: 利用clear:both属性和父元素必须包含非浮动的元素两个原理  

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7f77b79c09d4f309187578ee0856e23~tplv-k3u1fbpfcp-watermark.image?)

- 缺点: 无端多出一个无意义的看不见的空元素， 影响选择器和查找元素。  

###### 方案三：

- 设置父元素也浮动。  
- 原理: 浮动属性也会强制父元素扩大到包含所有浮动的内部元素。  

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a74a62194cd74e3ead945bd80ceb7018~tplv-k3u1fbpfcp-watermark.image?)

- 缺点: 会产生新的浮动影响。比如， 父元素浮动，导致父元素之后平级的页脚div上移，被父元素挡住了。  

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d768cd7f020b46f89ea569c7b731b609~tplv-k3u1fbpfcp-watermark.image?)

- 解决: 设置父元素之后的平级元素清除浮动（clear:both）。  

###### 方案四：

- 完美解决: 为父元素末尾伪元素设置`clear:both`。  
- 优点: 既不会影响显示隐藏，又不会影响查找元素，又不会产生新的浮动问题 。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/125ab56137a64388a5a85649c7baeab7~tplv-k3u1fbpfcp-watermark.image?)

- 问题：个别浏览器， `display:table`，可能带默认高度  
- 保险起见: 再加一个属性`height:0px  `

```css
父元素::after {
    content: "";
    display: table;
    clear: both;
    height: 0;
}
```

###### 总结: 防止高度坍塌， 4种方式  

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ebc6bcf221c34ef6aba64e1d0430d458~tplv-k3u1fbpfcp-watermark.image?)

##### 2、BFC

**什么是BFC**  

- BFC(Block formatting context)  
- 直译为"块级格式化上下文"。  
- 它是网页中一个==独立的渲染区域==（也成为formatting context ）。  
- 这个渲染区域只有块级（Block）元素才能参与。  
- 它规定了内部的块级元素如何布局。  
- BFC渲染区域内部如何布局， 与区域外部毫不相干。  
- 外部元素也不会影响BFC渲染区域内的元素。  

> 简单说

- BFC就是页面上的一个隔离的独立渲染区域。  
- 区域里面的==子元素==不会影响到==外面的元素==。  
- ==外面的元素==也不会影响到区域==里面的子元素。==  

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77eba61ace17442d8e2c57aec1cc845b~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b928e46a5a2a4ad7b0f980db5cc19db8~tplv-k3u1fbpfcp-watermark.image?)

###### BFC的布局规则

- 默认，内部的块元素会在垂直方向，一个接一个地放置。每个块元素独占一行

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f46daae6170496c927d8a967aeb1dfd~tplv-k3u1fbpfcp-watermark.image?)



- 块元素垂直方向的总距离由边框内大小+margin共同决定。  

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/649fda851916425facf92445a8d0419f~tplv-k3u1fbpfcp-watermark.image?)

- 属于同一个BFC的两个相邻块元素在垂直方向上的margin会发生重叠/合并。但水平方向的margin不会  

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e34d320efdc84ffd97a340c3bf2aedf5~tplv-k3u1fbpfcp-watermark.image?)

- 左侧BFC渲染区域的margin，必须与右侧BFC渲染区域的margin相衔接，不能出现重叠  

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/123a785d05c1422bb6a5eacefe8ff53d~tplv-k3u1fbpfcp-watermark.image?)

- 计算父元素BFC渲染区域的高度时，内部浮动元素的高度，都必须算在内。  

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2657efb30fc6452aa17b31eefcc96f1c~tplv-k3u1fbpfcp-watermark.image?)

###### 4种情况会形成BFC渲染区域  

- float的值不是none
- position的值不是static或者relative
- display的值是inline-block、 table-cell、 flex、 table-caption或者inline-flex  
- overflow的值不是visible  

> 所以，形成BFC区域可以解决高度坍塌！  

- 方案一:为父元素设置overflow:hidden属性 。
- 原理:因为形成BFC区域，所以必须父元素必须包含内部float浮动元素  

- 其实这里改成display:table，也可以。因为display:table也可以形成bfc区域。只不过，需要预防其他可能造成的新问题。  

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a16c99a959c41c0b6bc74ac7a2d6479~tplv-k3u1fbpfcp-watermark.image?)

- 方案三: 设置父元素也浮动。  
- 原理: 因为父元素float，也形成了BFC区域，必须包含内部float浮动的子元素。  

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f840a621b4d34b4a8df82be553163236~tplv-k3u1fbpfcp-watermark.image?)

###### 总结: BFC（块级格式化上下文）  

- 独立渲染区域  
- 内部不影响外部，外部也不能入侵影响内部  

###### 总结: 如何生成BFC区域， 4句话  

- float的值不是none  
- position的值不是static或者relative。  
- display的值是inline-block、 table-cell、 flex、 table-caption或者inline-flex  
- overflow的值不是visible  

##### 3、BFC还可以解决更多问题  

###### 1、避免垂直方向margin合并  

> 问题重现

- 垂直方向上，两个元素上下margin相遇时，两元素的间的总间距并不等于两个margin的和。而是等于最大的margin。  
- 小的margin会被大的margin吞并 。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29c7597872304a7a9b8894a1bf2a4de6~tplv-k3u1fbpfcp-watermark.image?)

> 解决: 2步  

- 第一步： 用一个外围块元素包裹下方元素  

- 第二步：设置新外层元素overflow:hidden，形成BFC渲染区域。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3971d579b9c44fa895b27687cb738495~tplv-k3u1fbpfcp-watermark.image?)

- 原理: 新外层元素，变成一个BFC方式的渲染区域，就必须包裹内部子元素及子元素的margin。  

- 而且，内部元素不能超出范围影响外部，外部元素也不能进入BFC范围内，影响内部。

- 缺点: 为如果父元素中部分自由定位的子元素，希望即使超出父元
  素范围，也能显示时，就冲突了。  
- 解决: 第二步: 父元素::before{ content:””; display:table}  
- 原理: display:table，在子元素之前形成平级的bfc渲染区域。不允许子元素的margin进入::before范围内。  
- 优点: 既不隐藏内容，又不添加新元素，又不影响高度。  

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b37bafaeea84cb2be12edc8892415c8~tplv-k3u1fbpfcp-watermark.image?)

###### 2、避免垂直方向margin溢出  

> 问题重现

- 问题：子元素设置margin-top，会超出父元素上边的范围，变成父元素的margin-top。  

- 而实际上，子元素与父元素之间，依然是没有margin-top的  
- 效果不是想要的。  

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68bff68b7b5240f4829e3daab6cff61d~tplv-k3u1fbpfcp-watermark.image?)

> 5种解决方法

- 1、设置父元素overflow:hidden  ，原理: 父元素变成BFC渲染区域，就必须包裹内层子元素的marg  
- 缺点: 万一有的子元素，即使溢出父元素，也希望显示呢？就会发生冲突。  

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/faa382c7ce1b44398d6c3766fe4e49a0~tplv-k3u1fbpfcp-watermark.image?)



- 2. 为父元素添加上边框，颜色设置为透明（transparent）  

- 原理: 这里不是bfc。而是因为边框本身可以阻隔margin溢出。  
- 缺点: 边框会增大父元素的实际大小，导致布局错乱  

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/696e8486081e4f9199a76940b60170e9~tplv-k3u1fbpfcp-watermark.image?)

- 3.用父元素的padding-top代替第一个子元素的margin-top  
- 原理: 这里也不是bfc。而是因为padding本身可以阻隔margin溢出。  
- 缺点: 对父元素高度有影响。  
- 解决: 可以设置父元素box-sizing:border-box。  

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a96647bd9df549f68f23d8cc5bc768c2~tplv-k3u1fbpfcp-watermark.image?)

- 4. 在父元素内第一个子元素之前添加一个空的`<table></table>  `
- 原理: table的display属性默认相当于table，所以形成小的bfc渲染区域。其他元素的margin不能进入table范围内。就阻隔了margin向上溢出。  
- 优点: 空table元素没有大小，不占用父元素控件。  
- 缺点: 增加一个看不见的空元素，干扰查找元素  

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e990a37195e4721b222b388d982ef68~tplv-k3u1fbpfcp-watermark.image?)

- 5. 最好的解决: 父元素`::before{ content:""; display:table; }  `
- 优点:既不隐藏内容，又不添加新元素，又不影响高度。  

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c52123b122a748b3a2f0fa3ec5bc98bf~tplv-k3u1fbpfcp-watermark.image?)

###### 3、左定宽，右自适应布局

> 希望效果

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93d07e30519848ff87b009e800a0a155~tplv-k3u1fbpfcp-watermark.image?)

- 第一步: 左边定宽元素左浮动: .left{ float:left; width:固定宽 }  
- 第二步: 右边元素右浮动： .right{ float:right; …}  
- 问题: 右边元素虽然在右边了，但是宽度无法自适应。  
- 右边元素不用右浮动，而是.right{overflow:hidden; … }  
- 原理: 右边元素overflow:hidden后，形成BFC渲染区域。左边的float元素就不能进入右边范围了。  

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80f678c8a7904a65b8fc903d1c764b54~tplv-k3u1fbpfcp-watermark.image?)

###### 总结: 解决垂直方向margin合并  

- Step1: 添加父元素包裹下方元素  

- Step2:  

  - 父元素overflow:hidden  
  - 父元素下第一个子元素前添加空<table>  

  - 父元素padding代替子元素margin  
  - 父元素+透明上边框  
  - 父元素::before{ content:””; display:table }  

###### 总结: 解决垂直方向margin溢出  

- 父元素overflow:hidden  
- 父元素下第一个子元素前添加空<table>  

- 父元素padding代替子元素margin  
- 父元素+透明上边框  
- 父元素::before{ content:””; display:table }  

#### Q2： 弹性布局回顾  

看阮一峰大神写的flex布局，写的非常详细[flex布局](https://ruanyifeng.com/blog/2015/07/flex-grammar.html)

#### Q3： 居中的方法总结  

3. 1垂直和水平同时居中总结 

- 利用绝对定位，设置 `left: 50%  和 top: 50% ` 现将子元素左上角移到父元素中心位置，然后再通过 `translate`  来调整子元素的中心点到父元素的中心。该方法可以不定宽高。

```css
<div class="wrap">
	<div class="box">文字</div>
</div>
<style>
.wrap {
    width: 300px;
    height: 300px;
    border: 1px solid #ccc;
    position: relative;
}
.box {
    /* width: 100px;
    height: 100px; */
    background-color: aquamarine;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
</style>
```

- 利用绝对定位，子元素所有方向都为 0 ，将 margin  设置为 auto ，由于宽高固定，对应方向实现平分，该方法必须盒子有宽高。

```css
  <div class="wrap">
    <div class="box">文字</div>
  </div>
  <style>
    .wrap {
      width: 300px;
      height: 300px;
      border: 1px solid #ccc;
      position: relative;
    }
    .box {
      width: 100px;
      height: 100px;
      background-color: aquamarine;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  </style>
```

- 利用绝对定位，设置 left: 50% 和 top: 50% 现将子元素左上角移到父元素中心位置，然后再通过 margin-left  和 margin-top  以子元素自己的一半宽高进行负值赋值。该方法必须定宽高。

```css
  <div class="wrap">
    <div class="box">文字</div>
  </div>
  <style>
    .wrap {
      width: 300px;
      height: 300px;
      border: 1px solid #ccc;
      position: relative;
    }
    .box {
      width: 100px;
      height: 100px;
      background-color: aquamarine;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -50px;
      margin-left: -50px;
    }
  </style>
```

- 利用 flex ，最经典最方便的一种了，不用解释，定不定宽高无所谓的。

```css
  <div class="wrap">
    <div class="box">文字</div>
  </div>
  <style>
    .wrap {
      width: 300px;
      height: 300px;
      border: 1px solid #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .box {
      /* width: 100px;
      height: 100px; */
      background-color: aquamarine;
    }
  </style>
```

- 利用`display: table-cell`,可以不定宽高

```css
<div class="wrap">
    <div class="box">文字</div>
  </div>
  <style>
    .wrap {
      width: 300px;
      height: 300px;
      border: 1px solid #ccc;
      display: table-cell;
      text-align: center;
      vertical-align: middle;
    }
    .box {
      /* width: 100px;
      height: 100px; */
      background-color: aquamarine;
      display: inline-block;
    }
  </style>
```

- `grid`布局，目前是最新的技术点

```css
<div class="wrap">
    <div class="box">文字</div>
  </div>
  <style>
    .wrap {
      width: 300px;
      height: 300px;
      border: 1px solid #ccc;
      display: grid;
    }
    .box {
      /* width: 100px;
      height: 100px; */
      background-color: aquamarine;
      margin: auto;
    }
  </style>
```

**[CSS Grid 网格布局教程](http://ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)**

#### 简述 rpx、px、em、rem、%、vh、vw的区别

- 设备物理像素：pt
  - 屏幕宽/分辨率，其中每一小份就是1pt
- css像素：px
  - pc机大屏幕显示器，1px约等于0.76个物理像素
  - 手机小屏幕：以iPhone6为标准，物理像素750，分辨率375，1px=2pt
  - 所以，px也是一个相对单位
  - px是为了平衡一个元素在PC上显示的大小与在手机上显示的大小尽量一致而制定的。
  - 但是，因为手机屏幕大小不一，差异较大，所以，反而不希望一个元素在所有手机上显示一样大。而是希望能够自动等比缩放。所以，移动端不要用px
  - 通常PC端大屏浏览器的网页，使用px单位较多
  - 移动端少用，因为px的长度相对固定，无法根据大小不一的移动端设备自适应改变大小
- rem
  - 以网页根元素`<html>`元素上设置的默认字体大小为1rem,默认1rem=16px
  - 好处
    - 可以实现响应式布局了！
    - 响应式布局指的是元素大小能根据屏幕大小随时变化。
    - 因为 所有以rem为单位的位置、大小都跟着根元素字体大小而变化。
    - 所以只要在屏幕大小变化的时候改变根元素font-size就行了。
- em
  - 父元素的字体大小为1em
  - 用的不多
- rpx：小程序，uni-app专用
  - 以iPhone6为标准，物理像素750，分辨率375
  - 无论屏幕大小，都将屏幕分成750份，每份就是1rpx。
  - 1rpx=0.5px=1pt
  - 优点：通过 rpx 设置元素和字体的大小，小程序在不同尺寸的屏幕下，可以实现自动适配
- vw/vh
  - CSS3 特性 vh 和 vw：
  - vh ，无论视口高度多少，都将视口高均分为100份，每1小份就是1vh，所以，也是相对单位，可随视口大小变化而自动变化。
  - vw ，无论视口宽度多少，都将视口宽均分为100份，每1小份就是1vw，所以，也是相对单位，可随视口大小变化而自动变化。
  - 所以vw和vh，本质就是%
  - 这里是视口指的是浏览器内部的可视区域大小
- %
  - 通常认为子元素的百分比完全相对于直接父元素，但是，不总是相对于父元素的对应属性值
  - 子元素的 top 和 bottom 如果设置百分比，则相对于直接非 static 定位(默认定位)的父元素的高度
  - 子元素的 left 和 right 如果设置百分比，则相对于直接非 static 定位(默认定位的)父元素的宽度
  - 但是，绝对定位时，就不一定参照父元素的宽和高了。而是参照最近的定位元素的包含padding的宽和高
  - 因为%不总是相对于父元素的宽高或屏幕大小，所以，有坑，开发少用。

#### Q4：移动端响应式布局

> 熟悉响应式布局的方式，几种，媒体查询原理等。

```html
<meta name="viewport"
      content=""
      width=device-width,user-scalable=no,
      initial-scale=1.0,maximum-scale=1.0
      ,minimum-scale=1.0">
       中每个属性的含义
```

`viewport`视口：显示设备内部，真正实际可用于显示网页的区域大小

`width`视口宽：`device-width`等于物理设备宽

`user-scalable`：是否允许用户手工缩放网页

`initial-scale`：加载页面时，页面的缩放比例是1，表示不缩放，原网页大小展示

`maximum-scale=1.0`：允许用户缩放网页的最大缩放比例和最小缩放比例

`minimum-scale=1.0`：都是1，表示不允许用户使用过程中，中途缩放网页

##### 5种响应式布局方式

###### 1、`flex`布局

- 优点: 代码简单，布局方便
- 缺点：如果中间有内容，缩到最小就不会在小了。且左右侧的宽度变小了

看阮一峰大神写的flex布局，写的非常详细[flex布局](https://ruanyifeng.com/blog/2015/07/flex-grammar.html)

###### 2、父相子绝

- 优点：可以使用media实现响应式布局
- 缺点：代码写法复杂，布局较繁琐，如果不使用media平分屏幕，宽度小于600的情况下，右侧会覆盖左侧。

###### 3、grid布局

- Flex布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局，
- Grid 布局则是将容器划分成“行"和“列”，产生单元格，然后指定"项目所在”的单元格，可以看作是二维布局
- Grid布局远比 Flex布局强大。(不过存在兼容性问题)
- 知识点比较多, 学习成本相对较高, 目前兼容性不如flex布局!
- **[CSS Grid 网格布局教程](http://ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)**

###### 4、float布局

- 容易被挤压换行

###### 5、使用rem作单位，等比缩放

- 首先，给根元素html设置一个字体大小。然后，其他尺寸单位全部用 rem然后，监听屏幕的大小。然后，根据屏幕的大小按比例改变根节点字体的大小。
- 因为 rem 的特性，其他的尺寸都是根据根节点字体的大小设定的，所以，根节点字体大小一变，其他所有尺寸都会按比例变大、或小。
- 大部分浏览器的字体有个最小值：12px。也就是缩小到 12px 后，字体不会继续缩小。

##### 媒体查询

#### Q5：利用css构建三角形（正三角，倒三角，左/右三角）

```css
// 正三角
.triangle_up{
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid red;
}
// 右三角
.triangle_right{
    width: 0;
    height: 0;
    border-left: 100px solid red;
    border-top: 50px solid transparent;
    border-bottom: 50px solid transparent;
}
// 左三角
.triangle_left{
    width: 0;
    height: 0;
    border-right: 100px solid red;
    border-top: 50px solid transparent;
    border-bottom: 50px solid transparent;
}
// 倒三角
.triangle_down{
    width: 0;
    height: 0;
    border-right: 50px solid transparent;
    border-left: 50px solid transparent;
    border-top: 100px solid red;
}
// 右下三角
.triangle_bottomright{
    width: 0;
    height: 0;
    border-bottom: 100px solid red;
    border-left: 100px solid transparent;
}
// 左下三角
.triangle_bottomleft{
    width: 0;
    height: 0;
    border-bottom: 100px solid red;
    border-right: 100px solid transparent;
}
// 左上三角
.triangle_topleft{
    width: 0;
    height: 0;
    border-top: 100px solid red;
    border-right: 100px solid transparent;
    margin-top: 20px;
}
// 右上三角
.triangle_topright{
    width: 0;
    height: 0;
    border-top: 100px solid red;
    border-left: 100px solid transparent;
    margin-top: 20px;
}
```

#### Q6：缩放

- 如何实现`<12px`的字(大部分浏览器最小字体默认是`12px`)

```css
display:inline-block; /*scale只能缩放行内块或块元素*/
-webkit-transform: scale(0.5);  /*定义2D缩放*/
-webkit-transform-origin:left top; /*定义缩放源点为左上角*/
```

- `0.5px`的线如何实现

问题：

```css
.hr.half-px {
    height: 0.5px;
} 不同设备，不同浏览器差异较大
```

解决：

```css
.hr.scale-half {
    height: 1px;
    transform: scaleY(0.5);
    transform-origin: 50% 100%; /*为了防止线模糊*/
}
```

**更好的解决: `svg`** 

- 其中: svg图片是 

```svg
<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='1px'>
    <line x1='0' y1='0' x2='100%' y2='0' stroke='#000'></line>
</svg>
```

- 使用`svg`的`line`元素画线，`stroke`表示描边颜色，默认描边宽度`stroke-width="1"`，由于`svg`的描边等属性的`1px`是物理像素的`1px`，相当于高清屏的`0.5px`，另外还可以使用`svg`的`rect`等元素进行绘制。

~~但是在`firefox`挂了~~

- 解决: 把svg转为base64

```css
.hr.svg {
    background: url("data:image/svg+xml;utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='1px'><line x1='0' y1='0' x2='100%' y2='0' stroke='#000'></line></svg>");
    background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzFweCc+PGxpbmUgeDE9JzAnIHkxPScwJyB4Mj0nMTAwJScgeTI9JzAnIHN0cm9rZT0nIzAwMCc+PC9saW5lPjwvc3ZnPg==");
}
```

- 优点，可以利用svg画出各种图形的0.5px线条