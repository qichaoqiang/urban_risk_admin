<template>
	<div class="risk_time">
		<div class="risk_time_chart" id="risk_time_chart"></div>
		<div class="select_time" style="width: 108px; height: 26px;">
			<div class="select_time_item select_time_item_left" :class="{selected_left: selectIndex == 1}" @click="handleSelectIndex(1)" style="line-height: 26px;">近30天</div>
			<div class="select_time_item select_time_item_right" :class="{selected_right: selectIndex == 2}" @click="handleSelectIndex(2)" style="line-height: 26px;">近7天</div>
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
				dateList: [],
				selectIndex: 1,
				valueList: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932],
				myChart: null
			}
		},
		props: {
			reset: {
				default: 0,
				type: Number
			}
		},
		watch: {
			reset(val) {
				this.draw();
			},
			selectIndex(val) {
				this.$nextTick(() => {
					this.draw();
				})
			},
			'$store.state.resizeCount'(val) {
				this.myChart.resize();
			}
		},
		computed: {
			drawDate() {
				let drawDate = JSON.parse(JSON.stringify(this.dateList));
				if(this.selectIndex == 2) {
					drawDate = drawDate.splice(-7);
				}
				return drawDate
			},
			drawValue() {
				let drawValue = JSON.parse(JSON.stringify(this.valueList));
				if(this.selectIndex == 2) {
					drawValue = drawValue.splice(-7);
				}
				return drawValue
			}
		},
		methods: {
			setDataList() {
				let list = []
				let time = new Date().getTime();
				let step = 24 * 60 * 60 * 1000
				for(let i = 0; i < 30; i++) {
					let date = new Date(time)
					let month = date.getMonth() + 1
					if(month < 10) {
						month ='0' + month
					}
					let day = date.getDate()
					if(day < 10) {
						day ='0' + day
					}
					list.push(`${month}-${day}`)
				}
				this.dateList = list
			},
			draw() {
				let self = this;
				let axisConfig = {
					nameTextStyle: {
			        	color: 'rgba(255,255,255,0.80)'
			        },
			        axisLabel: {
			        	color: 'rgba(255,255,255,0.80)'
			        },
			        axisLine: {
		                lineStyle: {
		                	width: 2,
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
				let option = {
				    xAxis: {
				        ...axisConfig,
				    	name: '时间',
				        type: 'category',
				        boundaryGap: false,
				        data: self.drawDate,
				    },
				    grid: {
				    	top: '20%',
				        left: '2%',
				        right: '4%',
				        bottom: '4%',
				        containLabel: true
				    },
				    yAxis: {
				        ...axisConfig,
				    	name: '风险指数',
				        type: 'value',
				    },
				    itemStyle: {
				    	borderWidth: 1,
		                color: 'rgb(54, 136, 236)'
		            },
		            areaStyle: {
		            	color: {
						    type: 'linear',
						    x: 0,
						    y: 0,
						    x2: 0,
						    y2: 1,
						    colorStops: [{
						        offset: 0, color: 'red' // 0% 处的颜色
						    }, {
						        offset: 1, color: 'blue' // 100% 处的颜色
						    }],
						    global: false // 缺省为 false
						}
		            },
		            tooltip: {
		            	trigger: 'axis',
		            	backgroundColor: 'rgba(5,27,74,0.87)',
		            	formatter: '{b}：{c}个'
		            },
				    series: [{	
				        data: self.drawValue,
				        type: 'line',
				        areaStyle: {
				        	color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			                    offset: 0,
			                    color: 'rgb(34, 89, 162)'
			                }, {
			                    offset: 1,
			                    color: 'rgb(10, 31, 72)'
			                }])
				        }
				    }]
				};
				let elem = document.getElementById('risk_time_chart')
				// while(elem.getElementsByTagName('div').length > 0) {
				// 	elem.removeChild(elem.getElementsByTagName('div')[0]);
				// }
				// console.log(elem)	
				// elem.innerHTML = '';
				this.myChart = echarts.init(elem);
				this.myChart.setOption(option);
			},
			handleSelectIndex(index) {
				this.selectIndex = index;
			}
		},
		created() {

		},
		mounted() {
			this.setDataList()
			this.draw();
		}
	}
</script>

<style lang="scss" scoped>
	.risk_time {
		position: relative;
		padding-top: 20px;
		width: 100%;
		height: 100%;
		.select_time {
			position: absolute;
			right: 25px;
			top: 25px;
			z-index: 1000;
			display: flex;
			cursor: pointer;
			.select_time_item {
				flex: 1;
				height: 100%;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: rgba(255,255,255,0.80);
				text-align: center;
			}
			.select_time_item_left {
				background-image: url('../../assets/time-3.png');
				background-size: 100% 100%;
			}
			.select_time_item_right {
				background-image: url('../../assets/time-2.png');
				background-size: 100% 100%;
			}
			.selected_left {
				background-image: url('../../assets/time-1.png');
				background-size: 100% 100%;
			}
			.selected_right {
				background-image: url('../../assets/time-4.png');
				background-size: 100% 100%;
			}
		}
		.risk_time_chart {
			margin: 0 auto;
			width: 100%;
			height: 250px;
		}
	}
</style>