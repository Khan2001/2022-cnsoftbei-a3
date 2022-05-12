<template>
  <el-form>
    <el-form-item label="用户名">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model.trim="user.name" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">保存</el-button>
    </el-form-item>

    <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">
      修改头像
    </el-button>
    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      url="https://httpbin.org/post"
      lang-type="en"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
  </el-form>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'

export default {
  name: 'AvatarUpload',
  components: { ImageCropper },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          password: ''
        }
      }
    }
  },
  data() {
    return {
      imagecropperShow: false, // 上传弹框组件是否显示
      imagecropperKey: 0, // 上传组件key值,用来初始化组件
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'// 默认绑定的图片
    }
  },
  methods: {
    submit() {
      this.$message({
        message: '用户资料已更新',
        type: 'success',
        duration: 5 * 1000
      })
    },
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.files.avatar
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>
