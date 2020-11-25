<template>
    <div class="login-container">
        <div class="login-form-wrap">
            <!-- logo -->
            <div class="login-head">
                <div class="logo"></div>
            </div>
            <!-- 内容部分 -->
            <el-form :rules = 'rules' class="login-form" ref="form" :model = 'form'>
                <!-- 手机号 -->
                <el-form-item prop = 'mobile' label="手机号">
                    <el-input v-model = 'form.mobile'></el-input>
                </el-form-item>
                <!-- 验证码 -->
                <el-form-item prop = 'code' label="验证码">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
                <!-- 同意条款 -->
                <el-form-item prop = 'agree'>
                <el-checkbox v-model="form.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <!-- 提交按钮 -->
                <el-form-item>
                <el-button type = 'primary' @click = 'lg'>登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>

<script>
import { reqUserLogin } from '@/api/user.js'

export default {
  name: 'login',
  data () {
    return {
      form: {
        mobile: '13911111111',
        code: '246810',
        agree: false
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
          { pattern: /^1\d{10}$/, message: '请输入正确手机号', trigger: ['blur', 'change'] }
        ],
        code: [
          { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
          { pattern: /^\d{6}$/, message: '请输入正确验证码', trigger: ['blur', 'change'] }
        ],
        agree: [
          {
            validator: function (rule, value, callback) {
              if (!value) {
                callback(new Error('请同意用户协议'))
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    lg () {
      this.$refs.form.validate(flag => {
        if (!flag) return
        reqUserLogin(this.form.mobile, this.form.code).then(res => {
          console.log('登录成功', res)
          this.$message.success('登录成功')
        }).catch(err => {
          console.log('登录失败', err)
          this.$message.error('登录失败')
        })
      })
    }
  }
}
</script>

<style lang="less">
// 铺满整屏
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  background: url("../../assets/login_bg.jpg") no-repeat;
  background-size: cover;
  .login-form-wrap {
    min-width: 300px;
    padding: 30px 50px 10px;
    background-color: #fff;
    .login-head {
      display: flex;
      justify-content: center;
      .logo {
        width: 200px;
        height: 57px;
        background: url("../../assets/logo_index.png") no-repeat;
        background-size: contain;
      }
    }
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
