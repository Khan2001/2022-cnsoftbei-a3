<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-top:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'

const lineChartData = {
  newUsers: {
    totalData: [100, 120, 161, 134, 105, 160, 165],
    newData: [120, 82, 91, 154, 162, 140, 145]
  },
  totalUsers: {
    totalData: [200, 192, 120, 144, 160, 130, 140],
    newData: [180, 160, 151, 106, 145, 150, 130]
  },
  newArticles: {
    totalData: [80, 100, 121, 104, 105, 90, 100],
    newData: [120, 90, 100, 138, 142, 130, 130]
  },
  totalArticles: {
    totalData: [130, 140, 141, 142, 145, 150, 160],
    newData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      lineChartData: lineChartData.newUsers
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
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
