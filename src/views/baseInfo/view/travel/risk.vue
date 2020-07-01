<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div>
			<Row type="flex" justify="center">
				<Col span="22">
					<div class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="旅客承载量" name="name1">
							<part-title text="旅客承载量"></part-title>
							<Form :model="baseInfo" label-position="left" inline style="width: 600px">
						        <FormItem label="可接待最大旅客数量" :label-width="160" style="margin-right: 120px">
						        	<InputNumber :min="0" clearable v-model="baseInfo.kjdzdlksl"></InputNumber>
						        </FormItem>
						        <FormItem label="日均人流" :label-width="80">
						        	<InputNumber :min="0" clearable v-model="baseInfo.rjrl"></InputNumber>
						        </FormItem>
							</Form>
							<Row type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo">完成</Button>
								</Col>
							</Row>
				        </TabPane>
				        <TabPane label="特殊旅游项目" name="name2">
							<part-title text="特殊旅游项目" :btns="['add']" @add="openTravelModel"></part-title>
							<div class="tip">提示：速降、蹦极、漂流、缆车、滑冰、滑雪、游泳、跳水、玻璃栈道、摩托艇、冲浪舰、水上飞鱼、热气球等</div>
							<div class="num_box">
								<Row type="flex" :gutter="100">
									<Col>总数：{{travelNum['总计'] || 0}}</Col>
								<Col v-for="item in travelYxztList" :key="item">{{item}}：{{travelNum[item] || 0}}</Col>
								</Row>
							</div>
							<Table :columns="travelColumns" :data="travelData">
								<template slot-scope="{ row }" slot="yysj">
						            <span>{{`${row.yysj1}-${row.yysj2}`}}</span>
						        </template>
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editTravelModel(row)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeTravel(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="travelPage.pageSize"
				                    :total="travelPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeTravelPage"
				                    @on-page-size-change="handleChangeTravelPageSize"
				                />
							</Row>
				        </TabPane>
				        <TabPane label="文物保护单位/历史性建筑" name="name3">
							<part-title text="文物保护单位/历史性建筑" :btns="['add']" @add="openWwModel"></part-title>
							<div class="num_box">
								<Row type="flex" :gutter="100">
									<Col>总数：{{wwNum['总计'] || 0}}</Col>
									<Col v-for="item in jbList" :key="item">{{item}}：{{wwNum[item] || 0}}</Col>
								</Row>
							</div>
							<Table :columns="wwColumns" :data="wwData">
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editWwModel(row)">编辑</Button>
						            
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeWw(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="wwPage.pageSize"
				                    :total="wwPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeWwPage"
				                    @on-page-size-change="handleChangeWwPageSize"
				                />
							</Row>
				        </TabPane>
				        <TabPane label="消防重点单位" name="name4">
							<part-title text="消防重点单位" :btns="['add']" @add="openXfModel"></part-title>
							<Row type="flex" :gutter="100">
								<Col>总数：{{xfNum['总计'] || 0}}</Col>
								<Col v-for="item in yyztList" :key="item">{{item}}：{{xfNum[item] || 0}}</Col>
							</Row>
							<Table :columns="xfColumns" :data="xfData">
								<template slot-scope="{ row }" slot="name">
						            <span class="link">{{row.name}}</span>
						        </template>
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editXfModel(row)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeXf(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="xfPage.pageSize"
				                    :total="xfPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeXfPage"
				                    @on-page-size-change="handleChangeXfPageSize"
				                />
							</Row>
				        </TabPane>
				        <TabPane label="特种设备" name="name5">
							<part-title text="特种设备" :btns="['add']" @add="openSpecialModel"></part-title>
							<Row type="flex" :gutter="100">
								<Col>总数：{{specialNum['总计'] || 0}}</Col>
								<Col v-for="item in syztList" :key="item">{{item}}：{{specialNum[item] || 0}}</Col>
								<Col v-for="item in fxdjList" :key="item">{{item}}：{{specialNum[item] || 0}}</Col>
							</Row>
							<Table :columns="specialColumns" :data="specialData">
								<template slot-scope="{ row }" slot="name">
						            <span class="link">{{row.name}}</span>
						        </template>
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editSpecialModel(row)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeSpecial(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="specialPage.pageSize"
				                    :total="specialPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeSpecialPage"
				                    @on-page-size-change="handleChangeSpecialPageSize"
				                />
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
		                <Button type="primary" size="large" @click="saveLng">确定</Button>
	            	</Col>
	            </Row>
	        </div>
		</Modal>
		<Modal width="1000" title="区域范围标注" v-model="showAreaModel">
			<div id="area_box" class="area_box"></div>
			<div slot="footer">
	            <Row type="flex" align="middle" justify="space-between">
	            	<Col style="text-align: left">
	            		<Button type="info" size="small" ghost @click="openArea">开启标注</Button>
	            		<!-- <Button type="warning" size="small" ghost @click="polygonTool.close()">关闭标注</Button> -->
	            		<Button type="warning" size="small" ghost @click="clearArea">清除标注</Button>
	            	</Col>
	            	<Col>
	            		<Button type="text" size="large" @click="cancelArea">取消</Button>
		                <Button type="primary" size="large" @click="saveArea">确定</Button>
	            	</Col>
	            </Row>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}特殊旅游项目`" v-model="showTravelModel" @on-visible-change="travelModelChange">
			<div>
				<Form :model="travelForm" label-position="left" :label-width="120">
					<FormItem label="项目名称">
			        	<Input clearable v-model="travelForm.xmmc"></Input>
			        </FormItem>
			        <FormItem label="经营类型">
			        	<Select clearable v-model="travelForm.jylx" placeholder="经营类型">
			                <Option v-for="item in jylxList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="开业时间">
			        	<DatePicker type="date" v-model="travelForm.kysj" placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="营业时间">
			        	<TimePicker type="timerange" confirm v-model="travelForm.yysj" placeholder="营业时间"></TimePicker>
			        </FormItem>
			        <FormItem label="运行状态">
			            <Select clearable v-model="travelForm.yxzt" placeholder="请选择">
			                <Option v-for="item in travelYxztList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showTravelModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveTravel">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}文物保护单位/历史性建筑`" v-model="showWwModel" @on-visible-change="wwModelChange">
			<div>
				<Form :model="wwForm" label-position="left" :label-width="120">
					<FormItem label="名称">
			        	<Input clearable v-model="wwForm.mc"></Input>
			        </FormItem>
			        <FormItem label="级别">
			        	<Select clearable v-model="wwForm.jb" placeholder="请选择">
			                <Option v-for="item in jbList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="时代">
			        	<DatePicker type="date" v-model="wwForm.sd" placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showTravelModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveWw">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}消防重点单位`" v-model="showXfModel" @on-visible-change="xfModelChange">
			<div>
				<Form :model="xfForm" label-position="left" :label-width="120">
					<FormItem label="名称">
			        	<Input clearable v-model="xfForm.mc"></Input>
			        </FormItem>
			        <FormItem label="类型">
			        	<Row type="flex" :gutter="20">
			        		<Col span="12">
			        			<Select clearable v-model="xfForm.lx" placeholder="请选择">
					                <Option v-for="item in lxList" :key="item" :value="item">{{item}}</Option>
					            </Select>
			        		</Col>
			        		<Col span="12">
			        			<Input v-show="xfForm.lx == '其他（自填）'" clearable v-model="xfForm.lx_"></Input>
			        		</Col>
			        	</Row>
			        </FormItem>
			        <FormItem label="建设使用时间">
			        	<DatePicker type="date" v-model="xfForm.jstysj" placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="使用单位">
			            <Input clearable v-model="xfForm.sydw"></Input>
			        </FormItem>
			        <FormItem label="运行状态">
			            <Select clearable v-model="xfForm.yyzt" placeholder="请选择">
			                <Option v-for="item in yyztList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showTravelModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveXf">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}特种设备`" v-model="showSpecialModel" @on-visible-change="specialModelChange">
			<div>
				<Form :model="specialForm" label-position="left" :label-width="120">
					<FormItem label="设备名称">
			        	<Input clearable v-model="specialForm.sbmc"></Input>
			        </FormItem>
			        <FormItem label="登记注册码">
			        	<Input clearable v-model="specialForm.djzcdm"></Input>
			        </FormItem>
			        <FormItem label="种类">
			        	<Select clearable v-model="specialForm.zl" placeholder="请选择">
			                <Option v-for="item in zlList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="型号规格">
			        	<Input clearable v-model="specialForm.xhgg"></Input>
			        </FormItem>
			        <FormItem label="出厂时间">
			        	<DatePicker type="date" v-model="specialForm.czsj" placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="使用单位">
			            <Input clearable v-model="specialForm.sydw"></Input>
			        </FormItem>
			        <FormItem label="检验有效期">
			        	<DatePicker type="date" v-model="specialForm.jyyxq" placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="检验单位">
			            <Input clearable v-model="specialForm.jydw"></Input>
			        </FormItem>
			        <FormItem label="使用状态">
			            <Select clearable v-model="specialForm.syzt" placeholder="请选择">
			                <Option v-for="item in syztList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="风险等级">
			            <Select clearable v-model="specialForm.fxdj" placeholder="请选择">
			                <Option v-for="item in fxdjList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showTravelModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveSpecial">保存</Button>
	        </div>
		</Modal>
	</div>
</template>

<script>	
	import api from '@/api/api'
	import partTitle from '@/components/title'
	import areajs from '@/common/js/area'
	import industryjs from '@/common/js/industry'
	import lngjs from '@/common/js/lng'
	import datePickerjs from '@/common/js/datePicker'
	import { getDate } from '@/utils/tool'
	export default {
		name: '',
		mixins: [areajs, industryjs, lngjs, datePickerjs],
		components: { partTitle },
		data() {
			return {
				id: '',
				gkdx_id: this.$storage.get('userInfo').gkdx_id,
				loading: false,
				step: 1,	
				showAreaModel: false,
				showLngModel: false,
				showTravelModel: false,
				showWwModel: false,
				showXfModel: false,
				showDeviceModel: false,
				showMainRiskModel: false,
				showSpecialModel: false,
				modeType: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					lyjdmc: '旅游景点名称',
					tyshxydm: '',
					jqdj: '',
					kysj: '',
					quyu: [],
					jydw: '',
					hydm: '',
					jqyysj: [],
					jqjs: '',
					rjrl: '',
					yxzt: '',
				},
				addressInfo: {
					dz: '',
					dyfw: '',
					lngAndLat: '',
				},
				contactInfo: {
					jbr: '',
					jbrdh: '',
					jbryx: '',
				},
				baseInfo: {
					kjdzdlksl: 0,
					rjrl: 0
				},
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
						value: 1,
						name: 'xxxx'
					}
				],
				jqdjList: ['A', 'AA', 'AAA', 'AAAA', 'AAAAA', '未评级'],
				yxztList: ['在运行', '封闭升级', '关闭休业'],
				areaList: [],
				travelNum: {},
				travelColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.travelPage.pageIndex- 1) * this.travelPage.pageSize + 1);
				        }
                    }, {
                        title: '项目名称',
                        key: 'xmmc',
                        minWidth: 100
                    }, {
                        title: '经营类型',
                        key: 'jylx',
                        minWidth: 100
                    }, {
                        title: '开业时间',
                        key: 'kysj',
                        minWidth: 120
                    }, {
                        title: '营业时间',
                        slot: 'yysj',
                        minWidth: 120
                    }, {
                        title: '运行状态',
                        key: 'yxzt',
                        minWidth: 100
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				travelData: [],
				travelForm: {
					xmmc: '',
					jylx: '',
					kysj: '',
					yysj: [],
					yxzt: '',
				},
				travelPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				jylxList: ['自营', '承包', '其他'],
				travelYxztList: ['建设', '运行', '改造', '停运'],
				wwColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.wwPage.pageIndex- 1) * this.wwPage.pageSize + 1);
				        }
                    }, {
                        title: '名称',
                        key: 'mc',
                        minWidth: 100
                    }, {
                        title: '级别',
                        key: 'jb',
                        minWidth: 100
                    }, {
                        title: '时代',
                        key: 'sd',
                        minWidth: 100
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				wwData: [],
				wwForm: {
					mc: '',
					jb: '',
					sd: ''
				},
				wwNum: {},
				wwPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				jbList: ['国家级', '省级', '市级', '县级'],
				xfColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.xfPage.pageIndex- 1) * this.xfPage.pageSize + 1);
				        }
                    }, {
                        title: '名称',
                        key: 'mc',
                        minWidth: 100
                    }, {
                        title: '类型',
                        key: 'lx',
                        minWidth: 100
                    }, {
                        title: '建设投用时间',
                        key: 'jstysj',
                        minWidth: 120
                    }, {
                        title: '使用单位',
                        key: 'sydw',
                        minWidth: 100
                    }, {
                        title: '运行状态',
                        key: 'yyzt',
                        minWidth: 100
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				xfData: [],
				xfForm: {
					mc: '',
					lx: '',
					lx_: '',
					jstysj: '',
					sydw: '',
					yyzt: ''
				},
				xfNum: {},
				xfPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				lxList: ['商场', '宾馆（饭店）', '体育场（馆）', '会堂', '公共娱乐场所', '医院', '养老院', '学校', '托儿所', '幼儿园', '国家机关', '客运车站', '码头', '民用机场', '公共图书馆', '展览馆', '博物馆', '档案馆', '文物保护单位', '易燃易爆化学物品的生产、充装、储存场所', '高层公共建筑', '地下铁道', '地下观光隧道', '其他（自填）'],
				yyztList: ['运行', '改造', '停止'],
				specialColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.specialPage.pageIndex- 1) * this.specialPage.pageSize + 1);
				        }
                    }, {
                        title: '设备名称',
                        key: 'sbmc',
                        minWidth: 100
                    }, {
                        title: '登记注册码',
                        key: 'djzcdm',
                        minWidth: 110
                    }, {
                        title: '种类',
                        key: 'zl',
                        minWidth: 100
                    }, {
                        title: '型号规格',
                        key: 'xhgg',
                        minWidth: 100
                    }, {
                        title: '出厂时间',
                        key: 'czsj',
                        minWidth: 100
                    }, {
                        title: '使用单位',
                        key: 'sydw',
                        minWidth: 100
                    }, {
                        title: '检验有效期',
                        key: 'jyyxq',
                        minWidth: 120
                    }, {
                        title: '检验单位',
                        key: 'jydw',
                        minWidth: 100
                    }, {
                        title: '使用状态',
                        key: 'syzt',
                        minWidth: 100
                    }, {
                        title: '风险等级',
                        key: 'fxdj',
                        minWidth: 100
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				specialData: [],
				specialForm: {
					sbmc: '',
					djzcdm: '',
					zl: '',
					xhgg: '',
					czsj: '',
					sydw: '',
					jyyxq: '',
					jydw: '',
					syzt: '',
					fxdj: '',
				},
				specialNum: {},
				specialPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				zlList: ['锅炉', '压力容器（含气瓶）', '压力管道', '电梯', '起重机械', '客运索道', '大型游乐设施', '场（厂）内专用机动车辆'],
				syztList: ['在用', '停用', '检修'],
				fxdjList: ['高风险', '中风险', '低风险'],
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
				let travelParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.travelPage.pageSize,
					page: this.travelPage.pageIndex,
				}
				let wwParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.wwPage.pageSize,
					page: this.wwPage.pageIndex,
				}
				let xfParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.xfPage.pageSize,
					page: this.xfPage.pageIndex,
				}
				let specialParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.specialPage.pageSize,
					page: this.specialPage.pageIndex,
				}
				Promise.all([api.getTravelItemList(travelParams), api.getWwList(wwParams), api.getXfList(xfParams), api.getSpecialList(specialParams)]).then((result) => {
				  	let travelRes = result[0], wwRes = result[1], xfRes = result[2], specialRes = result[3]
				  	if(travelRes.status_code == 200) {
				  		this.travelData = travelRes.data.data
				  		this.travelNum = travelRes.data.yxzt
				  		this.travelPage.totalRow = travelRes.data.total
				  	}
				  	if(wwRes.status_code == 200) {
				  		this.wwData = wwRes.data.data
				  		this.wwNum = wwRes.data.jb
				  		this.wwPage.totalRow = wwRes.data.total
				  	}
				  	if(xfRes.status_code == 200) {
				  		this.xfData = xfRes.data.data
				  		this.xfNum = xfRes.data.yyzt
				  		this.xfPage.totalRow = xfRes.data.total
				  	}
				  	if(specialRes.status_code == 200) {
				  		this.specialData = specialRes.data.data
				  		this.specialNum = {...specialRes.data.syzt, ...specialRes.data.fxdj}
				  		this.specialPage.totalRow = specialRes.data.total
				  	}
				  	this.loading = false   
				}).catch((error) => {
				  	console.log(error)
				  	this.loading = false
				})
				let { status_code, data, message } = await api.getTravelBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					this.baseInfo = { 
						kjdzdlksl: data.kjdzdlksl ? Number(data.kjdzdlksl) : 0,
						rjrl: data.rjrl ? Number(data.rjrl) : 0
					}
				}
			},
			async nextStep() {
				let params = {
					quyu_id: this.baseInfo.quyu[this.baseInfo.quyu.length - 1],
					...this.baseInfo,
					...this.addressInfo,
					...this.contactInfo,
					kysj: this.baseInfo.kysj ? getDate(new Date(this.baseInfo.kysj).getTime(), 'date') : '',
					jqyysj1: this.baseInfo.jqyysj[0],
					jqyysj2: this.baseInfo.jqyysj[1],
					// hyml: this.baseInfo.hyml[this.baseInfo.hyml.length - 1],
					jd: this.addressInfo.lngAndLat.split(' ')[0],
					wd: this.addressInfo.lngAndLat.split(' ')[1],
				}	 
				if(this.$route.query.type == 2) {
					params.gkdx_id = this.form.gkdx_id
				}
				delete params.jqyysj
				delete params.quyu
				delete params.lngAndLat
				let { status_code, message } = await api.addTravelBase(params);
				if(status_code == 200) {
					this.loading = true
					this.step++
					if(this.$route.query.type == 2) {
						this.gkdx_id = this.form.gkdx_id
					}else {
						let { status_code, data } = await api.getTravelBase()
						if(status_code == 200) {
							this.gkdx_id = data.data[0].gkdx_id
						}
					}
					let travelParams = {
						gkdx_id: this.gkdx_id,
						per_page: this.travelPage.pageSize,
						page: this.travelPage.pageIndex,
					}
					let wwParams = {
						gkdx_id: this.gkdx_id,
						per_page: this.wwPage.pageSize,
						page: this.wwPage.pageIndex,
					}
					let xfParams = {
						gkdx_id: this.gkdx_id,
						per_page: this.xfPage.pageSize,
						page: this.xfPage.pageIndex,
					}
					let specialParams = {
						gkdx_id: this.gkdx_id,
						per_page: this.specialPage.pageSize,
						page: this.specialPage.pageIndex,
					}
					Promise.all([api.getTravelItemList(travelParams), api.getWwList(wwParams), api.getXfList(xfParams), api.getSpecialList(specialParams)]).then((result) => {
					  	let travelRes = result[0], wwRes = result[1], xfRes = result[2], specialRes = result[3]
					  	if(travelRes.status_code == 200) {
					  		this.travelData = travelRes.data.data
					  		this.travelNum = travelRes.data.yxzt
					  		this.travelPage.totalRow = travelRes.data.total
					  	}
					  	if(wwRes.status_code == 200) {
					  		this.wwData = wwRes.data.data
					  		this.wwNum = wwRes.data.jb
					  		this.wwPage.totalRow = wwRes.data.total
					  	}
					  	if(xfRes.status_code == 200) {
					  		this.xfData = xfRes.data.data
					  		this.xfNum = xfRes.data.yyzt
					  		this.xfPage.totalRow = xfRes.data.total
					  	}
					  	if(specialRes.status_code == 200) {
					  		this.specialData = specialRes.data.data
					  		this.specialNum = {...specialRes.data.syzt, ...specialRes.data.fxdj}
					  		this.specialPage.totalRow = specialRes.data.total
					  	}
					  	this.loading = false   
					}).catch((error) => {
					  	console.log(error)
					  	this.loading = false
					})
				}
			},
			async saveInfo() {
				let params = {
					...this.baseInfo,
					gkdx_id: this.gkdx_id
				}
				let { status_code, message } = await api.addTravelBase(params);
				if(status_code == 200) {
					this.$Message.success(message)
					// if(this.$route.query.type == 2) {
					// 	this.$router.back()
					// }else {
					// 	this.$router.replace('/baseInfo')
					// }
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
			            if(this.addressInfo.dyfw) {
			            	let dyfw = JSON.parse(this.addressInfo.dyfw)
			            	let points = dyfw.map(item => {
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
					this.addressInfo.dyfw = JSON.stringify(e.currentLnglats)
				})
			},
			clearArea() {
				this.addressInfo.dyfw = ''
				this.map.clearOverLays()
			},
			cancelArea() {
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.addressInfo.dyfw = this.dyfw || this.form.dyfw || '';
				this.showAreaModel = false
			},
			saveArea() {
				this.dyfw = this.addressInfo.dyfw;
				this.form.dyfw = this.addressInfo.dyfw;
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.showAreaModel = false
			},
			handleChangeTravelPage(val) {
				this.travelPage.pageIndex = val
				this.getTravelItemList()
			},
			handleChangeTravelPageSize(val) {
				this.travelPage.pageSize = val
				this.getTravelItemList()
			},
			travelModelChange(status) {
				if(!status) {
					this.travelForm = {
						xmmc: '',
						jylx: '',
						kysj: '',
						yysj: [],
						yxzt: '',
					}
				}
			},
			async getTravelItemList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.travelPage.pageSize,
					page: this.travelPage.pageIndex,
				}
				let { status_code, data } = await api.getTravelItemList(params)
				if(status_code == 200) {
					this.travelData = data.data
					this.travelNum = data.yxzt
					this.travelPage.totalRow = data.total
				}
			},
			openTravelModel() {
				this.modeType = 1;
				this.showTravelModel = true
			},
			editTravelModel(row) {
				this.travelForm = {
					xmmc: row.xmmc,
					jylx: row.jylx,
					kysj: row.kysj ? new Date(row.kysj) : '',
					yysj: [row.yysj1, row.yysj2],
					yxzt: row.yxzt,
				}
				this.id = row.id
				this.modeType = 2;
				this.showTravelModel = true
			},
			async removeTravel(row) {
				let { status_code } = await api.deleteTravelItem(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getTravelItemList()
			},
			async saveTravel() {
				let params = {
					...this.travelForm,
					kysj: this.travelForm.kysj ? getDate(new Date(this.travelForm.kysj).getTime(), 'date') : '',
					yysj1: this.travelForm.yysj[0] || '',
					yysj2: this.travelForm.yysj[1] || '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addTravelItem(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showTravelModel = false
					this.getTravelItemList()
				}
			},
			handleChangeWwPage(val) {
				this.wwPage.pageIndex = val
				this.getWwList()
			},
			handleChangeWwPageSize(val) {
				this.wwPage.pageSize = val
				this.getWwList()
			},
			wwModelChange(status) {
				if(!status) {
					this.wwForm = {
						mc: '',
						jb: '',
						sd: ''
					}
				}
			},
			async getWwList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.wwPage.pageSize,
					page: this.wwPage.pageIndex,
				}
				let { status_code, data } = await api.getWwList(params)
				if(status_code == 200) {
					this.wwData = data.data
					this.wwNum = data.jb
					this.wwPage.totalRow = data.total
				}
			},
			openWwModel() {
				this.modeType = 1;
				this.showWwModel = true;
			},
			editWwModel(row) {
				this.wwForm = {
					mc: row.mc,
					jb: row.jb,
					sd: row.sd ? new Date(row.sd) : '',
				}
				this.id = row.id
				this.modeType = 2;
				this.showWwModel = true
			},
			async removeWw(row) {
				let { status_code } = await api.deleteWw(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getWwList()
			},
			async saveWw() {
				let params = {
					...this.wwForm,
					sd: this.wwForm.sd ? getDate(new Date(this.wwForm.sd).getTime(), 'date') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addWw(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showWwModel = false
					this.getWwList()
				}
			},
			handleChangeXfPage(val) {
				this.xfPage.pageIndex = val
				this.getXfList()
			},
			handleChangeXfPageSize(val) {
				this.xfPage.pageSize = val
				this.getXfList()
			},
			xfModelChange(status) {
				if(!status) {
					this.xfForm = {
						mc: '',
						lx: '',
						lx_: '',
						jstysj: '',
						sydw: '',
						yyzt: ''
					}
				}
			},
			async getXfList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.xfPage.pageSize,
					page: this.xfPage.pageIndex,
				}
				let { status_code, data } = await api.getXfList(params)
				if(status_code == 200) {
					this.xfData = data.data
					this.xfNum = data.yyzt
					this.xfPage.totalRow = data.total
				}
			},
			openXfModel() {
				this.modeType = 1;
				this.showXfModel = true;
			},
			editXfModel(row) {
				this.xfForm = {
					mc: row.mc,
					lx: this.lxList.includes(row.lx) ? row.lx : '其他（自填）',
					lx_: this.lxList.includes(row.lx) ? '' : row.lx,
					jstysj: row.jstysj ? new Date(row.jstysj) : '',
					sydw: row.sydw,
					yyzt: row.yyzt
				}
				this.id = row.id
				this.modeType = 2;
				this.showXfModel = true
			},
			async removeXf(row) {
				let { status_code } = await api.deleteXf(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getXfList()
			},
			async saveXf() {
				let params = {
					...this.xfForm,
					jstysj: this.xfForm.jstysj ? getDate(new Date(this.xfForm.jstysj).getTime(), 'date') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.xfForm.lx == '其他（自填）') {
					params.lx = this.xfForm.lx_
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				delete params.lx_
				let { status_code, message } = await api.addXf(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showXfModel = false
					this.getXfList()
				}
			},
			handleChangeSpecialPage(val) {
				this.specialPage.pageIndex = val
				this.getSpecialList()
			},
			handleChangeSpecialPageSize(val) {
				this.specialPage.pageSize = val
				this.getSpecialList()
			},
			specialModelChange(status) {
				if(!status) {
					this.specialForm = {
						sbmc: '',
						djzcdm: '',
						zl: '',
						xhgg: '',
						czsj: '',
						sydw: '',
						jyyxq: '',
						jydw: '',
						syzt: '',
						fxdj: '',
					}
				}
			},
			async getSpecialList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.specialPage.pageSize,
					page: this.specialPage.pageIndex,
				}
				let { status_code, data } = await api.getSpecialList(params)
				if(status_code == 200) {
					this.specialData = data.data
					this.specialNum = {...data.syzt, ...data.fxdj}
					this.specialPage.totalRow = data.total
				}
			},
			openSpecialModel() {
				this.modeType = 1;
				this.showSpecialModel = true;
			},
			editSpecialModel(row) {
				this.specialForm = {
					sbmc: row.sbmc,
					djzcdm: row.djzcdm,
					zl: row.zl,
					xhgg: row.xhgg,
					czsj: row.czsj ? new Date(row.czsj) : '',
					sydw: row.sydw,
					jyyxq: row.jyyxq ? new Date(row.jyyxq) : '',
					jydw: row.jydw,
					syzt: row.syzt,
					fxdj: row.fxdj,
				}
				this.id = row.id
				this.modeType = 2;
				this.showSpecialModel = true
			},
			async removeSpecial(row) {
				let { status_code } = await api.deleteSpecial(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getSpecialList()
			},
			async saveSpecial() {
				let params = {
					...this.specialForm,
					czsj: this.specialForm.czsj ? getDate(new Date(this.specialForm.czsj).getTime(), 'date') : '',
					jyyxq: this.specialForm.jyyxq ? getDate(new Date(this.specialForm.jyyxq).getTime(), 'date') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addSpecial(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showSpecialModel = false
					this.getSpecialList()
				}
			},
		},
		created() {
			this.getArea('', list => {
				this.areaList = list
				if(this.industryList.length > 0) {
					this.getBaseInfo()
				}
			})
			this.getIndustry('', list => {
				this.industryList = list
				if(this.areaList.length > 0) {
					this.getBaseInfo()
				}
			})
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