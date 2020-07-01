<template>
	<div class="left_box">
		<title-top name="风险统计"></title-top>
		<div class="overview_data">
			<div class="overview_item">
				<div class="overview_key">风险数量</div>
				<div class="overview_value">381</div>
			</div>
			<div class="overview_item">
				<div class="overview_key">风险等级</div>
				<div class="overview_value">高</div>
			</div>
		</div>
		<div class="overview_line"></div>
		<div v-if="area == '全部'">
			<title-top name="分区域"></title-top>
			<risk-bar id="1"></risk-bar>
			<div class="overview_line"></div>
			<title-top name="分行业"></title-top>
			<risk-hy id="2"></risk-hy>
		</div>
		<div v-else>
			<overview></overview>
		</div>
		<div class="overview_line"></div>
		<title-top :name="`区域${area == '全部' ? '' : '行业'}风险排序`"></title-top>
		<trade-order></trade-order>
	</div>
</template>

<script>
	import TitleTop from '../common/title'
	import Overview from './overview'
	import TradeOrder from './tradeOrder'
	import RiskBar from './riskBar'
	import RiskHy from './riskHy'
	export default {
		name: '',
		data() {
			return {

			}
		},
		props: {
			area: {
				default: '全部',
				type: String
			}
		},
		components: {
			Overview,
			TitleTop,
			TradeOrder,
			RiskBar,
			RiskHy
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