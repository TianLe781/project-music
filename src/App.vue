<template>
  <div>
    <Modalbox v-if="isShowModalBox"></Modalbox>
    <div class="layoutBox">
      <AsideLeft></AsideLeft>
      <Header></Header>
    </div>
    <PalyBar></PalyBar>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      isShowModalBox: null,
    };
  },
  mounted() {
    // 全局事件总线
    this.$bus.$on("isShowModalBox", (data) => {
      this.isShowModalBox = data;
    });
    this.$bus.$on("iscloseModalBox", () => {
      this.isShowModalBox = !this.isShowModalBox;
    });
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
  -webkit-user-drag: none;
}
body::-webkit-scrollbar {
  display: none;
  background-color: rgb(255, 255, 255);
  width: 10px;
}
body::-webkit-scrollbar-thumb {
  background-color: rgb(0, 88, 34);
  border-radius: 5px;
  width: 10px;
}
a {
  /* color:#fff; */
  text-decoration: none;
}
.layoutBox {
  height: 100vh;
  display: flex;
}
</style>
