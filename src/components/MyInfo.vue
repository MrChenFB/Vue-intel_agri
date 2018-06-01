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
              class="upload-demo"
              id="Container"
              ref="upload"
              action="//up-z2.qiniup.com"
              :data="form"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-change="handleTokenChange"
              :on-success="handleSuccess"
              :file-list="fileList"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button id="selectImage" style="margin-left: 10px;" size="small" type="success" @click="qiniuUpload">
                上传到服务器
              </el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="user_profile.birth">
            </el-date-picker>
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
              action="//up-z2.qiniup.com"
              :data="form"
              ref="uploadPage"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="changeFile"
              :on-success="handleAvatarSuccess">
              <img id="giftImg" v-if="imageView" :src="imageView" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-button  style="margin-left: 10px;" size="small" type="success" @click="qiniuUploadPage">
              上传到服务器
            </el-button>
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
            <div>
              <el-upload
                class="upload-demo"
                id="buttonContainer"
                ref="uploadTV"
                action="//up-z2.qiniup.com"
                :data="form"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-change="handleTokenChange"
                :on-success="handleSuccessVideo"
                :file-list="fileList"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button id="selectVideo" style="margin-left: 10px;" size="small" type="success" @click="qiniuUploadVideo">
                  上传到服务器
                </el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </div>
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
          <el-col :span="6" v-for="(v, index) in favs_list" :key="index" :offset="index > 0 ? 2 : 0">
            <el-card to="/video_player" :body-style="{ padding: '0px',}">
              <img :src="v.video.video_img" class="image classimg">
              <div style="padding: 14px;">
                <span> {{v.video.video_name}} </span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button" @click="delCollection(v.video.id)">删除收藏</el-button>
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

  export default {
    components: {},
    computed: {
      ...mapGetters({
        userInfo: 'getUserInfo'
      })
    },
    data() {
      return {
        form: {
          token: ''
        },
        qiniu_url: 'http://p71yd5lgg.bkt.clouddn.com/',
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
          birth: '',
        },
        imageView: '',
        uploadVideo: {
          video_name: '',
          video_des: '',
          video_img: '',
          video_kind: '',
          video_url: ''
        },
        video_rules: {},
        favs_list: {},
        rules: {
          name: [
            {message: '请输入活动名称', trigger: 'blur'},
          ],
          password: [
            {min: 6, message: '请输入长度正确的密码', trigger: 'change'}
          ],
        },
        options: [
          {value: 'plant', label: '种植业'},
          {value: 'aquaculture', label: '水产养殖业'},
          {value: 'agri_industry', label: '农资业'},
          {value: 'agri_and_sideline_industries', label: '农副加工业'},
          {value: 'animal', label: '畜牧业'}
        ],
        Sexoptions: [
          {value: 'male', label: '男'},
          {value: 'female', label: '女'}
        ]
      };
    },
//    components: { avatarImage },
    methods: {
      qiniuUpload() {
        this.$refs.upload.submit();
        return;
        var upLoader = Qiniu.uploader({
          runtimes: 'html5,flash,html4',      // 上传模式，依次退化
          browse_button: 'selectVideo',         // 上传选择的点选按钮，必需

          //   uptoken_url: 'http://118.24.116.137:8001/upload_video/',         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
          uptoken: '',
          get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
          // downtoken_url: '/downtoken',
          // Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
          // unique_names: true,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
          save_key: true,                  // 默认false。若在服务端生成uptoken的上传策略中指定了save_key，则开启，SDK在前端将不对key进行任何处理
          domain: 'p86yw163m.bkt.clouddn.com',     // bucket域名，下载资源时用到，必需
          container: 'buttonContainer',             // 上传区域DOM ID，默认是browser_button的父元素
          max_file_size: '2000mb',             // 最大文件体积限制
          flash_swf_url: '../utils/plupload/Moxie.swf',  //引入flash，相对路径
          max_retries: 3,                     // 上传失败最大重试次数
          dragdrop: true,                     // 开启可拖曳上传
          drop_element: 'videoContainer',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
          chunk_size: '4mb',                  // 分块上传时，每块的体积
          auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
          //x_vars : {
          //    查看自定义变量
          //    'time' : function(up,file) {
          //        var time = (new Date()).getTime();
          // do something with 'time'
          //        return time;
          //    },
          //    'size' : function(up,file) {
          //        var size = file.size;
          // do something with 'size'
          //        return size;
          //    }
          //}
          init: {
            'FilesAdded': function (up, files) {
              plupload.each(files, function (file) {
                // 文件添加进队列后，处理相关的事情
              });
            },
            'BeforeUpload': function (up, file) {
              // 每个文件上传前，处理相关的事情
            },
            'UploadProgress': function (up, file) {
              // 每个文件上传时，处理相关的事情
            },
            'FileUploaded': function (up, file, info) {
              // 每个文件上传成功后，处理相关的事情
              // 其中info是文件上传成功后，服务端返回的json，形式如：
              // {
              //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
              //    "key": "gogopher.jpg"
              //  }
              // 查看简单反馈
              var domain = up.getOption('domain')
              var res = parseJSON(info)
              var sourceLink = domain + "/" + res.key
              this.uploadVideo.video_url = sourceLink
              alert(sourceLink)
              //获取上传成功后的文件的Url
            },
            'Error': function (up, err, errTip) {
              //上传出错时，处理相关的事情
            },
            'UploadComplete': function () {
              //队列文件处理完毕后，处理相关的事情
            },
            'Key': function (up, file) {
              // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
              // 该配置必须要在unique_names: false，save_key: false时才生效
              var key = "";
              // do something with key here
              return key
            }
          }
        });
      },
      qiniuUploadPage() {
        this.$refs.uploadPage.submit();
      },
      qiniuUploadVideo() {
        this.$refs.uploadTV.submit();
      },
      handleSuccess(res, file, fileList) {
        this.user_profile.image = this.qiniu_url + res.key
        console.log(this.qiniu_url + res.key)
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

      handleTokenChange(file, filelist){
        var This = this
        this.$axios.get('http://118.24.116.137:8001/upload_video/')
          .then(res => {
            console.log(res)
            This.form.token = res.data.token
          }).catch(err => {
          console.log(err)
        })
      },
      beforeAvatarUpload(file) {
        console.log(file)
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

        var birth = new Date(this.user_profile.birth)
        var Y = birth.getFullYear() + '-';
        var M = (birth.getMonth() + 1 < 10 ? '0' + (birth.getMonth() + 1) : birth.getMonth() + 1) + '-';
        var D = birth.getDate();
        this.user_profile.birth = Y + M + D
        this.$axios.put('/re_user/' + id + '/', {
          'image': this.user_profile.image,
          'birth': this.user_profile.birth,
          'sex': this.user_profile.sex,
          'address': this.user_profile.address,
          'nick_name': this.user_profile.nick_name
        })
          .then((res) => {
            console.log(res)
            this.$store.state.userInfo.user_profile.image = res.data.image
        })
          .catch((res) => {
            console.log(res)
          })
      },
      UploadVideo() {
        console.log(this.uploadVideo)
        this.$axios.post('/video/', {
          'video_name': this.uploadVideo.video_name,
          'desc': this.uploadVideo.video_des,
          'video_img': this.uploadVideo.video_img,
          'video_kind': this.uploadVideo.video_kind,
          'video_url': this.uploadVideo.video_url
        })
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      handleSuccessVideo(res, file){
          this.uploadVideo.video_url = this.qiniu_url + res.key
      },
      getMyCollection() {
        this.$axios.get('/user_favs/')
          .then((res) => {
            console.log(res)
            this.favs_list = res.data
            console.log(this.favs_list.length);
            console.log(this.favs_list)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      delCollection(v_id) {
        this.$axios.delete('/user_favs/' + v_id)
          .then((res) => {
            this.$axios.get('/user_favs/')
              .then((res) => {
              })
              .catch((err) => {
              })
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      changeFile(file, fileList) {
        var This = this
        this.$axios.get('http://118.24.116.137:8001/upload_video/')
          .then(res => {
            console.log(res)
            This.form.token = res.data.token
            console.log(This.uploadVideo.img)
          }).catch(err => {
          console.log(err)
        })
        var reader = new FileReader();
        reader.readAsDataURL(file.raw);
        reader.onload = function (e) {
          this.result // 这个就是base64编码了
          This.imageView = this.result;
        }
      },
      handleAvatarSuccess(res, file) {
          this.uploadVideo.video_img = this.qiniu_url + res.key
      },
      changeFile2(file, fileList) {
        var This = this
        var reader = new FileReader()
        reader.readAsDataURL(file.raw)
        reader.onload = function (e) {
          this.result // 这个就是base64编码了
          This.imageView = this.result
        }
      },
      handleChange(file, fileList) {
        this.fileList3 = fileList.slice(-1);
      }
    }
  }
</script>

<style>
  /*.userInfo {*/

  /*.title_info {*/
  /*font-size: 100px;*/
  /*text-align: center;*/
  /*}*/

  /*}*/
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

  .classimg {
    width: 130px;
    height: 100px;
    text-align: center;
    margin: 15px;
  }
</style>
