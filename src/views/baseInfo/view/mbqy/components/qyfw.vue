<template>
	<div>
		<div @click="openAreaModal">
			<Input 
				readonly 
				v-model="baseInfo.qyfw" 
				icon="md-pin" 
				placeholder="区域范围" />
		</div>

		<Modal title="区域范围标注" v-model="showAreaModel">
			<div id="area_box1" class="area_box1"></div>
			<div slot="footer">
	            <Row type="flex" align="middle" justify="space-between">
	            	<Col style="text-align: left">
	            		<Button type="info" size="small" ghost @click="openArea">开启标注</Button>
	            		<!-- <Button type="warning" size="small" ghost @click="polygonTool.close()">关闭标注</Button> -->
	            		<Button type="warning" size="small" ghost @click="map.clearOverLays()">清除标注</Button>
	            	</Col>
	            	<Col>
	            		<Button type="text" size="large" @click="showAreaModel = false">取消</Button>
		                <Button type="primary" size="large" @click="saveArea">保存</Button>
	            	</Col>
	            </Row>
	        </div>
		</Modal>
	</div>
	
</template>

<script>
	export default {
		name: '',
		props: {
			qyfw: {
				default: '',
				type: String
			}
		},
		data() {
			return {
				baseInfo: {
					qyfw: ''
				},
				map: null,
				showAreaModel: false,
				polygonTool: null
			}
		},
		watch: {
			'baseInfo.qyfw'(val) {
				this.$emit('update:qyfw', val)
			}
		},
		computed: {

		},
		methods: {
			openAreaModal() {	
				this.showAreaModel = true;
				this.$nextTick(() => {
					let self = this;
					let lo = new T.Geolocation();
		            lo.getCurrentPosition((e) => {
						this.map = new T.Map('area_box1');
						this.map.centerAndZoom(new T.LngLat(e.lnglat.lng, e.lnglat.lat), 10);
						var config = {
			                showLabel: true,
			                color: "blue", 
			                weight: 3, 
			                opacity: 0.5, 
			                fillColor: "#FFFFFF", 
			                fillOpacity: 0.5
			            };
			            //创建标注工具对象
			            this.polygonTool = new T.PolygonTool(this.map, config);
			            if(this.baseInfo.qyfw) {
			            	let qyfw = JSON.parse(this.baseInfo.qyfw)
			            	let points = qyfw.map(item => {
			            		return new T.LngLat(item.lng, item.lat)
			            	})
			            	this.map.addOverLay(new T.Polygon(points, config));
			            }
		            });
				})
			},
			openArea() {
				let self = this
				this.polygonTool.open();
				this.polygonTool.addEventListener('draw', (e) => {
					// 获取绘制的多边形信息
					console.log(e);
					this.baseInfo.qyfw = JSON.stringify(e.currentLnglats)
				})
			},
			clearArea() {
				this.baseInfo.qyfw = ''
				this.map.clearOverLays()
			},
			cancelArea() {
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.baseInfo.qyfw = this.qyfw || '';
				this.showAreaModel = false
			},
			saveArea() {
				this.qyfw = this.baseInfo.qyfw;
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.showAreaModel = false
			},
		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.area_box1 {
		margin: 12px;
		height: 300px;
	}
</style>