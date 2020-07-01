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
		            name: '上城区',
		            value: 293,
		            color: '#1C86F3'
		        }, {
		            name: '下城区',
		            value: 199,
		            color: '#F25E5E'
		        }, {
		            name: '西湖区',
		            value: 192,
		            color: '#3BBC91'
		        }, {
		            name: '滨江区',
		            value: 164,
		            color: '#E4B44E'
		        }, {
		            name: '余杭区',
		            value: 155,
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
		padding: 24px 32px 24px 48px;
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