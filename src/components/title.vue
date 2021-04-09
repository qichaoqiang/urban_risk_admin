<template>
	<Row type="flex" align="middle" justify="space-between" style="margin: 8px 0">
		<Col>
			<Row type="flex" align="middle">
				<Col>
					<div class="icon"></div>
				</Col>
				<Col>
					<div class="text">{{text}}</div>
				</Col>
			</Row>
		</Col>
		<Col>
			<Button v-if="btns.includes('add') && !isDisEditInfo" type="primary" icon="ios-add" @click="$emit('add')"></Button>
		</Col>
	</Row>
</template>

<script>
	export default {
		name: '',
		props: {
			text: String,
			btns: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				page: {
					pageSize: 10
				}
			}
		},
		watch: {

		},
		computed: {

		},
		methods: {
			onLoad() {
				console.log(this)
			}
		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style lang="less" scoped>
	.icon {
		margin-right: 8px;
		width: 3px;
		height: 14px;
		background: #567DF1;
	}
	.text {
		font-family: PingFangSC-Medium;
		font-size: 16px;
		color: rgba(0,0,0,0.87);
	}
</style>