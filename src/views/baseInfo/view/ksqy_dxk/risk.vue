<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div v-show="step == 2">
			<Row type="flex" justify="center">
				<Col span="22">
					<div class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="开采规模" name="name1">
						    <part-title text="开采规模" ref="xxx" :btns="['add']" @add="openKcgmdxkModel"></part-title>
							<Form :disabled="isDisEditInfo" :model="baseInfo" ref="baseInfo1" :rules="baseInfoRules" hide-required-mark label-position="left" :label-width="140" style="width: 600px">
						        <FormItem label="设计开采深度（米）" prop="sjkcsd">
						        	<InputNumber :min="0" v-model="baseInfo.sjkcsd"></InputNumber>
						        </FormItem>
						    </Form>
							<Table :columns="kcgmdxkColumns" :data="kcgmdxkData">
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editKcgmdxkModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeKcgmdxk(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="kcgmdxkPage.pageSize"
				                    :total="kcgmdxkPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeKcgmdxkPage"
				                    @on-page-size-change="handleChangeKcgmdxkPageSize"
				                />
							</Row>
							<Row v-show="!isDisEditInfo" type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo1">完成</Button>
								</Col>
							</Row>
				        </TabPane>
				        <TabPane label="作业情况" name="name2">
				        	<Form :disabled="isDisEditInfo" :model="baseInfo" ref="baseInfo2" :rules="baseInfoRules" hide-required-mark label-position="left" :label-width="140" style="width: 600px">
						        <FormItem label="开拓方式" prop="ktfs">
						        	<Select clearable v-model="baseInfo.ktfs" placeholder="开拓方式">
						                <Option v-for="item in ktfsList" :key="item" :value="item">{{item}}</Option>
						            </Select>
						        </FormItem>
						        <FormItem label="爆破作业" prop="bpzy">
						        	<Select clearable v-model="baseInfo.bpzy" placeholder="爆破作业">
						                <Option v-for="item in bpzyList" :key="item" :value="item">{{item}}</Option>
						            </Select>
						        </FormItem>
						    </Form>
							<Row v-show="!isDisEditInfo" type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo2">完成</Button>
								</Col>
							</Row>
				        </TabPane>
				        <TabPane label="矿山条件" name="name3">
				        	<Form :disabled="isDisEditInfo" :model="baseInfo" ref="baseInfo3" :rules="baseInfoRules" hide-required-mark label-position="left" :label-width="140" style="width: 600px">
						        <FormItem label="水文条件" prop="swtj">
						        	<Input clearable v-model="baseInfo.swtj" type="textarea" placeholder="水文条件"></Input>
						        </FormItem>
						        <FormItem label="地质条件" prop="dztj">
						        	<Input clearable v-model="baseInfo.dztj" type="textarea" placeholder="地质条件"></Input>
						        </FormItem>
						    </Form>
						    <Row v-show="!isDisEditInfo" type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo3">完成</Button>
								</Col>
							</Row>
						</TabPane>
				    </Tabs>
				</Col>	
			</Row>	
		</div>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}开采规模信息`" v-model="showKcgmdxkModel" @on-visible-change="kcgmdxkModelChange">
			<div>
				<Form :model="kcgmdxkForm" ref="kcgmdxk" :rules="kcgmdxkRules" hide-required-mark label-position="left" :label-width="210">
					<FormItem label="采空区总规模（万立方）" prop="ckqzgm">
			        	<InputNumber :min="0" v-model="kcgmdxkForm.ckqzgm"></InputNumber>
			        </FormItem>
			        <FormItem label="单个最大采空区规模（万立方）" prop="dgzdckqgm">
			        	<InputNumber :min="0" v-model="kcgmdxkForm.dgzdckqgm"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间" prop="tbsj">
			            <DatePicker type="date" v-model="kcgmdxkForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showKcgmdxkModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="kcgmdxkLoading" @click="saveKcgmdxk">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}仓库信息`" v-model="showCkyhbzModel" @on-visible-change="ckyhbzscModelChange">
			<div>
				<Form :model="ckyhbzscForm" label-position="left" :label-width="120">
					<FormItem label="仓库名称">
			        	<Input clearable v-model="ckyhbzscForm.ckmc"></Input>
			        </FormItem>
			        <FormItem label="占地面积（㎡）">
			        	<InputNumber :min="0" v-model="ckyhbzscForm.zdmj"></InputNumber>
			        </FormItem>
			        <FormItem label="危险等级">
			        	<Select clearable v-model="ckyhbzscForm.wxdj" placeholder="请选择">
			                <Option v-for="item in wxdjList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="重大危险源">
			        	<Select clearable v-model="ckyhbzscForm.zdwxy" placeholder="请选择">
			                <Option v-for="item in zdwxyList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="核定药量(吨)">
			        	<InputNumber :min="0" v-model="ckyhbzscForm.hdyl"></InputNumber>
			        </FormItem>
			        <FormItem label="最大储存药量(吨)">
			        	<InputNumber :min="0" v-model="ckyhbzscForm.zdccyl"></InputNumber>
			        </FormItem>
			        <FormItem label="当前药量(吨)">
			        	<InputNumber :min="0" v-model="ckyhbzscForm.dqyl"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间">
			            <DatePicker type="date" v-model="ckyhbzscForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="经纬度">
			        	<lng :lngAndLat.sync="ckyhbzscForm.lngAndLat" id="lng_box_ckyhbzsc"></lng>
			        </FormItem>
			        <FormItem label="区域范围">
			        	<qyfw :qyfw.sync="ckyhbzscForm.dtfw" id="area_box_ckyhbzsc"></qyfw>
			        </FormItem>
				</Form>
				<div>
					<part-title text="储存产品" :btns="['add']" @add="openSjcccpModel"></part-title>
					<Table :columns="sjcccpColumns" :data="sjcccpData">
						<template slot-scope="{ row }" slot="dqsl">
							<span>{{row.dqsl}}{{row.dqsldw}}</span>
						</template>
						<template slot-scope="{ row, index }" slot="action">
				            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editSjcccpModel(row, index)">编辑</Button>
				            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeSjcccp(index)">
						        <Button type="error" size="small" ghost>删除</Button>
						    </Poptip>
				        </template>
					</Table>
				</div>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showKcgmdxkModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveCkyhbz">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}储存产品`" v-model="showSjcccpModel" @on-visible-change="sjcccpModelChange">
			<div>
				<Form :model="sjcccpForm" label-position="left" :label-width="120">
					<FormItem label="产品类别">
			        	<Select clearable v-model="sjcccpForm.cplb" placeholder="请选择">
			                <Option v-for="item in cplbList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="产品分级">
			        	<Select clearable v-model="sjcccpForm.cpfj" placeholder="请选择">
			                <Option v-for="item in cpfjList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="当前数量">
			        	<Row type="flex" align="middle">
	            			<Col>
	            				<InputNumber :min="0" v-model="sjcccpForm.dqsl"></InputNumber>
	            			</Col>
	            			<Col>
	            				<Select clearable v-model="sjcccpForm.dqsldw" placeholder="单位">
					                <Option v-for="item in dqsldwList" :key="item" :value="item">{{item}}</Option>
					            </Select>
	            			</Col>
	            		</Row>
			        </FormItem>
			        <FormItem label="含药量(吨)">
			        	<InputNumber :min="0" v-model="sjcccpForm.hyl"></InputNumber>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showKcgmdxkModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveSjcccp">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}周边环境`" v-model="showRimModel"  @on-visible-change="rimModelChange">
			<div>
				<Form :model="rimForm" label-position="left" :label-width="120">
					<FormItem label="敏感目标名称">
			        	<Input clearable v-model="rimForm.mgmbmc"></Input>
			        </FormItem>
			        <FormItem label="方位">
			        	<Select clearable v-model="rimForm.fw" placeholder="请选择">
			                <Option v-for="item in fwList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="敏感目标类型">
			            <Select clearable v-model="rimForm.mgmblx" placeholder="请选择">
			                <Option v-for="item in mgmblxList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="敏感目标距离(m)">
			        	<InputNumber :min="0" v-model="rimForm.mgmbjl"></InputNumber>
			        </FormItem>	
			        <FormItem label="人员数量">
			        	<InputNumber :min="0" v-model="rimForm.rysl"></InputNumber>
			        </FormItem>
			        <FormItem label="经纬度">
			        	<lng :lngAndLat.sync="rimForm.lngAndLat"></lng>
			        	<!-- <div @click="openLngModal">
		        			<Input 
		        				readonly 
		        				v-model="rimForm.lngAndLat" 
		        				icon="md-pin" 
		        				placeholder="经纬度" />
		        		</div> -->
			        </FormItem>
			        <FormItem label="区域范围">
			        	<qyfw :qyfw.sync="rimForm.qyfw"></qyfw>
			        	<!-- <div @click.stop="openAreaModal">
		        			<Input 
		        				readonly 
		        				v-model="rimForm.qyfw" 
		        				icon="md-pin" 
		        				placeholder="区域范围" />
		        		</div> -->
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showKcgmdxkModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveRim">保存</Button>
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
				sjcccpId: '',
				ckyhbzsc_id: '',	
				ccss_id: '',
				loading: true,
				step: 2,	
				showAreaModel: false,
				showLngModel: false,
				showKcgmdxkModel: false,
				showKcgmdxkRiskModel: false,
				showCkyhbzModel: false,
				showCcssModel: false,
				showSjcccpModel: false,
				showGqscModel: false,
				showMainRiskModel: false,
				showRimModel: false,
				kcgmdxkLoading: false,
				modeType: '',
				modeType2: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					qymc: '企业名称',
					tyshxydm: '',
					zcdz: '',
					zgrs: 0,
					glrysl: 0,
					hyml: [],
					hydm: '',
					aqscxkz: '',
					ksjk: '',
					yxzt: '',
					jbr: '',
					jbrdh: '',
					jbryx: '',
					qyfzr: '',
					qyfzrdh: '',
					fgaqfzr: '',
					fgaqfzrdh: '',
					ksdz: '',
					lngAndLat: '',
					kqfw: '',
					jyfw: '',
					kcsj: '',
					kckz: '',
					sjkcsd: 0,
					ktfs: '',
					bpzy: '',
					swtj: '',
					dztj: ''
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
				ktfsList: ['平硐开拓', '斜井开拓', '立井开拓', '混合开拓'],
				bpzyList: ['无爆破', '浅眼爆破', '中深孔爆破', '深孔爆破', '硐室爆破', '多排孔微差爆破', '多排孔微差挤压爆破', '药壶爆破', '外敷爆破', '逐孔起爆'],
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
				kcgmdxkColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.kcgmdxkPage.pageIndex- 1) * this.kcgmdxkPage.pageSize + 1);
				        }
                    }, {
                        title: '采空区总规模（万立方）',
                        key: 'ckqzgm',
                        minWidth: 200
                    }, {
                        title: '单个最大采空区规模（万立方）',
                        key: 'dgzdckqgm',
                        minWidth: 240
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
				kcgmdxkData: [],
				kcgmdxkForm: {
					ckqzgm: 0,
					dgzdckqgm: 0,
					tbsj: ''
				},
				cplbList: ['喷花类', '旋转类', '升空类', '旋转升空类', '吐珠类', '线香类', '烟雾类', '造型玩具类', '摩擦类', '小礼花类', '礼花弹类', '架子烟花类'],
				cpfjList: ['A', 'B', 'C', 'D'],
				scgmdwList: ['箱/年', '吨/年'],
				syyldwList: ['吨/年'],
				kcgmdxkPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				hzwxxdjList: ['甲', '乙', '丙', '丁', '戊'],
				hxpztList: ['气体', '液化气体', '液体', '固体'],
				nzzldwList: ['吨', '立方', 'KG', 'L'],
				ckyhbzscColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.ckyhbzscPage.pageIndex- 1) * this.ckyhbzscPage.pageSize + 1);
				        }
                    }, {
                        title: '仓库名称',
                        key: 'ckmc',
                    }, {
                        title: '占地面积（㎡）',
                        key: 'zdmj',
                    }, {
                        title: '危险等级',
                        key: 'wxdj',
                    }, {
                        title: '核定药量（吨）',
                        key: 'hdyl',
                    }, {
                        title: '最大储存药量（吨）',
                        key: 'zdccyl',
                    }, {
                        title: '当前药量',
                        key: 'dqyl',
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
				ckyhbzscData: [],
				ckyhbzscForm: {
					ckmc: '',
					zdmj: 0,
					wxdj: '',
					hdyl: 0,
					zdccyl: 0,
					dqyl: 0,
					zdwxy: '',
					tbsj: '',
					lngAndLat: '',
					dtfw: '',
				},
				ccssList: ['有', '无'],
				zzyxylList: ['Mpa', 'Kpa'],
				zdwxyList: ['否', '一级', '二级', '三级', '四级'],
				kcgmdxkList: [],
				fclxList: [],
				ckyhbzscPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				ckyhbzscNum: {
					gysl: 0,
					zyzrs: 0
				},
				ccssColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.ccssPage.pageIndex- 1) * this.ccssPage.pageSize + 1);
				        }
                    }, {
                        title: '储存设施单元名称',
                        key: 'ccssdymc',
                    }, {
                        title: '类型',
                        key: 'lx',
                    }, {
                        title: '重大危险源',
                        key: 'zdwxy',
                    }, {
                        title: '危险化学品',
                        slot: 'wxhxp',
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
				ccssData: [],
				ccssForm: {
					ccssdymc: '',
					lx: '',
					ccwd: 0,
					zdwxy: '',
					tysj: '',
					lngAndLat: '',
					dtfw: '',
					dqzt: ''
				},
				wxdjList: ['10﹣²', '1.1﹣²', '1.3'],
				ccssPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				sjcccpColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.sjcccpPage.pageIndex- 1) * this.sjcccpPage.pageSize + 1);
				        }
                    }, {
                        title: '产品类别',
                        key: 'cplb',
                    }, {
                        title: '产品分级',
                        key: 'cpfj',
                    }, {
                        title: '当前数量',
                        slot: 'dqsl',
                    }, {
                        title: '含药量（吨）',
                        key: 'hyl',
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				sjcccpData: [],
				sjcccpForm: {
					cplb: '',
					cpfj: '',
					dqsl: 0,
					dqsldw: '',
					hyl: 0
				},
				dqsldwList: ['箱', '吨'],
				sjcccpPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				sjcccpNum: {
					zsl: 0,
					yxsl: 0
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
			baseInfoRules() {
				return {
					sjkcsd: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					ktfs: [{ required: true, message: '请选择', trigger: 'change' }],
					bpzy: [{ required: true, message: '请选择', trigger: 'change' }],
					swtj: [{ required: true, message: '请输入', trigger: 'change' }],
					dztj: [{ required: true, message: '请输入', trigger: 'change' }],
				}
			},
			kcgmdxkRules() {
				return {
					ckqzgm: [{ required: true, type: 'number', message: '请选择', trigger: 'change' }],
					dgzdckqgm: [{ required: true, type: 'number', message: '请选择', trigger: 'change' }],
					tbsj: [{ required: true, type: 'date', message: '请选择', trigger: 'change' }],
				}
			},
		},
		methods: {
			async getBaseInfo() {
				this.loading = true
				let { status_code, data, message } = await api.getKsqydxkBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					this.baseInfo = {
						sjkcsd: data.sjkcsd ? Number(data.sjkcsd) : 0,
						ktfs: data.ktfs || '',
						bpzy: data.bpzy || '',
						swtj: data.swtj || '',
						dztj: data.dztj || '',
					}
				}
				let kcgmdxkParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.kcgmdxkPage.pageSize,
					page: this.kcgmdxkPage.pageIndex,
				}
				api.getKcgmdxkList(kcgmdxkParams).then((result) => {
				  	let kcgmdxkRes = result
				  	if(kcgmdxkRes.status_code == 200) {
				  		this.kcgmdxkData = kcgmdxkRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.kcgmdxkPage.totalRow = kcgmdxkRes.data.total
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
				let { status_code, message } = await api.addKsqydxkBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
					if(this.$route.query.type == 2) {
						this.$router.back()
					}else {
						this.$router.replace('/baseInfo')
					}
				}
			},
			async saveInfo1() {
				this.$refs.baseInfo1.validate(async valid => {
                    if (valid) {
						let params = {
							sjkcsd: this.baseInfo.sjkcsd,
							gkdx_id: this.form.gkdx_id
						}
						let { status_code, message } = await api.addKsqydxkBase(params);
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
							ktfs: this.baseInfo.ktfs,
							bpzy: this.baseInfo.bpzy,
							gkdx_id: this.form.gkdx_id
						}
						let { status_code, message } = await api.addKsqydxkBase(params);
						if(status_code == 200) {
							this.$Message.success('保存成功')
						}
                    }
                })
			},
			async saveInfo3() {
				this.$refs.baseInfo3.validate(async valid => {
                    if (valid) {
						let params = {
							swtj: this.baseInfo.swtj,
							dztj: this.baseInfo.dztj,
							gkdx_id: this.form.gkdx_id
						}
						let { status_code, message } = await api.addKsqydxkBase(params);
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
			async getKcgmdxkList_() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: 1000,
					page: this.kcgmdxkPage.pageIndex,
				}
				let { status_code, data } = await api.getKcgmdxkList(params)
				if(status_code == 200) {
					this.kcgmdxkList = data.data
				}
			},
			handleChangeKcgmdxkPage(val) {
				this.kcgmdxkPage.pageIndex = val
				this.getKcgmdxkList()
			},
			handleChangeKcgmdxkPageSize(val) {
				this.kcgmdxkPage.pageSize = val
				this.getKcgmdxkList()
			},
			async getKcgmdxkList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.kcgmdxkPage.pageSize,
					page: this.kcgmdxkPage.pageIndex,
				}
				let { status_code, data } = await api.getKcgmdxkList(params)
				if(status_code == 200) {
					this.kcgmdxkData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.kcgmdxkPage.totalRow = data.total
				}
			},
			openKcgmdxkModel() {
				this.modeType = 1;
				this.showKcgmdxkModel = true
			},
			editKcgmdxkModel(row) {
				this.kcgmdxkForm = {
					ckqzgm: row.ckqzgm ? Number(row.ckqzgm) : 0,
					dgzdckqgm: row.dgzdckqgm ? Number(row.dgzdckqgm) : 0,
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.id = row.id
				this.modeType = 2;
				this.showKcgmdxkModel = true
			},
			kcgmdxkModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.kcgmdxkForm = {
							ckqzgm: 0,
							dgzdckqgm: 0,
							tbsj: ''
						}
						this.$refs.kcgmdxk.resetFields();
					})
				}
			},
			async removeKcgmdxk(row) {
				let { status_code } = await api.deleteKcgmdxkInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getKcgmdxkList()
			},
			async saveKcgmdxk() {
				this.$refs.kcgmdxk.validate(async valid => {
                    if (valid) {
                    	this.kcgmdxkLoading = true
						let params = {
							...this.kcgmdxkForm,
							tbsj: this.kcgmdxkForm.tbsj ? getDate(new Date(this.kcgmdxkForm.tbsj).getTime(), 'date') : '',
							gkdx_id: this.gkdx_id
						}
						if(this.modeType == 2) {
							params.id = this.id
						}
						let { status_code, message } = await api.addKcgmdxkInfo(params);
						if(status_code == 200) {
							this.$Message.success(message)
							this.showKcgmdxkModel = false
							this.kcgmdxkLoading = false
							this.getKcgmdxkList()
						}
                    }
                })
			},
			handleChangeCkyhbzPage(val) {
				this.ckyhbzscPage.pageIndex = val
				this.getCkyhbzList()
			},
			handleChangeCkyhbzPageSize(val) {
				this.ckyhbzscPage.pageSize = val
				this.getCkyhbzList()
			},
			async getCkyhbzList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.ckyhbzscPage.pageSize,
					page: this.ckyhbzscPage.pageIndex,
				}
				let { status_code, data } = await api.getCkyhbzList(params)
				if(status_code == 200) {
					this.ckyhbzscData = data.data
					this.ckyhbzscPage.totalRow = data.total
				}
			},
			async openCkyhbzModel() {
				if(this.fclxList.length == 0) {
					let { status_code, data } = await api.getFclxList()
					if(status_code == 200) {
						this.fclxList = []
						for(let key in data) {
							let item = {
								value: key,
			                    label: key,
							}
							item.children = data[key].map(item_ => {
								return {
									value: item_,
			                    	label: item_,
								}
							})
							this.fclxList.push(item)
						}
						// this.fclxList
					}
				}
				this.modeType = 1;
				this.showCkyhbzModel = true
			},
			async editCkyhbzModel(row) {
				this.ckyhbzscForm = {
					ckmc: row.ckmc,
					zdmj: row.zdmj ? Number(row.zdmj) : 0,
					wxdj: row.wxdj,
					hdyl: row.hdyl ? Number(row.hdyl) : 0,
					zdccyl: row.zdccyl ? Number(row.zdccyl) : 0,
					dqyl: row.dqyl ? Number(row.dqyl) : 0,
					zdwxy: row.zdwxy,
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
					lngAndLat: row.jd && row.wd ? `${(row.jd - 0).toFixed(2)} ${(row.wd - 0).toFixed(2)}` : '',
					dtfw: row.dtfw,
				}
				this.id = row.id
				this.ckyhbzsc_id = row.id
				this.sjcccpData = row.cccp ? JSON.parse(row.cccp) : []
				this.modeType = 2;
				this.showCkyhbzModel = true
			},
			ckyhbzscModelChange(status) {
				if(!status) {
					this.ckyhbzscForm = {
						ckmc: '',
						zdmj: 0,
						wxdj: '',
						hdyl: 0,
						zdccyl: 0,
						dqyl: 0,
						zdwxy: '',
						tbsj: '',
						lngAndLat: '',
						dtfw: '',
						dqzt: ''
					}
					this.sjcccpData = []
				}
			},
			async removeCkyhbz(row) {
				let { status_code } = await api.deleteCkyhbzInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getCkyhbzList()
			},
			async saveCkyhbz() {
				let params = {
					...this.ckyhbzscForm,
					tbsj: this.ckyhbzscForm.tbsj ? getDate(new Date(this.ckyhbzscForm.tbsj).getTime(), 'date') : '',
					cccp: this.sjcccpData.length > 0 ? JSON.stringify(this.sjcccpData) : '',
					jd: this.ckyhbzscForm.lngAndLat.split(' ')[0],
					wd: this.ckyhbzscForm.lngAndLat.split(' ')[1],
					gkdx_id: this.gkdx_id
				}
				delete params.isWxgy
				delete params.lngAndLat
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addCkyhbzInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showCkyhbzModel = false
					this.getCkyhbzList()
				}
			},
			handleChangeCcssPage(val) {
				this.ccssPage.pageIndex = val
				this.getCcssList()
			},
			handleChangeCcssPageSize(val) {
				this.ccssPage.pageSize = val
				this.getCcssList()
			},
			async getCcssList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.ccssPage.pageSize,
					page: this.ccssPage.pageIndex,
				}
				let { status_code, data } = await api.getCcssList(params)
				if(status_code == 200) {
					this.ccssData = data.data
					this.ccssPage.totalRow = data.total
				}
			},
			async openCcssModel() {
				if(this.fclxList.length == 0) {
					let { status_code, data } = await api.getFclxList()
					if(status_code == 200) {
						this.fclxList = []
						for(let key in data) {
							let item = {
								value: key,
			                    label: key,
							}
							item.children = data[key].map(item_ => {
								return {
									value: item_,
			                    	label: item_,
								}
							})
							this.fclxList.push(item)
						}
						// this.fclxList
					}
				}
				this.modeType = 1;
				this.showCcssModel = true
			},
			async editCcssModel(row) {
				this.ccssForm = {
					ccssdymc: row.ccssdymc,
					lx: row.lx,
					ccwd: row.ccwd ? Number(row.ccwd) : 0,
					zdwxy: row.zdwxy,
					tysj: row.tysj ? new Date(row.tysj) : '',
					lngAndLat: row.jd && row.wd ? `${(row.jd - 0).toFixed(2)} ${(row.wd - 0).toFixed(2)}` : '',
					dtfw: row.dtfw,
					dqzt: row.dqzt
				}
				this.id = row.id
				this.ccss_id = row.id
				this.sjcccpData = row.wxhxp ? JSON.parse(row.wxhxp) : []
				this.modeType = 2;
				this.showCcssModel = true
				this.getGqscList();
			},
			ccssModelChange(status) {
				if(!status) {
					this.ccssForm = {
						ccssdymc: '',
						lx: '',
						ccwd: 0,
						zdwxy: '',
						tysj: '',
						lngAndLat: '',
						dtfw: '',
						dqzt: ''
					}
					this.sjcccpData = []
				}
			},
			async removeCcss(row) {
				let { status_code } = await api.deleteCcssInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getCcssList()
			},
			async saveCcss() {
				let params = {
					...this.ccssForm,
					tysj: this.ccssForm.tysj ? getDate(new Date(this.ccssForm.tysj).getTime(), 'date') : '',
					wxhxp: this.sjcccpData.length > 0 ? JSON.stringify(this.sjcccpData) : '',
					jd: this.ccssForm.lngAndLat.split(' ')[0],
					wd: this.ccssForm.lngAndLat.split(' ')[1],
					gkdx_id: this.gkdx_id
				}
				delete params.isWxgy
				delete params.lngAndLat
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addCcssInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showCcssModel = false
					this.getCcssList()
				}
			},
			openSjcccpModel() {
				this.getKcgmdxkList_()
				this.modeType2 = 1;
				this.showSjcccpModel = true
			},
			editSjcccpModel(row, index) {
				this.getKcgmdxkList_()
				this.sjcccpForm = {
					cplb: row.cplb,
					cpfj: row.cpfj,
					dqsl: row.dqsl ? Number(row.dqsl) : 0,
					dqsldw: row.dqsldw,
					hyl: row.hyl ? Number(row.hyl) : 0,
				}
				this.sjcccpId = index
				this.modeType2 = 2;
				this.showSjcccpModel = true
			},
			sjcccpModelChange(status) {
				if(!status) {
					this.sjcccpForm = {
						cplb: '',
						cpfj: '',
						dqsl: 0,
						dqsldw: '',
						hyl: 0
					}
				}
			},
			async saveSjcccp() {
				if(this.modeType2 == 2) {
					this.sjcccpData.splice(this.sjcccpId, 1, this.sjcccpForm)
				}else {
					this.sjcccpData.push(this.sjcccpForm)
				}
				this.showSjcccpModel = false
			},
			removeSjcccp(index) {
				this.sjcccpData.splice(index, 1)
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
					this.rimForm = {
						mgmbmc: '',
						mgmblx: '',
						fw: '',
						mgmbjl: 0,
						rysl: 0,
						lngAndLat: '',
						ckfw: ''
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
			},
		},
		created() {
			this.getBaseInfo()
      if(this.isDisEditInfo) {
        this.kcgmdxkColumns.pop()
        this.sjcccpColumns.pop()
      }
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