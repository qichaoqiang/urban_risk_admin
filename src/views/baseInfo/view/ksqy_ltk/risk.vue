<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div v-show="step == 2">
			<Row type="flex" justify="center">
				<Col span="22">
					<div class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="开采规模" name="name1">
						    <part-title text="开采规模" ref="xxx" :btns="['add']" @add="openKcgmltkModel"></part-title>
							<Form :model="baseInfo" label-position="left" :label-width="140" style="width: 600px">
						        <FormItem label="设计开采深度（米）">
						        	<InputNumber :min="0" v-model="baseInfo.sjkcsd"></InputNumber>
						        </FormItem>
						        <FormItem label="台阶高度（米）">
						        	<InputNumber :min="0" v-model="baseInfo.tjgd"></InputNumber>
						        </FormItem>
						        <FormItem label="平台宽度（米）">
						        	<InputNumber :min="0" v-model="baseInfo.ptkd"></InputNumber>
						        </FormItem>
						    </Form>
							<Table :columns="kcgmltkColumns" :data="kcgmltkData">
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editKcgmltkModel(row)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeKcgmltk(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="kcgmltkPage.pageSize"
				                    :total="kcgmltkPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeKcgmltkPage"
				                    @on-page-size-change="handleChangeKcgmltkPageSize"
				                />
							</Row>
							<Row type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo1">完成</Button>
								</Col>
							</Row>
				        </TabPane>
				        <TabPane label="作业情况" name="name2">
				        	<Form :model="baseInfo" label-position="left" :label-width="140" style="width: 600px">
						        <FormItem label="机械化程度（凿岩）">
						        	<Select clearable v-model="baseInfo.jxhcdzy" placeholder="机械化程度（凿岩）">
						                <Option v-for="item in ptcList" :key="item.value" :value="item.value">{{item.name}}</Option>
						            </Select>
						        </FormItem>
						        <FormItem label="机械化程度（铲装）">
						        	<Select clearable v-model="baseInfo.jxhcdcz" placeholder="机械化程度（凿岩）">
						                <Option v-for="item in ptcList" :key="item.value" :value="item.value">{{item.name}}</Option>
						            </Select>
						        </FormItem>
						        <FormItem label="机械化程度（运输作业）">
						        	<Select clearable v-model="baseInfo.jxhcdyszy" placeholder="机械化程度（凿岩）">
						                <Option v-for="item in ptcList" :key="item.value" :value="item.value">{{item.name}}</Option>
						            </Select>
						        </FormItem>
						        <FormItem label="爆破作业">
						        	<Select clearable v-model="baseInfo.bpzy" placeholder="爆破作业">
						                <Option v-for="item in bpzyList" :key="item" :value="item">{{item}}</Option>
						            </Select>
						        </FormItem>
						        <FormItem label="排土场">
						        	<Select clearable v-model="baseInfo.ptc" placeholder="爆破作业">
						                <Option v-for="item in ptcList" :key="item.value" :value="item.value">{{item.name}}</Option>
						            </Select>
						        </FormItem>
						        <FormItem label="排土场高度（米）" v-if="baseInfo.ptc == 1">
						        	<InputNumber :min="0" clearable v-model="baseInfo.ptcgd"></InputNumber>
						        </FormItem>
						    </Form>
							<Row type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo2">完成</Button>
								</Col>
							</Row>
				        </TabPane>
				        <TabPane label="矿山条件" name="name3">
				        	<Form :model="baseInfo" label-position="left" :label-width="140" style="width: 600px">
						        <FormItem label="水文条件">
						        	<Input clearable v-model="baseInfo.swtj" type="textarea" placeholder="水文条件"></Input>
						        </FormItem>
						        <FormItem label="地质条件">
						        	<Input clearable v-model="baseInfo.dztj" type="textarea" placeholder="地质条件"></Input>
						        </FormItem>
						    </Form>
						    <Row type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo3">完成</Button>
								</Col>
							</Row>
						</TabPane>
				    </Tabs>
				</Col>	
			</Row>	
		</div>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}开采规模信息`" v-model="showKcgmltkModel" @on-visible-change="kcgmltkModelChange">
			<div>
				<Form :model="kcgmltkForm" label-position="left" :label-width="210">
					<FormItem label="当前开采深度（米）">
			        	<InputNumber :min="0" v-model="kcgmltkForm.dqkcsd"></InputNumber>
			        </FormItem>
			        <FormItem label="边坡高度（米）">
			        	<InputNumber :min="0" v-model="kcgmltkForm.bpgd"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间">
			            <DatePicker type="date" v-model="kcgmltkForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showKcgmltkModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveKcgmltk">保存</Button>
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
	            <!-- <Button type="text" size="large" @click="showKcgmltkModel = false">取消</Button> -->
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
	            <!-- <Button type="text" size="large" @click="showKcgmltkModel = false">取消</Button> -->
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
	            <!-- <Button type="text" size="large" @click="showKcgmltkModel = false">取消</Button> -->
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
				showKcgmltkModel: false,
				showKcgmltkRiskModel: false,
				showCkyhbzModel: false,
				showCcssModel: false,
				showSjcccpModel: false,
				showGqscModel: false,
				showMainRiskModel: false,
				showRimModel: false,
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
				kcgmltkColumns: [
					{
                        title: '序号',
                        type: 'index',
                    }, {
                        title: '当前开采深度（米）',
                        key: 'dqkcsd',
                    }, {
                        title: '边坡高度（米）',
                        key: 'bpgd',
                    }, {
                        title: '填报时间',
                        key: 'tbsj',
                    }, {
                        title: '操作',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				kcgmltkData: [],
				kcgmltkForm: {
					dqkcsd: 0,
					bpgd: 0,
					tbsj: ''
				},
				cplbList: ['喷花类', '旋转类', '升空类', '旋转升空类', '吐珠类', '线香类', '烟雾类', '造型玩具类', '摩擦类', '小礼花类', '礼花弹类', '架子烟花类'],
				cpfjList: ['A', 'B', 'C', 'D'],
				scgmdwList: ['箱/年', '吨/年'],
				syyldwList: ['吨/年'],
				kcgmltkPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				hzwxxdjList: ['甲', '乙', '丙', '丁', '戊'],
				hxpztList: ['气体', '液化气体', '液体', '固体'],
				nzzldwList: ['吨', '立方', 'KG', 'L'],
				ckyhbzscColumns: [
					{
                        title: '序号',
                        type: 'index',
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
				kcgmltkList: [],
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
                        title: '序号',
                        type: 'index',
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
                        title: '序号',
                        type: 'index',
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
                        title: '序号',
                        type: 'index',
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
				fwList: ['东', '南', '西', '北'],
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

		},
		methods: {
			async getBaseInfo() {
				this.loading = true
				let { status_code, data, message } = await api.getKsqyltkBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					let { qymc, tyshxydm, zcdz, sfzgyyq, yqmc, hyml, hydm, aqscxkz, zgrs, glrysl, ksjk, yxzt, jbr, jbrdh, jbryx, qyfzr, qyfzrdh, fgaqfzr, fgaqfzrdh, ksdz, lngAndLat, kqfw, zdmj, jzmj, kcsj, jyfw, bpzy, swtj, dztj, sjkcsd, kckz, tjgd, ptkd, jxhcdzy, jxhcdcz, jxhcdyszy, ptc, ptcgd } = this.form
					this.baseInfo = { qymc, tyshxydm, zcdz, sfzgyyq, yqmc, hydm, aqscxkz, zgrs, glrysl, ksjk, yxzt, jbr, jbrdh, jbryx, qyfzr, qyfzrdh, fgaqfzr, fgaqfzrdh, ksdz, kqfw, jyfw, bpzy, swtj, dztj, kckz, jxhcdzy, jxhcdcz, jxhcdyszy, ptc }
					this.baseInfo.zgrs = zgrs ? Number(zgrs) : 0
					this.baseInfo.glrysl = glrysl ? Number(glrysl) : 0
					this.baseInfo.kcsj = kcsj ? new Date(kcsj) : '',
					this.baseInfo.sjkcsd = sjkcsd ? Number(sjkcsd) : 0
					this.baseInfo.tjgd = tjgd ? Number(tjgd) : 0
					this.baseInfo.ptkd = ptkd ? Number(ptkd) : 0
					this.baseInfo.ptcgd = ptcgd ? Number(ptcgd) : 0
					this.baseInfo.lngAndLat = this.form.jd && this.form.wd ? `${(this.form.jd - 0).toFixed(2)} ${(this.form.wd - 0).toFixed(2)}` : ''
				}
				let kcgmltkParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.kcgmltkPage.pageSize,
					page: this.kcgmltkPage.pageIndex,
				}
				api.getKcgmltkList(kcgmltkParams).then((result) => {
				  	let kcgmltkRes = result
				  	if(kcgmltkRes.status_code == 200) {
				  		this.kcgmltkData = kcgmltkRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.kcgmltkPage.totalRow = kcgmltkRes.data.total
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
			async saveInfo1() {
				let params = {
					sjkcsd: this.baseInfo.sjkcsd,
					tjgd: this.baseInfo.tjgd,
					ptkd: this.baseInfo.ptkd,
					gkdx_id: this.form.gkdx_id
				}
				let { status_code, message } = await api.addKsqyltkBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
				}
			},
			async saveInfo2() {
				let params = {
					jxhcdzy: this.baseInfo.jxhcdzy,
					jxhcdcz: this.baseInfo.jxhcdcz,
					jxhcdyszy: this.baseInfo.jxhcdyszy,
					bpzy: this.baseInfo.bpzy,
					ptc: this.baseInfo.ptc,
					ptcgd: this.baseInfo.ptcgd,
					gkdx_id: this.form.gkdx_id
				}
				let { status_code, message } = await api.addKsqyltkBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
				}
			},
			async saveInfo3() {
				let params = {
					swtj: this.baseInfo.swtj,
					dztj: this.baseInfo.dztj,
					gkdx_id: this.form.gkdx_id
				}
				let { status_code, message } = await api.addKsqyltkBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
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
			async getKcgmltkList_() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: 1000,
					page: this.kcgmltkPage.pageIndex,
				}
				let { status_code, data } = await api.getKcgmltkList(params)
				if(status_code == 200) {
					this.kcgmltkList = data.data
				}
			},
			handleChangeKcgmltkPage(val) {
				this.kcgmltkPage.pageIndex = val
				this.getKcgmltkList()
			},
			handleChangeKcgmltkPageSize(val) {
				this.kcgmltkPage.pageSize = val
				this.getKcgmltkList()
			},
			async getKcgmltkList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.kcgmltkPage.pageSize,
					page: this.kcgmltkPage.pageIndex,
				}
				let { status_code, data } = await api.getKcgmltkList(params)
				if(status_code == 200) {
					this.kcgmltkData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.kcgmltkPage.totalRow = data.total
				}
			},
			openKcgmltkModel() {
				this.modeType = 1;
				this.showKcgmltkModel = true
			},
			editKcgmltkModel(row) {
				this.kcgmltkForm = {
					dqkcsd: row.dqkcsd ? Number(row.dqkcsd) : 0,
					bpgd: row.bpgd ? Number(row.bpgd) : 0,
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.id = row.id
				this.modeType = 2;
				this.showKcgmltkModel = true
			},
			kcgmltkModelChange(status) {
				if(!status) {
					this.kcgmltkForm = {
						dqkcsd: 0,
						bpgd: 0,
						tbsj: ''
					}
				}
			},
			async removeKcgmltk(row) {
				let { status_code } = await api.deleteKcgmltkInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getKcgmltkList()
			},
			async saveKcgmltk() {
				let params = {
					...this.kcgmltkForm,
					tbsj: this.kcgmltkForm.tbsj ? getDate(new Date(this.kcgmltkForm.tbsj).getTime(), 'date') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addKcgmltkInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showKcgmltkModel = false
					this.getKcgmltkList()
				}
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
				this.getKcgmltkList_()
				this.modeType2 = 1;
				this.showSjcccpModel = true
			},
			editSjcccpModel(row, index) {
				this.getKcgmltkList_()
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