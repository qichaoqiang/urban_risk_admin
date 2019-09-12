<template>
  <div class="authorizationPage">
  </div>
</template>
<script>
import { Toast } from 'vant'
import api from '@/api/api'
import qs from 'qs'
import sa from 'sa-sdk-javascript'
export default {
  data () {
    return {
    }
  },
  created () {
    if (this.$route.query.code) {
      let params = {
        code: this.$route.query.code
      }
      let paramsString = qs.stringify(params)
      api.weixinAuthLogin(paramsString).then(res => {
        console.log(res)
        if (res.code === 0) {
          if (res.data.tokenType === 'auth_bind') {
            this.$router.push('/phoneAuthentication?authKey=' + res.data.token)
          } else if (res.data.tokenType === 'login') {
            sa.login(res.data.uid)
            Toast('登录成功')
            this.$store.dispatch('save_token', res.data.token)
            if (localStorage.getItem('jumpUrl')) {
              if (JSON.parse(localStorage.getItem('jumpUrl')).query.id) {
                this.$router.push({
                  path: JSON.parse(localStorage.getItem('jumpUrl')).path,
                  query: {
                    id: JSON.parse(localStorage.getItem('jumpUrl')).query.id,
                    load: 'loaded'
                  }
                })
              } else if (JSON.parse(localStorage.getItem('jumpUrl')).query.userId) {
                this.$router.push({
                  path: JSON.parse(localStorage.getItem('jumpUrl')).path,
                  query: {
                    userId: JSON.parse(localStorage.getItem('jumpUrl')).query.userId,
                    load: 'loaded'
                  }
                })
              }
            }
          }
        }
      })
    }
  }
}
</script>
