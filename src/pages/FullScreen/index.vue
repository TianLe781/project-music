<template>
  <div class="container">
    <div class="lyricBox">
      <div class="lyricContainer">
        <div class="songName">
          <h2 class="title-Name">{{ songSinger[0] }}</h2>
          <h3 class="title-Singer">{{ songSinger[1] }}</h3>
        </div>
        <div class="lrc" ref="lrc"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { set } from "vue";
import { mapState } from "vuex";
export default {
  name: "FullScreen",
  data() {
    return {
      // 拆分后时间&歌词
      // 时间
      t: [],
      // 歌词
      p: [],
      //音频控件
      audio: null,
      //歌词
      lyric: "",
      //歌曲信息
      songSinger: [],
    };
  },
  mounted() {
    //接收音频元素
    this.audio = this.$bus.audio;
    //接收歌词
    this.lyric = this.$bus.Lyric;
    //接收歌曲信息
    this.songSinger = this.$bus.songInfo;
    console.log(this.songSinger);
    //在歌词界面时
    this.$bus.$on("songLyricData", (data) => {
      this.lyric = data.lrc.lyric;
      console.log("666666?????");
    });
    this.tub();
    this.lrcScroll();
    console.log(123);
  },
  computed: {
    lrcs() {
      return this.lyric.split("\n");
    },
  },
  methods: {
    //歌词解析
    tub() {
      //防止点击播放重复解析歌词
      if (this.p.length === 0) {
        // 遍历歌词数组
        for (var i in this.lrcs) {
          let t = this.lrcs[i].substring(
            this.lrcs[i].indexOf("[") + 1,
            this.lrcs[i].indexOf("]")
          );
          //分离:前后文字
          let s = t.split(":");
          // 截取]后面的歌词并筛选掉没有内容的歌词
          if (this.lrcs[i].substring(this.lrcs[i].lastIndexOf("]") + 1) == "") {
          } else if (isNaN(parseInt(s))) {
          } else {
            this.p.push(
              this.lrcs[i].substring(this.lrcs[i].lastIndexOf("]") + 1)
            );
            this.t.push(parseInt(s[0] * 60) + Math.round(s[1]));
          }
        }
        // 动态创建歌词p节点
        this.p.forEach((item) => {
          let lis = document.createElement("p");
          lis.className = "LyircP";
          lis.innerHTML = item;
          this.$refs.lrc.append(lis);
        });
      }
    },
    //歌词滚动
    lrcScroll() {
      console.log(66666 + "?");
      let p_list = document.querySelectorAll(".LyircP");
      this.$refs.lrc.scrollTop = 0;
      // this.$refs.lrc.style.transition = "0.5s all";

      //这里因为普通函数和箭头函数导致的this指向问题困扰了我一下午
      this.audio.ontimeupdate = () => {
        let time = Math.round(this.audio.currentTime);
        for (let i in this.t) {
          if (parseInt(this.t[i]) == time) {
            // console.log(p_list[i]);
            // let a = Math.round(this.scrollToViewCenter(p_list[i]));
            p_list.forEach((item) => {
              item.style.transition = "0.5s all";
              item.style.textAlign = "center";
              item.style.whiteSpace = "nowrap";
              item.style.color = "#535c68";
            });
            p_list[i].style.color = "rgb(7, 161, 110)";
            p_list[i].style.fontSize = "24px";
            if (i > 3) {
              console.log(Math.round(this.scrollToViewCenter(p_list[i])));
              this.$refs.lrc.scrollTo({
                top: (i - 3) * 57,
                behavior: "smooth",
              });
            }
          }
        }
      };
      console.log(77777 + "?");
    },
    //滚动算法
    scrollToViewCenter(el) {
      const { top, height } = el.getBoundingClientRect();
      // 元素的中心高度
      const elCenter = top + height / 2;
      // 窗口的中心高度
      const center = window.innerHeight / 2;
      const l = elCenter - center;
      return l;
    },
  },
  beforeDestroy() {
    this.$bus.$off("songLyricData");
  },
  watch: {
    lrcs(newValue, oldValue) {
      this.tub();
      this.lrcScroll();
      console.log("歌词变了23333");
    },
    // lyric() {
    //   // this.$router.go(-1);
    // },
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 100px);
  background-color: rgb(0, 0, 0);
  .lyricBox {
    width: 800px;
    height: 100%;
    padding: 25px 50px 115px 50px;
    // background-color: antiquewhite;
    .lyricContainer {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 16px;
      width: 100%;
      height: 100%;
      .songName {
        font-size: 24px;
        color: #fff;
        .title-Name {
          text-align: center;
          white-space: nowrap;
        }
        .title-Singer {
          text-align: center;
          font-weight: normal;
          white-space: nowrap;
        }
      }
      .lrc {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        overflow: auto;
        gap: 25px;
        width: 100%;
        height: 100%;
        color: #fff;
        font-size: 24px;
        transition: 1s all;
      }
    }
    .lrc::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>