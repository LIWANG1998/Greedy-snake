<template>
  <div class="home" :style="grassland_f">
    <span class="start" @click="start">开始{{ snake_f }}</span>
    <!--    <div id="snake">-->
    <template v-for="(v , i) in snakes">
      <template v-if="i===0">
        <div class="snake_body" :key="i" style="border-radius:50%;background-color:brown"
             :style="snakes_style(v)"></div>
      </template>
      <template v-else>
        <div class="snake_body" :key="i" style="border-radius:5px;background-color:#ffa000"
             :style="snakes_style(v)"></div>
      </template>
    </template>
    <!--    </div>-->
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  data() {
    return {
      // 蛇的大小/px
      snake_w: 20,
      // 蛇的速度/秒
      snake_s: 1,
      // 运动方向
      snake_f: 38,
      // 贪吃蛇
      snakes: [
        {
          loc_t: 100, // 距上
          loc_l: 20, // 距左
        },
        {
          loc_t: 120, // 距上
          loc_l: 20, // 距左
        },
        {
          loc_t: 140, // 距上
          loc_l: 20, // 距左
        },
        {
          loc_t: 140, // 距上
          loc_l: 40, // 距左
        },
        {
          loc_t: 140, // 距上
          loc_l: 60, // 距左
        }
      ],
      // 草地大小
      grassland: {
        g_w: 800, // 高度
        g_h: 800, // 宽度
      },
      // 开始/暂停
      start_t: false,
      start_ts: null
    }
  },
  computed: {
    // 处理草地的样式在返回去
    grassland_f() {
      return {width: this.grassland.g_w + 'px', height: this.grassland.g_h + 'px'}
    },
    //
    snakes_style(v) {
      return (v) => {
        return {left: v.loc_l + 'px', top: v.loc_t + 'px'}
      }
    }
  },
  components: {},
  created() {
    this.init();
    // 监听键盘事件
    document.onkeydown = this.keydown;
  },
  methods: {
    // 初始事件
    init() {
      // 开始运动的方向
      let min = 37;
      let max = 40;
      this.snake_f = parseInt(Math.random() * (max - min + 1) + min);
    },
    // 开始动
    start() {
      this.start_ts = setInterval(() => {
        let snake_s = JSON.parse(JSON.stringify(this.snakes[0]));
        console.log(this.snake_f)
        switch (this.snake_f) {
            // 上
          case 38:
            console.log(this.snake_f)
            snake_s.loc_t = snake_s.loc_t - this.snake_w;
            break;
            // 右
          case 39:
            console.log(this.snake_f)
            snake_s.loc_l = snake_s.loc_l + this.snake_w;
            break;
            // 下
          case 40:
            console.log(this.snake_f)
            snake_s.loc_t = snake_s.loc_t + this.snake_w;
            break;
            // 左
          case 37:
            console.log(this.snake_f)
            snake_s.loc_l = snake_s.loc_l - this.snake_w;
            break;
        }
        this.snakes.unshift(snake_s);
        this.snakes.pop();
      }, this.snake_s * 1000)
    },
    keydown(e) {
      e = e || event;
      let currKey = e.keyCode || e.which || e.charCode;
      if ((currKey > 7 && currKey < 14) || (currKey > 31 && currKey < 47)) {
        switch (currKey) {
          case 32:
            // 开始/暂停
            if (this.start_t) {
              clearInterval(this.start_ts);
            } else {
              this.start();
            }
            this.start_t = !this.start_t;
            break;
          case 37:
            this.snake_f = currKey;
            break;
          case 38:
            this.snake_f = currKey;
            break;
          case 39:
            this.snake_f = currKey;
            break;
          case 40:
            this.snake_f = currKey;
            break;
        }
      }
    }
  }
}
;
</script>
<style lang="scss" scoped>
.home {
  background-color: powderblue;
  margin: 40px auto;
  position: relative;

  .start {
    padding: 5px;
  }

  /* 蛇的公共样式 */
  @mixin snake_w($w_h, $h_t,$b_r,$b_c) {
    position: absolute;
    width: $w_h;
    height: $h_t;
    border-radius: $b_r;
    background-color: $b_c;
  }

  #snake_head {
    @include snake_w(20px, 20px, 50%, brown)
  }

  .snake_body {
    @include snake_w(20px, 20px, 5px, #ffa000)
  }
}
</style>


