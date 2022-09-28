<template>
  <div class="container">
    <div class="lyricBox">
      <div class="lyricContainer">
        <div class="songName">
          <h2>你还有我怎样</h2>
        </div>
        <div class="lrc" ref="lrc"></div>
      </div>
    </div>
  </div>
</template>

<script>
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
      audio: "null",
      //歌词
      // lyric:
      //   "[00:00.000] 作词 : 唐思淼\n[00:01.000] 作曲 : 关天天\n[00:02.000] 编曲 : 关天天\n[00:03.000] 制作人 : 关天天/姚政\n[00:17.433]什么是完整的睡眠\n[00:24.684]清醒的黑夜 在撕碎 梦一片片\n[00:31.933]睁开眼犹豫的指尖\n[00:37.682]该不该挽留 让你陪在身边\n[00:45.942]来时路的终点 是和你遇见\n[00:53.187]唯有你让那誓言 漫过时间\n[01:01.445]痛到失去了语言\n[01:04.939]我 心里却非苦似甜\n[01:08.440]依旧是倔强的少年\n[01:14.433]我要张开我怀抱 变成你城堡\n[01:21.696]只有你是我的 解药\n[01:29.187]让我为你画一幅画  用我全部生命做沙\n[01:32.683]倾注所有情绪也罢  画出属于我们的家\n[01:36.381]那些幽暗过去在下着雨\n[01:38.389]想念你的情绪害怕失去\n[01:40.133]乘着光和勇气再踏着雨\n[01:42.135]用尽所有生命在画着你\n[01:43.892]我 心如四海 放眼望去 那些高楼全部坍塌\n[01:47.136]你也 从不后悔 哪怕剩下背影 也要在我身旁安家\n[01:50.630]唯一解药被你得到\n[01:52.632]永远等候你的怀抱\n[01:54.380]做你生命中的依靠\n[01:56.562]漫漫人生路上最需要\n[01:58.571]来时路的终点 是和你遇见\n[02:05.812]我们和从前挥别 就在今天\n[02:14.030]当你握住我的手\n[02:17.521]我拥有一整个宇宙\n[02:21.267]而你是星光照亮我\n[02:27.522]我要张开我怀抱 变成你城堡\n[02:34.763]只有你是我的 解药\n[02:54.524]当你握住我的手\n[02:57.771]我拥有一整个宇宙\n[03:01.267]而你是星光照亮我\n[03:08.012]我要张开我怀抱 变成你城堡\n[03:14.766]只有你是我的 解药\n[03:43.853]本歌曲来自 网易 “归乐计划”\n[03:44.388] 吉他 : 关天天\n[03:44.923] 贝斯 : 关天天\n[03:45.458] 吉他Solo : 劳国贤\n[03:45.993] RAP编写 : Yeger\n[03:46.528] 混音 : 刘城函\n[03:47.063] 母带 : Ted Jensen\n[03:47.598] 弦乐 : 国际首席爱乐乐团\n[03:48.133] 伴唱 : 队长/俞建明\n[03:48.668] 和声编写 : 队长\n[03:49.203] 原著作者：巫哲\n[03:49.738] \n[03:50.273] 合作平台：晋江文学城\n[03:50.808] \n[03:51.343] 本歌曲为晋江文学城作品《解药》官方主题曲\n",
      // lyric:
      //   "[00:00.000] 作词 : 陶小陶\n[00:01.000] 作曲 : 宿羽阳\n[00:02.791]制作人 Producer：宿羽阳\n[00:04.330]录音师 Recording  Engineer：刘昊霖 吴佳敏 陈彬彬\n[00:05.550]混音师 Mixing Engineer：刘三斤\n[00:06.806]母带后期混音师 Mastering Engineer：刘三斤\n[00:08.109]木吉他 Acoustic Guitar：张琪琳\n[00:09.347]电吉他 Electric guitar：田鹏\n[00:10.397]贝斯 Bass：张继思\n[00:11.499]鼓 Drum：强子\n[00:12.771]钢琴 Piano：池哲浩\n[00:13.957]和声Harmony：金天\n[00:14.889]摄影 Photography：十三\n[00:15.956]平面设计 Art cover：梦瑶\n[00:19.414]录音室 Recording room：好乐无荒 摩登天空\n[00:21.414]特别鸣谢 Special thanks：刘昊霖  谭侃侃\n[00:24.414]\n[00:31.975]你大概是个盲人\n[00:35.043]看不到我嬉笑里的诚恳\n[00:39.415]都怪我孤陋寡闻\n[00:42.823]错把你的礼貌当作认真\n[00:46.890]我想我是个哑巴\n[00:50.637]说不出万分之一句谎话\n[00:54.453]不怪你隔着时差\n[00:58.202]只把我当做你的路人甲\n[01:01.975]\n[01:02.284]像若无其事\n[01:05.400]又像孤注一掷\n[01:09.738]要怎么启齿\n[01:12.975]这深藏的心事\n[01:16.687]\n[01:17.773]常年寄居在我日记的是你\n[01:21.416]擦肩时余光都不给的是你\n[01:25.079]暗恋是一个人的事情\n[01:28.677]除你之外都知道这个秘密\n[01:32.316]\n[01:33.026]你明明是从未拥有过的梦境\n[01:36.875]可我像无数次失去过你\n[01:40.908]就连愿望也不值一提\n[01:44.179]落在我身影\n[01:48.213]\n[02:20.256]你可能听不见声\n[02:23.614]听不到我玩笑里的虔诚\n[02:27.563]都怪我固执愚蠢\n[02:31.086]不肯承认你在心里的痕\n[02:35.104]我想我是个傻瓜\n[02:38.765]说不出万分之一句谎话\n[02:43.154]不怪你隔着时差\n[02:46.544]只把我当做你的路人甲\n[02:50.341]\n[02:50.697]像反复尝试\n[02:53.748]又像偶尔偏执\n[02:58.341]要怎么解释\n[03:01.442]这卑微的样子\n[03:04.920]\n[03:05.966]常年寄居在我日记的是你\n[03:09.966]擦肩时余光都不给的是你\n[03:13.983]暗恋是一个人的事情\n[03:16.955]除你之外都知道这个秘密\n[03:21.070]\n[03:21.492]你明明是从未拥有过的梦境\n[03:25.322]可我像无数次失去过你\n[03:29.254]就连愿望也不值一提\n[03:32.355]譬如你目光偶尔落在我身影\n[03:36.749]\n[03:37.238]我哪有勇气一直追逐背影\n[03:40.732]仿佛冬天饮冰又心生顽疾\n[03:44.632]我只是这样说服我自己\n[03:48.034]比爱情陪伴更长的是友情\n[03:52.238]\n[03:52.429]羡慕与你同行的每个身影\n[03:56.187]我和你始终隔着安全距离\n[04:01.625]\n[04:08.208]比起朋友这样的关系\n[04:14.594]宁愿从未认识过你\n",
      lyric:
        "[00:00.000] 作词 : 薛之谦\n[00:01.000] 作曲 : 薛之谦\n[00:24.150]你停在了这条我们熟悉的街\n[00:34.080]把你准备好的台词全念一遍\n[00:41.920]我还在逞强 说着谎\n[00:46.270]也没能力遮挡 你去的方向\n[00:51.730]至少分开的时候我落落大方\n[00:59.630]\n[01:03.618]我后来都会选择绕过那条街\n[01:12.819]又多希望在另一条街能遇见\n[01:21.399]思念在逞强 不肯忘\n[01:26.090]怪我没能力跟随 你去的方向\n[01:31.899]若越爱越被动 越要落落大方\n[01:39.550]\n[01:41.550]你还要我怎样 要怎样\n[01:46.200]你突然来的短信就够我悲伤\n[01:51.200]我没能力遗忘 你不用提醒我\n[01:56.550]哪怕结局就这样\n[02:01.140]我还能怎样 能怎样\n[02:06.099]最后还不是落得情人的立场\n[02:11.050]你从来不会想 我何必这样\n[02:19.498]\n[02:43.538]我慢慢的回到自己的生活圈\n[02:51.788]也开始可以接触新的人选\n[03:01.248]爱你到最后 不痛不痒\n[03:06.598]留言在计较 谁爱过一场\n[03:11.248]我剩下一张 没后悔的模样\n[03:19.248]\n[03:20.848]你还要我怎样 要怎样\n[03:26.098]你千万不要在我婚礼的现场\n[03:31.098]我听完你爱的歌 就上了车\n[03:36.998]爱过你很值得\n[03:41.199]我不要你怎样 没怎样\n[03:46.098]我陪你走的路你不能忘\n[03:51.399]因为那是我 最快乐的时光\n[04:01.649]\n[04:03.699]后来我的生活还算理想\n[04:13.949]没为你落到孤单的下场\n[04:22.028]有一天晚上 梦一场\n[04:26.458]你白发苍苍 说带我流浪\n[04:32.309]我还是没犹豫 就随你去天堂\n[04:41.999]不管能怎样 我能陪你到天亮\n[04:55.069]\n",
    };
  },
  mounted() {
    // console.log(this.lrcs);
    this.tub();
    this.lrcScroll();
  },

  computed: {
    //拆分歌词
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
          lis.innerHTML = item;
          this.$refs.lrc.append(lis);
        });
      }
    },
    //歌词滚动
    lrcScroll() {
      let p_list = document.querySelectorAll("p");
      this.$refs.lrc.scrollTop = 0;
      // this.$refs.lrc.style.transition = "0.5s all";

      //全局事件总线获取audio控件
      this.$bus.$on("audioRef", (audio) => {
        console.log("已加载");
        this.audio = audio;
        //这里因为普通函数和箭头函数导致的this指向问题困扰了我一下午
        audio.ontimeupdate = () => {
          let time = Math.round(this.audio.currentTime);
          for (let i in this.t) {
            if (parseInt(this.t[i]) == time) {
              // let a = Math.round(this.scrollToViewCenter(p_list[i]));
              p_list.forEach((item) => {
                item.style.transition = "0.5s all";
                item.style.textAlign = "center";
                item.style.color = "";
              });
              p_list[i].style.color = "rgb(7, 161, 110)";
              p_list[i].style.fontSize = "24px";
              if (i > 3) {
                console.log(Math.round(this.scrollToViewCenter(p_list[i])));
                this.$refs.lrc.scrollTo({
                  top: (i - 3) * 65,
                  behavior: "smooth",
                });
                // this.$refs.lrc.scrollTo({
                //   top: a,
                //   behavior: "smooth",
                // });
              }
            }
          }
        };
      });
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
    width: 400px;
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