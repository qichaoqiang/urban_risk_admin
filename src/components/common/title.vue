<template>
	<div class="title" :style="{'padding-left': left}">
		<img class="title_icon" src="@/assets/decorate-1.png">
		<div class="title_text">{{name}}</div>
		<img class="title_bg" v-show="showBg" src="@/assets/decorate-2.png">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: '',
		data() {
			return {

			}
		},
		props: {
			name: {
				default: '',
				type: String
			},
			left: {
				default: '32px',
				type: String
			},
			showBg: {
				default: true,
				type: Boolean
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
	.title {
		display: flex;
		align-items: center;
		.title_icon {
			margin-right: 8px;
			width: 16px;
			height: 15px;
		}
		.title_text {
			margin-right: 13px;
			font-family: PingFangSC-Semibold;
			font-size: 18px;
			color: #10F6FF;
			text-align: left;
			line-height: 26px;
			span {
				margin-left: 13px;
				color: #D8D8D8
			}
		}
		.title_bg {
			width: 78px;
			height: 16px;
		}
	}
</style>