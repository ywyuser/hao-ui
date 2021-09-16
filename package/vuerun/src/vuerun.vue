<template>
  <div class="lodash__content">
    <edit/>
    <running/>
  </div>
</template>
<script>
import edit  from "./edit";
import running  from "./running";

  export default {
      name: 'HVuerun',
      components: {
        running,
        edit
    },
data(){
return{

}
},
    props: {

    },


    mounted() {

      for (const key in _) {
        if (Object.hasOwnProperty.call(_, key)) {
          this.func.push({name:key,value:_[key]})

        }
      }
    },
    methods: {

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
