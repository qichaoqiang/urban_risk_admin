<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div v-show="step == 1">
			<Row type="flex" justify="center">
				<Col>
					<!-- <div class="title">请完善{{step == 1 ? '企业' : '风险'}}信息</div> -->
					<part-title text="基本信息"></part-title>
					<Form disabled :model="baseInfo" ref="baseInfo" :rules="rules" hide-required-mark label-position="left" :label-width="140" style="width: 600px">
						<FormItem label="地铁线路名称">
				            {{baseInfo.dtxlmc}}
				        </FormItem>
				        <FormItem label="所属区域" prop="quyu">
				            <Cascader 
				            	readonly 
				            	clearable
				            	change-on-select
				            	v-model="baseInfo.quyu" 
				            	:data="areaList" 
				            	:load-data="loadArea" 
				            	placeholder="所属区域"></Cascader>
				        </FormItem>
				        <FormItem label="运营单位" prop="yydw">
				            <Input clearable v-model="baseInfo.yydw" placeholder="运营单位"></Input>
				        </FormItem>
				        <FormItem label="线路起点站" prop="xlqdz">
				        	<Input clearable v-model="baseInfo.xlqdz" placeholder="线路起点站"></Input>
				        </FormItem>
				        <FormItem label="终点站" prop="zdz">
				        	<Input clearable v-model="baseInfo.zdz" placeholder="终点站"></Input>
				        </FormItem>
				        <FormItem label="线路长（km）" prop="xlc">
				            <InputNumber :min="0" v-model="baseInfo.xlc"></InputNumber>
				        </FormItem>
				        <FormItem label="线路运能" prop="xlyn">
				            <InputNumber :min="0" v-model="baseInfo.xlyn"></InputNumber>
				        </FormItem>
				        <FormItem label="车站数量" prop="czsl">
				            <InputNumber :min="0" v-model="baseInfo.czsl"></InputNumber>
				        </FormItem>
				        <FormItem label="供电系统故障率（%）">
				            <InputNumber :min="0" v-model="baseInfo.gdxtgzl"></InputNumber>
				        </FormItem>
				        <FormItem label="是否设置屏蔽门" prop="sfszpbm">
				            <Select clearable v-model="baseInfo.sfszpbm" placeholder="请选择">
				                <Option v-for="item in sfzgyyqList" :key="item.value" :value="item.value">{{item.name}}</Option>
				            </Select>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<div class="line"></div>
			<Row type="flex" justify="center">
				<Col>
					<part-title text="联系人信息"></part-title>
					<Form disabled :model="baseInfo" ref="contactInfo" :rules="rules" hide-required-mark label-position="left" :label-width="140" style="width: 600px">
				        <FormItem label="联系人">
				        	<Row type="flex" :gutter="20">
					        	<Col span="8">
						        	<FormItem prop="lxr">
					        			<Input clearable v-model="baseInfo.lxr" :data="areaList" placeholder="姓名"></Input>
					        		</FormItem>
				        		</Col>
				        		<Col span="16">
					        		<FormItem prop="lxrdh">
					        			<Input clearable v-model="baseInfo.lxrdh" placeholder="电话"></Input>
					        		</FormItem>
				        		</Col>
				        	</Row>
				        </FormItem>
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
		<div v-show="step == 2">
			<Row type="flex" justify="center">
				<Col span="22">
					<div class="title">请完善风险信息</div>
					<part-title text="车辆信息" :btns="['add']" @add="openClModel"></part-title>
					<Table :columns="clColumns" :data="clData">
						<template slot-scope="{ row }" slot="action">
				            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editClModel(row)">编辑</Button>
				            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeCl(row)">
						        <Button type="error" size="small" ghost>删除</Button>
						    </Poptip>
				        </template>
					</Table>
					<Row type="flex" justify="end">
						<Page
		                    size="small"
		                    style="margin-top: 10px"
		                    :page-size="clPage.pageSize"
		                    :total="clPage.totalRow"
		                    show-elevator
		                    show-total
		                    show-sizer
		                    @on-change="handleChangeClPage"
		                    @on-page-size-change="handleChangeClPageSize"
		                />
					</Row>
					<part-title text="线路信息" :btns="['add']" @add="openModel"></part-title>
					<Table :columns="xlColumns" :data="xlData">
						<template slot-scope="{ row }" slot="action">
				            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editModel(row)">编辑</Button>
				            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="remove(row)">
						        <Button type="error" size="small" ghost>删除</Button>
						    </Poptip>
				        </template>
					</Table>
					<Row type="flex" justify="end">
						<Page
		                    size="small"
		                    style="margin-top: 10px"
		                    :page-size="xlPage.pageSize"
		                    :total="xlPage.totalRow"
		                    show-elevator
		                    show-total
		                    show-sizer
		                    @on-change="handleChangeXlPage"
		                    @on-page-size-change="handleChangeXlPageSize"
		                />
					</Row>
					<part-title text="运营状况" :btns="['add']" @add="openYyModel"></part-title>
					<Table :columns="yyColumns" :data="yyData">
						<template slot-scope="{ row }" slot="name">
				            <span class="link">{{row.name}}</span>
				        </template>
						<template slot-scope="{ row }" slot="action">
				            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editYyModel(row)">编辑</Button>
				            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeYy(row)">
						        <Button type="error" size="small" ghost>删除</Button>
						    </Poptip>
				        </template>
					</Table>
					<Row type="flex" justify="end">
						<Page
		                    size="small"
		                    style="margin-top: 10px"
		                    :page-size="yyPage.pageSize"
		                    :total="yyPage.totalRow"
		                    show-elevator
		                    show-total
		                    show-sizer
		                    @on-change="handleChangeYyPage"
		                    @on-page-size-change="handleChangeYyPageSize"
		                />
					</Row>
				</Col>	
			</Row>	
			<Row type="flex" justify="center" style="margin-top: 24px" :gutter="20">
				<Col>
					<Button type="primary" style="width: 100px;" @click="step--">上一步</Button>
				</Col>
				<Col>
					<Button type="primary" style="width: 100px;" @click="saveInfo">完成</Button>
				</Col>
			</Row>
		</div>
		<Modal title="企业经纬度标注" v-model="showLngModel">
			<div id="lng_box" class="area_box"></div>
			<div slot="footer">
	            <Row type="flex" align="middle" justify="space-between">
	            	<Col style="text-align: left">
	            		<span style="font-size: 14px; color: rgba(0,0,0,0.87);">{{lng}} {{lat}}</span>
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
		<Modal title="企业范围标注" v-model="showAreaModel">
			<div id="area_box" class="area_box"></div>
			<div slot="footer">
	            <Row type="flex" align="middle" justify="space-between">
	            	<Col style="text-align: left">
	            		<Button type="info" size="small" ghost @click="openArea">开启标注</Button>
	            		<!-- <Button type="warning" size="small" ghost @click="polygonTool.close()">关闭标注</Button> -->
	            		<Button type="warning" size="small" ghost @click="map.clearOverLays()">清除标注</Button>
	            	</Col>
	            	<Col>
	            		<Button type="text" size="large" @click="cancelArea">取消</Button>
		                <Button type="primary" size="large" @click="saveArea">保存</Button>
	            	</Col>
	            </Row>
	        </div>
		</Modal>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}车辆信息`" v-model="showClModel" @on-visible-change="clModelChange">
			<div>
				<Form :model="clForm" label-position="left" :label-width="120">
					<FormItem label="车辆类型">
						<Select clearable v-model="clForm.cllx" placeholder="请选择">
			                <Option v-for="item in cllxList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="载客人数">
			            <InputNumber :min="0" v-model="clForm.zkrs"></InputNumber>
			        </FormItem>
			        <FormItem label="车辆技术等级">
			            <Select clearable v-model="clForm.cljsdj" placeholder="请选择">
			                <Option v-for="item in cljsdjList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="车辆投用时间">
			        	<DatePicker type="date" v-model="clForm.cltysj" :options="datePickerOptions" placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="填报时间">
			        	<DatePicker type="date" v-model="clForm.tbsj" :options="datePickerOptions" placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showClModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveCl">保存</Button>
	        </div>
		</Modal>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}线路信息`" v-model="showModel" @on-visible-change="modelChange">
			<div>
				<Form :model="xlForm" label-position="left" :label-width="120">
					<FormItem label="线路名称">
			        	<Input clearable v-model="xlForm.xlmc"></Input>
			        </FormItem>
			        <FormItem label="线路类型">
			        	<Select clearable v-model="xlForm.xllx" placeholder="请选择">
			                <Option v-for="item in xllxList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="运行时长（小时）">
			            <InputNumber :min="0" v-model="xlForm.yxszxs"></InputNumber>
			        </FormItem>
			        <FormItem label="线路地质灾害情况">
			            <Input clearable v-model="xlForm.xldzzhqk"></Input>
			        </FormItem>
			        <FormItem label="线路交通组成">
			        	<Select clearable multiple v-model="xlForm.xljtzc" placeholder="请选择">
			                <Option v-for="item in xljtzcList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="填报时间">
			        	<DatePicker type="date" v-model="xlForm.tbsj" :options="datePickerOptions" placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showClModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="save">保存</Button>
	        </div>
		</Modal>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}运营状况`" v-model="showYyModel" @on-visible-change="yyModelChange">
			<div>
				<Form :model="yyForm" label-position="left" :label-width="140">
					<FormItem label="近5日日平均发客量">
			        	<InputNumber :min="0" v-model="yyForm.jwrpjfkl"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间">
			        	<DatePicker type="date" v-model="yyForm.tbsj" :options="datePickerOptions"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showClModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveYy">保存</Button>
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
				showClModel: false,
				showModel: false,
				showSbfcgyModel: false,
				showZaqModel: false,
				showMainRiskModel: false,
				showYyModel: false,
				modeType: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					dtxlmc: '地铁线路名称',
					tyshxydm: '',
					clsj: '',
					zgrs: 0,
					glrysl: 0,
					hyml: [],
					hydm: '',
					yxzt: '',
					tyshxydm: '',
					jyfw: '',
					zcdz: '',
					quyu: [],
					jbr: '',
					jbrdh: '',
					jbryx: '',
					lxr: '',
					lxrdh: '',
					fgaqfzr: '',
					fgaqfzrdh: '',
					lngAndLat: '',
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
				statusList: [
					{
						value: 1,
						name: 'xxxx'
					}
				],
				sfzgyyqList: [
					{
						value: 0,
						name: '否'
					}, {
						value: 1,
						name: '是'
					}
				],
				yxztList: ['运行', '停运'],
				clColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.quyuPage.pageIndex- 1) * this.quyuPage.pageSize + 1);
				        }
                    }, {
                        title: '车辆类型',
                        key: 'cllx',
                    }, {
                        title: '载客人数',
                        key: 'zkrs',
                    }, {
                        title: '车辆技术等级',
                        key: 'cljsdj',
                    }, {
                        title: '车辆投用时间',
                        key: 'cltysj',
                    }, {
                        title: '填报时间',
                        key: 'tbsj',
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				clData: [],
				clForm: {
					cllx: '',
					zkrs: 0,
					cljsdj: '',
					cltysj: '',
					tbsj: '',
				},
				cllxList: ['大型', '中型', '小型'],
				cljsdjList: ['一级', '二级', '三级'],
				clPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				xlColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.quyuPage.pageIndex- 1) * this.quyuPage.pageSize + 1);
				        }
                    }, {
                        title: '线路名称',
                        key: 'xlmc',
                    }, {
                        title: '线路类型',
                        key: 'xllx',
                    }, {
                        title: '运行时长（小时）',
                        key: 'yxszxs',
                    }, {
                        title: '线路地质灾害情况',
                        key: 'xldzzhqk',
                    }, {
                        title: '线路交通组成',
                        key: 'xljtzc',
                    }, {
                        title: '填报时间',
                        key: 'tbsj',
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				xlData: [],
				xlForm: {
					xlmc: '',
					xllx: '',
					yxszxs: 0,
					xldzzhqk: '',
					xljtzc: [],
					tbsj: ''
				},
				xllxList: ['一类客运班线', '二类客运班线', '三类客运班线', '四类客运班线', '旅游客车'],
				xljtzcList: ['高速公路', '国省道路', '普通公路'],
				xlPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				yyColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.quyuPage.pageIndex- 1) * this.quyuPage.pageSize + 1);
				        }
                    }, {
                        title: '近5日日平均发客量',
                        key: 'jwrpjfkl',
                    }, {
                        title: '填报时间',
                        key: 'tbsj',
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				yyData: [],
				yyForm: {
					jwrpjfkl: 0,
					tbsj: '',
				},
				yyPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
			}
		},
		computed: {
			rules() {
				const validatorCjsj = (rule, value, callback) => {
					if (!this.baseInfo.clsj) {
						callback(new Error('请选择'));
	                } else {
	                    callback();
	                }
				}
				const validatorZgrs = (rule, value, callback) => {
					if (!this.baseInfo.zgrs && this.baseInfo.zgrs !== 0) {
						callback(new Error('请输入'));
	                } else {
	                    callback();
	                }
				}
				const validatorGlrysl = (rule, value, callback) => {
					if (!this.baseInfo.glrysl && this.baseInfo.glrysl !== 0) {
						callback(new Error('请输入'));
	                } else {
	                    callback();
	                }
				}
				return {
                	quyu: [{ required: true, type: 'array', message: '请选择', trigger: 'change' }],
                	jydz: [{ required: true, message: '请输入', trigger: 'change' }],
                	lngAndLat: [{ required: true, message: '请选择', trigger: 'change' }],
                	// hyml: [{ required: true, type: 'array', message: '请选择', trigger: 'change' }],
                	// zcdz: [{ required: true, message: '请输入', trigger: 'change' }],
                	// hydm: [{ required: true, message: '请输入', trigger: 'change' }],
                	// jyfw: [{ required: true, message: '请输入', trigger: 'change' }],
                	// tyshxydm: [{ required: true, message: '请输入', trigger: 'change' }],
                	// yxzt: [{ required: true, message: '请选择', trigger: 'change' }],
                	// clsj: [{ required: true, validator: validatorCjsj, trigger: 'change' }],
                	// zgrs: [{ required: true,  validator: validatorZgrs, trigger: 'change' }],
                	// glrysl: [{ required: true,  validator: validatorGlrysl, trigger: 'change' }],
                	// jbr: [{ required: true, message: '请输入', trigger: 'change' }],
                	// jbrdh: [{ required: true, message: '请输入', trigger: 'change' }],
                	// jbryx: [{ required: true, message: '请输入', trigger: 'change' }],
                	// lxr: [{ required: true, message: '请输入', trigger: 'change' }],
                	// lxrdh: [{ required: true, message: '请输入', trigger: 'change' }],
                	// fgaqfzr: [{ required: true, message: '请输入', trigger: 'change' }],
                	// fgaqfzrdh: [{ required: true, message: '请输入', trigger: 'change' }],
				}
			},
		},
		methods: {
			async getBaseInfo() {
				let { status_code, data, message } = await api.getDtyxBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					let { dtxlmc, yydw, xlqdz, zdz, quyu_id, lxr, lxrdh, xlc, xlyn, czsl, lxsd, gdxtgzl, sfszpbm, jbr, jbrdh, jbryx } = this.form
					this.baseInfo = { dtxlmc, yydw, xlqdz, zdz, lxr, lxrdh, jbr, jbrdh, jbryx }
					this.baseInfo.xlc = xlc ? Number(xlc) : 0
					this.baseInfo.xlyn = xlyn ? Number(xlyn) : 0
					this.baseInfo.czsl = czsl ? Number(czsl) : 0
					this.baseInfo.lxsd = lxsd ? Number(lxsd) : 0
					this.baseInfo.gdxtgzl = gdxtgzl ? Number(gdxtgzl) : 0
					this.baseInfo.sfszpbm = sfszpbm ? Number(sfszpbm) : 0
					this.getQy()
					this.getHy()
				}
			},
			async nextStep() {
				this.$refs.baseInfo.validate((valid) => {
                    if (valid) {
                        this.$refs.contactInfo.validate((valid) => {
		                    if (valid) {
		                        this.submit()
		                    }
		                })
                    }
                })
                this.$refs.contactInfo.validate((valid) => {})
			},
			async submit() {
				let params = {
					...this.baseInfo,
					quyu_id: this.baseInfo.quyu[0] ? this.baseInfo.quyu[this.baseInfo.quyu.length - 1] : '',
				}	 
				if(this.$route.query.type == 2) {
					params.gkdx_id = this.form.gkdx_id
				}
				delete params.quyu
				delete params.lngAndLat
				let { status_code, message } = await api.addDtyxBase(params);
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
			                color: "blue", weight: 3, opacity: 0.5, fillColor: "#FFFFFF", fillOpacity: 0.5
			            };
			            //创建标注工具对象
			            this.polygonTool = new T.PolygonTool(this.map, config);
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
			handleChangeClPage(val) {
				this.clPage.pageIndex = val
				this.getClList()
			},
			handleChangeClPageSize(val) {
				this.clPage.pageSize = val
				this.getClList()
			},
			async getClList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.clPage.pageSize,
					page: this.clPage.pageIndex,
				}
				let { status_code, data } = await api.getClList(params)
				if(status_code == 200) {
					this.clData = data.data
					this.clPage.totalRow = data.total
				}
			},
			openClModel() {
				this.modeType = 1;
				this.showClModel = true
			},
			editClModel(row) {
				this.clForm = {
					cllx: row.cllx,
					zkrs: row.zkrs,
					cljsdj: row.cljsdj,
					cltysj: new Date(row.cltysj),
					tbsj: new Date(row.tbsj),
				}
				this.id = row.id
				this.modeType = 2;
				this.showClModel = true
			},
			clModelChange(status) {
				console.log(status)
				if(!status) {
					this.clForm = {
						cllx: '',
						zkrs: 0,
						cljsdj: '',
						cltysj: '',
						tbsj: '',
					}
				}
			},
			async removeCl(row) {
				let { status_code } = await api.deleteClInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getClList()
			},
			async saveCl() {
				let params = {
					...this.clForm,
					cltysj: this.clForm.cltysj ? getDate(new Date(this.clForm.cltysj).getTime(), 'date') : '',
					tbsj: this.clForm.tbsj ? getDate(new Date(this.clForm.tbsj).getTime(), 'date') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addClInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showClModel = false
					this.getClList()
				}
			},
			handleChangeXlPage(val) {
				this.xlPage.pageIndex = val
				this.getXlList()
			},
			handleChangeXlPageSize(val) {
				this.xlPage.pageSize = val
				this.getXlList()
			},
			async getXlList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.xlPage.pageSize,
					page: this.xlPage.pageIndex,
				}
				let { status_code, data } = await api.getXlList(params)
				if(status_code == 200) {
					this.xlData = data.data
					this.xlPage.totalRow = data.total
				}
			},
			openModel() {
				this.modeType = 1;
				this.showModel = true;
			},
			editModel(row) {
				this.xlForm = {
					xlmc: row.xlmc,
					xllx: row.xllx,
					yxszxs: row.yxszxs ? Number(row.yxszxs) : 0,
					xldzzhqk: row.xldzzhqk,
					xljtzc: row.xljtzc.split(','),
					tbsj: new Date(row.tbsj),
				}
				this.id = row.id
				this.modeType = 2;
				this.showModel = true
			},
			modelChange(status) {
				if(!status) {
					this.clForm = {
						xlmc: '',
						xllx: '',
						yxszxs: 0,
						xldzzhqk: '',
						xljtzc: [],
						tbsj: '',
					}
				}
			},
			async remove(row) {
				let { status_code } = await api.deleteXlInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getXlList()
			},
			async save() {
				let params = {
					...this.xlForm,
					xljtzc: this.xlForm.xljtzc.join(','),
					tbsj: this.xlForm.tbsj ? getDate(new Date(this.xlForm.tbsj).getTime(), 'date') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addXlInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showModel = false
					this.getXlList()
				}
			},
			handleChangeYyPage(val) {
				this.yyPage.pageIndex = val
				this.getYyList()
			},
			handleChangeYyPageSize(val) {
				this.yyPage.pageSize = val
				this.getYyList()
			},
			async getYyList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.yyPage.pageSize,
					page: this.yyPage.pageIndex,
				}
				let { status_code, data } = await api.getYyList(params)
				if(status_code == 200) {
					this.yyData = data.data
					this.yyPage.totalRow = data.total
				}
			},
			openYyModel() {
				this.modeType = 1;
				this.showYyModel = true;
			},
			editYyModel(row) {
				this.yyForm = {
					jwrpjfkl: row.jwrpjfkl,
					tbsj: new Date(row.tbsj),
				}
				this.id = row.id
				this.modeType = 2;
				this.showYyModel = true
			},
			yyModelChange(status) {
				console.log(status)
				if(!status) {
					this.yyForm = {
						jwrpjfkl: 0,
						tbsj: '',
					}
				}
			},
			async removeYy(row) {
				let { status_code } = await api.deleteYyInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getYyList()
			},
			async saveYy() {
				let params = {
					...this.yyForm,
					tbsj: this.yyForm.tbsj ? getDate(new Date(this.yyForm.tbsj).getTime(), 'date') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addYyInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showYyModel = false
					this.getYyList()
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