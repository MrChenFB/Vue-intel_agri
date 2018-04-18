<template>
  <div class="online_class">
    <div class="kinds">
      <span class="char_kinds" >分类</span>
      <div v-for="classification in classifications" class="classfy">
        <span>{{classification}}</span>
      </div>
      <br />
     <div id="button_div">
       <span class="char_kinds" >排序</span>
       <button class="sort_button">最新</button>
       <button class="sort_button">最热</button>
     </div>

    </div>
    <div class="course">
      <div class="left">
        <div class="newest">
          <div >
            <span class="most">最 新</span>
          </div>
          <router-link to="/online_class" v-for="news in video_new.results">
            <div class="courses">
              <img  class="cou_pic" :src='news.video_img' /><br>
              <span class="title">{{news.video_name}}</span><br>
              <span class="discription">{{news.desc}}</span><br/>
              <span class="read_num">阅读量：{{news.click_num}}</span>
              <img  class="heart" src="../../static/images/心2.png"/>

            </div>
          </router-link>
          <div class="courses">
            <img  class="cou_pic" src="../../static/images/萝卜.jpg"/><br>
            <span class="title">萝卜好吃的秘密</span><br>
            <span class="discription">白萝卜、红萝卜、为女萝卜女卜、红萝卜、为女萝</span><br/>
            <span class="read_num">阅读量：200</span>
            <img  class="heart" src="../../static/images/心2.png"/>

          </div>
          <div class="courses">
            <img  class="cou_pic" src="../../static/images/萝卜.jpg"/><br>
            <span class="title">萝卜好吃的秘密</span><br>
            <span class="discription">白萝卜、红萝卜、为女萝卜女卜、红萝卜、为女萝</span><br/>
            <span class="read_num">阅读量：200</span>
            <img  class="heart" src="../../static/images/心2.png"/>

          </div>
          <div class="courses">
            <img  class="cou_pic" src="../../static/images/萝卜.jpg"/><br>
            <span class="title">萝卜好吃的秘密</span><br>
            <span class="discription">白萝卜、红萝卜、为女萝卜女卜、红萝卜、为女萝</span><br/>
            <span class="read_num">阅读量：200</span>
            <img  class="heart" src="../../static/images/心2.png"/>

          </div>
          <div class="courses">
            <img  class="cou_pic" src="../../static/images/萝卜.jpg"/><br>
            <span class="title">萝卜好吃的秘密</span><br>
            <span class="discription">白萝卜、红萝卜、为女萝卜女卜、红萝卜、为女萝</span><br/>
            <span class="read_num">阅读量：200</span>
            <img  class="heart" src="../../static/images/心2.png"/>

          </div>
          <div class="more">更多>></div>

         </div>
        <div class="hotest">
          <div>
            <span class="most">最 热</span>
          </div>

          <div class="courses">
            <img  class="cou_pic" src="../../static/images/萝卜.jpg"/><br>
            <span class="title">萝卜好吃的秘密</span><br>
            <span class="discription">白萝卜、红萝卜、为女萝卜女卜、红萝卜、为女萝</span><br/>
            <span class="read_num">阅读量：200</span>
            <img  class="heart" src="../../static/images/心2.png"/>

          </div>
          <div class="courses">
            <img  class="cou_pic" src="../../static/images/萝卜.jpg"/><br>
            <span class="title">萝卜好吃的秘密</span><br>
            <span class="discription">白萝卜、红萝卜、为女萝卜女卜、红萝卜、为女萝</span><br/>
            <span class="read_num">阅读量：200</span>
            <img  class="heart" src="../../static/images/心2.png"/>

          </div>
          <div class="courses">
            <img  class="cou_pic" src="../../static/images/萝卜.jpg"/><br>
            <span class="title">萝卜好吃的秘密</span><br>
            <span class="discription">白萝卜、红萝卜、为女萝卜女卜、红萝卜、为女萝</span><br/>
            <span class="read_num">阅读量：200</span>
            <img  class="heart" src="../../static/images/心2.png"/>

          </div>
          <div class="courses">
            <img  class="cou_pic" src="../../static/images/萝卜.jpg"/><br>
            <span class="title">萝卜好吃的秘密</span><br>
            <span class="discription">白萝卜、红萝卜、为女萝卜女卜、红萝卜、为女萝</span><br/>
            <span class="read_num">阅读量：200</span>
            <img  class="heart" src="../../static/images/心2.png"/>

          </div>
          <div class="more">更多>></div>
        </div>

      </div>
      <div class="right"></div>
    </div>



  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    data(){
      return{
        video_new:{},
        video_hot:{},
        a:'1'
      }
    },
    computed:{
      ...mapGetters({
        classifications:'getClassifications'
      })
    },
    methods:{

    },
    created(){
      this.$store.dispatch('changeShow','online_class')
      this.$http.get('http://10.158.57.242:8001/video/')
        .then((response)=>{
          this.video_new = response.data


        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }
</script>

<style scoped>
  .online_class{width: 100%;height: 1000px;margin:0;}
  .char_kinds{margin-left: 100px;  float: left;font-size: 20px;margin-top: 6px;line-height: 40px;}
  .kinds{width: 100%;height: 70px;}
  .classfy{width: auto;height: 30px;
    padding: 7px 7px 5px 5px;float: left;
    background-color: rgba(17, 10, 50, 0.78);
    margin-left: 20px;
    border-radius: 10px;
    text-align: center;
    color: white;
    cursor: pointer;
  }
  .course{width: 100%;height: 1000px; margin-top: 30px;}
  .left{width: 80%;height: auto;float: left;}
  .right{width: 20%;float: right;background-color: darkslategrey;height: 500px;}
  .newest,.hotest{width: 95%;margin: 10px auto;height: 400px;text-align: center}
  .most{font-size: 35px;}
  #button_div{width: 400px;height: 50px;margin-top: 30px;}
  .sort_button{border-radius: 7px;width: 60px;height: 40px;margin-left: 20px;border: none;background-color: lightgreen;cursor: pointer;font-size: 20px;margin-top: 10px;}
  .courses{width: 23%;height: auto;float: left;margin-left: 20px;margin-top: 50px;}
  .cou_pic{border-radius: 10px;width: 95%;height: 150px;}
  .title{float:left;margin-left: 20px;font-size: 20px;font-weight: 800}
  .discription{
    text-align: left;
    float: left;
    margin-left: 20px;
    width:90%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    margin-bottom: 1px;
  }
  .heart{width: 20px;height: 20px;float: right;margin-right: 5px;margin-top: 0;}
  .read_num{float: right;color: grey;margin-right: 30px;}
  .more{width: 100px;height: 50px;font-size: 20px;color: #b2b2b2;float: right;margin-top: 30px;cursor: pointer;}
</style>
