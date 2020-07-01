<template>
	<div class="container">
		<div v-show="hasReload">
			<div class="top">
				<Row type="flex" justify="space-between">
					<Button type="primary" ghost icon="md-arrow-back" @click="$router.back()"></Button>
					<RadioGroup v-model="tab" type="button">
						<Radio label="基本信息"></Radio>
						<Radio label="风险信息"></Radio>
					</RadioGroup>
				</Row>
			</div>
			
			<base-info v-if="tab == '基本信息'"></base-info>
			<risk-info v-if="tab == '风险信息'"></risk-info>
		</div>
	</div>
</template>

<script>
	import storage from 'good-storage'
	import store from '@/store/index'
	const path = store.state.path[storage.get('userInfo').fxylb]
	console.log(path)
	// resolve => require([`@/views/base/${path}/index.vue`], resolve)
	var baseInfo = resolve => require([`@/views/base/view/${path}/index.vue`], resolve)
	var riskInfo = resolve => require([`@/views/baseInfo/view/${path}/risk.vue`], resolve)
	// import baseInfo from `@/views/base/${path}/index.vue`
	export default {
		components: { baseInfo, riskInfo },
		props: {
			type: {
				default: 2,
				type: Number
			}
		},
		data() {
			return {
				tab: '基本信息',
				hasReload: false
			}
		},
		created() {
			// location.reload()
			if(!this.$storage.get('hasReload')) {
				this.$storage.set('hasReload', 1)
				location.reload()
				// location.replace(location.href + '?type=1')
			}else {
				this.hasReload = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-top: 24px;
	}
</style>