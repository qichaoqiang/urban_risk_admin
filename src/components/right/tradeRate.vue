<template>
	<div class="trade_rate">
		<div class="trade_rate_item" v-for="(item, index) in $store.state.tradeList" :key="item.name">
			<div class="trade_rate_item_pie" :id="'trade_rate_item_pie' + index"></div>
			<div class="trade_rate_item_name">
				<!-- <img :src="require(`../../assets/trade/icon-${item.id}.png`)"> -->
				<span>{{item.fxylbmc}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	// 引入基本模板
	let echarts = require('echarts/lib/echarts')
  	// 引入柱状图组件
  	require('echarts/lib/chart/bar')
  	require('echarts/lib/chart/line')
  	require('echarts/lib/chart/pie')
  	// 引入提示框和title组件
  	require('echarts/lib/component/tooltip')
  	require('echarts/lib/component/title')
  	require("echarts/lib/component/legendScroll");
	export default {
		name: '',
		data() {
			return {
				levelList: [{
		            name: '重大风险',
		            value: 0,
		            color: '#F25E5E',
		            selected: false,
		        }, {
		            name: '较大风险',
		            value: 0,
		            color: '#F49852',
		            selected: false,
		        }, {
		            name: '一般风险',
		            value: 0,
		            color: '#EFE850',
		            selected: false,
		        }, {
		            name: '低风险',
		            value: 0,
		            color: '#1C86F3',
		            selected: false,
		        }],
			}
		},
		watch: {
			'$store.state.resizeCount'(val) {
				this.$store.state.tradeList.forEach(item => {
					item.myChart && item.myChart.resize();
				})
			},
			'$store.state.tradeList.length'(val) {
				console.log(val)
				if(val > 0 && this.$store.state.riskPoints.length > 0) {
					// this.draw()
				}
			},
			'$store.state.riskPoints.length'(val) {
				console.log(val)
				if(val > 0 && this.$store.state.tradeList.length > 0) {
					// this.draw()
				}
			}
		},
		computed: {

		},
		methods: {
			draw() {
				let self = this;
				let { tradeList, riskPoints } = this.$store.state;
				console.log(tradeList, riskPoints)
		        for(let i = 0; i < tradeList.length; i++) {
		        	tradeList[i].myChart = echarts.init(document.getElementById('trade_rate_item_pie' + i));
					let color = this.levelList.map(item => item.color);
					let levelList = JSON.parse(JSON.stringify(this.levelList))
					levelList.forEach(item => {
						let value = 0
						riskPoints.forEach(riskItem => {
							if(tradeList[i].children) {
								value += tradeList[i].children.filter(child => {
									if(child.dm == riskItem.fxylb && item.name == riskItem.fxdj) {
										console.log(child.dm, riskItem.fxylb, item.name, riskItem.fxdj)
									}
									return child.dm == riskItem.fxylb && item.name == riskItem.fxdj
								}).length
							}
						})
						item.value = value
					});
					console.log(levelList)
					tradeList[i].myChart.setOption({
						color,
						tooltip: {
							backgroundColor: 'rgba(5,27,74,0.87)',
							// borderColor: 'rgba(5,27,74,0.87)',
							// borderWidth: '1px',
							formatter: '{b}：{d}% <br/>数量：{c}'
						},
			            series: [
					        {
					            name: '姓名',
					            type: 'pie',
					            radius: '80%',
					            center: ['50%', '50%'],
					            data: levelList,
					            hoverOffset: 4,
					            label: {
					            	show: false,
					            	formatter: '{d}%'
					            }
					        }
					    ]
			        });
		        }
			}
		},
		created() {

		},
		mounted() {
			// this.draw()
		}
	}
</script>

<style lang="scss" scoped>
	.trade_rate {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		.trade_rate_item {
			margin-top: 10px;
			width: 50%;
			display: flex;
			flex-direction: column;
			align-items: center;
			.trade_rate_item_pie {
				width: 80px;
				height: 80px;
			}
			.trade_rate_item_name {
				display: flex;
				justify-content: center;
				align-items: center;
				img {
					margin-right: 8px;
					width: 24px;
					height: 24px;
				}
				span {
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #FFFFFF;
					text-align: left;
					line-height: 20px;
				}
			}
		}
	}
</style>