<template>
  <div>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{lang[id]}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="0">javascript</el-dropdown-item>
        <el-dropdown-item command="1">html</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <h-button @click="sure">run</h-button>

    <textarea ref="mycode" class="codesql" v-model="code" style="height:200px;width:600px;"></textarea>
    <pre>{{ JSON.stringify(res,null,4).replace(/\"|\:|\[|\]|\,/g,"").replace(/\:/g," ").slice(7,-2)}}</pre>
    <textarea ref="mycode1" class="codesql1" v-model="res" style="height:200px;width:600px;"></textarea>


  </div>
</template>

<script>
  let _ = require('lodash');

  import "codemirror/theme/ambiance.css";
  import "codemirror/lib/codemirror.css";
  import "codemirror/addon/hint/show-hint.css";
  import { htmlToObj } from "@/util/htmlTransform.js"
  let CodeMirror = require("codemirror/lib/codemirror");
  require("codemirror/addon/edit/matchbrackets");
  require("codemirror/addon/selection/active-line");
  require("codemirror/mode/sql/sql");
  require("codemirror/addon/hint/show-hint");
  require("codemirror/addon/hint/sql-hint");


  let res = []
  function log(w) {
    console.log('w', w);
    res.push(w)
    console.log(res);
  }
  export default {
    name: "HRun",
    data() {
      return {
        id: '0',
        result: '',
        code: `  <img11 class="item1"></img11>
  <img11/>
  <div11 class="item2" info="质感边框">
     <div22 class="item3" style="bd:dd;d:dd" ><div33></div33></div22>
  </div11>
  <img11 class="item4"/>`,
        editor: null,
        res: res,
        lang: { "0": 'javascript', "1": 'html' }
      }
    },
    mounted() {
      // debugger
      //let theme = 'ambiance'//设置主题，不设置的会使用默认主题
      let editor = CodeMirror.fromTextArea(this.$refs.mycode, {
        mode: "text/html",//选择对应代码编辑器的语言，我这边选的是数据库，根据个人情况自行设置即可
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        matchBrackets: true,
        //theme: theme,
        // autofocus: true,
        extraKeys: { 'Ctrl': 'autocomplete' },//自定义快捷键
        hintOptions: {//自定义提示选项
          tables: {
            users: ['name', 'score', 'birthDate'],
            countries: ['name', 'population', 'size']
          }
        }
      })
      this.editor = editor
      //代码自动提示功能，记住使用cursorActivity事件不要使用change事件，这是一个坑，那样页面直接会卡死
      editor.on('cursorActivity', function () {
        editor.showHint()
      })
    },
    methods: {

      sure() {
        if (this.id == '0') {

          this.res.length = 0
          console.log('code', this.editor.getValue());
          eval(this.editor.getValue())
        } else {
          this.res.length = 0
          console.log('dddd', htmlToObj(this.editor.getValue()).children);
          console.log('SS', this.getCss(htmlToObj(this.editor.getValue()).children))
          let css = this.getCss(htmlToObj(this.editor.getValue()).children)
          log(this.getCss(htmlToObj(this.editor.getValue()).children))
        }

      },
      handleCommand(command) {
        this.id = command
      },
      getCss(obj) {
        let res = {}
        for (const item of obj) {
          if (item.class) {
            if (item.children.length) {
              res['.' + item.class] = this.getCss(item.children)
            } else {
              res['.' + item.class] = {}
            }
          } else {
            if (item.children.length) {
              res = { ...res, ...this.getCss(item.children) }
            }
          }
        }
        return res
      }
    },
  }
</script>

<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }



  .codesql {
    font-size: 11pt;
    font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  }

  .codesql1 {
    height: 800px !important;
    font-size: 11pt;
    font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  }
</style>
