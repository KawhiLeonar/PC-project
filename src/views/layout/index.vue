<template>
  <div class="layout-container">
    <el-container>
      <!-- 1.侧边栏 -->
      <el-aside :width="isCollapse ? '64px': '200px'">
        <!-- 1.1logo部分 -->
        <div class="logo" :class="{minLogo: isCollapse}"></div>
        <!-- 1.2菜单栏 -->
        <div>
          <el-menu
            router
            :collapse-transition = 'false'
            :collapse = 'isCollapse'
            background-color="#002033"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="/" >
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/articles">
              <i class="el-icon-document"></i>
              <span slot="title">内容管理</span>
            </el-menu-item>
            <el-menu-item index="/pictures">
              <i class="el-icon-picture-outline"></i>
              <span slot="title">素材管理</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-position"></i>
              <span slot="title">发布文章</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-chat-dot-round"></i>
              <span slot="title">评论管理</span>
            </el-menu-item>
            <el-menu-item index="6">
              <i class="el-icon-user-solid"></i>
              <span slot="title">粉丝管理</span>
            </el-menu-item>
            <el-menu-item index="7">
              <i class="el-icon-setting"></i>
              <span slot="title">个人设置</span>
            </el-menu-item>
          </el-menu>

        </div>
      </el-aside>
      <el-container>
        <!-- 2.右上 -->
        <el-header>
          <div @click = 'toggleMenu' class="left">
            <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
            <span>江苏传智播客科技教育有限公司</span>
          </div>
          <div class="right">
            <el-dropdown>
              <div class="avatar-wrap">
                <img class="avatar" :src="user.photo" alt="">
                <span>{{user.name}}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <!-- 3.内容部分 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { reqUserProfile } from '@/api/user.js'
import { delUser } from '@/utils/storage.js'
export default {
  name: 'Layout',
  data () {
    return {
      isCollapse: false,
      user: {}
    }
  },
  created () {
    reqUserProfile().then(res => {
      this.user = res.data.data
    })
  },
  methods: {
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    },
    logout () {
      // console.log('我要退出了')
      this.$confirm('确认要退出本系统嘛？', '温馨提示', {
        type: 'warning'
      }).then(() => {
        delUser()
        this.$router.push('/login')
      }).catch(() => {
        console.log('已取消')
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .layout-container {
    position: fixed;
    width: 100%;
    height: 100%;
    .el-container {
      width: 100%;
      height: 100%;
    }
    .el-aside {
      background-color: #002033;
      .el-menu {
        border-right: none;
      }
      .logo {
        width: 100%;
        height: 60px;
        background: #002244 url(~@/assets/logo_admin.png) no-repeat center;
        background-size: 140px auto;
      }
      .minLogo{
        background-image: url(../../assets/logo_admin_01.png);
        background-size: 36px auto;
      }
    }
    .el-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      .avatar-wrap {
        display: flex;
        align-items: center;
        cursor: pointer;
        .avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
    }
    .el-main {
      background-color: #e9eef3;
    }
  }
</style>
