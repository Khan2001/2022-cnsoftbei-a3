<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="标题" style="width: 200px;margin-right: 1%;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.typeId" placeholder="类型" clearable class="filter-item" style="width: 130px;margin-right: 1%;">
        <el-option v-for="item in roleOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.idOrder" style="width: 140px;margin-right: 1%;" class="filter-item" @change="handleFilter">
        <el-option v-for="item in idOrderOptions" :key="item.key" :label="item.label" :value="item.key" />
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
      highlight-current-row
      style="width: 100%;margin-top: 1%;"
    >
      <el-table-column
        label="编号"
        align="center"
        width="60"
        prop="index"
      >
        <template slot-scope="scope">
          {{ (scope.$index+1) }}
        </template>
      </el-table-column>
      <el-table-column label="id" prop="id" align="center">
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
          <span class="link-type" @click="edit(row)">{{ row.title }}</span>
          <el-tag>{{ row.typeId | typeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="阅读量" align="center" width="95">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.hitsNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分数" align="center">
        <template slot-scope="{row}">
          <span>{{ row.score }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="80" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status === 0 ? 'danger' : row.status === 1 ? 'success' : row.status === 2 ? 'info': ''">
            {{ row.status | statusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" :disabled="row.status === 0" size="mini" @click="edit(row)">
            编辑
          </el-button>
          <el-button :disabled="row.status === 0 || row.status === 3 || row.status === 1" size="mini" type="success" @click="release(row)">
            发布
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="page" @pagination="getList" />
  </div>
</template>

<script>
import { getArticleList, articleDelete, uploadArticle } from '@/api/editor'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const typeOptions = [
  { key: '1', display_name: '体育' },
  { key: '2', display_name: '娱乐' },
  { key: '3', display_name: '军事' },
  { key: '4', display_name: '国际' }
]

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
        '3': '待审',
        '2': '草稿',
        '1': '发布',
        '0': '封禁'
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
      idOrderOptions: [{ label: '序号升序', key: 0 }, { label: '序号降序', key: 1 }]
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
      this.list = data.data
      this.total = data.totalArticlesNumber
      this.listLoading = false
    },
    /* 搜索*/
    handleFilter() {
      this.page = 1
      this.getList()
    },
    async release(row) {
      const { message } = await uploadArticle({ id: row.id, typeId: row.typeId, status: 3 })
      this.$notify({
        title: 'Success',
        message: message,
        type: 'success',
        duration: 2000
      })
      await this.getList()
    },
    edit(row) {
      this.$router.push({ name: 'EditArticle', query: { id: row.id }})
    },
    async handleDelete(row) {
      const { message } = await articleDelete({ id: row.id })
      this.$notify({
        title: 'Success',
        message: message,
        type: 'success',
        duration: 2000
      })
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
