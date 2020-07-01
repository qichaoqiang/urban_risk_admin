<template>
	<div class="page">
		<div v-show="step == 1">
			<Row type="flex" justify="center">
				<Col>
					<div class="title">请完善{{step == 1 ? '场所' : '风险'}}信息</div>
					<part-title text="基本信息"></part-title>
					<Form :model="baseInfo" ref="baseInfo" :rules="rules" hide-required-mark label-position="left" :label-width="140" style="width: 600px">
						<FormItem label="名称">
				            {{baseInfo.mc}}
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
				        <FormItem label="地址" prop="dz">
				        	<Input clearable v-model="baseInfo.dz" placeholder="地址"></Input>
				        </FormItem>
				        <FormItem label="经纬度" prop="lngAndLat">
				        	<lng id="lng_box" :lngAndLat.sync="baseInfo.lngAndLat"></lng>
				        </FormItem>
				        <FormItem label="场所范围" prop="csfw">
				        	<div @click.stop="openAreaModal">
			        			<Input 
			        				readonly 
			        				v-model="baseInfo.csfw" 
			        				icon="md-pin" 
			        				placeholder="场所范围" />
			        		</div>
				        </FormItem>
				        <FormItem label="机构类型" prop="jglx">
				            <Select clearable v-model="baseInfo.jglx" placeholder="机构类型">
				                <Option v-for="item in jglxList" :key="item" :value="item">{{item}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="机构性质" prop="jgxz">
				        	<Select clearable v-model="baseInfo.jgxz" placeholder="机构性质">
				                <Option v-for="item in jgxzList" :key="item" :value="item">{{item}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="机构星级" prop="jgxj">
				            <Select clearable v-model="baseInfo.jgxj" placeholder="机构星级">
				                <Option v-for="item in jgxjList" :key="item" :value="item">{{item}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="收住对象" prop="szdx">
				        	<Select clearable multiple v-model="baseInfo.szdx" placeholder="收住对象">
				                <Option v-for="item in szdxList" :key="item" :value="item">{{item}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="举办单位" prop="jbdw">
				            <Input clearable v-model="baseInfo.jbdw" placeholder="举办单位"></Input>
				        </FormItem>
				        <FormItem label="成立时间" prop="clsj">
				            <DatePicker type="date" v-model="baseInfo.clsj"  placeholder="请选择"></DatePicker>
				        </FormItem>
				        <FormItem label="行业门类" prop="hyml">
				        	<Cascader 
				        		clearable 
				        		change-on-select
			        			v-model="baseInfo.hyml" 
			        			:data="industryList" 
			        			:load-data="loadIndustry" 
			        			placeholder="行业门类"></Cascader>
				        </FormItem>
				        <FormItem label="行业代码" prop="hydm">
				            <Input clearable v-model="baseInfo.hydm" placeholder="行业代码"></Input>
				        </FormItem>
				        <FormItem label="社会统一信用代码" prop="tyshxydm">
				            <Input clearable v-model="baseInfo.tyshxydm" placeholder="社会统一信用代码"></Input>
				        </FormItem>
				        <FormItem label="机构简介" prop="jgjj">
				            <Input clearable v-model="baseInfo.jgjj" type="textarea" placeholder="机构简介"></Input>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<div class="line"></div>
			<Row type="flex" justify="center">
				<Col>
					<part-title text="建筑物信息"></part-title>
					<Form :model="baseInfo" ref="jzInfo" :rules="rules" hide-required-mark label-position="left" :label-width="140" style="width: 600px">
				        <FormItem label="占地面积（㎡）" prop="zdmj">
				        	<InputNumber :min="0" v-model="baseInfo.zdmj" placeholder="占地面积"></InputNumber>
				        </FormItem>
				        <FormItem label="建筑面积（㎡）" prop="jzmj">
				        	<InputNumber :min="0" v-model="baseInfo.jzmj" placeholder="建筑面积"></InputNumber>
				        </FormItem>
				        <FormItem label="建筑层数" prop="jzcs">
				        	<InputNumber :min="0" v-model="baseInfo.jzcs" placeholder="建筑层数"></InputNumber>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<div class="line"></div>
			<Row type="flex" justify="center">
				<Col>
					<part-title text="联系人信息"></part-title>
					<Form :model="baseInfo" ref="contactInfo" :rules="rules" hide-required-mark label-position="left" :label-width="140" style="width: 600px">
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
		<div v-show="step == 2">
			<Row type="flex" justify="center">
				<Col span="22">
					<div class="title">请完善风险信息</div>
					<part-title text="人员信息"></part-title>
					<Row type="flex" justify="end">
						<Col span="23">
			                <part-title text="工作负荷" :btns="['add']" @add="openInfoModel"></part-title>
							<Table :columns="infoColumns" :data="infoData">
								<template slot-scope="{ row }" slot="name">
						            <span class="link">{{row.name}}</span>
						        </template>
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editInfoModel(row)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeInfo(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<part-title text="收住对象" :btns="['add']" @add="openPersonModel"></part-title>
							<Table :columns="personColumns" :data="personData">
								<template slot-scope="{ row }" slot="name">
						            <span class="link">{{row.name}}</span>
						        </template>
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editPersonModel(row)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removePerson(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
						</Col>
					</Row>
					<part-title text="场所危险性"></part-title>
					<Form :model="xfForm" label-position="left" inline :label-width="100">
				        <FormItem label="消防重点单位" style="margin-right: 140px">
				            <Select clearable v-model="mostForm.xfzddw" placeholder="请选择">
				                <Option v-for="item in xfzddwList" :key="item.value" :value="item.value">{{item.name}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="火灾高危单位" style="margin-right: 140px">
				            <Select clearable v-model="mostForm.hzgwdw" placeholder="请选择">
				                <Option v-for="item in xfzddwList" :key="item.value" :value="item.value">{{item.name}}</Option>
				            </Select>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<Row type="flex" justify="center" style="margin-top: 24px">
				<Col>
					<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo">完成</Button>
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
		                <Button type="primary" size="large" @click="saveLng">保存</Button>
	            	</Col>
	            </Row>
	        </div>
		</Modal>
		<Modal width="1000" title="范围标注" v-model="showAreaModel">
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
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}工作负荷`" v-model="showInfoModel">
			<div>
				<Form :model="infoForm" label-position="left" :label-width="140">
					<FormItem label="从业人数">
			            <InputNumber :min="0" v-model="infoForm.num"></InputNumber>
			        </FormItem>
			        <FormItem label="核定床位数">
			            <InputNumber :min="0" v-model="infoForm.num"></InputNumber>
			        </FormItem>
			        <FormItem label="入住人数">
			            <InputNumber :min="0" v-model="infoForm.num"></InputNumber>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showInfoModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveInfo">保存</Button>
	        </div>
		</Modal>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}收住对象`" v-model="showPersonModel">
			<div>
				<Form :model="personForm" label-position="left" :label-width="140">
			        <FormItem label="自理型人数">
			            <InputNumber :min="0" v-model="personForm.num"></InputNumber>
			        </FormItem>
					<FormItem label="护理型人数">
			            <InputNumber :min="0" v-model="personForm.num"></InputNumber>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showPersonModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="savePerson">保存</Button>
	        </div>
		</Modal>
	</div>
</template>

<script>	
	import api from '@/api/api'
	import partTitle from '@/components/title'
	import lng from '../../../baseInfo/components/lng'
	import areajs from '@/common/js/area'
	import industryjs from '@/common/js/industry'
	import lngjs from '@/common/js/lng'
	import datePickerjs from '@/common/js/datePicker'
	import { getDate } from '@/utils/tool'

	const levelChildren = [
		{
			value: 1, 
			label: '甲'
		}, {
			value: 2, 
			label: '乙'
		}, {
			value: 3, 
			label: '丙'
		}
	]

	export default {
		name: '',
		mixins: [areajs, industryjs, lngjs, datePickerjs],
		components: { partTitle, lng },
		data() {
			return {
				gkdx_id: this.$storage.get('userInfo').gkdx_id,
				step: 1,	
				showAreaModel: false,
				showLngModel: false,
				showInfoModel: false,
				showPersonModel: false,
				showRiskLiauidModel: false,
				showXfModel: false,
				showMainRiskModel: false,
				showSpecialModel: false,
				modeType: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					mc: '机构',
					quyu: [],
					jbdw: '',
					tyshxydm: '',
					jglx: '',
					jgxz: '',
					clsj: '',
					hyml: [],
					hydm: '',
					jgxj: '',
					szdx: [],
					jgjj: '',
				},
				baseInfo: {
					dz: '',
					zdmj: 0,
					jzmj: 0,
					jzcs: 0,
					lngAndLat: '',	
					csfw: ''	
				},
				baseInfo: {
					jbr: '',
					jbrdh: '',
					jbryx: '',
				},
				mostForm: {
					max: 0,
					average: 0
				},
				area: '',
				lng: '',
				lat: '',
				levelList: [
					{
						value: 0,
	                    label: '未定级'
					}, {
						value: 1,
	                    label: '一级',
	                    children: levelChildren
					}, {
						value: 2,
	                    label: '二级',
	                    children: levelChildren
					}, {
						value: 3,
	                    label: '三级',
	                    children: levelChildren
					}, {
						value: 4,
	                    label: '卫生院',
	                    children: levelChildren
					}
				],
				jglxList: ['养老院', '福利院', '示范型老年食堂', '示范型居家养老服务中心'],
				jgxzList: ['公办', '民办', '公建民营'],
				jgxjList: ['无', '一星', '二星', '三星', '四星', '五星'],
				szdxList: ['老人', '残疾人', '儿童'],
				infoColumns: [
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
                        title: '从业人数',
                        key: 'cas',
                    }, {
                        title: '核定床位数',
                        key: 'cas',
                    }, {
                        title: '入住人数',
                        key: 'cas',
                    }, {
                        title: '填报时间',
                        key: 'cas',
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				infoData: [
					{
						name: 'hahaha',
						cas: 1111
					}
				],
				infoForm: {
					name: '',
					num: 0
				},
				personColumns: [
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
                        title: '自理型人数',
                        key: 'cas',
                    }, {
                        title: '护理型人数',
                        key: 'cas',
                    }, {
                        title: '填报时间',
                        key: 'cas',
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				personData: [
					{
						name: 'hahaha',
						cas: 1111
					}
				],
				personForm: {
					num: 0
				},
				xfForm: {
					num: 0,
					name: '',
					isDevice: '',
					type: ''
				},
				xfzddwList: [
					{
						value: 0,
						name: '否'
					}, {
						value: 1,
						name: '是'
					}
				],
				form: {}
			}
		},
		watch: {

		},
		computed: {
			rules() {
				return {
                	quyu: [{ required: true, type: 'array', message: '请选择', trigger: 'change' }],
                	dz: [{ required: true, message: '请输入', trigger: 'change' }],
                	hyml: [{ required: true, type: 'array', message: '请选择', trigger: 'change' }],
                	csfw: [{ required: true, message: '请选择', trigger: 'change' }],
                	lngAndLat: [{ required: true, message: '请选择', trigger: 'change' }],
                	jglx: [{ required: true, message: '请选择', trigger: 'change' }],
                	jgxz: [{ required: true, message: '请选择', trigger: 'change' }],
                	jgxj: [{ required: true, message: '请选择', trigger: 'change' }],
                	szdx: [{ required: true, type: 'array', message: '请选择', trigger: 'change' }],
                	jbdw: [{ required: true, message: '请输入', trigger: 'change' }],
                	clsj: [{ required: true, type: 'date', message: '请输入', trigger: 'change' }],
                	hydm: [{ required: true, message: '请输入', trigger: 'change' }],
                	tyshxydm: [{ required: true, message: '请输入', trigger: 'change' }],
                	jgjj: [{ required: true, message: '请输入', trigger: 'change' }],
                	zdmj: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
                	jzmj: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
                	jzcs: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
                	jbr: [{ required: true, message: '请输入', trigger: 'change' }],
                	jbrdh: [{ required: true, message: '请输入', trigger: 'change' }],
                	jbryx: [{ required: true, message: '请输入', trigger: 'change' }],
				}
			},
		},
		methods: {
			async getBaseInfo() {
				let { status_code, data, message } = await api.getNursBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					let { jbr, jbrdh, jbryx, mc, dz, quyu_id, jd, wd, csfw, jbdw, tyshxydm, jglx, jgxz, clsj, hyml, hydm, jgxj, szdx, zdmj, jzmj, jzcs, jgjj, xfzddw, hzgwdw } = this.form
					this.baseInfo = { mc, jbdw, tyshxydm, jglx, jgxz, hydm, jgxj, jgjj, dz, csfw, zdmj, jzmj, jzcs, lngAndLat: '', jbr, jbrdh, jbryx, quyu: [], hyml: [], szdx: [], clsj }
					this.baseInfo.clsj = clsj ? new Date(clsj) : '';
					this.baseInfo.szdx = szdx ? szdx.split(',') : [];
					this.baseInfo.zdmj = zdmj ? Number(zdmj) : 0
					this.baseInfo.jzmj = jzmj ? Number(jzmj) : 0
					this.baseInfo.jzcs = jzcs ? Number(jzcs) : 0
					this.baseInfo.csfw = csfw || ''
					this.baseInfo.jgjj = jgjj || ''
					this.baseInfo.lngAndLat = this.form.jd && this.form.wd ? `${(this.form.jd - 0).toFixed(6)} ${(this.form.wd - 0).toFixed(6)}` : ''
					this.mostForm = { xfzddw, hzgwdw }
					this.getQy()
					this.getHy()
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
					...this.baseInfo,
					...this.baseInfo,
					...this.baseInfo,
					clsj: this.baseInfo.clsj ? getDate(new Date(this.baseInfo.clsj).getTime(), 'date') : '',
					quyu_id: this.baseInfo.quyu[this.baseInfo.quyu.length - 1],
					hyml: this.baseInfo.hyml[this.baseInfo.hyml.length - 1],
					szdx: this.baseInfo.szdx.join(','),
					jd: this.baseInfo.lngAndLat.split(' ')[0],
					wd: this.baseInfo.lngAndLat.split(' ')[1],
				}	 
				if(this.$route.query.type == 2) {
					params.gkdx_id = this.form.gkdx_id
				}
				delete params.quyu
				delete params.lngAndLat
				let { status_code, message } = await api.addNursBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
					if(this.$route.name == 'base') {
						this.$storage.set('gkdx_id', this.form.gkdx_id)
						this.$router.back()
					}
				}
			},
			saveInfo() {

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
			            if(this.baseInfo.csfw) {
			            	let csfw = JSON.parse(this.baseInfo.csfw)
			            	let points = csfw.map(item => {
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
					this.baseInfo.csfw = JSON.stringify(e.currentLnglats)
				})
			},
			clearArea() {
				this.baseInfo.csfw = ''
				this.map.clearOverLays()
			},
			cancelArea() {
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.baseInfo.csfw = this.csfw || this.form.csfw || '';
				this.showAreaModel = false
			},
			saveArea() {
				this.csfw = this.baseInfo.csfw;
				this.form.csfw = this.baseInfo.csfw;
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.showAreaModel = false
			},
			openLngModal() {
				this.showLngModel = true;
				this.$nextTick(() => {
					let self = this;
					let lo = new T.Geolocation();
		            lo.getCurrentPosition((e) => {
	                    this.lng = e.lnglat.lng.toFixed(1);
	                    this.lat = e.lnglat.lat.toFixed(1);
						this.map = new T.Map('lng_box');
	                    let marker = new T.Marker(e.lnglat);
	                    this.map.addOverLay(marker);
						this.map.centerAndZoom(new T.LngLat(e.lnglat.lng, e.lnglat.lat), 10);
						marker.enableDragging();
						marker.addEventListener('mouseup', (e) => {
							console.log(e.lnglat.getLng() + "," + e.lnglat.getLat());
							this.lng = e.lnglat.getLng().toFixed(1);
	                    	this.lat = e.lnglat.getLat().toFixed(1);
						})
		            });
				})
			},
			saveLng() {
				this.baseInfo.lngAndLat = `${this.lng} ${this.lat}`
				this.showLngModel = false
				this.$nextTick(() => {
					this.map = null;
					this.lng = '';
					this.lat = ''
				})
			},
			openInfoModel() {
				this.modeType = 1;
				this.showInfoModel = true;
			},
			editInfoModel(row) {

			},
			removeInfo(row) {

			},
			saveInfo() {

			},
			openPersonModel() {
				this.modeType = 1;
				this.showPersonModel = true
			},
			editPersonModel(row) {

			},
			removePerson(row) {

			},
			savePerson() {

			},
			openXfModel() {
				this.modeType = 1;
				this.showXfModel = true;
			},
			editXfModel(row) {

			},
			removeXf(row) {

			},
			saveXf() {

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