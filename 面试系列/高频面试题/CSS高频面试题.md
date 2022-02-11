### 高频笔试题包括  

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8b60b016e914b3a81dde77aea8bc3b2~tplv-k3u1fbpfcp-watermark.image?)

#### Q1、BFC专题  

##### 1、防止高度坍塌==4==种方案  

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

