<template>
	<div class="header">
		<div class="header_left"></div>
		<div class="header_title">杭州市安全风险地图平台</div>
	</div>
</template>

<script>
	export default {
		name: '',
		data() {
			return {

			}
		},
		watch: {

		},
		computed: {

		},
		methods: {

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
			display: flex;
			align-items: center;
		}
		.header_title {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 1200px;
			height: 74px;
			font-family: PingFangSC-Semibold;
			font-size: 36px;
			color: #10F6FF;
			text-align: center;
			line-height: 74px;
			background: url('../../../assets/headline.png') no-repeat center;
			background-size: 100% 100%;
		}
	}
</style>