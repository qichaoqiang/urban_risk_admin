<template>
	<div class="risk_bar">
		<div class="risk_bar_icon" @click="handleClickArrow(1)">
			<Icon type="ios-arrow-back" color="#ffffff" size="24" />
		</div>
		<div style="width: 340px; height: 200px; overflow: hidden;">
			<div class="risk_bar_box" :id="'risk_bar_box' + id">
				<div class="risk_bar_chart" :id="'risk_bar_chart' + id" style="height: 200px;"></div>
			</div>
		</div>
		<div class="risk_bar_icon" @click="handleClickArrow(2)">
			<Icon type="ios-arrow-forward" color="#ffffff" size="24" />
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
				myChart: null
			}
		},
		props: {
			id: {
				type: String
			}
		},
		watch: {
			'$store.state.resizeCount'(val) {
				this.myChart.resize();
			},
			'$store.state.tradeList'(val) {
				this.draw()
			}
		},
		computed: {

		},
		methods: {
			draw() {
				let axisConfig = {
					nameTextStyle: {
			        	color: 'rgba(255,255,255,0.80)'
			        },
			        axisLine: {
		                lineStyle: {
		                	width: 1,
		                    color: '#1C86F3'
		                }
		            },
		            splitLine: {
		            	show: false
		            },
		            // 坐标轴刻度
		            axisTick: {
		            	show: false
		            }
				}
				console.log(this.$store.state.tradeList.map(item => item.fxylbmc))
				let option = {
				    tooltip: {
				        trigger: 'axis',
				        backgroundColor: 'rgba(5,27,74,0.87)',
				        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
				            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    grid: {
				    	top: '5%',
				        left: '0%',
				        right: '0%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis: {
				    	...axisConfig,
				        axisLabel: {
				        	show: true,
				        	color: '#FFFFFF',
				        	interval: 0
				        },
				        type: 'category',
				        data: this.$store.state.tradeList.map(item => item.fxylbmc)
				        // data: ['1', '2', '3']
				    },
				    yAxis: {
				    	...axisConfig,
				        axisLabel: {
				        	show: false,
				        },
				        type: 'value',
				    },
				    series: [
				        {
				            name: '重大风险',
				            type: 'bar',
				            stack: '总量',
				            itemStyle: {
				            	color: '#F25E5E'
				            },
				            barWidth: 20,
				            data: [320, 302, 301, 334, 390, 330, 320, 320, 302, 301, 334, 390, 330]
				        },
				        {
				            name: '较大风险',
				            type: 'bar',
				            stack: '总量',
				            itemStyle: {
				            	color: '#F49852'
				            },
				            barWidth: 20,
				            data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230]
				        },
				        {
				            name: '一般风险',
				            type: 'bar',
				            stack: '总量',
				            itemStyle: {
				            	color: '#EFE850'
				            },
				            barWidth: 20,
				            data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230]
				        },
				        {
				            name: '低风险',
				            type: 'bar',
				            stack: '总量',
				            itemStyle: {
				            	color: '#1C86F3'
				            },
				            barWidth: 20,
				            data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230]
				        },
				    ]
				};
				this.myChart = echarts.init(document.getElementById('risk_bar_chart' + this.id));
				this.myChart.setOption(option);
			},
			handleClickArrow(index) {
				let timer = null;
				let step = 0;
				let elem = document.getElementById('risk_bar_box' + this.id)
				if(index == 1) {
					timer = setInterval(() => {
						step++
						elem.scrollLeft = elem.scrollLeft - 1;
						if(step >= 200) {
							clearInterval(timer)
						}
					}, 1)
				}else {
					timer = setInterval(() => {
						step++
						elem.scrollLeft = elem.scrollLeft + 1;
						if(step >= 200) {
							clearInterval(timer)
						}
					}, 1)
				}
			}
		},
		created() {

		},
		mounted() {
			console.log(this.$store.state.tradeList)
			// this.draw()
		}
	}
</script>

<style lang="scss" scoped>
	.risk_bar {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		.risk_bar_box {
			width: 340px;
			height: 220px;
			overflow-x: scroll;
			overflow-y: hidden;
			.risk_bar_chart {
				width: 340px;
				height: 200px;
			}
		}
		.risk_bar_box_bottom {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 20px;
			z-index: 1000;
			background: rgba(5, 27, 74, 0.87);
		}
		.risk_bar_icon {
			cursor: pointer;
		}
	}
</style>