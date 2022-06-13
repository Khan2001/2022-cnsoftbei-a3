<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart
            v-if="pie"
            :type="pie && pie.type"
            :article-number="pie && pie.articleNumber"
          />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart v-if="bar" :bar="bar" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import { articleData } from '@/api/admin'

export default {
  name: 'DashboardAdmin',
  components: {
    PieChart,
    BarChart
  },
  data() {
    return {
      pie: null,
      bar: null
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const { data } = await articleData()
      this.pie = data.pie
      this.bar = data.bar
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
