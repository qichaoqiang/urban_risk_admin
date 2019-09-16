<template>
    <div class="success-h5">
        <div class="success-content">
            <img style="display: block;width: 120px;height: 120px;margin-bottom: 16px;" src="@/assets/img_page_complete.png" alt="">
            <h4 style="display: block;margin-bottom: 8px;font-size: 16px;color: rgba(0,0,0,0.87);">绑定成功</h4>
            <span style="font-size: 12px;color: rgba(0,0,0,0.38);">返回服务号开始业务吧</span>
        </div>
        <!-- <div class="success-content" v-show="status == '103'">
            <img style="display: block;width: 120px;height: 120px;margin-bottom: 16px;" src="@/assets_zx/img_page_complete.png" alt="">
            <h4 style="display: block;margin-bottom: 8px;font-size: 16px;color: rgba(0,0,0,0.87);">商家入驻审核通过</h4>
            <span style="font-size: 12px;color: rgba(0,0,0,0.38);">请登录商户后台管理网站管理你的商户信息</span>
        </div>
        <div class="success-content" v-show="status == '999'">
            <img style="display: block;width: 120px;height: 120px;margin-bottom: 16px;" src="@/assets_zx/img_page_failed.png" alt="">
            <h4 style="display: block;margin-bottom: 8px;font-size: 16px;color: rgba(0,0,0,0.87);">商家入驻申请审核失败</h4>
            <span style="font-size: 12px;color: rgba(0,0,0,0.38);">失败原因：{{failCause}}</span>
            <span style="font-size: 12px;color: rgba(0,0,0,0.38);display: block;margin-top: 8px;">请重新提交，感谢您的合作</span>
            <span class="goSearch" @click="goSearch">重新提交</span>
        </div> -->
    </div>
</template>

<script>
// import api from '@/api/apiH5'
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
  },
  methods: {
    goSearch(){
        
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
        margin-top: 40%;
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
