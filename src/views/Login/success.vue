<template>
    <div class="success-h5">
        <div class="header">
            <div class="headerContent">
                <div class="steps">
                    <div class="number one">
                        <img src="@/assets/global/ic_stepdone.png" alt="" srcset="">
                    </div>
                    <span class="acitve">注册账号</span>
                </div>
                <div class="steps">
                    <div class="number one two_success">
                        <img src="@/assets/global/ic_stepdone.png" alt="" srcset="">
                    </div>
                    <span class="acitve">认领企业</span>
                </div>
                <div class="steps">
                    <div class="number one"><img src="@/assets/global/ic_stepdone.png" alt="" srcset=""></div>
                    <span class="acitve">提交资质</span>
                </div>
            </div>
        </div>
        <div class="success-content" v-show="status == '102'">
            <img style="display: block;width: 120px;height: 120px;margin-bottom: 16px;" src="@/assets/global/img_page_complete.png" alt="">
            <h4 style="display: block;margin-bottom: 8px;font-size: 16px;color: rgba(0,0,0,0.87);">商家入驻申请提交成功</h4>
            <span style="font-size: 12px;color: rgba(0,0,0,0.38);">2～3个工作日后将通知您审核结果</span>
        </div>
        <div class="success-content" v-show="status == '103'">
            <img style="display: block;width: 120px;height: 120px;margin-bottom: 16px;" src="@/assets/global/img_page_complete.png" alt="">
            <h4 style="display: block;margin-bottom: 8px;font-size: 16px;color: rgba(0,0,0,0.87);">商家入驻审核通过</h4>
            <span style="font-size: 12px;color: rgba(0,0,0,0.38);">请登录商户后台管理网站管理你的商户信息</span>
        </div>
        <div class="success-content" v-show="status == '999'">
            <img style="display: block;width: 120px;height: 120px;margin-bottom: 16px;" src="@/assets/global/img_page_failed.png" alt="">
            <h4 style="display: block;margin-bottom: 8px;font-size: 16px;color: rgba(0,0,0,0.87);">商家入驻申请审核失败</h4>
            <span style="font-size: 12px;color: rgba(0,0,0,0.38);">失败原因：{{failCause}}</span>
            <span style="font-size: 12px;color: rgba(0,0,0,0.38);display: block;margin-top: 8px;">请重新提交，感谢您的合作</span>
            <span class="goSearch" @click="goSearch">重新提交</span>
        </div>
    </div>
</template>

<script>
import api from '@/api/apiH5'
export default {
  name: 'success-h5',
  data(){
    return{
        status: '102',
        failCause: '因商家提供资料与实际不符，审核失败'
    }
  },
  created(){
    let status = this.$route.query.status
    api.getCertificationStatus().then(res => {
        console.log(res)
        if(res.code == 0){
            if(res.data.status == 100){
                this.$router.push({path: '/search-h5'})
            }else if(res.data.status == 101){
                this.$router.push({path: '/certification-h5'})
            }else if(res.data.status == 102){
                this.status  = res.data.status
            }else if(res.data.status == 103){
                this.status  = res.data.status
            }else if(res.data.status == 999){
                this.status  = res.data.status
                this.failCause = res.data.failCause
            }
        }
    })
  },
  methods: {
    goSearch(){
        api.merchantApplyReset().then(res => {
            if(res.code == 0){
                this.$router.push('/search-h5')
            }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
    .success-h5{
        width: 100%;
        height: 100%;
    }

    .success-content{
        width: 100%;
        margin-top: 40px;
        display: flex;
        flex-flow: column;
        align-items: center;
    }

    .goSearch{
        width: 240px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;
        margin-right: auto;
        margin-top: 24px;
        background: linear-gradient(135deg, #FFAD71 0%, #FF7F4A 100%);
        border-radius: 18px;
        font-size: 15px;
        color: #FFFFFF;
        cursor: pointer;
    }
</style>
