<template>
  <div>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{lang[id]}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="0">html</el-dropdown-item>
        <el-dropdown-item command="1">javascript</el-dropdown-item>
        <el-dropdown-item command="2">json</el-dropdown-item>
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
  import { htmlToObj } from "@/util/run/htmlTransform.js"
  import { delQuotes } from "@/util/run/jsonParse.js"
  let CodeMirror = require("codemirror/lib/codemirror");
  require("codemirror/addon/edit/matchbrackets");
  require("codemirror/addon/selection/active-line");
  require("codemirror/mode/sql/sql");
  require("codemirror/addon/hint/show-hint");
  require("codemirror/addon/hint/sql-hint");


  let res = []
  function log(w) {
    res.push(w)
  }
  export default {
    name: "HRun",
    data() {
      return {
        id: '0',
        result: '',
        code: `   
    <div class="c1">
    <div class="c2 a1">
      <div class="c4"></div>
    </div>
    <div class="c2 a2" sss="dd">
      <div class="c5" ss="dd"></div>
    </div>
    <div class="c3"></div>
  </div>`,
        editor: null,
        res: res,
        lang: { "0": 'html', "1": 'javascript',"2":'json' }
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
        if (this.id == '1') {
          //js
          this.res.length = 0
          console.log('code', this.editor.getValue());
          eval(this.editor.getValue())
        } else if(this.id == '0') {
          //css
          this.res.length = 0
          console.log('-------------', htmlToObj(this.editor.getValue()).children);
          // console.log('SS', this.getCss(htmlToObj(this.editor.getValue()).children))
          let css = this.getCss(htmlToObj(this.editor.getValue()).children)
          log(this.getCss(htmlToObj(this.editor.getValue()).children))
        }else if(this.id == '2'){
          //json
          this.res.length = 0
          log(delQuotes(this.editor.getValue()))
        }

      },
      handleCommand(command) {
        this.id = command
      },
      getCss(obj,parentClass) {
        // console.log('par',parentClass);
        let res = {}
        for (const item of obj) {
          let name=parentClass
          if (item.class) {
         
            for (const classItem of item.class) {
              
              if (classItem.indexOf(parentClass)===0) {
                name='&'+classItem.replace(parentClass,"")
                if (res[name]) {
                  res[name]={}
                }else{

                  if (item.children.length) {
  
                    res[name] = this.getCss(item.children,classItem)
                  } else {
                    res[name] = {}
                  }
                }
              }else{
                name=classItem
                if (res['.'+name]) {
                  res['.'+name]={}
                }else{
                    if (item.children.length) {
                      res['.' + name] = this.getCss(item.children,classItem)
                    } else {
                      res['.' + name] = {}
                    }
                }
              }
            }
          } else {
            if (item.children.length) {
              res = { ...res, ...this.getCss(item.children,name) }
            }
          }
          // console.log('name',name);

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
