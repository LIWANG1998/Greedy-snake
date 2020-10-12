<template>
  <div class="home" :style="grassland_f">
    <span class="start" @click="start">开始{{ snake_f }}</span>
    <!-- 食物 -->
    <div class="snake_body" :style="snakes_style(food)"></div>
    <!-- 蛇 -->
    <template v-for="(v , i) in snakes">
      <template v-if="i===0">
        <div class="snake_body" :key="i" style="border-radius:50%;background-color:brown;z-index: 1"
             :style="Object.assign(snakes_style(v) , {transition:`all ${snake_s}s linear`})"></div>
      </template>
      <template v-else>
        <div class="snake_body" :key="i" style="border-radius:25%;background-color:#ffa000"
             :style="Object.assign(snakes_style(v) , {transition:`all ${snake_s}s linear`})"></div>
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
      snake_s: 0.2,
      // 运动方向
      snake_f: 38,
      // 贪吃蛇
      snakes: [],
      // 食物
      food: {
        loc_t: 100, // 距上
        loc_l: 20, // 距左
      },
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
    // 处理蛇的位置
    snakes_style(v) {
      return (v) => {
        return {width: this.snake_w + 'px', height: this.snake_w + 'px', left: v.loc_l + 'px', top: v.loc_t + 'px'}
      }
    }
  },
  watch: {},
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
      // 初始化开始的地方
      this.snakes = [];
      this.snakes.push(this.out_food());
      // 初始化食物
      this.out_food_fun();
    },
    // 开始动
    start() {
      this.start_ts = setInterval(() => {
        let snake_s = JSON.parse(JSON.stringify(this.snakes[0]));
        switch (this.snake_f) {
            // 上
          case 38:
            // console.log(this.snake_f)
            snake_s.loc_t = snake_s.loc_t - this.snake_w;
            break;
            // 右
          case 39:
            // console.log(this.snake_f)
            snake_s.loc_l = snake_s.loc_l + this.snake_w;
            break;
            // 下
          case 40:
            // console.log(this.snake_f)
            snake_s.loc_t = snake_s.loc_t + this.snake_w;
            break;
            // 左
          case 37:
            // console.log(this.snake_f)
            snake_s.loc_l = snake_s.loc_l - this.snake_w;
            break;
        }
        if (snake_s.loc_l < 0 || snake_s.loc_l >= this.grassland.g_w || snake_s.loc_t < 0 || snake_s.loc_t >= this.grassland.g_h) {
          clearInterval(this.start_ts)
          return
        }
        // 添加头部
        this.snakes.unshift(snake_s);
        if (JSON.stringify(this.snakes[0]) === JSON.stringify(this.food)) {
          // 吃到食物 重新生成食物
          this.out_food_fun();
        } else {
          // 运动时候删除尾部 添加头部(在上面)
          this.snakes.pop();
        }
      }, this.snake_s * 1000)
    },
    // 键盘事件
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
            if (this.snake_f !== 39) {
              this.snake_f = currKey;
            }
            break;
          case 38:
            if (this.snake_f !== 40) {
              this.snake_f = currKey;
            }
            break;
          case 39:
            if (this.snake_f !== 37) {
              this.snake_f = currKey;
            }
            break;
          case 40:
            if (this.snake_f !== 38) {
              this.snake_f = currKey;
            }
            break;
        }
      }
    },
    // 随机出食物
    out_food() {
      let s_max_g_h = this.grassland.g_h / this.snake_w;
      let s_max_g_w = this.grassland.g_w / this.snake_w;
      return {
        loc_t: parseInt(Math.random() * s_max_g_h) * this.snake_w, // 距上
        loc_l: parseInt(Math.random() * s_max_g_w) * this.snake_w, // 距左
      };
    },
    // 随机出食物
    out_food_fun() {
      if (this.snakes.some((v) => {
        return JSON.stringify(v) === JSON.stringify(this.out_food())
      })) {
        this.out_food_fun();
      } else {
        this.food = this.out_food();
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


