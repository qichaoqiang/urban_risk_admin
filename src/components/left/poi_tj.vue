<template>
	<div class="trade_order">
		<!-- <div class="level_box" ref="level_box">
			<div class="level_item" v-for="item in $store.state.levelList" :key="item.color">
				<div class="check" :class="{selected: item.selected}"  @click="selectLevel(item)"></div>
				<div class="level_item_name">{{item.name}}</div>
				<div class="level_item_color" :style="{background: item.color, width: '16px', height: '16px'}"></div>
			</div>
		</div> -->
		<div class="trade_item" :class="{active: cityName == item.mc}" v-for="item in orderList" :key="item.mc" v-show="item.mc != '全市'">
			<div class="trade_item_name">{{item.mc}}</div>
			<div class="trade_item_rate_box">
				<div 
					class="trade_item_rate" 
					v-for="item_ in item.mx" 
					:key="item_.fxdj" :title="item_.sl" 
					v-show="fxdjList.includes(item_.fxdj)"
					:style="{width: getRate(item_.sl), background: getColor(item_.fxdj)}"></div>
			</div>
			<div class="trade_item_value">{{getSum(item)}}</div>
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
				let zsl = 0;
				this.qyfxList.forEach(item => {
					if(zsl < item.zsl) {
						zsl = item.zsl
					}
				});
				return zsl;
			},
			fxdjList() {
				return this.$store.state.levelList.filter(item => item.selected).map(item => item.name)
			},
			orderList() {
				this.qyfxList.forEach(item => {
					item.value = this.getSum(item)
				})
				function bubbleSort(arr){
					for(var i=1; i<arr.length; i++){
						for(var j=0; j<arr.length-i; j++){
							if(arr[j].value<arr[j+1].value){
								arr[j]=[arr[j+1],arr[j+1]=arr[j]][0];
							}
						}
					}
					return arr;
				}
				let list = bubbleSort(this.qyfxList)
				return list
			}
		},
		methods: {
			getSum(item) {
				let sum = 0
				item.mx.forEach(item_ => {
					this.fxdjList.includes(item_.fxdj) && (sum += item_.sl)
				})
				return sum
			},
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
			},
			selectLevel(item) {
				console.log(item.selected)
				item.selected = !item.selected
			},
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
		.level_box {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			.level_item {
				margin-bottom: 12px;
				padding: 0 14px;
				width: 50%;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				.check {
					margin-right: 8px;
					width: 20px;
					height: 20px;
					background: url('../../assets/agreement_off.png');
					background-size: 100%;
					cursor: pointer;
				}
				.selected {
					background: url('../../assets/agreement_on.png');
					background-size: 100%;
				}
				.level_item_name {
					margin-right: 8px;
					width: 80px;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #FFFFFF;
					text-align: center;
				}
				.level_item_color {
					
				}
			}
		}
		.trade_item {
			margin-bottom: 20px;
			width: 100%;
			display: flex;
			align-items: center;
			.trade_item_name {
				width: 80px;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #FFFFFF;
				text-align: left;
			}
			.trade_item_rate_box {
				margin-right: 16px;
				flex: 1;
				height: 10px;
				overflow: hidden;
				display: flex;
				.trade_item_rate {
					height: 10px;
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
				}
			}
			.trade_item_value {
				font-size: 18px;
			}
		}
	}
</style>