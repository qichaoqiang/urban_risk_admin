<template>
    <div class="container">
        <Row
        type="flex"
        justify="center"
        align="middle"
        class="login"
        @keydown.enter.native="submitLogin"
    >
        <Col :xs="{span:22}" style="padding: 0 40px; width: 400px; border-radius: 8px; background: rgba(255, 255, 255, 0.7">
            <Row class="header" type="flex" justify="center" align="middle">
                <!-- <img class="mr-10" width="70px" src="../../assets/images/1024.png" /> -->
                <h1>{{xmName}}</h1>
            </Row>
            <Row class="login-form">
                <Tabs v-model="tabName">
                    <TabPane label="账号密码登录" name="username" icon="md-person">
                        <Form ref="usernameLoginForm" :model="form" :rules="rules" class="form">
                            <FormItem prop="username">
                                <div class="login-userName">
                                    <Input  
                                        v-model="form.username"
                                        prefix="ios-contact"
                                        size="large"
                                        :clearable="loginType == 2"
                                        placeholder="请输入账号"
                                    />
                                    <!-- <Button
                                        v-show="loginType == 1"
                                        type="primary"
                                        class="timer"
                                        :loading="time != 60"
                                        @click="getpwd"
                                    >{{getPwdBtnText}}</Button> -->
                                </div>
                            </FormItem>
                            <FormItem prop="password">
                                <Input
                                    type="password"
                                    v-model="form.password"
                                    prefix="ios-lock"
                                    size="large"
                                    clearable
                                    placeholder="请输入密码"
                                />
                            </FormItem>
                        </Form>
                    </TabPane>
                </Tabs>
                <Row type="flex" justify="space-between" class="code-row-bg">
                    <!-- <Checkbox v-model="saveLogin" size="large">自动登录</Checkbox> -->
                </Row>
                <Row>
                    <Button
                        class="login-btn"
                        type="primary"
                        size="large"
                        :loading="loading"
                        @click="submitLogin"
                        long
                    >
                        <span v-if="!loading">登录</span>
                        <span v-else>登录...</span>
                    </Button>
                </Row>
            </Row>
        </Col>
    </Row> 
    </div>
    
</template>

<script>
import api from '@/api/api'
import storage from 'good-storage'
// import util from '@/libs/util.js'
// import { setToken } from '@/libs/util'
// import language from '@/components/main/components/language'
export default {
    data() {
        return {
            error: false,
            errorMsg: '',
            tabName: 'username',
            xmName: '',
            saveLogin: true,
            loading: false,
            time: 60,
            loginType: 2,
            form: {
                username: '',
                password: '',
                // username: 'apitest',
                // password: 'IJA2v86kgQuEAOlo',
                grant_type: 'password',
                client_id: '1',
                client_secret: 'kSurOT8t7UtybKALabyhPbm1Abu761zr5YQquBJQ',
                scope: '*'
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: '账号错误',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '密码错误',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    components: {
        
    },
    computed: {
        getPwdBtnText() {
            return this.time == 60 ? this.$t('getPwd') : `${this.time}s`
        }
    },
    methods: {
        submitLogin() {
            if (this.tabName === 'username') {
                this.$refs.usernameLoginForm.validate(async valid => {
                    if (valid) {
                        api.oauthToken(this.form).then(res => {
                            if(res.status_code == 200) {
                                storage.set('username_v2', this.form.username)
                                storage.set('token_type_v2', res.token_type)
                                storage.set('access_token_v2_', res.access_token)
                                storage.set('refresh_token_v2', res.refresh_token)
                                api.getUserInfo().then(res_ => {
                                    if(res_.status_code == 200) {
                                        storage.set('userInfo', res_.data)
                                        if(res_.data.yhlx == 1) {
                                            api.getRoleInfo(res_.data.role_id).then(res1 => {
                                                if(res1.status_code == 0) {
                                                    storage.set('authList', res1.data.role_jurisdiction.split(','))
                                                }
                                                this.$router.replace(this.isDl ? '/area' : '/city');
                                            })
                                        }else if(res_.data.yhlx == 2) {
                                            storage.set('gkdx_id', res_.data.gkdx_id)
                                            this.$router.replace('/baseInfo');
                                        }
                                    }else {
                                        this.$Message.success(res_message)
                                    }
                                })
                            }else {
                                this.$Message.success(res.message)
                            }
                        })
                    }
                })
            }
        },
    },
    created() {
        api.getXmName().then(res => {
            this.xmName = res.xmmc
            this.$storage.set('xmName', res.xmmc)
        })
    },
    mounted() {
        storage.clear()
        this.$store.commit('update_hasMenu', false)
        let list = this.$route.path.split('/');
    }
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100vh;
    background: url('../../assets/login_bg.jpg') top no-repeat;
    background-size: 100% 100%;
    .login {
        height: 100vh;
        .language {
            position: absolute;
            top: 30px;
            right: 60px;
        }
        .header {
            margin-top: 6vh;
            margin-bottom: 4vh;
            text-align: center;
            .description {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.45);
                margin-top: 1vh;
            }
        }
        .login-form {
            margin-bottom: 6vh;
        }
        .ivu-tabs-nav-container {
            line-height: 2;
            font-size: 17px;
            box-sizing: border-box;
            white-space: nowrap;
            overflow: hidden;
            position: relative;
            zoom: 1;
        }
        .form {
            padding-top: 1vh;
            .input-verify {
                width: 70%;
            }
            .count-verify,
            .send-verify {
                width: 100px;
            }
            .login-userName {
                position: relative;
                .timer {
                    position: absolute;
                    top: 0;
                    right: 0;
                    height: 40px;
                }
            }
        }
        .forget-pass,
        .other-way {
            font-size: 14px;
        }
        .login-btn,
        .other-login {
            margin-top: 3vh;
        }
        .icons {
            display: flex;
            align-items: center;
        }
        .other-icon {
            cursor: pointer;
            margin-left: 10px;
            display: flex;
            align-items: center;
            color: rgba(0, 0, 0, 0.2);
            :hover {
                color: #2d8cf0;
            }
        }
        .foot {
            margin-bottom: 2vh;
            color: rgba(0, 0, 0, 0.45);
            font-size: 14px;
            .help {
                margin: 0 auto;
                margin-bottom: 1vh;
                width: 60%;
                .item {
                    color: rgba(0, 0, 0, 0.45);
                }
                :hover {
                    color: rgba(0, 0, 0, 0.65);
                }
            }
        }
    }

    .ivu-tabs-nav .ivu-tabs-tab .ivu-icon {
        width: 14px;
        height: 14px;
        margin-right: 8px;
        margin-bottom: 5px;
    }
    .login {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        position: relative;
        .login-con {
            position: absolute;
            right: 160px;
            top: 50%;
            transform: translateY(-60%);
            width: 300px;
            .login-header {
                font-size: 16px;
                font-weight: 300;
                text-align: center;
                padding: 30px 0;
            }
            .form-con {
                padding: 10px 0 0;
            }
            .login-tip {
                font-size: 10px;
                text-align: center;
                color: #c3c3c3;
            }
        }
    }
}


</style>
