<template>
  <el-row class="el-main">
    <el-col :span="4" :offset="5">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
      >
        <el-menu-item index="1" @click="ToInfo">
          <i class="el-icon-document"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item index="2" @click="ToUploadVideo">
          <i class="el-icon-edit"></i>
          <span slot="title">视频上传</span>
        </el-menu-item>
        <el-menu-item index="3" @click="ToUploadDoc">
          <i class="el-icon-setting"></i>
          <span slot="title">文档上传</span>
        </el-menu-item>
        <el-menu-item index="4" @click="ToUploadTest">
          <i class="el-icon-setting"></i>
          <span slot="title">试题上传</span>
        </el-menu-item>
        <el-menu-item index="5" @click="ToMyCollection">
          <i class="el-icon-star-on"></i>
          <span slot="title">视频收藏</span>
        </el-menu-item>
        <el-menu-item index="6" @click="ToMyCollectionDoc">
          <i class="el-icon-star-on"></i>
          <span slot="title">文章收藏</span>
        </el-menu-item>

      </el-menu>
    </el-col>
    <el-col :span="8" :offset="1">
      <div class="userInfo" v-if="showUserInfo">
        <el-form :model="user_profile" :rules="rules" ref="user_profile" label-width="100px" class="demo-ruleForm">
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :auto-upload="false"
              :on-change="changeFile2">
              <img id="infoImg" v-if="user_profile.image" :src="user_profile.image" class="avatar">
              <!--<el-button v-else slot="trigger" size="small" type="primary">选取文件</el-button>-->
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <!--<el-button>确认提交</el-button>-->
          </el-form-item>
          <el-form-item label="出生日期">
            <div class="block">
              <el-date-picker
                v-model="user_profile.birth"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="user_profile.sex" placeholder="请选择">
              <el-option
                v-for="item in Sexoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户地址" prop="address">
            <el-input type="textarea" v-model="user_profile.address"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="name">
            <el-input v-model="user_profile.nick_name"></el-input>
          </el-form-item>
          <template>
            <avatarImage></avatarImage>
          </template>


          <el-form-item>
            <el-button type="primary" @click="uploadMyInfo">立即更新</el-button>
            <!--<el-button @click="resetForm('user_profile')">重置</el-button>-->
          </el-form-item>
        </el-form>
      </div>

      <div class="uploadVideo" v-if="showUploadVideo">
        <el-form :model="uploadVideo" :rules="rules" ref="uploadVideo" label-width="100px" class="demo-ruleForm">
          <el-form-item label="视频名称" prop="name" required>
            <el-input v-model="uploadVideo.video_name"></el-input>
          </el-form-item>
          <el-form-item label="视频描述" prop="des" required>
            <el-input type="textarea" v-model="uploadVideo.video_des"></el-input>

          </el-form-item>
          <el-form-item label="视频封面" required>
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :auto-upload="false"
              :on-change="changeFile">
              <img id="giftImg" v-if="uploadVideo.video_img" :src="uploadVideo.video_img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <!--<el-upload-->
              <!--class="avatar-uploader"-->
              <!--:show-file-list="false"-->
              <!--:on-success="handleAvatarSuccess"-->
              <!--:before-upload="beforeAvatarUpload">-->
              <!--<img v-if="uploadVideo.video_url" :src="uploadVideo.video_url" class="avatar">-->
              <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
            <!--</el-upload>-->
            <!--<el-input type="file" v-model="uploadVideo.video_url"></el-input>-->
          </el-form-item>
          <el-form-item label="视频类别" prop="kind" required>
            <el-select v-model="uploadVideo.video_kind" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="视频地址" prop="url" required>
            <el-upload
              class="upload-demo"
              drag
              action=""
              multiple
              v-model="uploadVideo.video_url">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="UploadVideo">立即上传</el-button>
            <!--<el-button @click="resetForm('uploadVideo')">重置</el-button>-->
          </el-form-item>
        </el-form>
      </div>

      <div class="uploadDoc" v-if="showUploadDoc">

      </div>

      <div class="myCollection" v-if="showMyCollection">
        <img v-if="favs_list.length===0" src="../assets/timg.jpg"/>
        <el-row>
          <el-col :span="8" v-for="(vo, index) in favs_list.results" :key="index" :offset="index > 0 ? 4 : 0">
            <el-card to="/video_player" :body-style="{ padding: '0px' }">
              <img src="../assets/hamburge.png" class="image">
              <div style="padding: 14px;">
                <span> {{}} </span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <el-button type="text" class="button" @click="delCollection">删除收藏</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>


<script>
  import {mapGetters} from 'vuex'
  import avatarImage from './ImageCropper/index'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  import ElInput from "../../node_modules/element-ui/packages/input/src/input";
  import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item";
  export default {
    components: {
      ElFormItem,
      ElInput,
      ElButton},
    data() {
      return {
        image_src: '../assets/timg.jpg',
        currentDate: new Date(),
        showUserInfo: true,
        showUploadVideo: false,
        showUploadDoc: false,
        showMyCollection: false,
        user_profile: {
          nick_name: '',
          image: '',
          sex: '',
          address: '',
          birth: ''
        },
        uploadVideo: {
          video_name: '',
          video_des: '',
          video_img: '',
          video_kind: '',
          video_url: ''
        },
        video_rules :{

        },
        favs_list: {},
        rules: {
          name: [
            { message: '请输入活动名称', trigger: 'blur'},
          ],
          password: [
            {min: 6, message: '请输入长度正确的密码', trigger: 'change'}
          ],
        },
        options: [{
          value: 'plant',
          label: '种植业'
        }, {
          value: 'aquaculture',
          label: '水产养殖业'
        }, {
          value: 'agri_industry',
          label: '农资业'
        }, {
          value: 'agri_and_sideline_industries',
          label: '农副加工业'
        }, {
          value: 'animal',
          label: '畜牧业'
        }],
        Sexoptions: [{
            value: '男',
            label: '男',
        },
          {
            value: '女',
            label: '女',
          }]
      };
    },
//    components: { avatarImage },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      ToInfo() {
        this.showUploadVideo = false
        this.showUploadDoc = false
        this.showMyCollection = false
        this.showUserInfo = true
      },
      ToUploadVideo() {
        this.showUserInfo = false
        this.showUploadDoc = false
        this.showMyCollection = false
        this.showUploadVideo = true
      },
      ToUploadDoc() {
        this.showUserInfo = false
        this.showUploadVideo = false
        this.showMyCollection = false
        this.showUploadDoc = true

      },
      ToMyCollection() {
        this.showUserInfo = false
        this.showUploadVideo = false
        this.showUploadDoc = false
        this.showMyCollection = true
        this.getMyCollection()
      },
      ToUploadTest() {
        this.showUserInfo = false
        this.showUploadVideo = false
        this.showMyCollection = false
        this.showUploadDoc = true

      },
      handleAvatarSuccess(res, file) {
        this.user_profile.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';

        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG || isPNG) {
          this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return (isJPG || isPNG) && isLt2M;
      },
      uploadMyInfo() {
        var id = this.$store.state.userInfo.id
        alert(id)
        this.$axios.put('/user/'+id, {
          'user_profile': this.user_profile
        })
          .then((res) => {

          })
          .catch((res) => {

          })

      },
      UploadVideo() {
        this.$axios.post('/video/',{
            'video_name': this.uploadVideo.video_name,
            'desc': this.uploadVideo.video_des,
            'video_img': this.uploadVideo.video_img,
            'video_kind': this.uploadVideo.video_kind,
            'url': this.uploadVideo.video_url
        })
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      uploadDoc() {

      },
      getMyCollection() {
        this.$axios.get('/user_favs/')
          .then((res) => {
            console.log(res)
            this.favs_list = res.data
            console.log(this.favs_list.length);


          })
          .catch((err) => {
            console.log(err)
          })
      },
      changeFile(file, fileList) {
        var This = this;
        //this.imageUrl = URL.createObjectURL(file.raw);
        var reader = new FileReader();
        reader.readAsDataURL(file.raw);
        reader.onload = function(e){
          this.result // 这个就是base64编码了
          This.uploadVideo.video_img = this.result;
        }
      },
      changeFile2(file, fileList) {
        var This = this;
        //this.imageUrl = URL.createObjectURL(file.raw);
        var reader = new FileReader();
        reader.readAsDataURL(file.raw);
        reader.onload = function(e){
          this.result // 这个就是base64编码了
          This.user_profile.image = this.result;
        }
      },

    }
  }
</script>

<style>
  .userInfo {

  .title_info {
    font-size: 100px;
    text-align: center;
  }

  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
