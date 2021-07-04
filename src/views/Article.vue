<template>
  <div id="article">
    <!-- 词缀短语库 -->
    <div id="RootAndAffix_wrap">
      <el-collapse>
        <el-collapse-item title="Affix and Pharse">
          <AffixAndPhrase />
        </el-collapse-item>
      </el-collapse>
    </div>

    <!-- 单词info编辑板 -->
    <div id="editboard_wrap">
      <el-collapse-transition>
        <div v-show="Edshow" class="editboard">
          <Editboard @cEbs="changeEbshow" />
        </div>
      </el-collapse-transition>
    </div>

    <!-- 文章主体 -->
    <div id="content_main">
      <p v-for="arr in realarrArticle" :key="arr.customizedKey">
        <Word :word="arr" @cEbs="changeEbshow"></Word>
      </p>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Word from "../components/Word.vue";
import Editboard from "../components/Editboard.vue";
import AffixAndPhrase from "../components/AffixAndPhrase.vue";
export default {
  components: {
    Word,
    Editboard,
    AffixAndPhrase,
  },
  data() {
    return {
      contentArr: [],
      Edshow: false,
    };
  },
  created() {},
  computed: {
    ...mapState({
      realarrArticle: (state) => state.article.realarrArticle,
    }),
  },
  methods: {
    changeEbshow() {
      this.Edshow = !this.Edshow;
    },
  },
};
</script>
<style  lang="less" scoped>
#article {
  width: 100%;
  height: 100%;
  #content_main {
    width: 50%;
    margin: 0 auto;
  }
  #editboard_wrap {
    padding-top: 30px;
    background-color: #ccc;
    border-radius: 15px;
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
  #RootAndAffix_wrap {
    position: fixed;
    top: 15px;
    left: 0;
    width: 20%;
    box-shadow: 0 0 10px 1px #e1e1e1;
    .el-collapse {
      padding: 0;
      margin: 0;
      .el-collapse-item {
        /deep/.el-collapse-item__header {
          background: none;
          padding-left: 8px;
          font-size: 18px;
          color: rgb(219, 87, 5);
          border-bottom: solid 1px #dcdfe6;
        }
        /deep/.el-collapse-item__wrap {
          background: none;
          .el-collapse-item__content {
            padding: 0;
            max-height: 600px;
            overflow-y: scroll;
          }
        }
      }
    }
  }
}
</style>
