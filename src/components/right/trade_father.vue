<template>
	<div class="trade_father" @click="handleClickItem(item)" :class="{selected: item.selected}">
		<div class="check" @click.stop.prevent="handleSelect(item)"></div>
		<img class="icon" v-if="level <= 2" :src="require(`../../assets/trade/icon-${item.id}${item.selected ? 'on' : ''}.png`)">	
		<span :class="`text${level}`">{{item.info}}</span>
		<div class="arrow" v-if="item.children && item.children.length >= 1" :class="{arrow_rotate1: item.showChildren, arrow_rotate2: !item.showChildren}">
			<Icon type="md-arrow-dropdown" size="12px" :color="item.selected ? '#10F6FF' : '#fff'" />
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
			item: {
				default() {
					return {}
				},
				type: Object
			},
			level: {
				default: 0,
				type: Number
			},
		},
		watch: {
			'item.selected'(val) {
				console.log(val);
			}
		},
		computed: {

		},
		methods: {
			handleClickItem(item) {
				this.$emit('clickItem', item);
			},
			handleSelect(item) {
				this.$emit('selectItem', item);
			}
		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
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
</style>