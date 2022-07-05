<template>
  <div class="chart-container">
    <chart
      v-if="data"
      :new-users-number="data && data.newUsersNumber.reverse()"
      :total-users-number="data && data.totalUsersNumber.reverse()"
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

