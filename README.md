# Hello world 😊
####  a simple markdown editor can use in browser.
#### this was builded by [showdown](https://github.com/showdownjs/showdown "Title")  & [Vue](https://github.com/vuejs/vue "Title") ,and the icon via [fontawesome](http://fontawesome.io/ "Title")
## Installation
`<script src="//cdn.bootcss.com/showdown/1.4.1/showdown.js"></script>
 <script src="http://cn.vuejs.org/js/vue.js"></script>

##Example
Html
`<div id="editor">
    <textarea v-model="input" debounce="300"></textarea>
    <div>{{{ output }}} {{ positon }}</div>`
Js
`var converter = new showdown.Converter();
    var editor = new Vue({
        el: '#editor',
        data: {
            input: '# hello',
            position: null,
            textarea: document.querySelector('textarea')
        },
        computed: {
            output: function () {
                return converter.makeHtml(this.input)
            }
        }
    });`
## Method
Get content by model
`<input type='hidden' v-model='output'></input>`
Get content by Javascript
`editor.input
editor.output`
