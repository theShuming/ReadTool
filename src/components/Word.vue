<template>
  <p>
    <span v-for="item in this.word" :key="item.wordKey">
      <el-button
        @click.stop="wordEdit(item)"
        :style="{
          color: item.color,
          textDecoration: item.color && 'underline',
        }"
        >{{ item.word }}</el-button
      >
    </span>
  </p>
</template>
<script>
import Bus from "../eventBus.js";

/* 包含：单词的点击事件(单词词义编辑板，单词信息弹框) */
export default {
  props: ["word"],
  data() {
    return {
      wordInfoShow: true,
    };
  },
  created() {
    //生成每一段的时候，循环每个单词对象，把里面的color属性设置成响应式
    this.word.forEach((item) => {
      this.$set(item, "color", item.color);
    });
  },
  methods: {
    // 点击单词
    wordEdit(itemObj) {
      let { word, wordKey, wordInfo } = itemObj;
      //单词未插入信息是（即没有wordInfo属性）
      if (!wordInfo) {
        this.$msgbox({
          customClass: "popover_box",
          center: true,
          showCancelButton: true,
          distinguishCancelAndClose: true, //区分取消和关闭
          lockScroll: false,
          confirmButtonText: "百度翻译",
          cancelButtonText: "编辑词义",
          beforeClose: (action, instance, done) => {
            //instance表示实例
            if (action === "confirm") {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = "跳转中...";
              setTimeout(() => {
                //done用于关闭实例
                // done();
                instance.confirmButtonLoading = false;
                instance.confirmButtonText = "百度翻译";
                window.open(`https://fanyi.baidu.com/#en/zh/${word}`, "_blank");
              }, 500);
            } else if (action === "cancel") {
              let wordID = wordKey;
              this.$emit("cEbs");
              Bus.$emit("getCurrentwordID", wordID);
              done();
            } else {
              done();
            }
          },
        }).catch((e) => e);
      }
      //单词有信息
      else {
        this.wordInfoShow = false;
        let vnode = this.createWordInfoBoard(wordInfo);
        this.$notify({
          title: word,
          message: vnode,
          duration: 0,
        });
      }
    },
    //生成单词信息样式函数
    createWordInfoBoard(wordInfo) {
      const h = this.$createElement;
      const {
        prefixName,
        prefixValue,
        rootName,
        rootValue,
        suffixName,
        suffixValue,
        meaning,
        phrase,
        phraseMeaning,
      } = wordInfo;
      if (!rootName && phrase) {
        return h("div", null, `${phrase} ————> ${phraseMeaning}`);
      } else if (!phrase && rootName) {
        return h(
          "p",
          null,
          `${prefixName} ${prefixValue} ${
            prefixName && "+"
          } ${rootName} ${rootValue} ${
            suffixName && "+"
          } ${suffixName} ${suffixValue}  ————>  ${meaning}`
        );
      } else {
        return h("div", null, [
          h(
            "p",
            null,
            `${prefixName} ${prefixValue} ${
              prefixName && "+"
            } ${rootName} ${rootValue} ${
              suffixName && "+"
            } ${suffixName} ${suffixValue} ————> ${meaning}`
          ),
          h("p", null, `${phrase} ————> ${phraseMeaning}`),
        ]);
      }
    },
  },
};
</script>
<style scoped lang="less">
.el-button {
  height: 25px;
  line-height: 25px;
  margin-left: 5px;
  padding: 0;
  outline: none;
  border: 0;
  font-size: 20px;
  background: none;
}
</style>
<style lang="less">
.popover_box {
  margin: 0;
  padding: 0;
  .el-message-box__content {
    display: none;
  }
  .el-button {
    margin: 15px 15px;
    width: 30%;
  }
}
.el-notification {
  background-color: rgba(255, 255, 255, 0);
}
</style>
