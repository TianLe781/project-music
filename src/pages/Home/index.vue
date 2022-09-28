<template>
  <div class=".container">
    <!-- 轮播图 -->
    <div class="swiper-container banner">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(b, index) in bannerList" :key="index">
          <img :src="b.imageUrl" alt="" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    <!-- 热门推荐 -->
    <Recommend :fsTitle="playListCategory" :playLists="playLists"></Recommend>
    <Footer></Footer>
  </div>
</template>

<script>
//导入swiper
import Swiper from "swiper";
//引入组件
import Recommend from "@/components/Recommend";
import Footer from "@/components/Footer";
//Vuex
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    Recommend,
    Footer,
  },
  data() {
    return {
      playListCategory: [
        { title: "热门歌单", id: "001" },
        { title: "精品歌单", id: "002" },
      ],
      playLists: [],
    };
  },
  created() {
    //请求轮播图
    this.$store.dispatch("home/bannerList");
    //请求热门歌单
    this.$store.dispatch("home/songListHot");
    // 请求精品歌单
    this.$store.dispatch("home/songListBoutique");
  },
  mounted() {},
  computed: {
    ...mapState("home", ["bannerList"]),
    ...mapState("home", ["playListsHot"]),
    ...mapState("home", ["playListsBoutique"]),
  },
  methods: {},
  watch: {
    //解决轮播图请求完成前就创建swiper实例所导致的bug
    bannerList(value) {
      this.$nextTick(() => {
        //轮播图插件
        var mySwiper = new Swiper(".swiper-container", {
          effect: "coverflow",
          speed: 1000,
          loop: true,
          autoplay: true,
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: "auto",
          coverflowEffect: {
            rotate: 1,
            stretch: 0,
            depth: 500,
            modifier: 1,
            slideShadows: false,
          },
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });
    },
    //检测热门歌单获取以后push到歌单数组中
    playListsHot(value) {
      this.playLists.push(this.playListsHot);
    },
    //检测精品歌单获取以后push到歌单数组中
    playListsBoutique(value) {
      this.playLists.push(this.playListsBoutique);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  .banner {
    width: 1269px;
    height: 420px;
    background-color: rgb(31, 31, 31);
    .swiper-slide {
      width: 1080px;
      height: 100%;
      //   text-align: center;
    }
  }
}
</style>