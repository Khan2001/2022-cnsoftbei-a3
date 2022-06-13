<template>
  <div class="chart-container">
    <chart
      v-if="data"
      :new-user-number="data && data.newUserNumber"
      :total-user-number="data && data.totalUserNumber"
      height="100%"
      width="100%"
    />
  </div>
</template>

<script>
import Chart from '@/components/Charts/MixChart'
import { userData } from '@/api/admin'

export default {
  name: 'MixChart',
  components: { Chart },
  data() {
    return {
      currentRole: 'adminDashboard',
      data: null
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const { data } = await userData()
      this.data = data
    }
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

