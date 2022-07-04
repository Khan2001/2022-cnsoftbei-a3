<template>
  <div class="dashboard-editor-container">

    <panel-group
      :user-number="total.userNumber"
      :article-number="total.articleNumber"
      :day-article-number="total.dayArticleNumber"
      :day-user-number="total.dayUserNumber"
      @handleSetLineChartData="handleSetLineChartData"
    />

    <el-row style="background:#fff;padding:16px 16px 0;margin-top:32px;">
      <line-chart ref="chart" :chart-data="lineChartData" />
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getInfo } from '@/api/user'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      lineChartData: {},
      total: {}
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  created() {
    this.getLineChartData()
  },
  methods: {
    async getLineChartData() {
      const { data } = await getInfo(this.token)
      this.LineChartData = {
        newUsers: {
          newData: data.newUsers,
          totalData: data.totalUsers
        },
        totalUsers: {
          newData: data.newUsers,
          totalData: data.totalUsers
        },
        newArticles: {
          newData: data.newArticles,
          totalData: data.totalArticles
        },
        totalArticles: {
          newData: data.newArticles,
          totalData: data.totalArticles
        }
      }
      this.total = {
        userNumber: data.totalUsersNumber,
        articleNumber: data.totalArticlesNumber,
        dayArticleNumber: data.newArticlesNumber,
        dayUserNumber: data.newUsersNumber
      }
      this.$refs.chart.initChart(this.LineChartData.newUsers)
    },
    handleSetLineChartData(type) {
      this.$refs.chart.initChart(this.LineChartData[type])
    }
  }
}

</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 70px;
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
