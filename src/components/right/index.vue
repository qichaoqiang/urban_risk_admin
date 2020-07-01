<template>
	<div class="trade">
		<div class="trade_item">
			<div class="title">
				<img class="title_icon" src="@/assets/decorate-1.png">
				<div class="title_tab">
					<Tabs value="name1">
						<TabPane label="风险图层" name="name1">
							<div style="margin-top: 8px; height: 270px; width: 100%; overflow: hidden">
								<div  style="padding-bottom: 20px; height: 290px; box-sizing: border-box; width: calc(100% + 18px); overflow: scroll">
									<trade :data="tradeList" left="0px" :level="1" @selectChange="handleSelectChange"></trade>
								</div>
							</div>
						</TabPane>
						<TabPane label="应急图层" name="name2"></TabPane>
					</Tabs>
				</div>
			</div>
			<!-- <title-top name="行业分类" left="0px"></title-top> -->
			<!-- <level></level> -->
		</div>
		<div class="trade_item" v-if="$store.state.tradeList.length > 0">
			<title-top name="各行业占比" left="0px"></title-top>
			<trade-rate></trade-rate>
		</div>
		<div class="trade_item">
			<title-top name="风险点风险变化" left="0px"></title-top>
			<risk-change></risk-change>
		</div>
	</div>
</template>

<script>
	import TitleTop from '../common/title'
	import Level from './level'
	import Trade from './trade'
	import TradeRate from './tradeRate'
	import RiskChange from './riskChange'
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	export default {
		name: 'tradeBox',
		data() {
			return {
				currentId: '',
				selectIdList: []
			}
		},
		components: {
			TitleTop,
			Level,
			Trade,
			TradeRate,
			RiskChange
		},
		watch: {

		},
		computed: {
			...mapState(['tradeList']),
			// tradeList() {
			// 	return this.$store.state.tradeList;
			// }
		},
		methods: {
			...mapActions(['save_tradeList']),
			handleSelectChange(id) {
				this.currentId = id;
				// this.getSelectIdList(this.tradeList);
			},
			getSelectIdList(list, bool) {
				list.forEach(item => {
					if(bool) {
						item.selected = bool == 1 ? true : false
					}
					if(item.selected) {
						if(!this.selectIdList.includes(item.id)) {
							this.selectIdList.push(item.id);
							if(item.children && item.children.length >= 1) {
								this.getSelectIdList(item.children, 1)
							}
						}else {
							if(item.children && item.children.length >= 1) {
								this.getSelectIdList(item.children)
							}
						}
					}else {
						if(this.selectIdList.includes(item.id)) {
							let index = this.selectIdList.indexOf(item.id);
							this.selectIdList.splice(index, 1);
							if(item.children && item.children.length >= 1) {
								if(this.currentId == item.id || this.currentId == item.parentId) {
									this.getSelectIdList(item.children, 2)
								}else if(item.children.filter(item => item.id == this.currentId)[0]) {
									this.getSelectIdList(item.children.filter(item => item.id == this.currentId)[0].children, 2)
								}
							}
						}else {
							if(item.children && item.children.length >= 1) {
								this.getSelectIdList(item.children)
							}
						}
					}
				})
				this.$store.dispatch('save_selectIds', this.selectIdList.join(','));
				this.$store.dispatch('save_tradeList', this.tradeList);
			},
			selectChildren(list, bool) {
				list.forEach(item => {
					item.selected = bool;
				})
			}
		},
		created() {
			this.$store.dispatch('save_tradeList', this.tradeList);
		},
		mounted() {
			console.log(this.tradeList);
		}
	}
</script>

<style lang="scss" scoped>
	.trade {
		.trade_item {
			position: relative;
			width: 100%;
			box-sizing: border-box;
			padding: 8px 32px 16px;
			background: rgba(5,27,74,0.87);
			border: 1px solid #10388C;
			box-shadow: inset 0 0 32px 0 rgba(0,163,255,0.30);
			&:before {
				position: absolute;
				top: 0;
				left: 0;
				content: '';
				width: 24px;
				height: 24px;
				background-image: url('../../assets/upleft.png');
				background-size: 100% 100%;
			}
			&:after {
				position: absolute;
				bottom: 0;
				right: 0;
				content: '';
				width: 24px;
				height: 24px;
				background-image: url('../../assets/low-right.png');
				background-size: 100% 100%;
			}
			.title {
				display: flex;
				// align-items: center;
				.title_icon {
					margin-top: 16px;
					margin-right: 8px;
					width: 16px;
					height: 15px;
				}
				.title_tab {
					flex: 1;
					/deep/.ivu-tabs {
						.ivu-tabs-bar {
							border-bottom: none;
							.ivu-tabs-nav {
								.ivu-tabs-tab {
									color: rgba(255,255,255,0.70);
									&:hover {
										color: #10F6FF;
									}
								}
								.ivu-tabs-tab-active {
									font-size: 18px;
									color: #10F6FF;
								}
								.ivu-tabs-ink-bar {
									background-color: #10F6FF;
								}
							}
						}
					}
				}
			}
		}
	}
</style>