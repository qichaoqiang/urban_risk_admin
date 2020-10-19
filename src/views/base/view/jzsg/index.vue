<template>
	<div class="page">
		<div v-show="step == 1">
			<Row type="flex" justify="center">
				<Col>
					<div class="title">请完善{{step == 1 ? '企业' : '风险'}}信息</div>
					<part-title text="基本信息"></part-title>
					<Form :model="baseInfo" ref="baseInfo" :rules="rules" hide-required-mark label-position="left" :label-width="120" style="width: 600px">
						<FormItem label="建设项目名称" placeholder="请输入建设项目名称">
				            {{baseInfo.xmmc}}
				        </FormItem>
				        <FormItem label="项目所属类型" prop="xmsslx">
				        	<Cascader 
				            	clearable 
				            	change-on-select
				            	v-model="baseInfo.xmsslx" 
				            	:data="xmsslxList" 
				            	:load-data="loadXmsslx" 
				            	placeholder="项目所属类型"></Cascader>
				        </FormItem>
				        <FormItem label="所属辖区" prop="quyu">
				            <Cascader 
				            	clearable 
				            	change-on-select
				            	v-model="baseInfo.quyu" 
				            	:data="areaList" 
				            	:load-data="loadArea" 
				            	placeholder="所属辖区"></Cascader>
				        </FormItem>
				        <FormItem label="立项审批部门" prop="lxspbm">
				            <Input clearable v-model="baseInfo.lxspbm" placeholder="立项审批部门"></Input>
				        </FormItem>
				        <FormItem label="立项时间" prop="lxsj">
				        	<DatePicker type="date" v-model="baseInfo.lxsj"  placeholder="立项时间"></DatePicker>
				        </FormItem>
				        <FormItem label="工程造价(元)" prop="gczj">
				            InputNumber :min="0" v-model="baseInfo.gczj" placeholder="工程造价"></InputNumber>
				        </FormItem>
				        <FormItem label="地址" prop="dz">
				        	<Input clearable v-model="baseInfo.dz" placeholder="地址"></Input>
				        </FormItem>
				        <FormItem label="经纬度" prop="lngAndLat">
				        	<lng id="lng_box" :lngAndLat.sync="baseInfo.lngAndLat" :dz="baseInfo.dz"></lng>
				        </FormItem>
				        <FormItem label="项目工地范围" prop="xmgdfw">
				        	<div @click.stop="openAreaModal">
			        			<Input 
			        				readonly 
			        				v-model="baseInfo.xmgdfw" 
			        				icon="md-pin" 
			        				placeholder="项目工地范围" />
			        		</div>
				        </FormItem>
				        <FormItem label="建设内容" prop="jsnr">
				            <Input clearable type="textarea" v-model="baseInfo.jsnr" placeholder="建设内容"></Input>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<!-- <div class="line"></div> -->
			<Row type="flex" justify="center">
				<Col>
					<part-title text="相关单位"></part-title>
					<Row type="flex" justify="end">
						<Col span="23">
							<part-title text="建设单位" :btns="['add']" @add="openUnitModel(1)"></part-title>
							<Table :columns="unitColumns" :data="jsdw" style="width: 600px">
								<template slot-scope="{ row, index }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editUnitModel(row, index, 1)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeUnit(row, index, 1)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<part-title text="设计单位" :btns="['add']" @add="openUnitModel(2)"></part-title>
							<Table :columns="unitColumns" :data="sjdw" style="width: 600px">
								<template slot-scope="{ row, index }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editUnitModel(row, index, 2)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeUnit(row, index, 2)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<part-title text="施工单位" :btns="['add']" @add="openUnitModel(3)"></part-title>
							<Table :columns="unitColumns" :data="sgdw" style="width: 600px">
								<template slot-scope="{ row, index }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editUnitModel(row, index, 3)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeUnit(row, index, 3)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<part-title text="监管单位" :btns="['add']" @add="openUnitModel(4)"></part-title>
							<Table :columns="unitColumns" :data="jldw" style="width: 600px">
								<template slot-scope="{ row, index }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editUnitModel(row, index, 4)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeUnit(row, index, 4)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
						</Col>
					</Row>
				</Col>	
			</Row>	
			<!-- <div class="line"></div> -->
			<Row type="flex" justify="center">
				<Col>
					<part-title text="建筑物信息"></part-title>
					<Form :model="baseInfo" ref="jzInfo" :rules="rules" hide-required-mark label-position="left" :label-width="120" style="width: 600px">
						<FormItem label="建筑面积（㎡）" prop="jzmj">
				        	InputNumber :min="0" v-model="baseInfo.jzmj" placeholder="建筑面积"></InputNumber>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<!-- <div class="line"></div> -->
			<Row type="flex" justify="center">
				<Col>
					<part-title text="联系人信息"></part-title>
					<Form :model="baseInfo" ref="contactInfo" :rules="rules" hide-required-mark label-position="left" :label-width="120" style="width: 600px">
				        <FormItem label="经办人">
				        	<Row type="flex" :gutter="20">
					        	<Col span="8">
						        	<FormItem prop="jbr">
					        			<Input clearable v-model="baseInfo.jbr" :data="areaList" placeholder="姓名"></Input>
					        		</FormItem>
				        		</Col>
				        		<Col span="16">
					        		<FormItem prop="jbrdh">
					        			<Input clearable v-model="baseInfo.jbrdh" placeholder="电话"></Input>
					        		</FormItem>
				        		</Col>
				        		<Col span="24" style="margin-top: 16px">
					        		<FormItem prop="jbryx">
					        			<Input clearable v-model="baseInfo.jbryx" placeholder="邮箱"></Input>
					        		</FormItem>
				        		</Col>
				        	</Row>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<Row type="flex" justify="center">
				<Col>
					<Button type="primary" style="margin: 0 auto; width: 200px;" @click="nextStep">完成</Button>
				</Col>
			</Row>
		</div>

		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}${unitTitle}`" v-model="showUnitModel" @on-visible-change="unitModelChange">
			<div>
				<Form :model="unitForm" ref="unit" :rules="unitRules" hide-required-mark label-position="left" :label-width="160">
					<FormItem label="单位名称" prop="dwmc">
			        	<Input clearable v-model="unitForm.dwmc"></Input>
			        </FormItem>
			        <FormItem label="社会统一信用代码" prop="shtyxydm">
			        	<Input clearable v-model="unitForm.shtyxydm"></Input>
			        </FormItem>
			        <FormItem label="负责项目的联系人" prop="lxr">
			        	<Input clearable v-model="unitForm.lxr"></Input>
			        </FormItem>
			        <FormItem label="联系电话" prop="tel">
			        	<Input clearable type="tel" v-model="unitForm.tel"></Input>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
		        <Button type="primary" size="large" :loading="unitLoading" @click="saveUnit">保存</Button>
	        </div>
		</Modal>
		
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
		<!-- <Modal :title="`${modeType == 1 ? '新增' : '编辑'}危险性较大分部分项工程`" v-model="showDangerModel">
			<div>
				<Form :model="dangerForm" label-position="left" :label-width="120">
					<FormItem label="分部分项工程名称">
			        	<Input clearable v-model="dangerForm.name"></Input>
			        </FormItem>
			        <FormItem label="工程类型">
			        	<Input clearable v-model="dangerForm.name"></Input>
			        </FormItem>
			        <FormItem label="施工单位">
			            <Select clearable v-model="dangerForm.name" placeholder="请选择">
			                <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="监理单位">
			            <Select clearable v-model="dangerForm.name" placeholder="请选择">
			                <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="工程启动时间">
			        	<DatePicker type="date" v-model="dangerForm.name"  placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="预计结束时间">
			        	<DatePicker type="date" v-model="dangerForm.name"  placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="当前形象进度（%）">
			        	<InputNumber :min="0" v-model="dangerForm.num"></InputNumber>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
		        <Button type="primary" size="large" @click="saveDanger">保存</Button>
	        </div>
		</Modal>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}超过一定规模的危险性较大的分部分项工程`" v-model="showDangerRiskModel">
			<div>
				<Form :model="dangerRiskForm" label-position="left" :label-width="120">
					<FormItem label="分部分项工程名称">
			        	<Input clearable v-model="dangerRiskForm.name"></Input>
			        </FormItem>
			        <FormItem label="工程类型">
			        	<Select clearable v-model="dangerRiskForm.name" placeholder="请选择">
			                <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="施工单位">
			        	<Input clearable v-model="dangerRiskForm.name"></Input>
			        </FormItem>
			        <FormItem label="监理单位">
			        	<Input clearable v-model="dangerRiskForm.name"></Input>
			        </FormItem>
			        <FormItem label="工程启动时间">
			        	<DatePicker type="date" v-model="dangerRiskForm.name"  placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="预计结束时间">
			        	<DatePicker type="date" v-model="dangerRiskForm.name"  placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="当前形象进度（%）">
			            <InputNumber :min="0" :max="100" v-model="dangerRiskForm.num"></InputNumber>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
		        <Button type="primary" size="large" @click="saveDangerRisk">保存</Button>
	        </div>
		</Modal> -->
	</div>
</template>

<script>
	import api from '@/api/api'
	import partTitle from '@/components/title'
	import lng from '../../../baseInfo/components/lng'
	import tablejs from '@/common/js/table'
	import areajs from '@/common/js/area'
	import lngjs from '@/common/js/lng_'
	import xmsslxjs from '@/common/js/xmsslx'
	import { getDate } from '@/utils/tool'
	export default {
		name: '',
		mixins: [tablejs, areajs, lngjs, xmsslxjs],
		components: { partTitle, lng },
		data() {
			return {
				gkdx_id: this.$storage.get('userInfo').gkdx_id,
				step: 1,	
				showAreaModel: false,
				showLngModel: false,
				showDangerModel: false,
				showDangerRiskModel: false,
				showSbfcgyModel: false,
				showDeviceModel: false,
				showMainRiskModel: false,
				showRimModel: false,
				showUnitModel: false,
				unitLoading: false,
				unitType: '',
				modeType: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					xmmc: '项目名称',
					dz: '',
					xmgdfw: '',
					lngAndLat: '',
					jzmj: 0,
					xmsslx: [],
					lxspbm: '',
					lxsj: '',
					jsnr: '',
					gczj: 0,
					quyu: [],
					jbr: '',
					jbrdh: '',
					jbryx: '',
				},
				jsdw: [],
				sjdw: [],
				sgdw: [],
				jldw: [],
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
				areaList: [],
				unitColumns: [
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
                        title: '单位名称',
                        key: 'dwmc',
                        minWidth: 100
                    }, {
                        title: '社会统一信用代码',
                        key: 'shtyxydm',
                        minWidth: 160
                    }, {
                        title: '负责项目的联系人',
                        key: 'lxr',
                        minWidth: 160
                    }, {
                        title: '联系电话',
                        key: 'tel',
                        minWidth: 100
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				unitForm: {
					dwmc: '',
					shtyxydm: '',
					lxr: '',
					tel: '',
				},
				unitList: ['jsdw', 'sjdw', 'sgdw', 'jldw'],
				dangerColumns: [
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
                        title: '分部分项工程名称',
                        slot: 'name',
                    }, {
                        title: '工程类型',
                        key: 'cas',
                    }, {
                        title: '施工单位',
                        key: 'cas',
                    }, {
                        title: '监理单位',
                        key: 'cas',
                    }, {
                        title: '工程启动时间',
                        key: 'cas',
                    }, {
                        title: '预计结束时间',
                        key: 'cas',
                    }, {
                        title: '当前形象进度（%）',
                        key: 'cas',
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				dangerData: [
					{
						name: 'hahaha',
						cas: 1111
					}
				],
				dangerForm: {
					name: '',
					num: 0
				},
				dangerRiskColumns: [
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
                        title: '分部分项工程名称',
                        slot: 'name',
                    }, {
                        title: '工程类型',
                        key: 'cas',
                    }, {
                        title: '施工单位',
                        key: 'cas',
                    }, {
                        title: '监理单位',
                        key: 'cas',
                    }, {
                        title: '工程启动时间',
                        key: 'cas',
                    }, {
                        title: '预计结束时间',
                        key: 'cas',
                    }, {
                        title: '当前形象进度（%）',
                        key: 'cas',
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				dangerRiskData: [
					{
						name: '',
						cas: 0
					}
				],
				dangerRiskForm: {
					name: '',
					num: 0
				},
				sbfcgyColumns: [
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
                        title: '涉粉工艺名称',
                        slot: 'sfgymc',
                    }, {
                        title: '粉尘名称',
                        key: 'fcmc',
                    }, {
                        title: '粉尘类型',
                        key: 'fclx',
                    }, {
                        title: '作业人数',
                        key: 'zyrs',
                    }, {
                        title: '当前状态',
                        key: 'dqzt',
                    }, {
                        title: '除尘设施',
                        key: 'ccss',
                    }, {
                        title: '涉粉作业总人数',
                        key: 'cas',
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				sbfcgyData: [],
				sbfcgyForm: {
					num: 0,
					name: '',
					isDevice: '',
				},
				deviceColumns: [
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
                        title: '除尘设备名称',
                        slot: 'name',
                    }, {
                        title: '类型',
                        key: 'cas',
                    }, {
                        title: '数量',
                        key: 'cas',
                    }, {
                        title: '投用时间',
                        key: 'cas',
                    }, {
                        title: '当前状态',
                        key: 'cas',
                    },{
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				deviceData: [
					{
						name: 'hahaha',
						cas: 1111,
						color: 'red'
					}
				],
				deviceForm: {
					num: 0,
					name: '',
				},
				mainRiskColumns: [
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
                        title: '工艺名称',
                        slot: 'name',
                    }, {
                        title: '危险工艺类型',
                        key: 'cas',
                    }, {
                        title: '工艺操作人数',
                        key: 'cas',
                    },{
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				mainRiskData: [
					{	
						name: 'hahaha',
						cas: 1111,
						color: 'red'
					}
				],
				mainRiskForm: {
					num: 0,
					name: '',
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
                        slot: 'name',
                    }, {
                        title: '方位',
                        key: 'cas',
                    }, {
                        title: '目标类型',
                        key: 'cas',
                    }, {
                        title: '人员数量',
                        key: 'cas',
                    },{
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				rimData: [
					{	
						name: 'hahaha',
						cas: 1111,
						color: 'red'
					}
				],
				rimForm: {
					num: 0,
					name: '',
				}
			}
		},
		watch: {
			'unitForm.lxr'(val) {
				console.log(val)
			}
		},
		computed: {
			unitTitle() {
				let list = ['建设单位', '设计单位', '施工单位', '监理单位']
				return this.unitType ? list[this.unitType - 1] : ''
			},
			rules() {
				return {
                	dz: [{ required: true, message: '请输入', trigger: 'change' }],
                	lngAndLat: [{ required: true, message: '请选择', trigger: 'change' }],
                	quyu: [{ required: true, type: 'array', message: '请选择', trigger: 'change' }],
					// xmsslx: [{ required: true, type: 'array', message: '请选择', trigger: 'change' }],
     //            	lxspbm: [{ required: true, message: '请输入', trigger: 'change' }],
     //            	lxsj: [{ required: true, type: 'date', message: '请选择', trigger: 'change' }],
     //            	xmgdfw: [{ required: true, message: '请选择', trigger: 'change' }],
     //            	gczj: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
     //            	jsnr: [{ required: true, message: '请输入', trigger: 'change' }],
     //            	jzmj: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
     //            	jbr: [{ required: true, message: '请输入', trigger: 'change' }],
     //            	jbrdh: [{ required: true, message: '请输入', trigger: 'change' }],
     //            	jbryx: [{ required: true, message: '请输入', trigger: 'change' }],
				}
			},
			unitRules() {
				return {
                	dwmc: [{ required: true, message: '请输入', trigger: 'change' }],
                	shtyxydm: [{ required: true, message: '请选择', trigger: 'change' }],
                	lxr: [{ required: true, message: '请输入', trigger: 'change' }],
                	tel: [{ required: true, message: '请选择', trigger: 'change' }],
				}
			}
		},
		methods: {
			async getBaseInfo() {
				let { status_code, data, message } = await api.getJzsgBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					let { xmmc, dz, xmgdfw, lngAndLat, jzmj, xmsslx, lxspbm, lxsj, jsdw, sjdw, sgdw, jldw, jsnr, gczj, jbr, jbrdh, jbryx } = this.form
					this.baseInfo = { xmmc, dz, xmgdfw, lxspbm, jsnr, jbr, jbrdh, jbryx, gczj, jzmj, lxsj, lngAndLat: '', xmsslx: [], quyu: [] }
					this.baseInfo.gczj = gczj ? Number(gczj) : 0
					this.baseInfo.jzmj = jzmj ? Number(jzmj) : 0
					this.baseInfo.lxsj = lxsj ? new Date(lxsj) : ''
					this.jsdw = jsdw ? JSON.parse(jsdw) : []
					this.sjdw = sjdw ? JSON.parse(sjdw) : []
					this.sgdw = sgdw ? JSON.parse(sgdw) : []
					this.jldw = jldw ? JSON.parse(jldw) : []
					this.baseInfo.xmgdfw = xmgdfw || ''
					this.baseInfo.jsnr = jsnr || ''
					this.baseInfo.lngAndLat = this.form.jd && this.form.wd ? `${(this.form.jd - 0).toFixed(6)} ${(this.form.wd - 0).toFixed(6)}` : ''
					this.getQy();
					this.getXm();
				}
			},
			nextStep() {
				this.$refs.baseInfo.validate((valid) => {
                    if (valid) {
                        this.$refs.jzInfo.validate((valid) => {
		                    if (valid) {
		                        this.$refs.contactInfo.validate((valid) => {
				                    if (valid) {
				                        this.submit()
				                    }
				                })
		                    }
		                })
                    }
                })
				this.$refs.jzInfo.validate((valid) => {})
                this.$refs.contactInfo.validate((valid) => {})
			},
			async submit() {
				let params = {
					gkdx_id: this.gkdx_id,
					...this.baseInfo,
					quyu_id: this.baseInfo.quyu[this.baseInfo.quyu.length - 1],
					xmsslx: this.baseInfo.xmsslx[this.baseInfo.xmsslx.length - 1],
					lxsj: this.baseInfo.lxsj ? getDate(new Date(this.baseInfo.lxsj).getTime(), 'date') : '',
					jd: this.baseInfo.lngAndLat.split(' ')[0],
					wd: this.baseInfo.lngAndLat.split(' ')[1],
					jsdw: JSON.stringify(this.jsdw),
					sjdw: JSON.stringify(this.sjdw),
					sgdw: JSON.stringify(this.sgdw),
					jldw: JSON.stringify(this.jldw),
				}	 
				if(this.$route.query.type == 2) {
					params.gkdx_id = this.form.gkdx_id
				}
				delete params.quyu
				delete params.lngAndLat
				let { status_code, message } = await api.addJzsgBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
					if(this.$route.name == 'base') {
						this.$storage.set('gkdx_id', this.form.gkdx_id)
						this.$router.back()
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
					let lo = new T.Geolocation();
		            lo.getCurrentPosition((e) => {
						this.map = new T.Map('area_box');
						let ctrl = new T.Control.MapType(); 
		            	this.map.addControl(ctrl); // 增加地图类型控件
		            	//移除图层
		            	this.map.removeControl(TMAP_NORMAL_MAP);
			            //添加图层
			            this.map.addControl(TMAP_HYBRID_MAP);
		            	let zoomCtrl = new T.Control.Zoom({
		            		position: T_ANCHOR_BOTTOM_RIGHT
		            	})
		            	this.map.addControl(zoomCtrl);
			            if(this.baseInfo.lngAndLat) {
			            	this.map.centerAndZoom(new T.LngLat(this.baseInfo.lngAndLat.split(' ')[0] || e.lnglat.lng, this.baseInfo.lngAndLat.split(' ')[1] || e.lnglat.lat), 17);
			            }else {
			            	this.map.centerAndZoom(new T.LngLat(e.lnglat.lng, e.lnglat.lat), 17);
			            }
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
			            if(this.baseInfo.xmgdfw) {
			            	let xmgdfw = JSON.parse(this.baseInfo.xmgdfw)
			            	let points = xmgdfw.map(item => {
			            		return new T.LngLat(item.lng, item.lat)
			            	})
			            	console.log(points)
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
					this.baseInfo.xmgdfw = JSON.stringify(e.currentLnglats)
				})
			},
			clearArea() {
				this.baseInfo.xmgdfw = ''
				this.map.clearOverLays()
			},
			cancelArea() {
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.baseInfo.xmgdfw = this.xmgdfw || this.form.xmgdfw || '';
				this.showAreaModel = false
			},
			saveArea() {
				this.xmgdfw = this.baseInfo.xmgdfw;
				this.form.xmgdfw = this.baseInfo.xmgdfw;
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.showAreaModel = false
			},
			unitModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.unitForm = {
							dwmc: '',
							shtyxydm: '',
							lxr: '',
							tel: '',
						}
						this.$refs.unit.resetFields();
					})
				}
			},
			openUnitModel(type) {
				this.unitType = type;
				this.modeType = 1;
				this.showUnitModel = true;
			},
			editUnitModel(row, index, type) {
				this.unitType = type;
				this.unitForm = {
					dwmc: row.dwmc,
					shtyxydm: row.shtyxydm,
					lxr: row.lxr,
					tel: row.tel,
				}
				this.id = index
				this.modeType = 2;
				this.showUnitModel = true
			},
			removeUnit(row, index, type) {
				this[this.unitList[type - 1]].splice(index, 1)
			},
			saveUnit() {
				this.$refs.unit.validate(async valid => {
                    if (valid) {
                    	this.unitLoading = true
						if(this.modeType == 2) {
							this[this.unitList[this.unitType - 1]].splice(this.id, 1, {...this.unitForm})
						}else {
							console.log(this.unitList[this.unitType - 1])
							this[this.unitList[this.unitType - 1]].push({...this.unitForm})
						}
						this.showUnitModel = false
						this.unitLoading = false
                    }
                })
			},
			addDevice() {
				this.modeType = 1;
				this.showDeviceModel = true;
			},
			editDeviceModel(row) {

			},
			removeDevice(row) {

			},
			saveDevice() {

			},
			openMainRiskModel() {
				this.modeType = 1;
				this.showMainRiskModel = true;
			},
			editMainRiskModel(row) {

			},
			removeMainRisk(row) {

			},
			saveMainRisk() {

			},
			openRimModel() {
				this.modeType = 1;
				this.showRimModel = true;
			},
			editRimModel(row) {

			},
			removeRim(row) {

			},
			saveRim() {

			},
		},
		created() {
			this.getArea('', list => {
				this.areaList = list
				if(this.xmsslxList.length > 0) {
					this.getBaseInfo()
				}
			})
			this.getXmsslx('', list=> {
				this.xmsslxList = list
				if(this.areaList.length > 0) {
					this.getBaseInfo()
				}
			})
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