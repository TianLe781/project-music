<template>
  <div class="container">
    <!-- 未搜索时展示 -->
    <div v-if="!keyword">6666</div>
    <!-- 搜索结果展示区域 -->
    <div class="rusltContainer" v-else>
      <!-- 筛选Nav -->
      <div class="categoryNav">
        <div class="navLeft">
          <a>
            <button class="categoryActive">
              <span>全部</span>
            </button>
          </a>
          <a>
            <button>
              <span>艺人</span>
            </button>
          </a>
          <a>
            <button>
              <span>歌曲</span>
            </button>
          </a>
          <a>
            <button>
              <span>歌单</span>
            </button>
          </a>
          <a>
            <button>
              <span>专辑</span>
            </button>
          </a>
          <a>
            <button>
              <span>个人资料</span>
            </button>
          </a>
        </div>
      </div>
      <div>
        <!-- 搜索信息呈现区 -->
        <section class="hotSearch">
          <div class="hotSearchLeftBox">
            <section class="hotSearchLeft">
              <h1>热门结果</h1>
              <div class="box">
                <img src="../../assets/musicinfo/刚刚好.jpg" alt="" />
                <div class="artistInfo">
                  <h2>薛之谦</h2>
                  <span>
                    <p>艺人</p>
                  </span>
                  <i class="fa-solid fa-circle-play"></i>
                </div>
              </div>
            </section>
          </div>
          <div class="hotSearchRightBox">
            <section class="hotSearchRight">
              <h1>歌曲</h1>
              <div class="box" ref="songBox">
                <div
                  class="song"
                  v-for="(s, index) in 20"
                  :key="index"
                  :class="{ active: active == index }"
                  @click.prevent="isActive(index)"
                >
                  <div class="songInfo">
                    <div class="songImg">
                      <i class="fa-solid fa-play"></i>
                      <div class="mask"></div>
                      <img src="../../assets/musicinfo/刚刚好.jpg" alt="" />
                    </div>
                    <div class="songArtist">
                      <p>演员</p>
                      <p>薛之谦</p>
                    </div>
                  </div>
                  <div class="timeInfo">
                    <div
                      class="heart"
                      @click.prevent="isHeart(index)"
                      ref="heart"
                    >
                      <i class="fa-solid fa-heart"></i>
                    </div>
                    <div class="songTime">
                      <p>04:27</p>
                    </div>
                    <div class="ellipsis">
                      <i class="fa-solid fa-ellipsis"></i>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
    <!-- 增高垫 -->
    <Footer></Footer>
  </div>
</template>

<script>
import Recommend from "@/components/Recommend";
export default {
  name: "Search",
  components: {
    Recommend,
  },
  data() {
    return {
      keyword: "",
      active: 0,
      HeartTemp: false,
      artists: {},
    };
  },

  computed: {
    per: {
      get() {
        return 0;
      },
      set(val) {
        console.log(val);
      },
    },
  },

  mounted() {
    // 全局事件总线
    this.$bus.$on("k", (data) => {
      this.keyword = data;
    });
  },
  methods: {
    isActive(index) {
      this.active = index;
    },
    isHeart(index) {
      if (!this.HeartTemp) {
        this.$refs.heart[index].childNodes[0].style.color = "#ec407a";
        this.HeartTemp = true;
      } else {
        this.$refs.heart[index].childNodes[0].style.color = "";
        this.HeartTemp = false;
      }
    },
  },
  beforeDestroy() {
    this.$bus.$off("k");
  },
};
</script>

<style lang="less" scoped>
.container {
  .rusltContainer {
    padding: 0 32px;
    .categoryNav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 48px;
      background-color: rgb(18, 18, 18);
      .navLeft {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        gap: 16px;
        button {
          height: 36px;
          width: 50px;
          background-color: rgb(42, 42, 42);
          // background-color: #fff;
          border: none;
          border-radius: 16px;
          cursor: pointer;
          span {
            font-size: 14px;
            padding: 0 5px;
            color: #fff;
            font-weight: 100;
          }
        }
        .categoryActive {
          background-color: #fff;
          span {
            color: #000;
          }
        }
        a {
          &:last-child > button {
            width: 80px;
          }
        }
      }
    }
    .hotSearch {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // background-color: #fff;
      margin-top: 32px;
      gap: 32px;
      .hotSearchLeftBox {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: 1172px;
        .hotSearchLeft {
          h1 {
            color: #fff;
            font-size: 24px;
            font-weight: 400;
          }
          .box {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            width: 395px;
            height: 234px;
            background-color: rgb(24, 24, 24);
            margin-top: 20px;
            padding: 0 20px;
            gap: 16px;
            transition: 0.2s all;
            img {
              width: 90px;
              height: 90px;
              border-radius: 50%;
              object-fit: contain;
            }
            .artistInfo {
              width: 100%;
              position: relative;
              display: flex;
              flex-direction: column;
              gap: 16px;
              h2 {
                font-size: 30px;
                color: #fff;
              }
              span {
                width: 50px;
                height: 30px;
                background-color: rgb(19, 19, 19);
                text-align: center;
                border-radius: 20px;
                transition: 0.2s all;
                p {
                  font-size: 14px;
                  font-weight: 400;
                  color: #fff;
                  line-height: 30px;
                }
              }
              .fa-circle-play {
                position: absolute;
                bottom: -10px;
                right: 0;
                font-size: 50px;
                color: rgb(255, 255, 255);
                opacity: 0;
                transition: 0.3s all;
              }
              .fa-circle-play:hover {
                color: rgb(130, 238, 113);
              }
            }
          }
          .box:hover {
            background-color: rgb(40, 40, 40);
            transition: 0.3s all;
            cursor: pointer;
          }
          .box:hover .artistInfo span {
            background-color: rgb(32, 32, 32);
            transition: 0.3s all;
            cursor: pointer;
          }
          .box:hover .fa-circle-play {
            bottom: 0;
            // color: #fff;
            opacity: 1;
            transition: 0.3s all;
          }
        }
      }
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
    }
  }
}
</style>