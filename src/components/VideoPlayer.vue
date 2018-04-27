<template>
  <div class="con">
    <div class="video">
      <div class="left">
        <video-player  class="video-player-box"
                       ref="videoPlayer"
                       :options="playerOptions"
                       :playsinline="true"
                       customEventName="customstatechangedeventname"

                       @play="onPlayerPlay($event)"
                       @pause="onPlayerPause($event)"
                       @ended="onPlayerEnded($event)"
                       @waiting="onPlayerWaiting($event)"
                       @statechanged="playerStateChanged($event)"
                       @ready="playerReadied">
        </video-player>
        <div class="title" v-model="videoInfo">
          <span class="name" >{{videoInfo.video_name}} : </span>
          <span class="desc">{{videoInfo.desc}}</span><br/>
          <span class="click_num"><img src="../../static/images/video_click_num.jpg">  {{videoInfo.click_num}}</span>
          <span class=type></span>
        </div>

      </div>
      <div class="right">
        <div class="recommend">
          <div class="rec_img"><img src="../../static/images/南瓜.jpg"></div>
          <div class="content">
            <div class="content_title">刘畅：色佛色粉娃儿</div>
            <div class="con_click_num">
              <img class="rec_click_img" src="../../static/images/video_click_num.jpg">
              <span class="rec_click_num">15</span>
            </div>
          </div>
        </div>
        <div class="recommend">
          <div class="rec_img"><img src="../../static/images/南瓜.jpg"></div>
          <div class="content">
            <div class="content_title">刘畅：色佛色粉娃儿</div>
            <div class="con_click_num">
              <img class="rec_click_img" src="../../static/images/video_click_num.jpg">
              <span class="rec_click_num">15</span>
            </div>
          </div>
        </div>
        <div class="recommend">
          <div class="rec_img"><img src="../../static/images/南瓜.jpg"></div>
          <div class="content">
            <div class="content_title">刘畅：色佛色粉娃儿</div>
            <div class="con_click_num">
              <img class="rec_click_img" src="../../static/images/video_click_num.jpg">
              <span class="rec_click_num">15</span>
            </div>
          </div>
        </div>
        <div class="recommend">
          <div class="rec_img"><img src="../../static/images/南瓜.jpg"></div>
          <div class="content">
            <div class="content_title">刘畅：色佛色粉娃儿</div>
            <div class="con_click_num">
              <img class="rec_click_img" src="../../static/images/video_click_num.jpg">
              <span class="rec_click_num">15</span>
            </div>
          </div>
        </div>
        <div class="recommend">
          <div class="rec_img"><img src="../../static/images/南瓜.jpg"></div>
          <div class="content">
            <div class="content_title">刘畅：色佛色粉娃儿</div>
            <div class="con_click_num">
              <img class="rec_click_img" src="../../static/images/video_click_num.jpg">
              <span class="rec_click_num">15</span>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="commend"></div>

  </div>

</template>

<script>
  import 'video.js/dist/video-js.css'
  import { videoPlayer } from 'vue-video-player'
  import {mapGetters} from 'vuex'
  // Similarly, you can also introduce the plugin resource pack you want to use within the component
  // import 'some-videojs-plugin'
  export default {
    components: {
      videoPlayer
    },
    data() {
      return {
          videoInfo:{},
        playerOptions: {

          // videojs options
          muted: false,
          language: 'zh-CN',
          preload: 'auto',
          loop: false,
          aspectRatio: '16:9',
          fluid: true,
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src: ""
          }],
          poster: "",
        }
      }
    },
      mounted:function () {
        let id = this.videoId.toString()
        this.$axios.get('video/'+id+'/')
          .then((response)=>{
            this.videoInfo = response.data;
            this.playerOptions.sources[0].src = response.data.url
            this.playerOptions.poster = response.data.video_img
            console.log(this.videoInfo)
          })
          .catch(function (err) {
            console.log(err )
          })
      console.log('this is current player instance object', this.player)
    },
    computed: {
      ...mapGetters({
        videoId:'getVideoId'
      }),
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      // ...player event

      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },

      // player is ready
      playerReadied(player) {
        console.log('the player is readied', player)
        // you can use it to do something...
        // player.[methods]
      }
    },
  }
</script>
<style scoped>
  .con{width: 100%;height: auto;margin: 0;padding: 0}
  .video{width:100%;height: 770px;background-color: #dedee8;padding-top: 20px;}
  .left{width: 1200px;margin-left: 100px;height: 750px;float: left;}
  .title{width: 1150px;height: 100px;padding-left: 50px;}
  .name{font-size: 30px;color: #00BC9B;}
  .desc{font-size: 25px;color: #636363;}
  .click_num{font-size: 27px;color: darkgray;}
  .right{width: 300px;height: 680px;float: right;margin-right: 80px;background-color: lightgray}
  .recommend{width:95%;margin-left: 5%;height: 110px;margin-bottom: 10px;}
  .rec_img{width: 140px;height: 100px;margin-top: 10px;float: left;}
  img{width: inherit;height: inherit;border-radius: 10px;}
  .content{float: right;height: 100px;width: 140px;margin-top: 10px;}
  .content_title{width: 100%;height: 70px;font-size: 18px;color: #595959  }
  .content_title:hover{color: #00BC9B}
  .con_click_num{width: 100%;height:20px;}
  .rec_click_img{width: 30px;height: 100%;border-radius: 1px;}
  .rec_click_num{font-size: 18px;color: #8f8f8f;overflow: hidden;}
  .commend{width: 100%;min-height: 500px;margin-top: 20px;}
</style>
