<template>
  <div class="container">
    <div class="rightLayoutBox">
      <div class="rightLayout">
        <div class="history">
          <span class="back">
            <i
              class="fa-solid fa-angle-left"
              style="color: #fff; font-size: 20px"
            ></i>
          </span>
          <span class="forward">
            <i
              class="fa-solid fa-angle-right"
              style="color: #fff; font-size: 20px"
            ></i>
          </span>
        </div>
        <div class="srearch" v-show="$route.meta.isShowSearch">
          <div class="inputBox">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="搜索"
              @input="searchDate"
              v-model="keyword"
              ref="clearKeyword"
            />
            <span style="width: 17px; height: 31px">
              <i
                class="fa-solid fa-xmark"
                style="font-size: 26px; line-height: 31px; cursor: pointer"
                v-if="keyword"
                @click.prevent="clearKeyword"
              ></i>
            </span>
          </div>
        </div>
        <div class="Nav">
          <ul class="NavItemR">
            <li>Music</li>
            <li>支持</li>
            <li>下载</li>
          </ul>
          <div class="line"></div>
          <div class="NavItemL">
            <button class="register" @click="register">注册</button>
            <button class="login" @click="showModalBox">登录</button>
          </div>
        </div>
      </div>
    </div>
    <!-- <FullScreen v-show="isShowLyric"></FullScreen> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import FullScreen from "@/components/FullScreen";
export default {
  name: "Header",
  components: {
    // FullScreen,
  },
  data() {
    return {
      keyword: "",
      isShowModalBox: true,
      isShowLyric: false,
    };
  },
  mounted() {
    this.$bus.$on("isShowLyric", (data) => {
      this.isShowLyric = data;
    });
  },
  methods: {
    //封装关键词发送函数
    sendKeyword() {
      this.$bus.$emit("k", this.keyword);
      //将参数传入路由的params中，方便搜索API获取
      this.$router.push(`/search/${this.keyword}`);
    },
    //获取搜索字段传输给搜索组件
    searchDate() {
      this.sendKeyword();
      //搜索接口传query示例,到时候用dispatch传给actives发送请求，请求结果结果mutations处理数据存入states
      // console.log(this.$route.params);
      this.$router.push({ path: "/search", query: this.$route.params });
    },
    clearKeyword() {
      //清除搜索框
      this.keyword = "";
      //重发keyword
      this.sendKeyword();
      //重新获取焦点
      this.$refs.clearKeyword.focus();
    },
    showModalBox() {
      // 全局事件总线
      this.$bus.$emit("isShowModalBox", this.isShowModalBox);
    },
    register() {
      alert("请使用网易云音乐账号或扫码登录");
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  background-color: rgb(16, 16, 16);
  .rightLayoutBox {
    height: 64px;
    .rightLayout {
      display: flex;
      justify-content: space-between;
      align-content: center;
      width: calc(100% - 250px);
      height: 64px;
      background-color: rgb(16, 16, 16);
      flex: 1;
      z-index: 2;
      position: fixed;
      .history {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 150px;
        height: 100%;
        span {
          width: 40px;
          height: 40px;
          background-color: rgb(5, 5, 5);
          line-height: 40px;
          text-align: center;
          border-radius: 20px;
          color: #fff;
          cursor: pointer;
        }
      }
      .srearch {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        .inputBox {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 350px;
          height: 31px;
          background-color: #fff;
          border-radius: 25px;
          gap: 12px;
          input {
            width: 270px;
            height: 29px;
            outline: none;
            font-size: 18px;
            border: 0;
          }
        }
      }
      .Nav {
        display: flex;
        justify-content: center;
        align-items: center;
        // background-color: aqua;
        .NavItemR {
          height: 64px;
          li {
            display: inline-block;
            width: 55px;
            text-align: center;
            margin: 0 12px;
            line-height: 64px;
            cursor: pointer;
            color: #a7a7a7;
            font-weight: bold;
          }
          li:hover {
            color: #fff;
            font-size: 17px;
            transition: 0.3s all;
          }
        }
        .line {
          height: 40px;
          border-left: 2px solid #a7a7a7;
          margin-left: 25px;
        }
        .NavItemL {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 250px;
          button {
            width: 65px;
            height: 40px;
            border: 0;
            background-color: rgba(0, 0, 0, 0);
            font-size: 18px;
            margin-left: 15px;
            cursor: pointer;
          }
          .register {
            color: #a7a7a7;
            font-weight: 500;
          }
          .register:hover {
            color: #fff;
            font-size: 19px;
            transition: 0.2s all;
          }
          .login {
            width: 100px;
            background-color: #fff;
            border-radius: 15px;
            color: #000;
            transition: 0.7s all;
          }
          .login:hover {
            background-color: #000;
            color: #fff;
            transition: 0.2s all;
          }
        }
      }
    }
  }
}
</style>