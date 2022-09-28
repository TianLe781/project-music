<template>
  <div class="leftLayoutBox">
    <div class="leftLayout">
      <div class="logo">
        <img
          src="../../assets/logo.png"
          style="width: 50px; height: 50px"
          alt=""
        />
        <span style="color: #fff">Logo</span>
      </div>
      <div class="top">
        <ul>
          <li>
            <router-link to="/home">
              <i
                class="fa-solid fa-house"
                style="color: #fff; font-size: 20px"
              ></i>
              主页
            </router-link>
          </li>
          <li>
            <router-link to="/search">
              <i
                class="fa-solid fa-magnifying-glass"
                style="color: #fff; font-size: 20px"
              ></i>
              搜索
            </router-link>
          </li>
          <li>
            <router-link to="/musiclib">
              <i
                class="fa-solid fa-boxes-stacked"
                style="color: #fff; font-size: 20px"
              ></i>
              音乐库
            </router-link>
          </li>
        </ul>
      </div>
      <div class="mid">
        <ul>
          <li>
            <router-link to="/myorder">
              <i
                class="fa-solid fa-square-plus"
                style="color: #fff; font-size: 20px"
              ></i>
              我的歌单
            </router-link>
          </li>
          <li>
            <router-link to="/lovemusic">
              <i
                class="fa-solid fa-heart"
                style="color: #fff; font-size: 20px"
              ></i>
              已点赞歌曲
            </router-link>
          </li>
        </ul>
      </div>
      <div class="below">
        <ul>
          <li>
            <i></i>
            <a href="">Coolie 政策</a>
          </li>
          <li>
            <i></i>
            <a href="">隐私</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AsideLeft",
};
</script>

<style lang="less" scoped>
.leftLayoutBox {
  width: 250px;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  // background: #000;
  height: 100%;
  flex-shrink: 0;
  .leftLayout {
    width: 250px;
    // height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #000;
    height: 100%;
    color: #fff;
    flex-shrink: 0;
    position: fixed;
    z-index: 2;
    .logo {
      display: flex;
      align-items: center;
      flex: 0.7;
      gap: 16px;
    }
    .top {
      // display: flex;
      // justify-content: center;
      // align-items: center;
      flex: 1.5;
      width: 100%;
      ul li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 50px;
        padding: 0 20px;
        cursor: pointer;
        a {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          line-height: 50px;
          color: #a7a7a7;
          gap: 16px;
        }
      }
      ul li:hover a {
        color: #fff;
      }
    }
    .mid {
      flex: 2.5;
      color: #fff;
      width: 100%;
      ul li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 50px;
        gap: 16px;
        padding: 0 20px;
        cursor: pointer;
        a {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          line-height: 50px;
          color: #a7a7a7;
          gap: 16px;
        }
      }
      ul li:hover a {
        color: #fff;
      }
    }
    .below {
      flex: 1;
      color: #fff;
      width: 100%;
      ul li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 50px;
        gap: 16px;
        padding: 0 20px;
        cursor: pointer;
        a {
          color: #a7a7a7;
        }
      }
      ul li:hover a {
        color: #fff;
      }
    }
  }
}
</style>