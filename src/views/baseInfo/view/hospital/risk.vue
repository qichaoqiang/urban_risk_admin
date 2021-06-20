<template>
	<div class="page">
		<div>
			<Row type="flex" justify="center">
				<Col span="22">
					<div v-show="!isDisEditInfo" class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="医院规模" name="name1">
							<part-title text="医院规模"></part-title>
							<Form :disabled="isDisEditInfo" :model="baseInfo" ref="baseInfo1" :rules="baseInfoRules" hide-required-mark label-position="left" inline :label-width="120">
						        <FormItem label="从业人员" prop="cyrs" style="margin-right: 100px">
						        	<InputNumber :min="0" v-model="baseInfo.cyrs"></InputNumber>
						        </FormItem>
						        <FormItem label="日均门诊人数" prop="rjmzrs" style="margin-right: 100px">
						        	<InputNumber :min="0" v-model="baseInfo.rjmzrs"></InputNumber>
						        </FormItem>
						        <FormItem label="床位数" prop="cws" style="margin-right: 100px">
						        	<InputNumber :min="0" v-model="baseInfo.cws"></InputNumber>
						        </FormItem>
						        <FormItem label="日均床位使用量" prop="rjcwsyl" style="margin-right: 100px">
						        	<InputNumber :min="0" v-model="baseInfo.rjcwsyl"></InputNumber>
						        </FormItem>
							</Form>
							<Row v-show="!isDisEditInfo" type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo1">完成</Button>
								</Col>
							</Row>
				        </TabPane>
				        <TabPane label="危险化学品" name="name2">
				        	<part-title text="危险化学品"></part-title>
							<Row type="flex" justify="end">
								<Col span="23">
					                <part-title text="化学品" :btns="['add']" @add="openWhModel"></part-title>
									<Table :columns="whColumns" :data="whData">
										<template slot-scope="{ row }" slot="action">
								            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editWhModel(row)">编辑</Button>
								            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeWh(row)">
										        <Button v-show="!isDisEditInfo" type="error" size="small" ghost>删除</Button>
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
									<part-title text="液氧" :btns="['add']" @add="openYdModel"></part-title>
									<Table :columns="ydColumns" :data="ydData">
										<template slot-scope="{ row }" slot="action">
								            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editYdModel(row)">编辑</Button>
								            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeYd(row)">
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
								            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editRiskLiauidModel(row)">编辑</Button>
								            
								            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeRiskLiauid(row)">
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
				        </TabPane>
				        <TabPane label="火灾危险" name="name3">
				        	<part-title text="火灾危险"></part-title>
							<Form :disabled="isDisEditInfo" :model="baseInfo" ref="baseInfo2" :rules="baseInfoRules" hide-required-mark label-position="left" inline :label-width="100">
						        <FormItem label="消防重点单位" prop="xfzddw" style="margin-right: 120px">
						            <Select clearable v-model="baseInfo.xfzddw" placeholder="请选择">
						                <Option v-for="item in xfzddwList" :key="item.value" :value="item.value">{{item.name}}</Option>
						            </Select>
						        </FormItem>
						        <FormItem label="火灾高危单位" prop="hzgwdw" style="margin-right: 120px">
						            <Select clearable v-model="baseInfo.hzgwdw" placeholder="请选择">
						                <Option v-for="item in xfzddwList" :key="item.value" :value="item.value">{{item.name}}</Option>
						            </Select>
						        </FormItem>
							</Form>
							<Row v-show="!isDisEditInfo" type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo2">完成</Button>
								</Col>
							</Row>
				        </TabPane>
				    </Tabs>
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
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}化学品`" v-model="showWhModel" @on-visible-change="whModelChange">
			<div>
				<Form :model="whForm" ref="wh" :rules="whRules" hide-required-mark label-position="left" :label-width="120">
					<FormItem label="化学品名称" prop="hxpmc">
			        	<Input clearable v-model="whForm.hxpmc"></Input>
			        </FormItem>
			        <FormItem label="CAS" prop="Ch">
			        	<Input clearable v-model="whForm.Ch"></Input>
			        </FormItem>
			        <FormItem label="数量" prop="sl">
			            <InputNumber :min="0" v-model="whForm.sl"></InputNumber>
			        </FormItem>
			        <FormItem label="储存位置" prop="ccwz">
			        	<Input clearable v-model="whForm.ccwz"></Input>
			        </FormItem>
			        <FormItem label="年使用量(kg)" prop="nsyl">
			            <InputNumber :min="0" v-model="whForm.nsyl"></InputNumber>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="modelLoading" @click="saveWh">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}液氧`" v-model="showYdModel" @on-visible-change="ydModelChange">
			<div>
				<Form :model="ydForm" ref="yd" :rules="ydRules" hide-required-mark label-position="left" :label-width="160">
					<FormItem label="名称" prop="mc">
			        	<Input clearable v-model="ydForm.mc"></Input>
			        </FormItem>
			        <FormItem label="位置" prop="wz">
			        	<Input clearable v-model="ydForm.wz"></Input>
			        </FormItem>
			        <FormItem label="容量" prop="rl">
			            <InputNumber :min="0" v-model="ydForm.rl"></InputNumber>
			        </FormItem>
			        <FormItem label="数量" prop="sl">
			            <InputNumber :min="0" v-model="ydForm.sl"></InputNumber>
			        </FormItem>
			        <FormItem label="压力" prop="yl">
			            <InputNumber :min="0" v-model="ydForm.yl"></InputNumber>
			        </FormItem>
			        <FormItem label="年使用量(kg)" prop="nsyl">
			            <InputNumber :min="0" v-model="ydForm.nsyl"></InputNumber>
			        </FormItem>
			        <FormItem label="储罐/钢瓶检验有效期" prop="jyyxq">
			        	<DatePicker type="date" v-model="ydForm.jyyxq"></DatePicker>
			        </FormItem>
			        <FormItem label="检验单位" prop="jydw">
			        	<Input clearable v-model="ydForm.jydw"></Input>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showYdModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="modelLoading" @click="saveYd">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}危险废液`" v-model="showRiskLiauidModel" @on-visible-change="riskLiauidModelChange">
			<div>
				<Form :model="riskLiauidForm" ref="riskLiauid" :rules="riskLiauidRules" hide-required-mark label-position="left" :label-width="120">
					<FormItem label="名称" prop="mc">
			        	<Input clearable v-model="riskLiauidForm.mc"></Input>
			        </FormItem>
			        <FormItem label="位置" prop="wz">
			        	<Input clearable v-model="riskLiauidForm.wz"></Input>
			        </FormItem>
			        <FormItem label="数量" prop="sl">
			            <InputNumber :min="0" v-model="riskLiauidForm.sl"></InputNumber>
			        </FormItem>
			        <FormItem label="回收周期" prop="hszq">
			        	<Input clearable v-model="riskLiauidForm.hszq"></Input>
			        </FormItem>
			        <FormItem label="回收单位" prop="hsdw">
			        	<Input clearable v-model="riskLiauidForm.hsdw"></Input>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">	
	            <!-- <Button type="text" size="large" @click="showYdModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="modelLoading" @click="saveRiskLiauid">保存</Button>
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
		components: { partTitle },
		data() {
			return {
				step: 2,	
				showAreaModel: false,
				showLngModel: false,
				showWhModel: false,
				showYdModel: false,
				showRiskLiauidModel: false,
				showXfModel: false,
				showMainRiskModel: false,
				showSpecialModel: false,
				modelLoading: false,
				modeType: '',
				map: null,
				polygonTool: null,
				gkdx_id: this.$storage.get('userInfo').gkdx_id,
				baseInfo: {
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
				            return h('span',params.index + (this.whPage.pageIndex- 1) * this.whPage.pageSize + 1);
				        }
                    }, {
                        title: '化学品名称',
                        key: 'hxpmc',
                        minWidth: 110
                    }, {
                        title: 'CAS',
                        key: 'Ch',
                        minWidth: 100
                    }, {
                        title: '数量',
                        key: 'sl',
                        minWidth: 80
                    }, {
                        title: '储存位置',
                        key: 'ccwz',
                        minWidth: 100
                    }, {
                        title: '年使用量(kg)',
                        key: 'nsyl',
                        minWidth: 140
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
				            return h('span',params.index + (this.ydPage.pageIndex- 1) * this.ydPage.pageSize + 1);
				        }
                    }, {
                        title: '名称',
                        key: 'mc',
                        minWidth: 80
                    }, {
                        title: '位置',
                        key: 'wz',
                        minWidth: 80
                    }, {
                        title: '容量',
                        key: 'rl',
                        minWidth: 80
                    }, {
                        title: '数量',
                        key: 'sl',
                        minWidth: 80
                    }, {
                        title: '压力',
                        key: 'yl',
                        minWidth: 80
                    }, {
                        title: '年使用量(kg)',
                        key: 'nsyl',
                        minWidth: 140
                    }, {
                        title: '储罐/钢瓶检验有效期',
                        key: 'jyyxq',
                        minWidth: 180
                    }, {
                        title: '检验单位',
                        key: 'jydw',
                        minWidth: 100
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
				            return h('span',params.index + (this.riskLiauidPage.pageIndex- 1) * this.riskLiauidPage.pageSize + 1);
				        }
                    }, {
                        title: '名称',
                        key: 'mc',
                        minWidth: 80
                    }, {
                        title: '位置',
                        key: 'wz',
                        minWidth: 80
                    }, {
                        title: '数量',
                        key: 'sl',
                        minWidth: 80
                    }, {
                        title: '回收周期',
                        key: 'hszq',
                        minWidth: 100
                    }, {
                        title: '回收单位',
                        key: 'hsdw',
                        minWidth: 100
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
			}
		},
		watch: {

		},
		computed: {
			baseInfoRules() {
				return {
					cyrs: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					rjmzrs: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					cws: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					rjcwsyl: [{ required: true, type: 'number', message: '请选择', trigger: 'change' }],
					xfzddw: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					hzgwdw: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
				}
			},
			whRules() {
				return {
					hxpmc: [{ required: true, message: '请输入', trigger: 'change' }],
					Ch: [{ required: true, message: '请输入', trigger: 'change' }],
					sl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					ccwz: [{ required: true, message: '请输入', trigger: 'change' }],
					nsyl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
				}
			},
			ydRules() {
				return {
					mc: [{ required: true, message: '请输入', trigger: 'change' }],
					wz: [{ required: true, message: '请输入', trigger: 'change' }],
					rl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					sl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					yl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					nsyl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					jyyxq: [{ required: true, type: 'date', message: '请输入', trigger: 'change' }],
					jydw: [{ required: true, message: '请输入', trigger: 'change' }],
				}
			},
			riskLiauidRules() {
				return {
					mc: [{ required: true, message: '请输入', trigger: 'change' }],
					wz: [{ required: true, message: '请输入', trigger: 'change' }],
					sl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					hsdw: [{ required: true, message: '请输入', trigger: 'change' }],
					hszq: [{ required: true, message: '请输入', trigger: 'change' }],
				}
			},
		},
		methods: {
			async getBaseInfo() {
				this.loading = true
				let whParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.whPage.pageSize,
					page: this.whPage.pageIndex,
				}
				let ydParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.ydPage.pageSize,
					page: this.ydPage.pageIndex,
				}
				let riskLiauidParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.riskLiauidPage.pageSize,
					page: this.riskLiauidPage.pageIndex,
				}
				Promise.all([api.getWhyyItemList(whParams), api.getYdItemList(ydParams), api.getRiskLiauidItemList(riskLiauidParams)]).then((result) => {
				  	let whRes = result[0], ydRes = result[1], riskLiauidRes = result[2]
				  	if(whRes.status_code == 200) {
				  		this.whData = whRes.data.data
				  		this.whNum = whRes.data.yxzt
				  		this.whPage.totalRow = whRes.data.total
				  	}
				  	if(ydRes.status_code == 200) {
				  		this.ydData = ydRes.data.data
				  		this.ydNum = ydRes.data.jb
				  		this.ydPage.totalRow = ydRes.data.total
				  	}
				  	if(riskLiauidRes.status_code == 200) {
				  		this.riskLiauidData = riskLiauidRes.data.data
				  		this.riskLiauidNum = riskLiauidRes.data.yyzt
				  		this.riskLiauidPage.totalRow = riskLiauidRes.data.total
				  	}
				  	this.loading = false   
				}).catch((error) => {
				  	console.log(error)
				  	this.loading = false
				})
				let { status_code, data, message } = await api.getHospitalBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					this.baseInfo = { 
						cyrs: data.cyrs ? Number(data.cyrs) : 0,
						rjmzrs: data.rjmzrs ? Number(data.rjmzrs) : 0,
						cws: data.cws ? Number(data.cws) : 0,
						rjcwsyl: data.rjcwsyl ? Number(data.rjcwsyl) : 0,
						xfzddw: data.xfzddw ? Number(data.xfzddw) : 0,
						hzgwdw: data.hzgwdw ? Number(data.hzgwdw) : 0,
					}
					this.getQy()
				}
			},
			async nextStep() {
				let params = {
					...this.baseInfo,
					...this.addressInfo,
					...this.contactInfo,
					jctysj: this.baseInfo.jctysj ? getDate(new Date(this.baseInfo.jctysj).getTime(), 'date') : '',
					quyu_id: this.baseInfo.quyu[this.baseInfo.quyu.length - 1],
					yydj: this.baseInfo.yydj.join(','),
					jd: this.addressInfo.lngAndLat.split(' ')[0],
					wd: this.addressInfo.lngAndLat.split(' ')[1],
				}	 
				if(this.$route.query.type == 2) {
					params.gkdx_id = this.form.gkdx_id
				}
				delete params.quyu
				delete params.lngAndLat
				let { status_code, message } = await api.addHospitalBase(params);
				if(status_code == 200) {
					this.loading = true
					this.step++
					if(this.$route.query.type == 2) {
						this.gkdx_id = this.form.gkdx_id
					}else {
						let { status_code, data } = await api.getHospitalBase()
						if(status_code == 200) {
							this.gkdx_id = data.data[0].gkdx_id
						}
					} 
					let whParams = {
						gkdx_id: this.gkdx_id,
						per_page: this.whPage.pageSize,
						page: this.whPage.pageIndex,
					}
					let ydParams = {
						gkdx_id: this.gkdx_id,
						per_page: this.ydPage.pageSize,
						page: this.ydPage.pageIndex,
					}
					let riskLiauidParams = {
						gkdx_id: this.gkdx_id,
						per_page: this.riskLiauidPage.pageSize,
						page: this.riskLiauidPage.pageIndex,
					}
					Promise.all([api.getWhyyItemList(whParams), api.getYdItemList(ydParams), api.getRiskLiauidItemList(riskLiauidParams)]).then((result) => {
					  	let whRes = result[0], ydRes = result[1], riskLiauidRes = result[2]
					  	if(whRes.status_code == 200) {
					  		this.whData = whRes.data.data
					  		this.whNum = whRes.data.yxzt
					  		this.whPage.totalRow = whRes.data.total
					  	}
					  	if(ydRes.status_code == 200) {
					  		this.ydData = ydRes.data.data
					  		this.ydNum = ydRes.data.jb
					  		this.ydPage.totalRow = ydRes.data.total
					  	}
					  	if(riskLiauidRes.status_code == 200) {
					  		this.riskLiauidData = riskLiauidRes.data.data
					  		this.riskLiauidNum = riskLiauidRes.data.yyzt
					  		this.riskLiauidPage.totalRow = riskLiauidRes.data.total
					  	}
					  	this.loading = false   
					}).catch((error) => {
					  	console.log(error)
					  	this.loading = false
					})
				}
			},
			async saveInfo1() {
				this.$refs.baseInfo1.validate(async valid => {
                    if (valid) {
                        let params = {
                        	gkdx_id: this.gkdx_id,
							cyrs: this.baseInfo.cyrs,
							rjmzrs: this.baseInfo.rjmzrs,
							cws: this.baseInfo.cws,
							rjcwsyl: this.baseInfo.rjcwsyl,
						}
						let { status_code, message } = await api.addHospitalBase(params);
						if(status_code == 200) {
							this.$Message.success('保存成功')
						}
                    }
                })
			},
			async saveInfo2() {
				this.$refs.baseInfo2.validate(async valid => {
                    if (valid) {
                        let params = {
							gkdx_id: this.gkdx_id,
							xfzddw: this.baseInfo.xfzddw,
							hzgwdw: this.baseInfo.hzgwdw,
						}
						let { status_code, message } = await api.addHospitalBase(params);
						if(status_code == 200) {
							this.$Message.success('保存成功')
						}
                    }
                })
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
			            if(this.addressInfo.yyfw) {
			            	let yyfw = JSON.parse(this.addressInfo.yyfw)
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
					this.addressInfo.yyfw = JSON.stringify(e.currentLnglats)
				})
			},
			clearArea() {
				this.addressInfo.yyfw = ''
				this.map.clearOverLays()
			},
			cancelArea() {
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.addressInfo.yyfw = this.yyfw || this.form.yyfw || '';
				this.showAreaModel = false
			},
			saveArea() {
				this.yyfw = this.addressInfo.yyfw;
				this.form.yyfw = this.addressInfo.yyfw;
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
					this.$nextTick(() => {
						this.whForm = {
							hxpmc: '',
							Ch: '',
							sl: 0,
							nsyl: 0,
							ccwz: ''
						}
						this.$refs.wh.resetFields();
					})
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
				this.$refs.wh.validate(async valid => {
                    if (valid) {
                    	this.modelLoading = true
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
							this.modelLoading = false
                    }
                })
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
					this.$nextTick(() => {
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
						this.$refs.yd.resetFields();
					})
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
				this.$refs.yd.validate(async valid => {
                    if (valid) {
                    	this.modelLoading = true
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
							this.modelLoading = false
                    }
                })
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
					this.$nextTick(() => {
						this.riskLiauidForm = {
							mc: '',
							wz: '',
							sl: 0,
							hszq: '',
							hsdw: ''
						}
						this.$refs.riskLiauid.resetFields();
					})
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
				this.$refs.riskLiauid.validate(async valid => {
                    if (valid) {
                    	this.modelLoading = true
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
                    		this.modelLoading = false
                    }
                })
			},
		},
		created() {
			this.getArea('', list => {
				this.areaList = list
				this.getBaseInfo()
			})
      if(this.isDisEditInfo) {
        this.whColumns.pop()
        this.ydColumns.pop()
        this.riskLiauidColumns.pop()
      }
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