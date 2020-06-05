<template>
	<div class="level">
		<div class="level_item" v-for="item in levelList" :key="item.name">
			<div class="level_item_top" @click="handleClickItem(item)">
				<div class="check" :class="{selected: item.selected}"></div>
				<div class="bg" :style="{background: item.color}"></div>
			</div>
			<div class="level_item_value">({{item.value}}个)</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: '',
		data() {
			return {
				levelList: [{
		            name: '非常高',
		            level: 0,
		            value: 194,
		            color: '#F25E5E',
		            selected: false,
		        }, {
		            name: '较高',
		            level: 1,
		            value: 291,
		            color: '#F49852',
		            selected: false,
		        }, {
		            name: '一般',
		            level: 2,
		            value: 194,
		            color: '#EFE850',
		            selected: false,
		        }, {
		            name: '较低',
		            level: 3,
		            value: 478,
		            color: '#1C86F3',
		            selected: false,
		        }]
			}
		},
		watch: {

		},
		computed: {

		},
		methods: {
			handleClickItem(item) {
				item.selected = !item.selected;
				let levelIdList = [];
				this.levelList.forEach(item => {
					item.selected && levelIdList.push(item.level)
				});
				this.$store.dispatch('save_levelIds', levelIdList.join(','));
			}
		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.level {
		margin: 24px 0;
		width: 100%;
		display: flex;
		justify-content: space-between;
		.level_item {
			.level_item_top {
				display: flex;
				justify-content: center;
				align-items: center;
				.check {
					margin-right: 16px;
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
				.bg {
					width: 16px;
					height: 16px;
				}
			}
			.level_item_value {
				margin-top: 8px;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #FFFFFF;
				text-align: center;
			}
		}
	}
</style>