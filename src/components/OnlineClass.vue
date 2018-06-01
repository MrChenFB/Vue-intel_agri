<template>
  <div class="online_class">
    <div class="kinds">
      <span class="char_kinds" >分类</span>
      <div v-for="classification in classifications" class="classfy" @click="Slift(classification.path)">
        <span>{{classification.name}}</span>
      </div>
      <br />
     <div id="button_div">
       <span class="char_kinds" >排序</span>
       <button class="sort_button" @click="Newest()">最新</button>
       <button class="sort_button" @click="Hotest()">最热</button>
       <div class="search">
         <input type="text" class="search_input" placeholder="搜索课程"  @keyup.enter="Search" v-model="search"/>
       </div>
     </div>
    </div>
    <div class="course">
      <div class="left">
        <!--最新最热初始列表-->
        <div v-if="a==true">
          <div class="newest">
            <div class="up_most">
              <span class="most">最 新</span>
            </div>
            <div  v-for="(news,index) in video_new.results" v-if="index <=3" :key="index" @click="getVideoSource(news.id)">
              <div class="courses">
                <img  class="cou_pic" :src='news.video_img' /><br>
                <span class="title">{{news.video_name}}</span><br>
                <span class="discription">{{news.desc}}</span><br/>
                <span class="read_num">阅读量：{{news.click_num}}</span>
                <img  class="heart" src="../../static/images/browsed.png"/>

              </div>
            </div>
            <div class="more" @click="Newest()">更多>></div>

          </div>
          <div class="hotest">
            <div class="up_most">
              <span class="most">最 热</span>
            </div>
            <div  v-for="(hot,index) in video_new.results" v-if="index <=3" :key="index" @click="getVideoSource(hot.id)">
              <div class="courses">
                <img  class="cou_pic" :src='hot.video_img' /><br>
                <span class="title">{{hot.video_name}}</span><br>
                <span class="discription">{{hot.desc}}</span><br/>
                <span class="read_num">阅读量：{{hot.click_num}}</span>
                <img  class="heart" src="../../static/images/browsed.png"/>

              </div>
            </div>
            <div class="more" @click="Hotest()">更多>></div>
          </div>
        </div>
        <!--全部列表-->
        <div v-if="a==false" class="newest">
          <div class="list">
            <div to="/video_player" v-for="(news,index) in video_slift.results" :key="index" @click="getVideoSource(news.id)">
              <div class="courses">
                <img  class="cou_pic" :src='news.video_img' /><br>
                <span class="title">{{news.video_name}}</span><br>
                <span class="discription">{{news.desc}}</span><br/>
                <span class="read_num">阅读量：{{news.click_num}}</span>
                <img  class="heart" src="../../static/images/browsed.png"/>

              </div>
            </div>
          </div>
        </div>
        <!--分页-->
        <div class="pagination" v-if="is_pagenation === true">
          <ul>
            <li @click="GetPre()"><<</li>
            <li v-for=" n in parseInt(page_num)" @click="GetPination(n)" v-if="page<5&&n<5">{{n}}</li>
            <li v-for=" n in parseInt(page_num)" @click="GetPination(n)" v-if="page>4&&n<3">{{n}}</li>
            <li v-if=" parseInt(page_num)>5">...</li>
            <li v-for=" ns in parseInt(page_num)" @click="GetPination(n)" v-if="page>4&&(parseInt(page_num)-ns)<3">{{ns}}</li>
            <li @click="GetNext()" >>></li>
          </ul>
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
        a:true,
        video_slift:{},
        type:'',
        is_pagenation:false,
        page_num:0,
        search:'',
        page:1,
      }
    },
    computed:{
      ...mapGetters({
        classifications:'getClassifications'
      })
    },
    methods:{
      //分类筛选
      Slift(type) {
        this.$axios.get('video/?video_kind='+type)
          .then((response)=>{
            this.type = 'video/?video_kind='+type
            this.a = false
            this.video_slift = response.data
            if(this.video_slift.count >12){
                this.is_pagenation = true;
                if(this.video_slift.count%12 === 0){
                    this.page_num = this.video_slift/12
                }
                else {
                    this.page_num = this.video_slift.count/12 +1
                }
            }
            else{
                this.is_pagenation = false
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      },

      //最新视频全部列表
      Newest(){
        this.$axios.get('video/?ordering=add_time&&page=1')
          .then((response)=>{
            this.type = 'video/?ordering=add_time&&page=1'
            this.a = false
            this.video_slift = response.data
            if(this.video_slift.count >12){
              this.is_pagenation = true;
              if(this.video_slift.count%12 === 0){
                this.page_num = this.video_slift/12
              }
              else {
                this.page_num = this.video_slift.count/12 +1
              }
            }
            else{
              this.is_pagenation = false
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      //最热视频全部列表
      Hotest(){
        this.$axios.get('video/?ordering=click_num')
          .then((response)=>{
            this.type ='video/?ordering=click_num'
            this.a = false
            this.video_slift = response.data;
            if(this.video_slift.count >12){
              this.is_pagenation = true;
              if(this.video_slift.count%12 === 0){
                this.page_num = this.video_slift/12
              }
              else {
                this.page_num = this.video_slift.count/12 +1
              }
            }
            else{
              this.is_pagenation = false
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      //搜索视频列表
      Search(){
//          alert('serafnn')
        if(this.search){
          this.$axios.get('video/?search='+this.search)
            .then((response)=>{
              this.type = 'video/?search='+this.search
              this.a = false
              this.video_slift = response.data
              if(this.video_slift.count >12){
                this.is_pagenation = true
                if(this.video_slift.count%12 === 0){
                  this.page_num = this.video_slift/12
                }
                else {
                  this.page_num = this.video_slift.count/12 +1
                }
              }
              else{
                this.is_pagenation = false
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        }
      },
      //分页
      GetPination(get_page_num){
          this.$axios.get(this.type+'&&page='+get_page_num)
            .then((response)=>{
              this.video_slift = response.data
              this.page = get_page_num
            })
            .catch(function (err) {
              console.log(err)
            })
      },
      //前一页
      GetPre(){
          if(this.page===1){
            this.$message({
              message:'已经是第一页啦！',
              type:'success'
            })
            return ;
          }
          let page = this.page -1
        this.$axios.get(this.type+'&&page='+ page.toString())
          .then((response)=>{
            this.video_slift = response.data
            this.page = page
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      //后一页
      GetNext(){
          if(this.page === parseInt(this.page_num)){
            this.$message({
              message:'已经是第最后一页啦！',
              type:'success'
            })
            return ;
          }
        let page = this.page +1
        this.$axios.get(this.type+'&&page='+ page.toString())
          .then((response)=>{
            this.video_slift = response.data
            this.page = page
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      //播放视频前将视频的信息存在vuex里面
      getVideoSource(type){
        this.$store.dispatch('changeVideoId',type)
        this.$router.push('/video_player')
      }

    },
  created   (){
      this.$store.dispatch('changeShow','online_class')
      this.$axios.get('video/?ordering=add_time')
        .then((response)=>{
          this.video_new = response.data
        })
        .catch(function (err) {
          console.log(err)
        })
      this.$axios.get('video/?ordering=click_num')
        .then((res)=>{
          this.video_hot = res.data
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }
</script>

<style scoped>
  .online_class{width: 100%;min-height: 900px;margin:0; margin-bottom: 70px;}
  .char_kinds{margin-left: 100px;  float: left;font-size: 20px;margin-top: 6px;line-height: 40px;}
  .kinds{width: 100%;height: 70px;margin-top: 50px;}
  .classfy{width: auto;height: 30px;
    padding: 7px 7px 5px 5px;float: left;
    background-color: rgba(17, 10, 50, 0.78);
    margin-left: 20px;
    border-radius: 10px;
    text-align: center;
    color: white;
    cursor: pointer;
  }
  .course{width: 100%;min-height: 900px; margin-top: 30px; }
  .left{width: 74%;height: auto;float: left;position: relative;}
  .right{width: 23%;float: right;height: 500px;border: 1px grey solid;margin-right:2%;}
  .newest,.hotest{width: 95%;margin: 10px auto;height: 400px;text-align: center;}
  .up_most{height: 50px;width: 100%;margin-bottom: 20px;text-align: center;}
  .most{font-size: 35px;}
  #button_div{width: 70%;height: 60px;margin-top: 30px;}
  .search{width: 300px;height: 40px;float: right;margin-right: 30px;margin-bottom: 20px;}
  .search_input{width: 300px;height: 40px;line-height: 40px;border: 1px solid lightgrey;border-radius: 20px;font-size: 20px;color: #919191;padding-left: 20px;}
  input::-webkit-input-placeholder{
    color: #b2dfe5;
  }
  input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#b2dfe5;
  }
  input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#b2dfe5;
  }
  input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color:#b2dfe5;
  }
  .list{width: 100%;height: auto; float: left;}
  .sort_button{border-radius: 7px;width: 60px;height: 40px;margin-left: 20px;border: none;cursor: pointer;font-size: 20px;margin-top: 10px;}
  .courses{width: 20%;height: auto;float: left;margin-left: 4%;margin-bottom: 50px;background-color: #eeeeee;border-radius: 10px;padding-bottom: 3px;
  }
  .cou_pic{border-radius: 10px;width: 100%;height: 150px;}
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
  .more{width: 95%;height: 50px;font-size: 20px;float:left;color: #b2b2b2;cursor: pointer;text-align: right;}
  .pagination{width: 100%;height: 100px;margin-bottom: 70px;margin-top: 450px;}
  .pagination ul{float: right;height: inherit;line-height:inherit;text-align: center;padding-right: 50px;}
  .pagination ul li{display: inline-block;padding: 15px;border: 1px solid #3fafff;border-radius: 10px;width: 20px;color:#1c65ff;margin-top: 30px;margin-right: 3px;}
</style>
