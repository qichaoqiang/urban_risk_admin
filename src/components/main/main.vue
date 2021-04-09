<template>
	<div class="container" id="container_test" :class="{model_container: $route.name === 'disEditInfo'}">
		<Layout>
			<!-- position: 'fixed',  -->
            <Header :style="{width: '100%'}" v-show="!isDl && this.$route.name !== 'disEditInfo'">
				<Row type="flex" align="middle" justify="space-between">
					<Col>
						<div class="header_left">
							<img class="logo" src="@/assets/login-logo.png" />
							<p v-show="!isCollapsed" class="name">{{$storage.get('xmName')}}</p>
							<Icon v-show="!$route.meta.hideMenu" @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
						</div>
					</Col>
					<div class="user">
						<Dropdown :transfer="true" @on-click="handleClick">
				            <Avatar size="small" :src="require('@/assets/register.png')" />
				            <span class="userName" style="margin: 0 5px">{{$storage.get('userInfo').nickname}}</span>
				            <Icon :size="18" type="md-arrow-dropdown"></Icon>
				            <DropdownMenu slot="list">
				                <DropdownItem name="logout">安全退出</DropdownItem>
				                <DropdownItem name="changePassword">修改密码</DropdownItem>
				            </DropdownMenu>
				        </Dropdown>
					</div>
				</Row>
		    </Header>
		    <Layout :style="{height: contentHeight}">
		        <!-- :style="{position: 'fixed', top: '64px', left: 0, overflow: 'auto', background: '#1E2657'}" -->
		    	<Sider
		    		ref="side"
		            collapsible
		            hide-trigger
		            v-show="!$route.meta.hideMenu && !isDl && this.$route.name !== 'disEditInfo'"
		            v-model="isCollapsed"
		            :width="200"
		            :collapsed-width="64"
		            class="left-sider"
		            :style="{background: '#1E2657'}"
		        >
		            <side-menu
		                accordion
		                ref="sideMenu"
		                :isCollapsed="isCollapsed"
		                :active-name="$route.name"
		                @on-select="turnToPage"
		            >
		                <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
		                <!-- <div class="logo-con">
		                    <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
		                    <img v-show="collapsed" :src="minLogo" key="min-logo" />
		                </div>-->
		            </side-menu>
		        </Sider>
		         <!-- :style="{position: 'fixed', top: '64px', bottom: 0, left: isCollapsed ? `${collapsedWidth}px` : '200px', right: 0, overflow: 'scroll'}" -->
		        <Content>
		        	<Row type="flex" justify="center" style="height: 100%">
		        		<Col :span="overviewList.includes($route.name) ? '24' : '23'" style="height: 100%">
		        			<router-view></router-view>
		        		</Col>
		        	</Row>
		        </Content>
		    </Layout>
		</Layout>
        <Modal
            v-model="isShowchangePassword"
            title="修改密码"
        >
            <Row type="flex" align="middle" class="statistics">
                <Col :span="5">原密码</Col>
                <Col :span="18">
                    <Input type="password" v-model="oldPassword"></Input>
                </Col>
            </Row>
            <Row type="flex" align="middle" class="statistics">
                <Col :span="5">新密码</Col>
                <Col :span="18">
                    <Input type="password" v-model="password"></Input>
                </Col>
            </Row>
            <Row type="flex" align="middle" class="statistics">
                <Col :span="5">确认密码</Col>
                <Col :span="18">
                    <Input type="password" v-model="confirmPassword"></Input>
                </Col>
            </Row>
            <div slot="footer">
                <Button type="text" size="large" @click="isShowchangePassword = false">取消</Button>
                <Button :loading="addUserLoading" type="primary" size="large" @click="savePassword">保存</Button>
            </div>
        </Modal>
	</div>
</template>

<script>
	import SideMenu from './components/side_menu'
	import storage from 'good-storage'
	import api from '@/api/api'
	export default {
		name: '',
		components: {
			SideMenu
		},
		data() {
			return {
				isCollapsed: false,
				isShowchangePassword: false,
				oldPassword: '',
	            password: '',
	            confirmPassword: '',
	            addUserLoading: false,
	            overviewList: ['area', 'industry', 'poi'],
	            contentHeight: 0
			}
		},
		watch: {
			// '$route.name'(val) {
			// 	this.isCollapsed = val == 'overview'
			// }
		},
		computed: {
			rotateIcon () {
                return ['menu-icon', this.isCollapsed ? 'rotate-icon' : ''];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
		},
		methods: {
			turnToPage() {

			},
			collapsedSider() {
				this.$refs.side.toggleCollapse();
			},
			async logout() {
				this.$store.commit('update_hasMenu', false)
				storage.clear()
				// this.$router.push('/login')
				// location.reload()
				location.href = location.origin
				location.href = process.env.NODE_ENV === "development" ? location.origin : `${location.origin}/v2`
				// location.reload()
	            // let { data, code } = await this.$axios('/operator/logout')
	            // if (code == 200) {
	            //     resetRouter()
	            //     setToken('')
	            //     this.storage.clear()
	            //     location.reload()
	            //     this.$router.push('/login')
	            // }
	        },
	        changePassword() {
	            this.password = ''
	            this.confirmPassword = ''
	            this.isShowchangePassword = true
	        },
	        async savePassword() {
	            if(!this.oldPassword || !this.password || !this.confirmPassword) {
	                this.$Message.error('请先完成输入')
	                return
	            }
	            if(this.password !== this.confirmPassword) {
	                this.$Message.error('密码确认有误，请重新确认')
	                return
	            }
	            this.addUserLoading = true
	            let { data, status_code } = await api.changeUserInfo({ act: 'change_password', oldpassword: this.oldPassword, password: this.password })
	            if(status_code == 200) {
	            	this.$Message.success('修改成功')
	            }
	            this.addUserLoading = false
	            this.isShowchangePassword = false
	        },
	        handleClick(name) {
	            switch (name) {
	                case 'logout':
	                    this.logout()
	                    break
	                case 'changePassword':
	                    this.changePassword()
	                    break
	                case 'message':
	                    this.message()
	                    break
	            }
	        }
		},
		created() {
			this.contentHeight = window.innerHeight - (this.isDl ? 0 : 64) + 'px'
		},
		mounted() {
			window.addEventListener('resize', () => {
				this.contentHeight = window.innerHeight - (this.isDl ? 0 : 64) + 'px'
			})
		}
	}
</script>

<style lang="less" scoped>
	.container {
		width: 100%;
		// min-height: 100vh;
    &.model_container {
      .ivu-layout {
        // background-color: transparent;
      }
    }
		.ivu-layout-header {
			background: #1E2657;
		}
		.user {
			height: 40px;
		}
		.trans{
			transition: transform .2s ease;
		}
		.sider-trigger-a{
			padding: 6px;
			width: 40px;
			height: 40px;
			display: inline-block;
			text-align: center;
			color: #5c6b77;
			margin-top: 12px;
			i{
				.trans;
				vertical-align: top;
			}
			&.collapsed i{
				transform: rotateZ(90deg);
				.trans;
			}
		}
		/deep/.ivu-layout-sider-trigger {
			background: #1E2657;
		}
		/deep/.ivu-layout-sider-collapsed {
			.ivu-menu-submenu-title {
				.ivu-menu-submenu-title-icon {
					display: none;
				}
			}
		}
		.header_left {
			display: flex;
			align-items: center;
			.logo {
				width: 30px;
				height: 36px;
			}
			.name {
				margin-left: 12px;
				font-family: PingFangSC-Medium;
				font-size: 20px;
				color: #FFFFFF;
			}
		}
		.menu-icon{
	        transition: all .3s;
	    }
	    .rotate-icon{
	        transform: rotate(-90deg);
	    }
	}
	.statistics {
		margin: 8px 0;
	}
</style>
