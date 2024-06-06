# HTML中的Javascript

首先来一张HTML规范中的图，这张图贯穿全文，解释了script的执行时间，属性的使用情景

parser: 解析文档

fetch: 获取资源

execution: 执行

<figure>
  <img src="@/assets/images/study/js/two-1.png" />
  <figcaption>图2-1</figcaption>
</figure>

由于浏览器解析HTML标签是从上往下执行的，当遇到script脚本时候，会先执行脚本语言，解析完成之后才会继续往下执行，如果放在html常用标签节点之前就会导致页面渲染空白屏导致效果不佳，所以为了首屏显示默认开发者都需将脚本放到body的最底部

**除了一些老旧的需要jquery支持的框架，必须将jquery脚本放到head中进行支持**

## defer与async的区别

### defer:

这个属性表示脚本会被延迟到整个页面都解析完毕之后再执行，相当于立即下载，但延迟执行。

HTML5 规范要求脚本应该按照它们出现的顺序执行，因此第一个推迟的脚本会在第二个推迟的脚本之前执行，而且两者都会在 DOMContentLoaded 事件之前执行

```html
<script src="1.js" defer></script>
<script src="2.js" defer></script>
<script>
  window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded')
  })

  window.addEventListener('load', () => {
    console.log('load')
  })
</script>
```

<figure>
  <img src="@/assets/images/study/js/two-2.png" />
  <figcaption>图2-2</figcaption>
</figure>

### async:

async 也是异步脚本，先下载再执行，与 defer 不同的是，标记为 async 的脚本并不保证能按照它们出现的次序执行，给
脚本添加 async 属性的目的是告诉浏览器，不必等脚本下载和执行完后再加载页面，同样也不必等到
该异步脚本下载和执行后再加载其他脚本。正因为如此，异步脚本不应该在加载期间修改 DOM。

异步脚本保证会在页面的 load 事件前执行，但可能会在 DOMContentLoaded 之
前或之后

<figure>
  <img src="@/assets/images/study/js/two-3.png" />
  <figcaption>图2-3</figcaption>
</figure>

图中的222也有可能在111之前执行

**`综上所述，如果需要按照特定顺序加载和执行脚本并确保在文档解析完毕后执行，可以使用 defer 属性。而如果脚本之间没有依赖关系，可以并行加载和执行，并且在加载完成后立即执行，则可以使用 async 属性。`**


结合图2-1可以得出

- defer: 浏览器会在文档加载过程中下载脚本，但是文档被解析完成之后才会执行脚本

- async 也是异步加载，但是下载之后会立马执行，会阻塞渲染页面，所以不应该操作dom，并且由于这个特性，如果有的脚本有先后顺序的话，就不能使用这个属性
