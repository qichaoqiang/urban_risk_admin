<template>
	<div class="trade">
		<div class="trade_item" :class="{trade_item1: level == 1}" v-for="item in data" :style="{'padding-left': left}">
			<div class="trade_father" @click="handleClickItem(item)" :class="{selected: selectIds.includes(item.id + '')}">
				<div class="check" @click.stop.prevent="handleSelect(item)"></div>
				<img class="icon" v-if="level <= 2" :src="require(`../../assets/trade/icon-${item.id}${item.selected ? 'on' : ''}.png`)">	
				<span :class="`text${level}`">{{item.info}}</span>
				<div class="arrow" v-if="item.children && item.children.length >= 1" :class="{arrow_rotate1: item.showChildren, arrow_rotate2: !item.showChildren}">
					<Icon type="md-arrow-dropdown" size="12px" :color="item.selected ? '#10F6FF' : '#fff'" />
				</div>
			</div>
			<!-- <trade-father :level="level" :item="item" @clickItem="handleClickItem" @selectItem="handleSelect"></trade-father> -->
			<div class="trade_brother" :id="'trade_brother' + item.id" v-if="item.children && item.children.length >= 1">
				<trade 
					:data="item.children" 
					:selectData="currentData"
					:level="level + 1" 
					@selectFather="handleSelectFather"></trade>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	import tradeFather from './trade_father'
	export default {
		name: 'trade',
		data() {
			return {
				selectIdList: [],
				currentData: {
					selectAll: false,
					selectId: 0
				},
			}
		},
		components: {
			tradeFather
		},
		props: {
			data: {
				default() {
					return []
				},
				type: Array
			},
			left: {
				default: '32px',
				type: String
			},
			level: {
				default: 0,
				type: Number
			},
			selectData: {
				default() {
					return  {
						selectAll: false,
						selectId: 0
					}
				},
				type: Object
			}
		},
		watch: {
			'selectData.selectAll'(val) {
				this.handleSelectDataChange();
			},
			'selectData.selectId'(val) {
				this.handleSelectDataChange();
			},
		},
		computed: {
			selectIds() {
				return this.$store.state.selectIds.split(',');
			}
		},
		methods: {
			handleSelectDataChange() {
				if(this.level == 3) {
					
				}
				this.data.forEach(item => {
					if(item.parentId == this.selectData.selectId) {
						item.selected = this.selectData.selectAll
						this.setCurrentData(item);
					}
				})
			},
			handleClickItem(item) {
				item.showChildren = !item.showChildren;
				$(`#trade_brother${item.id}`).stop().slideToggle();
			},
			handleSelect(item) {
				item.selected = !item.selected;
				this.setCurrentData(item);
			},
			setCurrentData(item) {
				this.currentData.selectAll = item.selected;
				this.currentData.selectId = item.id;
				this.pushSelectId(item);
			},
			pushSelectId(item) {
				let selectIdList = [];
				this.data.forEach(item => {
					item.selected && selectIdList.push(item.id)
				})
				this.selectIdList = selectIdList;
				if(selectIdList.length == this.data.length) {
					this.$emit('selectFather', this.data[0].parentId, 1);
				}else {
					this.$emit('selectFather', this.data[0].parentId, 2);
				}
				this.updateSelectIds(item);
			},
			// 更新selectIds 
			updateSelectIds(item) {
				let list =  this.$store.state.selectIds ? this.$store.state.selectIds.split(',') : [];
				let id = item.id + '';
				if(item.selected) {
					!list.includes(id) && list.push(id);
				}else {
					list.includes(id) && list.splice(list.indexOf(id), 1);
				}
				this.$store.dispatch('save_selectIds', list.join(','));
			},
			handleSelectFather(id, bool) {
				this.data.forEach(item => {
					if(item.id == id) {
						item.selected = bool == 1 ? true : false;
						this.pushSelectId(item);
					}
				})
			}
		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.trade {
		.trade_item {
			padding-left: 32px;
			box-sizing: border-box;
			width: 100%;
			.trade_father {
				height: 38px;
				display: flex;
				align-items: center;
				cursor: pointer;
				.check {
					margin-right: 16px;
					width: 20px;
					height: 20px;
					background: url('../../assets/agreement_off.png');
					background-size: 100%;
				}
				.icon {
					margin-right: 8px;
					width: 24px;
					height: 24px;
				}
				span {
					font-family: PingFangSC-Semibold;
					font-size: 16px;
					color: #FFFFFF;
					text-align: left;
				}
				.text1 {
					font-family: PingFangSC-Semibold;
					font-size: 16px;
				}
				.text2 {
					font-family: PingFangSC-Medium;
					font-size: 14px;
				}
				.text3 {
					font-family: PingFangSC-Regular;
					font-size: 13px;
				}
				.arrow {
					width: 16px;
					height: 16px;
					transform: rotate(0deg);
					transform-origin: center;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.arrow_rotate1 {
					animation: rotate 0.5s;
					animation-fill-mode: forwards;
				}
				@keyframes rotate{
					from {
						transform: rotate(0deg);
					}
					to {
						transform: rotate(180deg);
					}
				}
				.arrow_rotate2 {
					animation: rotateBack 0.5s;
					animation-fill-mode: forwards;
				}
				@keyframes rotateBack{
					from {
						transform: rotate(180deg);
					}
					to {
						transform: rotate(0deg);
					}
				}
			}
			.selected {
				.check {
					background: url('../../assets/agreement_on.png');
					background-size: 100%;
				}
				span {
					color: #10F6FF;
				}
			}
			.trade_brother {
				display: none;
			}
		}
		.trade_item1 {
			// padding-left: 0;
		}
	}
</style>