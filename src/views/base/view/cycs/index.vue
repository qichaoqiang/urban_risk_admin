<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div v-show="step == 1">
			<Row type="flex" justify="center">
				<Col>
					<div class="title">请完善{{step == 1 ? '企业' : '风险'}}信息</div>
					<part-title text="基本信息"></part-title>
					<Form :model="baseInfo" ref="baseInfo" :rules="rules" hide-required-mark label-position="left" :label-width="140" style="width: 600px">
						<FormItem label="商家名称">
				            {{baseInfo.sjmc}}
				        </FormItem>
				        <FormItem label="经营场所类型">
				        	<Row type="flex" :gutter="20">
				        		<Col span="6">
					        		<FormItem prop="jycslx">
							            <Select clearable v-model="baseInfo.jycslx">
							                <Option v-for="item in jycslxList" :key="item" :value="item">{{item}}</Option>
							            </Select>
							        </FormItem>
				        		</Col>
				        		<Col span="18">
									<FormItem prop="jycslx_">
				        				<Input clearable v-show="baseInfo.jycslx == '其他'" v-model="baseInfo.jycslx_" placeholder="请输入经营场所类型"></Input>
				        			</FormItem>
				        		</Col>
				        	</Row>
				        </FormItem>
				        <FormItem label="所属区域" prop="quyu">
				            <Cascader 
				            	clearable 
				            	change-on-select
				            	v-model="baseInfo.quyu" 
				            	:data="areaList" 
				            	:load-data="loadArea" 
				            	placeholder="所属区域"></Cascader>
				        </FormItem>
				        <FormItem label="经营规模" prop="jygm">
				        	<Select clearable v-model="baseInfo.jygm" placeholder="经营规模">
				                <Option v-for="item in jygmList" :key="item" :value="item">{{item}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="商家业态" prop="sjyt">
				        	<Select clearable v-model="baseInfo.sjyt" placeholder="商家业态">
				                <Option v-for="item in sjytList" :key="item" :value="item">{{item}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="食品安全等级" prop="spaqdj">
				        	<Select clearable v-model="baseInfo.spaqdj" placeholder="食品安全等级">
				                <Option v-for="item in spaqdjList" :key="item" :value="item">{{item}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="营业时间" prop="yysj">
				        	<TimePicker type="time" confirm v-model="baseInfo.yysjks" placeholder="开始时间" style="width: 168px"></TimePicker>
				        	<TimePicker type="time" confirm v-model="baseInfo.yysjjz" placeholder="结束时间" style="margin-left: 20px; width: 168px"></TimePicker>
				        </FormItem>
				        <FormItem label="营业状态" prop="yyzt">
				        	<Select clearable v-model="baseInfo.yyzt" placeholder="营业状态">
				                <Option v-for="item in yyztList" :key="item" :value="item">{{item}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="商铺地址" prop="spdz">
				        	<Input clearable v-model="baseInfo.spdz" placeholder="商铺地址"></Input>
				        </FormItem>
				        <FormItem label="经纬度" prop="lngAndLat">
				        	<lng :lngAndLat.sync="baseInfo.lngAndLat" :dz="baseInfo.spdz"></lng>
				        </FormItem>
				        <FormItem label="职工人数" prop="zgrs">
				            <InputNumber :min="0" v-model="baseInfo.zgrs"></InputNumber>
				        </FormItem>
				        <FormItem label="就餐人员" prop="jcrs">
				            <InputNumber :min="0" v-model="baseInfo.jcrs"></InputNumber>
				        </FormItem>
				        <FormItem label="行业门类" prop="hyml">
				        	<Cascader 
				        		clearable 
				        		change-on-select
			        			v-model="baseInfo.hyml" 
			        			:data="industryList" 
			        			:load-data="loadIndustry" 
			        			placeholder="行业门类"></Cascader>
				        </FormItem>
				        <FormItem label="行业代码" prop="hydm">
				            <Input clearable v-model="baseInfo.hydm" placeholder="行业代码"></Input>
				        </FormItem>
				        <FormItem label="经营单位" prop="jydw">
				        	<Input clearable v-model="baseInfo.jydw" placeholder="经营单位"></Input>
				        </FormItem>
				        <FormItem label="注册地址" prop="zcdz">
				        	<Input clearable v-model="baseInfo.zcdz" placeholder="注册地址"></Input>
				        </FormItem>
				        <FormItem label="统一社会信用代码" prop="tyshxydm">
				            <Input clearable v-model="baseInfo.tyshxydm" placeholder="统一社会信用代码"></Input>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<div class="line"></div>
			<Row type="flex" justify="center">
				<Col>
					<part-title text="建筑物信息"></part-title>
					<Form :model="baseInfo" ref="jzInfo" :rules="rules" hide-required-mark label-position="left" :label-width="140" style="width: 600px">
				        <FormItem label="经营场所面积（㎡）" prop="jycsmj">
				        	<InputNumber :min="0" v-model="baseInfo.jycsmj" placeholder="占地面积"></InputNumber>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<div class="line"></div>
			<Row type="flex" justify="center">
				<Col>
					<part-title text="联系人信息"></part-title>
					<Form :model="baseInfo" ref="contactInfo" :rules="rules" hide-required-mark label-position="left" :label-width="140" style="width: 600px">
				        <FormItem label="经办人">
				        	<Row type="flex" :gutter="20">
					        	<Col span="8">
					        		<FormItem prop="jbr">
				        				<Input clearable v-model="baseInfo.jbr" :data="areaList" placeholder="姓名"></Input>
					        		</FormItem>
				        		</Col>
				        		<Col span="16">
				        			<FormItem prop="jbrdh">
				        				<Input clearable v-model="baseInfo.jbrdh" placeholder="电话"></Input>
					        		</FormItem>
				        		</Col>
				        		<Col span="24">
				        			<FormItem prop="jbryx">
				        				<Input clearable v-model="baseInfo.jbryx" placeholder="邮箱"></Input>
					        		</FormItem>
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
		<Modal width="1000" title="企业范围标注" v-model="showAreaModel">
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
	import lng from '../../../baseInfo/components/lng'
	import tablejs from '@/common/js/table'
	import areajs from '@/common/js/area'
	import industryjs from '@/common/js/industry'
	import lngjs from '@/common/js/lng_'
	import datePickerjs from '@/common/js/datePicker'
	import { getDate } from '@/utils/tool'
	export default {
		name: '',
		mixins: [tablejs, areajs, industryjs, lngjs, datePickerjs],
		components: { partTitle, lng },
		data() {
			return {
				id: '',
				gkdx_id: this.$storage.get('userInfo').gkdx_id,
				loading: true,
				step: 1,	
				showAreaModel: false,
				showLngModel: false,
				showWhModel: false,
				showWhRiskModel: false,
				showSbfcgyModel: false,
				showDeviceModel: false,
				showMainRiskModel: false,
				showRimModel: false,
				modeType: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					sjmc: '商家名称',
					tyshxydm: '',
					zcdz: '',
					zgrs: 0,
					jcrs: 0,
					hyml: [],
					hydm: '',
					jygm: '',
					sjyt: '',
					spaqdj: '',
					yysj: [],
					yyzt: '',
					jydw: '',
					jycslx: '',
					jycslx_: '',
					jbr: '',
					jbrdh: '',
					jbryx: '',
					spdz: '',
					lngAndLat: '',
					jycsmj: 0,
					quyu: [],
				},
				jycslxList: ['独栋建筑', '地下商场', '商业综合体内', '沿街底商', '其他'],
				jygmList: ['小餐饮店', '小型', '中型', '大型', '特大型'],
				sjytList: ['社会餐饮（餐馆、快餐店、小吃店、饮品店）', '集体配送', '食堂', '家宴厨房'],
				spaqdjList: ['A', 'B', 'C'],
				yyztList: ['在营', '休业', '改造'],
				zyrllxList: ['管道天然气', '液化石油气', '醇基燃料', '其他'],
				sfzgyyList: [
					{
						value: 0,
						name: '否'
					}, {
						value: 1,
						name: '是'
					}
				],
				area: '',
				lng: '',
				lat: '',
				typeList: [
					{
						value: 1,
						name: 'xxxx'
					}
				],
				statusList: [
					{
						value: '1',
						name: 'xxxx'
					}
				],
				areaList: [],
				form: {}
			}
		},
		watch: {
			'baseInfo.jycslx'(val) {
				console.log(val)
			}
		},
		computed: {
			rules() {
				const validatoryysj = (rule, value, callback) => {
					if (!value[0] || !value[1]) {
						callback(new Error('请选择'));
	                } else {
	                    callback();
	                }
				}
				const validatorLng = (rule, value, callback) => {
					if (!this.baseInfo.lngAndLat) {
	                    callback(new Error('请输入'));
	                } else {
	                    callback();
	                }
				}
				return {
                	quyu: [{ required: true, type: 'array', message: '请选择', trigger: 'change' }],
                	spdz: [{ required: true, message: '请输入', trigger: 'change' }],
                	// lngAndLat: [{ required: true,  validator: validatorLng, trigger: 'change' }],
                	// hyml: [{ required: true, type: 'array', message: '请选择', trigger: 'change' }],
                	// zcdz: [{ required: true, message: '请输入', trigger: 'change' }],
                	// hydm: [{ required: true, message: '请输入', trigger: 'change' }],
                	// jycslx: [{ required: true, message: '请输入', trigger: 'change' }],
                	// jycslx_: [{ required: true, message: '请输入', trigger: 'change' }],
                	// jygm: [{ required: true, message: '请选择', trigger: 'change' }],
                	// sjyt: [{ required: true, message: '请选择', trigger: 'change' }],
                	// spaqdj: [{ required: true, message: '请选择', trigger: 'change' }],
                	// tyshxydm: [{ required: true, message: '请输入', trigger: 'change' }],
                	// yysj: [{ required: true, validator: validatoryysj, message: '请选择', trigger: 'change' }],
                	// yyzt: [{ required: true, message: '请选择', trigger: 'change' }],
                	// zgrs: [{ required: true, type: 'number', message: '请选择', trigger: 'change' }],
                	// jcrs: [{ required: true, type: 'number', message: '请选择', trigger: 'change' }],
                	// jycsmj: [{ required: true, type: 'number', message: '请选择', trigger: 'change' }],
                	// jbr: [{ required: true, message: '请输入', trigger: 'change' }],
                	// jydw: [{ required: true, message: '请输入', trigger: 'change' }],
                	// jbrdh: [{ required: true, message: '请输入', trigger: 'change' }],
                	// jbryx: [{ required: true, message: '请输入', trigger: 'change' }],
                	// qyfzr: [{ required: true, message: '请输入', trigger: 'change' }],
                	// qyfzrdh: [{ required: true, message: '请输入', trigger: 'change' }],
                	// fgaqfzr: [{ required: true, message: '请输入', trigger: 'change' }],
                	// fgaqfzrdh: [{ required: true, message: '请输入', trigger: 'change' }],
				}
			},
		},
		methods: {
			async getBaseInfo() {
				let { status_code, data, message } = await api.getCycsBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					let { sjmc, tyshxydm, zcdz, zgrs, jcrs, hydm, jygm, sjyt, spaqdj, yysjks, yysjjz, yyzt, jydw, jycslx, jbr, jbrdh, jbryx, spdz, lngAndLat, jycsmj, zyrllx } = this.form
					this.baseInfo = { sjmc, tyshxydm, zcdz, hydm, jygm, sjyt, spaqdj, yysjks, yysjjz, yyzt, jydw, jbr, jbrdh, jbryx, spdz, lngAndLat, zyrllx, jycslx, jycslx_: '', yysj: [], zgrs, jcrs, jycsmj, quyu: [], hyml: [] }
					if(jycslx) {
						this.baseInfo.jycslx = this.jycslxList.includes(jycslx) ? jycslx : '其他'
						this.baseInfo.jycslx_ = this.jycslxList.includes(jycslx) ? '' : jycslx
					}else {
						this.baseInfo.jycslx = ''
						this.baseInfo.jycslx_ = ''
					}
					this.baseInfo.zgrs = zgrs ? Number(zgrs) : 0
					this.baseInfo.jcrs = jcrs ? Number(jcrs) : 0
					this.baseInfo.jycsmj = jycsmj ? Number(jycsmj) : 0
					this.baseInfo.lngAndLat = this.form.jd && this.form.wd ? `${this.form.jd} ${this.form.wd}` : ''
					this.getHy();
					this.getQy();
				}
			},
			async nextStep() {
				this.$refs.baseInfo.validate((valid) => {
                    if (valid) {
                        this.$refs.jzInfo.validate((valid) => {
		                    if (valid) {
		                    	this.$refs.contactInfo.validate((valid) => {
				                    if (valid) {
				                        this.submit()
				                    }
				                })
		                    }
		                })
                    }
                })
                this.$refs.jzInfo.validate((valid) => {})
                this.$refs.contactInfo.validate((valid) => {})
			},
			async submit() {
				let params = {
					...this.baseInfo,
					yysjks: this.baseInfo.yysjks,
					yysjjz: this.baseInfo.yysjjz,
					jycslx: this.baseInfo.jycslx != '其他' ? this.baseInfo.jycslx : this.baseInfo.jycslx_,
					hyml: this.baseInfo.hyml[this.baseInfo.hyml.length - 1],
					quyu_id: this.baseInfo.quyu[this.baseInfo.quyu.length - 1],
					jd: this.baseInfo.lngAndLat.split(' ')[0],
					wd: this.baseInfo.lngAndLat.split(' ')[1],
				}	 
				if(this.$route.query.type == 2) {
					params.gkdx_id = this.form.gkdx_id
				}
				delete params.jycslx_
				delete params.quyu
				delete params.lngAndLat
				let { status_code, message } = await api.addCycsBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
					if(this.$route.name == 'base') {
						this.$storage.set('gkdx_id', this.form.gkdx_id)
						this.$router.back()
					}
				}
			},
			saveInfo() {
				this.$Message.success('保存成功')
				if(this.$route.query.type == 2) {
					this.$router.back()
				}else {
					this.$router.replace('/baseInfo')
				}
			},
			openAreaModal() {	
				this.showAreaModel = true;
				this.$nextTick(() => {
					let self = this;
					let lo = new BMap.Geolocation();
		            lo.getCurrentPosition((e) => {
						this.map = new T.Map('area_box');
						let ctrl = new T.Control.MapType(); 
		            	this.map.addControl(ctrl); // 增加地图类型控件
		            	//移除图层
		            	this.map.removeControl(TMAP_NORMAL_MAP);
			            //添加图层
			            this.map.addControl(TMAP_HYBRID_MAP);
		            	let zoomCtrl = new T.Control.Zoom({
		            		position: T_ANCHOR_BOTTOM_RIGHT
		            	})
		            	this.map.addControl(zoomCtrl);
			            if(this.baseInfo.lngAndLat) {
			            	this.map.centerAndZoom(new T.LngLat(this.baseInfo.lngAndLat.split(' ')[0] || e.point.lng, this.baseInfo.lngAndLat.split(' ')[1] || e.point.lat), 17);
			            }else {
			            	this.map.centerAndZoom(new T.LngLat(e.point.lng, e.point.lat), 17);
			            }
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
			            if(this.baseInfo.cdfw) {
			            	let cdfw = JSON.parse(this.baseInfo.cdfw)
			            	let points = cdfw.map(item => {
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
					this.baseInfo.cdfw = JSON.stringify(e.currentLnglats)
				})
			},
			clearArea() {
				this.baseInfo.cdfw = ''
				this.map.clearOverLays()
			},
			cancelArea() {
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.baseInfo.cdfw = this.cdfw || this.form.cdfw || '';
				this.showAreaModel = false
			},
			saveArea() {
				this.cdfw = this.baseInfo.cdfw;
				this.form.cdfw = this.baseInfo.cdfw;
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.showAreaModel = false
			},
			handleChangeWhPage(val) {
				this.whPage.pageIndex = val
				this.getWhsbfcList()
			},
			handleChangeWhPageSize(val) {
				this.whPage.pageSize = val
				this.getWhsbfcList()
			},
			async getWhsbfcList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.whPage.pageSize,
					page: this.whPage.pageIndex,
				}
				let { status_code, data } = await api.getWhsbfcList(params)
				if(status_code == 200) {
					this.whData = data.data
					this.whPage.totalRow = data.total
				}
			},
			openWhModel() {
				this.modeType = 1;
				this.showWhModel = true
			},
			editWhModel(row) {
				this.whForm = {
					hxpm: row.hxpm,
					bm: row.bm,
					cas: row.cas,
					sfzdjg: row.sfzdjg,
					sfbzp: row.sfbzp,
					sfjdhxp: row.sfjdhxp,
					hzwxxdj: row.hzwxxdj,
					hxpzt: row.hxpzt,
					msds: row.msds,
					nzzl: row.nzzl,
					nzzldw: row.nzzldw,
					zdccl: row.zdccl,
					zdccldw: row.zdccldw,
				}
				this.id = row.id
				this.modeType = 2;
				this.showWhModel = true
			},
			whModelChange(status) {
				if(!status) {
					this.whForm = {
						hxpm: '',
						bm: '',
						cas: '',
						sfzdjg: '',
						sfbzp: '',
						sfjdhxp: '',
						hzwxxdj: '',
						hxpzt: '',
						msds: '',
						nzzl: 0,
						nzzldw: '',
						zdccl: 0,
						zdccldw: '',
					}
				}
			},
			async removeWh(row) {
				let { status_code } = await api.deleteWhsbfcInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getWhsbfcList()
			},
			async saveWh() {
				let params = {
					...this.whForm,
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addWhsbfcInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showWhModel = false
					this.getWhsbfcList()
				}
			},
			handleChangeWhRiskPage(val) {
				this.whRiskPage.pageIndex = val
				this.getWhRiskList()
			},
			handleChangeWhRiskPageSize(val) {
				this.whRiskPage.pageSize = val
				this.getWhRiskList()
			},
			async getWhRiskList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.whRiskPage.pageSize,
					page: this.whRiskPage.pageIndex,
				}
				let { status_code, data } = await api.getWhRiskList(params)
				if(status_code == 200) {
					this.whRiskData = data.data
					this.whRiskPage.totalRow = data.total
				}
			},
			openWhRiskModel() {
				this.modeType = 1;
				this.showWhRiskModel = true
			},
			editWhRiskModel(row) {
				this.whRiskForm = {
					zdwxydymc: row.zdwxydymc,
					zdwxydj: row.zdwxydj,
					wxhxp: row.wxhxp,
					tysj: row.tysj ? new Date(row.tysj) : '',
					dqzt: row.dqzt,
				}
				this.id = row.id
				this.modeType = 2;
				this.showWhRiskModel = true
			},
			whRiskModelChange(status) {
				if(!status) {
					this.whRiskForm = {
						zdwxydymc: '',
						zdwxydj: '',
						wxhxp: '',
						tysj: '',
						dqzt: ''
					}
				}
			},
			async removeWhRisk(row) {
				let { status_code } = await api.deleteWhRiskInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getWhRiskList()
			},
			async saveWhRisk() {
				let params = {
					...this.whRiskForm,
					tysj: this.whRiskForm.tysj ? getDate(new Date(this.whRiskForm.tysj).getTime(), 'date') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addWhRiskInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showWhRiskModel = false
					this.getWhRiskList()
				}
			},
			handleChangeSbfcgyPage(val) {
				this.sbfcgyPage.pageIndex = val
				this.getSbfcgyList()
			},
			handleChangeSbfcgyPageSize(val) {
				this.sbfcgyPage.pageSize = val
				this.getSbfcgyList()
			},
			async getSbfcgyList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.sbfcgyPage.pageSize,
					page: this.sbfcgyPage.pageIndex,
				}
				let { status_code, data } = await api.getSbfcgyList(params)
				if(status_code == 200) {
					this.sbfcgyData = data.data
					this.sbfcgyPage.totalRow = data.total
				}
			},
			openSbfcgyModel() {
				this.modeType = 1;
				this.showSbfcgyModel = true
			},
			editSbfcgyModel(row) {
				this.sbfcgyForm = {
					sfgymc: row.sfgymc,
					fcmc: row.fcmc,
					fclx: row.fclx,
					zyrs: row.zyrs,
					ccss: row.ccss,
					dqzt: row.dqzt
				}
				this.id = row.id
				this.modeType = 2;
				this.showSbfcgyModel = true
			},
			sbfcgyModelChange(status) {
				if(!status) {
					this.sbfcgyForm = {
						sfgymc: '',
						fcmc: '',
						fclx: '',
						zyrs: 0,
						ccss: '',
						dqzt: ''
					}
				}
			},
			async removeSbfcgy(row) {
				let { status_code } = await api.deleteSbfcgyInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getSbfcgyList()
			},
			async saveSbfcgy() {
				let params = {
					...this.sbfcgyForm,
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addSbfcgyInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showSbfcgyModel = false
					this.getSbfcgyList()
				}
			},
			handleChangeDevicePage(val) {
				this.devicePage.pageIndex = val
				this.getDeviceList()
			},
			handleChangeDevicePageSize(val) {
				this.devicePage.pageSize = val
				this.getDeviceList()
			},
			async getDeviceList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.devicePage.pageSize,
					page: this.devicePage.pageIndex,
				}
				let { status_code, data } = await api.getDeviceList(params)
				if(status_code == 200) {
					this.deviceData = data.data
					this.devicePage.totalRow = data.total
				}
			},
			openDeviceModel() {
				this.modeType = 1;
				this.showDeviceModel = true
			},
			editDeviceModel(row) {
				this.deviceForm = {
					sfgymc: row.sfgymc,
					fcmc: row.fcmc,
					fclx: row.fclx,
					zyrs: row.zyrs,
					ccss: row.ccss,
					dqzt: row.dqzt
				}
				this.id = row.id
				this.modeType = 2;
				this.showDeviceModel = true
			},
			deviceModelChange(status) {
				if(!status) {
					this.deviceForm = {
						sfgymc: '',
						fcmc: '',
						fclx: '',
						zyrs: 0,
						ccss: '',
						dqzt: ''
					}
				}
			},
			async saveDevice() {
				let params = {
					...this.deviceForm,
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addDeviceInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showDeviceModel = false
					this.getDeviceList()
				}
			},
			async removeDevice(row) {
				let { status_code } = await api.deleteDeviceInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getDeviceList()
			},
			handleChangeMainRiskPage(val) {
				this.mainRiskPage.pageIndex = val
				this.getMainRiskList()
			},
			handleChangeMainRiskPageSize(val) {
				this.mainRiskPage.pageSize = val
				this.getMainRiskList()
			},
			async getMainRiskList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.mainRiskPage.pageSize,
					page: this.mainRiskPage.pageIndex,
				}
				let { status_code, data } = await api.getMainRiskList(params)
				if(status_code == 200) {
					this.mainRiskData = data.data
					this.mainRiskPage.totalRow = data.total
				}
			},
			openMainRiskModel() {
				this.modeType = 1;
				this.showMainRiskModel = true
			},
			editMainRiskModel(row) {
				this.mainRiskForm = {
					zdwxydymc: row.zdwxydymc,
					zdwxydj: row.zdwxydj,
					wxhxp: row.wxhxp,
					tysj: row.tysj ? new Date(row.tysj) : '',
					dqzt: row.dqzt,
				}
				this.id = row.id
				this.modeType = 2;
				this.showMainRiskModel = true
			},
			mainRiskModelChange(status) {
				if(!status) {
					this.mainRiskForm = {
						zdwxydymc: '',
						zdwxydj: '',
						wxhxp: '',
						tysj: '',
						dqzt: ''
					}
				}
			},
			async removeMainRisk(row) {
				let { status_code } = await api.deleteMainRiskInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getMainRiskList()
			},
			async saveMainRisk() {
				let params = {
					...this.mainRiskForm,
					tysj: this.mainRiskForm.tysj ? getDate(new Date(this.mainRiskForm.tysj).getTime(), 'date') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addMainRiskInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showMainRiskModel = false
					this.getMainRiskList()
				}
			},
			handleChangeRimPage(val) {
				this.rimPage.pageIndex = val
				this.getRimList()
			},
			handleChangeRimPageSize(val) {
				this.rimPage.pageSize = val
				this.getRimList()
			},
			async getRimList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.rimPage.pageSize,
					page: this.rimPage.pageIndex,
				}
				let { status_code, data } = await api.getRimList(params)
				if(status_code == 200) {
					this.rimData = data.data
					this.rimPage.totalRow = data.total
				}
			},
			openRimModel() {
				this.modeType = 1;
				this.showRimModel = true
			},
			editRimModel(row) {
				this.rimForm = {
					zdwxydymc: row.zdwxydymc,
					zdwxydj: row.zdwxydj,
					wxhxp: row.wxhxp,
					tysj: row.tysj ? new Date(row.tysj) : '',
					dqzt: row.dqzt,
				}
				this.id = row.id
				this.modeType = 2;
				this.showRimModel = true
			},
			rimModelChange(status) {
				if(!status) {
					this.rimForm = {
						zdwxydymc: '',
						zdwxydj: '',
						wxhxp: '',
						tysj: '',
						dqzt: ''
					}
				}
			},
			async removeRim(row) {
				let { status_code } = await api.deleteRimInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getRimList()
			},
			async saveRim() {
				let params = {
					...this.rimForm,
					tysj: this.rimForm.tysj ? getDate(new Date(this.rimForm.tysj).getTime(), 'date') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addRimInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showRimModel = false
					this.getRimList()
				}
			},
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