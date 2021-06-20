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
				        	<Form :disabled="isDisEditInfo" :model="baseInfo" ref="baseInfo1" :rules="baseInfoRules" hide-required-mark label-position="left" :label-width="200">
						        <FormItem label="设计年周转量（吨/年）" prop="sjnzzl">
						        	<InputNumber :min="0" v-model="baseInfo.sjnzzl"></InputNumber>
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
				        	<part-title text="仓储信息" :btns="['add']" @add="openCcxxphModel"></part-title>
							<Table :columns="ccxxphColumns" :data="ccxxphData">
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editCcxxphModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeCcxxph(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="ccxxphPage.pageSize"
				                    :total="ccxxphPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeCcxxphPage"
				                    @on-page-size-change="handleChangeCcxxphPageSize"
				                />
							</Row>
				        </TabPane>
				        <TabPane label="装卸设备" name="name6">
				        	<part-title text="装卸设备（起重机械）" :btns="['add']" @add="openZxsbModel"></part-title>
				        	<div style="margin-bottom: 16px;">
				        		<span>合计数量：{{zxsbSum.hjsl}}</span>
				        		<span style="margin-left: 24px;">总负载能力：{{zxsbSum.zfznl}}吨</span>
				        	</div>
							<Table :columns="zxsbColumns" :data="zxsbData">
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editZxsbModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeZxsb(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="zxsbPage.pageSize"
				                    :total="zxsbPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeZxsbPage"
				                    @on-page-size-change="handleChangeZxsbPageSize"
				                />
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
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}码头规模`" v-model="showMtgmModel" @on-visible-change="mtgmModelChange">
			<div>
				<Form :model="mtgmForm" ref="mtgm" :rules="mtgmRules" hide-required-mark label-position="left" :label-width="180">
					<FormItem label="近1月日均周转量（吨）" prop="jyyrjzzl">
			        	<InputNumber :min="0" v-model="mtgmForm.jyyrjzzl"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间" prop="tbsj">
			            <DatePicker type="date" v-model="mtgmForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showMtgmModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="mtgmLoading" @click="saveMtgm">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}泊位信息`" v-model="showBwxxModel" @on-visible-change="bwxxModelChange">
			<div>
				<Form :model="bwxxForm" ref="bwxx" :rules="bwxxRules" hide-required-mark label-position="left" :label-width="140">
					<FormItem label="泊位名称" prop="bwmc">
			        	<Input clearable v-model="bwxxForm.bwmc"></Input>
			        </FormItem>
			        <FormItem label="靠泊吨级（DWT）" prop="kbdw">
			        	<Input clearable v-model="bwxxForm.kbdw"></Input>
			        </FormItem>
			        <FormItem label="是否开展夜间作业" prop="sfkzyjzy">
			        	<Select clearable v-model="bwxxForm.sfkzyjzy" placeholder="请选择">
			                <Option v-for="item in sfzgyyqList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
				</Form>
				<div>
					<part-title text="货物种类" :btns="['add']" @add="openSjwxhwzlModel"></part-title>
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
		        <Button type="primary" size="large" :loading="bwxxLoading" @click="saveBwxx">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}货物种类`" v-model="showSjwxhwzlModel" @on-visible-change="sjwxhwzlModelChange">
			<div>
				<Form :model="sjwxhwzlForm" ref="sjwxhwzl" :rules="sjwxhwzlRules" hide-required-mark label-position="left" :label-width="160">
					<FormItem label="货物名称" prop="wxhwmc">
			        	<Input clearable v-model="sjwxhwzlForm.wxhwmc"></Input>
			        </FormItem>
			        <FormItem label="最大年周转量（吨/年）" prop="zdnzzl">
			        	<InputNumber :min="0" v-model="sjwxhwzlForm.zdnzzl"></InputNumber>
			        </FormItem>
			        <FormItem label="近1月日平均周转（吨）" prop="jyyrpjzz">
			        	<InputNumber :min="0" v-model="sjwxhwzlForm.jyyrpjzz"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间" prop="tbsj">
			            <DatePicker type="date" v-model="sjwxhwzlForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showMtgmModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="sjwxhwzlLoading" @click="saveSjwxhwzl">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}仓储信息`" v-model="showCcxxphModel"  @on-visible-change="ccxxphModelChange">
			<div>
				<Form :model="ccxxphForm" ref="ccxxph" :rules="ccxxphRules" hide-required-mark label-position="left" :label-width="140">
					<FormItem label="堆场或者仓库名称" prop="dchzckmc">
			        	<Input clearable v-model="ccxxphForm.dchzckmc"></Input>
			        </FormItem>
			        <FormItem label="面积（㎡）" prop="mj">
			        	<InputNumber :min="0" v-model="ccxxphForm.mj"></InputNumber>
			        </FormItem>
			        <FormItem label="数量" prop="sl">
			        	<InputNumber :min="0" v-model="ccxxphForm.sl"></InputNumber>
			        </FormItem>
			        <FormItem label="货物名称" prop="hwmc">
			        	<Input clearable v-model="ccxxphForm.hwmc"></Input>
			        </FormItem>
			       <FormItem label="存储量（吨）" prop="ccl">
			        	<InputNumber :min="0" v-model="ccxxphForm.ccl"></InputNumber>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showMtgmModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="ccxxphLoading" @click="saveCcxxph">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}装卸设备`" v-model="showZxsbModel"  @on-visible-change="zxsbModelChange">
			<div>
				<Form :model="zxsbForm" ref="zxsb" :rules="zxsbRules" hide-required-mark label-position="left" :label-width="140">
					<FormItem label="起重机械名称" prop="qzjxmc">
			        	<Input clearable v-model="zxsbForm.qzjxmc"></Input>
			        </FormItem>
			        <FormItem label="吨位" prop="dw">
			        	<InputNumber :min="0" v-model="zxsbForm.dw"></InputNumber>
			        </FormItem>
			        <FormItem label="检验有效期" prop="jyyxq">
			        	<DatePicker type="date" v-model="zxsbForm.jyyxq"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showMtgmModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="zxsbLoading" @click="saveZxsb">保存</Button>
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
				showCcxxphModel: false,
				showZxsbModel: false,
				mtgmLoading: false,
				bwxxLoading: false,
				sjwxhwzlLoading: false,
				ccxxphLoading: false,
				zxsbLoading: false,
				modeType: '',
				modeType2: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					sjnzzl: 0,
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
                        title: '近1月日均周转量（吨）',
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
                        minWidth: 100
                    }, {
                        title: '靠泊吨级（DWT）',
                        key: 'kbdw',
                        minWidth: 160
                    }, {
                        title: '货物种类',
                        slot: 'wxhwzl',
                        minWidth: 100
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
				            return h('span',params.index + (this.ccssPage.pageIndex- 1) * this.ccssPage.pageSize + 1);
				        }
                    }, {
                        title: '储存设施单元名称',
                        key: 'ccssdymc',
                        minWidth: 100
                    }, {
                        title: '类型',
                        key: 'lx',
                        minWidth: 100
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
				sjwxhwzlColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.sjwxhwzlPage.pageIndex- 1) * this.sjwxhwzlPage.pageSize + 1);
				        }
                    }, {
                        title: '货物名称',
                        key: 'wxhwmc',
                        minWidth: 120
                    }, {
                        title: '最大年周转量（吨/年）',
                        key: 'zdnzzl',
                        minWidth: 200
                    }, {
                        title: '近1月日平均周转（吨）',
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
				ccxxphColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.ccxxphPage.pageIndex- 1) * this.ccxxphPage.pageSize + 1);
				        }
                    }, {
                        title: '堆场或者仓库名称',
                        key: 'dchzckmc',
                        minWidth: 160
                    }, {
                        title: '面积（㎡）',
                        key: 'mj',
                        minWidth: 120
                    }, {
                        title: '数量',
                        key: 'sl',
                        minWidth: 80
                    }, {
                        title: '货物名称',
                        key: 'hwmc',
                        minWidth: 100
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
				ccxxphData: [],
				ccxxphForm: {
					dchzckmc: '',
					mj: 0,
					sl: 0,
					hwmc: '',
					ccl: 0
				},
				ccxxphPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				zxsbColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.zxsbPage.pageIndex- 1) * this.zxsbPage.pageSize + 1);
				        }
                    }, {
                        title: '起重机械名称',
                        key: 'qzjxmc',
                        minWidth: 120
                    }, {
                        title: '吨位',
                        key: 'dw',
                        minWidth: 100
                    }, {
                        title: '检验有效期',
                        key: 'jyyxq',
                        minWidth: 120
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				zxsbData: [],
				zxsbForm: {
					qzjxmc: '',
					dw: 0,
					jyyxq: '',
				},
				zxsbPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				zxsbSum: {
					hjsl: 0, 
					zfznl: 0
		  		},
				form: {}
			}
		},
		watch: {

		},
		computed: {
			baseInfoRules() {
				return {
					sjnzzl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
				}
			},
			mtgmRules() {
				return {
					jyyrjzzl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					tbsj: [{ required: true, type: 'date', message: '请选择', trigger: 'change' }],
				}
			},
			bwxxRules() {
				return {
					bwmc: [{ required: true, message: '请输入', trigger: 'change' }],
					kbdw: [{ required: true, message: '请输入', trigger: 'change' }],
					sfkzyjzy: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
				}
			},
			sjwxhwzlRules() {
				return {
					wxhwmc: [{ required: true, message: '请输入', trigger: 'change' }],
					zdnzzl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					jyyrpjzz: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					tbsj: [{ required: true, type: 'date', message: '请选择', trigger: 'change' }],
				}
			},
			ccxxphRules() {
				return {
					dchzckmc: [{ required: true, message: '请输入', trigger: 'change' }],
					mj: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					sl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					hwmc: [{ required: true, message: '请输入', trigger: 'change' }],
					ccl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
				}
			},
			zxsbRules() {
				return {
					qzjxmc: [{ required: true, message: '请输入', trigger: 'change' }],
					dw: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					jyyxq: [{ required: true, type: 'date', message: '请选择', trigger: 'change' }],
				}
			},
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
				let ccxxphParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.ccxxphPage.pageSize,
					page: this.ccxxphPage.pageIndex,
				}
				let zxsbParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.zxsbPage.pageSize,
					page: this.zxsbPage.pageIndex,
				}
				Promise.all([api.getMtgmList(mtgmParams), api.getBwxxList(bwxxParams), api.getCcxxphList(ccxxphParams), api.getZxsbList(zxsbParams)]).then((result) => {
				  	let mtgmRes = result[0], bwxxRes = result[1], ccxxphRes = result[2], zxsbRes = result[3]
				  	if(mtgmRes.status_code == 200) {
				  		this.mtgmData = mtgmRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.mtgmPage.totalRow = mtgmRes.data.total
				  	}
				  	if(bwxxRes.status_code == 200) {
				  		this.bwxxData = bwxxRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.bwxxPage.totalRow = bwxxRes.data.total
				  	}
				  	if(ccxxphRes.status_code == 200) {
				  		this.ccxxphData = ccxxphRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.ccxxphPage.totalRow = ccxxphRes.data.total
				  	}
				  	if(zxsbRes.status_code == 200) {
				  		this.zxsbData = zxsbRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.zxsbPage.totalRow = zxsbRes.data.total
				  		this.zxsbSum.hjsl = zxsbRes.hjsl || 0
				  		this.zxsbSum.zfznl = zxsbRes.zfznl || 0
				  	}
				  	this.loading = false   
				}).catch((error) => {
				  	console.log(error)
				  	this.loading = false
				})
				let { status_code, data, message } = await api.getPhmtBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					this.baseInfo = { 
						sjnzzl: data.sjnzzl ? Number(data.sjnzzl) : 0,
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
					sjnzzl: this.baseInfo.sjnzzl
				}
				let { status_code, message } = await api.addPhmtBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
				}
			},
			async saveInfo2() {
				let params = {
					gkdx_id: this.gkdx_id,
					zdwxy: this.baseInfo.zdwxy,
				}
				let { status_code, message } = await api.addPhmtBase(params);
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
					this.$nextTick(() => {
						this.mtgmForm = {
							jyyrjzzl: 0,
							tbsj: '',
						}
						this.$refs.mtgm.resetFields();
					})
				}
			},
			async removeMtgm(row) {
				let { status_code } = await api.deleteMtgmInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getMtgmList()
			},
			async saveMtgm() {
				this.$refs.mtgm.validate(async valid => {
                    if (valid) {
                    	this.mtgmLoading = true
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
						this.mtgmLoading = false
                    }
                })
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
					this.$nextTick(() => {
						this.bwxxForm = {
							bwmc: '',
							kbdw: '',
							sfkzyjzy: 0,
						}
						this.$refs.bwxx.resetFields();
					})
					this.sjwxhwzlData = []
				}
			},
			async removeBwxx(row) {
				let { status_code } = await api.deleteBwxxInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getBwxxList()
			},
			async saveBwxx() {
				this.$refs.bwxx.validate(async valid => {
                    if (valid) {
                    	this.bwxxLoading = true
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
						this.bwxxLoading = false
                    }
                })
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
					wxhwmc: row.wxhwmc,
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
					this.$nextTick(() => {
						this.sjwxhwzlForm = {
							wxhwmc: '',
							zdnzzl: 0,
							jyyrpjzz: 0,
							tbsj: '',
						}
						this.$refs.sjwxhwzl.resetFields();
					})
				}
			},
			async saveSjwxhwzl() {
				this.$refs.sjwxhwzl.validate(async valid => {
                    if (valid) {
                    	this.sjwxhwzlLoading = true
						let sjwxhwzlForm = {...this.sjwxhwzlForm, tbsj: this.sjwxhwzlForm.tbsj ? getDate(new Date(this.sjwxhwzlForm.tbsj).getTime(), 'date') : '',}
						if(this.modeType2 == 2) {
							this.sjwxhwzlData.splice(this.sjwxhwzlId, 1, sjwxhwzlForm)
						}else {
							this.sjwxhwzlData.push(sjwxhwzlForm)
						}
						this.showSjwxhwzlModel = false
						this.sjwxhwzlLoading = false
                    }
                })
			},
			removeSjwxhwzl(index) {
				this.sjwxhwzlData.splice(index, 1)
			},
			handleChangeCcxxphPage(val) {
				this.ccxxphPage.pageIndex = val
				this.getCcxxphList()
			},
			handleChangeCcxxphPageSize(val) {
				this.ccxxphPage.pageSize = val
				this.getCcxxphList()
			},
			async getCcxxphList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.ccxxphPage.pageSize,
					page: this.ccxxphPage.pageIndex,
				}
				let { status_code, data } = await api.getCcxxphList(params)
				if(status_code == 200) {
					this.ccxxphData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.ccxxphPage.totalRow = data.total
				}
			},
			openCcxxphModel() {
				this.modeType = 1;
				this.showCcxxphModel = true
			},
			editCcxxphModel(row) {
				this.ccxxphForm = {
					dchzckmc: row.dchzckmc,
					mj: row.mj ? Number(row.mj) : 0,
					sl: row.sl ? Number(row.sl) : 0,
					hwmc: row.hwmc,
					ccl: row.ccl ? Number(row.ccl) : 0
				}
				this.id = row.id
				this.modeType = 2;
				this.showCcxxphModel = true
			},
			ccxxphModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.ccxxphForm = {
							dchzckmc: '',
							mj: 0,
							sl: 0,
							hwmc: '',
							ccl: 0
						}
						this.$refs.ccxxph.resetFields();
					})
				}
			},
			async removeCcxxph(row) {
				let { status_code } = await api.deleteCcxxphInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getCcxxphList()
			},
			async saveCcxxph() {
				this.$refs.ccxxph.validate(async valid => {
                    if (valid) {
                    	this.ccxxphLoading = true
						let params = {
							...this.ccxxphForm,
							gkdx_id: this.gkdx_id
						}
						delete params.lngAndLat
						if(this.modeType == 2) {
							params.id = this.id
						}
						let { status_code, message } = await api.addCcxxphInfo(params);
						if(status_code == 200) {
							this.$Message.success(message)
							this.showCcxxphModel = false
							this.getCcxxphList()
						}
						this.ccxxphLoading = false
                    }
                })
			},
			handleChangeZxsbPage(val) {
				this.zxsbPage.pageIndex = val
				this.getZxsbList()
			},
			handleChangeZxsbPageSize(val) {
				this.zxsbPage.pageSize = val
				this.getZxsbList()
			},
			async getZxsbList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.zxsbPage.pageSize,
					page: this.zxsbPage.pageIndex,
				}
				let res = await api.getZxsbList(params)
				let { status_code, data } = res
				if(status_code == 200) {
					this.zxsbData = data.data
					this.zxsbPage.totalRow = data.total
					this.zxsbSum.hjsl = res.hjsl
					this.zxsbSum.zfznl = res.zfznl
				}
			},
			openZxsbModel() {
				this.modeType = 1;
				this.showZxsbModel = true
			},
			editZxsbModel(row) {
				this.zxsbForm = {
					qzjxmc: row.qzjxmc,
					dw: row.dw ? Number(row.dw) : 0,
					jyyxq: row.jyyxq ? new Date(row.jyyxq) : '',
				}
				this.id = row.id
				this.modeType = 2;
				this.showZxsbModel = true
			},
			zxsbModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.zxsbForm = {
							qzjxmc: '',
							dw: 0,
							jyyxq: '',
						}
						this.$refs.zxsb.resetFields();
					})
				}
			},
			async removeZxsb(row) {
				let { status_code } = await api.deleteZxsbInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getZxsbList()
			},
			async saveZxsb() {
				this.$refs.zxsb.validate(async valid => {
                    if (valid) {
                    	this.zxsbLoading = true
						let params = {
							...this.zxsbForm,
							jyyxq: this.zxsbForm.jyyxq ? getDate(new Date(this.zxsbForm.jyyxq).getTime(), 'date') : '',
							gkdx_id: this.gkdx_id
						}
						delete params.lngAndLat
						if(this.modeType == 2) {
							params.id = this.id
						}
						let { status_code, message } = await api.addZxsbInfo(params);
						if(status_code == 200) {
							this.$Message.success(message)
							this.showZxsbModel = false
							this.getZxsbList()
						}
						this.zxsbLoading = false
                    }
                })
			},
		},
		created() {
			this.getBaseInfo()
      if(this.isDisEditInfo) {
        this.mtgmColumns.pop()
        this.bwxxColumns.pop()
        this.ccxxphColumns.pop()
        this.zxsbColumns.pop()
        this.sjwxhwzlColumns.pop()
      }
		},
		mounted() {
			this.$refs.xxx.onLoad();
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