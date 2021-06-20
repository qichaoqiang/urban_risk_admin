<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div v-show="step == 2" style="height: 100%">
			<Row type="flex" justify="center" style="height: 100%">
				<Col span="22">
					<div v-show="!isDisEditInfo" class="title">请完善风险信息</div>
					<Tabs value="name1">
						<TabPane label="位置信息" name="name1">
				        	<part-title text="位置信息"></part-title>
							<Form :disabled="isDisEditInfo" :model="baseInfo" ref="baseInfo1" :rules="baseInfoRules" hide-required-mark label-position="left" :label-width="140" style="width: 600px">
					        	<FormItem label="经营楼层" prop="jylc">
						        	<Select clearable multiple :transfer="true" v-model="baseInfo.jylc" placeholder="请选择">
						                <Option v-for="item in jylcList" :key="item" :value="item">{{item}}</Option>
						            </Select>
						        </FormItem>
						    </Form>
						    <Row v-show="!isDisEditInfo" type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo1">完成</Button>
								</Col>
							</Row>
				        </TabPane>
				        <TabPane label="人流信息" name="name2">
				        	<part-title text="人流信息" :btns="['add']" @add="openRlxxModel"></part-title>
							<Table :columns="rlxxColumns" :data="rlxxData">
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editRlxxModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeRlxx(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="rlxxPage.pageSize"
				                    :total="rlxxPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeRlxxPage"
				                    @on-page-size-change="handleChangeRlxxPageSize"
				                />
							</Row>
				        </TabPane>
				        <TabPane label="燃料信息" name="name3">
			        		<part-title text="燃料信息" :btns="['add']" @add="openCjrlModel" v-if="baseInfo.zyrllx == '醇基燃料'"></part-title>
			        		<part-title text="燃料信息" :btns="['add']" @add="openGdtrqModel" v-if="baseInfo.zyrllx == '管道天然气'"></part-title>
			        		<part-title text="燃料信息" :btns="['add']" @add="openYhsyqModel" v-if="baseInfo.zyrllx == '液化石油气'"></part-title>
				        	<part-title text="燃料信息" :btns="['add']" @add="openElseModel" v-if="baseInfo.zyrllx == '其他'"></part-title>
			        		<Form :disabled="isDisEditInfo" :model="baseInfo" ref="baseInfo2" :rules="baseInfoRules" hide-required-mark label-position="left" :label-width="120" style="width: 600px">
			        			<FormItem label="主要燃料类型" prop="zyrllx">
						        	<Select :transfer="true" clearable v-model="baseInfo.zyrllx" placeholder="主要燃料类型">
						                <Option v-for="item in zyrllxList" :key="item" :value="item">{{item}}</Option>
						            </Select>
						        </FormItem>
					        	<FormItem label="燃料供应单位：" prop="rlgydw" v-if="baseInfo.zyrllx == '醇基燃料'">
						        	<Input clearable v-model="baseInfo.rlgydw" style="width: 160px"></Input>
						        </FormItem>
						        <FormItem label="供应单位危险化学品生产或经营许可证：" :label-width="270" prop="gydwxkz" v-if="baseInfo.zyrllx == '醇基燃料'">
						        	<Input clearable v-model="baseInfo.gydwxkz" style="width: 160px"></Input>
						        </FormItem>
					        	<FormItem label="燃气供应单位：" prop="rqgydw" v-if="baseInfo.zyrllx == '液化石油气'">
						        	<Input clearable v-model="baseInfo.rqgydw"></Input>
						        </FormItem>
						        <FormItem label="燃料名称：" prop="rlmc" v-if="baseInfo.zyrllx == '其他'">
						        	<Input clearable v-model="baseInfo.rlmc" style="width: 160px"></Input>
						        </FormItem>
						    </Form>
				        	<div v-if="baseInfo.zyrllx == '管道天然气'">
								<Table :columns="gdtrqColumns" :data="gdtrqData">
									<template slot-scope="{ row }" slot="action">
							            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editGdtrqModel(row)">编辑</Button>
							            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeGdtrq(row)">
									        <Button type="error" size="small" ghost>删除</Button>
									    </Poptip>
							        </template>
								</Table>
								<Row type="flex" justify="end">
									<Page
					                    size="small"
					                    style="margin-top: 10px"
					                    :page-size="gdtrqPage.pageSize"
					                    :total="gdtrqPage.totalRow"
					                    show-elevator
					                    show-total
					                    show-sizer
					                    @on-change="handleChangeGdtrqPage"
					                    @on-page-size-change="handleChangeGdtrqPageSize"
					                />
								</Row>
							    <Row v-show="!isDisEditInfo" type="flex" justify="center" style="margin-top: 24px">
									<Col>
										<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo2">完成</Button>
									</Col>
								</Row>
				        	</div>
				        	<div v-if="baseInfo.zyrllx == '液化石油气'">
								<Table :columns="yhsyqColumns" :data="yhsyqData">
									<template slot-scope="{ row }" slot="action">
							            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editYhsyqModel(row)">编辑</Button>
							            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeYhsyq(row)">
									        <Button type="error" size="small" ghost>删除</Button>
									    </Poptip>
							        </template>
								</Table>
								<Row type="flex" justify="end">
									<Page
					                    size="small"
					                    style="margin-top: 10px"
					                    :page-size="yhsyqPage.pageSize"
					                    :total="yhsyqPage.totalRow"
					                    show-elevator
					                    show-total
					                    show-sizer
					                    @on-change="handleChangeYhsyqPage"
					                    @on-page-size-change="handleChangeYhsyqPageSize"
					                />
								</Row>
							    <Row v-show="!isDisEditInfo" type="flex" justify="center" style="margin-top: 24px">
									<Col>
										<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo3">完成</Button>
									</Col>
								</Row>
				        	</div>
				        	<div v-if="baseInfo.zyrllx == '醇基燃料'">
								<Table :columns="cjrlColumns" :data="cjrlData">
									<template slot-scope="{ row }" slot="action">
							            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editCjrlModel(row)">编辑</Button>
							            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeCjrl(row)">
									        <Button type="error" size="small" ghost>删除</Button>
									    </Poptip>
							        </template>
								</Table>
								<Row type="flex" justify="end">
									<Page
					                    size="small"
					                    style="margin-top: 10px"
					                    :page-size="cjrlPage.pageSize"
					                    :total="cjrlPage.totalRow"
					                    show-elevator
					                    show-total
					                    show-sizer
					                    @on-change="handleChangeCjrlPage"
					                    @on-page-size-change="handleChangeCjrlPageSize"
					                />
								</Row>
								<Row v-show="!isDisEditInfo" type="flex" justify="center" style="margin-top: 24px">
									<Col>
										<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo4">完成</Button>
									</Col>
								</Row>
				        	</div>
				        	<div v-if="baseInfo.zyrllx == '其他'">
								<Table :columns="elseColumns" :data="elseData">
									<template slot-scope="{ row }" slot="action">
							            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editElseModel(row)">编辑</Button>
							            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeElse(row)">
									        <Button type="error" size="small" ghost>删除</Button>
									    </Poptip>
							        </template>
								</Table>
								<Row type="flex" justify="end">
									<Page
					                    size="small"
					                    style="margin-top: 10px"
					                    :page-size="elsePage.pageSize"
					                    :total="elsePage.totalRow"
					                    show-elevator
					                    show-total
					                    show-sizer
					                    @on-change="handleChangeElsePage"
					                    @on-page-size-change="handleChangeElsePageSize"
					                />
								</Row>
								<Row v-show="!isDisEditInfo" type="flex" justify="center" style="margin-top: 24px">
									<Col>
										<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo5">完成</Button>
									</Col>
								</Row>
				        	</div>
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
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}人流信息`" v-model="showRlxxModel" @on-visible-change="rlxxModelChange">
			<div>
				<Form :model="rlxxForm" ref="rlxx" :rules="rlxxRules" hide-required-mark label-position="left" :label-width="200">
			        <FormItem label="近一个月的日平均就餐人数" prop="jygydrpjjcrs">
			        	<InputNumber :min="0" v-model="rlxxForm.jygydrpjjcrs"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间" prop="tbsj">
			            <DatePicker type="date" v-model="rlxxForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showRlxxModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="rlxxLoading" @click="saveRlxx">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}燃料信息`" v-model="showGdtrqModel" @on-visible-change="gdtrqModelChange">
			<div>
				<Form :model="gdtrqForm" ref="gdtrq" :rules="gdtrqRules" hide-required-mark label-position="left" :label-width="180">
					<FormItem label="近一月用气量（立方/月）" prop="jyyyql">
			        	<InputNumber :min="0" v-model="gdtrqForm.jyyyql"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间" prop="tbsj">
			            <DatePicker type="date" v-model="gdtrqForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showRlxxModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="gdtrqLoading" @click="saveGdtrq">保存</Button>
	        </div>
		</Modal>

		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}燃料信息`" v-model="showYhsyqModel" @on-visible-change="yhsyqModelChange">
			<div>
				<Form :model="yhsyqForm" ref="yhsyq" :rules="yhsyqRules" hide-required-mark label-position="left" :label-width="140">
					<FormItem label="钢瓶规格（L）" prop="gpgg">
			        	<InputNumber :min="0" v-model="yhsyqForm.gpgg"></InputNumber>
			        </FormItem>
			        <FormItem label="数量" prop="sl">
			            <InputNumber :min="0" v-model="yhsyqForm.sl"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间" prop="tbsj">
			            <DatePicker type="date" v-model="yhsyqForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showRlxxModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="yhsyqLoading" @click="saveYhsyq">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}燃料信息`" v-model="showCjrlModel"  @on-visible-change="cjrlModelChange">
			<div>
				<Form :model="cjrlForm" ref="cjrl" :rules="cjrlRules" hide-required-mark label-position="left" :label-width="180">
					<FormItem label="近一月使用量（kg/月）" prop="jyysyl">
			        	<InputNumber :min="0" v-model="cjrlForm.jyysyl"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间" prop="tbsj">
			            <DatePicker type="date" v-model="cjrlForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showRlxxModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="cjrlLoading" @click="saveCjrl">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}燃料信息`" v-model="showElseModel"  @on-visible-change="elseModelChange">
			<div>
				<Form :model="elseForm" ref="else" :rules="elseRules" hide-required-mark label-position="left" :label-width="180">
					<FormItem label="近一月使用量（kg/月）" prop="jyysyl">
			        	<InputNumber :min="0" v-model="elseForm.jyysyl"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间" prop="tbsj">
			            <DatePicker type="date" v-model="elseForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showRlxxModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="elseLoading" @click="saveElse">保存</Button>
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
				gdtrq_id: '',	
				ccss_id: '',
				loading: true,
				step: 2,	
				showAreaModel: false,
				showLngModel: false,
				showRlxxModel: false,
				showGdtrqModel: false,
				showYhsyqModel: false,
				showCjrlModel: false,
				showElseModel: false,
				rlxxLoading: false,
				gdtrqLoading: false,
				yhsyqLoading: false,
				cjrlLoading: false,
				elseLoading: false,
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
				jylcList: ['-3', '-2', '-1', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32'],
				zyrllxList: ['管道天然气', '液化石油气', '醇基燃料', '其他'],
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
				rlxxColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.rlxxPage.pageIndex- 1) * this.rlxxPage.pageSize + 1);
				        },
                    }, {
                        title: '近一个月的日平均就餐人数',
                        key: 'jygydrpjjcrs',
                        minWidth: 200,
                    }, {
                        title: '填报时间',
                        key: 'tbsj',
                        minWidth: 100,
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				rlxxData: [],
				rlxxForm: {
					jygydrpjjcrs: 0,
					tbsj: '',
				},
				rlxxPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				hzwxxdjList: ['甲', '乙', '丙', '丁', '戊'],
				hxpztList: ['气体', '液化气体', '液体', '固体'],
				nzzldwList: ['吨', '立方', 'KG', 'L'],
				sxflList: ['最终产品', '中间产品', '原料'],
				dqztList: ['运行', '停运', '检修'],
				gdtrqColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.gdtrqPage.pageIndex- 1) * this.gdtrqPage.pageSize + 1);
				        },
                    }, {
                        title: '近一月用气量（立方/月）',
                        key: 'jyyyql',
                        minWidth: 100,
                    }, {
                        title: '填报时间',
                        key: 'tbsj',
                        minWidth: 100,
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				gdtrqData: [],
				gdtrqForm: {
					jyyyql: 0,
					tbsj: '',
				},
				ksldzzList: [
					{
						value: 0,
						name: '无'
					}, {
						value: 1,
						name: '有'
					}
				],
				gdtrqPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				gdtrqNum: {
					gysl: 0,
					zyzrs: 0
				},
				yhsyqColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.yhsyqPage.pageIndex- 1) * this.yhsyqPage.pageSize + 1);
				        },
                    }, {
                        title: '钢瓶规格（L）',
                        key: 'gpgg',
                        minWidth: 120,
                    }, {
                        title: '数量',
                        key: 'sl',
                        minWidth: 60,
                    }, {
                        title: '填报时间',
                        key: 'tbsj',
                        minWidth: 100,
                    },{
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				yhsyqData: [],
				yhsyqForm: {
					gpgg: 0,
					sl: 0,
					tbsj: '',
				},
				yhsyqPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				cjrlColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.cjrlPage.pageIndex- 1) * this.cjrlPage.pageSize + 1);
				        },
                    }, {
                        title: '近一月使用量（kg/月）',
                        key: 'jyysyl',
                        minWidth: 100,
                    }, {
                        title: '填报时间',
                        key: 'tbsj',
                        minWidth: 100,
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				cjrlData: [],
				cjrlForm: {
					jyysyl: 0,
					tbsj: '',
				},
				cjrlPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				elseColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.elsePage.pageIndex- 1) * this.elsePage.pageSize + 1);
				        },
                    }, {
                        title: '近一月使用量（kg/月）',
                        key: 'jyysyl',
                        minWidth: 100,
                    }, {
                        title: '填报时间',
                        key: 'tbsj',
                        minWidth: 100,
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				elseData: [],
				elseForm: {
					jyysyl: 0,
					tbsj: '',
				},
				elsePage: {
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
					jylc: [{ required: true, type: 'array', message: '请选择', trigger: 'change' }],
					zyrllx: [{ required: true, message: '请输入', trigger: 'change' }],
					rqgydw: [{ required: true, message: '请输入', trigger: 'change' }],
					rlgydw: [{ required: true, message: '请选择', trigger: 'change' }],
					gydwxkz: [{ required: true, message: '请选择', trigger: 'change' }],
					rlmc: [{ required: true, message: '请输入', trigger: 'change' }],
				}
			},
			rlxxRules() {
				return {
					jygydrpjjcrs: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					tbsj: [{ required: true, type: 'date', message: '请选择', trigger: 'change' }],
				}
			},
			gdtrqRules() {
				return {
					jyyyql: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					tbsj: [{ required: true, type: 'date', message: '请选择', trigger: 'change' }],
				}
			},
			yhsyqRules() {
				return {
					gpgg: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					sl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					tbsj: [{ required: true, type: 'date', message: '请选择', trigger: 'change' }],
				}
			},
			cjrlRules() {
				return {
					jyysyl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					tbsj: [{ required: true, type: 'date', message: '请选择', trigger: 'change' }],
				}
			},
			elseRules() {
				return {
					jyysyl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					tbsj: [{ required: true, type: 'date', message: '请选择', trigger: 'change' }],
				}
			},
		},
		methods: {
			async getBaseInfo() {
				this.loading = true
				let rlxxParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.rlxxPage.pageSize,
					page: this.rlxxPage.pageIndex,
				}
				let gdtrqParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.gdtrqPage.pageSize,
					page: this.gdtrqPage.pageIndex,
				}
				let yhsyqParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.yhsyqPage.pageSize,
					page: this.yhsyqPage.pageIndex,
				}
				let cjrlParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.cjrlPage.pageSize,
					page: this.cjrlPage.pageIndex,
				}
				let elseParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.elsePage.pageSize,
					page: this.elsePage.pageIndex,
				}
				Promise.all([api.getRlxxList(rlxxParams), api.getGdtrqList(gdtrqParams), api.getYhsyqList(yhsyqParams), api.getCjrlList(cjrlParams), api.getElseList(cjrlParams)]).then((result) => {
				  	let rlxxRes = result[0], gdtrqRes = result[1], yhsyqRes = result[2], cjrlRes = result[3], elseRes = result[4]
				  	if(rlxxRes.status_code == 200) {
				  		this.rlxxData = rlxxRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.rlxxPage.totalRow = rlxxRes.data.total
				  	}
				  	if(gdtrqRes.status_code == 200) {
				  		this.gdtrqData = gdtrqRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.gdtrqPage.totalRow = gdtrqRes.data.total
				  	}
				  	if(yhsyqRes.status_code == 200) {
				  		this.yhsyqData = yhsyqRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.yhsyqPage.totalRow = yhsyqRes.data.total
				  	}
				  	if(cjrlRes.status_code == 200) {
				  		this.cjrlData = cjrlRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.cjrlPage.totalRow = cjrlRes.data.total
				  	}
				  	if(elseRes.status_code == 200) {
				  		this.elseData = elseRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.elsePage.totalRow = elseRes.data.total
				  	}
				  	this.loading = false   
				}).catch((error) => {
				  	this.loading = false
				})
				let { status_code, data, message } = await api.getCycsBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					this.baseInfo = { 
						jylc: data.jylc ? data.jylc.split(',') : [], 
						zyrllx: data.zyrllx, 
						rqgydw: data.rqgydw, 
						rlgydw: data.rlgydw, 
						gydwxkz: data.gydwxkz, 
						rlmc: data.rlmc 
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
				this.$refs.baseInfo1.validate(async valid => {
                    if (valid) {
                        let params = {
							gkdx_id: this.gkdx_id,
							jylc: this.baseInfo.jylc.join(',')
						}
						let { status_code, message } = await api.addCycsBase(params);
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
							zyrllx: this.baseInfo.zyrllx
						}
						let { status_code, message } = await api.addCycsBase(params);
						if(status_code == 200) {
							this.$Message.success('保存成功')
						}
                    }
                })
			},
			async saveInfo3() {
				this.$refs.baseInfo2.validate(async valid => {
                    if (valid) {
						let params = {
							gkdx_id: this.gkdx_id,
							rqgydw: this.baseInfo.rqgydw,
							zyrllx: this.baseInfo.zyrllx
						}
						let { status_code, message } = await api.addCycsBase(params);
						if(status_code == 200) {
							this.$Message.success('保存成功')
						}
                    }
                })
			},
			async saveInfo4() {
				this.$refs.baseInfo2.validate(async valid => {
                    if (valid) {
						let params = {
							gkdx_id: this.gkdx_id,
							rlgydw: this.baseInfo.rlgydw,
							gydwxkz: this.baseInfo.gydwxkz,
							zyrllx: this.baseInfo.zyrllx
						}
						let { status_code, message } = await api.addCycsBase(params);
						if(status_code == 200) {
							this.$Message.success('保存成功')
						}
                    }
                })
			},
			async saveInfo5() {
				this.$refs.baseInfo2.validate(async valid => {
                    if (valid) {
                        let params = {
							gkdx_id: this.gkdx_id,
							rlmc: this.baseInfo.rlmc,
							zyrllx: this.baseInfo.zyrllx
						}
						let { status_code, message } = await api.addCycsBase(params);
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
			async getRlxxList_() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: 1000,
					page: this.rlxxPage.pageIndex,
				}
				let { status_code, data } = await api.getRlxxList(params)
				if(status_code == 200) {
					this.rlxxList = data.data
				}
			},
			handleChangeRlxxPage(val) {
				this.rlxxPage.pageIndex = val
				this.getRlxxList()
			},
			handleChangeRlxxPageSize(val) {
				this.rlxxPage.pageSize = val
				this.getRlxxList()
			},
			async getRlxxList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.rlxxPage.pageSize,
					page: this.rlxxPage.pageIndex,
				}
				let { status_code, data } = await api.getRlxxList(params)
				if(status_code == 200) {
					this.rlxxData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.rlxxPage.totalRow = data.total
				}
			},
			openRlxxModel() {
				this.modeType = 1;
				this.showRlxxModel = true
			},
			editRlxxModel(row) {
				this.rlxxForm = {
					jygydrpjjcrs: row.jygydrpjjcrs ? Number(row.jygydrpjjcrs) : 0,
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.id = row.id
				this.modeType = 2;
				this.showRlxxModel = true
			},
			rlxxModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.rlxxForm = {
							jygydrpjjcrs: 0,
							tbsj: '',
						}
						this.$refs.rlxx.resetFields();
					})
				}
			},
			async removeRlxx(row) {
				let { status_code } = await api.deleteRlxxInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getRlxxList()
			},
			async saveRlxx() {
				this.$refs.rlxx.validate(async valid => {
                    if (valid) {
                    	this.rlxxLoading = true
						let params = {
							...this.rlxxForm,
							tbsj: this.rlxxForm.tbsj ? getDate(new Date(this.rlxxForm.tbsj).getTime(), 'year') : '',
							gkdx_id: this.gkdx_id
						}
						if(this.modeType == 2) {
							params.id = this.id
						}
						let { status_code, message } = await api.addRlxxInfo(params);
						if(status_code == 200) {
							this.$Message.success(message)
							this.showRlxxModel = false
							this.getRlxxList()
						}
						this.rlxxLoading = false
                    }
                })
			},
			handleChangeGdtrqPage(val) {
				this.gdtrqPage.pageIndex = val
				this.getGdtrqList()
			},
			handleChangeGdtrqPageSize(val) {
				this.gdtrqPage.pageSize = val
				this.getGdtrqList()
			},
			async getGdtrqList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.gdtrqPage.pageSize,
					page: this.gdtrqPage.pageIndex,
				}
				let { status_code, data } = await api.getGdtrqList(params)
				if(status_code == 200) {
					this.gdtrqData = data.data
					this.gdtrqPage.totalRow = data.total
				}
			},
			async openGdtrqModel() {
				this.modeType = 1;
				this.showGdtrqModel = true
			},
			async editGdtrqModel(row) {
				this.gdtrqForm = {
					jyyyql: row.jyyyql ? Number(row.jyyyql) : 0,
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.id = row.id
				this.modeType = 2;
				this.showGdtrqModel = true
			},
			gdtrqModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.gdtrqForm = {
							jyyyql: 0,
							tbsj: '',
						}
						this.$refs.gdtrq.resetFields();
					})
				}
			},
			async removeGdtrq(row) {
				let { status_code } = await api.deleteGdtrqInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getGdtrqList()
			},
			async saveGdtrq() {
				this.$refs.gdtrq.validate(async valid => {
                    if (valid) {
                    	this.gdtrqLoading = true
						let params = {
							...this.gdtrqForm,
							tbsj: this.gdtrqForm.tbsj ? getDate(new Date(this.gdtrqForm.tbsj).getTime(), 'year') : '',
							gkdx_id: this.gkdx_id
						}
						delete params.isWxgy
						delete params.lngAndLat
						if(this.modeType == 2) {
							params.id = this.id
						}
						let { status_code, message } = await api.addGdtrqInfo(params);
						if(status_code == 200) {
							this.$Message.success(message)
							this.showGdtrqModel = false
							this.getGdtrqList()
						}
							this.gdtrqLoading = false
                    }
                })
			},
			handleChangeYhsyqPage(val) {
				this.yhsyqPage.pageIndex = val
				this.getYhsyqList()
			},
			handleChangeYhsyqPageSize(val) {
				this.yhsyqPage.pageSize = val
				this.getYhsyqList()
			},
			async getYhsyqList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.yhsyqPage.pageSize,
					page: this.yhsyqPage.pageIndex,
				}
				let { status_code, data } = await api.getYhsyqList(params)
				if(status_code == 200) {
					this.yhsyqData = data.data
					this.yhsyqPage.totalRow = data.total
				}
			},
			openYhsyqModel() {
				this.modeType = 1;
				this.showYhsyqModel = true
			},
			editYhsyqModel(row) {
				this.yhsyqForm = {
					gpgg: row.gpgg ? Number(row.gpgg) : 0,
					sl: row.sl ? Number(row.sl) : 0,
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.id = row.id
				this.modeType = 2;
				this.showYhsyqModel = true
			},
			yhsyqModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.yhsyqForm = {
							gpgg: 0,
							sl: 0,
							tbsj: '',
						}
						this.$refs.yhsyq.resetFields();
					})
				}
			},
			async removeYhsyq(row) {
				let { status_code } = await api.deleteYhsyqInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getYhsyqList()
			},
			async saveYhsyq() {
				this.$refs.yhsyq.validate(async valid => {
                    if (valid) {
                    	this.yhsyqLoading = true
						let params = {
							...this.yhsyqForm,
							tbsj: this.yhsyqForm.tbsj ? getDate(new Date(this.yhsyqForm.tbsj).getTime(), 'year') : '',
							gkdx_id: this.gkdx_id
						}
						if(this.modeType == 2) {
							params.id = this.id
						}
						let { status_code, message } = await api.addYhsyqInfo(params);
						if(status_code == 200) {
							this.$Message.success(message)
							this.showYhsyqModel = false
							this.getYhsyqList()
						}
							this.yhsyqLoading = false
                    }
                })
			},
			handleChangeCjrlPage(val) {
				this.cjrlPage.pageIndex = val
				this.getCjrlList()
			},
			handleChangeCjrlPageSize(val) {
				this.cjrlPage.pageSize = val
				this.getCjrlList()
			},
			async getCjrlList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.cjrlPage.pageSize,
					page: this.cjrlPage.pageIndex,
				}
				let { status_code, data } = await api.getCjrlList(params)
				if(status_code == 200) {
					this.cjrlData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.cjrlPage.totalRow = data.total
				}
			},
			openCjrlModel() {
				this.modeType = 1;
				this.showCjrlModel = true
			},
			editCjrlModel(row) {
				this.cjrlForm = {
					jyysyl: row.jyysyl ? Number(row.jyysyl) : 0,
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.id = row.id
				this.modeType = 2;
				this.showCjrlModel = true
			},
			cjrlModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.cjrlForm = {
							jyysyl: 0,
							tbsj: '',
						}
						this.$refs.cjrl.resetFields();
					})
				}
			},
			async removeCjrl(row) {
				let { status_code } = await api.deleteCjrlInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getCjrlList()
			},
			async saveCjrl() {
				this.$refs.cjrl.validate(async valid => {
                    if (valid) {
                    	this.cjrlLoading = true
						let params = {
							...this.cjrlForm,
							tbsj: this.cjrlForm.tbsj ? getDate(new Date(this.cjrlForm.tbsj).getTime(), 'year') : '',
							gkdx_id: this.gkdx_id
						}
						if(this.modeType == 2) {
							params.id = this.id
						}
						let { status_code, message } = await api.addCjrlInfo(params);
						if(status_code == 200) {
							this.$Message.success(message)
							this.showCjrlModel = false
							this.getCjrlList()
						}
							this.cjrlLoading = false
                    }
                })
			},
			handleChangeElsePage(val) {
				this.elsePage.pageIndex = val
				this.getElseList()
			},
			handleChangeElsePageSize(val) {
				this.elsePage.pageSize = val
				this.getElseList()
			},
			async getElseList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.elsePage.pageSize,
					page: this.elsePage.pageIndex,
				}
				let { status_code, data } = await api.getElseList(params)
				if(status_code == 200) {
					this.elseData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.elsePage.totalRow = data.total
				}
			},
			openElseModel() {
				this.modeType = 1;
				this.showElseModel = true
			},
			editElseModel(row) {
				this.elseForm = {
					jyysyl: row.jyysyl ? Number(row.jyysyl) : 0,
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.id = row.id
				this.modeType = 2;
				this.showElseModel = true
			},
			elseModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.elseForm = {
							jyysyl: 0,
							tbsj: '',
						}
						this.$refs.else.resetFields();
					})
				}
			},
			async removeElse(row) {
				let { status_code } = await api.deleteElseInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getElseList()
			},
			async saveElse() {
				this.$refs.else.validate(async valid => {
                    if (valid) {
                    	this.elseLoading = true
						let params = {
							...this.elseForm,
							tbsj: this.elseForm.tbsj ? getDate(new Date(this.elseForm.tbsj).getTime(), 'year') : '',
							gkdx_id: this.gkdx_id
						}
						if(this.modeType == 2) {
							params.id = this.id
						}
						let { status_code, message } = await api.addElseInfo(params);
						if(status_code == 200) {
							this.$Message.success(message)
							this.showElseModel = false
							this.getElseList()
						}
							this.elseLoading = false
                    }
                })
			},
		},
		created() {
			this.getBaseInfo()
      if(this.isDisEditInfo) {
        this.rlxxColumns.pop()
        this.gdtrqColumns.pop()
        this.yhsyqColumns.pop()
        this.cjrlColumns.pop()
        this.elseColumns.pop()
      }
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;
		margin-bottom: 24px;
		.line {
			width: 100%;
			height: 10px;
			background: #f5f5f5;
		}
	}
</style>