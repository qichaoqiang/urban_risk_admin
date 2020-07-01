<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div v-show="step == 1">
			<Row type="flex" justify="center">
				<Col>
					<div class="title">请完善{{step == 1 ? '企业' : '风险'}}信息</div>
					<part-title text="基本信息"></part-title>
					<Form :model="baseInfo" label-position="left" :label-width="120" style="width: 600px">
						<FormItem label="企业名称" placeholder="企业名称">
				            {{baseInfo.qymc}}
				        </FormItem>
				        <FormItem label="统一社会信用代码">
				            <Input clearable v-model="baseInfo.tyshxydm" placeholder="统一社会信用代码"></Input>
				        </FormItem>
				        <FormItem label="注册地址">
				        	<Input clearable v-model="baseInfo.zcdz" placeholder="注册地址"></Input>
				        	<!-- <Row type="flex" :gutter="20">
				        		<Col span="8">
				        			<Cascader clearable v-model="baseInfo.zcdz1" :data="areaList" placeholder="注册地址"></Cascader>
				        		</Col>
				        		<Col span="16">
				        			<Input clearable v-model="baseInfo.zcdz2" placeholder="详细地址"></Input>
				        		</Col>
				        	</Row> -->
				        </FormItem>
				        <FormItem label="所属区域">
				            <Cascader 
				            	clearable 
				            	change-on-select
				            	v-model="baseInfo.quyu" 
				            	:data="areaList" 
				            	:load-data="loadArea" 
				            	placeholder="所属区域"></Cascader>
				        </FormItem>
				        <FormItem label="经营范围">
				            <Input clearable v-model="baseInfo.jyfw" placeholder="经营范围"></Input>
				        </FormItem>
				        <FormItem label="成立时间">
				            <DatePicker clearble type="date" v-model="baseInfo.clsj" :options="datePickerOptions" placeholder="成立时间"></DatePicker>
				        </FormItem>
				        <FormItem label="职工人数">
				            <InputNumber :min="0" v-model="baseInfo.zgrs"></InputNumber>
				        </FormItem>
				        <FormItem label="管理人员数量">
				            <InputNumber :min="0" v-model="baseInfo.glrysl"></InputNumber>
				        </FormItem>
				        <FormItem label="行业门类">
				        	<Cascader 
				        		clearable 
				        		change-on-select
			        			v-model="baseInfo.hyml" 
			        			:data="industryList" 
			        			:load-data="loadIndustry" 
			        			placeholder="行业门类"></Cascader>
				        </FormItem>
				        <FormItem label="行业代码">
				            <Input clearable v-model="baseInfo.hydm" placeholder="行业代码"></Input>
				        </FormItem>
				        <FormItem label="运行状态">
				            <Select clearable v-model="baseInfo.yxzt" placeholder="请选择运行状态">
				                <Option v-for="item in yxztList" :key="item" :value="item">{{item}}</Option>
				            </Select>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<div class="line"></div>
			<Row type="flex" justify="center">
				<Col>
					<part-title text="位置信息"></part-title>
					<Form :model="addressInfo" label-position="left" :label-width="120" style="width: 600px">
				        <FormItem label="位置信息">
				        	<Row type="flex" :gutter="20">
				        		<Col span="8">
				        			<div @click="openLngModal">
					        			<Input 
					        				readonly 
					        				v-model="addressInfo.lngAndLat" 
					        				icon="md-pin" 
					        				placeholder="请选择经纬度" />
					        		</div>
				        		</Col>
				        	</Row>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<div class="line"></div>
			<Row type="flex" justify="center">
				<Col>
					<part-title text="联系人信息"></part-title>
					<Form :model="contactInfo" label-position="left" :label-width="120" style="width: 600px">
				        <FormItem label="企业负责人">
				        	<Row type="flex" :gutter="20">
					        	<Col span="8">
				        			<Input clearable v-model="contactInfo.qyfzr" :data="areaList" placeholder="姓名"></Input>
				        		</Col>
				        		<Col span="16">
				        			<Input clearable v-model="contactInfo.qyfzrdh" placeholder="电话"></Input>
				        		</Col>
				        	</Row>
				        </FormItem>
				        <FormItem label="分管安全负责人">
				        	<Row type="flex" :gutter="20">
					        	<Col span="8">
				        			<Input clearable v-model="contactInfo.fgaqfzr" :data="areaList" placeholder="姓名"></Input>
				        		</Col>
				        		<Col span="16">
				        			<Input clearable v-model="contactInfo.fgaqfzrdh" placeholder="电话"></Input>
				        		</Col>
				        	</Row>
				        </FormItem>
				        <FormItem label="经办人">
				        	<Row type="flex" :gutter="20">
					        	<Col span="8">
				        			<Input clearable v-model="contactInfo.jbr" :data="areaList" placeholder="姓名"></Input>
				        		</Col>
				        		<Col span="16">
				        			<Input clearable v-model="contactInfo.jbrdh" placeholder="电话"></Input>
				        		</Col>
				        		<Col span="24">
				        			<Input clearable v-model="contactInfo.jbryx" placeholder="邮箱"></Input>
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
		<div v-show="step == 2">
			<Row type="flex" justify="center">
				<Col span="22">
					<div class="title">请完善风险信息</div>
					<part-title text="车辆信息" :btns="['add']" @add="openClModel"></part-title>
					<Table :columns="clColumns" :data="clData">
						<template slot-scope="{ row }" slot="action">
				            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editClModel(row)">编辑</Button>
				            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeCl(row)">
						        <Button type="error" size="small" ghost>删除</Button>
						    </Poptip>
				        </template>
					</Table>
					<Row type="flex" justify="end">
						<Page
		                    size="small"
		                    style="margin-top: 10px"
		                    :page-size="clPage.pageSize"
		                    :total="clPage.totalRow"
		                    show-elevator
		                    show-total
		                    show-sizer
		                    @on-change="handleChangeClPage"
		                    @on-page-size-change="handleChangeClPageSize"
		                />
					</Row>
					<part-title text="线路信息" :btns="['add']" @add="openModel"></part-title>
					<Table :columns="xlColumns" :data="xlData">
						<template slot-scope="{ row }" slot="action">
				            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editModel(row)">编辑</Button>
				            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="remove(row)">
						        <Button type="error" size="small" ghost>删除</Button>
						    </Poptip>
				        </template>
					</Table>
					<Row type="flex" justify="end">
						<Page
		                    size="small"
		                    style="margin-top: 10px"
		                    :page-size="xlPage.pageSize"
		                    :total="xlPage.totalRow"
		                    show-elevator
		                    show-total
		                    show-sizer
		                    @on-change="handleChangeXlPage"
		                    @on-page-size-change="handleChangeXlPageSize"
		                />
					</Row>
					<part-title text="运营状况" :btns="['add']" @add="openYyModel"></part-title>
					<Table :columns="yyColumns" :data="yyData">
						<template slot-scope="{ row }" slot="name">
				            <span class="link">{{row.name}}</span>
				        </template>
						<template slot-scope="{ row }" slot="action">
				            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editYyModel(row)">编辑</Button>
				            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeYy(row)">
						        <Button type="error" size="small" ghost>删除</Button>
						    </Poptip>
				        </template>
					</Table>
					<Row type="flex" justify="end">
						<Page
		                    size="small"
		                    style="margin-top: 10px"
		                    :page-size="yyPage.pageSize"
		                    :total="yyPage.totalRow"
		                    show-elevator
		                    show-total
		                    show-sizer
		                    @on-change="handleChangeYyPage"
		                    @on-page-size-change="handleChangeYyPageSize"
		                />
					</Row>
				</Col>	
			</Row>	
			<Row type="flex" justify="center" style="margin-top: 24px" :gutter="20">
				<Col>
					<Button type="primary" style="width: 100px;" @click="step--">上一步</Button>
				</Col>
				<Col>
					<Button type="primary" style="width: 100px;" @click="saveInfo">完成</Button>
				</Col>
			</Row>
		</div>
		<Modal title="企业经纬度标注" v-model="showLngModel">
			<div id="lng_box" class="area_box"></div>
			<div slot="footer">
	            <Row type="flex" align="middle" justify="space-between">
	            	<Col style="text-align: left">
	            		<span style="font-size: 14px; color: rgba(0,0,0,0.87);">{{lng}} {{lat}}</span>
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
	            		<Button type="text" size="large" @click="cancelArea">取消</Button>
		                <Button type="primary" size="large" @click="saveArea">保存</Button>
	            	</Col>
	            </Row>
	        </div>
		</Modal>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}车辆信息`" v-model="showClModel" @on-visible-change="clModelChange">
			<div>
				<Form :model="clForm" label-position="left" :label-width="120">
					<FormItem label="车辆类型">
						<Select clearable v-model="clForm.cllx" placeholder="请选择">
			                <Option v-for="item in cllxList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="载客人数">
			            <InputNumber :min="0" v-model="clForm.zkrs"></InputNumber>
			        </FormItem>
			        <FormItem label="车辆技术等级">
			            <Select clearable v-model="clForm.cljsdj" placeholder="请选择">
			                <Option v-for="item in cljsdjList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="车辆投用时间">
			        	<DatePicker type="date" v-model="clForm.cltysj" :options="datePickerOptions" placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="填报时间">
			        	<DatePicker type="date" v-model="clForm.tbsj" :options="datePickerOptions" placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showClModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveCl">保存</Button>
	        </div>
		</Modal>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}线路信息`" v-model="showModel" @on-visible-change="modelChange">
			<div>
				<Form :model="xlForm" label-position="left" :label-width="120">
					<FormItem label="线路名称">
			        	<Input clearable v-model="xlForm.xlmc"></Input>
			        </FormItem>
			        <FormItem label="线路类型">
			        	<Select clearable v-model="xlForm.xllx" placeholder="请选择">
			                <Option v-for="item in xllxList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="运行时长（小时）">
			            <InputNumber :min="0" v-model="xlForm.yxszxs"></InputNumber>
			        </FormItem>
			        <FormItem label="线路地质灾害情况">
			            <Input clearable v-model="xlForm.xldzzhqk"></Input>
			        </FormItem>
			        <FormItem label="线路交通组成">
			        	<Select clearable multiple v-model="xlForm.xljtzc" placeholder="请选择">
			                <Option v-for="item in xljtzcList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="填报时间">
			        	<DatePicker type="date" v-model="xlForm.tbsj" :options="datePickerOptions" placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showClModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="save">保存</Button>
	        </div>
		</Modal>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}运营状况`" v-model="showYyModel" @on-visible-change="yyModelChange">
			<div>
				<Form :model="yyForm" label-position="left" :label-width="140">
					<FormItem label="近5日日平均发客量">
			        	<InputNumber :min="0" v-model="yyForm.jwrpjfkl"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间">
			        	<DatePicker type="date" v-model="yyForm.tbsj" :options="datePickerOptions"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showClModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveYy">保存</Button>
	        </div>
		</Modal>
	</div>
</template>

<script>
	import api from '@/api/api'
	import partTitle from '@/components/title'
	import tablejs from '@/common/js/table'
	import areajs from '@/common/js/area'
	import industryjs from '@/common/js/industry'
	import lngjs from '@/common/js/lng'
	import datePickerjs from '@/common/js/datePicker'
	import { getDate } from '@/utils/tool'
	export default {
		name: '',
		mixins: [tablejs, areajs, industryjs, lngjs, datePickerjs],
		components: { partTitle },
		data() {
			return {
				id: '',
				gkdx_id: '',
				loading: true,
				step: 1,	
				showAreaModel: false,
				showLngModel: false,
				showClModel: false,
				showModel: false,
				showSbfcgyModel: false,
				showZaqModel: false,
				showMainRiskModel: false,
				showYyModel: false,
				modeType: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					qymc: '企业名称',
					tyshxydm: '',
					clsj: '',
					zgrs: 0,
					glrysl: 0,
					hyml: [],
					hydm: '',
					yxzt: '',
					tyshxydm: '',
					jyfw: '',
					zcdz: '',
					quyu: []
				},
				addressInfo: {
					lngAndLat: '',
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
				yxztList: ['运行', '停运'],
				clColumns: [
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
                        title: '车辆类型',
                        key: 'cllx',
                    }, {
                        title: '载客人数',
                        key: 'zkrs',
                    }, {
                        title: '车辆技术等级',
                        key: 'cljsdj',
                    }, {
                        title: '车辆投用时间',
                        key: 'cltysj',
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
				clData: [],
				clForm: {
					cllx: '',
					zkrs: 0,
					cljsdj: '',
					cltysj: '',
					tbsj: '',
				},
				cllxList: ['大型', '中型', '小型'],
				cljsdjList: ['一级', '二级', '三级'],
				clPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				xlColumns: [
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
                        title: '线路名称',
                        key: 'xlmc',
                    }, {
                        title: '线路类型',
                        key: 'xllx',
                    }, {
                        title: '运行时长（小时）',
                        key: 'yxszxs',
                    }, {
                        title: '线路地质灾害情况',
                        key: 'xldzzhqk',
                    }, {
                        title: '线路交通组成',
                        key: 'xljtzc',
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
				xlData: [],
				xlForm: {
					xlmc: '',
					xllx: '',
					yxszxs: 0,
					xldzzhqk: '',
					xljtzc: [],
					tbsj: ''
				},
				xllxList: ['一类客运班线', '二类客运班线', '三类客运班线', '四类客运班线', '旅游客车'],
				xljtzcList: ['高速公路', '国省道路', '普通公路'],
				xlPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				yyColumns: [
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
                        title: '近5日日平均发客量',
                        key: 'jwrpjfkl',
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
				yyData: [],
				yyForm: {
					jwrpjfkl: 0,
					tbsj: '',
				},
				yyPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
			}
		},
		computed: {
			zcdz() {
				let zcdz1 = ''
				let depth = 1
				const getItem = (list, id) => {
					let item_ = list.find(item => {
						return item.value == id
					})
					zcdz1 += `${item_.label} `
					if(depth < this.baseInfo.zcdz1.length) {
						getItem(item_.children, this.baseInfo.zcdz1[depth])
						depth++
					}
				}
				if(this.baseInfo.zcdz1.length > 0) {
					getItem(this.areaList, this.baseInfo.zcdz1[0])
				}
				return `${zcdz1}${this.baseInfo.zcdz2}`
			}
		},
		methods: {
			getBaseInfo() {
				if(this.$route.query.type == '2') {
					let baseInfo = this.$storage.get('baseInfo')
					baseInfo.hyml = []
					baseInfo.quyu = []
					this.baseInfo = baseInfo
					this.addressInfo = this.$storage.get('addressInfo')
					this.contactInfo = this.$storage.get('contactInfo')
					this.form = this.$storage.get('form')
					this.getQy()
					this.getHy()
				}else {
					this.loading = false
				}
			},
			async nextStep() {
				let params = {
					quyu_id: this.baseInfo.quyu[this.baseInfo.quyu.length - 1],
					...this.baseInfo,
					...this.addressInfo,
					...this.contactInfo,
					clsj: this.baseInfo.clsj ? getDate(new Date(this.baseInfo.clsj).getTime(), 'date') : '',
					hyml: this.baseInfo.hyml[this.baseInfo.hyml.length - 1],
					jd: this.addressInfo.lngAndLat.split(' ')[0],
					wd: this.addressInfo.lngAndLat.split(' ')[1],
				}	 
				if(this.$route.query.type == 2) {
					params.gkdx_id = this.form.gkdx_id
				}
				delete params.quyu
				delete params.lngAndLat
				let { status_code, message } = await api.addCtkyBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
					if(this.$route.query.type == 2) {
						this.$storage.set('gkdx_id', this.form.gkdx_id)
						this.$router.back()
					}else {
						let { status_code, data } = await api.getCtkyBase()
						if(status_code == 200) {
							this.$storage.set('gkdx_id', data.data[0].gkdx_id)
						}
						this.$router.replace('/baseInfo')
					}
					// this.loading = true
					// this.step++
					// if(this.$route.query.type == 2) {
					// 	this.gkdx_id = this.form.gkdx_id
					// }else {
					// 	let { status_code, data } = await api.getCtkyBase()
					// 	if(status_code == 200) {
					// 		this.gkdx_id = data.data[0].gkdx_id
					// 	}
					// }
					// let clParams = {
					// 	gkdx_id: this.gkdx_id,
					// 	per_page: this.clPage.pageSize,
					// 	page: this.clPage.pageIndex,
					// }
					// let xlParams = {
					// 	gkdx_id: this.gkdx_id,
					// 	per_page: this.xlPage.pageSize,
					// 	page: this.xlPage.pageIndex,
					// }
					// let yyParams = {
					// 	gkdx_id: this.gkdx_id,
					// 	per_page: this.yyPage.pageSize,
					// 	page: this.yyPage.pageIndex,
					// }
					// Promise.all([api.getClList(clParams), api.getXlList(xlParams), api.getYyList(yyParams)]).then((result) => {
					//   	let clRes = result[0], xlRes = result[1], yyRes = result[2]
					//   	if(clRes.status_code == 200) {
					//   		this.clData = clRes.data.data
					//   		this.clPage.totalRow = clRes.data.total
					//   	}
					//   	if(xlRes.status_code == 200) {
					//   		this.xlData = xlRes.data.data
					//   		this.xlPage.totalRow = xlRes.data.total
					//   	}
					//   	if(yyRes.status_code == 200) {
					//   		this.yyData = yyRes.data.data
					//   		this.yyPage.totalRow = yyRes.data.total
					//   	}
					//   	this.loading = false   
					// }).catch((error) => {
					//   	console.log(error)
					//   	this.loading = false
					// })
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
						this.map.centerAndZoom(new T.LngLat(e.lnglat.lng, e.lnglat.lat), 10);
						var config = {
			                showLabel: true,
			                color: "blue", weight: 3, opacity: 0.5, fillColor: "#FFFFFF", fillOpacity: 0.5
			            };
			            //创建标注工具对象
			            this.polygonTool = new T.PolygonTool(this.map, config);
		            });
				})
			},
			openArea() {
				this.polygonTool.open();
				this.polygonTool.addEventListener('draw', (e) => {
					// 获取绘制的多边形信息
					console.log(e);
				})
			},
			cancelArea() {
				this.map.clearOverLays()
				this.showAreaModel = false
			},
			saveArea() {
				this.showAreaModel = false
			},
			handleChangeClPage(val) {
				this.clPage.pageIndex = val
				this.getClList()
			},
			handleChangeClPageSize(val) {
				this.clPage.pageSize = val
				this.getClList()
			},
			async getClList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.clPage.pageSize,
					page: this.clPage.pageIndex,
				}
				let { status_code, data } = await api.getClList(params)
				if(status_code == 200) {
					this.clData = data.data
					this.clPage.totalRow = data.total
				}
			},
			openClModel() {
				this.modeType = 1;
				this.showClModel = true
			},
			editClModel(row) {
				this.clForm = {
					cllx: row.cllx,
					zkrs: row.zkrs,
					cljsdj: row.cljsdj,
					cltysj: new Date(row.cltysj),
					tbsj: new Date(row.tbsj),
				}
				this.id = row.id
				this.modeType = 2;
				this.showClModel = true
			},
			clModelChange(status) {
				console.log(status)
				if(!status) {
					this.clForm = {
						cllx: '',
						zkrs: 0,
						cljsdj: '',
						cltysj: '',
						tbsj: '',
					}
				}
			},
			async removeCl(row) {
				let { status_code } = await api.deleteClInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getClList()
			},
			async saveCl() {
				let params = {
					...this.clForm,
					cltysj: this.clForm.cltysj ? getDate(new Date(this.clForm.cltysj).getTime(), 'date') : '',
					tbsj: this.clForm.tbsj ? getDate(new Date(this.clForm.tbsj).getTime(), 'date') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addClInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showClModel = false
					this.getClList()
				}
			},
			handleChangeXlPage(val) {
				this.xlPage.pageIndex = val
				this.getXlList()
			},
			handleChangeXlPageSize(val) {
				this.xlPage.pageSize = val
				this.getXlList()
			},
			async getXlList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.xlPage.pageSize,
					page: this.xlPage.pageIndex,
				}
				let { status_code, data } = await api.getXlList(params)
				if(status_code == 200) {
					this.xlData = data.data
					this.xlPage.totalRow = data.total
				}
			},
			openModel() {
				this.modeType = 1;
				this.showModel = true;
			},
			editModel(row) {
				this.xlForm = {
					xlmc: row.xlmc,
					xllx: row.xllx,
					yxszxs: row.yxszxs ? Number(row.yxszxs) : 0,
					xldzzhqk: row.xldzzhqk,
					xljtzc: row.xljtzc.split(','),
					tbsj: new Date(row.tbsj),
				}
				this.id = row.id
				this.modeType = 2;
				this.showModel = true
			},
			modelChange(status) {
				if(!status) {
					this.clForm = {
						xlmc: '',
						xllx: '',
						yxszxs: 0,
						xldzzhqk: '',
						xljtzc: [],
						tbsj: '',
					}
				}
			},
			async remove(row) {
				let { status_code } = await api.deleteXlInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getXlList()
			},
			async save() {
				let params = {
					...this.xlForm,
					xljtzc: this.xlForm.xljtzc.join(','),
					tbsj: this.xlForm.tbsj ? getDate(new Date(this.xlForm.tbsj).getTime(), 'date') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addXlInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showModel = false
					this.getXlList()
				}
			},
			handleChangeYyPage(val) {
				this.yyPage.pageIndex = val
				this.getYyList()
			},
			handleChangeYyPageSize(val) {
				this.yyPage.pageSize = val
				this.getYyList()
			},
			async getYyList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.yyPage.pageSize,
					page: this.yyPage.pageIndex,
				}
				let { status_code, data } = await api.getYyList(params)
				if(status_code == 200) {
					this.yyData = data.data
					this.yyPage.totalRow = data.total
				}
			},
			openYyModel() {
				this.modeType = 1;
				this.showYyModel = true;
			},
			editYyModel(row) {
				this.yyForm = {
					jwrpjfkl: row.jwrpjfkl,
					tbsj: new Date(row.tbsj),
				}
				this.id = row.id
				this.modeType = 2;
				this.showYyModel = true
			},
			yyModelChange(status) {
				console.log(status)
				if(!status) {
					this.yyForm = {
						jwrpjfkl: 0,
						tbsj: '',
					}
				}
			},
			async removeYy(row) {
				let { status_code } = await api.deleteYyInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getYyList()
			},
			async saveYy() {
				let params = {
					...this.yyForm,
					tbsj: this.yyForm.tbsj ? getDate(new Date(this.yyForm.tbsj).getTime(), 'date') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addYyInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showYyModel = false
					this.getYyList()
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