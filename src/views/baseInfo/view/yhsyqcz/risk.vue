<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div v-show="step == 2">
			<Row type="flex" justify="center">
				<Col span="22">
					<div v-show="!isDisEditInfo" class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="储存信息" name="name1">
				        	<part-title text="储存信息" :btns="['add']" @add="openCpzModel" v-if="baseInfo.czlx == '储配站'"></part-title>
				        	<div style="margin-bottom: 16px;" v-if="baseInfo.czlx == '储配站'">
				        		<span>储罐数量：{{cpzSum.cgsl}}</span>
				        		<span style="margin-left:24px">储存总容积：{{cpzSum.cgzrj}}m³</span>
				        	</div>
							<Table :columns="cpzColumns" :data="cpzData" v-if="baseInfo.czlx == '储配站'">
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editCpzModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeCpz(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end" v-if="baseInfo.czlx == '储配站'">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="cpzPage.pageSize"
				                    :total="cpzPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeCpzPage"
				                    @on-page-size-change="handleChangeCpzPageSize"
				                />
							</Row>
				        	<part-title text="储存信息" :btns="['add']" @add="openGyzModel" v-if="baseInfo.czlx == '瓶装供应站'"></part-title>
				        	<div style="margin-bottom: 16px;" v-if="baseInfo.czlx == '瓶装供应站'">
				        		<span>储罐数量：{{cpzSum.cygsl}}</span>
				        		<span style="margin-left:24px">总容积：{{cpzSum.cygzrj}}m³</span>
				        	</div>
							<Table :columns="gyzColumns" :data="gyzData" v-if="baseInfo.czlx == '瓶装供应站'">
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editGyzModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeGyz(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end" v-if="baseInfo.czlx == '瓶装供应站'">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="gyzPage.pageSize"
				                    :total="gyzPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeGyzPage"
				                    @on-page-size-change="handleChangeGyzPageSize"
				                />
							</Row>
				        </TabPane>
				        <TabPane label="经营状况" name="name2">
				        	<part-title text="经营状况" :btns="['add']" @add="openJyzkModel"></part-title>
				        	<Form :disabled="isDisEditInfo" :model="baseInfo" label-position="left" style="width: 600px">
						        <FormItem label="设计年周转量（m³）" :label-width="180">
						        	<InputNumber :min="0" v-model="baseInfo.sjnzzl"></InputNumber>
						        </FormItem>
							</Form>
							<Table :columns="jyzkColumns" :data="jyzkData">
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editJyzkModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeJyzk(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="jyzkPage.pageSize"
				                    :total="jyzkPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeJyzkPage"
				                    @on-page-size-change="handleChangeJyzkPageSize"
				                />
							</Row>
							<Row v-show="!isDisEditInfo" type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo">完成</Button>
								</Col>
							</Row>
				        </TabPane>
				        <TabPane label="周边环境" name="name3">
				        	<part-title text="周边环境" :btns="['add']" @add="openRimModel"></part-title>
				        	<div style="margin-bottom: 16px;">说明：调查周边1000m范围</div>
							<Table :columns="rimColumns" :data="rimData">
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editRimModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeRim(row)">
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
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}储存信息`" v-model="showCpzModel" @on-visible-change="cpzModelChange">
			<div>
				<Form :model="cpzForm" label-position="left" :label-width="160">
					<FormItem label="储罐名称">
			        	<Input clearable v-model="cpzForm.cgmc"></Input>
			        </FormItem>
			        <FormItem label="容积(m³)">
			        	<InputNumber :min="0" v-model="cpzForm.rj"></InputNumber>
			        </FormItem>
			        <FormItem label="压力(Mpa)">
			        	<InputNumber :min="0" v-model="cpzForm.yl"></InputNumber>
			        </FormItem>
			        <FormItem label="温度(℃)">
			        	<InputNumber :min="0" v-model="cpzForm.wd"></InputNumber>
			        </FormItem>
			        <FormItem label="数量">
			        	<InputNumber :min="0" v-model="cpzForm.sl"></InputNumber>
			        </FormItem>
			        <FormItem label="备注">
			        	<Input clearable type="textarea" v-model="cpzForm.bz"></Input>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveCpz">保存</Button>
	        </div>
		</Modal>

		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}储存信息`" v-model="showGyzModel" @on-visible-change="gyzModelChange">
			<div>
				<Form :model="gyzForm" label-position="left" :label-width="150">
					<FormItem label="气瓶规格(L)">
			        	<InputNumber :min="0" v-model="gyzForm.qpgg"></InputNumber>
			        </FormItem>
			        <FormItem label="容积(m³)">
			        	<InputNumber :min="0" v-model="gyzForm.rj"></InputNumber>
			        </FormItem>
			        <FormItem label="压力(Mpa)">
			        	<InputNumber :min="0" v-model="gyzForm.yl"></InputNumber>
			        </FormItem>
			        <FormItem label="数量">
			        	<InputNumber :min="0" v-model="gyzForm.sl"></InputNumber>
			        </FormItem>
			        <FormItem label="备注">
			        	<Input clearable type="textarea" v-model="gyzForm.bz"></Input>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveGyz">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}经营状况`" v-model="showJyzkModel" @on-visible-change="jyzkModelChange">
			<div>
				<Form :model="jyzkForm" label-position="left" :label-width="160">
					<FormItem label="近5日日平均周转量(m³)">
			        	<InputNumber :min="0" v-model="jyzkForm.jrrpjzzl"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间">
			            <DatePicker type="date" v-model="jyzkForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveJyzk">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}周边环境`" v-model="showRimModel"  @on-visible-change="rimModelChange">
			<div>
				<Form :model="rimForm" label-position="left" :label-width="140">
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
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
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
				zaqId: '',
				cpz_id: '',	
				ccss_id: '',
				loading: true,
				step: 2,	
				showAreaModel: false,
				showLngModel: false,
				showCpzModel: false,
				showGyzModel: false,
				showJyzkModel: false,
				showRimModel: false,
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
                        minWidth: 110
                    }, {
                        title: 'CAS号',
                        key: 'cas',
                        minWidth: 110
                    }, {
                        title: '是否重点监管',
                        slot: 'sfzdjg',
                        minWidth: 120
                    }, {
                        title: '是否爆炸品',
                        slot: 'sfbzp',
                        minWidth: 110
                    }, {
                        title: '火灾风险等级',
                        key: 'hzwxxdj',
                        minWidth: 120
                    }, {
                        title: 'MSDS',
                        key: 'msds',
                        minWidth: 110
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
				cpzColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.cpzPage.pageIndex- 1) * this.cpzPage.pageSize + 1);
				        }
                    }, {
                        title: '储罐名称',
                        key: 'cgmc',
                        minWidth: 110
                    }, {
                        title: '容积(m³)',
                        key: 'rj',
                        minWidth: 110
                    }, {
                        title: '压力(Mpa)',
                        key: 'yl',
                        minWidth: 130
                    }, {
                        title: '温度(℃)',
                        key: 'wd',
                        minWidth: 110
                    }, {
                        title: '数量',
                        key: 'sl',
                        minWidth: 110
                    }, {
                        title: '备注',
                        key: 'bz',
                        minWidth: 110
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				cpzData: [],
				cpzForm: {
					cgmc: '',
					rj: 0,
					yl: 0,
					wd: 0,
					sl: 0,
					bz: ''
				},
				cpzPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				cpzNum: {
					gysl: 0,
					zyzrs: 0
				},
				cpzSum: {
					cgsl: 0,
		  			cgzrj: 0,
		  			cygsl: 0,
		  			cygzrj: 0
		  		},
				gyzColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.gyzPage.pageIndex- 1) * this.gyzPage.pageSize + 1);
				        }
                    }, {
                        title: '气瓶规格(L)',
                        key: 'qpgg',
                        minWidth: 120
                    }, {
                        title: '容积(m³)',
                        key: 'rj',
                        minWidth: 110
                    }, {
                        title: '压力(Mpa)',
                        key: 'yl',
                        minWidth: 120
                    }, {
                        title: '数量',
                        key: 'sl',
                        minWidth: 110
                    }, {
                        title: '备注',
                        key: 'bz',
                        minWidth: 110
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				gyzData: [],
				gyzForm: {
					qpgg: 0,
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
				            return h('span',params.index + (this.jyzkPage.pageIndex- 1) * this.jyzkPage.pageSize + 1);
				        }
                    }, {
                        title: '近5日日平均周转量(m³)',
                        key: 'jrrpjzzl',
                        minWidth: 200
                    }, {
                        title: '填报时间',
                        key: 'tbsj',
                        minWidth: 110
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
				            return h('span',params.index + (this.rimPage.pageIndex- 1) * this.rimPage.pageSize + 1);
				        }
                    }, {
                        title: '敏感目标名称',
                        key: 'mgmbmc',
                        minWidth: 120
                    }, {
                        title: '方位',
                        key: 'fw',
                        minWidth: 110
                    }, {
                        title: '目标类型',
                        key: 'mgmblx',
                        minWidth: 110
                    }, {
                        title: '人员数量',
                        key: 'rysl',
                        minWidth: 110
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

		},
		methods: {
			async getBaseInfo() {
				this.loading = true
				let cpzParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.cpzPage.pageSize,
					page: this.cpzPage.pageIndex,
				}
				let gyzParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.gyzPage.pageSize,
					page: this.gyzPage.pageIndex,
				}
				let jyzkParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.jyzkPage.pageSize,
					page: this.jyzkPage.pageIndex,
				}
				let rimParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.rimPage.pageSize,
					page: this.rimPage.pageIndex,
				}
				Promise.all([api.getCpzList(cpzParams), api.getGyzList(gyzParams), api.getJyzkList(jyzkParams), api.getRimList(rimParams)]).then((result) => {
				  	let cpzRes = result[0], gyzRes = result[1], jyzkRes = result[2], rimRes = result[3]
				  	if(cpzRes.status_code == 200) {
				  		this.cpzData = cpzRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.cpzPage.totalRow = cpzRes.data.total
				  		this.cpzSum.cgsl = cpzRes.cgsl || 0
				  		this.cpzSum.cgzrj = cpzRes.cgzrj || 0
				  	}
				  	if(gyzRes.status_code == 200) {
				  		this.gyzData = gyzRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.gyzPage.totalRow = gyzRes.data.total
				  		this.cpzSum.cygsl = gyzRes.cgsl || 0
				  		this.cpzSum.cygzrj = gyzRes.zrj || 0
				  	}
				  	if(jyzkRes.status_code == 200) {
				  		this.jyzkData = jyzkRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.jyzkPage.totalRow = jyzkRes.data.total
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
				let { status_code, data, message } = await api.getYhsyqczBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					this.baseInfo = { 
						czlx: data.czlx || '', 
						sjnzzl: data.sjnzzl ? Number(data.sjnzzl) : 0
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
			async saveInfo() {
				let params = {
					gkdx_id: this.gkdx_id,
					sjnzzl: this.baseInfo.sjnzzl,
				}
				let { status_code, message } = await api.addYhsyqczBase(params);
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
			handleChangeCpzPage(val) {
				this.cpzPage.pageIndex = val
				this.getCpzList()
			},
			handleChangeCpzPageSize(val) {
				this.cpzPage.pageSize = val
				this.getCpzList()
			},
			async getCpzList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.cpzPage.pageSize,
					page: this.cpzPage.pageIndex,
				}
				let res = await api.getCpzList(params)
				let { status_code, data } = res
				if(status_code == 200) {
					this.cpzData = data.data
					this.cpzPage.totalRow = data.total
					this.cpzSum.cgsl = res.cgsl
					this.cpzSum.cgzrj = res.cgzrj
				}
			},
			async openCpzModel() {
				this.modeType = 1;
				this.showCpzModel = true
			},
			async editCpzModel(row) {
				this.cpzForm = {
					cgmc: row.cgmc,
					rj: row.rj ? Number(row.rj) : 0,
					yl: row.yl ? Number(row.yl) : 0,
					wd: row.wd ? Number(row.wd) : 0,
					sl: row.sl ? Number(row.sl) : 0,
					bz: row.bz,
				}
				this.id = row.id
				this.modeType = 2;
				this.showCpzModel = true
			},
			cpzModelChange(status) {
				if(!status) {
					this.cpzForm = {
						cgmc: '',
						rj: 0,
						yl: 0,
						wd: 0,
						sl: 0,
						bz: ''
					}
				}
			},
			async removeCpz(row) {
				let { status_code } = await api.deleteCpzInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getCpzList()
			},
			async saveCpz() {
				let params = {
					...this.cpzForm,
					tysj: this.cpzForm.tysj ? getDate(new Date(this.cpzForm.tysj).getTime(), 'date') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addCpzInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showCpzModel = false
					this.getCpzList()
				}
			},
			handleChangeGyzPage(val) {
				this.gyzPage.pageIndex = val
				this.getGyzList()
			},
			handleChangeGyzPageSize(val) {
				this.gyzPage.pageSize = val
				this.getGyzList()
			},
			async getGyzList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.gyzPage.pageSize,
					page: this.gyzPage.pageIndex,
				}
				let res = await api.getGyzList(params)
				let { status_code, data } = res
				if(status_code == 200) {
					this.gyzData = data.data
					this.gyzPage.totalRow = data.total
					this.cpzSum.cygsl = res.cgsl
					this.cpzSum.cygzrj = res.zrj
					console.log(res.cgsl, res.zrj)
				}
			},
			openGyzModel() {
				this.modeType = 1;
				this.showGyzModel = true
			},
			editGyzModel(row) {
				this.gyzForm = {
					qpgg: row.qpgg ? Number(row.qpgg) : 0,
					rj: row.rj ? Number(row.rj) : 0,
					yl: row.yl ? Number(row.yl) : 0,
					sl: row.sl ? Number(row.sl) : 0,
					bz: row.bz
				}
				this.id = row.id
				this.modeType = 2;
				this.showGyzModel = true
			},
			gyzModelChange(status) {
				if(!status) {
					this.gyzForm = {
						qpgg: 0,
						rj: 0,
						yl: 0,
						sl: 0,
						bz: '',
					}
				}
			},
			async removeGyz(row) {
				let { status_code } = await api.deleteGyzInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getGyzList()
			},
			async saveGyz() {
				let params = {
					...this.gyzForm,
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addGyzInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showGyzModel = false
					this.getGyzList()
				}
			},
			handleChangeJyzkPage(val) {
				this.jyzkPage.pageIndex = val
				this.getJyzkList()
			},
			handleChangeJyzkPageSize(val) {
				this.jyzkPage.pageSize = val
				this.getJyzkList()
			},
			async getJyzkList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.jyzkPage.pageSize,
					page: this.jyzkPage.pageIndex,
				}
				let { status_code, data } = await api.getJyzkList(params)
				if(status_code == 200) {
					this.jyzkData = data.data
					this.jyzkPage.totalRow = data.total
				}
			},
			openJyzkModel() {
				this.modeType = 1;
				this.showJyzkModel = true
			},
			editJyzkModel(row) {
				this.jyzkForm = {
					jrrpjzzl: row.jrrpjzzl ? Number(row.jrrpjzzl) : 0,
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.id = row.id
				this.modeType = 2;
				this.showJyzkModel = true
			},
			jyzkModelChange(status) {
				if(!status) {
					this.jyzkForm = {
						jrrpjzzl: 0,
						tbsj: '',
					}
				}
			},
			async removeJyzk(row) {
				let { status_code } = await api.deleteJyzkInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getJyzkList()
			},
			async saveJyzk() {
				let params = {
					...this.jyzkForm,
					tbsj: this.jyzkForm.tbsj ? getDate(new Date(this.jyzkForm.tbsj).getTime(), 'year') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addJyzkInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showJyzkModel = false
					this.getJyzkList()
				}
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
						qyfw: ''
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
        this.cpzColumns.pop()
        this.gyzColumns.pop()
        this.jyzkColumns.pop()
        this.rimColumns.pop()
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