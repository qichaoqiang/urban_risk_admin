<template>
	<div class="overview">
		<div class="overview_pie">
			<div id="overview_pie"></div>
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
		watch: {
			'$store.state.resizeCount'(val) {
				this.myChart.resize();
			},
			'$store.state.levelList'(val) {
				this.$nextTick(() => {
					this.drawOverview()
				})
			},
			fxdjList(val) {
				this.$nextTick(() => {
					this.drawOverview()
				})
			}
		},
		computed: {
			fxdjList() {
				return this.$store.state.levelList.filter(item => item.selected).map(item => item.name)
			}
		},
		methods: {
			drawOverview() {
				this.myChart = echarts.init(document.getElementById('overview_pie'));
				let data = this.$store.state.levelList.filter(item => item.selected).map(item => {
					let { name, value, color } = item
					return { 
						name, 
						value: value || 0, 
						color 
					}
				})
				this.myChart.setOption({
					color: data.map(item => item.color),
					tooltip: {

					},
				    legend: {
				        orient: 'vertical',
				        right: 10,
				        textStyle: {
				        	color: '#ffffff'
				        },
				        data: data.map(item => item.name),
				    },
		            series: [
				        {
				            name: '',
				            type: 'pie',
				            radius: '70%',
				            center: ['38%', '50%'],
				            data,
				            label: {
				            	formatter: '{d}%'
				            }
				        }
				    ]
		        });
			},	
		},
		created() {

		},
		mounted() {
			
		}
	}
</script>

<style lang="scss" scoped>
	.overview {
		display: flex;
		flex-direction: column;
		align-items: center;
		.overview_pie {
			width: 100%;
			height: 240px;
			display: flex;
			align-items: center;
			justify-content: center;
			#overview_pie {
				width: 380px;
				height: 200px;
			}
		}
		.overview_list {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			.overview_item1 {
				position: relative;
				margin: 0 12px 24px;
				padding: 14px 0 6px;
				width: 134px;
				background: #112A5D;
				border-radius: 4px;
				.overview_item1_icon {
					position: absolute;
					bottom: 0;
					left: 0;
					width: 48px;
					height: 48px;
				}
				.overview_item1_name {
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #FFFFFF;
					text-align: center;
				}
				.overview_item1_value {
					margin-top: 6px;
					font-family: PingFangSC-Semibold;
					font-size: 24px;
					color: #1C86F3;
					text-align: center;
				}
			}
		}
	}
</style>