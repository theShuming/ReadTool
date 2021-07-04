<template>
  <div id="affix_and_phrase">
    <p v-for="item in affixPharseStore.affix" :key="Object.keys(item).join('')">
      <span class="english">{{ Object.keys(item).join("") }}</span
      ><span>{{ item[Object.keys(item).join("")] }}</span>
    </p>
    <el-divider></el-divider>
    <p
      v-for="item in affixPharseStore.phrase"
      :key="Object.keys(item).join('')"
    >
      <span class="english">{{ Object.keys(item).join("") }}</span
      ><span>{{ item[Object.keys(item).join("")] }}</span>
    </p>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      affixPharseStore: (state) => state.article.affixPharseStore,
    }),
  },
};
</script>
<style scoped lang="less">
#affix_and_phrase {
  width: 100%;
  font-size: 18px;
  background: none;
  span.english {
    padding: 8px;
    font-weight: bold;
  }
}
</style>