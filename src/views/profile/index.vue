<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="详细资料" name="account">
                <account :user="user" @get-user="getUser" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { UserCard, Account },
  data() {
    return {
      user: {},
      activeTab: 'account'
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'avatar',
      'roles',
      'id',
      'date'
    ])
  },
  async created() {
    await this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.username,
        role: this.roles,
        avatar: this.avatar,
        id: this.id,
        password: '',
        date: this.date
      }
    }
  }
}
</script>
