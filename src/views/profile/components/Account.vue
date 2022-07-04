<template>
  <el-form>
    <el-form-item label="用户名">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model.trim="user.password" type="password" />
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
      url="/index/avatar"
      lang-type="en"
      @close="close"
      @crop-success="returnImg"
      @crop-upload-success="cropSuccess"
    />
  </el-form>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import { updateInfo } from '@/api/user'
import store from '@/store'

export default {
  name: 'AvatarUpload',
  components: { ImageCropper },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
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
    async submit() {
      if (this.user.name === '') {
        this.$message.error('用户名不能为空')
        return
      }
      const { message } = await updateInfo({
        username: this.user.name,
        password: this.user.password
      })
      this.$emit('get-user')
      this.$message.success(message)
    },
    async cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      if (resData.success) {
        this.$message.success('修改成功！')
        await store.dispatch('user/getInfo')
      }
      this.$emit('get-user')
    },
    async returnImg(res) {
      /* const index = res.indexOf(',')
      const img = res.substr(index + 1, res.length) */

      // const { data } = await updateAvatar({
      //   avatar: img
      // })
      // console.log(data)
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>
