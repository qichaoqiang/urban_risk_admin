<template>
	<div class="page">
		<div v-show="step == 1">
			<Row type="flex" justify="center">
				<Col>
					<div class="title">请完善{{step == 1 ? '场所' : '风险'}}信息</div>
					<part-title text="基本信息"></part-title>
					<Form :model="baseInfo" ref="baseInfo" :rules="rules" hide-required-mark label-position="left" :label-width="140" style="width: 600px">
						<FormItem label="医院名称">
				            {{baseInfo.yymc}}
				        </FormItem>
				        <FormItem label="医院类型" prop="yylx">
				            <Select clearable v-model="baseInfo.yylx" placeholder="医院类型">
				                <Option v-for="item in yylxList" :key="item" :value="item">{{item}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="医院等级" prop="yydj">
				        	<Cascader clearable :data="levelList" v-model="baseInfo.yydj" placeholder="医院等级"></Cascader>
				        </FormItem>
				        <FormItem label="举办单位" prop="jbdw">
				            <Input clearable v-model="baseInfo.jbdw" placeholder="举办单位"></Input>
				        </FormItem>
				        <FormItem label="建成投用时间" prop="jctysj">
				            <DatePicker type="date" v-model="baseInfo.jctysj"  placeholder="建成投用时间"></DatePicker>
				        </FormItem>
				        <FormItem label="医院地址" prop="yydz">
				        	<Input clearable v-model="baseInfo.yydz" placeholder="医院地址"></Input>
				        </FormItem>
				        <FormItem label="经纬度" prop="lngAndLat">
				        	<lng :lngAndLat.sync="baseInfo.lngAndLat" :dz="baseInfo.yydz"></lng>
				        </FormItem>
				        <FormItem label="医院范围" prop="yyfw">
				        	<div @click.stop="openAreaModal">
			        			<Input 
			        				readonly 
			        				v-model="baseInfo.yyfw" 
			        				icon="md-pin" 
			        				placeholder="医院范围" />
			        		</div>
				        </FormItem>
				        <FormItem label="行业代码" prop="hydm">
				            <Input clearable v-model="baseInfo.hydm" placeholder="行业代码"></Input>
				        </FormItem>
				        <FormItem label="所辖管区" prop="quyu">
				            <Cascader 
				            	clearable 
				            	change-on-select
				            	v-model="baseInfo.quyu" 
				            	:data="areaList" 
				            	:load-data="loadArea" 
				            	placeholder="所属辖区"></Cascader>
				        </FormItem>
				        <FormItem label="社会统一信用代码" prop="tyshxydm">
				            <Input clearable v-model="baseInfo.tyshxydm" placeholder="社会统一信用代码"></Input>
				        </FormItem>
				        <FormItem label="注册登记地址" prop="zcdjdz">
				            <Input clearable v-model="baseInfo.zcdjdz" placeholder="注册登记地址"></Input>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<div class="line"></div>
			<Row type="flex" justify="center">
				<Col>
					<part-title text="建筑物信息"></part-title>
					<Form :model="baseInfo" ref="jzInfo" :rules="rules" hide-required-mark label-position="left" :label-width="140" style="width: 600px">
				        <FormItem label="占地面积（㎡）" prop="zdmj">
				        	<InputNumber :min="0" v-model="baseInfo.zdmj" placeholder="占地面积"></InputNumber>
				        </FormItem>
				        <FormItem label="建筑面积（㎡）" prop="jzmj">
				        	<InputNumber :min="0" v-model="baseInfo.jzmj" placeholder="建筑面积"></InputNumber>
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
				        		<Col span="24" style="margin-top: 16px">
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
					<part-title text="医院规模"></part-title>
					<Form :model="mostForm" label-position="left" inline :label-width="140">
				        <FormItem label="从业人员" style="margin-right: 100px">
				        	<InputNumber :min="0" v-model="mostForm.cyrs"></InputNumber>
				        </FormItem>
				        <FormItem label="日均门诊人数" style="margin-right: 100px">
				        	<InputNumber :min="0" v-model="mostForm.rjmzrs"></InputNumber>
				        </FormItem>
				        <FormItem label="床位数" style="margin-right: 100px">
				        	<InputNumber :min="0" v-model="mostForm.cws"></InputNumber>
				        </FormItem>
				        <FormItem label="日均床位使用量" style="margin-right: 100px">
				        	<InputNumber :min="0" v-model="mostForm.rjcwsyl"></InputNumber>
				        </FormItem>
					</Form>
					<part-title text="危险化学品"></part-title>
					<Row type="flex" justify="end">
						<Col span="23">
			                <part-title text="化学品" :btns="['add']" @add="openWhModel"></part-title>
							<Table :columns="whColumns" :data="whData">
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editWhModel(row)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeWh(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="whPage.pageSize"
				                    :total="whPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeWhPage"
				                    @on-page-size-change="handleChangeWhPageSize"
				                />
							</Row>
							<part-title text="液氮" :btns="['add']" @add="openYdModel"></part-title>
							<Table :columns="ydColumns" :data="ydData">
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editYdModel(row)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeYd(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="ydPage.pageSize"
				                    :total="ydPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeYdPage"
				                    @on-page-size-change="handleChangeYdPageSize"
				                />
							</Row>
							<part-title text="危险废液" :btns="['add']" @add="openRiskLiauidModel"></part-title>
							<Table :columns="riskLiauidColumns" :data="riskLiauidData">
								<template slot-scope="{ row }" slot="name">
						            <span class="link">{{row.name}}</span>
						        </template>
						        <template slot-scope="{ row }" slot="level">
						            <div :style="{ margin: '0 auto', width: '40px', height: '20px', background: row.color}"></div>
						        </template>
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editRiskLiauidModel(row)">编辑</Button>
						            
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeRiskLiauid(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="riskLiauidPage.pageSize"
				                    :total="riskLiauidPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeRiskLiauidPage"
				                    @on-page-size-change="handleChangeRiskLiauidPageSize"
				                />
							</Row>
						</Col>
					</Row>
					<part-title text="火灾危险"></part-title>
					<Form :model="mostForm" label-position="left" inline :label-width="100">
				        <FormItem label="消防重点单位" style="margin-right: 140px">
				            <Select clearable v-model="mostForm.xfzddw" placeholder="请选择">
				                <Option v-for="item in xfzddwList" :key="item.value" :value="item.value">{{item.name}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="火灾高危单位" style="margin-right: 140px">
				            <Select clearable v-model="mostForm.hzgwdw" placeholder="请选择">
				                <Option v-for="item in xfzddwList" :key="item.value" :value="item.value">{{item.name}}</Option>
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
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}化学品`" v-model="showWhModel" @on-visible-change="whModelChange">
			<div>
				<Form :model="whForm" label-position="left" :label-width="140">
					<FormItem label="化学品名称">
			        	<Input clearable v-model="whForm.hxpmc"></Input>
			        </FormItem>
			        <FormItem label="CAS">
			        	<Input clearable v-model="whForm.Ch"></Input>
			        </FormItem>
			        <FormItem label="数量">
			            <InputNumber :min="0" v-model="whForm.sl"></InputNumber>
			        </FormItem>
			        <FormItem label="储存位置">
			        	<Input clearable v-model="whForm.ccwz"></Input>
			        </FormItem>
			        <FormItem label="年使用量(kg)">
			        	<Input clearable v-model="whForm.nsyl"></Input>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveWh">保存</Button>
	        </div>
		</Modal>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}液氮`" v-model="showYdModel" @on-visible-change="ydModelChange">
			<div>
				<Form :model="ydForm" label-position="left" :label-width="140">
					<FormItem label="名称">
			        	<Input clearable v-model="ydForm.mc"></Input>
			        </FormItem>
			        <FormItem label="位置">
			        	<Input clearable v-model="ydForm.wz"></Input>
			        </FormItem>
			        <FormItem label="容量">
			            <InputNumber :min="0" v-model="ydForm.rl"></InputNumber>
			        </FormItem>
			        <FormItem label="数量">
			            <InputNumber :min="0" v-model="ydForm.sl"></InputNumber>
			        </FormItem>
			        <FormItem label="压力">
			            <InputNumber :min="0" v-model="ydForm.yl"></InputNumber>
			        </FormItem>
			        <FormItem label="年使用量(kg)">
			        	<InputNumber :min="0" v-model="ydForm.nsyl"></InputNumber>
			        </FormItem>
			        <FormItem label="储罐/钢瓶检验有效期">
			        	<DatePicker type="date" v-model="ydForm.jyyxq"></DatePicker>
			        </FormItem>
			        <FormItem label="检验单位">
			        	<Input clearable v-model="ydForm.jydw"></Input>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showYdModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveYd">保存</Button>
	        </div>
		</Modal>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}危险废液`" v-model="showRiskLiauidModel" @on-visible-change="riskLiauidModelChange">
			<div>
				<Form :model="riskLiauidForm" label-position="left" :label-width="140">
					<FormItem label="名称">
			        	<Input clearable v-model="riskLiauidForm.mc"></Input>
			        </FormItem>
			        <FormItem label="位置">
			        	<Input clearable v-model="riskLiauidForm.wz"></Input>
			        </FormItem>
			        <FormItem label="数量">
			        	<Input clearable v-model="riskLiauidForm.sl"></Input>
			        </FormItem>
			        <FormItem label="回收周期">
			        	<Input clearable v-model="riskLiauidForm.hszq"></Input>
			        </FormItem>
			        <FormItem label="回收单位">
			        	<Input clearable v-model="riskLiauidForm.hsdw"></Input>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">	
	            <!-- <Button type="text" size="large" @click="showYdModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveRiskLiauid">保存</Button>
	        </div>
		</Modal>
	</div>
</template>

<script>	
	import api from '@/api/api'
	import partTitle from '@/components/title'
	import lng from '../../../baseInfo/components/lng'
	import areajs from '@/common/js/area'
	import lngjs from '@/common/js/lng'
	import datePickerjs from '@/common/js/datePicker'
	import { getDate } from '@/utils/tool'

	const levelChildren = [
		{
			value: '1', 
			label: '甲'
		}, {
			value: '2', 
			label: '乙'
		}, {
			value: '3', 
			label: '丙'
		}
	]

	export default {
		name: '',
		mixins: [areajs, lngjs, datePickerjs],
		components: { partTitle, lng },
		data() {
			return {
				step: 1,	
				showAreaModel: false,
				showLngModel: false,
				showWhModel: false,
				showYdModel: false,
				showRiskLiauidModel: false,
				showXfModel: false,
				showMainRiskModel: false,
				showSpecialModel: false,
				modeType: '',
				map: null,
				polygonTool: null,
				gkdx_id: this.$storage.get('userInfo').gkdx_id,
				baseInfo: {
					yymc: '医院',
					yylx: '',
					jbdw: '',
					zcdjdz: '',
					tyshxydm: '',
					quyu: [],
					jctysj: '',
					hydm: '',
					yydj: [],
					yydz: '',
					zdmj: 0,
					jzmj: 0,
					lngAndLat: '',	
					yyfw: '',
					jbr: '',
					jbrdh: '',
					jbryx: '',	
				},
				mostForm: {
					cyrs: 0,
					rjmzrs: 0,
					cws: 0,
					rjcwsyl: 0,
					xfzddw: '',
					hzgwdw: '',
				},
				area: '',
				lng: '',
				lat: '',
				yylxList: ['民办', '公办', '合资', '其他'],
				levelList: [
					{
						value: '0',
	                    label: '未定级'
					}, {
						value: '1',
	                    label: '一级',
	                    children: levelChildren
					}, {
						value: '2',
	                    label: '二级',
	                    children: levelChildren
					}, {
						value: '3',
	                    label: '三级',
	                    children: levelChildren
					}, {
						value: '4',
	                    label: '卫生院',
	                    children: levelChildren
					}
				],
				xfzddwList: [
					{
						value: 0,
						name: '否'
					}, {
						value: 1,
						name: '是'
					}
				],
				areaList: [],
				whColumns: [
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
                        title: '化学品名称',
                        key: 'hxpmc',
                    }, {
                        title: 'CAS',
                        key: 'Ch',
                    }, {
                        title: '数量',
                        key: 'sl',
                    }, {
                        title: '储存位置',
                        key: 'ccwz',
                    }, {
                        title: '年使用量(kg)',
                        key: 'nsyl',
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				whData: [],
				whForm: {
					hxpmc: '',
					Ch: '',
					sl: 0,
					nsyl: 0,
					ccwz: ''
				},
				whPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				ydColumns: [
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
                        title: '名称',
                        key: 'mc',
                    }, {
                        title: '位置',
                        key: 'wz',
                    }, {
                        title: '容量',
                        key: 'rl',
                    }, {
                        title: '数量',
                        key: 'sl',
                    }, {
                        title: '压力',
                        key: 'yl',
                    }, {
                        title: '年使用量(kg)',
                        key: 'nsyl',
                    }, {
                        title: '储罐/钢瓶检验有效期',
                        key: 'jyyxq',
                    }, {
                        title: '检验单位',
                        key: 'jydw',
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				ydData: [],
				ydForm: {
					mc: '',
					wz: '',
					rl: 0,
					sl: 0,
					yl: 0,
					nsyl: 0,
					jyyxq: '',
					jydw: ''
				},
				ydPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				riskLiauidColumns: [
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
                        title: '名称',
                        key: 'mc',
                    }, {
                        title: '位置',
                        key: 'wz',
                    }, {
                        title: '数量',
                        key: 'sl',
                    }, {
                        title: '回收周期',
                        key: 'hszq',
                    }, {
                        title: '回收单位',
                        key: 'hsdw',
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				riskLiauidData: [],
				riskLiauidForm: {
					mc: '',
					wz: '',
					sl: 0,
					hszq: '',
					hsdw: ''
				},
				riskLiauidNum: {
					sum: 20,
					country: 10,
					province: 5,
					city: 3,
					county: 2
				},
				riskLiauidPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				form: {}
			}
		},
		watch: {

		},
		computed: {
			rules() {
				const validatorQuyu = (rule, value, callback) => {
					if (!value || value.length == 0) {
	                    callback(new Error('请选择'));
	                } else {
	                    callback();
	                }
				}
				return {
                	quyu: [{ required: true, validator: validatorQuyu, trigger: 'change' }],
                	yydz: [{ required: true, message: '请输入', trigger: 'change' }],
                	lngAndLat: [{ required: true, message: '请选择', trigger: 'change' }],
                	// yylx: [{ required: true, message: '请选择', trigger: 'change' }],
                	// yydj: [{ required: true, type: 'array', message: '请选择', trigger: 'change' }],
                	// jbdw: [{ required: true, message: '请输入', trigger: 'change' }],
                	// jctysj: [{ required: true, type: 'date', message: '请输入', trigger: 'change' }],
                	// zdmj: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
                	// jzmj: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
                	// tyshxydm: [{ required: true, message: '请输入', trigger: 'change' }],
                	// yyfw: [{ required: true, message: '请选择', trigger: 'change' }],
                	// zcdjdz: [{ required: true, message: '请输入', trigger: 'change' }],
                	// hydm: [{ required: true, message: '请输入', trigger: 'change' }],
                	// jbr: [{ required: true, message: '请输入', trigger: 'change' }],
                	// jbrdh: [{ required: true, message: '请输入', trigger: 'change' }],
                	// jbryx: [{ required: true, message: '请输入', trigger: 'change' }],
				}
			},
		},
		methods: {
			async getBaseInfo() {
				let { status_code, data, message } = await api.getHospitalBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					let { jbr, jbrdh, jbryx, yymc, jbdw, zcdjdz, tyshxydm, yydz, quyu_id, jd, wd, yyfw, jctysj, yylx, hydm, yydj, zdmj, jzmj, cyrs, rjmzrs, cws, rjcwsyl, xfzddw, hzgwdw } = this.form
					this.baseInfo = { yymc, jbdw, zcdjdz, tyshxydm, yylx, hydm, jctysj: '', yydj: [], zdmj, jzmj, yydz, yyfw, jbr, jbrdh, jbryx }
					this.baseInfo.jctysj = this.form.jctysj ? new Date(this.form.jctysj) : '';
					this.baseInfo.yydj = this.form.yydj ? this.form.yydj.split(',') : [];
					this.baseInfo.zdmj = zdmj ? Number(zdmj) : 0
					this.baseInfo.jzmj = jzmj ? Number(jzmj) : 0
					this.baseInfo.yyfw = yyfw || ''
					this.baseInfo.lngAndLat = this.form.jd && this.form.wd ? `${(this.form.jd - 0).toFixed(6)} ${(this.form.wd - 0).toFixed(6)}` : ''
					this.getQy()
					// this.getHy()
				}
			},
			async nextStep() {
				this.$refs.baseInfo.validate((valid) => {
                    if (valid) {
                        this.$refs.jzInfo.validate((valid) => {
		                    if (valid) {
		                        this.$refs.baseInfo.validate((valid) => {
				                    if (valid) {
				                        this.submit()
				                    }
				                })
		                    }
		                })
                    }
                })
                this.$refs.contactInfo.validate((valid) => {})
                this.$refs.jzInfo.validate((valid) => {})
			},
			async submit() {
				let params = {
					...this.baseInfo,
					jctysj: this.baseInfo.jctysj ? getDate(new Date(this.baseInfo.jctysj).getTime(), 'date') : '',
					quyu_id: this.baseInfo.quyu[this.baseInfo.quyu.length - 1],
					yydj: this.baseInfo.yydj.join(','),
					jd: this.baseInfo.lngAndLat.split(' ')[0],
					wd: this.baseInfo.lngAndLat.split(' ')[1],
				}	 
				if(this.$route.query.type == 2) {
					params.gkdx_id = this.form.gkdx_id
				}
				delete params.quyu
				delete params.lngAndLat
				let { status_code, message } = await api.addHospitalBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
					if(this.$route.name == 'base') {
						this.$storage.set('gkdx_id', this.form.gkdx_id)
						this.$router.back()
					}
				}
			},
			async saveInfo() {
				let params = {
					...this.mostForm,
					gkdx_id: this.gkdx_id
				}
				let { status_code, message } = await api.addHospitalBase(params);
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
					let lo = new T.Geolocation();
		            lo.getCurrentPosition((e) => {
						this.map = new T.Map('area_box');
						let ctrl = new T.Control.MapType(); 
		            	this.map.addControl(ctrl); // 增加地图类型控件
		            	//移除图层
		            	this.map.removeControl(TMAP_NORMAL_MAP);
			            //添加图层
			            this.map.addControl(TMAP_HYBRID_MAP);
			            if(this.baseInfo.lngAndLat) {
			            	this.map.centerAndZoom(new T.LngLat(this.baseInfo.lngAndLat.split(' ')[0] || e.lnglat.lng, this.baseInfo.lngAndLat.split(' ')[1] || e.lnglat.lat), 10);
			            }else {
			            	this.map.centerAndZoom(new T.LngLat(e.lnglat.lng, e.lnglat.lat), 10);
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
			            if(this.baseInfo.yyfw) {
			            	let yyfw = JSON.parse(this.baseInfo.yyfw)
			            	let points = yyfw.map(item => {
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
					this.baseInfo.yyfw = JSON.stringify(e.currentLnglats)
				})
			},
			clearArea() {
				this.baseInfo.yyfw = ''
				this.map.clearOverLays()
			},
			cancelArea() {
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.baseInfo.yyfw = this.yyfw || this.form.yyfw || '';
				this.showAreaModel = false
			},
			saveArea() {
				this.yyfw = this.baseInfo.yyfw;
				this.form.yyfw = this.baseInfo.yyfw;
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.showAreaModel = false
			},
			handleChangeWhPage(val) {
				this.whPage.pageIndex = val
				this.getWhItemList()
			},
			handleChangeWhPageSize(val) {
				this.whPage.pageSize = val
				this.getWhItemList()
			},
			whModelChange(status) {
				if(!status) {
					this.whForm = {
						hxpmc: '',
						Ch: '',
						sl: 0,
						nsyl: 0,
						ccwz: ''
					}
				}
			},
			async getWhItemList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.whPage.pageSize,
					page: this.whPage.pageIndex,
				}
				let { status_code, data } = await api.getWhyyItemList(params)
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
					hxpmc: row.hxpmc,
					Ch: row.Ch,
					sl: row.sl ? Number(row.sl) : 0,
					nsyl: row.nsyl ? Number(row.nsyl) : 0,
					ccwz: row.ccwz
				}
				this.id = row.id
				this.modeType = 2;
				this.showWhModel = true
			},
			async removeWh(row) {
				let { status_code } = await api.deleteWhyyItem(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getWhItemList()
			},
			async saveWh() {
				let params = {
					...this.whForm,
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addWhyyItem(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showWhModel = false
					this.getWhItemList()
				}
			},
			handleChangeYdPage(val) {
				this.ydPage.pageIndex = val
				this.getYdItemList()
			},
			handleChangeYdPageSize(val) {
				this.ydPage.pageSize = val
				this.getYdItemList()
			},
			ydModelChange(status) {
				if(!status) {
					this.ydForm = {
						mc: '',
						wz: '',
						rl: 0,
						sl: 0,
						yl: 0,
						nsyl: 0,
						jyyxq: '',
						jydw: ''
					}
				}
			},
			async getYdItemList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.ydPage.pageSize,
					page: this.ydPage.pageIndex,
				}
				let { status_code, data } = await api.getYdItemList(params)
				if(status_code == 200) {
					this.ydData = data.data
					this.ydPage.totalRow = data.total
				}
			},
			openYdModel() {
				this.modeType = 1;
				this.showYdModel = true
			},
			editYdModel(row) {
				this.ydForm = {
					mc: row.mc,
					wz: row.wz,
					rl: row.rl ? Number(row.rl) : 0,
					sl: row.rl ? Number(row.sl) : 0,
					yl: row.rl ? Number(row.yl) : 0,
					nsyl: row.rl ? Number(row.nsyl) : 0,
					jyyxq: row.jyyxq ? new Date(row.jyyxq) : '',
					jydw: row.jydw
				}
				this.id = row.id
				this.modeType = 2;
				this.showYdModel = true
			},
			async removeYd(row) {
				let { status_code } = await api.deleteYdItem(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getYdItemList()
			},
			async saveYd() {
				let params = {
					...this.ydForm,
					jyyxq: this.ydForm.jyyxq ? getDate(new Date(this.ydForm.jyyxq).getTime(), 'date') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addYdItem(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showYdModel = false
					this.getYdItemList()
				}
			},
			handleChangeRiskLiauidPage(val) {
				this.riskLiauidPage.pageIndex = val
				this.getRiskLiauidItemList()
			},
			handleChangeRiskLiauidPageSize(val) {
				this.riskLiauidPage.pageSize = val
				this.getRiskLiauidItemList()
			},
			riskLiauidModelChange(status) {
				if(!status) {
					this.riskLiauidForm = {
						mc: '',
						wz: '',
						sl: 0,
						hszq: '',
						hsdw: ''
					}
				}
			},
			async getRiskLiauidItemList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.riskLiauidPage.pageSize,
					page: this.riskLiauidPage.pageIndex,
				}
				let { status_code, data } = await api.getRiskLiauidItemList(params)
				if(status_code == 200) {
					this.riskLiauidData = data.data
					this.riskLiauidPage.totalRow = data.total
				}
			},
			openRiskLiauidModel() {
				this.modeType = 1;
				this.showRiskLiauidModel = true
			},
			editRiskLiauidModel(row) {
				this.riskLiauidForm = {
					mc: row.mc,
					wz: row.wz,
					sl: row.sl ? Number(row.sl) : 0,
					hszq: row.hszq,
					hsdw: row.hsdw
				}
				this.id = row.id
				this.modeType = 2;
				this.showRiskLiauidModel = true
			},
			async removeRiskLiauid(row) {
				let { status_code } = await api.deleteRiskLiauidItem(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getRiskLiauidItemList()
			},
			async saveRiskLiauid() {
				let params = {
					...this.riskLiauidForm,
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addRiskLiauidItem(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showRiskLiauidModel = false
					this.getRiskLiauidItemList()
				}
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