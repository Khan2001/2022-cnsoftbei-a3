<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="姓名" style="width: 200px;margin-right: 1%;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.role" placeholder="角色组" clearable class="filter-item" style="width: 130px;margin-right: 1%;">
        <el-option v-for="item in roleOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.IdOrder" style="width: 140px;margin-right: 1%;" class="filter-item" @change="handleFilter">
        <el-option v-for="item in IdOrderOptions" :key="item.key" :label="item.label" :value="item.key" />
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
      <el-table-column label="注册时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="用户名" width="80" />
      <el-table-column label="状态" class-name="status-col" width="80" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status === 1 ? 'success' : 'warning'">
            {{ row.status | statusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="warning" :disabled="row.status === 0" size="mini" @click="handleModifyStatus(row, 0)">
            封禁
          </el-button>
          <el-button :disabled="row.status === 1" size="mini" type="success" @click="handleModifyStatus(row, 1)">
            解封
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
import { getUserList, userStatus, userDelete } from '@/api/user'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const roleOptions = [
  { key: 'ROLE_admin', display_name: '管理员' },
  { key: 'ROLE_reader', display_name: '客户端用户' },
  { key: 'ROLE_editor', display_name: '新闻上传者' }
]

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '1': '可用',
        '0': '封禁'
      }
      return statusMap[status]
    },
    parseTime: parseTime
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      page: 2,
      listQuery: {
        IdOrder: 0,
        name: undefined,
        role: undefined
      },
      roleOptions,
      IdOrderOptions: [{ label: '序号升序', key: 0 }, { label: '序号降序', key: 1 }]
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
      const data = await getUserList(this.page, params)
      this.list = data.data
      this.total = data.userNumber
      this.listLoading = false
    },
    /* 搜索*/
    handleFilter() {
      this.page = 1
      this.getList()
    },
    async handleModifyStatus(row, type) {
      const { message } = await userStatus({ id: row.id, status: type })
      this.$notify({
        title: 'Success',
        message: message,
        type: 'success',
        duration: 2000
      })
      await this.getList()
    },
    async handleDelete(row, index) {
      const { message } = await userDelete({ id: row.id })
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
