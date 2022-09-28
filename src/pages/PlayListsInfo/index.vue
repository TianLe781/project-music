<template>
  <div class="container">
    <div class="playListBox">
      <div class="top">
        <div class="left">
          <div class="img">
            <img :src="playlist.coverImgUrl" alt="" />
          </div>
        </div>
        <div class="right">
          <div class="rightBox">
            <!-- 标题 -->
            <div class="title">
              <p>{{ playlist.name }}</p>
            </div>
            <!-- 作者 -->
            <div class="creater">
              <div class="img">
                <img :src="playlist.creator.avatarUrl" alt="" />
              </div>
              <p>{{ playlist.creator.nickname }}</p>
              <div class="playCount">
                <p>播放量：</p>
                <p>{{ playlist.playCount }}</p>
              </div>
              <div class="subscribedCount">
                <p>收藏量：</p>
                <p>{{ playlist.subscribedCount }}</p>
              </div>
              <div class="shareCount">
                <p>分享量：</p>
                <p>{{ playlist.shareCount }}</p>
              </div>
            </div>
            <!-- 标签 -->
            <div class="tags">
              <p>标签：</p>
              <div class="tagsBox">
                <div
                  class="tag"
                  v-for="(t, index) in playlist.tags"
                  :key="index"
                >
                  <p>{{ t }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- 简介 -->
          <div class="description">
            <p>{{ playlist.description }}</p>
          </div>
        </div>
      </div>
      <div class="SongListTitle">
        <h1>歌曲（{{ playlist.trackCount }}）</h1>
      </div>
      <!-- 歌曲区域 -->
      <div class="bottom">
        <!-- 单曲 -->
        <SongList :songs="songs"></SongList>
      </div>
    </div>
  </div>
</template>

<script>
import SongList from "@/components/SongList";
import { mapState } from "vuex";
export default {
  name: "PlayListInfo",
  components: {
    SongList,
  },
  created() {
    //获取歌单详情
    this.$store.dispatch("playlistinfo/songListInfo", this.$route.query.id);
    //获取歌单歌曲
    this.$store.dispatch("playlistinfo/songs", this.$route.query.id);
  },
  mounted() {},
  computed: {
    ...mapState("playlistinfo", ["playlist"]),
    ...mapState("playlistinfo", ["songs"]),
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 164px);
  // height: 1000px;
  //   background-color: antiquewhite;
  .playListBox {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 80%;
    height: 100%;
    // background-color: aquamarine;
    .top {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 490px;
      //   background-color: aqua;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        height: 100%;
        // background-color: rgb(198, 198, 220);
        .img {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 250px;
          height: 250px;
          padding: 2px;
          border: 1px solid rgb(134, 134, 134);
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 2;
        height: 100%;
        // background-color: rgb(0, 187, 255);
        .rightBox {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: flex-start;
          width: 100%;
          height: 60%;
          //   background-color: blueviolet;
          .title {
            width: 100%;
            height: 50px;
            // background-color: burlywood;
            p {
              color: #fff;
              line-height: 50px;
              font-size: 24px;
            }
          }
          .creater {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 16px;
            width: 100%;
            height: 50px;
            // padding-left: 10px;
            // background-color: cadetblue;
            img {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 50px;
              height: 50px;
              background-color: cornsilk;
            }
            p {
              color: #fff;
              font-size: 18px;
            }
            .playCount,
            .subscribedCount,
            .shareCount {
              display: flex;
              justify-content: center;
              align-items: start;
              width: 160px;
              p {
                font-size: 16px;
              }
            }
          }
          .tags {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 16px;
            width: 100%;
            height: 50px;
            // padding-left: 10px;
            // background-color: chartreuse;
            p {
              color: rgb(196, 196, 196);
              font-size: 18px;
            }
            .tagsBox {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 10px;
              height: 50px;
              .tag {
                height: 25px;
                border-radius: 15px;
                background-color: darkcyan;
                p {
                  color: #fff;
                  font-size: 16px;
                  line-height: 25px;
                  padding: 0 5px 0 5px;
                }
              }
            }
          }
        }
        .description {
          width: 100%;
          height: 100px;
          //   background-color: coral;
          overflow: auto;
          p {
            color: rgb(178, 178, 178);
            font-size: 16px;
          }
        }
        .description::-webkit-scrollbar {
          width: 5px;
          background-color: rgb(0, 60, 0);
        }
        .description::-webkit-scrollbar-thumb {
          background-color: darkcyan;
          border-radius: 2px;
        }
      }
    }
    .SongListTitle {
      width: 100%;
      height: 80px;
      // background-color: aliceblue;
      margin-top: 10px;
      h1 {
        color: #fff;
        font-size: 24px;
        font-weight: 400;
      }
    }
    .bottom {
      width: 100%;
      height: 100%;
      // background-color: rgb(43, 43, 43);
      overflow: auto;
    }
    .bottom::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>