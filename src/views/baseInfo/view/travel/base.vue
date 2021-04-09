<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div>
			<Row type="flex" justify="center">
				<Col>
					<part-title text="基本信息"></part-title>
					<Form :model="baseInfo" label-position="left" disabled :label-width="120" style="width: 600px">
						<FormItem label="旅游景点名称">
				            {{baseInfo.lyjdmc}}
				        </FormItem>
				        <FormItem label="行业代码">
				            <Input clearable v-model="baseInfo.hydm" placeholder=""></Input>
				        </FormItem>
				        <FormItem label="景区等级">
				            <Select clearable v-model="baseInfo.jqdj" placeholder="">
				                <Option v-for="item in jqdjList" :key="item" :value="item">{{item}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="开业时间">
				            <DatePicker type="date" v-model="baseInfo.kysj"  placeholder=""></DatePicker>
				        </FormItem>
				        <FormItem label="景区运行状态">
				            <Select clearable v-model="baseInfo.yxzt" placeholder="">
				                <Option v-for="item in yxztList" :key="item" :value="item">{{item}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="景区营业时间">
				        	<TimePicker type="timerange" v-model="baseInfo.jqyysj" placeholder=""></TimePicker>
				        </FormItem>
				        <FormItem label="地址">
				        	<Input clearable v-model="addressInfo.dz" placeholder=""></Input>
				        </FormItem>
				        <FormItem label="经纬度">
				        	<Input 
		        				readonly 
		        				v-model="addressInfo.lngAndLat" 
		        				icon="md-pin" 
		        				placeholder="" />
				        </FormItem>
				        <FormItem label="区域范围">
				        	<!-- <Input 
		        				readonly 
		        				v-model="addressInfo.dyfw" 
		        				icon="md-pin" 
		        				placeholder="" /> -->
		        				<span @click="openAreaModal" style="color: #2d8cf0">查看</span>
				        </FormItem>
				        <FormItem label="经营单位">
				            <Input clearable v-model="baseInfo.jydw" placeholder=""></Input>
				        </FormItem>
				        <FormItem label="所属区域">
				        	<Cascader 
				            	clearable 
				            	change-on-select
				            	v-model="baseInfo.quyu" 
				            	:data="areaList" 
				            	placeholder=""></Cascader>
				        </FormItem>
				        <FormItem label="社会统一信用代码">
				            <Input clearable v-model="baseInfo.tyshxydm" placeholder=""></Input>
				        </FormItem>
				        <FormItem label="景区介绍">
				            <Input clearable v-model="baseInfo.jqjs" type="textarea" placeholder=""></Input>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<div class="line"></div>
			<Row type="flex" justify="center">
				<Col>
					<part-title text="联系人信息"></part-title>
					<Form :model="contactInfo" label-position="left" :disabled="true" :label-width="120" style="width: 600px">
				        <FormItem label="经办人">
				        	<Row type="flex" :gutter="20">
					        	<Col span="8">
				        			<Input readonly v-model="contactInfo.jbr"></Input>
				        		</Col>
				        		<Col span="16">
				        			<Input readonly v-model="contactInfo.jbrdh"></Input>
				        		</Col>
				        		<Col span="24">
				        			<Input readonly v-model="contactInfo.jbryx"></Input>
				        		</Col>
				        	</Row>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
		</div>
		<Modal title="企业经纬度标注" v-model="showLngModel">
			<div id="lng_box" class="area_box"></div>
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
		<Modal width="1000" title="区域范围标注" v-model="showAreaModel">
			<div id="area_box" class="area_box"></div>
			<div slot="footer"></div>
		</Modal>
	</div>
</template>

<script>
	import api from '@/api/api'
	import partTitle from '@/components/title'
	import tablejs from '@/common/js/table'
	import areajs from '@/common/js/area'
	import industryjs from '@/common/js/industry'
	export default {
		name: '',
		mixins: [tablejs, areajs, industryjs],
		components: { partTitle },
		data() {
			return {
				gkdx_id: this.$storage.get('userInfo').gkdx_id,
				loading: true,
				showAreaModel: false,
				showLngModel: false,
				showWhModel: false,
				showYaModel: false,
				showSbfcgyModel: false,
				showZaqModel: false,
				showMainRiskModel: false,
				showRimModel: false,
				modeType: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					lyjdmc: '旅游景点名称',
					tyshxydm: '',
					jqdj: '',
					kysj: '',
					quyu: [],
					jydw: '',
					hyml: [],
					hydm: '',
					jqyysj: [],
					jqjs: '',
					rjrl: '',
					yxzt: '',
				},
				addressInfo: {
					dz: '',
					dyfw: '',
					lngAndLat: '',
				},
				contactInfo: {
					jbr: '',
					jbrdh: '',
					jbryx: '',
				},
				area: '',
				lng: '',
				lat: '',
				typeList: [
					{
						value: 1,
						name: 'xxxx'
					}
				],
				form: null,
				statusList: [
					{
						value: 1,
						name: 'xxxx'
					}
				],
				jqdjList: ['A', 'AA', 'AAA', 'AAAA', 'AAAAA', '未评级'],
				yxztList: ['在运行', '封闭升级', '关闭休业'],
			}
		},
		watch: {

		},
		computed: {
			
		},
		methods: {
			async getBaseInfo() {
				let { status_code, data, message } = await api.getTravelBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					let { jbr, jbrdh, jbryx, lyjdmc, tyshxydm, jydw, quyu_id, jd, wd, jqdj, hydm, yxzt, jqyysj1, jqyysj2, jqjs, kjdzdlksl, rjrl, dyfw, dz} = this.form
					this.baseInfo = { lyjdmc, tyshxydm, jydw, jqdj, hydm, yxzt, jqjs }
					this.baseInfo.kysj = this.form.kysj ? new Date(this.form.kysj) : '';
					jqyysj1 = jqyysj1 ? jqyysj1 : ''
					jqyysj2 = jqyysj2 ? jqyysj2 : ''
					this.baseInfo.jqyysj = [jqyysj1, jqyysj2];
					this.addressInfo = { dyfw, dz}
					this.addressInfo.lngAndLat = this.form.jd && this.form.wd ? `${(this.form.jd - 0).toFixed(6)} ${(this.form.wd - 0).toFixed(6)}` : ''
					this.contactInfo = { jbr, jbrdh, jbryx }
					this.mostForm = { kjdzdlksl, rjrl }
					this.getQy()
					// this.getHy()
				}
			},
			saveInfo() {

			},
			openAreaModal() {	
				this.showAreaModel = true;
				this.$nextTick(() => {
					let lo = new BMap.Geolocation();
		            lo.getCurrentPosition((e) => {
						this.map = new T.Map('area_box');
			            if(this.addressInfo.dyfw) {
			            	let config = {
				                showLabel: true,
				                color: "blue", 
				                weight: 3, 
				                opacity: 0.5, 
				                fillColor: "#FFFFFF", 
				                fillOpacity: 0.5
				            };
			            	let dyfw = JSON.parse(this.addressInfo.dyfw)
			            	let points = dyfw.map(item => {
			            		return new T.LngLat(item.lng, item.lat)
			            	})
			            	let lng = 0, lat = 0;
			            	dyfw.forEach(item => {
			            		lng += item.lng - 0
			            	})
			            	dyfw.forEach(item => {
			            		lat += item.lat - 0
			            	})
			            	this.map.centerAndZoom(new T.LngLat(lng / dyfw.length, lat / dyfw.length), 10);
			            	// this.map.centerAndZoom(new T.LngLat(e.point.lng, e.point.lat), 10);
			            	this.map.addOverLay(new T.Polygon(points, config));
			            }else {
							this.map.centerAndZoom(new T.LngLat(e.point.lng, e.point.lat), 10);
			            }
		            });
				})
			},
			openArea() {
				this.polygonTool.open();
				this.polygonTool.addEventListener('draw', (e) => {
					// 获取绘制的多边形信息
					console.log(e);
				})
			},
			cancelArea() {
				this.map.clearOverLays()
				this.showAreaModel = false
			},
			saveArea() {
				this.showAreaModel = false
			},
			openLngModal() {
				this.showLngModel = true;
				this.$nextTick(() => {
					let self = this;
					let lo = new BMap.Geolocation();
		            lo.getCurrentPosition((e) => {
	                    this.lng = e.point.lng.toFixed(1);
	                    this.lat = e.point.lat.toFixed(1);
						this.map = new T.Map('lng_box');
	                    let marker = new T.Marker(e.lnglat);
	                    this.map.addOverLay(marker);
						this.map.centerAndZoom(new T.LngLat(e.point.lng, e.point.lat), 10);
						marker.enableDragging();
						marker.addEventListener('mouseup', (e) => {
							console.log(e.lnglat.getLng() + "," + e.lnglat.getLat());
							this.lng = e.lnglat.getLng().toFixed(1);
	                    	this.lat = e.lnglat.getLat().toFixed(1);
						})
		            });
				})
			},
			saveLng() {
				this.addressInfo.lngAndLat = `${this.lng} ${this.lat}`
				this.showLngModel = false
				this.$nextTick(() => {
					this.map = null;
					this.lng = '';
					this.lat = ''
				})
			},
			edit() {
				this.$storage.set('baseInfo', this.baseInfo);
				this.$storage.set('addressInfo', this.addressInfo);
				this.$storage.set('contactInfo', this.contactInfo);
				this.$storage.set('mostForm', this.mostForm);
				this.$storage.set('form', this.form);
				this.$router.push({
					path: '/base',
					query: {
						type: 2
					}
				})
			}
		},
		created() {
			this.getArea('', list => {
				this.areaList = list
				if(this.industryList.length > 0) {
					this.getBaseInfo()
				}
			})
			this.getIndustry('', list => {
				this.industryList = list
				if(this.areaList.length > 0) {
					this.getBaseInfo()
				}
			})
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.page {
		margin-bottom: 24px;
		.line {
			width: 100%;
			height: 10px;
			background: #f5f5f5;
		}
	}
</style>