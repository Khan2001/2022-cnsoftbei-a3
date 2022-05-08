<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>名片</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>欢迎！</div>
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">昵称：{{ user.name }}</div>
        <div class="user-role text-center text-muted">身份组：{{ user.role }}</div>
        <div class="user-id text-center text-muted">ID：{{ user.id }}</div>
        <div class="user-date text-center text-muted">注册日期：{{ user.date }}</div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'

export default {
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          role: '',
          id: '',
          date: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  // .user-name {
  //   font-weight: bold;
  // }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .user-id {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .user-date {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
