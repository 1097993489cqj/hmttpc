<template>
<div class="login-wrap">
<!-- <input v-validate="'required|phone'" name="phone" type="text">
<span>{{ errors.first('phone') }}</span> -->
  <van-nav-bar title="首页" />
  <form action="/" method="POST">
    <van-cell-group>
      <van-field :error-message=" errors.first('phone') "
       v-validate="'required|phone'" name="phone"
      v-model="user.mobile" required clearable label="手机号"  placeholder="请输入手机号"  />
      <van-field v-model="user.code" type="password" label="密码" placeholder="请输入密码" required />
    </van-cell-group>
    <van-button
    :loading="loginLoading"
    type="info" block @click="handleLogin">登录</van-button>
  </form>
</div>
</template>

<script>
import { mapMutations } from 'vuex'
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '18801185985',
        code: '246810'
      },
      loginLoading: false
    }
  },
  methods: {
    // 在methods中有setUser方法
    ...mapMutations(['setUser']),
    async handleLogin () {
      this.loginLoading = true
      try {
        // 验证规则是否通过
        const valid = await this.$validator.validate()
        //  .then(async valid => {
        // 如果验证没通过
        if (!valid) {
          console.log('error---')
          this.loginLoading = true

          return
        }
        // 验证通过
        const data = await login(this.user)
        // console.log(data)
        this.$store.comit('setUser', data)
        this.loginLoading = false

        // 进入tabbar组件
        this.$router.push({
          path: '/'
        })
      } catch (error) {
        this.loginLoading = false
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>

// token
// 1.保存token->localStorage
