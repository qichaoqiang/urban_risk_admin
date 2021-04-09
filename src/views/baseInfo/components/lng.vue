<template>
	<div>
		<div>
			<Row type="flex" align="middle" justify="space-between" :gutter="20">
            	<Col :span="18" style="text-align: left">
            		<Input 
						v-model="baseInfo.lngAndLat" 
						icon="md-pin" 
						placeholder="经纬度" />
            	</Col>
            	<Col :span="6" style="text-align: left" v-show="canEdit && !isDisEditInfo">
            		<span @click="openLngModal" class="link">地图选取</span>
            	</Col>
            </Row>
			
		</div>

		<Modal width="1000" title="经纬度标注" transfer v-model="showLngModel">
			<Row type="flex" align="middle" justify="space-between" :gutter="20">
            	<Col :span="22" style="text-align: left">
            		<Input clearable autocomplete v-model="keyword" placeholder="请输入地址"></Input>
            	</Col>
            	<Col :span="2">
            		<Button type="primary" size="large" @click="search">搜索</Button>
            	</Col>
            </Row>
			<div :id="id" class="area_box"></div>
			<div slot="footer">
	            <Row type="flex" align="middle" justify="space-between">
	            	<Col style="text-align: left">
	            		<span style="font-size: 14px; color: rgba(0,0,0,0.87);">{{lat}} {{lng}}</span>
	            		<br/>
	            		<span style="font-size: 12px; color: rgba(0,0,0,0.26);">在地图上点击，修改企业位置</span>
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
		data() {
			return {
				baseInfo: {
					lngAndLat: '',
				},
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
	
</style>