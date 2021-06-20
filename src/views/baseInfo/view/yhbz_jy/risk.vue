<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div v-show="step == 2">
			<Row type="flex" justify="center">
				<Col span="22">
					<div v-show="!isDisEditInfo" class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="产品信息" name="name1">
				        	<part-title text="产品信息" ref="xxx" :btns="['add']" @add="openCpyhbzjyModel"></part-title>
							<Table :columns="cpyhbzscColumns" :data="cpyhbzscData">
								<template slot-scope="{ row }" slot="zzl">
									<span>{{row.zzl}}{{row.zzldw}}</span>
								</template>
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editCpyhbzjyModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeCpyhbzjy(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="cpyhbzscPage.pageSize"
				                    :total="cpyhbzscPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeCpyhbzjyPage"
				                    @on-page-size-change="handleChangeCpyhbzjyPageSize"
				                />
							</Row>
				        </TabPane>
				        <TabPane label="仓库信息" name="name3">
				        	<part-title text="仓库信息" :btns="['add']" @add="openCkyhbzModel"></part-title>
							<Table :columns="ckyhbzscColumns" :data="ckyhbzscData">
								<template slot-scope="{ row }" slot="wxhxp">
									<span>{{row.wxhxp ? '有' : '无'}}</span>
								</template>
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editCkyhbzModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeCkyhbz(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="ckyhbzscPage.pageSize"
				                    :total="ckyhbzscPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeCkyhbzPage"
				                    @on-page-size-change="handleChangeCkyhbzPageSize"
				                />
							</Row>
				        </TabPane>
				        <TabPane label="周边环境" name="name5">
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
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}产品信息`" v-model="showCpyhbzjyModel" @on-visible-change="cpyhbzscModelChange">
			<div>
				<Form :model="cpyhbzscForm" label-position="left" :label-width="140">
					<FormItem label="产品类别">
			        	<Select clearable v-model="cpyhbzscForm.cplb" placeholder="请选择">
			                <Option v-for="item in cplbList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="产品分级">
			        	<Select clearable v-model="cpyhbzscForm.cpfj" placeholder="请选择">
			                <Option v-for="item in cpfjList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="周转量">
			        	<Row type="flex" align="middle">
	            			<Col>
	            				<InputNumber :min="0" v-model="cpyhbzscForm.zzl"></InputNumber>
	            			</Col>
	            			<Col>
	            				<Select clearable v-model="cpyhbzscForm.zzldw" placeholder="单位">
					                <Option v-for="item in zzldwList" :key="item" :value="item">{{item}}</Option>
					            </Select>
	            			</Col>
	            		</Row>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showCpyhbzjyModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveCpyhbzjy">保存</Button>
	        </div>
		</Modal>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}仓库信息`" width="800px" v-model="showCkyhbzModel" @on-visible-change="ckyhbzscModelChange">
			<div>
				<Form :model="ckyhbzscForm" label-position="left" :label-width="140">
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
	            <!-- <Button type="text" size="large" @click="showCpyhbzjyModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveCkyhbz">保存</Button>
	        </div>
		</Modal>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}储存产品`" v-model="showSjcccpModel" @on-visible-change="sjcccpModelChange">
			<div>
				<Form :model="sjcccpForm" label-position="left" :label-width="140">
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
	            <!-- <Button type="text" size="large" @click="showCpyhbzjyModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveSjcccp">保存</Button>
	        </div>
		</Modal>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}周边环境`" v-model="showRimModel"  @on-visible-change="rimModelChange">
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
	            <!-- <Button type="text" size="large" @click="showCpyhbzjyModel = false">取消</Button> -->
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
				showCpyhbzjyModel: false,
				showCpyhbzjyRiskModel: false,
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
					status: '',
					sfzgyyq: '',
					yqmc: '',
					zgrs: 0,
					glrysl: 0,
					hyml: [],
					hydm: '',
					aqscbzh: '',
					qyjbjk: '',
					yxzt: ''
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
				cpyhbzscColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.cpyhbzscPage.pageIndex- 1) * this.cpyhbzscPage.pageSize + 1);
				        }
                    }, {
                        title: '产品类别',
                        key: 'cplb',
                        minWidth: 100
                    }, {
                        title: '产品分级',
                        key: 'cpfj',
                        minWidth: 100
                    }, {
                        title: '周转量',
                        slot: 'zzl',
                        minWidth: 100
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				cpyhbzscData: [],
				cpyhbzscForm: {
					cplb: '',
					cpfj: '',
					zzl: 0,
					zzldw: '',
				},
				cplbList: ['喷花类', '旋转类', '升空类', '旋转升空类', '吐珠类', '线香类', '烟雾类', '造型玩具类', '摩擦类', '小礼花类', '礼花弹类', '架子烟花类'],
				cpfjList: ['A', 'B', 'C', 'D'],
				zzldwList: ['箱/年', '吨/年'],
				syyldwList: ['吨/年'],
				cpyhbzscPage: {
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
                        minWidth: 100
                    }, {
                        title: '占地面积（㎡）',
                        key: 'zdmj',
                        minWidth: 140
                    }, {
                        title: '危险等级',
                        key: 'wxdj',
                        minWidth: 100
                    }, {
                        title: '核定药量（吨）',
                        key: 'hdyl',
                        minWidth: 140
                    }, {
                        title: '最大储存药量（吨）',
                        key: 'zdccyl',
                        minWidth: 180
                    }, {
                        title: '当前药量',
                        key: 'dqyl',
                        minWidth: 100
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
				cpyhbzscList: [],
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
                        minWidth: 160
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
                        minWidth: 100
                    }, {
                        title: '产品分级',
                        key: 'cpfj',
                        minWidth: 100
                    }, {
                        title: '当前数量',
                        slot: 'dqsl',
                        minWidth: 100
                    }, {
                        title: '含药量（吨）',
                        key: 'hyl',
                        minWidth: 120
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
				form: {}
			}
		},
		watch: {

		},
		computed: {

		},
		methods: {
			getBaseInfo() {
				this.loading = true
				let cpyhbzscParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.cpyhbzscPage.pageSize,
					page: this.cpyhbzscPage.pageIndex,
				}
				let ckyhbzscParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.ckyhbzscPage.pageSize,
					page: this.ckyhbzscPage.pageIndex,
				}
				let rimParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.rimPage.pageSize,
					page: this.rimPage.pageIndex,
				}
				Promise.all([api.getCpyhbzjyList(cpyhbzscParams), api.getCkyhbzList(ckyhbzscParams), api.getRimList(rimParams)]).then((result) => {
				  	let cpyhbzscRes = result[0], ckyhbzscRes = result[1], rimRes = result[2]
				  	if(cpyhbzscRes.status_code == 200) {
				  		this.cpyhbzscData = cpyhbzscRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.cpyhbzscPage.totalRow = cpyhbzscRes.data.total
				  	}
				  	if(ckyhbzscRes.status_code == 200) {
				  		this.ckyhbzscData = ckyhbzscRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.ckyhbzscPage.totalRow = ckyhbzscRes.data.total
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
			saveInfo() {
				this.$Message.success('保存成功')
				if(this.$route.query.type == 2) {
					this.$router.back()
				}else {
					this.$router.replace('/baseInfo')
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
			async getCpyhbzjyList_() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: 1000,
					page: this.cpyhbzscPage.pageIndex,
				}
				let { status_code, data } = await api.getCpyhbzjyList(params)
				if(status_code == 200) {
					this.cpyhbzscList = data.data
				}
			},
			handleChangeCpyhbzjyPage(val) {
				this.cpyhbzscPage.pageIndex = val
				this.getCpyhbzjyList()
			},
			handleChangeCpyhbzjyPageSize(val) {
				this.cpyhbzscPage.pageSize = val
				this.getCpyhbzjyList()
			},
			async getCpyhbzjyList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.cpyhbzscPage.pageSize,
					page: this.cpyhbzscPage.pageIndex,
				}
				let { status_code, data } = await api.getCpyhbzjyList(params)
				if(status_code == 200) {
					this.cpyhbzscData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.cpyhbzscPage.totalRow = data.total
				}
			},
			openCpyhbzjyModel() {
				this.modeType = 1;
				this.showCpyhbzjyModel = true
			},
			editCpyhbzjyModel(row) {
				this.cpyhbzscForm = {
					cplb: row.cplb,
					cpfj: row.cpfj,
					zzl: row.zzl ? Number(row.zzl) : 0,
					zzldw: row.zzldw,
				}
				this.id = row.id
				this.modeType = 2;
				this.showCpyhbzjyModel = true
			},
			cpyhbzscModelChange(status) {
				if(!status) {
					this.cpyhbzscForm = {
						cplb: '',
						cpfj: '',
						zzl: 0,
						zzldw: '',
					}
				}
			},
			async removeCpyhbzjy(row) {
				let { status_code } = await api.deleteCpyhbzjyInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getCpyhbzjyList()
			},
			async saveCpyhbzjy() {
				let params = {
					...this.cpyhbzscForm,
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addCpyhbzjyInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showCpyhbzjyModel = false
					this.getCpyhbzjyList()
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
				this.getCpyhbzjyList_()
				this.modeType2 = 1;
				this.showSjcccpModel = true
			},
			editSjcccpModel(row, index) {
				this.getCpyhbzjyList_()
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
        this.cpyhbzscColumns.pop()
        this.ckyhbzscColumns.pop()
        this.rimColumns.pop()
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