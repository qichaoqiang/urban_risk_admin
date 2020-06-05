<template>
	<div class="map_container">
		<div class="title">风险区域</div>
		<Divider />
		<Row type="flex" align="middle" :gutter="20">
			<Col span="6">
				<Select clearable v-model="searchForm.name" placeholder="城市">
	                <Option v-for="item in typeList" :key="item.value" :value="item.value">{{item.name}}</Option>
	            </Select>
			</Col>
			<Col span="6">
				<Select clearable v-model="searchForm.area" placeholder="区域">
	                <Option v-for="item in typeList" :key="item.value" :value="item.value">{{item.name}}</Option>
	            </Select>
			</Col>
			<Col span="6">
				<Select clearable v-model="searchForm.level" placeholder="风险源等级">
	                <Option v-for="item in typeList" :key="item.value" :value="item.value">{{item.name}}</Option>
	            </Select>
			</Col>
			<Col span="6">
				<Button type="primary" icon="ios-search">搜索</Button>
			</Col>
		</Row>
		<div id="risk_map" class="risk_source" style="height"></div>
	</div>
</template>

<script>
	import map from './mixins/map'
	export default {
		name: '',
		mixins: [map],
		data() {
			return {
				searchForm: {
					name: '',
					level: '',
					area: '',
					
				}
			}
		},
		watch: {

		},
		computed: {

		},
		methods: {

		},
		created() {

		},
	}
</script>

<style lang="scss" scoped>
	.map_container {
		height: 100%;
		display: flex;
		flex-direction: column;
		.risk_source {
			margin-top: 16px;
			flex-grow: 1;
		}
	}
</style>