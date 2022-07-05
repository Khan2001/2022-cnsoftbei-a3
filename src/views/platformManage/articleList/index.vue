<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="标题" style="width: 200px;margin-right: 1%;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.typeId" placeholder="类型" clearable class="filter-item" style="width: 130px;margin-right: 1%;">
        <el-option v-for="item in typeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.idOrder" style="width: 140px;margin-right: 1%;" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-top: 1%;"
    >
      <el-table-column
        label="编号"
        align="center"
        width="60"
      >
        <template slot-scope="scope">
          {{ (scope.$index+1) }}
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="170">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.date | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="details(row)">{{ row.title }}</span>
          <el-tag>{{ row.typeId | typeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="作者" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="阅读量" align="center" width="95">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.hitsNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="80" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status === 0 ? 'danger' : row.status === 1 ? 'success' : 'warning'">
            {{ row.status | statusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="280" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="details(row)">
            详情
          </el-button>
          <el-button :disabled="row.status=='1'" size="mini" type="success" @click="handleModifyStatus(row,'1')">
            发布
          </el-button>
          <el-button :disabled="row.status=='0'" type="warning" size="mini" plain @click="handleModifyStatus(row,'0')">
            封禁
          </el-button>
          <el-button v-if="row.status!='删除'" size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="page" @pagination="getList" />

    <el-dialog title="文章详情" width="80%" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 650px; margin-left:50px;">
        <el-form-item label="类型" prop="type">
          <el-select v-model="temp.typeId" class="filter-item" placeholder="请选择">
            <el-option v-for="item in typeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" disabled />
        </el-form-item>
        <el-form-item label="内容" prop="title">
          <el-input v-model="temp.content" disabled type="textarea" :rows="6" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData()">
          保存
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getArticleList, getArticleContent, articleTypeChange, articleStatusChange, articleDelete } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'

const typeOptions = [
  { key: '1', display_name: '体育' },
  { key: '2', display_name: '娱乐' },
  { key: '3', display_name: '家居' },
  { key: '4', display_name: '房产' },
  { key: '5', display_name: '教育' },
  { key: '6', display_name: '时尚' },
  { key: '7', display_name: '时政' },
  { key: '8', display_name: '游戏' },
  { key: '9', display_name: '科技' },
  { key: '10', display_name: '财经' }
]
// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = typeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '0': '封禁',
        '1': '发布',
        '2': '草稿',
        '3': '待审'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    },
    parseTime: parseTime
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      page: 1,
      listQuery: {
        idOrder: 0,
        title: undefined,
        typeId: undefined
      },
      typeOptions,
      sortOptions: [{ label: '序号升序', key: 0 }, { label: '序号降序', key: 1 }],
      temp: {
        id: undefined,
        content: '',
        title: '',
        typeId: '',
        typeName: ''
      },
      dialogFormVisible: false,
      dialogPvVisible: false,
      pvData: [],
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const params = {}
      this.listQuery = this.$omitBy(Object.assign(params, this.listQuery))
      const data = await getArticleList(this.page, params)
      this.list = data.data.articles
      this.total = data.data.totalArticlesNumber
      this.listLoading = false
    },
    handleFilter() {
      this.page = 1
      this.getList()
    },
    async handleModifyStatus(row, status) {
      const data = await articleStatusChange({ id: row.id, status: status })
      if (data.success) {
        this.$notify({
          title: 'Success',
          message: data.message,
          type: 'success',
          duration: 2000
        })
      } else {
        this.$notify({
          title: '错误',
          message: data.message,
          type: 'error',
          duration: 2000
        })
      }
      await this.getList()
    },
    async details(row) {
      const { data } = await getArticleContent({ id: row.id })
      const typeName = ['体育', '娱乐', '家居', '房产', '教育', '时尚', '时政', '游戏', '科技', '财经']
      this.temp = {
        id: row.id,
        title: data.title,
        typeId: row.typeId.toString(),
        typeName: typeName[row.typeId],
        content: data.content
      }
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    async updateData() {
      const data = await articleTypeChange({ id: this.temp.id, typeId: this.temp.typeId })
      if (data.success) {
        this.$notify({
          title: 'Success',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      } else {
        this.$notify({
          title: '错误',
          message: data.message,
          type: 'error',
          duration: 2000
        })
      }
      this.dialogFormVisible = false
      await this.getList()
    },
    async handleDelete(row) {
      const data = await articleDelete({ id: row.id })
      if (data.success) {
        this.$notify({
          title: 'Success',
          message: data.message,
          type: 'success',
          duration: 2000
        })
      } else {
        this.$notify({
          title: '错误',
          message: data.message,
          type: 'error',
          duration: 2000
        })
      }
      await this.getList()
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
