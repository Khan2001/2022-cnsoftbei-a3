<template>
  <div class="components-container">
    <div>
      <tinymce v-model="content" :height="300" />
    </div>
    <el-row class="panel">
      <el-col :span="16">
        <el-upload
          ref="upload"
          class="upload-demo"
          action="#"
          :http-request="update"
          accept=".doc,.docx,.txt"
          :limit="1"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">上传已有文章</el-button>
        </el-upload>
      </el-col>
    </el-row>
    <el-row class="panel">
      <el-col :span="16">
        <el-row>
          <el-col :span="16">
            <el-row>
              <el-col :span="3" style="padding-left: 10px;">标题</el-col>
              <el-col :span="21">
                <el-input v-model="title" placeholder="请输入标题" />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8" style="padding-left: 10px;">
            <el-select v-model="typeId" placeholder="类型" clearable class="filter-item" style="width: 130px;margin-right: 1%;">
              <el-option v-for="item in typeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8" style="text-align: right;">
        <el-button type="info" @click="save">存草稿</el-button>
        <el-button type="primary" @click="release">发布</el-button>
      </el-col>
    </el-row>
    <div class="editor-content" v-html="content" />
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { getArticleContent, uploadArticle, uploadArticleFile } from '@/api/editor'
import { getToken } from '@/utils/auth'

const typeOptions = [
  { key: 1, display_name: '体育' },
  { key: 2, display_name: '娱乐' },
  { key: 3, display_name: '家居' },
  { key: 4, display_name: '房产' },
  { key: 5, display_name: '教育' },
  { key: 6, display_name: '时尚' },
  { key: 7, display_name: '时政' },
  { key: 8, display_name: '游戏' },
  { key: 9, display_name: '科技' },
  { key: 10, display_name: '财经' }
]
export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      headers: {
        token: getToken()
      },
      id: this.$route.query.id,
      typeId: undefined,
      title: undefined,
      fileList: [],
      content:
      `<p>在这里编辑内容</p>`,
      typeOptions
    }
  },
  created() {
    if (this.id) {
      this.getContent(this.id)
    }
  },
  methods: {
    async update(file) {
      const fmData = new FormData()
      fmData.append('file', file.file)
      fmData.append('typeId', this.typeId)
      fmData.append('title', this.title)
      fmData.append('status', 3)
      await uploadArticleFile(fmData)
      this.$message.success('上传成功!')
    },
    async getContent(id) {
      const { data } = await getArticleContent({ id: id })
      const typeName = ['体育', '娱乐', '家居', '房产', '教育', '时尚', '时政', '游戏', '科技', '财经']
      this.content = data.content
      this.typeId = data.typeId
      this.typeName = typeName[data.typeId]
      this.title = data.title
    },
    async save() {
      if (this.$refs.upload.uploadFiles.length > 0) {
        this.$refs.upload.submit()
        return
      }
      const params = {}
      this.$omitBy(Object.assign(params, { title: this.title, id: this.id, content: this.content, typeId: this.typeId, status: 2 }))
      const { message } = await uploadArticle({
        'content': this.content,
        'typeId': this.typeId,
        'title': this.title,
        'status': 2
      })
      this.$notify({
        title: 'Success',
        message: message,
        type: 'success',
        duration: 2000
      })
    },
    async release() {
      if (this.$refs.upload.uploadFiles.length > 0) {
        this.$refs.upload.submit()
        return
      }
      const params = {}
      this.$omitBy(Object.assign(params, { title: this.title, id: this.id, content: this.content, typeId: this.typeId, status: 3 }))
      const { message } = await uploadArticle({
        'content': this.content,
        'typeId': this.typeId,
        'title': this.title,
        'status': 3
      })
      this.$notify({
        title: 'Success',
        message: message,
        type: 'success',
        duration: 2000
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style scoped>
.components-container{
  margin: 2%;
}
.editor-content{
  margin-top: 20px;
}
.panel{
  line-height: 50px;
  width: 100%;
  flex-direction: row-reverse;
  margin-top: 10px;
  padding: 5px;
  border: 1px solid #c5c5c5;
  box-shadow: 0 1px 2px rgb(0 0 0 / 20%);
}
.panel .btn{
  margin-left: 20px;
}
</style>

