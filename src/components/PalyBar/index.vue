
<template>
  <div class="container">
    <!-- 音频控件 -->
    <audio :src="songUrl.url" ref="audio">
      <!-- <source src="songUrl.url" ref="source" /> -->
    </audio>
    <div class="music-player">
      <div class="song-bar">
        <!-- 图片 -->
        <div class="img-container">
          <img :src="songImg" alt="" v-if="songImg" />
          <img src="../../assets/logo.png" alt="" v-if="!songImg" />
        </div>
        <!-- 歌曲信息 -->
        <div class="song-description">
          <p class="title" v-if="songImg">{{ songName }}</p>
          <p class="title" v-if="!songImg">歌名</p>
          <p class="arties" v-if="songImg">{{ songSinger }}</p>
          <p class="arties" v-if="!songImg">歌手</p>
        </div>
      </div>
      <div class="icons">
        <!-- 喜欢 -->
        <i class="fa-solid fa-heart" @click="likeThisSong" v-if="songImg"></i>
        <!-- 全屏 -->
        <i
          class="fa-solid fa-compress"
          @click="fullScreen"
          ref="fullScreen"
          v-if="songImg"
        ></i>
      </div>
      <div class="controller">
        <div class="top">
          <!-- 随机播放 -->
          <i
            class="fa-solid fa-shuffle"
            @click="randomPlay"
            ref="randomPlay"
          ></i>
          <!-- 上一首 -->
          <i class="fa-solid fa-backward-step" @click="backward"></i>
          <!-- 播放 -->
          <i
            class="fa-solid fa-circle-play"
            v-show="flag"
            @click.prevent="play"
          ></i>
          <!-- 暂停 -->
          <i class="fa-solid fa-circle-pause" v-show="!flag" @click="play"></i>
          <!-- 下一首 -->
          <i class="fa-solid fa-forward-step" @click="forward"></i>
          <!-- 单曲循环 -->
          <i
            class="fa-solid fa-repeat"
            @click="isRepeatPlay"
            ref="repeatPlay"
          ></i>
        </div>
        <div class="down">
          <!-- 当前时间 -->
          <p ref="startTime">00:00</p>
          <div class="progressbar" ref="progressbar">
            <!-- 进度条 -->
            <div class="progress" ref="progress"></div>
            <!-- 触控点 -->
            <div class="thunk" ref="thunk"></div>
          </div>
          <!-- 总时长 -->
          <p ref="totalTime">00:00</p>
        </div>
      </div>
      <div class="other">
        <!-- 歌曲列表 -->
        <i class="fa-solid fa-list-ul" @click="isShowSongList">
          <div
            class="songListContainer"
            ref="songListContainer"
            @click="songListflag = true"
          >
            <div class="songListHeaderBox">
              <div class="songListHeader">
                <div class="songListHeaderLeft">
                  <p>播放列表({{ songsURL.length }})</p>
                </div>
                <div class="songListHeaderRight">
                  <p>清除</p>
                  <i class="fa-solid fa-trash-can"></i>
                </div>
              </div>
            </div>
            <div class="songListBBox">
              <div class="songListBox">
                <div
                  class="songBox"
                  v-for="(song, index) in songsURL"
                  :key="song.id"
                  :class="{ songBoxActive: isActive == index }"
                  @click="isSelect(index)"
                >
                  <div class="songLeft">
                    <h4>{{ song.name }}</h4>
                  </div>
                  <div class="songMid">
                    <p>{{ song.ar[0].name }}</p>
                  </div>
                  <div class="songRight">
                    <div class="like">
                      <i class="fa-solid fa-heart"></i>
                    </div>
                    <div class="delete">
                      <i class="fa-solid fa-trash-can"></i>
                    </div>
                    <div class="songTime">
                      <p ref="songTime"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </i>
        <!-- 打开应用 -->
        <i class="fa-solid fa-computer"> </i>
        <!-- 音量 -->
        <div class="volume">
          <i class="fa-solid fa-volume-low" v-show="isMuted" @click="Muted"></i>
          <!-- 静音 -->
          <i
            class="fa-solid fa-volume-xmark"
            v-show="!isMuted"
            @click="Muted"
          ></i>
        </div>
        <div class="volumeprogressbar" ref="volumeprogressbar">
          <!-- 音量进度条 -->
          <div class="volumeprogress" ref="volumeprogress"></div>
          <div class="volumeThunk" ref="volumeThunk"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SongList from "@/components/PalyBar/SongList";
import { mapState } from "vuex";
export default {
  name: "PalyBar",
  components: { SongList },
  data() {
    return {
      flag: true,
      // songsURL: [
      //   require("../../assets/music/队长 - 予你.mp3"),
      //   require("../../assets/music/宿羽阳 - 暗恋是一个人的事.mp3"),
      //   require("../../assets/music/林俊杰 - Always Online.mp3"),
      //   require("../../assets/music/薛之谦 - 你还要我怎样.mp3"),
      // ],
      // 歌曲仓库
      songsURL: [],
      //当前播放个去序列号
      n: 0,
      //歌曲数量
      songLenght: 2,
      //进度条动画计时器
      timer: null,
      //当前时间计时器
      curTimer: null,
      //总分钟数
      allMinute: 0,
      //总秒数
      allSecond: 0,
      //整体时间
      allTime: 0,
      //滚动条DOM元素
      progressbar: null,
      //时间轴触控点
      thunk: null,
      //是否静音
      isMuted: true,
      //音量缓存
      voluneTemp: "",
      //歌曲列表里样式
      isActive: null,
      //是否隐藏歌曲列表
      songListflag: true,
      //是否单曲循环
      isLoop: false,
      //是否随机播放
      isRandomPlay: false,
      //是否全屏
      isFullScreen: false,
      //歌曲url封面标题歌手
      url: "",
      songImg: "",
      songName: "",
      songSinger: "",
    };
  },
  mounted() {
    //调用进度条方法
    this.playProgressHander();
    // 调用音量进度条
    this.volumeProgressHander();
    //传歌曲数量
    this.$bus.$emit("n", this.n);
    //收播放url和歌曲序列并且播放
    this.$bus.$on("url", (data, song, id) => {
      console.log("播放器", data.url, song, id);
      //设置播放器url
      this.$refs.audio.src = data.url;
      this.url = data.url;
      //获取歌曲信息
      this.songImg = song.al.picUrl;
      this.songName = song.name;
      this.songSinger = song.ar[0].name;
      //把当前歌曲添加到歌曲仓库
      this.songsURL.unshift(song);

      //显示歌曲总时长
    });
  },
  computed: {
    ...mapState("playlistinfo", ["songUrl"]),
    ...mapState("playlistinfo", ["songs"]),
  },
  methods: {
    //播放器进度条
    playProgressHander() {
      this.progressbar = this.$refs.progressbar;
      this.thunk = this.$refs.thunk;
      this.progress = this.$refs.progress;
      // if(this.$refs.totalTime.innerHTML == '00:00') return
      // 点击进度条
      this.progressbar.onmouseup = (e) => {
        let curX = e.clientX - this.progressbar.offsetLeft;
        console.log("当前坐标", curX);
        if (curX < 0) {
          this.thunk.style.left = 0 + "px";
        } else if (curX > 487) {
          this.thunk.style.left = 487 + "px";
        }
        // 设置进度条
        this.thunk.style.left = curX + "px";
        this.progress.style.width = curX + "px";
        //设置歌曲
        this.percent(e);
      };
      //点击触控点
      this.thunk.onmousedown = (e) => {
        document.onmousemove = (e) => {
          let curX = e.clientX - this.progressbar.offsetLeft;
          console.log("拖拽中");
          this.thunk.style.display = "block";
          console.log(curX);
          if (curX < 0) {
            this.thunk.style.left = 0 + "px";
            document.onmousemove = document.onmousedown = null;
          } else if (curX > 487) {
            this.thunk.style.left = 487 + "px";
            document.onmousemove = document.onmousedown = null;
          }
          // 设置进度条
          this.thunk.style.left = curX + "px";
          this.progress.style.width = curX + "px";
          //设置歌曲时间
          this.percent(e);
        };
        this.thunk.onmouseup = (e) => {
          this.thunk.style.display = "";
          document.onmousemove = document.onmousedown = null;
          //设置歌曲时
          this.percent(e);
        };
      };
    },
    //音量进度条
    volumeProgressHander() {
      this.volumeprogressbar = this.$refs.volumeprogressbar;
      this.volumeThunk = this.$refs.volumeThunk;
      this.volumeprogress = this.$refs.volumeprogress;
      this.volumeprogressbar.onmouseup = (e) => {
        let curX = e.clientX - this.volumeprogressbar.offsetLeft;
        if (curX < 0) {
          this.volumeThunk.style.left = 0;
        } else if (curX > 100) {
          this.volumeThunk.style.left = 100 + "px";
        }
        this.volumeThunk.style.left = curX + "px";
        this.volumeprogress.style.width = curX + "px";
        //设置音量
        this.$refs.audio.volume = curX / 100;

        // 音量触控点击
        this.volumeThunk.onmousedown = () => {
          document.onmousemove = (e) => {
            let curX = e.clientX - this.volumeprogressbar.offsetLeft;
            this.volumeThunk.style.display = "block";
            //判断是否静音
            if (curX <= 0) {
              this.isMuted = false;
            } else if (curX > 0) {
              this.isMuted = true;
            }
            //限制活动范围
            if (curX <= 0) {
              this.volumeThunk.style.left = 0 + "px";
              this.$refs.audio.volume = 0;
              document.onmousemove = document.onmousedown = null;
            } else if (curX > 90) {
              this.volumeThunk.style.left = 90 + "px";
              this.$refs.audio.volume = 1;
              document.onmousemove = document.onmousedown = null;
            }
            // 设置进度条
            this.volumeThunk.style.left = curX + "px";
            this.volumeprogress.style.width = curX + "px";
            //设置音量
            this.$refs.audio.volume = curX / 100;
          };
          document.onmouseup = (e) => {
            this.volumeThunk.style.display = "";
            document.onmousemove = document.onmousedown = null;
          };
          //设置音量
          this.$refs.audio.volume = curX / 100;
        };
      };
    },
    // 初始化音频
    initAudio() {
      this.$refs.audio.load();
    },
    //设置时间
    setTime(audioTime, obj) {
      this.allMinute = Math.floor(audioTime / 60);
      if (this.allMinute < 10) {
        this.allMinute = "0" + this.allMinute;
      }
      this.allSecond = Math.floor(audioTime % 60);
      if (this.allSecond < 10) {
        this.allSecond = "0" + this.allSecond;
      }
      this.allTime = this.allMinute + ":" + this.allSecond;
      obj.innerHTML = this.allTime;
    },
    // 播放时间内部函数
    timeHander() {
      this.curTimer = setInterval(() => {
        //总时间
        this.setTime(this.$refs.audio.duration, this.$refs.totalTime);
        this.setTime(this.$refs.audio.currentTime, this.$refs.startTime);
      }, 1000);
    },
    //播放时间
    playTime() {
      //当前时间
      if (this.flag) {
        this.timeHander();
      } else {
        clearInterval(this.curTimer);
        this.curTimer = null;
      }
    },
    // 播放、暂停
    play() {
      if (this.flag) {
        //设置显示时间
        this.playTime();
        this.isActive = this.n;
        this.$refs.audio.play();
        //调用进度条
        this.playProgress();
      } else {
        this.$refs.audio.pause();
      }
      this.flag = !this.flag;
    },
    //单曲循环
    isRepeatPlay() {
      if (!this.isLoop) {
        //开启单曲循环
        this.$refs.repeatPlay.style.color = "red";
        this.$refs.audio.loop = true;
        //--------------------清除随机播放
        this.$refs.randomPlay.style.color = "";
        this.isRandomPlay = false;
        //--------------------
        this.isLoop = true;
      } else {
        // 关闭单曲循环
        this.$refs.repeatPlay.style.color = "";
        this.$refs.audio.loop = false;
        this.isLoop = false;
      }
    },
    //随机数生成
    randomNum(length) {
      //生成随机数
      let r = Math.round(Math.random() * length);
      //检测生成的随机数是否和已有的序列号重复
      if (this.n == r) {
        //从当前序列号+1起取到歌曲数之间的数 例如 1 == 1 则取 (1,lenght]，有效避免重复播放
        console.log("重复了");
        r = Math.round(Math.random() * (length - 1 - r) + r + 1);
      }
      //进行赋值播放
      this.n = r;
      this.isActive = r;
      this.initAudio();
      this.flag = true;
      console.log(r);
    },
    //随机播放
    randomPlay() {
      if (!this.isRandomPlay) {
        this.$refs.randomPlay.style.color = "red";
        //---------------------清除单曲循环
        this.$refs.repeatPlay.style.color = "";
        this.isLoop = false;
        this.$refs.audio.loop = false;
        //---------------------
        this.isRandomPlay = true;
      } else {
        this.$refs.randomPlay.style.color = "";
        this.isRandomPlay = false;
      }
    },
    //进度条内部
    progressHander() {
      this.timer = setInterval(() => {
        // 当前歌曲播放完毕顺序切歌
        if (this.$refs.audio.currentTime == this.$refs.audio.duration) {
          this.$refs.progress.style.width =
            this.$refs.progressbar.offsetWidth + "px";
          clearInterval(this.timer);
          this.timer = null;
          //切换歌曲播放按钮图标
          this.flag = true;
          // 切歌   判断是否开启随机播放
          if (!this.isRandomPlay) {
            //也没开单曲循环
            if (!this.isLoop) {
              //停止播放
              this.$refs.audio.pause();
              //开了随机
            } else if (this.isRandomPlay) {
              //随机播放
              this.randomNum(this.songLenght);
              // 开了单曲循环
            } else if (this.isLoop) {
              this.isRepeatPlay();
            }
          }
        } else {
          // 进度条走动
          this.$refs.progress.style.width =
            (this.$refs.audio.currentTime / this.$refs.audio.duration) *
              this.$refs.progressbar.offsetWidth +
            "px";
          this.$refs.thunk.style.left = this.$refs.progress.style.width;
        }
      }, 30);
    },
    // 进度条
    playProgress() {
      //开启计时器
      if (this.flag) {
        this.progressHander();
      } else {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    // 上一首
    backward() {
      if (this.n > 0) {
        this.n = this.n - 1;
        this.isActive = this.n;
        this.initAudio();
        this.flag = true;
      } else {
        this.n = this.songsURL.length - 1;
        this.isActive = this.n;
        this.initAudio();
        this.flag = true;
      }
    },
    // 下一首
    forward() {
      if (this.n < this.songsURL.length - 1) {
        this.n = this.n + 1;
        this.isActive = this.n;
        this.initAudio();
        this.flag = true;
      } else {
        this.n = 0;
        this.isActive = this.n;
        this.initAudio();
        this.flag = true;
      }
    },
    //计算百分比and跳转
    percent(e) {
      let curX = e.clientX - this.progressbar.offsetLeft;
      this.$refs.audio.currentTime =
        (curX *
          Math.floor(
            (this.$refs.audio.duration / this.$refs.progressbar.offsetWidth) *
              100
          )) /
        100;
    },
    //静音
    Muted() {
      this.$refs.audio.muted = this.isMuted;
      this.isMuted = !this.isMuted;
      console.log(this.$refs.volumeprogress.style.width);
      if (!this.isMuted) {
        this.voluneTemp = this.$refs.volumeprogress.style.width;
        this.$refs.volumeThunk.style.left = 0;
        this.$refs.volumeprogress.style.width = 0;
      } else {
        this.$refs.volumeThunk.style.left = this.voluneTemp;
        this.$refs.volumeprogress.style.width = this.voluneTemp;
        //调节音量
        this.$refs.audio.volume = parseInt(this.voluneTemp) / 100;
      }
    },
    // 歌曲列表排他选择
    isSelect(index) {
      this.isActive = index;
    },
    // 歌曲列表显示隐藏
    isShowSongList() {
      // 隐藏
      if (!this.songListflag) {
        this.$refs.songListContainer.style.display = "none";
        this.songListflag = true;
      } else {
        // 显示
        this.$refs.songListContainer.style.display = "block";
        this.songListflag = false;
      }
    },
    //喜欢当前播放的歌曲
    likeThisSong() {
      console.log(this.n);
    },
    //全屏
    fullScreen() {
      if (!this.isFullScreen) {
        this.isFullScreen = true;
        this.$refs.fullScreen.style.color = "red";
        this.$bus.$emit("audioRef", this.$refs.audio);
        this.$bus.$emit("isShowLyric", this.isFullScreen);
      } else {
        this.isFullScreen = false;
        this.$refs.fullScreen.style.color = "";
        this.$bus.$emit("isShowLyric", this.isFullScreen);
      }
    },
  },
  watch: {
    //检测歌曲序列变化播放
    n: {
      handler(n, o) {
        this.play();
      },
    },
    // songUrl(value) {
    //   this.$refs.source.src = this.songUrl.url;
    //   console.log(this.$refs.source.src);
    // },

    //检测url改变(未完成)
    url(value) {
      //让播放按钮始终在播放状态
      this.flag = false;
      //设置显示时间
      this.timeHander();
      //延迟1s播放
      setTimeout(() => {
        this.$refs.audio.play();
        this.isActive = this.n;
        //调用进度条
        this.progressHander();
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 100px;
  background-color: #000;
  z-index: 1;
  text-align: center;
  line-height: 100px;
  color: #fff;
  .music-player {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 250px;
    width: 1250px;
    .song-bar {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
      width: 270px;
      gap: 18px;
      // background-color: rgb(135, 135, 135);
      .img-container {
        --size: 4.5em;
        width: var(--size);
        height: var(--size);
        flex-shrink: 0;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .song-description {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // background-color: antiquewhite;
        height: 100px;
        width: 170px;
        .title,
        .arties {
          width: 100%;
          line-height: 16px;
          margin: 10px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .title:hover,
        .arties:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
    .icons {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 100px;
      // background-color: #fff;
      gap: 18px;
      color: #fff;
      font-size: 20px;
      .fa-compress {
        .fullScreenContainer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background-color: rgb(244, 100, 100);
          z-index: -3;
        }
      }
    }
    .controller {
      flex-direction: column;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 600px;
      height: 100px;
      gap: 5px;
      // background-color: #fff;
      .top {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 50px;
        gap: 20px;
        // background-color: antiquewhite;
        .fa-circle-play {
          font-size: 40px;
          width: 50px;
          transition: 0.1s all;
        }
        .fa-circle-pause {
          font-size: 40px;
          width: 50px;
          transition: 0.1s all;
        }
        .fa-circle-play:hover {
          font-size: 45px;
          transition: 0.1s all;
        }
        .fa-circle-pause:hover {
          font-size: 45px;
          transition: 0.1s all;
        }
      }

      .fa-solid:hover {
        color: rgb(170, 170, 170);
      }
      .down {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        // background-color: antiquewhite;
        p {
          line-height: 20px;
        }
        .progressbar {
          position: relative;
          width: 500px;
          height: 4px;
          background-color: #fff;
          margin: 0 15px;
          border-radius: 4px;
          .progress {
            position: relative;
            position: absolute;
            left: 0px;
            top: 0;
            width: 0px;
            height: 4px;
            border-radius: 4px;
            background-color: rgb(7, 161, 110);
          }
          .thunk {
            display: none;
            position: absolute;
            left: 0px;
            width: 13px;
            height: 13px;
            border-radius: 50%;
            background-color: rgb(138, 243, 153);
            transform: translate(-25%, calc(3px - 50%));
            //禁止拖拽
            user-select: none;
            -webkit-user-drag: none;
          }
        }
        .progressbar:hover {
          height: 6px;
          cursor: pointer;
        }
        .progressbar:hover .progress {
          height: 6px;
        }
        .progressbar:hover .thunk {
          display: block;
          cursor: pointer;
        }
      }
    }
    .other {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      width: 250px;
      height: 100px;
      .volumeprogressbar {
        position: relative;
        width: 100px;
        height: 4px;
        background-color: #fff;
        border-radius: 4px;
        .volumeprogress {
          position: relative;
          width: 50%;
          height: 4px;
          border-radius: 4px;
          background-color: rgb(7, 161, 110);
        }
        .volumeThunk {
          display: none;
          position: absolute;
          left: 50px;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background-color: rgb(138, 243, 153);
          transform: translate(-25%, calc(-2px - 50%));
          //禁止拖拽
          user-select: none;
          -webkit-user-drag: none;
        }
      }
      .volumeprogressbar:hover {
        height: 6px;
      }
      .volumeprogressbar:hover .volumeprogress {
        height: 6px;
      }
      .volumeprogressbar:hover .volumeThunk {
        display: block;
      }
      .volume {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 20px;
      }
    }
    .fa-solid:hover {
      color: rgb(170, 170, 170);
    }
    .fa-list-ul {
      position: relative;
      .songListContainer {
        position: absolute;
        display: flex;
        display: none;
        justify-content: center;
        align-items: center;
        left: -213px;
        bottom: 58px;
        width: 450px;
        height: 567px;
        background-color: rgb(32, 32, 32);
        border-radius: 6px 6px 0 0;
        .songListHeaderBox {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 50px;
          background-color: rgb(0, 88, 56);
          padding: 0 15px;
          border-radius: 6px 6px 0 0;
          .songListHeader {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 100%;
            background-color: rgb(0, 88, 56);
            .songListHeaderLeft {
              color: #fff;
              font-size: 18px;
              letter-spacing: 3px;
            }
            .songListHeaderRight {
              display: flex;
              justify-content: center;
              align-content: center;
              gap: 10px;
              width: 70px;
              height: 100%;
              color: #fff;
              font-size: 14px;
              font-weight: 500;
              letter-spacing: 2px;
              cursor: pointer;
              p {
                align-self: center;
              }
              i {
                align-self: center;
              }
            }
            .songListHeaderRight:hover {
              color: rgb(170, 170, 170);
              text-decoration: underline;
            }
          }
        }
        .songListBBox {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: calc(100% - 50px);
          padding: 5px;
          .songListBox {
            gap: 5px;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(32, 32, 32);
            .songBox {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              height: 50px;
              margin-bottom: 5px;
              background-color: rgb(19, 19, 19);
              .songLeft {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width: 130px;
                height: 100%;
                padding-left: 10px;
                color: #fff;
                h4 {
                  font-size: 18px;
                  font-weight: 400;
                  cursor: pointer;
                }
              }
              .songMid {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width: 100px;
                height: 100%;
                p {
                  color: #fff;
                  font-weight: 100;
                  cursor: pointer;
                }
                p:hover {
                  text-decoration: underline;
                }
              }
              .songRight {
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                width: 150px;
                height: 100%;
                color: #fff;
                .like {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 25px;
                  height: 25px;
                  // background-color: antiquewhite;
                  .fa-heart {
                    display: none;
                  }
                }
              }
            }
            .songBox:hover {
              background-color: #333;
            }
            .songBox:hover .songRight .like .fa-heart {
              display: block;
            }
            .songBoxActive {
              background-color: rgb(73, 73, 73);
              .songRight .like .fa-heart {
                display: block;
              }
            }
          }
          // 隐藏进度条
          .songListBox::-webkit-scrollbar {
            background-color: rgb(97, 97, 97);
            width: 10px;
            border-radius: 5px;
          }
          .songListBox::-webkit-scrollbar-thumb {
            background-color: rgb(39, 39, 39);
            border-radius: 5px;
          }
        }
      }
    }
  }
}
</style>