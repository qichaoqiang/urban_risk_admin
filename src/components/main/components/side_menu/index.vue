<template>
	<div class="container">
		<!-- <Menu :class="menuitemClasses" ref="menu" :open-names="openNames" :accordion="true" :active-name="avtiveName" @on-select="turnToPage">
			<div v-if="this.isCollapsed">
				<div class="xxxs" v-for="(item, index) in menuList">
					<Submenu :name="item.name" v-if="item.children && item.children.length > 0">
						<template slot="title">
		                    <Icon :type="item.icon" :size="isCollapsed ? 24 : 16" />
		                    {{isCollapsed ? '' : item.meta.title}}
		                </template>
		                <MenuItem v-show="!isCollapsed" v-for="(item_, index_) in item.children" :key="item_.name" :name="item_.name" @click="turnToPage(item_)">{{item_.meta.title}}</MenuItem>
					</Submenu>
					<MenuItem :name="item.name" v-else @click="turnToPage(item)">
		            	<Icon :type="item.icon"  :size="isCollapsed ? 24 : 16" />
		                {{isCollapsed ? '' : item.meta.title}}
		            </MenuItem>
				</div>
			</div>
        </Menu> -->
        <el-menu 
        	:default-active="avtiveName"
        	:unique-opened="true" 
        	:collapse="isCollapsed"
        	background-color="#1E2657"
        	text-color="#FFFFFF">
        	<template v-for="(item, index) in menuList">
        		<el-submenu :index="item.name" v-if="item.children && item.children.length > 0">
					<template slot="title">
	                    <!-- <Icon :type="item.icon" :size="isCollapsed ? 24 : 16" /> -->
	                    <i :class="item.icon"></i>
	                    <span style="margin-left: 8px">{{item.meta.title}}</span>
	                </template>
	                <el-menu-item v-for="(item_, index_) in item.children" :key="item_.name" :index="item_.name" @click="turnToPage(item_)">
	                	<span style="margin-left: 18px">{{item_.meta.title}}</span>
	                </el-menu-item>
				</el-submenu>
				<el-menu-item :index="item.name" v-else @click="turnToPage(item)">
	            	<!-- <Icon :type="item.icon"  :size="isCollapsed ? 24 : 16" /> -->
	            	<i :class="item.icon"></i>
	                <span slot="title" style="margin-left: 8px">{{item.meta.title}}</span>
	            </el-menu-item>
        	</template>
        	<!-- <el-submenu index="1">
        		<template slot="title">
        			<i class="el-icon-location"></i>
        			<span slot="title">导航一</span>
        		</template>
        		<el-menu-item-group>
        			<span slot="title">分组一</span>
        			<el-menu-item index="1-1">选项1</el-menu-item>
        			<el-menu-item index="1-2">选项2</el-menu-item>
        		</el-menu-item-group>
        		<el-menu-item-group title="分组2">
        			<el-menu-item index="1-3">选项3</el-menu-item>
        		</el-menu-item-group>
        		<el-submenu index="1-4">
        			<span slot="title">选项4</span>
        			<el-menu-item index="1-4-1">选项1</el-menu-item>
        		</el-submenu>
        	</el-submenu>
        	<el-menu-item index="2">
        		<i class="el-icon-menu"></i>
        		<span slot="title">导航二</span>
        	</el-menu-item>
        	<el-menu-item index="3" disabled>
        		<i class="el-icon-document"></i>
        		<span slot="title">导航三</span>
        	</el-menu-item>
        	<el-menu-item index="4">
        		<i class="el-icon-setting"></i>
        		<span slot="title">导航四</span>
        	</el-menu-item> -->
        </el-menu>
	</div>
</template>

<script>
	// import mixins from './mixins'
	export default {
		name: '',
		// mixins: [mixins],
		props: {
			isCollapsed: {
				type: Boolean
			}
		},
		data() {
			return {
				avtiveName: '',
				openNames: [],
				menuList: this.$storage.get('menu')
			}
		},
		watch: {
			'$route.name': {
				handler(val) {
					// let item = this.menuList.find(item => item.name == val)
					this.avtiveName = val || ''
				},
				immediate: true
			}
		},
		computed: {
			menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
		},
		methods: {
			turnToPage(item) {
				console.log(item.name)
				// this.$nextTick(() => {
				// 	this.$refs.menu.updateOpened()
				// })
				// this.openNames = this.$route.meta.parent ? [this.$route.meta.parent] : []
				this.$router.push({path: item.path})
			}
		},
		created() {
			this.openNames = this.$route.meta.parent ? [this.$route.meta.parent] : []
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 0!important;
		background: #1E2657;
		/deep/.ivu-menu {
			width: 100%!important;
			background: #1E2657;
			color: #FFFFFF;
			.ivu-menu-item-selected {
				background: #0D122F;
				color: #567DF1;
			}
		}
		.ivu-menu-submenu {
			.ivu-menu {
				.ivu-menu-item {
					padding-left: 50px!important;
				}
			}
		}
		/deep/.el-menu {
			border: none;
			background: #1E2657;
			.el-menu-item {
				color: #FFFFFF;
			}
			.is-active {
				background-color: rgb(24, 30, 70)!important;
			}
			.el-submenu {
				.el-submenu__title {
					color: #FFFFFF;
				}
			}
		}
		.el-menu-vertical-demo:not(.el-menu--collapse) {
		    width: 200px;
		    min-height: 400px;
		}
	}
</style>