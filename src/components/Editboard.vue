<template>
  <div>
    <el-form label-width="80px">
      <!-- 前缀 -->
      <el-form-item label="前缀">
        <el-input v-model="form.prefixName"></el-input>
        <span>=</span>
        <el-input v-model="form.prefixValue"></el-input>
      </el-form-item>

      <!-- 词根 -->
      <el-form-item label="词根">
        <el-input v-model="form.rootName"></el-input>
        <span>=</span>
        <el-input v-model="form.rootValue"></el-input>
      </el-form-item>

      <!-- 后缀 -->
      <el-form-item label="后缀">
        <el-input v-model="form.suffixName"></el-input>
        <span>=</span>
        <el-input v-model="form.suffixValue"></el-input>
      </el-form-item>

      <!-- 词义 -->
      <el-form-item label="词义">
        <el-input v-model="form.meaning" class="meaning"></el-input>
      </el-form-item>

      <!-- 短语 -->
      <el-form-item label="短语">
        <el-input v-model="form.phrase"></el-input>
        <span>=</span>
        <el-input v-model="form.phraseMeaning"></el-input>
      </el-form-item>

      <!-- 按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onClose">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Bus from "../eventBus";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      form: {
        prefixName: "",
        prefixValue: "",
        rootName: "",
        rootValue: "",
        suffixName: "",
        suffixValue: "",
        meaning: "",
        phrase: "",
        phraseMeaning: "",
      },
      currentwordID: "",
    };
  },
  created() {
    // console.log("单词info编辑板this.form", this.form);
    Bus.$on("getCurrentwordID", this.getCurrentwordID);
  },
  methods: {
    ...mapMutations({
      setWordInfo(commit, payload) {
        commit("setWordInfo", payload);
      },
    }),
    onSubmit() {
      let payload = { info: this.form, wordID: this.currentwordID };

      //通过vuex的mutations的setWordInfo方法把信息插入到单词的状态中
      this.setWordInfo({
        ...payload,
        cb: (res) => {
          //单词info插入后的回调
          if (res) {
            // 并关闭editboard
            this.onClose();
            //成功消息提示
            this.$message({
              showClose: true,
              message: "设置成功",
              type: "success",
            });
          }
        },
      });
    },
    onClose() {
      this.$emit("cEbs");
      setTimeout(() => {
        this.form = {
          prefixName: "",
          prefixValue: "",
          rootName: "",
          rootValue: "",
          suffixName: "",
          suffixValue: "",
          meaning: "",
          phrase: "",
          phraseMeaning: "",
        };
      }, 0);
    },
    getCurrentwordID(id) {
      this.currentwordID = id;
    },
  },
};
</script>
<style scoped lang="less">
.el-input {
  width: 40%;
  .el-input__inner {
    width: 100%;
  }
}
.meaning {
  width: 85%;
}
span {
  margin: 0 5px;
}
.el-button {
  width: 40%;
}
</style>
