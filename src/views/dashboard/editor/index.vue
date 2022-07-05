<template>
  <div class="dashboard-editor-container">

    <panel-group
      :likes-number="total && total.likesNumber"
      :hits-number="total && total.hitsNumber"
      :comments-number="total && total.commentsNumber"
      @handleSetLineChartData="handleSetLineChartData"
    />

    <el-row style="background:#fff;padding:16px 16px 0;margin-top:32px;">
      <line-chart v-if="data.hits" :chart-data="lineChartData" />
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'

import { editorInfo } from '@/api/editor'
export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      lineChartData: {},
      data: {
        hits: {},
        likes: {},
        comments: {}
      },
      total: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const { data } = await editorInfo()
      this.data.hits = {
        newData: data.newHitsData.reverse(),
        totalData: data.totalHitsData.reverse()
      }
      this.data.comments = {
        newData: data.newCommentsData.reverse(),
        totalData: data.totalCommentsData.reverse()
      }
      this.data.likes = {
        newData: data.newLikesData.reverse(),
        totalData: data.totalLikesData.reverse()
      }
      this.total = {
        hitsNumber: data.hitsNumber,
        likesNumber: data.likesNumber,
        commentsNumber: data.commentsNumber
      }
      this.handleSetLineChartData('hits')
    },
    handleSetLineChartData(type) {
      this.lineChartData = this.data[type]
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
