<template>
	<div class="page">
		<div v-show="step == 1">
			<Row type="flex" justify="center">
				<Col>
					<div class="title">请完善{{step == 1 ? '场所' : '风险'}}信息</div>
					<part-title text="基本信息"></part-title>
					<Form :model="baseInfo" label-position="left" :label-width="140" style="width: 600px">
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
				        <FormItem label="场所地址">
				        	<Input clearable v-model="addressInfo.csdz" placeholder="场所地址"></Input>
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
					<part-title text="建筑物信息"></part-title>
					<Form :model="addressInfo" label-position="left" :label-width="140" style="width: 600px">
				        <FormItem label="占地面积（㎡）">
				        	<InputNumber :min="0" v-model="addressInfo.zdmj" placeholder="占地面积"></InputNumber>
				        </FormItem>
				        <FormItem label="建筑面积（㎡）">
				        	<InputNumber :min="0" v-model="addressInfo.jzmj" placeholder="建筑面积"></InputNumber>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<div class="line"></div>
			<Row type="flex" justify="center">
				<Col>
					<part-title text="联系人信息"></part-title>
					<Form :model="addressInfo" label-position="left" :label-width="140" style="width: 600px">
						<FormItem label="负责人">
				        	<Row type="flex" :gutter="20">
					        	<Col span="8">
				        			<Input clearable v-model="contactInfo.qyfzr" placeholder="姓名"></Input>
				        		</Col>
				        		<Col span="16">
				        			<Input type="tel" clearable v-model="contactInfo.qyfzrdh" placeholder="电话"></Input>
				        		</Col>
				        	</Row>
				        </FormItem>
				        <FormItem label="经办人">
				        	<Row type="flex" :gutter="20">
					        	<Col span="8">
				        			<Input clearable v-model="contactInfo.jbr" placeholder="姓名"></Input>
				        		</Col>
				        		<Col span="16">
				        			<Input type="tel" clearable v-model="contactInfo.jbrdh" placeholder="电话"></Input>
				        		</Col>
				        		<Col span="24">
				        			<Input type="email" clearable v-model="contactInfo.jbryx" placeholder="邮箱"></Input>
				        		</Col>
				        	</Row>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<Row type="flex" justify="center">
				<Col>
					<Button type="primary" style="margin: 0 auto; width: 200px;" @click="nextStep">完成</Button>
				</Col>
			</Row>
		</div>
		<div v-show="step == 2">
			<Row type="flex" justify="center">
				<Col span="22">
					<div class="title">请完善风险信息</div>
					<part-title text="人员活动"></part-title>
					<Form :model="mostForm" label-position="left" :label-width="140">
				        <FormItem label="最多容纳人数">
				        	<InputNumber :min="0" v-model="mostForm.zdkrnrs"></InputNumber>
				        </FormItem>
				        <FormItem label="活动频次(次/月)">
				        	<InputNumber :min="0" v-model="mostForm.hdpc"></InputNumber>
				        </FormItem>
					</Form>
					<part-title text="消防重点单位"></part-title>
					<Form :model="mostForm" label-position="left" :label-width="140">
				        <FormItem label="消防重点单位">
				            <Select clearable v-model="mostForm.xfzddw" placeholder="请选择">
				                <Option v-for="item in xfzddwList" :key="item.value" :value="item.value">{{item.name}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="火灾高危单位">
				            <Select clearable v-model="mostForm.hzgwdw" placeholder="请选择">
				                <Option v-for="item in xfzddwList" :key="item.value" :value="item.value">{{item.name}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="A级景区内">
				            <Select clearable v-model="mostForm.ajjqn" placeholder="请选择">
				                <Option v-for="item in xfzddwList" :key="item.value" :value="item.value">{{item.name}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="文物单位">
				            <Select clearable v-model="mostForm.wbdw" placeholder="请选择">
				                <Option v-for="item in xfzddwList" :key="item.value" :value="item.value">{{item.name}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="文物等级" v-if="mostForm.wbdw == 1">
				            <Select clearable v-model="mostForm.wbdj" placeholder="请选择">
				                <Option v-for="item in jbList" :key="item" :value="item">{{item}}</Option>
				            </Select>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<Row type="flex" justify="center" style="margin-top: 24px">
				<Col>
					<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo">完成</Button>
				</Col>
			</Row>
		</div>
		<Modal width="1000" title="经纬度标注" v-model="showLngModel">
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
		<Modal width="1000" title="范围标注" v-model="showAreaModel">
			<div id="area_box" class="area_box"></div>
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
	import api from '@/api/api'
	import partTitle from '@/components/title'
	import areajs from '@/common/js/area'
	import lngjs from '@/common/js/lng'
	import datePickerjs from '@/common/js/datePicker'
	import { getDate } from '@/utils/tool'
	export default {
		name: '',
		mixins: [areajs, lngjs, datePickerjs],
		components: { partTitle },
		data() {
			return {
				step: 1,	
				showAreaModel: false,
				showLngModel: false,
				modeType: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					csmc: '宗教',
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
				areaList: [],
				form: {}
			}
		},
		watch: {

		},
		computed: {

		},
		methods: {
			getBaseInfo() {
				if(this.$route.query.type == '2') {
					let baseInfo = this.$storage.get('baseInfo')
					// baseInfo.hyml = []
					// baseInfo.quyu = []
					this.baseInfo = baseInfo
					this.addressInfo = this.$storage.get('addressInfo')
					this.contactInfo = this.$storage.get('contactInfo')
					this.mostForm = this.$storage.get('mostForm')
					this.form = this.$storage.get('form')
					this.getQy()
					// this.getHy()
				}else {
					this.loading = false
				}
			},
			async nextStep() {
				let params = {
					quyu_id: this.baseInfo.quyu[this.baseInfo.quyu.length - 1],
					...this.baseInfo,
					...this.addressInfo,
					...this.contactInfo,
					tysj: this.baseInfo.tysj ? getDate(new Date(this.baseInfo.tysj).getTime(), 'date') : '',
					quyu_id: this.baseInfo.quyu[this.baseInfo.quyu.length - 1],
					jd: this.addressInfo.lngAndLat.split(' ')[0],
					wd: this.addressInfo.lngAndLat.split(' ')[1],
				}	 
				if(this.$route.query.type == 2) {
					params.gkdx_id = this.form.gkdx_id
				}
				delete params.quyu
				delete params.lngAndLat
				let { status_code, message } = await api.addReligionBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
					if(this.$route.query.type == 2) {
						this.$storage.set('gkdx_id', this.form.gkdx_id)
						this.$router.back()
					}else {
						let { status_code, data } = await api.getReligionBase()
						if(status_code == 200) {
							this.$storage.set('gkdx_id', data.data[0].gkdx_id)
						}
						this.$router.replace('/baseInfo')
					}
				}
			},
			async saveInfo() {
				let params = {
					...this.mostForm,
					gkdx_id: this.gkdx_id
				}
				let { status_code, message } = await api.addReligionBase(params);
				if(status_code == 200) {
					this.$Message.success(message)
					if(this.$route.query.type == 2) {
						this.$router.back()
					}else {
						this.$router.replace('/baseInfo')
					}
				}
			},
			openAreaModal() {	
				this.showAreaModel = true;
				this.$nextTick(() => {
					let self = this;
					let lo = new BMap.Geolocation();
		            lo.getCurrentPosition((e) => {
						this.map = new T.Map('area_box');
						this.map.centerAndZoom(new T.LngLat(e.point.lng, e.point.lat), 10);
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
			            if(this.addressInfo.csfw) {
			            	let csfw = JSON.parse(this.addressInfo.csfw)
			            	let points = csfw.map(item => {
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
					this.addressInfo.csfw = JSON.stringify(e.currentLnglats)
				})
			},
			clearArea() {
				this.addressInfo.csfw = ''
				this.map.clearOverLays()
			},
			cancelArea() {
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.addressInfo.csfw = this.csfw || this.form.csfw || '';
				this.showAreaModel = false
			},
			saveArea() {
				this.csfw = this.addressInfo.csfw;
				this.form.csfw = this.addressInfo.csfw;
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.showAreaModel = false
			},
		},
		created() {
			this.getArea('', list => {
				this.areaList = list
				this.getBaseInfo()
			})
		},
		mounted() {

		}
	}
</script>

<style lang="less" scoped>
	.page {
		margin-bottom: 24px;
		.line {
			width: 100%;
			height: 10px;
			background: #f5f5f5;
		}
	}
	.tip {
		margin-bottom: 8px;
		color: #f92828;
	}
	.num_box {
		margin-bottom: 8px;
	}
</style>