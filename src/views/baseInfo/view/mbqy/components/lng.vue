<template>
	<div>
		<div @click="openLngModal">
			<Input 
				readonly 
				v-model="baseInfo.lngAndLat" 
				icon="md-pin" 
				placeholder="经纬度" />
		</div>

		<Modal width="1000" title="企业经纬度标注" transfer v-model="showLngModel">
			<div id="lng_box1" class="area_box"></div>
			<div slot="footer">
	            <Row type="flex" align="middle" justify="space-between">
	            	<Col style="text-align: left">
	            		<span style="font-size: 14px; color: rgba(0,0,0,0.87);">{{lat}} {{lng}}</span>
	            		<br/>
	            		<span style="font-size: 12px; color: rgba(0,0,0,0.26);">地图上拖动或点击光标，修改企业位置</span>
	            	</Col>
	            	<Col>
	            		<Button type="text" size="large" @click="showLngModel = false">取消</Button>
		                <Button type="primary" size="large" @click="saveLng">保存</Button>
	            	</Col>
	            </Row>
	        </div>
		</Modal>
	</div>
	
</template>

<script>
	import lngjs from '@/common/js/lng3'
	export default {
		name: '',
		mixins: [lngjs],
		props: {
			lngAndLat: {
				default: '',
				type: String
			}
		},
		data() {
			return {
				baseInfo: {
					lngAndLat: ''
				}
			}
		},
		watch: {
			'baseInfo.lngAndLat'(val) {
				this.$emit('update:lngAndLat', val)
			}
		},
		computed: {

		},
		methods: {

		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.area_box {
		margin: 12px;
		height: 300px;
	}
</style>