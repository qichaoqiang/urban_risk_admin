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
						<FormItem label="场所名称">
				            {{baseInfo.csmc}}
				        </FormItem>
				        <FormItem label="场所类型">
				            <Select clearable v-model="baseInfo.cslx" placeholder="场所类型">
				                <Option v-for="item in cslxList" :key="item" :value="item">{{item}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="宗教类型" v-if="baseInfo.cslx == '宗教场所'">
				            <Select clearable v-model="baseInfo.zjlb" placeholder="宗教类型">
				                <Option v-for="item in zjlbList" :key="item" :value="item">{{item}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="申请单位" v-if="baseInfo.cslx == '民间信仰'">
				            <Input clearable v-model="baseInfo.sqdw" placeholder="申请单位"></Input>
				        </FormItem>
				        <FormItem label="登记编号" v-if="baseInfo.cslx == '民间信仰'">
				            <Input clearable v-model="baseInfo.djbh" placeholder="登记编号"></Input>
				        </FormItem>
				        <FormItem label="在册人数">
				            <InputNumber :min="0" v-model="baseInfo.zcrs" placeholder="在册人数"></InputNumber>
				        </FormItem>
				        <FormItem label="投用时间">
				            <DatePicker type="date" v-model="baseInfo.tysj"  placeholder="投用时间"></DatePicker>
				        </FormItem>
				        <FormItem label="行业代码">
				            <Input clearable v-model="baseInfo.hydm" placeholder="行业代码"></Input>
				        </FormItem>
				        <FormItem label="所辖管区">
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
				        <FormItem label="法定代表人">
				            <Input clearable v-model="baseInfo.fddbr" placeholder="法定代表人"></Input>
				        </FormItem>
				        <FormItem label="主要活动介绍">
				            <Input clearable v-model="baseInfo.zyhdjs" type="textarea" placeholder="主要活动介绍"></Input>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<div class="line"></div>
			<Row type="flex" justify="center">
				<Col>
					<part-title text="位置信息"></part-title>
					<Form :model="addressInfo" label-position="left" :disabled="true" :label-width="120" style="width: 600px">
				        <FormItem label="场所地址">
				        	<Input clearable v-model="addressInfo.csdz" placeholder="场所地址"></Input>
				        </FormItem>
				        <FormItem label="占地面积（㎡）">
				        	<InputNumber :min="0" v-model="addressInfo.zdmj" placeholder="占地面积"></InputNumber>
				        </FormItem>
				        <FormItem label="建筑面积（㎡）">
				        	<InputNumber :min="0" v-model="addressInfo.jzmj" placeholder="建筑面积"></InputNumber>
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
				        <FormItem label="场所范围">
				        	<div @click.stop="openAreaModal">
			        			<Input 
			        				readonly 
			        				v-model="addressInfo.csfw" 
			        				icon="md-pin" 
			        				placeholder="场所范围" />
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
				        <FormItem label="负责人">
				        	<Row type="flex" :gutter="20">
					        	<Col span="8">
				        			<Input clearable v-model="contactInfo.safeName" placeholder="姓名"></Input>
				        		</Col>
				        		<Col span="16">
				        			<Input type="tel" clearable v-model="contactInfo.safePhone" placeholder="电话"></Input>
				        		</Col>
				        	</Row>
				        </FormItem>
				        <FormItem label="经办人">
				        	<Row type="flex" :gutter="20">
					        	<Col span="8">
				        			<Input clearable v-model="contactInfo.managerName" placeholder="姓名"></Input>
				        		</Col>
				        		<Col span="16">
				        			<Input type="tel" clearable v-model="contactInfo.managerPhone" placeholder="电话"></Input>
				        		</Col>
				        		<Col span="24">
				        			<Input type="email" clearable v-model="contactInfo.managerEmail" placeholder="邮箱"></Input>
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
					csmc: '',
					cslx: '',
					zjlb: '',
					fddbr: '',
					tyshxydm: '',
					sqdw: '',
					djbh: '',
					hydm: '',
					quyu: [],
					tysj: '',
					zcrs: 0,
					zyhdjs: '',
				},
				addressInfo: {
					csdz: '',
					zdmj: 0,
					jzmj: 0,
					lngAndLat: '',	
					csfw: ''	
				},
				contactInfo: {
					jbr: '',
					jbrdh: '',
					jbryx: '',
					qyfzr: '',
					qyfzrdh: '',
				},
				mostForm: {
					zdkrnrs: 0,
					hdpc: 0,
					xfzddw: '',
					hzgwdw: '',
					ajjqn: '',
					wbdw: '',
					wbdj: ''
				},
				xfzddwList: [
					{
						value: 0,
						name: '否'
					}, {
						value: 1,
						name: '是'
					}
				],
				jbList: ['国家级', '省级', '市级', '县级'],
				lng: '',
				lat: '',
				cslxList: ['宗教场所', '民间信仰'],
				zjlbList: [ '佛教', '道教', '基督教', '天主教'],
				form: {},
			}
		},
		watch: {

		},
		computed: {
			
		},
		methods: {
			async getBaseInfo() {
				let { status_code, data, message } = await api.getReligionBase();
				if(status_code == 200) {
					this.form = data.data[0];
					let { csmc, cslx, zjlb, fddbr, tyshxydm, sqdw, djbh, hydm, quyu_id, tysj, zcrs, zyhdjs, jd, wd, csdz, zdmj, jzmj, csfw, jbr, jbrdh, jbryx, qyfzr, qyfzrdh, zdkrnrs, hdpc, xfzddw, hzgwdw, ajjqn, wbdw, wbdj } = this.form
					this.baseInfo = { csmc, cslx, zjlb, fddbr, tyshxydm, sqdw, djbh, hydm, zcrs, zyhdjs }
					this.baseInfo.tysj = this.form.tysj ? new Date(this.form.tysj) : '';
					this.addressInfo = { csdz, csfw }
					this.addressInfo.zdmj = zdmj ? Number(zdmj) : 0
					this.addressInfo.jzmj = jzmj ? Number(jzmj) : 0
					this.addressInfo.lngAndLat = this.form.jd && this.form.wd ? `${(this.form.jd - 0).toFixed(2)} ${(this.form.wd - 0).toFixed(2)}` : ''
					this.contactInfo = { jbr, jbrdh, jbryx, qyfzr, qyfzrdh }
					this.mostForm = { zdkrnrs, hdpc, xfzddw, hzgwdw, ajjqn, wbdw, wbdj }
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