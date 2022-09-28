<template>
  <!-- 单曲 -->
  <div class="hotSearchRightBox">
    <section class="hotSearchRight">
      <!-- <h1>歌曲</h1> -->
      <div class="box" ref="songBox">
        <div
          class="song"
          v-for="(s, index) in songs"
          :key="s.id"
          :class="{ active: active == s.id }"
          @click.prevent="isActive(s.id)"
        >
          <div class="songInfo">
            <!-- 图片 -->
            <div class="songImg" @click="SongListPlay(s.id, index)">
              <i class="fa-solid fa-play"></i>
              <div class="mask"></div>
              <img :src="s.al.picUrl" alt="" />
            </div>
            <!-- 作者 -->
            <div class="songArtist">
              <p>{{ s.name }}</p>
              <p>{{ s.ar[0].name }}</p>
            </div>
            <div class="usability" v-if="songCheck">
              <p>{{ songCheck(s.id) }}</p>
            </div>
          </div>
          <!-- 时间 -->
          <div class="timeInfo">
            <div class="heart" @click.prevent="isHeart(index)" ref="heart">
              <i class="fa-solid fa-heart"></i>
            </div>
            <div class="songTime">
              <p>{{ dt(s.dt) }}</p>
            </div>
            <div class="ellipsis">
              <i class="fa-solid fa-ellipsis"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "SongList",
  data() {
    return {
      active: 0,
      HeartTemp: false,
      _this: this,
    };
  },
  created() {},
  props: ["songs"],
  mounted() {
    //当点击个歌曲时触发播放
  },
  computed: {
    //格式化歌曲时间
    dt: () => {
      return (dt) => {
        let minute = Math.floor(dt / 1000 / 60);
        if (minute < 10) {
          minute = "0" + minute;
        }
        let seconds = Math.floor((dt / 1000) % 60);
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        let time = minute + ":" + seconds;
        return time;
      };
    },
    //检测歌曲是否可用（未完成）
    songCheck: (_this) => {
      return async (id) => {
        let result = await _this.$API.reqCheck(id);
        // console.log(result.success);
        return 6;
      };
    },
  },
  methods: {
    isActive(index) {
      this.active = index;
    },
    //点赞
    isHeart(index) {
      if (!this.HeartTemp) {
        this.$refs.heart[index].childNodes[0].style.color = "#ec407a";
        this.HeartTemp = true;
      } else {
        this.$refs.heart[index].childNodes[0].style.color = "";
        this.HeartTemp = false;
      }
    },
    //播放
    SongListPlay(id, index) {
      //播放前先检测是否可用
      this.$API.reqCheck(id).then(
        (v) => {
          //不可用
          if (!v.success) return alert("亲爱的，暂无版权");
          //可用
          this.$store.dispatch("playlistinfo/songUrl", id);
          //传歌曲url给播放器
          this.$bus.$emit(
            "url",
            this.$store.state.playlistinfo.songUrl,
            this.$store.state.playlistinfo.songs[index],
            id
          );
          console.log(this.$store.state.playlistinfo.songs[index]);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  watch: {
    //等歌曲数据回来后进行判断
    // songs(value) {
    //   this.songs.forEach((item) => {
    //     this.songCheck(item.id);
    //   });
    // },
  },
};
</script>

<style lang="less" scoped>
.hotSearchRightBox {
  flex: 1;
  .hotSearchRight {
    flex: 2;
    h1 {
      color: #fff;
      font-size: 24px;
      font-weight: 400;
    }
    .box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      // height: 500px;
      margin-top: 20px;
      // 歌曲行距
      // gap: 3px;
      .song {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 56px;
        border-radius: 5px;
        .songInfo {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          min-width: 150px;
          height: 100%;
          padding-left: 10px;
          gap: 16px;
          cursor: pointer;
          // background-color: rgb(0, 0, 0);
          .songImg {
            position: relative;
            height: 45px;
            .fa-play {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: #fff;
              z-index: -1;
              cursor: pointer;
            }
            .mask {
              position: absolute;
              width: 45px;
              height: 45px;
              background-color: rgba(0, 0, 0, 0.5);
              z-index: -1;
            }
            img {
              width: 45px;
              height: 45px;
              object-fit: contain;
            }
          }
          .songImg:hover .fa-play {
            color: aquamarine;
          }
          .songArtist {
            display: flex;
            flex-direction: column;
            gap: 6px;
            p {
              &:first-child {
                color: #fff;
                cursor: pointer;
              }
              &:last-child {
                color: rgb(179, 179, 179);
                cursor: pointer;
              }
              &:last-child:hover {
                color: #fff;
                text-decoration: underline;
              }
            }
          }
          .usability {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            height: 100%;
            p {
              color: rgb(67, 67, 67);
            }
          }
        }
        .timeInfo {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 170px;
          height: 100%;
          color: rgb(167, 167, 167);
          gap: 10px;
          .heart {
            width: 20px;
            height: 20px;
            text-align: center;
            cursor: pointer;
            .fa-heart {
              line-height: 20px;
              font-size: 18px;
              display: none;
            }
            .fa-heart:hover {
              color: #fff;
            }
          }
          .ellipsis {
            width: 20px;
            height: 20px;
            text-align: center;
            margin-right: 10px;
            cursor: pointer;
            .fa-ellipsis {
              line-height: 20px;
              font-size: 18px;
              display: none;
              color: #fff;
            }
          }
          .songTime {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            margin-left: 15px;
            cursor: pointer;
            p {
              font-weight: 500;
            }
          }
        }
      }
      .song:hover {
        background-color: rgb(42, 42, 42);
      }
      .song:hover .songInfo .songArtist p {
        color: #fff;
      }
      .song:hover .songImg .fa-play {
        z-index: 2;
      }
      .song:hover .songImg .mask {
        z-index: 1;
      }
      .song:hover .timeInfo .heart .fa-heart,
      .song:hover .timeInfo .ellipsis .fa-ellipsis {
        display: block;
      }
      .active {
        background-color: rgb(90, 90, 90);
      }
      .active:hover {
        background-color: rgb(90, 90, 90);
      }
      .active .songInfo .songImg .mask {
        z-index: 1;
      }
      .active .songInfo .songImg .fa-play {
        z-index: 2;
      }
      .active .songInfo .songArtist p {
        &:last-child {
          color: #fff;
        }
      }
      .active .timeInfo .heart .fa-heart,
      .active .timeInfo .ellipsis .fa-ellipsis {
        display: block;
      }
    }
  }
}
</style>