<template>
  <div class="main">
      <el-row :gutter="30">
        <el-col :span="13" :offset="3">
          <!--问题信息-->
          <div >
            <div class="questionInfo aw">
              <el-tag type="success" class="questionTag" v-for="tab in tabs ">{{tab}}</el-tag>
              <div class="questionTitle">
                <strong>{{taskInfo.title}}</strong>
              </div>
              <div class="questionContent">
              {{taskInfo.content}}
              </div>
              <div class="questionWork">
                <el-button style="margin-right: 15px"  @click="taskAttention">关注问题</el-button>
                <el-button type="primary" icon="el-icon-edit" @click="NewAnswer">写回答</el-button>
              </div>
            </div>
          </div>
          <!--提交自己的回答-->
          <div class="editorOwnComment" >
            <div id="editor" >
              <p v-model="editorContent"></p>
            </div>

              <el-button type="primary"
                         style="margin-left: 85%;margin-top: 20px;margin-bottom: 20px;"
                         v-if="hasEditor"
                         @click="submitAnswer()"
              >
                提交回答
              </el-button>
          </div>
          <!--展示问题的回答-->
          <div class="questionRelpy">
            <div class="questionAnswerNum"><strong>{{replyList.count}}条回答</strong></div>
            <div v-if="replyList.count===0">
              还没有人回答，快来抢沙发！
            </div>
            <div class="replyDiv" v-else v-for="(reply,index) in replyList.results">
              <div class="replyAuther">
                <img :src="reply.user.user_profile.image" class="replyAutherPic"/>
                <span class="replyAutherName"><strong>{{reply.user.user_profile.nick_name}}</strong></span>
              </div>
              <div class="questionContent" v-html="reply.content"  >
                <!--<span ></span>-->
               </div>
              <div class="replyAutherWork">
                <div style="float: right;width: auto;    display: table-cell; margin-right: 50px;">
                  <!--点赞-->
                  <img src="../../static/images/good_exist.png"  class="replyAutherWorkPic" v-if="reply.is_love"/>
                  <img v-else src="../../static/images/good_none.png" @click="clickStar(reply.id,1)" class="replyAutherWorkPic"/>
                  <span class="replyAutherWorkChar">{{reply.point_nums}}</span>

                  <!--评论-->
                  <!--<img src="../../static/images/msg_none.png" class="replyAutherWorkPic" @click="getChildReply(reply.id,index)"/>-->
                  <!--<span class="replyAutherWorkChar" @click="getChildReply(reply.id,index)">{{reply.comment_nums}}条评论</span>-->

                  <!--分享-->
                  <!--<img src="../../static/images/msg_none.png" class="replyAutherWorkPic"/>-->
                  <!--<span class="replyAutherWorkChar">151条评论</span>-->
                </div>
              </div>
              <!--<div clas="ReplyChild">-->
                <!--<div style="display: inline;">-->
                  <!--<el-input-->
                    <!--v-model="replyChildInput"-->
                    <!--style="display: inline-block;width: 400px;margin-left: 300px"-->
                    <!--clearable>-->
                  <!--</el-input>-->
                  <!--<el-button style="display: inline-block" class="commendButton" >评论</el-button>-->
                <!--</div>-->

              <!--</div>-->
            </div>
          </div>
        </el-col>
        <el-col :span="6" ><div class="aw"></div></el-col>
      </el-row>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import E from "wangeditor"

  export default {
    data() {
      return {
        editorContent: "",
        hasEditor:false,
        taskInfo:'',
        tabs:[],
        replyList:'',
        replyChildList:[[]],
        replyChildInput:''
      }
    },
    computed:{
      ...mapGetters({
        taskId:'getTaskId'
      })
    },
    methods:{
      back:function () {
        this.$router.go(-1)
      },
      //创建自己的会问题的回答
      NewAnswer(){
        if(!this.hasEditor){
          this.hasEditor = true
          var editor = new E('#editor')
          editor.customConfig.onchange = (html) => {
            this.editorContent = html
          }
          editor.customConfig.uploadImgShowBase64 = true
          editor.customConfig.zIndex = 10
          editor.create()

        }
      },
    //  提交对问题的回答
      submitAnswer(){
        if(this.editorContent == null ||this.editorContent === ''){
          this.$message({
            message:'你还没有些内容哦！',
            type:'warning'
          })
          return ;
        }
        this.$axios.post('task_reply/',{
          task:this.taskId,
          content:this.editorContent
        })
          .then((res)=>{
            this.$message({
              message:'回答成功',
              type:'succsess'
            })
            this.hasEditor = false
            this.editorContent = ''
            this.getReply()
          })
          .catch((err)=>{
            console.log(err)
          })
      },
      //获取回答列表
      getReply(){
        var that = this
        this.$axios.get('/task_reply/'+this.taskId)
          .then((res)=>{
            this.replyList = res.data
            // for(let i=0;i<this.replyList.length;i++){
            //   that.replyChildList[i].push([])
            // }
            // console.log(this.replyChildList)
          })
          .catch((err)=>{
            console.log(err)
          })
      },
    //  获取回答评论的所有子评论
      getChildReply(reply_id,index){
        this.$axios.get('/mession_com/'+reply_id)
          .then((res)=>{
            // console.log(res)
            this.replyChildList[index] =res.data;
              console.log(JSON.stringify(this.replyChildList[index]))
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      // 点赞
      clickStar(id,type) {
          this.$axios.post('/mession_point/',{
            to_id:id,
            to_id_type:type

        })
            .then((res)=>{
              this.$message({
                message:'点赞成功',
                type:'success'
              })
              this.getReply();

            })
            .catch(function (err) {
              console.log(err)
            })
      },
    //  关注问题
      taskAttention(){
        this.$axios.post('task_fav/',{
          task:this.taskId
        })
          .then((res)=>{
            if(res.data.task !==undefined){
              this.$message({
                message:'关注问题成功',
                type:'success'
              })
            }
            else {
              if (res.data.task !== null) {
                this.$message( '已关注')
              }
            }
          })
          .catch(function (err) {
            console.log(err)
          })

      }
    },
    mounted(){
    //  获得问题详细信息
      this.$axios.get('/task/'+this.taskId)
        .then((res)=>{
          this.taskInfo = res.data
          this.tabs = this.taskInfo.mession_kind.split('、')
        })
        .catch((err)=>{
          console.log(err)
        })
      this.getReply();

    },
    updated(){

    }
  }
</script>

<style scoped>
  .main{
    background-color: #f6f6f6;
  }
  .aw{
    min-height: 200px;
    background-color: white;
    margin-top: 20px;
    box-shadow: 0 0 3px #f1f1f1;
    border-radius: 5px;
  }
  .questionInfo{
    padding-left: 40px;
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .questionTag{
    margin-right: 15px;
  }
  .questionTitle{
    margin-top:20px;
    width: 100%;
    font-size: 23px;
    line-height: 50px;
  }
  .questionContent{
    margin-top: 20px;
    font-size: 20px;
    line-height: 40px;
    padding-right: 30px;
    word-wrap:break-word;
  }
  .questionWork{
    margin-top: 20px;
    background-color: white;
  }
  .editorOwnComment{
    background-color: white;
    margin-top: 20px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 3px #f1f1f1;
  }
  .questionRelpy{
    min-height: 200px;
    margin-top: 20px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 3px #f1f1f1;
    background-color: white;
    margin-bottom: 30px;
    padding-left: 30px;
    padding-right: 30px;
  }
  .questionAnswerNum{
    border-bottom: solid 1px #e2e2e2;
    background-color: white;
    font-size: 20px;
   padding-top: 20px;
    padding-bottom: 10px;
    padding-left: 10px;
    margin-bottom: 30px;
  }
  .replyDiv{
    margin-bottom: 30px;
    border-bottom: solid 1px  #e2e2e2;
  }
  .replyAuther{
    display: table-cell;
  }
  .replyAutherPic{
    width: 50px;
    height: 45px;
    vertical-align: middle;
  }
  .replyAutherName{
    font-size: 21px;
    color: darkgray;
    vertical-align: center;
    margin-left: 15px;
  }
  .replyAutherWork{
    margin-top: 20px;
    margin-bottom: 2px;
    padding-left: 20px;
    height: 40px;
    width: 100%;


  }
  .replyAutherWorkPic{
    width: 35px;
    height: 32px;
    vertical-align: middle;
    cursor: pointer;
  }
  .replyAutherWorkChar{
    color: grey;
    vertical-align: middle;
    cursor: pointer;
    font-size: 21px;
    margin-right: 20px;
  }
  .commendButton{
    background-color: #00BC9B;
  }
</style>
