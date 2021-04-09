<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div v-show="step == 2">
			<Row type="flex" justify="center">
				<Col span="22">
					<div v-show="!isDisEditInfo" class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="尾矿库规模" name="name1">
						    <part-title text="尾矿库规模" ref="xxx" :btns="['add']" @add="openWkkgmModel"></part-title>
							<Table :columns="wkkgmColumns" :data="wkkgmData">
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editWkkgmModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeWkkgm(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="wkkgmPage.pageSize"
				                    :total="wkkgmPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeWkkgmPage"
				                    @on-page-size-change="handleChangeWkkgmPageSize"
				                />
							</Row>
				        </TabPane>
				        <TabPane label="下游情况" name="name2">
							<part-title text="下游情况" :btns="['add']" @add="openXyqkwkkModel"></part-title>
							<div style="margin-bottom: 16px;">说明：统计下游5km</div>
							<Table :columns="xyqkwkkColumns" :data="xyqkwkkData">
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editXyqkwkkModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeXyqkwkk(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="xyqkwkkPage.pageSize"
				                    :total="xyqkwkkPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeXyqkwkkPage"
				                    @on-page-size-change="handleChangeXyqkwkkPageSize"
				                />
							</Row>
				        </TabPane>
				    </Tabs>
				</Col>	
			</Row>	
		</div>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}尾矿库规模信息`" v-model="showWkkgmModel" @on-visible-change="wkkgmModelChange">
			<div>
				<Form :model="wkkgmForm" ref="wkkgm" :rules="wkkgmRules" hide-required-mark label-position="left" :label-width="180">
					<FormItem label="当前坝高（米）" prop="dqbg">
			        	<InputNumber :min="0" v-model="wkkgmForm.dqbg"></InputNumber>
			        </FormItem>
			        <FormItem label="当前总库容（万立方）" prop="dqzkr">
			        	<InputNumber :min="0" v-model="wkkgmForm.dqzkr"></InputNumber>
			        </FormItem>
			        <FormItem label="汇水面积（平方千米）" prop="hsmj">
			        	<InputNumber :min="0" v-model="wkkgmForm.hsmj"></InputNumber>
			        </FormItem>
			        <FormItem label="尾矿库等别">
			        	<Row type="flex" align="middle" :gutter="20">
	            			<Col>
	            				<FormItem prop="wkkdb">
		            				<Select clearable v-model="wkkgmForm.wkkdb" placeholder="请选择">
						                <Option v-for="item in wkkdbList" :key="item" :value="item">{{item}}</Option>
						            </Select>
						        </FormItem>
	            			</Col>
	            			<Col>
	            				<Poptip placement="right" width="500">
	            					<div>
		            					<span class="link">尾矿库等别计算方式</span>
		            				</div>
		            				<div class="api" slot="content">
		            					<Table :columns="wkkdbColumns" :data="wkkdbData" border :span-method="handleSpan"></Table>
		            				</div>
	            				</Poptip>
	            			</Col>
	            		</Row>
			        </FormItem>
			        <FormItem label="填报时间" prop="tbsj">
			            <DatePicker type="date" v-model="wkkgmForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWkkgmModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="wkkgmLoading" @click="saveWkkgm">保存</Button>
	        </div>
		</Modal>

		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}下游情况`" v-model="showXyqkwkkModel" @on-visible-change="xyqkwkkModelChange">
			<div>
				<Form :model="xyqkwkkForm" ref="xyqkwkk" :rules="xyqkwkkRules" hide-required-mark label-position="left" :label-width="120">
					<FormItem label="名称" prop="mc">
			        	<Input clearable v-model="xyqkwkkForm.mc"></Input>
			        </FormItem>
			        <FormItem label="类型" prop="lx">
			        	<Select clearable v-model="xyqkwkkForm.lx" placeholder="请选择">
			                <Option v-for="item in lxList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="人数" prop="rs">
			        	<InputNumber :min="0" v-model="xyqkwkkForm.rs"></InputNumber>
			        </FormItem>
			        <FormItem label="距离（米）" prop="jl">
			        	<InputNumber :min="0" v-model="xyqkwkkForm.jl"></InputNumber>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showXyqkwkkModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="xyqkwkkLoading" @click="saveXyqkwkk">保存</Button>
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
				showWkkgmModel: false,
				showXyqkwkkModel: false,
				wkkgmLoading: false,
				xyqkwkkLoading: false,
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
					bpzy: '',
					swtj: '',
					dztj: '',
					tjgd: 0,
					ptkd: 0,
					jxhcdzy: '',
					jxhcdcz: '',
					jxhcdyszy: '',
					ptc: '',
					ptcgd: 0,
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
				ptcList: [
					{
						value: 0,
						name: '无'
					}, {
						value: 1,
						name: '有'
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
				wkkgmColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.wkkgmPage.pageIndex- 1) * this.wkkgmPage.pageSize + 1);
				        }
                    }, {
                        title: '当前坝高（米）',
                        key: 'dqbg',
                        minWidth: 140
                    }, {
                        title: '当前总库容（万立方）',
                        key: 'dqzkr',
                        minWidth: 180
                    }, {
                        title: '汇水面积（平方千米）',
                        key: 'hsmj',
                        minWidth: 180
                    }, {
                        title: '尾矿库等别',
                        key: 'wkkdb',
                        minWidth: 110
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
				wkkgmData: [],
				wkkgmForm: {
					dqbg: 0,
					dqzkr: 0,
					hsmj: 0,
					wkkdb: '',
					tbsj: ''
				},
				wkkdbList: ['一', '二', '三', '四', '五'],
				wkkgmPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				wkkdbColumns: [
					{
                        title: '等别',
                        key: 'db',
                    }, {
                        title: '全库容V（万m³）',
                        key: 'qkr',
                    }, {
                        title: '坝高H（m）',
                        key: 'bg',
                    }
				],
				wkkdbData: [
					{
						db: '一',
						qkr: '二等库具备提高等别条件者',
						bg: '二等库具备提高等别条件者',
					}, {
						db: '二',
						qkr: 'V≥10000',
						bg: 'H≥100',
					}, {
						db: '三',
						qkr: '1000≤V<10000',
						bg: '60≤V<100',
					}, {
						db: '四',
						qkr: '100≤V<1000',
						bg: '30≤V<60',
					}, {
						db: '五',
						qkr: 'V<100',
						bg: 'H<30',
					}
				],
				xyqkwkkColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.xyqkwkkPage.pageIndex- 1) * this.xyqkwkkPage.pageSize + 1);
				        }
                    }, {
                        title: '名称',
                        key: 'mc',
                        minWidth: 80
                    }, {
                        title: '类型',
                        key: 'lx',
                        minWidth: 80
                    }, {
                        title: '人数',
                        key: 'rs',
                        minWidth: 80
                    }, {
                        title: '距离（米）',
                        key: 'jl',
                        minWidth: 110
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				xyqkwkkData: [],
				xyqkwkkForm: {
					mc: '',
					lx: '',
					rs: 0,
					jl: 0
				},
				lxList: ['生产设施', '生活设施', '居住点'],
				xyqkwkkPage: {
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
				            return h('span',params.index + (this.quyuPage.pageIndex- 1) * this.quyuPage.pageSize + 1);
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
				wkkgmList: [],
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
				            return h('span',params.index + (this.quyuPage.pageIndex- 1) * this.quyuPage.pageSize + 1);
				        }
                    }, {
                        title: '储存设施单元名称',
                        key: 'ccssdymc',
                        minWidth: 160
                    }, {
                        title: '类型',
                        key: 'lx',
                        minWidth: 80
                    }, {
                        title: '重大危险源',
                        key: 'zdwxy',
                        minWidth: 110
                    }, {
                        title: '危险化学品',
                        slot: 'wxhxp',
                        minWidth: 110
                    }, {
                        title: '投用时间',
                        key: 'tysj',
                        minWidth: 120
                    }, {
                        title: '当前状态',
                        key: 'dqzt',
                        minWidth: 100
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
				            return h('span',params.index + (this.quyuPage.pageIndex- 1) * this.quyuPage.pageSize + 1);
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
			wkkgmRules() {
				return {
					dqbg: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					dqzkr: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					hsmj: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					wkkdb: [{ required: true, message: '请选择', trigger: 'change' }],
					tbsj: [{ required: true, type: 'date', message: '请选择', trigger: 'change' }],
				}
			},
			xyqkwkkRules() {
				return {
					mc: [{ required: true, message: '请选择', trigger: 'change' }],
					lx: [{ required: true, message: '请选择', trigger: 'change' }],
					rs: [{ required: true, type: 'number', message: '请选择', trigger: 'change' }],
					jl: [{ required: true, type: 'number', message: '请选择', trigger: 'change' }],
				}
			},
		},
		methods: {
			handleSpan ({ row, column, rowIndex, columnIndex }) {
                if (rowIndex === 0 && columnIndex === 1) {
                    return [1, 2];
                } else if (rowIndex === 0 && columnIndex === 2) {
                    return  [0, 0];
                }
            },
			async getBaseInfo() {
				this.loading = true
				let wkkgmParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.wkkgmPage.pageSize,
					page: this.wkkgmPage.pageIndex,
				}
				let xyqkwkkParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.xyqkwkkPage.pageSize,
					page: this.xyqkwkkPage.pageIndex,
				}
				Promise.all([api.getWkkgmList(wkkgmParams), api.getXyqkwkkList(xyqkwkkParams)]).then((result) => {
				  	let wkkgmRes = result[0], xyqkwkkRes = result[1]
				  	if(wkkgmRes.status_code == 200) {
				  		this.wkkgmData = wkkgmRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.wkkgmPage.totalRow = wkkgmRes.data.total
				  	}
				  	if(xyqkwkkRes.status_code == 200) {
				  		this.xyqkwkkData = xyqkwkkRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.xyqkwkkPage.totalRow = xyqkwkkRes.data.total
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
				let { status_code, message } = await api.addKsqyltkBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
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
			async getWkkgmList_() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: 1000,
					page: this.wkkgmPage.pageIndex,
				}
				let { status_code, data } = await api.getWkkgmList(params)
				if(status_code == 200) {
					this.wkkgmList = data.data
				}
			},
			handleChangeWkkgmPage(val) {
				this.wkkgmPage.pageIndex = val
				this.getWkkgmList()
			},
			handleChangeWkkgmPageSize(val) {
				this.wkkgmPage.pageSize = val
				this.getWkkgmList()
			},
			async getWkkgmList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.wkkgmPage.pageSize,
					page: this.wkkgmPage.pageIndex,
				}
				let { status_code, data } = await api.getWkkgmList(params)
				if(status_code == 200) {
					this.wkkgmData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.wkkgmPage.totalRow = data.total
				}
			},
			openWkkgmModel() {
				this.modeType = 1;
				this.showWkkgmModel = true
			},
			editWkkgmModel(row) {
				this.wkkgmForm = {
					dqbg: row.dqbg ? Number(row.dqbg) : 0,
					dqzkr: row.dqzkr ? Number(row.dqzkr) : 0,
					hsmj: row.hsmj ? Number(row.hsmj) : 0,
					wkkdb: row.wkkdb,
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.id = row.id
				this.modeType = 2;
				this.showWkkgmModel = true
			},
			wkkgmModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.wkkgmForm = {
							dqbg: 0,
							dqzkr: 0,
							hsmj: 0,
							wkkdb: '',
							tbsj: ''
						}
						this.$refs.wkkgm.resetFields();
					})
				}
			},
			async removeWkkgm(row) {
				let { status_code } = await api.deleteWkkgmInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getWkkgmList()
			},
			async saveWkkgm() {
				this.$refs.wkkgm.validate(async valid => {
                    if (valid) {
                    	this.wkkgmLoading = true
						let params = {
							...this.wkkgmForm,
							tbsj: this.wkkgmForm.tbsj ? getDate(new Date(this.wkkgmForm.tbsj).getTime(), 'date') : '',
							gkdx_id: this.gkdx_id
						}
						if(this.modeType == 2) {
							params.id = this.id
						}
						let { status_code, message } = await api.addWkkgmInfo(params);
						if(status_code == 200) {
							this.$Message.success(message)
							this.showWkkgmModel = false
							this.getWkkgmList()
						}
							this.wkkgmLoading = false
                    }
                })
			},
			async getXyqkwkkList_() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: 1000,
					page: this.xyqkwkkPage.pageIndex,
				}
				let { status_code, data } = await api.getXyqkwkkList(params)
				if(status_code == 200) {
					this.xyqkwkkList = data.data
				}
			},
			handleChangeXyqkwkkPage(val) {
				this.xyqkwkkPage.pageIndex = val
				this.getXyqkwkkList()
			},
			handleChangeXyqkwkkPageSize(val) {
				this.xyqkwkkPage.pageSize = val
				this.getXyqkwkkList()
			},
			async getXyqkwkkList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.xyqkwkkPage.pageSize,
					page: this.xyqkwkkPage.pageIndex,
				}
				let { status_code, data } = await api.getXyqkwkkList(params)
				if(status_code == 200) {
					this.xyqkwkkData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.xyqkwkkPage.totalRow = data.total
				}
			},
			openXyqkwkkModel() {
				this.modeType = 1;
				this.showXyqkwkkModel = true
			},
			editXyqkwkkModel(row) {
				this.xyqkwkkForm = {
					mc: row.mc,
					lx: row.lx,
					rs: row.rs ? Number(row.rs) : 0,
					jl: row.jl ? Number(row.jl) : 0,
				}
				this.id = row.id
				this.modeType = 2;
				this.showXyqkwkkModel = true
			},
			xyqkwkkModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.xyqkwkkForm = {
							mc: '',
							lx: '',
							rs: 0,
							jl: 0
						}
						this.$refs.xyqkwkk.resetFields();
					})
				}
			},
			async removeXyqkwkk(row) {
				let { status_code } = await api.deleteXyqkwkkInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getXyqkwkkList()
			},
			async saveXyqkwkk() {
				this.$refs.xyqkwkk.validate(async valid => {
                    if (valid) {
                    	this.xyqkwkkLoading = true
						let params = {
							...this.xyqkwkkForm,
							tbsj: this.xyqkwkkForm.tbsj ? getDate(new Date(this.xyqkwkkForm.tbsj).getTime(), 'date') : '',
							gkdx_id: this.gkdx_id
						}
						if(this.modeType == 2) {
							params.id = this.id
						}
						let { status_code, message } = await api.addXyqkwkkInfo(params);
						if(status_code == 200) {
							this.$Message.success(message)
							this.showXyqkwkkModel = false
							this.getXyqkwkkList()
						}
							this.xyqkwkkLoading = false
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
				this.getWkkgmList_()
				this.modeType2 = 1;
				this.showSjcccpModel = true
			},
			editSjcccpModel(row, index) {
				this.getWkkgmList_()
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