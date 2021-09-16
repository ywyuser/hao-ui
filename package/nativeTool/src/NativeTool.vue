<template>
  <div class="lodash__content">
    <div class="func">
      <div v-for="(item,key) in func" class="func__item">
        {{key}}
        <div @click='clickli(key,item1)' v-for="(item1,key1) in Object.keys(item.default)" class="func__item-child">
          {{item1}}
          <div class="btn" @click="isShow" style="border:1px solid #000">show code</div>
          <pre v-show="show&&item1==activeFunc[1]">{{ item.default[item1].code }}</pre>
        </div>
      </div>
    </div>
    <div class="right">
      {{activeFunc[1]+'('}}<input type="text" v-model='inputdata' @keyup.enter="change">)
      <pre>{{ JSON.stringify(result, null, 4)  }}</pre>
    </div>
    <div class="right1">
      [<input type="text" v-model='inputdata1' @keyup.enter="change1">]
      <pre>{{ JSON.stringify(result1, null, 4)  }}</pre>
    </div>

  </div>
</template>
<script>
  const nativeTool = require.context(
    "@/util/nativeTool",
    false,
    /\.js$/
  );
  const nativeToolPath = {};
  nativeTool.keys().forEach(key => {
    console.log('key', key);
    const name = key.slice(2, -3);

    nativeToolPath[name] = require("@/util/nativeTool" + key.slice(1));
  });

  console.log('nativeToolPath', nativeToolPath);


  export default {
    name: 'HNativetool',
    data() {
      return {
        func: nativeToolPath,
        inputdata: '',
        activeFunc: [],
        result: '',
        result1: '',
        inputdata1: '',
        show: false

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


    },
    methods: {
      change() {
        console.log('this.func.' + this.activeFunc[0] + '.default.' + this.activeFunc[1] + '(' + this.inputdata + ')');
        this.result = eval('this.func.' + this.activeFunc[0] + '.default.' + this.activeFunc[1] + '(' + this.inputdata + ')')
      },
      change1() {
        this.result1 = eval(this.inputdata1)
      },
      clickli(key, item) {
        this.activeFunc=[key, item]
      },
      isShow() {
        this.show = !this.show
      }
    }
  };
</script>
<style lang="less" scoped>
  .lodash__content {
    display: flex;

    .func {
      width: 400px;

      &__item {
        &-child {
          display: flex;

          margin-left: 20px;

          .btn {
            background: rgb(64, 158, 255);

            height: 20px;
            width: 90px;
          }
        }
      }
    }

    .right {
      margin: 0 50px 0;

      .button {
        border: 1px solid #000;
        width: 60px
      }

      textarea {
        border: 1px solid #000;

      }
    }
  }
</style>
