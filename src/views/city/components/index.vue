<template>
	<div class="container">
		<div v-show="hasReload">
			<div class="top">
				<Row type="flex" justify="space-between">
					<Button type="primary" ghost icon="md-arrow-back" @click="$router.back()"></Button>
					<RadioGroup v-model="tab" type="button">
						<Radio label="基本信息"></Radio>
						<Radio label="风险信息" v-if="!noRisk.includes(path)"></Radio>
						<Radio label="风险分级"></Radio>
					</RadioGroup>
				</Row>
			</div>
			
			<base-info v-if="tab == '基本信息'"></base-info>
			<risk-info v-if="tab == '风险信息'"></risk-info>
			<div v-if="tab == '风险分级'">
				<Row type="flex" justify="center">
					<Col>
						<Form :model="form" ref="fxy" hide-required-mark label-position="left" :label-width="120" style="width: 600px">
							<FormItem label="风险值">
					            <InputNumber :min="0" v-model="form.fxz"></InputNumber>
					        </FormItem>
					        <FormItem label="风险等级">
					            <Select clearable v-model="form.fxdj" placeholder="请选择">
					                <Option v-for="item in fxdjList" :key="item" :value="item">{{item}}</Option>
					            </Select>
					        </FormItem>
						</Form>
						<Row type="flex" justify="center">
							<Col>
								<Button type="primary" style="margin: 0 auto; width: 200px;" @click="submit">完成</Button>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
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
				hasReload: false,
				form: {
					fxz: this.$storage.get('fxyInfo') ? this.$storage.get('fxyInfo').fxz - 0 : 0,
					fxdj: this.$storage.get('fxyInfo') ? this.$storage.get('fxyInfo').fxdj : '',
				},
				fxdjList: ['重大风险', '较大风险', '一般风险', '低风险'],
				noRisk: ['rfgc', 'fkjbq', 'wf', 'hp', 'dwyldd', 'dzzhyhd'],
				path,
			}
		},
		methods: {
			async submit() {
				let params = {
					...this.form,
					gkdx_id: this.$storage.get('userInfo').gkdx_id,
				}
				let { status_code, data, message } = await api.fxfj(params)
				if(status_code == 200) {
					this.$Message.success(message)
				}
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