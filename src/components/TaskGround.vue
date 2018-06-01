<template>
  <div class="task_ground">
    <!--分四栏-->
    <el-row :gutter="20">
      <!--主体-->
      <el-col :span="13" :offset="3">
        <div class="grid-content ">
          <!--导航栏-->
          <div class="second_nav">
            <!--提问-->
            <el-button class="second_nav_button" type="text" @click="dialogFormVisible = true" >
              <img class="second_nav_pic" src="../../static/images/ask_question.png" >
              提问
            </el-button>
            <!--提问的对话框-->
            <el-dialog title="写下你的问题" :visible.sync="dialogFormVisible" center>
              <el-form :model="form"   label-width="80px">
                <el-form-item label="问题标题" >
                  <el-input  type="textarea"
                             :rows="3"
                             placeholder="请输入内容"
                             v-model="form.title"
                             auto-complete="off"
                  >
                  </el-input>
                </el-form-item>

                <el-form-item label="问题内容" >
                  <el-input  type="textarea"
                             :rows="5"
                             placeholder="请输入问题内容"
                             v-model="form.content"
                             auto-complete="off"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item  label="问题话题">
                  <!--</el-input>-->
                  <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags"
                    closable
                    :disable-transitions="false"
                    type="success"
                    @close="handleClose(tag)">
                    {{tag}}
                  </el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @blur="handleInputConfirm"
                  >
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitCreateQuetion">确 定</el-button>
              </div>
            </el-dialog>

            <!--回答-->
            <el-button class="second_nav_button" type="text">
              <img class="second_nav_pic" src="../../static/images/ask_question.png">
              回答
            </el-button>

            <!--写文章-->
            <el-button class="second_nav_button" type="text">
              <img class="second_nav_pic" src="../../static/images/ask_question.png">
              写文章
            </el-button>
          </div>

          <!--主体-->
          <div class="questionListDiv" v-for="(task,index) in taskList" :key="index">
            <div class="questionNav" >
              <img class="headPic" :src="task.user.user_profile.image">
              <strong class="autherName">{{task.user.user_profile.nick_name}}</strong>
            </div>
            <div class="questionTitle">
              <strong>{{task.title}}}</strong>
            </div>
            <div class="questionCotent">
              {{task.content}}
            </div>
            <div class="questionButtom" style="height: 50px;width: 100%">
              <div style="width: auto;float: right;margin-right: 70px;">
                <img src="../../static/images/msg_none.png" class="questionButtomIcon" @click="ShowCommend(task.id)"/>
                <span class="questionButtomChar" @click="ShowCommend(task.id)">{{task.reply_nums}}条回答</span>

                <img src="../../static/images/share.png" class="questionButtomIcon" @click="Share"/>
                <span class="questionButtomChar" @click="Share">分享</span>

                <img src="../../static/images/collect.png" class="questionButtomIcon" @click="Collect(task.id)" v-if="!task.is_atn"/>
                <img src="../../static/images/collected.png" class="questionButtomIcon" v-if="task.is_atn"/>
                <span class="questionButtomChar" @click="Collect(task.id)">收藏</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>

      <!--侧边栏-->
      <el-col :span="5">
        <div class="grid-content sliderDiv ">
          <button class="sliderButton"><i class="el-icon-star-on"></i>我的收藏</button>
          <button class="sliderButton"><i class="el-icon-bell"></i>他人的答复</button>
          <button class="sliderButton"><i class="el-icon-question"></i>我关注的问题</button>
          <button class="sliderButton"><i class="el-icon-edit-outline"></i>我的回答</button>
          <button class="sliderButton"><i class="el-icon-service"></i>专家在线问答</button>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    data(){
      return{
        dialogFormVisible: false,
        form: {
          title:'',
          content:''
        },
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        editorContent: '',
        taskList:[],
        page: 1,
        isLoad:true,
        hasLock:false,
        hasButtom:false
      }
    },
    comments:{
    },
    computed:{
      ...mapGetters({
        classifications:'getClassifications'
      })
    },
    methods: {
      //删除标签
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      //展现input
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      //失去焦点
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },

      //  提交创建的问题
      submitCreateQuetion() {
        this.dialogFormVisible = false;
        this.$axios.post('/task/', {
          title: this.form.title,
          content: this.form.content,
          mession_kind: this.dynamicTags.toString()
        })
          .then((response) => {
            this.form.title = ''
            this.form.content = ''
            this.dynamicTags = []
            this.$message({
              message:'问题提交成功，请耐心等待别人的解答',
              type:'success'
            })
            this.GetTaskList()
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      //  收藏
      Collect(id){
          this.$axios.post('/task_fav/',{task:id})
            .then((response)=>{
              this.$message({
                message:'收藏成功',
                type:'success'
              })
              for(let i=0;i<this.taskList.length;i++){
                if(id === this.taskList[i].id){
                  this.taskList[i].is_atn = true
                  break;
                }
              }
            })
            .catch(function (err) {
              console.log(err)
            })
      },
      //获得评论信息
      ShowCommend(id){
        this.$store.dispatch('changeTaskId', id);
        this.$router.push('/question_detail')
      },
      //  分享
      Share(){

      },
      //  获取task列表
      GetTaskList(){

        this.$axios.get('/task/')
          .then((res)=>{
            this.taskList = res.data.results;
          })
          .catch((error)=>{
            console.log(error)
            this.$message({
              message:'您未登陆，请先登录再查看此页面',
              type:'error'
            })
           setTimeout(()=>{
             this.$router.push('/login')
           },3000)

          })
      },
      GetMoreList(){
        this.hasLock = true;
        // alert(this.page)
        if(this.isLoad === false) {
          if(!this.hasButtom){
            this.$message({
              message:'到底啦',
              type:'warning'
            })
            this.hasButtom = true
            return ;

          }
        }
        this.page = this.page+1;

        this.$axios.get('/task/?page='+this.page)
          .then((res)=>{
              let newTaskList = res.data.results;
              this.taskList.push.apply(this.taskList,newTaskList)
              // console.log(this.taskList)
            if(res.data.next == null){
                this.isLoad = false;
            }
            this.hasLock = false;
          })
          .catch(function (err) {
            // this.hasLock = false;
            console.log(err)
          })
      }
    },

    created() {
      var self = this
      this.$store.dispatch('changeShow', 'task_ground');
      this.GetTaskList()

      window.onscroll = function() {
       // var wScrollY = document.documentElement.scrollTop || document.body.scrollTop;
        var wScrollY = window.scrollY; // 当前滚动条位置
        var wInnerH = window.innerHeight; // 设备窗口的高度（不会变）
        var bScrollH = document.body.scrollHeight; // 滚动条总高度

        if (wScrollY + wInnerH >= bScrollH && !self.hasLock) {
            self.GetMoreList();
        }
      }
    }
  }
</script>

<style scoped>
  .task_ground{width: 100%;
    height: auto;
    margin:0;
    padding-top: 30px;
    background-color: #f6f6f6;
    padding-bottom: 30px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 200px;
    /*background-color: antiquewhite;*/
  }
  .second_nav{
    height: 60px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 3px #d1d1d1;
    background-color: white;
    padding-top: 10px;
    display: flex;
    padding-left: 50px;

  }
  .second_nav_pic{
    width: 30px;
    height: 25px;
    vertical-align: text-bottom;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .second_nav_button{
    display: table-cell;
    vertical-align: center;
    font-size: 20px;
    color: #c6c6c6;
    margin-right: 5%;
  }
  .questionListDiv{
    min-height: 200px;
    width: 100%;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 3px #d1d1d1;
    background-color: white;
    margin-top: 20px;
    /*padding:20px;*/
  }
  .questionNav{
    margin: 20px;
    display: inline-block;
    overflow: hidden;

  }
  .headPic{
    width: 50px;
    height: 45px;
    vertical-align: middle;
  }
  .autherName{
    font-size: 18px;
    vertical-align: middle;
  }
  .questionTitle{
    font-size: 21px;
    vertical-align: center;
    margin-left: 20px;
    margin-right: 20px;
  }
  .questionCotent{
    margin-left: 40px;
    margin-right: 40px;
    font-size: 20px;
    line-height: 40px;
    margin-top: 10px;
    text-align: left;
    /*float: left;*/
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
  .questionButtom{
    margin-top: 20px;

  }
  .questionButtomIcon{
    width: 30px;
    height: 25px;
    vertical-align: middle;
    cursor: pointer;
  }
  .questionButtomChar{
    font-size: 18px;
    vertical-align: middle;
    color: darkgray;
    margin-right: 15px;
    cursor: pointer;
  }
  .sliderButton{
    border: none;
    width: 100%;
    font-size: 20px;
    text-align: left;
    height: 50px;
    color: darkgray;
    background-color: white;
    margin-bottom: 5px;
    padding-left: 20px;
  }
  .sliderDiv{
    height: auto;
    width: 300px;
    padding-top: 15px;
    background-color: white;
    border: none;
    box-shadow:  0 0 3px #d1d1d1 ;
    padding-bottom: 10px;
    position: fixed;
  }
  .sliderButton:hover{
    background: #f2f2f2;
  }
  i{
    margin-right: 10px;
  }

</style>
