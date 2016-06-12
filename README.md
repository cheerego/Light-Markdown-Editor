# Hello world 😊
####  a simple markdown editor can use in browser.
#### this was builded by [showdown](https://github.com/showdownjs/showdown "Title")  & [Vue](https://github.com/vuejs/vue "Title") ,and the icon via [fontawesome](http://fontawesome.io/ "Title")
## Installation
```
<script src="//cdn.bootcss.com/showdown/1.4.1/showdown.js"></script>
<script src="http://cn.vuejs.org/js/vue.js"></script>
```
```
<link rel="stylesheet" href="dist/editor.css">
<script src="dist/editor.js"></script>

```
#Html
```
<div id="editor" style="width: 50%">
    <editor></editor>
</div>
<script !src="">
     new Vue({
       el: '#editor' //使用包裹<editor></editor>标签div的id
    })
```