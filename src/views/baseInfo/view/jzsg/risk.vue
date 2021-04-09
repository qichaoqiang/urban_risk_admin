<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div v-show="step == 2">
			<Row type="flex" justify="center">
				<Col span="22">
					<div v-show="!isDisEditInfo" class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="危险性较大分部分项工程" name="name1">
				        	<part-title text="危险性较大分部分项工程" :btns="['add']" @add="openWxxjdModel"></part-title>
				        	<div style="margin-bottom: 16px;">
				        		<span>合计数量：{{wxxjdSum.wxxjdgcsl}}</span>
				        	</div>
							<Table :columns="wxxjdColumns" :data="wxxjdData">
								<template slot-scope="{ row }" slot="dqjd">
									<span>{{row.dqjd}}%</span>
								</template>
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editWxxjdModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeWxxjd(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="wxxjdPage.pageSize"
				                    :total="wxxjdPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeWxxjdPage"
				                    @on-page-size-change="handleChangeWxxjdPageSize"
				                />
							</Row>
				        </TabPane>
				        <TabPane label="超过一定规模的危险性较大的分部分项工程" name="name2">
				        	<part-title text="超过一定规模的危险性较大的分部分项工程" :btns="['add']" @add="openYdgmModel"></part-title>
				        	<div style="margin-bottom: 16px;">
				        		<span>合计数量：{{ydgmSum.ydgmgcsl}}</span>
				        	</div>
							<Table :columns="ydgmColumns" :data="ydgmData">
								<template slot-scope="{ row }" slot="dqjd">
									<span>{{row.dqjd}}%</span>
								</template>
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editYdgmModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeYdgm(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="ydgmPage.pageSize"
				                    :total="ydgmPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeYdgmPage"
				                    @on-page-size-change="handleChangeYdgmPageSize"
				                />
							</Row>
				        </TabPane>
				    </Tabs>
				</Col>	
			</Row>	
		</div>
		<Modal width="1000" title="企业经纬度标注" v-model="showLngModel">
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
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}危险性较大分部分项工程`" v-model="showWxxjdModel" @on-visible-change="WxxjdModelChange">
			<div>
				<Form :model="wxxjdForm" ref="wxxjd" :rules="wxxjdRules" hide-required-mark label-position="left" :label-width="160">
					<FormItem label="分部分项工程名称" prop="fbfxgcmc">
			        	<Input clearable v-model="wxxjdForm.fbfxgcmc"></Input>
			        </FormItem>
			        <FormItem label="工程类型" prop="gclx">
			        	<Select clearable v-model="wxxjdForm.gclx" placeholder="请选择">
			                <Option v-for="item in gclxList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="施工单位" prop="sgdw">
			        	<Input clearable v-model="wxxjdForm.sgdw"></Input>
			        </FormItem>
			        <FormItem label="监理单位" prop="jldw">
			        	<Input clearable v-model="wxxjdForm.jldw"></Input>
			        </FormItem>
			        <FormItem label="工程启动时间" prop="gcqdsj">
			        	<DatePicker type="date" v-model="wxxjdForm.gcqdsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="预计结束时间" prop="yjjssj">
			        	<DatePicker type="date" v-model="wxxjdForm.yjjssj"  placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="当前形象进度（%）" prop="dqjd">
			        	<InputNumber :min="0" :max="100" v-model="wxxjdForm.dqjd"></InputNumber>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="wxxjdLoading" @click="saveWxxjd">保存</Button>
	        </div>
		</Modal>

		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}超过一定规模的危险性较大的分部分项工程`" v-model="showYdgmModel" @on-visible-change="ydgmModelChange">
			<div>
				<Form :model="ydgmForm" ref="ydgm" :rules="ydgmRules" hide-required-mark label-position="left" :label-width="160">
					<FormItem label="分部分项工程名称" prop="fbfxgcmc">
			        	<Input clearable v-model="ydgmForm.fbfxgcmc"></Input>
			        </FormItem>
			        <FormItem label="工程类型" prop="gclx">
			        	<Select clearable v-model="ydgmForm.gclx" placeholder="请选择">
			                <Option v-for="item in gclxList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="施工单位" prop="sgdw">
			        	<Input clearable v-model="ydgmForm.sgdw"></Input>
			        </FormItem>
			        <FormItem label="监理单位" prop="jldw">
			        	<Input clearable v-model="ydgmForm.jldw"></Input>
			        </FormItem>
			        <FormItem label="工程启动时间" prop="gcqdsj">
			        	<DatePicker type="date" v-model="ydgmForm.gcqdsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="预计结束时间" prop="yjjssj">
			        	<DatePicker type="date" v-model="ydgmForm.yjjssj"  placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="当前形象进度（%）" prop="dqjd">
			        	<InputNumber :min="0" :max="100" v-model="ydgmForm.dqjd"></InputNumber>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="ydgmLoading" @click="saveYdgm">保存</Button>
	        </div>
		</Modal>
	</div>
</template>

<script>
	import api from '@/api/api'
	import partTitle from '@/components/title'
	import lng from '../../components/lng'
	import qyfw from '../../components/qyfw'
	import tablejs from '@/common/js/table'
	import areajs from '@/common/js/area'
	import industryjs from '@/common/js/industry'
	import lngjs from '@/common/js/lng'
	import datePickerjs from '@/common/js/datePicker'
	import { getDate } from '@/utils/tool'
	export default {
		name: '',
		mixins: [tablejs, areajs, industryjs, lngjs, datePickerjs],
		components: { partTitle, lng, qyfw },
		data() {
			return {
				id: '',
				gkdx_id: this.$storage.get('userInfo').gkdx_id,
				zaqId: '',
				Wxxjd_id: '',	
				ccss_id: '',
				loading: true,
				step: 2,	
				showAreaModel: false,
				showLngModel: false,
				showWxxjdModel: false,
				showYdgmModel: false,
				wxxjdLoading: false,
				ydgmLoading: false,
				modeType: '',
				modeType2: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					zdwxy: '',
					sjnzzl: ''
				},
				yxztList: ['生产', '停工', '改造', '搬迁'],
				sfzgyyqList: [
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
                        key: 'hxpm',
                    }, {
                        title: 'CAS号',
                        key: 'cas',
                    }, {
                        title: '是否重点监管',
                        slot: 'sfzdjg',
                    }, {
                        title: '是否爆炸品',
                        slot: 'sfbzp',
                    }, {
                        title: '火灾风险等级',
                        key: 'hzwxxdj',
                    }, {
                        title: 'MSDS',
                        key: 'msds',
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				whData: [],
				whForm: {
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
				},
				whPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				hzwxxdjList: ['甲', '乙', '丙', '丁', '戊'],
				hxpztList: ['气体', '液化气体', '液体', '固体'],
				nzzldwList: ['吨', '立方', 'KG', 'L'],
				sxflList: ['最终产品', '中间产品', '原料'],
				whRiskColumns: [
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
                        title: '重大危险源单元名称',
                        key: 'zdwxydymc',
                    }, {
                        title: '重大危险源等级',
                        key: 'zdwxydj',
                    }, {
                        title: '危险化学品',
                        key: 'wxhxp',
                    }, {
                        title: '投用时间',
                        key: 'tysj',
                    }, {
                        title: '当前状态',
                        key: 'dqzt',
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				whRiskData: [],
				whRiskForm: {
					zdwxydymc: '',
					zdwxydj: '',
					wxhxp: '',
					tysj: '',
					dqzt: ''
				},
				dqztList: ['运行', '停运', '检修'],
				whRiskPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				wxxjdColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.wxxjdPage.pageIndex- 1) * this.wxxjdPage.pageSize + 1);
				        }
                    }, {
                        title: '分部分项工程名称',
                        key: 'fbfxgcmc',
                        minWidth: 160
                    }, {
                        title: '工程类型',
                        key: 'gclx',
                        minWidth: 100
                    }, {
                        title: '施工单位',
                        key: 'sgdw',
                        minWidth: 100
                    }, {
                        title: '监理单位',
                        key: 'jldw',
                        minWidth: 100
                    }, {
                        title: '工程启动时间',
                        key: 'gcqdsj',
                        minWidth: 120
                    }, {
                        title: '预计结束时间',
                        key: 'yjjssj',
                        minWidth: 120
                    }, {
                        title: '当前形象进度',
                        slot: 'dqjd',
                        minWidth: 120
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				wxxjdData: [],
				wxxjdForm: {
					fbfxgcmc: '',
					gclx: '',
					sgdw: '',
					jldw: '',
					gcqdsj: '',
					yjjssj: '',
					dqjd: 0
				},
				gclxList: ['基坑支护降水工程和土方开挖', '模板工程及支撑体系', '起重吊装及安装拆卸工程', '脚手架工程及吊篮', '拆除、爆破工程', '其他'],
				wxxjdPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				wxxjdSum: {
					wxxjdgcsl: 0
		  		},
				ydgmColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.ydgmPage.pageIndex- 1) * this.ydgmPage.pageSize + 1);
				        }
                    }, {
                        title: '分部分项工程名称',
                        key: 'fbfxgcmc',
                        minWidth: 160
                    }, {
                        title: '工程类型',
                        key: 'gclx',
                        minWidth: 100
                    }, {
                        title: '施工单位',
                        key: 'sgdw',
                        minWidth: 100
                    }, {
                        title: '监理单位',
                        key: 'jldw',
                        minWidth: 100
                    }, {
                        title: '工程启动时间',
                        key: 'gcqdsj',
                        minWidth: 120
                    }, {
                        title: '预计结束时间',
                        key: 'yjjssj',
                        minWidth: 120
                    }, {
                        title: '当前形象进度',
                        slot: 'dqjd',
                        minWidth: 120
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				ydgmData: [],
				ydgmForm: {
					fbfxgcmc: '',
					gclx: '',
					sgdw: '',
					jldw: '',
					gcqdsj: '',
					yjjssj: '',
					dqjd: 0
				},
				gclxList: ['基坑支护降水工程和土方开挖', '模板工程及支撑体系', '起重吊装及安装拆卸工程', '脚手架工程及吊篮', '拆除、爆破工程', '其他'],
				ydgmPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				ydgmSum: {
					ydgmgcsl: 0,
		  		},
				gyzColumns: [
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
                        title: '储气容器名称',
                        key: 'cqrqmc',
                    }, {
                        title: '容积(m³)',
                        key: 'rj',
                    }, {
                        title: '压力(Mpa)',
                        key: 'yl',
                    }, {
                        title: '数量',
                        key: 'sl',
                    }, {
                        title: '备注',
                        key: 'bz',
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				gyzData: [],
				gyzForm: {
					cqrqmc: '',
					rj: 0,
					yl: 0,
					sl: 0,
					bz: '',
				},
				gyzPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				jyzkColumns: [
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
                        title: '近5日日平均周转量(m³)',
                        key: 'jrrpjzzl',
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
				jyzkData: [],
				jyzkForm: {
					jrrpjzzl: 0,
					tbsj: '',
				},
				jyzkPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				rimColumns: [
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
                        title: '敏感目标名称',
                        key: 'mgmbmc',
                    }, {
                        title: '方位',
                        key: 'fw',
                    }, {
                        title: '目标类型',
                        key: 'mgmblx',
                    }, {
                        title: '人员数量',
                        key: 'rysl',
                    },{
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				rimData: [],
				rimForm: {
					mgmbmc: '',
					mgmblx: '',
					fw: '',
					mgmbjl: 0,
					rysl: 0,
					lngAndLat: '',
					qyfw: ''
				},
				fwList: ['东', '南', '西', '北', '东北', '东南', '西北', '西南'],
				mgmblxList: ['医院', '养老院', '学校', '政府机构', '商场', '居住区', '监狱', '宗教', '车站', '码头', '铁路', '公路', '林区', '工厂', '矿山', '河流', '其他'],
				rimPage: {
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
			wxxjdRules() {
				return {
					// fbfxgcmc: [{ required: true, message: '请输入', trigger: 'change' }],
					// gclx: [{ required: true, message: '请选择', trigger: 'change' }],
					// sgdw: [{ required: true, message: '请输入', trigger: 'change' }],
					// jldw: [{ required: true, message: '请输入', trigger: 'change' }],
					// gcqdsj: [{ required: true, type: 'date', message: '请输入', trigger: 'change' }],
					// yjjssj: [{ required: true, type: 'date', message: '请输入', trigger: 'change' }],
					// dqjd: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
				}
			},
			ydgmRules() {
				return {
					// fbfxgcmc: [{ required: true, message: '请输入', trigger: 'change' }],
					// gclx: [{ required: true, message: '请选择', trigger: 'change' }],
					// sgdw: [{ required: true, message: '请输入', trigger: 'change' }],
					// jldw: [{ required: true, message: '请输入', trigger: 'change' }],
					// gcqdsj: [{ required: true, type: 'date', message: '请输入', trigger: 'change' }],
					// yjjssj: [{ required: true, type: 'date', message: '请输入', trigger: 'change' }],
					// dqjd: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
				}
			},
		},
		methods: {
			async getBaseInfo() {
				this.loading = true
				let wxxjdParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.wxxjdPage.pageSize,
					page: this.wxxjdPage.pageIndex,
				}
				let ydgmParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.ydgmPage.pageSize,
					page: this.ydgmPage.pageIndex,
				}
				Promise.all([api.getWxxjdList(wxxjdParams), api.getYdgmList(ydgmParams)]).then((result) => {
				  	let wxxjdRes = result[0], ydgmRes = result[1]
				  	if(wxxjdRes.status_code == 200) {
				  		this.wxxjdData = wxxjdRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.wxxjdPage.totalRow = wxxjdRes.data.total
				  		this.wxxjdSum.wxxjdgcsl = wxxjdRes.wxxjdgcsl || 0
				  	}
				  	if(ydgmRes.status_code == 200) {
				  		this.ydgmData = ydgmRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.ydgmPage.totalRow = ydgmRes.data.total
				  		this.ydgmSum.ydgmgcsl = ydgmRes.ydgmgcsl || 0
				  	}
				  	this.loading = false   
				}).catch((error) => {
				  	console.log(error)
				  	this.loading = false
				})
			},
			async nextStep() {
				let params = {
					...this.baseInfo,
					...this.addressInfo,
					...this.contactInfo,
					hyml: this.baseInfo.hyml[this.baseInfo.hyml.length - 1],
					jd: this.addressInfo.lngAndLat.split(' ')[0],
					wd: this.addressInfo.lngAndLat.split(' ')[1],
				}	 
				if(this.$route.query.type == 2) {
					params.gkdx_id = this.form.gkdx_id
				}
				delete params.quyu
				delete params.lngAndLat
				let { status_code, message } = await api.addSbfcBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
					if(this.$route.query.type == 2) {
						this.$router.back()
					}else {
						this.$router.replace('/baseInfo')
					}
				}
			},
			async saveInfo() {
				let params = {
					gkdx_id: this.gkdx_id,
					...this.baseInfo
				}
				let { status_code, message } = await api.addTrqczBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
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
			            if(this.addressInfo.qyfw) {
			            	let qyfw = JSON.parse(this.addressInfo.qyfw)
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
					this.addressInfo.qyfw = JSON.stringify(e.currentLnglats)
				})
			},
			clearArea() {
				this.addressInfo.qyfw = ''
				this.map.clearOverLays()
			},
			cancelArea() {
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.addressInfo.qyfw = this.qyfw || this.form.qyfw || '';
				this.showAreaModel = false
			},
			saveArea() {
				this.qyfw = this.addressInfo.qyfw;
				this.form.qyfw = this.addressInfo.qyfw;
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.showAreaModel = false
			},
			handleChangeWxxjdPage(val) {
				this.wxxjdPage.pageIndex = val
				this.getWxxjdList()
			},
			handleChangeWxxjdPageSize(val) {
				this.wxxjdPage.pageSize = val
				this.getWxxjdList()
			},
			async getWxxjdList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.wxxjdPage.pageSize,
					page: this.wxxjdPage.pageIndex,
				}
				let res = await api.getWxxjdList(params)
				let { status_code, data } = res
				if(status_code == 200) {
					this.wxxjdData = data.data
					this.wxxjdPage.totalRow = data.total
					this.wxxjdSum.wxxjdgcsl = res.wxxjdgcsl
				}
			},
			async openWxxjdModel() {
				this.modeType = 1;
				this.showWxxjdModel = true
			},
			async editWxxjdModel(row) {
				this.wxxjdForm = {
					fbfxgcmc: row.fbfxgcmc,
					gclx: row.gclx,
					sgdw: row.sgdw,
					jldw: row.jldw,
					gcqdsj: row.gcqdsj ? new Date(row.gcqdsj) : '',
					yjjssj: row.yjjssj ? new Date(row.yjjssj) : '',
					dqjd: row.dqjd ? Number(row.dqjd) : 0,
				}
				this.id = row.id
				this.modeType = 2;
				this.showWxxjdModel = true
			},
			WxxjdModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.wxxjdForm = {
							fbfxgcmc: '',
							gclx: '',
							sgdw: '',
							jldw: '',
							gcqdsj: '',
							yjjssj: '',
							dqjd: 0
						}
						this.$refs.wxxjd.resetFields();
					})
				}
			},
			async removeWxxjd(row) {
				let { status_code } = await api.deleteWxxjdInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getWxxjdList()
			},
			async saveWxxjd() {
				this.$refs.wxxjd.validate(async valid => {
                    if (valid) {
                    	this.wxxjdLoading = true
						let params = {
							...this.wxxjdForm,
							gcqdsj: this.wxxjdForm.gcqdsj ? getDate(new Date(this.wxxjdForm.gcqdsj).getTime(), 'date') : '',
							yjjssj: this.wxxjdForm.yjjssj ? getDate(new Date(this.wxxjdForm.yjjssj).getTime(), 'date') : '',
							gkdx_id: this.gkdx_id
						}
						if(this.modeType == 2) {
							params.id = this.id
						}
						let { status_code, message } = await api.addWxxjdInfo(params);
						if(status_code == 200) {
							this.$Message.success(message)
							this.showWxxjdModel = false
							this.getWxxjdList()
						}
						this.wxxjdLoading = false
                    }
                })
			},

			handleChangeYdgmPage(val) {
				this.ydgmPage.pageIndex = val
				this.getYdgmList()
			},
			handleChangeYdgmPageSize(val) {
				this.ydgmPage.pageSize = val
				this.getYdgmList()
			},
			async getYdgmList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.ydgmPage.pageSize,
					page: this.ydgmPage.pageIndex,
				}
				let res = await api.getYdgmList(params)
				let { status_code, data } = res
				if(status_code == 200) {
					this.ydgmData = data.data
					this.ydgmPage.totalRow = data.total
					this.ydgmSum.ydgmgcsl = res.ydgmgcsl
				}
			},
			async openYdgmModel() {
				this.modeType = 1;
				this.showYdgmModel = true
			},
			async editYdgmModel(row) {
				this.ydgmForm = {
					fbfxgcmc: row.fbfxgcmc,
					gclx: row.gclx,
					sgdw: row.sgdw,
					jldw: row.jldw,
					gcqdsj: row.gcqdsj ? new Date(row.gcqdsj) : '',
					yjjssj: row.yjjssj ? new Date(row.yjjssj) : '',
					dqjd: row.dqjd ? Number(row.dqjd) : 0,
				}
				this.id = row.id
				this.modeType = 2;
				this.showYdgmModel = true
			},
			ydgmModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.ydgmForm = {
							fbfxgcmc: '',
							gclx: '',
							sgdw: '',
							jldw: '',
							gcqdsj: '',
							yjjssj: '',
							dqjd: 0
						}
						this.$refs.ydgm.resetFields();
					})
				}
			},
			async removeYdgm(row) {
				let { status_code } = await api.deleteYdgmInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getYdgmList()
			},
			async saveYdgm() {
				this.$refs.ydgm.validate(async valid => {
                    if (valid) {
                    	this.ydgmLoading = true
						let params = {
							...this.ydgmForm,
							gcqdsj: this.ydgmForm.gcqdsj ? getDate(new Date(this.ydgmForm.gcqdsj).getTime(), 'date') : '',
							yjjssj: this.ydgmForm.yjjssj ? getDate(new Date(this.ydgmForm.yjjssj).getTime(), 'date') : '',
							gkdx_id: this.gkdx_id
						}
						if(this.modeType == 2) {
							params.id = this.id
						}
						let { status_code, message } = await api.addYdgmInfo(params);
						if(status_code == 200) {
							this.$Message.success(message)
							this.showYdgmModel = false
							this.getYdgmList()
						}
							this.ydgmLoading = false
                    }
                })
			},
		},
		created() {
			this.getBaseInfo()
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