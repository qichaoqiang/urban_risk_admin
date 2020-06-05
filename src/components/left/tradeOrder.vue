<template>
	<div class="trade_order">
		<div class="trade_item" v-for="item in tradeOrder" :key="item.name">
			<div class="trade_item_name">{{item.name}}</div>
			<div class="trade_item_rate_box">
				<div class="trade_item_rate" :style="{width: getRate(item.value), background: item.color}"></div>
			</div>
			<div class="trade_item_value">{{item.value}}个</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: '',
		data() {
			return {
				tradeOrder: [{
		            name: '危险化学品',
		            value: 478,
		            color: '#1C86F3'
		        }, {
		            name: '敏感人群场所',
		            value: 291,
		            color: '#F25E5E'
		        }, {
		            name: '矿山',
		            value: 194,
		            color: '#3BBC91'
		        }, {
		            name: '能源场站',
		            value: 88,
		            color: '#E4B44E'
		        }, {
		            name: '烟花爆竹',
		            value: 77,
		            color: '#F49852'
		        }]
			}
		},
		watch: {

		},
		computed: {
			maxValue() {
				let maxValue = 0;
				this.tradeOrder.forEach(item => {
					if(maxValue < item.value) {
						maxValue = item.value
					}
				});
				return maxValue;
			}
		},
		methods: {
			getRate(value) {
				return value / this.maxValue * 100 + '%';
			}
		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.trade_order {
		padding: 24px 32px 0 48px;
		box-sizing: border-box;
		width: 100%;
		.trade_item {
			margin-bottom: 4px;
			width: 100%;
			display: flex;
			align-items: center;
			.trade_item_name {
				width: 100px;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #FFFFFF;
				text-align: left;
			}
			.trade_item_rate_box {
				flex: 1;
				.trade_item_rate {
					height: 10px;
					border-radius: 5px;
				}
			}
			.trade_item_value {
				width: 60px;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #FFFFFF;
				text-align: right;
			}
		}
	}
</style>