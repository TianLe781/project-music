<template>
  <div class="container">
    <div class="Loginbox">
      <div class="header">
        <span>
          <i class="fa-regular fa-circle-question"></i>
        </span>
        <span>{{ title }}</span>
        <span>
          <i class="fa-solid fa-xmark" @click="closeModalBox"></i>
        </span>
      </div>
      <div class="body" v-show="!isQR">
        <div
          class="QRBox"
          @click="
            isQR = !isQR;
            title = '网易云音乐APP扫码登录';
          "
        ></div>
        <div class="inputContainer">
          <div class="inputBigBox">
            <div class="inputBox">
              <input type="text" required="required" />
              <span>手机号</span>
              <i></i>
            </div>
            <div class="inputBox">
              <input type="password" required="required" />
              <span>密码</span>
              <i></i>
            </div>
          </div>
          <button>登录</button>
        </div>
      </div>
      <div class="QRBody" v-show="isQR">
        <div class="QRContainer">
          <div class="QRimg">
            <img src="../../assets/二维码.jpg" alt="" />
          </div>

          <button
            @click="
              isQR = !isQR;
              title = '账号密码登录';
            "
          >
            返回
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modalbox",
  data() {
    return {
      isQR: false,
      title: "账号密码登录",
    };
  },
  methods: {
    closeModalBox() {
      this.$bus.$emit("iscloseModalBox");
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.5);
  .Loginbox {
    overflow: hidden;
    width: 325px;
    height: 450px;
    background-color: #222;
    border-radius: 7px;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 45px;
      padding: 0 10px;
      background-color: black;
      border-radius: 7px 7px 0 0;
      span {
        color: #fff;
        font-size: 20px;
      }
      .fa-xmark:hover,
      .fa-circle-question:hover {
        cursor: pointer;
        color: #333;
      }
    }
    .body {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: calc(450px - 45px);
      //   background-color: #fff;
      .inputContainer {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 200px;
        gap: 30px;
        // background-color: #333;
        .inputBigBox {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 25px;
          .inputBox {
            position: relative;
            width: 200px;
            input {
              width: 100%;
              background: transparent;
              color: #fff;
              border: 0;
              outline: none;
              box-shadow: none;
              font-size: 1em;
              letter-spacing: 0.1em;
              padding: 10px 0 5px;
            }
            span {
              position: absolute;
              left: 0;
              padding: 10px 0 5px;
              color: rgba(255, 255, 255, 0.5);
              text-transform: uppercase;
              pointer-events: none;
              letter-spacing: 1.5px;
              transition: 0.5s;
            }
            input:valid ~ span,
            input:focus ~ span {
              color: #2196f3;
              font-size: 14px;
              transform: translateY(-18px);
            }
            i {
              position: absolute;
              left: 0;
              bottom: 0;
              width: 100%;
              height: 2px;
              background-color: #fff;
              overflow: hidden;
            }
            i::before {
              content: "";
              position: absolute;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(
                90deg,
                #ff1b69,
                #ff0,
                #2196f3,
                #9c27b0,
                #ff1b69
              );
              animation: animate 2s linear infinite;
              transition: 0.5s;
            }
            input:valid ~ i::before,
            input:focus ~ i::before {
              left: 0;
            }
            @keyframes animate {
              0% {
                background-position-x: 0;
              }
              100% {
                background-position-x: 200px;
              }
            }
          }
        }

        button {
          width: 100px;
          height: 25px;
        }
      }
      .QRBox {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 60px;
        height: 60px;
        object-fit: contain;
        background: url("../../assets/二维码.jpg");
        background-size: contain;
        border-radius: 0 0 7px 0;
        clip-path: polygon(
          100% 0px,
          100% calc(100% - 0px),
          calc(100% - 0px) 100%,
          0px 100%
        );
        box-shadow: inset 15px 15px 30px 1px #333;
        cursor: pointer;
      }
    }
    .QRBody {
      position: relative;
      top: 0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: calc(450px - 45px);
      background-color: #222;
      transition: 0.5s;
      .QRContainer {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 40px;
        width: 100%;
        height: 300px;
        // background-color: #ff0;
        .QRimg {
          width: 200px;
          height: 200px;
          background-color: #333;
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
        button {
          width: 100px;
          height: 25px;
        }
      }
    }
  }
}
</style>