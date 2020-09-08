<template>
	<div class="trade" ref="trade">
		<div class="trade_item" :class="{trade_item1: level == 1}" v-for="item in data" v-show="item.children || level != 1" :style="{'padding-left': left}">
			<div class="trade_father" @click="handleClickItem(item)" :class="{selected: $store.state.industry && $store.state.industry.id == item.id}">
				<div class="check" v-if="level != 1" @click.stop.prevent="handleSelect(item)"></div>
				<img class="icon" v-if="level == 2" :src="iconUrl(item)">	
				<span :class="`text${level}`">{{item.fxylbmc}}</span>
				<div class="arrow" v-if="item.children && item.children.length >= 1 && level < 2" :class="{arrow_rotate1: item.showChildren, arrow_rotate2: !item.showChildren}">
					<Icon type="md-arrow-dropdown" size="12px" :color="item.selected ? '#10F6FF' : '#fff'" />
				</div>
			</div>
			<div 
				class="trade_brother" 
				:id="'trade_brother' + item.id" 
				v-if="item.children && item.children.length >= 1 && level < 2" 
				:style="{height: contentHeight + 'px'}">
				<div class="trade_brother_content">
					<trade 
						:data="item.children" 
						:selectData="currentData"
						:level="level + 1" 
						@selectFather="handleSelectFather"></trade>
				</div>
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
				contentHeight: 0
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
			},
		},
		methods: {
			iconUrl(item) {
				let iconUrl
				try {
					iconUrl = require(`../../assets/risk-point/${item.dm}-${this.$store.state.industry && this.$store.state.industry.id == item.id ? '5' : '6'}.png`)
				} 
				catch {
					iconUrl = require(`../../assets/risk-point/fengxianyuan-${this.$store.state.industry && this.$store.state.industry.id == item.id ? '5' : '6'}.png`)
				}
				return iconUrl
			},
			handleSelectDataChange() {
				if(this.level == 3) {
					
				}
				this.data.forEach(item => {
					if(item.parent_id == this.selectData.selectId) {
						item.selected = this.selectData.selectAll
						this.setCurrentData(item);
					}
				})
			},
			handleClickItem(item) {
				this.data.forEach(item_ => {
					if(item.id !== item_.id) {
						$(`#trade_brother${item_.id}`).stop().slideUp();
					}
				})
				$(`#trade_brother${item.id}`).stop().slideToggle();
			},
			handleSelect(item) {
				if(this.$store.state.industry && this.$store.state.industry.id == item.id) {
					this.$store.dispatch('save_industry', null)
				}else {
					this.$store.dispatch('save_industry', item)
				}
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
					this.$emit('selectFather', this.data[0].parent_id, 1);
				}else {
					this.$emit('selectFather', this.data[0].parent_id, 2);
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
			},
			setHeight() {
				this.contentHeight = this.$refs.trade.offsetHeight - 38 * 3 - 20
				this.$nextTick(() => {
					$(`#trade_brother49`).stop().slideToggle();
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
		height: 100%;
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
					flex-shrink: 0;
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
				width: 100%;
				overflow: hidden;
				&:first-child {
					display: block;
				}
				.trade_brother_content {
					box-sizing: border-box;
					padding-right: 20px;
					width: 100%;
					height: 100%;
					padding-bottom: 24px;
					overflow-y: scroll;
				}
			}
		}
		.trade_item1 {
			// padding-left: 0;
		}
	}
</style>