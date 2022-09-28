<template>
  <div class="container">
    <div class="orderListBox" v-show="true">
      <div class="top">
        <div class="createOrder">
          <i class="fa-solid fa-plus"></i>
          <p>新建歌单</p>
        </div>
      </div>
      <div class="down">
        <div class="header">
          <div class="HorderName">
            <p>歌单</p>
          </div>
          <div class="HsongsAmount">
            <p>歌曲数</p>
          </div>
          <div class="HlisteningTimes">
            <p>播放量</p>
          </div>
        </div>
        <div class="body">
          <div
            class="item"
            v-for="(i, index) in 20"
            :key="index"
            @click="isSelect(index)"
          >
            <div class="BorderName">
              <div class="orderInfo">
                <img src="../../assets/musicinfo/刚刚好.jpg" alt="" />
                <p>歌单111111111111</p>
              </div>
              <div class="playBox" ref="playBox">
                <div class="playOrder">
                  <i class="fa-regular fa-circle-play"></i>
                </div>
                <!-- 请期待 -->
                <div class="playOrder"></div>
                <!-- 请期待 -->
                <div class="playOrder"></div>
              </div>
            </div>
            <div class="BsongsAmount">22首</div>
            <div class="BlisteningTimes">
              <p>101</p>
              <i class="fa-solid fa-trash" ref="trash"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="orderSongBox" v-show="false"></div>
  </div>
</template>

<script>
export default {
  name: "MyOrder",
  data() {
    return {};
  },
  methods: {
    isSelect(index) {
      this.$refs.playBox.forEach((item) => {
        item.style.display = "";
      });
      this.$refs.trash.forEach((item) => {
        item.style.display = "";
      });
      this.$refs.playBox[index].style.display = "block";
      this.$refs.trash[index].style.display = "block";
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 150px);
  // background-color: antiquewhite;
  .orderListBox {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 80%;
    height: 100%;
    // background-color: aqua;
    .top {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      min-height: 100px;
      background-color: rgb(153, 155, 154);
      .createOrder {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        width: 150px;
        height: 50px;
        color: white;
        background-color: rgb(32, 29, 25);
        cursor: pointer;
      }
    }
    .down {
      width: 100%;
      height: calc(100% - 114px);
      //   background-color: chartreuse;
      .header {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 50px;
        // background-color: chocolate;
        .HorderName {
          flex: 1;
          height: 100%;
          text-align: center;
          line-height: 50px;
          color: rgb(153, 155, 153);
          // background-color: antiquewhite;
        }
        .HsongsAmount {
          flex: 1;
          height: 100%;
          text-align: center;
          line-height: 50px;
          color: rgb(153, 155, 153);

          // background-color: bisque;
        }
        .HlisteningTimes {
          flex: 1;
          height: 100%;
          text-align: center;
          line-height: 50px;
          color: rgb(153, 155, 153);

          // background-color: blanchedalmond;
        }
      }
      .body {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 5px;
        width: 100%;
        height: calc(100% - 50px);
        // background-color: cornflowerblue;
        overflow: auto;
        .item {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          min-height: 70px;
          // background-color: chartreuse;
          .BorderName {
            flex: 2.7;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 15px;
            height: 100%;
            // background-color: blue;
            .orderInfo {
              flex: 1;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              gap: 15px;
              img {
                width: 60px;
                height: 60px;
                object-fit: cover;
              }
              p {
                width: 150px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 18px;
                color: white;
              }
            }
            .playBox {
              flex: 2;
              display: flex;
              display: none;
              justify-content: space-evenly;
              align-items: center;
              height: 100%;
              // background-color: gold;
              .playOrder {
                width: 70px;
                text-align: center;
                line-height: 70px;
                font-size: 40px;
                // background-color: gainsboro;
                color: white;
                cursor: pointer;
              }
            }
          }
          .BsongsAmount {
            flex: 1.8;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 100%;
            color:white
            // background-color: blueviolet;
          }
          .BlisteningTimes {
            flex: 1;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 100px;
            height: 100%;
            color:white;
            // background-color: brown;
            P {
              margin-left: 15px;
            }
            .fa-trash {
              display: none;
              font-size: 20px;
              color: white;
              cursor: pointer;
            }
          }
        }
        .item:hover .BorderName .playBox {
          display: block;
        }
        .item:hover .BlisteningTimes .fa-trash {
          display: block;
        }
        .palyActive {
          display: block;
        }
      }
      .body::-webkit-scrollbar {
  // display: none;
  background-color: rgb(255, 255, 255);
    border-radius: 5px;
  width: 10px;
}
.body::-webkit-scrollbar-thumb {
  background-color: rgb(0, 88, 34);
  border-radius: 5px;
  width: 10px;
}
    }
  }
  .orderSongBox{
        display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 80%;
    height: 100%;
    background-color: aqua;
  }
}
</style>