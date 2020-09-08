<template>
	<div class="header">
		<div class="header_title">{{$storage.get('xm') ? $storage.get('xm').dtbt : '杭州市安全风险地图平台'}}</div>
		<div class="header_left">
			<div class="btn" :class="{isActive: $route.name == 'area'}">
				<router-link to="area">区域</router-link>
			</div>
			<div class="btn" :class="{isActive: $route.name == 'industry'}">
				<router-link to="industry">行业</router-link>
			</div>
			<div class="btn" :class="{isActive: $route.name == 'poi'}">
				<router-link to="poi">POI</router-link>
			</div>
			<div v-show="$route.name == 'poi'" @click="search" style="display: flex; align-items: center;">
				<Icon type="ios-search"  :color="isSearch ? '#10F6FF' : '#fff'"/>
				<span :style="{'margin-left': '4px', color: isSearch ? '#10F6FF' : '#fff'}">检索</span>
				<div class="header_select_arrow" id="header_select_arrow" :class="{header_select_arrow_rotate1: !isSearch, header_select_arrow_rotate2: isSearch}">
					<Icon type="md-arrow-dropup" :color="isSearch ? '#10F6FF' : '#fff'" />
				</div>
			</div>
		</div>
		<!-- <div>
			<Button type="text">退出</Button>
		</div> -->
	</div>
</template>

<script>
	export default {
		name: '',
		props: {
			
		},
		data() {
			return {
				path: ''
			}
		},
		watch: {

		},
		computed: {
			isSearch() {
				return this.$route.query.isSearch
			}
		},
		methods: {
			search() {
				if(this.isSearch) {
					this.$router.replace({
						path: '/poi',
						query: {}
					})
				}else {
					this.$router.replace({
						path: '/poi',
						query: {
							isSearch: 1
						}
					})
				}
				
			}
		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.header {
		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 98px;
		border: 1px solid #10388C;
		box-shadow: inset 0 0 32px 0 rgba(0,163,255,0.30);
		background: url('../../../assets/title-background.png');
		background-size: 100% 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.header_left {
			padding-left: 32px;
			display: flex;
			align-items: center;
			.btn {
				margin-right: 16px;
				width: 60px;
				height: 42px;
				font-family: PingFangSC-Medium;
    			font-size: 24px;
				color: #FFFFFF;
    			text-align: center;
    			line-height: 42px;
    			border-radius: 4px;
    			cursor: pointer;
    			background: rgba(13, 80, 148, .2);
				&:hover {
					background: rgba(13, 80, 148, 1);
				}
				&.search {
					width: 48px;
					height: 24px;
					font-size: 16px;
					line-height: 24px;
				}
				a {
					color: #fff;
				}
			}
			.isActive {
				background: rgba(13, 80, 148, 1);
			}
			span {
					cursor: pointer;
					margin-right: 4px;
					font-size: 14px;
				}
				.header_select_arrow {
					width: 20px;
					height: 20px;
					transform: rotate(0deg);
					transform-origin: center;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.header_select_arrow_rotate1 {
					animation: rotate 0.5s;
					animation-fill-mode: forwards;
				}
				@keyframes rotate{
					from {
						transform: rotate(0deg);
					}
					to {
						transform: rotate(180deg);
					}
				}
				.header_select_arrow_rotate2 {
					animation: rotateBack 0.5s;
					animation-fill-mode: forwards;
				}
				@keyframes rotateBack{
					from {
						transform: rotate(180deg);
					}
					to {
						transform: rotate(0deg);
					}
				}
		}
		.header_title {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 480px;
			height: 74px;
			font-family: PingFangSC-Semibold;
			font-size: 36px;
			color: #10F6FF;
			text-align: center;
			line-height: 74px;
			background: url('../../../assets/diamond-background.png') no-repeat center;
			background-size: 100% 100%;
		}
	}
</style>