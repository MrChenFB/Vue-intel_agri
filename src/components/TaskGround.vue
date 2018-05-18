<template>
    <div class="task_ground">
      <!--分四栏-->
      <el-row :gutter="20">
        <!--主体-->
        <el-col :span="13" :offset="3">
          <div class="grid-content ">
            <div class="second_nav">
              <!--提问-->
              <el-button type="text" @click="askQuestion">
                <img class="second_nav_pic" src="../../static/images/ask_question.png" >
                sssssssss
              </el-button>

              <div></div>
              <div></div>
              <div></div>
            </div>
         </div>
        </el-col>

        <!--侧边栏-->
        <el-col :span="5">
          <div class="grid-content ">

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

        }
    },
    computed:{
      ...mapGetters({
        classifications:'getClassifications'
      })
    },
    methods:{
      askQuestion(){
        this.$prompt('请输入邮箱', '写下你的问题', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }
    },
    created(){
      this.$store.dispatch('changeShow','task_ground');
    }
  }
</script>

<style scoped>
.task_ground{width: 100%;
  height: 1000px;
  margin:0;
  padding-top: 30px;
  background-color: #f6f6f6;
  }
.grid-content {
  border-radius: 4px;
  min-height: 200px;
  background-color: antiquewhite;
}
  .second_nav{
    height: 60px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 3px #d1d1d1;
    background-color: white;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .second_nav_pic{
    width: 30px;
    height: 25px;
  }
</style>
