/**
 * Created by placeless on 16/6/12.
 */

var converter = new showdown.Converter();
// 定义
var Editor = Vue.extend({
    template: ' <p> <a @click="bold" class="icon icon-bold"></a> <a @click="italic" class="icon icon-italic"></a> <a @click="link" class="icon icon-link"></a> <a @click="colon" class="icon icon-colon"></a> <a @click="code" class="icon icon-code"></a> <a @click="photo" class="icon icon-photo"></a> <a @click="ul" class="icon icon-ul"></a> <a @click="ol" class="icon icon-ol"></a> <a @click="title" class="icon icon-title"></a> <a @click="hr" class="icon icon-hr"></a> <a @click="left" class="icon icon-left"></a> <a @click="center" class="icon icon-center"></a> <a @click="right" class="icon icon-right"></a> </p> <textarea id="markdown" v-model="input" debounce="500" style="display: inline-block" rows="16"></textarea> <input type="hidden" name="content" v-model="input"><input type="hidden" name="html" v-model="output"><div>{{{ output }}}</div>',
    data: function () {
        return {
            input: '#hello world',
            position: null,
        }
    },
    methods: {
        textarea: function () {
            var textarea = document.querySelector('#markdown')
            return textarea
        },
        positionLinstener: function () {
            if (document.selection) {
                this.textarea().focus();
                var Sel = document.selection.createRange();
                Sel.moveStart('character', -this.textarea().value.length);
                CaretPos = Sel.text.length;
            }
//                 Firefox support
            else if (this.textarea().selectionStart || this.textarea().selectionStart == '0') {
                CaretPos = this.textarea().selectionStart;
            }
            this.position = CaretPos;
        },
        colon: function (event) {
            this.positionLinstener();
            var first = this.input.substr(0, this.position)
            var last = this.input.substr(this.position, this.input.length)
            this.input = first + '> 引用文字' + last;
            this.textarea().focus();
        },
        photo: function (event) {
            this.positionLinstener();
            var first = this.input.substr(0, this.position)
            var last = this.input.substr(this.position, this.input.length)
            this.input = first + '\n![Alt text](/path/to/img.jpg "Optional title")' + last;
            this.textarea().focus();
        },
        title: function (event) {
            this.positionLinstener();
            var first = this.input.substr(0, this.position)
            var last = this.input.substr(this.position, this.input.length)
            this.input = first + '\n标题文字 \n====' + last;
            this.textarea().focus();
        },
        ul: function (event) {
            this.positionLinstener();
            var first = this.input.substr(0, this.position)
            var last = this.input.substr(this.position, this.input.length)
            this.input = first + '\n* \n* \n* ' + last;
            this.textarea().focus();
        },
        ol: function (event) {
            this.positionLinstener();
            var first = this.input.substr(0, this.position)
            var last = this.input.substr(this.position, this.input.length)
            this.input = first + '\n1. \n2. \n3. ' + last;
            this.textarea().focus();
        },
        link: function (event) {
            this.positionLinstener();
            var first = this.input.substr(0, this.position)
            var last = this.input.substr(this.position, this.input.length)
            this.input = first + '[an example](http://example.com/ "Title") ' + last;
            this.textarea().focus();
        },
        italic: function (event) {

            this.positionLinstener();
            var first = this.input.substr(0, this.position)
            var last = this.input.substr(this.position, this.input.length)
            this.input = first + '*斜体文字*' + last;
            this.textarea().focus();
        },
        bold: function (event) {
            this.positionLinstener();
            var first = this.input.substr(0, this.position)
            var last = this.input.substr(this.position, this.input.length)
            this.input = first + '**加粗文字**' + last;
            this.textarea().focus();
        },
        code: function (event) {
            this.positionLinstener();
            var first = this.input.substr(0, this.position)
            var last = this.input.substr(this.position, this.input.length)
            this.input = first + '\n```请输入代码```' + last;
            this.textarea().focus();
        },

        hr: function (event) {
            this.positionLinstener();
            var first = this.input.substr(0, this.position)
            var last = this.input.substr(this.position, this.input.length)
            this.input = first + '\n___\n' + last;
            this.textarea().focus();
        },
        center: function (event) {
            var output = document.querySelector('#editor>div')
            this.textarea().style.display = 'inline-block'
            output.style.display = 'inline-block'
            this.textarea().style.width = '50%'
            output.style.width = '49%'
        },
        left: function (event) {
            var output = document.querySelector('#editor>div')
            this.textarea().style.display = 'inline-block'
            output.style.display = 'inline-block'
            this.textarea().style.width = '50%'
            output.style.width = '490%'

            this.textarea().style.display = 'none'
            output.style.width = '100%'

        },
        right: function (event) {
            var output = document.querySelector('#editor>div')
            this.textarea().style.display = 'inline-block'
            output.style.display = 'inline-block'
            this.textarea().style.width = '50%'
            output.style.width = '49%'

            output.style.display = 'none'
            this.textarea().style.width = '100%'
        }

    },
    computed: {
        output: function () {
            return converter.makeHtml(this.input)
        }
    }


})

// 注册
Vue.component('editor', Editor)

// 创建根实例



var autoTextarea = function (elem, extra, maxHeight) {
    extra = extra || 0;
    var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
        isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
        addEvent = function (type, callback) {
            elem.addEventListener ?
                elem.addEventListener(type, callback, false) :
                elem.attachEvent('on' + type, callback);
        },
        getStyle = elem.currentStyle ? function (name) {
            var val = elem.currentStyle[name];

            if (name === 'height' && val.search(/px/i) !== 1) {
                var rect = elem.getBoundingClientRect();
                return rect.bottom - rect.top -
                    parseFloat(getStyle('paddingTop')) -
                    parseFloat(getStyle('paddingBottom')) + 'px';
            }
            ;

            return val;
        } : function (name) {
            return getComputedStyle(elem, null)[name];
        },
        minHeight = parseFloat(getStyle('height'));

    elem.style.resize = 'none';

    var change = function () {
        var scrollTop, height,
            padding = 0,
            style = elem.style;

        if (elem._length === elem.value.length) return;
        elem._length = elem.value.length;

        if (!isFirefox && !isOpera) {
            padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
        }
        ;
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        elem.style.height = minHeight + 'px';
        if (elem.scrollHeight > minHeight) {
            if (maxHeight && elem.scrollHeight > maxHeight) {
                height = maxHeight - padding;
                style.overflowY = 'auto';
            } else {
                height = elem.scrollHeight - padding;
                style.overflowY = 'hidden';
            }
            ;
            style.height = height + extra + 'px';
            scrollTop += parseInt(style.height) - elem.currHeight;
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
            elem.currHeight = parseInt(style.height);
        }
        ;
    };

    addEvent('propertychange', change);
    addEvent('input', change);
    addEvent('focus', change);
    change();
};
var text = document.querySelector('#editor>textarea');
//    var text = document.getElementsByTagName('textarea');
autoTextarea(text);// 调用