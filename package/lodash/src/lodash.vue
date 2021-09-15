<template>
  <div class="lodash__content">
    <ul class="func">
      <li @click='clickli(item)'  v-for="(item,key) in func" class="func__item">
{{item.name}}
      </li>
    </ul>
     <div class="right">
       {{activeFunc.name+'('}}<input type="text" v-model='inputdata' @keyup.enter="change">)
        <pre>{{ JSON.stringify(result, null, 4)  }}</pre>
     </div>
     <div class="right1">
      [<input type="text" v-model='inputdata1' @keyup.enter="change1">]
        <pre>{{ JSON.stringify(result1, null, 4)  }}</pre>
     </div>

  </div>
</template>
<script>
      let _ = require('lodash');

  export default {
      name: 'HLodash',
data(){
return{
  _,
  func:[],
  inputdata:'',
  activeFunc:'',
  result:'',
  result1:'',
  inputdata1:'',


}
},
    props: {

    },

    computed: {
      buttonSize() {
        return this.size;
      },
      buttonDisabled() {
        return this.disabled;
      }
    },
    mounted() {

      for (const key in _) {
        if (Object.hasOwnProperty.call(_, key)) {
          this.func.push({name:key,value:_[key]})

        }
      }
    },
    methods: {
      change() {
        this.result= eval('_.'+this.activeFunc.name+'('+this.inputdata+')')
      },
      change1() {
        this.result1= eval(this.inputdata1)
      },
      clickli(item){
this.activeFunc=item
      }
    }
  };
</script>
<style lang="less" scoped>
  .lodash__content{
display: flex;
    .right{
      .button{
        border: 1px solid #000;
        width:60px
      }
      textarea{
        border: 1px solid #000;

      }
    }
  }
</style>
