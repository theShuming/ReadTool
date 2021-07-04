<template>
  <div id="input-wrap">
    <el-input
      v-model="article"
      type="textarea"
      :rows="22"
      resize="none"
      placeholder="Paste your article..."
    >
    </el-input>
    <a class="btn" href="javascript:void(0);" @click="change">Go!</a>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Index",
  data() {
    return {
      article: "",
    };
  },
  methods: {
    ...mapMutations({
      getArticle(commit, content) {
        commit("getArticle", content);
      },
    }),
    change() {
      let { article } = this;

      //判断是否为空
      if (!article) {
        this.$message("内容不能为空！");
        return;
      }

      //使用seesionstage
      this.getArticle(article);

      //路由跳转
      this.$router.push("/article");
    },
  },
};
</script>

<style scoped lang="less">
#input-wrap {
  width: 50%;
  margin: 50px auto;
  .el-textarea {
    height: 500px;
    /deep/.el-textarea__inner {
      background-color: rgba(236, 236, 236, 0);
      box-shadow: 0 0 10px 8px #e1e1e1;
      border-radius: 10px;
    }
  }
}
.btn {
  cursor: pointer;
  display: block;
  text-align: center;
  font-size: 24px;
  line-height: 50px;
  font-weight: bold;
  margin: 30px auto;
  width: 80%;
  height: 50px;
  background-color: rgba(219, 87, 5, 1);
  position: relative;
  box-shadow: 0px 9px 0px rgba(219, 31, 5, 1), 0px 9px 25px rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  font-family: "Yanone Kaffeesatz";
  text-decoration: none;
  color: rgba(255, 255, 255, 1);
  transition: all 0.1s ease;
}
.btn:active {
  position: relative;
  top: 6px;
  box-shadow: 0px 3px 0px rgba(219, 31, 5, 1), 0px 3px 6px rgba(0, 0, 0, 0.9);
}
</style>