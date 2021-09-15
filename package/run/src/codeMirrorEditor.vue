<template>
  <codemirror
      ref="myCm"
      :value="value"
      :options="cmOptions"
      @changes="onCmCodeChanges"
      @blur="onCmBlur"
      @keydown.native="onKeyDown"
      @mousedown.native="onMouseDown"
      @paste.native="OnPaste"
  ></codemirror>
</template>
<script>
import { codemirror } from "vue-codemirror";
import "codemirror/theme/blackboard.css";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";
import "codemirror/mode/css/css.js";
import "codemirror/mode/yaml/yaml.js";
import "codemirror/mode/sql/sql.js";
import "codemirror/mode/python/python.js";
import "codemirror/mode/markdown/markdown.js";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/javascript-hint.js";
import "codemirror/addon/hint/xml-hint.js";
import "codemirror/addon/hint/css-hint.js";
import "codemirror/addon/hint/html-hint.js";
import "codemirror/addon/hint/sql-hint.js";
import "codemirror/addon/hint/anyword-hint.js";
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/lint/lint.js";
import "codemirror/addon/lint/json-lint";
require("script-loader!jsonlint");
import "codemirror/addon/lint/javascript-lint.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/xml-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/edit/closebrackets.js";
import "codemirror/addon/edit/closetag.js";
import "codemirror/addon/edit/matchtags.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/selection/active-line.js";
import "codemirror/addon/search/jump-to-line.js";
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";
import "codemirror/addon/display/autorefresh.js";
import "codemirror/addon/selection/mark-selection.js";
import "codemirror/addon/search/match-highlighter.js";
export default {
    components: {
        codemirror
    },
    props: ["cmTheme", "cmMode", "autoFormatJson", "jsonIndentation","value"],
    data() {
        return {
            editorValue: "",
            cmOptions: {
                theme:!this.cmTheme || this.cmTheme == "default"? "blackboard": this.cmTheme,
                mode:!this.cmMode || this.cmMode == "default"? "application/json": this.cmMode,
        extraKeys: {
                    Tab: "autocomplete",
                    "Ctrl-Alt-L": () => {
                        try {
                            if (this.cmOptions.mode == "application/json" &&this.value) {
                                this.editorValue = this.formatStrInJson(this.value);
                            }
                        } catch (e) {
                            this.$message.error("格式化代码出错：" + e.toString());
                        }
                    }
                },
                lineWrapping: true,//代码折叠
                  lineNumbers: true,//是否显示行号
                  autofocus: true,
                  smartIndent: 4,// 自动缩进
                  indentUnit: 4, //缩进单位
                  tabSize: 4, //tab字符的宽度
                  autocorrect: true,//自动更正
                  spellcheck: true,//拼写检查
                  lint: true,
                  gutters: [
                      "CodeMirror-lint-markers",//代码错误检测
                      "CodeMirror-linenumbers",
                      "CodeMirror-foldgutter",//展开收起
                  ],
                  foldGutter: true,
                  matchTags: { bothTags: true },
                  matchBrackets: true,
                  styleActiveLine: true,
                  autoRefresh: true,
                  highlightSelectionMatches: {//显示当前所选单词
                    minChars: 2,
                    style: "matchhighlight",
                    showToken: true
                },
                styleSelectedText: true,
                  enableAutoFormatJson:this.autoFormatJson == null ? true : this.autoFormatJson,
                defaultJsonIndentation:!this.jsonIndentation ||typeof this.jsonIndentation != typeof 1? 2: this.jsonIndentation
            },
            enableAutoFormatJson:this.autoFormatJson == null ? true : this.autoFormatJson,
            defaultJsonIndentation: !this.jsonIndentation || typeof this.jsonIndentation != typeof 1? 2: this.jsonIndentation
        };
    },
    watch: {
        cmTheme: function(newValue, oldValue) {
            try {
                let theme = this.cmTheme == "default" ? "blackboard" : this.cmTheme;
                require("codemirror/theme/" + theme + ".css");
                this.cmOptions.theme = theme;
                this.resetLint();
            } catch (e) {
                this.$message.error("切换编辑器主题出错：" + e.toString());
            }
        },
        cmMode: function(newValue, oldValue) {
            this.$set(this.cmOptions, "mode", this.cmMode);
            this.resetLint();
            this.resetFoldGutter();
        }
    },
    methods: {
        resetLint() {
            if (!this.$refs.myCm.codemirror.getValue()) {
                this.$nextTick(() => {
                    this.$refs.myCm.codemirror.setOption("lint", false);
                });
                return;
            }
            this.$refs.myCm.codemirror.setOption("lint", false);
            this.$nextTick(() => {
                this.$refs.myCm.codemirror.setOption("lint", true);
            })
        },
        resetFoldGutter() {
             this.$refs.myCm.codemirror.setOption("foldGutter", false);
            this.$nextTick(() => {
                this.$refs.myCm.codemirror.setOption("foldGutter", true);
            });
        },

        // 黏贴事件处理函数
        OnPaste(event) {
            if (this.cmOptions.mode == "application/json") {
                try {
                    this.editorValue = this.formatStrInJson(this.value);
                } catch (e) {
                    // 啥都不做
                }
            }
        },
        // 失去焦点时处理函数
        onCmBlur(cm, event) {
            try {
                let editorValue = cm.getValue();
                if (this.cmOptions.mode == "application/json" && editorValue) {
                    if (!this.enableAutoFormatJson) {
                        return;
                    }
                    this.editorValue = this.formatStrInJson(editorValue);
                }
            } catch (e) {
                // 啥也不做
            }
        },
        // 按下键盘事件处理函数
        onKeyDown(event) {
            const keyCode = event.keyCode || event.which || event.charCode;
            const keyCombination = event.ctrlKey || event.altKey || event.metaKey;
            if (!keyCombination && keyCode > 64 && keyCode < 123) {
                this.$refs.myCm.codemirror.showHint({ completeSingle: false });
            }
            console.log('value',this.value)
        },
        // 按下鼠标时事件处理函数
        onMouseDown(event) {
            this.$refs.myCm.codemirror.closeHint();
        },
        onCmCodeChanges(cm, changes) {
            this.editorValue = cm.getValue();
            this.resetLint();
      this.$emint('onChangeCode',cm.getValue())
        },
        // 格式化字符串为json格式字符串
        formatStrInJson(strValue) {
            return JSON.stringify( JSON.parse(strValue),null, this.defaultJsonIndentation)
        }
    },
    created() {
        try {
            if (!this.value) {
                this.cmOptions.lint = false;
                return;
            }
            if (this.cmOptions.mode == "application/json") {
                if (!this.enableAutoFormatJson) {
                    return;
                }
                this.editorValue = this.formatStrInJson(this.value);
            }
        } catch (e) {
            console.log("初始化codemirror出错：" + e);
    }

 } }
</script>
<style>
.CodeMirror-selected {
  background-color: blue !important;
}
.CodeMirror-selectedtext {
  color: white !important;
}
.cm-matchhighlight {
  background-color: #ae00ae;
}
</style>
