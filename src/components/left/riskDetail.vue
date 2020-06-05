<template>
	<div class="left_box">
		<title-top :name="currentRisk.enterprise_name || ''"></title-top>
		<div>
			<risk-point :data="riskList" left="0px" @drawRiskSource="handleDrawRiskSource"></risk-point>
		</div>
	</div>
</template>

<script>
	import TitleTop from '../common/title'
	import riskPoint from './riskPoint'
	export default {
		name: 'riskDetail',
		data() {
			return {

			}
		},
		props: {
			data: {
				default() {
					return {}
				},
				type: Object
			},
			currentRisk: {
				default() {
					return {}
				},
				type: Object
			},
		},
		components: {
			TitleTop,
			riskPoint
		},
		watch: {

		},
		computed: {
			riskList() {
				let list = [];
				let obj = {
					chemica: '化学品',
					chemistrycrafts: '危险工艺',
					dangersource: '重大危险源'
				}
				let index = 0;
				for(let key in this.data) {
					list.push({
						name: obj[key],
						id: index,
						showChildren: false,
						value: this.data[key]
					});
					index++;
				}
				return list;
			}
		},
		methods: {
			handleDrawRiskSource(item) {
				this.$emit('drawRiskSource', item);
			}
		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.left_box {
		.overview_data {
			margin-top: 27px;
			padding: 0 49px;
			box-sizing: border-box;
			width: 100%;
			display: flex;
			justify-content: space-between;
			.overview_item {
				display: flex;
				align-items: flex-end;
				.overview_key {
					margin-right: 16px;
					font-family: PingFangSC-Semibold;
					font-size: 16px;
					color: #FFFFFF;
					text-align: left;
					line-height: 22px;
				}
				.overview_value {
					font-family: PingFangSC-Semibold;
					font-size: 42px;
					color: #F25E5E;
					text-align: left;
					line-height: 34px;
				}
			}
		}
		.overview_line {
			margin: 24px auto;
			width: 336px;
			height: 1px;
			background-image: linear-gradient(270deg, rgba(255,255,255,0.00) 0%, #10F6FF 50%, rgba(255,255,255,0.00) 100%);
		}
	}
</style>