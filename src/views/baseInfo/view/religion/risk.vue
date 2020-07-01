<template>
	<div class="page">
		<div>
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
				id: '',
				gkdx_id: this.$storage.get('userInfo').gkdx_id,
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
			async getBaseInfo() {
				let { status_code, data, message } = await api.getReligionBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
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
					// if(this.$route.query.type == 2) {
					// 	this.$router.back()
					// }else {
					// 	this.$router.replace('/baseInfo')
					// }
				}
			},
			openAreaModal() {	
				this.showAreaModel = true;
				this.$nextTick(() => {
					let self = this;
					let lo = new T.Geolocation();
		            lo.getCurrentPosition((e) => {
						this.map = new T.Map('area_box');
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