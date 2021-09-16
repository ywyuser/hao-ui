<template>
  <div class="dashboard-container">
    <quill-editor v-model="value"></quill-editor>
    <h-button @click="sure">run</h-button>
      <pre>{{ JSON.stringify(res, null, 4)}}</pre>
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name:'HHtmlpanel',
  data() {
    return {
      value:'dsf',
      res:''
    }
  },
  components: {
    quillEditor
  },
  methods: {
    sure(){
      this.res= this.value

        }
  },
}


</script>
<style lang="less" scoped>
  .dashboard-container{
    height: 400px;
    .ql-container{
    height: 400px !important;

    }
  }
</style>
