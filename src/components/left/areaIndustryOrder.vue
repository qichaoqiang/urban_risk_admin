<template>
	<div class="trade_order">
		<div class="trade_item" :class="{active: cityName == item.hymc}" v-for="item in qyfxList" :key="item.hymc" v-show="item.fxdj">
			<div class="trade_item_name" :title="item.hymc" :style="{color: cityName == item.hymc ? getColor(item.fxdj) : '#fff'}">{{item.hymc}}</div>
			<div class="trade_item_rate_box">
				<div class="trade_item_rate" :title="Number(item.fxz).toFixed(2)" :style="{width: getRate(item.fxz), background: getColor(item.fxdj)}"></div>
			</div>
			<div class="trade_item_value" :style="{color: cityName == item.hymc ? getColor(item.fxdj) : '#fff'}">{{item.fxdj}}</div>
		</div>
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
			qyfxList: {
				default: () => [],
				type: Array
			},
			cityName: {
				default: '',
				type: String
			}
		},
		watch: {

		},
		computed: {
			maxValue() {
				let fxz = 0;
				this.qyfxList.forEach(item => {
					if(fxz < item.fxz) {
						fxz = item.fxz
					}
				});
				return fxz;
			},

		},
		methods: {
			getRate(value) {
				return value / this.maxValue * 100 + '%';
			},
			getColor(value) {
				if(value) {
					let item = this.$store.state.levelList.find(item => item.name == value)
					return item ? item.color : 'rgb(28, 134, 243)'
				}else {
					return 'rgb(28, 134, 243)'
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
	.trade_order {
		padding: 24px 48px 24px 32px;
		box-sizing: border-box;
		width: 100%;
		.trade_item {
			margin-bottom: 20px;
			width: 100%;
			display: flex;
			align-items: center;
			.trade_item_name {
				width: 100px;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #FFFFFF;
				text-align: left;
				white-space: nowrap;
			    text-overflow: ellipsis;
			    overflow: hidden;
			}
			.trade_item_rate_box {
				margin-right: 16px;
				flex: 1;
				.trade_item_rate {
					height: 10px;
					border-radius: 5px;
				}
			}
			.trade_item_value {
				width: 80px;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #FFFFFF;
				text-align: right;
			}
		}
		.active {
			.trade_item_name {
				font-size: 18px;
			}
			.trade_item_rate_box {
				.trade_item_rate {
					height: 16px;
					border-radius: 8px;
				}
			}
			.trade_item_value {
				font-size: 18px;
			}
		}
	}
</style>