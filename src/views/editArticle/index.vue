<template>
  <div class="components-container">
    <div>
      <tinymce v-model="content" :height="300" />
    </div>
    <el-row class="panel">
      <el-col :span="16">
        <el-row>
          <el-col :span="16">
            <el-row>
              <el-col :span="3" style="padding-left: 10px;">标题</el-col>
              <el-col :span="21">
                <el-input
                placeholder="请输入标题"
                v-model="title">
              </el-input></el-col>
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
import { getArticleContent, uploadArticle } from '@/api/editor'

const typeOptions = [
  { key: '1', display_name: '体育' },
  { key: '2', display_name: '娱乐' },
  { key: '3', display_name: '军事' },
  { key: '4', display_name: '国际' }
]
export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      id: this.$route.query.id,
      typeId: undefined,
      title: undefined,
      content:
      `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><ul>
        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      </ul>`,
      typeOptions
    }
  },
  created() {
    if (this.id) {
      this.getArticleContent()
    }
  },
  methods: {
    async getArticleContent(id) {
      const { data } = await getArticleContent(id)
      console.log(data)
      this.content = data.content
      this.typeId = data.type.typeId
      this.title = data.title
    },
    async save() {
      const params = {}
      this.$omitBy(Object.assign(params, { title: this.title, id: this.id, content: this.content, typeId: this.typeId, status: 2 }))
      const { message } = await uploadArticle(params)
      this.$notify({
        title: 'Success',
        message: message,
        type: 'success',
        duration: 2000
      })
    },
    async release() {
      const params = {}
      this.$omitBy(Object.assign(params, { title: this.title, id: this.id, content: this.content, typeId: this.typeId, status: 3 }))
      const { message } = await uploadArticle(params)
      this.$notify({
        title: 'Success',
        message: message,
        type: 'success',
        duration: 2000
      })
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

