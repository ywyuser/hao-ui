<template>
  <div class="lodash__content">
    <!-- <h-htmlpanel :url.asyc="url1"></h-htmlpanel>
    <h-htmlpanel :url.asyc="url2"></h-htmlpanel> -->
    <iframe    name="iframeMap"
    width="100%"
    height="470px"
    frameborder="0"
    scrolling="no"
src="static/edit-online/index.html" ></iframe>
  </div>
</template>
<script>
  export default{
    name:'HVuenote',
    data () {
      return {
        url1: '',
        url2: ''
      }
    },
    mounted () {
      this.url1 = './note/vuetip.mhtml'
      this.url2 = './note/vue修饰符.mhtml'
    },
    methods: {
    }
  }
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
