<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div v-show="step == 2">
			<Row type="flex" justify="center">
				<Col span="22">
					<div class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="储存信息" name="name1">
				        	<part-title text="储罐" :btns="['add']" @add="openCgModel"></part-title>
				        	<div style="margin-bottom: 16px;">
				        		<span>汽油罐数量：{{cgSum.qygsl}}</span>
				        		<span style="margin-left:24px">总容积：{{cgSum.qygzrj}}</span>
				        	</div>
				        	<div style="margin-bottom: 16px;">
				        		<span>柴油罐数量：{{cgSum.cygsl}}</span>
				        		<span style="margin-left:24px">总容积：{{cgSum.cygzrj}}</span>
				        	</div>
							<Table :columns="cgColumns" :data="cgData">
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editCgModel(row)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeCg(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="cgPage.pageSize"
				                    :total="cgPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeCgPage"
				                    @on-page-size-change="handleChangeCgPageSize"
				                />
							</Row>
				        	<part-title text="加油量" :btns="['add']" @add="openJylModel"></part-title>
								<Table :columns="jylColumns" :data="jylData">
									<template slot-scope="{ row }" slot="jyl">
										<span>{{`汽油：${row.jwrpjjyl_qy}  柴油：${row.jwrpjjyl_cy}`}}</span>
									</template>
									<template slot-scope="{ row }" slot="action">
							            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editJylModel(row)">编辑</Button>
							            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeJyl(row)">
									        <Button type="error" size="small" ghost>删除</Button>
									    </Poptip>
							        </template>
								</Table>
								<Row type="flex" justify="end">
									<Page
					                    size="small"
					                    style="margin-top: 10px"
					                    :page-size="jylPage.pageSize"
					                    :total="jylPage.totalRow"
					                    show-elevator
					                    show-total
					                    show-sizer
					                    @on-change="handleChangeJylPage"
					                    @on-page-size-change="handleChangeJylPageSize"
					                />
								</Row>
				        </TabPane>
				        <TabPane label="重大危险源" name="name2">
				        	<Form :model="baseInfo" ref="baseInfo" :rules="baseInfoRules" hide-required-mark  label-position="left" :label-width="140" style="width: 600px">
					        	<FormItem label="重大危险源" prop="zdwxy">
						        	<Select clearable v-model="baseInfo.zdwxy" placeholder="请选择">
						                <Option v-for="item in zdwxyList" :key="item" :value="item">{{item}}</Option>
						            </Select>
						        </FormItem>
						    </Form>
							<Row type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo">完成</Button>
								</Col>
							</Row>
				        </TabPane>
				        <TabPane label="周边环境" name="name3">
				        	<part-title text="周边环境" :btns="['add']" @add="openRimModel"></part-title>
				        	<div style="margin-bottom: 16px;">说明：调查周边200m范围</div>
							<Table :columns="rimColumns" :data="rimData">
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editRimModel(row)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeRim(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="rimPage.pageSize"
				                    :total="rimPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeRimPage"
				                    @on-page-size-change="handleChangeRimPageSize"
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
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}储罐信息`" v-model="showCgModel" @on-visible-change="cgModelChange">
			<div>
				<Form :model="cgForm" ref="cg" :rules="cgRules" hide-required-mark label-position="left" :label-width="160">
					<FormItem label="储罐名称" prop="cgmc">
			        	<Input clearable v-model="cgForm.cgmc"></Input>
			        </FormItem>
					<FormItem label="介质" prop="jz">
						<Select clearable v-model="cgForm.jz" placeholder="请选择">
			                <Option v-for="item in jzList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="容积(m³)" prop="rj">
			        	<InputNumber :min="0" v-model="cgForm.rj"></InputNumber>
			        </FormItem>
			        <FormItem label="数量" prop="sl">
			        	<InputNumber :min="0" v-model="cgForm.sl"></InputNumber>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="cgLoading" @click="saveCg">保存</Button>
	        </div>
		</Modal>

		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}加油量`" v-model="showJylModel" @on-visible-change="jylModelChange">
			<div>
				<Form :model="jylForm" ref="jyl" :rules="jylRules" hide-required-mark label-position="left" :label-width="150">
					<FormItem label="近5日平均加油量(m³)">
						<Row type="flex" align="middle">
							<Col>
	            				汽油：
	            			</Col>
	            			<Col style="margin-right: 20px">
	            				<FormItem prop="jwrpjjyl_qy">
	            					<InputNumber :min="0" v-model="jylForm.jwrpjjyl_qy"></InputNumber>
	            				</FormItem>
	            			</Col>
	            			<Col>
	            				柴油：
	            			</Col>
	            			<Col>
	            				<FormItem prop="jwrpjjyl_cy">
	            					<InputNumber :min="0" v-model="jylForm.jwrpjjyl_cy"></InputNumber>
	            				</FormItem>
	            			</Col>
	            		</Row>
	            	</FormItem>
			        <FormItem label="填报时间" prop="tbsj">
			            <DatePicker type="date" v-model="jylForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="jylLoading" @click="saveJyl">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}周边环境`" v-model="showRimModel"  @on-visible-change="rimModelChange">
			<div>
				<Form :model="rimForm" ref="rim" :rules="rimRules" hide-required-mark label-position="left" :label-width="140">
					<FormItem label="敏感目标名称" prop="mgmbmc">
			        	<Input clearable v-model="rimForm.mgmbmc"></Input>
			        </FormItem>
			        <FormItem label="方位" prop="fw">
			        	<Select clearable v-model="rimForm.fw" placeholder="请选择">
			                <Option v-for="item in fwList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="敏感目标类型" prop="mgmblx">
			            <Select clearable v-model="rimForm.mgmblx" placeholder="请选择">
			                <Option v-for="item in mgmblxList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="敏感目标距离(m)" prop="mgmbjl">
			        	<InputNumber :min="0" v-model="rimForm.mgmbjl"></InputNumber>
			        </FormItem>	
			        <FormItem label="人员数量" prop="rysl">
			        	<InputNumber :min="0" v-model="rimForm.rysl"></InputNumber>
			        </FormItem>
			        <FormItem label="经纬度" prop="lngAndLat">
			        	<lng :lngAndLat.sync="rimForm.lngAndLat"></lng>
			        </FormItem>
			        <FormItem label="区域范围" prop="qyfw">
			        	<qyfw :qyfw.sync="rimForm.qyfw"></qyfw>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="rimLoading" @click="saveRim">保存</Button>
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
				cg_id: '',	
				ccss_id: '',
				loading: true,
				step: 2,	
				showAreaModel: false,
				showLngModel: false,
				showWhModel: false,
				showWhRiskModel: false,
				showCgModel: false,
				showCcssModel: false,
				showZaqModel: false,
				showGqscModel: false,
				showJylModel: false,
				showRimModel: false,
				cgLoading: false,
				jylLoading: false,
				rimLoading: false,
				modeType: '',
				modeType2: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					zdwxy: '',
				},
				addressInfo: {
					scdz: '',
					lngAndLat: '',
					qyfw: '',
					zdmj: 0,
					jzmj: 0,
				},
				contactInfo: {
					jbr: '',
					jbrdh: '',
					jbryx: '',
					qyfzr: '',
					qyfzrdh: '',
					fgaqfzr: '',
					fgaqfzrdh: ''
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
				cgColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.cgPage.pageIndex- 1) * this.cgPage.pageSize + 1);
				        }
                    }, {
                        title: '储罐名称',
                        key: 'cgmc',
                        minWidth: 100
                    }, {
                        title: '介质',
                        key: 'jz',
                        minWidth: 100
                    }, {
                        title: '容积(m³)',
                        key: 'rj',
                        minWidth: 120
                    }, {
                        title: '数量',
                        key: 'sl',
                        minWidth: 80
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				cgData: [],
				cgForm: {
					cgmc: '',
					jz: '',
					rj: 0,
					sl: 0,
				},
				jzList: ['汽油', '柴油'],
				zdwxyList: ['否', '一级', '二级', '三级', '四级'],
				ksldzzList: [
					{
						value: 0,
						name: '无'
					}, {
						value: 1,
						name: '有'
					}
				],
				rarsList: ['采用', '不采用'],
				cgPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				cgNum: {
					gysl: 0,
					zyzrs: 0
				},
				jylColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.jylPage.pageIndex- 1) * this.jylPage.pageSize + 1);
				        }
                    }, {
                        title: '近5日平均加油量(m³)',
                        slot: 'jyl',
                        minWidth: 180
                    }, {
                        title: '填报时间',
                        key: 'tbsj',
                        minWidth: 100
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				jylData: [],
				jylForm: {
					jwrpjjyl_qy: 0,
					jwrpjjyl_cy: 0,
					tbsj: '',
				},
				csfbxList: ['封闭式', '半封闭式', '开放式（露天）'],
				ptfsList: ['高压喷涂', '静电喷涂', '中等压力喷涂', '浸涂、淋涂、滚涂', '其它'],
				zdhcdList: ['人工', '自动'],
				tlzlList: ['水性', '油性', '塑粉'],
				jylPage: {
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
				            return h('span',params.index + (this.rimPage.pageIndex- 1) * this.rimPage.pageSize + 1);
				        }
                    }, {
                        title: '敏感目标名称',
                        key: 'mgmbmc',
                         minWidth: 120
                    }, {
                        title: '方位',
                        key: 'fw',
                         minWidth: 80
                    }, {
                        title: '目标类型',
                        key: 'mgmblx',
                         minWidth: 100
                    }, {
                        title: '人员数量',
                        key: 'rysl',
                         minWidth: 100
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
				cgSum: {
					qygsl: '',
					qygzrj: '',
					cygsl: '',
					cygzrj: ''
				},
				form: {}
			}
		},
		watch: {

		},
		computed: {
			baseInfoRules() {
				return {
					zdwxy: [{ required: true, message: '请选择', trigger: 'change' }],
				}
			},
			cgRules() {
				return {
					cgmc: [{ required: true, message: '请输入', trigger: 'change' }],
					jz: [{ required: true, message: '请选择', trigger: 'change' }],
					rj: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					sl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
				}
			},
			jylRules() {
				return {
					jwrpjjyl_cy: [{ required: true, type: 'number', message: '请选择', trigger: 'change' }],
					jwrpjjyl_qy: [{ required: true, type: 'number', message: '请选择', trigger: 'change' }],
					tbsj: [{ required: true, type: 'date', message: '请选择', trigger: 'change' }],
				}
			},
			rimRules() {
				return {
					mgmbmc: [{ required: true, message: '请输入', trigger: 'change' }],
					// fw: [{ required: true, message: '请选择', trigger: 'change' }],
					// mgmblx: [{ required: true, message: '请选择', trigger: 'change' }],
     //            	lngAndLat: [{ required: true, message: '请选择', trigger: 'change' }],
     //            	qyfw: [{ required: true, message: '请选择', trigger: 'change' }],
					// mgmbjl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					// rysl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
				}
			},
		},
		methods: {
			async getBaseInfo() {
				this.loading = true
				let cgParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.cgPage.pageSize,
					page: this.cgPage.pageIndex,
				}
				let jylParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.jylPage.pageSize,
					page: this.jylPage.pageIndex,
				}
				let rimParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.rimPage.pageSize,
					page: this.rimPage.pageIndex,
				}
				Promise.all([api.getCgList(cgParams), api.getJylList(jylParams), api.getRimList(rimParams)]).then((result) => {
				  	let cgRes = result[0], jylRes = result[1], rimRes = result[2]
				  	if(cgRes.status_code == 200) {
				  		this.cgData = cgRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.cgPage.totalRow = cgRes.data.total
				  		this.cgSum = {
				  			qygsl: cgRes.qygsl || 0,
				  			qygzrj: cgRes.qygzrj || 0,
				  			cygsl: cgRes.cygsl || 0,
				  			cygzrj: cgRes.cygzrj || 0
				  		}
				  	}
				  	if(jylRes.status_code == 200) {
				  		this.jylData = jylRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.jylPage.totalRow = jylRes.data.total
				  	}
				  	if(rimRes.status_code == 200) {
				  		this.rimData = rimRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.rimPage.totalRow = rimRes.data.total
				  	}
				  	this.loading = false   
				}).catch((error) => {
				  	console.log(error)
				  	this.loading = false
				})
				let { status_code, data, message } = await api.getJyzBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					console.log(data)
					this.baseInfo = { zdwxy: data.zdwxy || ''}
				}
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
				this.$refs.baseInfo.validate(async valid => {
                    if (valid) {
                    	let params = {
							gkdx_id: this.gkdx_id,
							...this.baseInfo
						}
						let { status_code, message } = await api.addJyzBase(params);
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
			async getWhsbfcList_() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: 1000,
					page: this.whPage.pageIndex,
				}
				let { status_code, data } = await api.getWhsbfcList(params)
				if(status_code == 200) {
					this.whList = data.data
				}
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
					this.whData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
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
					nzzl: row.nzzl ? Number(row.nzzl) : 0,
					nzzldw: row.nzzldw,
					zdccl: row.zdccl ? Number(row.zdccl) : 0,
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
			handleChangeCgPage(val) {
				this.cgPage.pageIndex = val
				this.getCgList()
			},
			handleChangeCgPageSize(val) {
				this.cgPage.pageSize = val
				this.getCgList()
			},
			async getCgList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.cgPage.pageSize,
					page: this.cgPage.pageIndex,
				}
				let res = await api.getCgList(params)
				let { status_code, data } = res
				if(status_code == 200) {
					this.cgData = data.data
					this.cgPage.totalRow = data.total
					this.cgSum = {
			  			qygsl: res.qygsl || 0,
			  			qygzrj: res.qygzrj || 0,
			  			cygsl: res.cygsl || 0,
			  			cygzrj: res.cygzrj || 0
			  		}
				}
			},
			async openCgModel() {
				this.modeType = 1;
				this.showCgModel = true
			},
			async editCgModel(row) {
				this.cgForm = {
					cgmc: row.cgmc,
					jz: row.jz,
					rj: row.rj ? Number(row.rj) : 0,
					sl: row.sl ? Number(row.sl) : 0,
				}
				this.id = row.id
				this.modeType = 2;
				this.showCgModel = true
			},
			cgModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.cgForm = {
							cgmc: '',
							jz: '',
							rj: 0,
							sl: 0,
						}
						this.$refs.cg.resetFields();
					})
				}
			},
			async removeCg(row) {
				let { status_code } = await api.deleteCgInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getCgList()
			},
			async saveCg() {
				this.$refs.cg.validate(async valid => {
                    if (valid) {
                    	this.cgLoading = true
						let params = {
							...this.cgForm,
							tysj: this.cgForm.tysj ? getDate(new Date(this.cgForm.tysj).getTime(), 'date') : '',
							gkdx_id: this.gkdx_id
						}
						if(this.modeType == 2) {
							params.id = this.id
						}
						let { status_code, message } = await api.addCgInfo(params);
						if(status_code == 200) {
							this.$Message.success(message)
							this.showCgModel = false
							this.getCgList()
						}
							this.cgLoading = false
                    }
                })
			},
			handleChangeJylPage(val) {
				this.jylPage.pageIndex = val
				this.getJylList()
			},
			handleChangeJylPageSize(val) {
				this.jylPage.pageSize = val
				this.getJylList()
			},
			async getJylList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.jylPage.pageSize,
					page: this.jylPage.pageIndex,
				}
				let { status_code, data } = await api.getJylList(params)
				if(status_code == 200) {
					this.jylData = data.data
					this.jylPage.totalRow = data.total
				}
			},
			openJylModel() {
				this.modeType = 1;
				this.showJylModel = true
			},
			editJylModel(row) {
				this.jylForm = {
					jwrpjjyl_qy: row.jwrpjjyl_qy ? Number(row.jwrpjjyl_qy) : 0,
					jwrpjjyl_cy: row.jwrpjjyl_cy ? Number(row.jwrpjjyl_cy) : 0,
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.id = row.id
				this.modeType = 2;
				this.showJylModel = true
			},
			jylModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.jylForm = {
							jwrpjjyl_qy: 0,
							jwrpjjyl_cy: 0,
							tbsj: '',
						}
						this.$refs.jyl.resetFields();
					})
				}
			},
			async removeJyl(row) {
				let { status_code } = await api.deleteJylInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getJylList()
			},
			async saveJyl() {
				this.$refs.jyl.validate(async valid => {
                    if (valid) {
                    	this.jylLoading = true
						let params = {
							...this.jylForm,
							tbsj: this.jylForm.tbsj ? getDate(new Date(this.jylForm.tbsj).getTime(), 'year') : '',
							gkdx_id: this.gkdx_id
						}
						if(this.modeType == 2) {
							params.id = this.id
						}
						let { status_code, message } = await api.addJylInfo(params);
						if(status_code == 200) {
							this.$Message.success(message)
							this.showJylModel = false
							this.getJylList()
						}
							this.jylLoading = false
                    }
                })
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
					this.rimData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.rimPage.totalRow = data.total
				}
			},
			openRimModel() {
				this.modeType = 1;
				this.showRimModel = true
			},
			editRimModel(row) {
				this.rimForm = {
					mgmbmc: row.mgmbmc,
					mgmblx: row.mgmblx,
					fw: row.fw,
					mgmbjl: row.mgmbjl - 0,
					rysl: row.rysl,
					lngAndLat: row.jd && row.wd ? `${(row.jd - 0).toFixed(2)} ${(row.wd - 0).toFixed(2)}` : '',
					qyfw: row.qyfw,
				}
				this.id = row.id
				this.modeType = 2;
				this.showRimModel = true
			},
			rimModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.rimForm = {
							mgmbmc: '',
							mgmblx: '',
							fw: '',
							mgmbjl: 0,
							rysl: 0,
							lngAndLat: '',
							qyfw: ''
						}
						this.$refs.rim.resetFields();
					})
				}
			},
			async removeRim(row) {
				let { status_code } = await api.deleteRimInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getRimList()
			},
			async saveRim() {
				this.$refs.rim.validate(async valid => {
                    if (valid) {
                    	this.rimLoading = true
						let params = {
							...this.rimForm,
							jd: this.rimForm.lngAndLat.split(' ')[0],
							wd: this.rimForm.lngAndLat.split(' ')[1],
							gkdx_id: this.gkdx_id
						}
						delete params.lngAndLat
						if(this.modeType == 2) {
							params.id = this.id
						}
						let { status_code, message } = await api.addRimInfo(params);
						if(status_code == 200) {
							this.$Message.success(message)
							this.showRimModel = false
							this.getRimList()
						}
							this.rimLoading = false
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