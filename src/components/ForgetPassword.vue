<template>
  <div class="con">
    <!--视频播放-->
    <div class="video">
      <!--视频播放的主体-->
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
          <span class="name" >{{videoInfo.video_name}} :</span>
          <span class="desc">{{videoInfo.desc}}</span><br/>
          <span class="click_num"><img src="../../static/images/video_click_num.jpg">  {{videoInfo.click_num}}</span>
          <span class=type></span>
        </div>

      </div>
      <!--推荐视频列表-->
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
    <!--评论-->
    <!--根评论-->
    <div class="commend">
      <!--0-->
      <div class="root_commend">
        <div class="commend_up">
          <img class="root_commend_icon" src="../../static/images/头像1.jpg">
          <div class="root_commend_name">可爱的 xiaojujushishei
            <div class="root_commend_time">2015/5/8</div>
          </div>

        </div>
        <div class="commend_content">煲耳机烧单反，为索尼爸爸打 Call 不嫌烦；
          全色号口红，香奈儿新款，给 Pick 买水喝不完。
          网红餐厅，健身私教，出国旅游，专车接驾... 看起来仿佛已经与纽约上东区接轨的「腔调」人生。
          实际上呢，月末吃土。
        </div>
        <div class="commend_down">
          <img class="thumb_up" src="../../static/images/点赞.png">
          e1200
          <img class="thumb_up" src="../../static/images/回复.png">
          25
          <span class="hide_reply" @click="ShowChildCommend(0)">回复</span>
        </div>
        <div class="child_commend" v-if="show[0].status">
          <div class="child_commend_reply">
            <div class="commend_up">
              <img class="root_commend_icon" src="../../static/images/头像4.jpg">
              <div class="root_commend_name">
                <span >可爱的 xiaojujushishei</span>
                <span class="reply_charecter">&nbsp;&nbsp;回复&nbsp;&nbsp;</span>
                <span>我是谁阿森纳测试</span>
              </div>

            </div>
            <div class="commend_content">
              血泪的教训，不要说价格！并且绝对不要骗他报一个超低价（比如20）告诉他！你会收到来自四面八方的代购的T.T
            </div>
            <div class="commend_down">
              <img class="thumb_up" src="../../static/images/点赞.png">
              2230
              <span class="hide_reply" @click="ShowChildCommend(0)">回复</span>
            </div>
          </div>
          <div class="child_commend_reply">
            <div class="commend_up">
              <img class="root_commend_icon" src="../../static/images/头像4.jpg">
              <div class="root_commend_name">
                <span >可爱的 xiaojujushishei</span>
                <span class="reply_charecter">&nbsp;&nbsp;回复&nbsp;&nbsp;</span>
                <span>我是谁阿森纳测试</span>
              </div>

            </div>
            <div class="commend_content">
              血泪的教训，不要说价格！并且绝对不要骗他报一个超低价（比如20）告诉他！你会收到来自四面八方的代购的T.T
            </div>
            <div class="commend_down">
              <img class="thumb_up" src="../../static/images/点赞.png">
              2230
              <span class="hide_reply" @click="ShowChildCommend(0)">回复</span>
            </div>
          </div>
          <div class="child_commend_reply">
            <div class="commend_up">
              <img class="root_commend_icon" src="../../static/images/头像4.jpg">
              <div class="root_commend_name">
                <span >可爱的 xiaojujushishei</span>
                <span class="reply_charecter">&nbsp;&nbsp;回复&nbsp;&nbsp;</span>
                <span>我是谁阿森纳测试</span>
              </div>

            </div>
            <div class="commend_content">
              血泪的教训，不要说价格！并且绝对不要骗他报一个超低价（比如20）告诉他！你会收到来自四面八方的代购的T.T
            </div>
            <div class="commend_down">
              <img class="thumb_up" src="../../static/images/点赞.png">
              2230
              <span class="hide_reply" @click="ShowChildCommend(0)">回复</span>
            </div>
          </div>
        </div>

      </div>


      <!--1-->
      <div class="root_commend">
        <div class="commend_up">
          <img class="root_commend_icon" src="../../static/images/头像2.jpg">
          <div class="root_commend_name">可爱的 xiaojujushishei
            <div class="root_commend_time">2015/5/8</div>
          </div>

        </div>
        <div class="commend_content">煲耳机烧单反，为索尼爸爸打 Call 不嫌烦；
          全色号口红，香奈儿新款，给 Pick 买水喝不完。
          网红餐厅，健身私教，出国旅游，专车接驾... 看起来仿佛已经与纽约上东区接轨的「腔调」人生。
          实际上呢，月末吃土。
        </div>
        <div class="root_down">
          <img class="thumb_up" src="../../static/images/点赞.png">
          e1200
          <img class="thumb_up" src="../../static/images/回复.png">
          25
          <span class="hide_reply" @click="ShowChildCommend(1)">收起回复</span>
        </div>
        <div class="child_commend" v-if="show[1].status">

        </div>
      </div>


      <!--2-->
      <div class="root_commend" @click="ShowChildCommend(2)">

      </div>
      <div class="child_commend" v-if="show[2].status">

      </div>
    </div>

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
        },
        show:[
          {status:false},
          {status:false},
          {status:false},
          {status:false},
        ]
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
        console.log('player play!', player)
      },
      onPlayerPause(player) {
        console.log('player pause!', player)
      },
      // ...player event
      // or listen state event
      playerStateChanged(playerCurrentState) {
        console.log('player current update state', playerCurrentState)
      },
      // player is ready
      playerReadied(player) {
        console.log('the player is readied', player)
//         you can use it to do something...
        // player.[methods]
      },
      ShowChildCommend(num){
        if( this.show[num].status === false) {
          this.show[num].status = true
        }
        else {
          this.show[num].status = false
        }
      }
    },
  }
</script>
<style scoped>
  .con{width: 100%;height: auto;margin-top: 5px;padding: 0;background-color: #f5f5f5;}
  .video{width:100%;height: 770px;padding-top: 20px;}
  .left{width: 1190px;margin-left: 100px;height: 750px;float: left;box-shadow: 0 0 3px #d1d1d1;background-color: #ffffff;margin-right: 10px;}
  .title{width: 1150px;height: 100px;padding-left: 50px;}
  .name{font-size: 30px;color: #00BC9B;}
  .desc{font-size: 25px;color: #636363;}
  .click_num{font-size: 27px;color: #d7d7d7;}
  .right{width: 300px;height: 680px;float: right;margin-right: 80px;box-shadow: 0 0 3px #d1d1d1;background-color: #ffffff;
  }
  .recommend{width:95%;margin-left: 5%;height: 110px;margin-bottom: 10px;}
  .rec_img{width: 140px;height: 100px;margin-top: 10px;float: left;}
  img{width: inherit;height: inherit;border-radius: 10px;}
  .content{float: right;height: 100px;width: 140px;margin-top: 10px;}
  .content_title{width: 100%;height: 70px;font-size: 18px;color: #595959  }
  .content_title:hover{color: #00BC9B}
  .con_click_num{width: 100%;height:20px;}
  .rec_click_img{width: 30px;height: 100%;border-radius: 1px;}
  .rec_click_num{font-size: 18px;color: #8f8f8f;overflow: hidden;}

  /*.root_commend:hover .child_commend{display: inline-block;}*/
  /*评论功能的css*/
  .commend{width: 1190px;margin-left: 100px;height: auto;box-shadow: 0 0 3px #d1d1d1;background-color: #ffffff;margin-top: 20px;padding-top: 20px; }
  .root_commend{width: 1000px;height: auto;display: inline-block;margin-left: 100px;border-bottom: 1px solid  #d1d1d1;margin-top: 20px;}
  .child_commend{
    width: 950px;
    height: 500px;
    margin-left: 10px;
    margin-bottom: 10px;
    background-color: #f7f8fa;
    margin-top: 50px;
  }
  .commend_up{width: 100%;height: 40px;line-height: 40px;}
  .root_commend_icon{width: 40px;height: 40px;border-radius: 20px;display: inline-block;float: left;line-height: 40px;margin-left:10px; }
  .root_commend_name{ height: 40px;  margin-left: 60px; vertical-align: middle;  display: table-cell;width: 970px;font-size: 20px;padding-left: 10px; }
  .root_commend_time{height: 40px; vertical-align: middle;  display: table-cell;float: right; width:150px;text-align: center;color: grey;}
  .commend_content{width: 95%;margin-left: 20px;height: auto;margin-top: 10px;line-height: 30px;font-size: 19px;}
  .commend_down{width: auto;height: 30px;vertical-align: middle;  display: table-cell;float: right;color: grey; margin-right: 40px;}
  .thumb_up{width: 20px;height: 20px;vertical-align: bottom; margin-left: 15px;margin-right: 5px;}
  .hide_reply{margin-left: 20px;color: #3745ff }
  .child_commend_reply{width: 95%;margin-left: 20px;height: auto;  border-bottom: solid 1px #d1d1d1;display: inline-block;margin-top: 20px;}
  .reply_charecter{color: #7a7a7a;}
</style>
