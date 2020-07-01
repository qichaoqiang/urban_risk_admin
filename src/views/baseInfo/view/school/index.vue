<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div>
			<Row type="flex" justify="center">
				<Col>
					<Row type="flex" justify="end" style="margin-top: 12px">
						<Col>
							<Button type="primary" @click="edit">编辑</Button>
						</Col>
					</Row>
					<part-title text="基本信息"></part-title>
					<Form :model="baseInfo" label-position="left" disabled :label-width="120" style="width: 600px">
						<FormItem label="学校名称">
				            {{baseInfo.xxmc}}
				        </FormItem>
				        <FormItem label="举办单位">
				            <Input clearable v-model="baseInfo.jbdw" placeholder="举办单位"></Input>
				        </FormItem>
				        <FormItem label="学校类型">
				            <Select clearable v-model="baseInfo.xxlx" placeholder="学校类型">
				                <Option v-for="item in xxlxList" :key="item" :value="item">{{item}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="建成投用时间">
				            <DatePicker type="date" v-model="baseInfo.jctysj"  placeholder="建成投用时间"></DatePicker>
				        </FormItem>
				        <FormItem label="行业代码">
				            <Input clearable v-model="baseInfo.hydm" placeholder="行业代码"></Input>
				        </FormItem>
				        <FormItem label="所属辖区">
				        	<Cascader 
				            	clearable 
				            	change-on-select
				            	v-model="baseInfo.quyu" 
				            	:data="areaList" 
				            	:load-data="loadArea" 
				            	placeholder="所属辖区"></Cascader>
				        </FormItem>
				        <FormItem label="社会统一信用代码">
				            <Input clearable v-model="baseInfo.tyshxydm" placeholder="社会统一信用代码"></Input>
				        </FormItem>
				        <FormItem label="举办单位注册登记地址">
				            <Input clearable v-model="baseInfo.jbdwzcdjdz" placeholder="举办单位注册登记地址"></Input>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<div class="line"></div>
			<Row type="flex" justify="center">
				<Col>
					<part-title text="位置信息"></part-title>
					<Form :model="addressInfo" label-position="left" :disabled="true" :label-width="120" style="width: 600px">
				        <FormItem label="学校地址">
				        	<Input clearable v-model="addressInfo.xxdz" placeholder="学校地址"></Input>
				        </FormItem>
				         <FormItem label="学校占地面积（㎡）">
				        	<InputNumber :min="0" v-model="addressInfo.xxzdmj" placeholder="占地面积"></InputNumber>
				        </FormItem>
				        <FormItem label="学校建筑占地面积（㎡）">
				        	<InputNumber :min="0" v-model="addressInfo.jxjzzdmj" placeholder="建筑面积"></InputNumber>
				        </FormItem>
				        <FormItem label="经纬度">
				        	<div @click="openLngModal">
			        			<Input 
			        				readonly 
			        				v-model="addressInfo.lngAndLat" 
			        				icon="md-pin" 
			        				placeholder="经纬度" />
			        		</div>
				        </FormItem>
				        <FormItem label="学校范围">
				        	<div @click.stop="openAreaModal">
			        			<Input 
			        				readonly 
			        				v-model="addressInfo.xxfw" 
			        				icon="md-pin" 
			        				placeholder="学校范围" />
			        		</div>
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
				        			<Input clearable v-model="contactInfo.jbr" :data="areaList" placeholder="姓名"></Input>
				        		</Col>
				        		<Col span="16">
				        			<Input clearable v-model="contactInfo.jbrdh" placeholder="电话"></Input>
				        		</Col>
				        		<Col span="24">
				        			<Input clearable v-model="contactInfo.jbryx" placeholder="邮箱"></Input>
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
		<Modal title="区域范围标注" v-model="showAreaModel">
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
				xxlxList: ['幼儿园', '小学', '初中', '普通高中', '九年一贯制', '十二年一贯制', '职业高中', '职业技术学校', '特殊学校', '大学', ],
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
				let { status_code, data, message } = await api.getSchoolBase();
				if(status_code == 200) {
					this.form = data.data[0];
					let { jbr, jbrdh, jbryx, xxmc, jbdw, jbdwzcdjdz, tyshxydm, xxdz, quyu_id, jd, wd, xxfw, jctysj, xxlx, hydm, jxjzzdmj, jzgrs, xsrs, jsz, cws, xfzddw, xxzdmj} = this.form
					this.baseInfo = { xxmc, jbdw, jbdwzcdjdz, tyshxydm, xxdz, xxlx, hydm }
					this.baseInfo.jctysj = this.form.jctysj ? new Date(this.form.jctysj) : '';
					this.addressInfo = { xxfw, xxdz, xxzdmj, jxjzzdmj }
					this.addressInfo.xxzdmj = xxzdmj ? Number(xxzdmj) : 0
					this.addressInfo.jxjzzdmj = jxjzzdmj ? Number(jxjzzdmj) : 0
					this.addressInfo.lngAndLat = this.form.jd && this.form.wd ? `${(this.form.jd - 0).toFixed(2)} ${(this.form.wd - 0).toFixed(2)}` : ''
					this.contactInfo = { jbr, jbrdh, jbryx }
					this.mostForm = { jzgrs, xsrs, jsz, cws, xfzddw }
					this.getQy()
					// this.getHy()
				}
			},
			saveInfo() {

			},
			openAreaModal() {	
				this.showAreaModel = true;
				this.$nextTick(() => {
					let lo = new T.Geolocation();
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
			            	// this.map.centerAndZoom(new T.LngLat(e.lnglat.lng, e.lnglat.lat), 10);
			            	this.map.addOverLay(new T.Polygon(points, config));
			            }else {
							this.map.centerAndZoom(new T.LngLat(e.lnglat.lng, e.lnglat.lat), 10);
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
					let lo = new T.Geolocation();
		            lo.getCurrentPosition((e) => {
	                    this.lng = e.lnglat.lng.toFixed(1);
	                    this.lat = e.lnglat.lat.toFixed(1);
						this.map = new T.Map('lng_box');
	                    let marker = new T.Marker(e.lnglat);
	                    this.map.addOverLay(marker);
						this.map.centerAndZoom(new T.LngLat(e.lnglat.lng, e.lnglat.lat), 10);
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
				this.getBaseInfo()
			})
			// this.getIndustry('', list => {
			// 	this.industryList = list
			// 	if(this.areaList.length > 0) {
			// 		this.getBaseInfo()
			// 	}
			// })
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