<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div v-show="step == 2">
			<Row type="flex" justify="center">
				<Col span="22">
					<div v-show="!isDisEditInfo" class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="码头规模" name="name1">
				        	<part-title text="码头规模" ref="xxx" :btns="['add']" @add="openMtgmModel"></part-title>
				        	<Form :disabled="isDisEditInfo" :model="baseInfo" label-position="left" :label-width="200">
						        <FormItem label="危险货物最大吞吐量（吨/年）">
						        	<InputNumber :min="0" v-model="baseInfo.wxhwzdttl"></InputNumber>
						        </FormItem>
						    </Form>
							<Table :columns="mtgmColumns" :data="mtgmData">
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editMtgmModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeMtgm(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="mtgmPage.pageSize"
				                    :total="mtgmPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeMtgmPage"
				                    @on-page-size-change="handleChangeMtgmPageSize"
				                />
							</Row>
							<Row v-show="!isDisEditInfo" type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo1">完成</Button>
								</Col>
							</Row>
				        </TabPane>
				        <TabPane label="泊位信息" name="name3">
				        	<part-title text="泊位信息" :btns="['add']" @add="openBwxxModel"></part-title>
							<Table :columns="bwxxColumns" :data="bwxxData">
								<template slot-scope="{ row }" slot="wxhwzl">
									<span>{{handleWxhwzl(row)}}</span>
								</template>
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editBwxxModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeBwxx(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="bwxxPage.pageSize"
				                    :total="bwxxPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeBwxxPage"
				                    @on-page-size-change="handleChangeBwxxPageSize"
				                />
							</Row>
				        </TabPane>
				        <TabPane label="仓储信息" name="name5">
				        	<part-title text="仓储信息" :btns="['add']" @add="openCcxxwhModel"></part-title>
				        	<Form :disabled="isDisEditInfo" :model="baseInfo" label-position="left" :label-width="100">
						        <FormItem label="重大危险源">
						        	<Select clearable :transfer="true" v-model="baseInfo.zdwxy" placeholder="请选择" style="width: 100px">
						                <Option v-for="item in zdwxyList" :key="item" :value="item">{{item}}</Option>
						            </Select>
						        </FormItem>
						    </Form>
							<Table :columns="ccxxwhColumns" :data="ccxxwhData">
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editCcxxwhModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeCcxxwh(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="ccxxwhPage.pageSize"
				                    :total="ccxxwhPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeCcxxwhPage"
				                    @on-page-size-change="handleChangeCcxxwhPageSize"
				                />
							</Row>
							<Row v-show="!isDisEditInfo" type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo2">完成</Button>
								</Col>
							</Row>
				        </TabPane>
				    </Tabs>
				</Col>	
			</Row>	
			<!-- <Row type="flex" justify="center" style="margin-top: 24px">
				<Col>
					<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo">完成</Button>
				</Col>
			</Row> -->
		</div>
		<Modal title="企业经纬度标注" v-model="showLngModel">
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
	            		<Button type="text" size="large" @click="showAreaModel = false">取消</Button>
		                <Button type="primary" size="large" @click="saveArea">保存</Button>
	            	</Col>
	            </Row>
	        </div>
		</Modal>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}码头规模`" v-model="showMtgmModel" @on-visible-change="mtgmModelChange">
			<div>
				<Form :model="mtgmForm" label-position="left" :label-width="180">
					<FormItem label="近1月日平均吞吐量（吨）">
			        	<InputNumber :min="0" v-model="mtgmForm.jyyrjzzl"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间">
			            <DatePicker type="date" v-model="mtgmForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showMtgmModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveMtgm">保存</Button>
	        </div>
		</Modal>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}泊位信息`" width="800px" v-model="showBwxxModel" @on-visible-change="bwxxModelChange">
			<div>
				<Form :model="bwxxForm" label-position="left" :label-width="140">
					<FormItem label="泊位名称">
			        	<Input clearable v-model="bwxxForm.bwmc"></Input>
			        </FormItem>
			        <FormItem label="靠泊吨级（DWT）">
			        	<Input clearable v-model="bwxxForm.kbdw"></Input>
			        </FormItem>
			        <FormItem label="是否开展夜间作业">
			        	<Select clearable v-model="bwxxForm.sfkzyjzy" placeholder="请选择">
			                <Option v-for="item in sfzgyyqList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
				</Form>
				<div>
					<part-title text="危险货物种类" :btns="['add']" @add="openSjwxhwzlModel"></part-title>
					<Table :columns="sjwxhwzlColumns" :data="sjwxhwzlData">
						<template slot-scope="{ row, index }" slot="action">
				            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editSjwxhwzlModel(row, index)">编辑</Button>
				            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeSjwxhwzl(index)">
						        <Button type="error" size="small" ghost>删除</Button>
						    </Poptip>
				        </template>
					</Table>
				</div>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showMtgmModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveBwxx">保存</Button>
	        </div>
		</Modal>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}危险货物种类`" v-model="showSjwxhwzlModel" @on-visible-change="sjwxhwzlModelChange">
			<div>
				<Form :model="sjwxhwzlForm" label-position="left" :label-width="160">
					<FormItem label="危险货物名称">
			        	<Input clearable v-model="sjwxhwzlForm.wxhwmc"></Input>
			        </FormItem>
			        <FormItem label="最大年吞吐量（吨/年）">
			        	<InputNumber :min="0" v-model="sjwxhwzlForm.zdnzzl"></InputNumber>
			        </FormItem>
			        <FormItem label="近1月日平均吞吐量（吨）">
			        	<InputNumber :min="0" v-model="sjwxhwzlForm.jyyrpjzz"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间">
			            <DatePicker type="date" v-model="sjwxhwzlForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showMtgmModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveSjwxhwzl">保存</Button>
	        </div>
		</Modal>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}仓储信息`" v-model="showCcxxwhModel"  @on-visible-change="ccxxwhModelChange">
			<div>
				<Form :model="ccxxwhForm" label-position="left" :label-width="140">
					<FormItem label="容器名称">
			        	<Input clearable v-model="ccxxwhForm.rqmc"></Input>
			        </FormItem>
			        <FormItem label="容积（m³）">
			        	<InputNumber :min="0" v-model="ccxxwhForm.rj"></InputNumber>
			        </FormItem>
			        <FormItem label="数量">
			        	<InputNumber :min="0" v-model="ccxxwhForm.sl"></InputNumber>
			        </FormItem>
			        <FormItem label="危险货物名称">
			        	<Input clearable v-model="ccxxwhForm.wxhwmc"></Input>
			        </FormItem>
			       <FormItem label="存储量（吨）">
			        	<InputNumber :min="0" v-model="ccxxwhForm.ccl"></InputNumber>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showMtgmModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveCcxxwh">保存</Button>
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
				sjwxhwzlId: '',
				bwxx_id: '',	
				ccss_id: '',
				loading: true,
				step: 2,	
				showAreaModel: false,
				showLngModel: false,
				showMtgmModel: false,
				showMtgmRiskModel: false,
				showBwxxModel: false,
				showCcssModel: false,
				showSjwxhwzlModel: false,
				showGqscModel: false,
				showMainRiskModel: false,
				showCcxxwhModel: false,
				modeType: '',
				modeType2: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					wxhwzdttl: 0,
					zdwxy: ''
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
				mtgmColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.mtgmPage.pageIndex- 1) * this.mtgmPage.pageSize + 1);
				        }
                    }, {
                        title: '近1月日平均吞吐量（吨）',
                        key: 'jyyrjzzl',
                        minWidth: 100
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
				mtgmData: [],
				mtgmForm: {
					jyyrjzzl: 0,
					tbsj: '',
				},
				mtgmPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				hzwxxdjList: ['甲', '乙', '丙', '丁', '戊'],
				hxpztList: ['气体', '液化气体', '液体', '固体'],
				nzzldwList: ['吨', '立方', 'KG', 'L'],
				bwxxColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.bwxxPage.pageIndex- 1) * this.bwxxPage.pageSize + 1);
				        }
                    }, {
                        title: '泊位名称',
                        key: 'bwmc',
                    }, {
                        title: '靠泊吨级（DWT）',
                        key: 'kbdw',
                    }, {
                        title: '危险货物种类',
                        slot: 'wxhwzl',
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				bwxxData: [],
				bwxxForm: {
					bwmc: '',
					kbdw: '',
					sfkzyjzy: 0,
				},
				ccssList: ['有', '无'],
				zzyxylList: ['Mpa', 'Kpa'],
				zdwxyList: ['否', '一级', '二级', '三级', '四级'],
				mtgmList: [],
				fclxList: [],
				bwxxPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				bwxxNum: {
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
				sjwxhwzlColumns: [
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
                        title: '危险货物名称',
                        key: 'wxhwmc',
                        minWidth: 120
                    }, {
                        title: '最大年吞吐量（吨/年）',
                        key: 'zdnzzl',
                        minWidth: 200
                    }, {
                        title: '近1月日平均吞吐量（吨）',
                        key: 'jyyrpjzz',
                        minWidth: 200
                    }, {
                        title: '填报时间',
                        key: 'tbsj',
                        minWidth: 120
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				sjwxhwzlData: [],
				sjwxhwzlForm: {
					wxhwmc: '',
					zdnzzl: 0,
					jyyrpjzz: 0,
					tbsj: '',
				},
				dqsldwList: ['箱', '吨'],
				sjwxhwzlPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				sjwxhwzlNum: {
					zsl: 0,
					yxsl: 0
				},
				ccxxwhColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.ccxxwhPage.pageIndex- 1) * this.ccxxwhPage.pageSize + 1);
				        }
                    }, {
                        title: '容器名称',
                        key: 'rqmc',
                        minWidth: 100
                    }, {
                        title: '面积（㎡）',
                        key: 'rj',
                        minWidth: 120
                    }, {
                        title: '数量',
                        key: 'sl',
                        minWidth: 80
                    }, {
                        title: '危险货物名称',
                        key: 'wxhwmc',
                        minWidth: 120
                    }, {
                        title: '存储量（吨）',
                        key: 'ccl',
                        minWidth: 80
                    },{
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				ccxxwhData: [],
				ccxxwhForm: {
					rqmc: '',
					rj: 0,
					sl: 0,
					wxhwmc: '',
					ccl: 0
				},
				ccxxwhPage: {
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
				let mtgmParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.mtgmPage.pageSize,
					page: this.mtgmPage.pageIndex,
				}
				let bwxxParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.bwxxPage.pageSize,
					page: this.bwxxPage.pageIndex,
				}
				let ccxxwhParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.ccxxwhPage.pageSize,
					page: this.ccxxwhPage.pageIndex,
				}
				Promise.all([api.getMtgmList(mtgmParams), api.getBwxxList(bwxxParams), api.getCcxxwhList(ccxxwhParams)]).then((result) => {
				  	let mtgmRes = result[0], bwxxRes = result[1], ccxxwhRes = result[2]
				  	if(mtgmRes.status_code == 200) {
				  		this.mtgmData = mtgmRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.mtgmPage.totalRow = mtgmRes.data.total
				  	}
				  	if(bwxxRes.status_code == 200) {
				  		this.bwxxData = bwxxRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.bwxxPage.totalRow = bwxxRes.data.total
				  	}
				  	if(ccxxwhRes.status_code == 200) {
				  		this.ccxxwhData = ccxxwhRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.ccxxwhPage.totalRow = ccxxwhRes.data.total
				  	}
				  	this.loading = false   
				}).catch((error) => {
				  	console.log(error)
				  	this.loading = false
				})
				let { status_code, data, message } = await api.getWhmtBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					this.baseInfo = { 
						wxhwzdttl: data.wxhwzdttl ? Number(data.wxhwzdttl) : 0,
						zdwxy: data.zdwxy
					}
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
			async saveInfo1() {
				let params = {
					gkdx_id: this.gkdx_id,
					wxhwzdttl: this.baseInfo.wxhwzdttl
				}
				let { status_code, message } = await api.addWhmtBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
				}
			},
			async saveInfo2() {
				let params = {
					gkdx_id: this.gkdx_id,
					zdwxy: this.baseInfo.zdwxy,
				}
				let { status_code, message } = await api.addWhmtBase(params);
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
			handleChangeMtgmPage(val) {
				this.mtgmPage.pageIndex = val
				this.getMtgmList()
			},
			handleChangeMtgmPageSize(val) {
				this.mtgmPage.pageSize = val
				this.getMtgmList()
			},
			async getMtgmList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.mtgmPage.pageSize,
					page: this.mtgmPage.pageIndex,
				}
				let { status_code, data } = await api.getMtgmList(params)
				if(status_code == 200) {
					this.mtgmData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.mtgmPage.totalRow = data.total
				}
			},
			openMtgmModel() {
				this.modeType = 1;
				this.showMtgmModel = true
			},
			editMtgmModel(row) {
				this.mtgmForm = {
					jyyrjzzl: row.jyyrjzzl ? Number(row.jyyrjzzl) : 0,
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.id = row.id
				this.modeType = 2;
				this.showMtgmModel = true
			},
			mtgmModelChange(status) {
				if(!status) {
					this.mtgmForm = {
						jyyrjzzl: 0,
						tbsj: '',
					}
				}
			},
			async removeMtgm(row) {
				let { status_code } = await api.deleteMtgmInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getMtgmList()
			},
			async saveMtgm() {
				let params = {
					...this.mtgmForm,
					tbsj: this.mtgmForm.tbsj ? getDate(new Date(this.mtgmForm.tbsj).getTime(), 'date') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addMtgmInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showMtgmModel = false
					this.getMtgmList()
				}
			},
			handleChangeBwxxPage(val) {
				this.bwxxPage.pageIndex = val
				this.getBwxxList()
			},
			handleChangeBwxxPageSize(val) {
				this.bwxxPage.pageSize = val
				this.getBwxxList()
			},
			async getBwxxList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.bwxxPage.pageSize,
					page: this.bwxxPage.pageIndex,
				}
				let { status_code, data } = await api.getBwxxList(params)
				if(status_code == 200) {
					this.bwxxData = data.data
					this.bwxxPage.totalRow = data.total
				}
			},
			async openBwxxModel() {
				this.modeType = 1;
				this.showBwxxModel = true
			},
			async editBwxxModel(row) {
				this.bwxxForm = {
					bwmc: row.bwmc,
					kbdw: row.kbdw,
					sfkzyjzy: row.sfkzyjzy ? Number(row.sfkzyjzy) : 0,
				}
				this.id = row.id
				this.bwxx_id = row.id
				this.sjwxhwzlData = row.wxhwzl ? JSON.parse(row.wxhwzl) : []
				this.modeType = 2;
				this.showBwxxModel = true
			},
			bwxxModelChange(status) {
				if(!status) {
					this.bwxxForm = {
						bwmc: '',
						kbdw: '',
						sfkzyjzy: 0,
					}
					this.sjwxhwzlData = []
				}
			},
			async removeBwxx(row) {
				let { status_code } = await api.deleteBwxxInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getBwxxList()
			},
			async saveBwxx() {
				let params = {
					...this.bwxxForm,
					wxhwzl: this.sjwxhwzlData.length > 0 ? JSON.stringify(this.sjwxhwzlData) : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addBwxxInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showBwxxModel = false
					this.getBwxxList()
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
				this.sjwxhwzlData = row.wxhxp ? JSON.parse(row.wxhxp) : []
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
					this.sjwxhwzlData = []
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
					wxhxp: this.sjwxhwzlData.length > 0 ? JSON.stringify(this.sjwxhwzlData) : '',
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
			handleWxhwzl(row) {
				if(row.wxhwzl) {
					let list = JSON.parse(row.wxhwzl)
					console.log(list)
					return list.map(item => item.wxhwmc).join(',')
				}else {
					return '--'
				}
				
			},
			openSjwxhwzlModel() {
				this.modeType2 = 1;
				this.showSjwxhwzlModel = true
			},
			editSjwxhwzlModel(row, index) {
				this.sjwxhwzlForm = {
					wxhwmc: row.cplb,
					zdnzzl: row.zdnzzl ? Number(row.zdnzzl) : 0,
					jyyrpjzz: row.jyyrpjzz ? Number(row.jyyrpjzz) : 0,
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.sjwxhwzlId = index
				this.modeType2 = 2;
				this.showSjwxhwzlModel = true
			},
			sjwxhwzlModelChange(status) {
				if(!status) {
					this.sjwxhwzlForm = {
						wxhwmc: '',
						zdnzzl: 0,
						jyyrpjzz: 0,
						tbsj: '',
					}
				}
			},
			async saveSjwxhwzl() {
				let sjwxhwzlForm = {...this.sjwxhwzlForm, tbsj: this.sjwxhwzlForm.tbsj ? getDate(new Date(this.sjwxhwzlForm.tbsj).getTime(), 'date') : '',}
				if(this.modeType2 == 2) {
					this.sjwxhwzlData.splice(this.sjwxhwzlId, 1, sjwxhwzlForm)
				}else {
					this.sjwxhwzlData.push(sjwxhwzlForm)
				}
				this.showSjwxhwzlModel = false
			},
			removeSjwxhwzl(index) {
				this.sjwxhwzlData.splice(index, 1)
			},
			handleChangeCcxxwhPage(val) {
				this.ccxxwhPage.pageIndex = val
				this.getCcxxwhList()
			},
			handleChangeCcxxwhPageSize(val) {
				this.ccxxwhPage.pageSize = val
				this.getCcxxwhList()
			},
			async getCcxxwhList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.ccxxwhPage.pageSize,
					page: this.ccxxwhPage.pageIndex,
				}
				let { status_code, data } = await api.getCcxxwhList(params)
				if(status_code == 200) {
					this.ccxxwhData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.ccxxwhPage.totalRow = data.total
				}
			},
			openCcxxwhModel() {
				this.modeType = 1;
				this.showCcxxwhModel = true
			},
			editCcxxwhModel(row) {
				this.ccxxwhForm = {
					rqmc: row.rqmc,
					rj: row.rj ? Number(row.rj) : 0,
					sl: row.sl ? Number(row.sl) : 0,
					wxhwmc: row.wxhwmc,
					ccl: row.ccl ? Number(row.ccl) : 0
				}
				this.id = row.id
				this.modeType = 2;
				this.showCcxxwhModel = true
			},
			ccxxwhModelChange(status) {
				if(!status) {
					this.ccxxwhForm = {
						rqmc: '',
						rj: 0,
						sl: 0,
						wxhwmc: '',
						ccl: 0
					}
				}
			},
			async removeCcxxwh(row) {
				let { status_code } = await api.deleteCcxxwhInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getCcxxwhList()
			},
			async saveCcxxwh() {
				let params = {
					...this.ccxxwhForm,
					gkdx_id: this.gkdx_id
				}
				delete params.lngAndLat
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addCcxxwhInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showCcxxwhModel = false
					this.getCcxxwhList()
				}
			},
		},
		created() {
			this.getBaseInfo()
      if(this.isDisEditInfo) {
        this.mtgmColumns.pop()
        this.bwxxColumns.pop()
        this.ccxxwhColumns.pop()
        this.sjwxhwzlColumns.pop()
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