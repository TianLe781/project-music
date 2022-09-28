<template>
  <div>
    <div class="container" v-for="(i, index) in fsTitle" :key="i.id">
      <div class="title">
        <h2>{{ i.title }}</h2>
        <p>
          查看全部
          <i class="fa-solid fa-angles-right" style="font-size: 14px"></i>
        </p>
      </div>
      <div class="songBox">
        <div class="songs">
          <div
            class="song"
            v-for="p in playLists[index]"
            :key="p.id"
            @click="checkList(p.id)"
          >
            <div class="songListImg">
              <!-- 播放图标 -->
              <i class="fa-solid fa-play"></i>
              <!-- 透明遮罩 -->
              <div class="songListMask"></div>
              <!-- 歌单封面 -->
              <img :src="p.coverImgUrl" alt="" />
            </div>
            <div class="songListTitle">
              <!-- 歌单标题 -->
              <p>{{ p.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
</template>

<script>
export default {
  name: "Recommend",
  props: ["fsTitle", "playLists"],
  methods: {
    checkList(id) {
      this.$router.push({ path: "playlistinfo", query: { id } });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  background-color: rgb(13, 13, 13);
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // width: 100px;
    // padding-top: 20px;
    // padding-left: 25px;
    // padding-right: 25px;
    padding: 20px 30px 0 30px;
    color: #fff;
    p {
      color: rgb(179, 179, 179);
      cursor: pointer;
    }
    p:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .songBox {
    margin-top: 10px;
    .songs {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      // flex-wrap: wrap;
      width: 100%;
      //   height: 200px;
      background-color: rgb(13, 13, 13);
      .song {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 180px;
        height: 220px;
        background-color: rgb(45, 45, 45);
        border-radius: 20px;
        .songListImg {
          position: relative;
          width: 130px;
          height: 130px;
          background-color: aliceblue;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .fa-play {
            position: absolute;
            font-size: 50px;
            top: 65%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: rgba(255, 255, 255, 0);
            transition: 0.5s all;
            z-index: 1;
          }
          .songListMask {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0);
            transition: 0.5s all;
          }
        }
        .songListTitle {
          display: flex;
          align-items: center;
          width: 140px;
          height: 60px;
          // background-color: rgb(67, 67, 67);
          border-radius: 10px;
          p {
            letter-spacing: 2px;
            // text-align: center;
            color: white;
            cursor: pointer;
          }
          p:hover {
            text-decoration: underline;
          }
        }
        .songListImg:hover .songListMask {
          transition: 0.3s all;
          background-color: rgba(0, 0, 0, 0.5);
        }
        .songListImg:hover .fa-play {
          top: 50%;
          color: rgba(255, 255, 255, 0.5);
          transition: 0.5s all;
        }
      }
    }
  }
}
</style>