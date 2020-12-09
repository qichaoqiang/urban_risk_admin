<template>
	<div class="page">
		<div v-show="step == 1">
			<Row type="flex" justify="center">
				<Col>
					<div class="title">请完善{{step == 1 ? '学校' : '风险'}}信息</div>
					<part-title text="基本信息"></part-title>
					<Form :model="baseInfo" label-position="left" :label-width="170" style="width: 600px">
						<FormItem label="学校名称">
				            {{baseInfo.xxmc}}
				        </FormItem>
				        <FormItem label="举办单位">
				            <Input clearable v-model="baseInfo.jbdw" placeholder="举办单位"></Input>
				        </FormItem>
				        <FormItem label="学校类型">
				            <Select clearable v-model="baseInfo.xxlx" placeholder="学校类型">
				                <Option v-for="item in xxlxList" :key="item" :value="item">{{item}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="建成投用时间">
				            <DatePicker type="date" v-model="baseInfo.jctysj"  placeholder="建成投用时间"></DatePicker>
				        </FormItem>
				        <FormItem label="学校地址">
				        	<Input clearable v-model="addressInfo.xxdz" placeholder="学校地址"></Input>
				        </FormItem>
				        <FormItem label="经纬度">
				        	<div @click="openLngModal">
			        			<Input 
			        				readonly 
			        				v-model="addressInfo.lngAndLat" 
			        				icon="md-pin" 
			        				placeholder="经纬度" />
			        		</div>
				        </FormItem>
				        <FormItem label="学校范围">
				        	<div @click.stop="openAreaModal">
			        			<Input 
			        				readonly 
			        				v-model="addressInfo.xxfw" 
			        				icon="md-pin" 
			        				placeholder="学校范围" />
			        		</div>
				        </FormItem>
				        <FormItem label="行业代码">
				            <Input clearable v-model="baseInfo.hydm" placeholder="行业代码"></Input>
				        </FormItem>
				        <FormItem label="所属辖区">
				        	<Cascader 
				            	clearable 
				            	change-on-select
				            	v-model="baseInfo.quyu" 
				            	:data="areaList" 
				            	:load-data="loadArea" 
				            	placeholder="所属辖区"></Cascader>
				        </FormItem>
				        <FormItem label="社会统一信用代码">
				            <Input clearable v-model="baseInfo.tyshxydm" placeholder="社会统一信用代码"></Input>
				        </FormItem>
				        <FormItem label="举办单位注册登记地址">
				            <Input clearable v-model="baseInfo.jbdwzcdjdz" placeholder="举办单位注册登记地址"></Input>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<div class="line"></div>
			<Row type="flex" justify="center">
				<Col>
					<part-title text="建筑物信息"></part-title>
					<Form :model="addressInfo" label-position="left" :label-width="170" style="width: 600px">
				        <FormItem label="学校占地面积（㎡）">
				        	<InputNumber :min="0" v-model="addressInfo.xxzdmj" placeholder="占地面积"></InputNumber>
				        </FormItem>
				        <FormItem label="学校建筑占地面积（㎡）">
				        	<InputNumber :min="0" v-model="addressInfo.jxjzzdmj" placeholder="建筑面积"></InputNumber>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<div class="line"></div>
			<Row type="flex" justify="center">
				<Col>
					<part-title text="联系人信息"></part-title>
					<Form :model="addressInfo" label-position="left" :label-width="170" style="width: 600px">
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
					<part-title text="人员组成"></part-title>
					<Form :model="mostForm" label-position="left" inline>
				        <FormItem label="教职工人数" :label-width="100" style="margin-right: 40px">
				        	<InputNumber :min="0" v-model="mostForm.jzgrs"></InputNumber>
				        </FormItem>
				        <FormItem label="学生人数" :label-width="80" style="margin-right: 40px">
				        	<InputNumber :min="0" v-model="mostForm.xsrs"></InputNumber>
				        </FormItem>
				        <FormItem label="寄宿制" :label-width="60" style="margin-right: 40px">
				            <Select clearable v-model="mostForm.jsz" placeholder="请选择">
				                <Option v-for="item in jszList" :key="item" :value="item">{{item}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="床位数" :label-width="60" v-if="mostForm.jsz == '寄宿'">
				        	<InputNumber :min="0" v-model="mostForm.cws"></InputNumber>
				        </FormItem>
					</Form>
					<part-title text="危险化学品(实验室)" :btns="['add']" @add="openWhsysModel"></part-title>
					<Table :columns="whsysColumns" :data="whsysData">
						<template slot-scope="{ row }" slot="name">
				            <span class="link">{{row.name}}</span>
				        </template>
						<template slot-scope="{ row }" slot="action">
				            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editWhsysModel(row)">编辑</Button>
				            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeWhsys(row)">
						        <Button type="error" size="small" ghost>删除</Button>
						    </Poptip>
				        </template>
					</Table>
					<Row type="flex" justify="end">
						<Page
		                    size="small"
		                    style="margin-top: 10px"
		                    :page-size="whsysPage.pageSize"
		                    :total="whsysPage.totalRow"
		                    show-elevator
		                    show-total
		                    show-sizer
		                    @on-change="handleChangeWhsysPage"
		                    @on-page-size-change="handleChangeWhsysPageSize"
		                />
					</Row>
					<part-title text="消防重点单位"></part-title>
					<Form :model="mostForm" label-position="left" inline>
				        <FormItem label="消防重点单位" :label-width="160">
				            <Select clearable v-model="mostForm.xfzddw" placeholder="请选择">
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
	            		<Button type="text" size="large" @click="cancelArea">取消</Button>
		                <Button type="primary" size="large" @click="saveArea">确定</Button>
	            	</Col>
	            </Row>
	        </div>
		</Modal>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}危险化学品(实验室)`" v-model="showWhsysModel" @on-visible-change="whsysModelChange">
			<div>
				<Form :model="whsysForm" label-position="left" :label-width="170">
					<FormItem label="化学品名称">
			        	<Input clearable v-model="whsysForm.hxpmc"></Input>
			        </FormItem>
			        <FormItem label="CAS">
			        	<Input clearable v-model="whsysForm.Ch"></Input>
			        </FormItem>
			        <FormItem label="数量">
			        	<Row type="flex" align="middle">
	            			<Col>
			        			<InputNumber :min="0" v-model="whsysForm.sl"></InputNumber>
	            			</Col>
	            			<Col>
	            				<Select clearable v-model="whsysForm.jldw" placeholder="单位">
					                <Option v-for="item in jldwList" :key="item" :value="item">{{item}}</Option>
					            </Select>
	            			</Col>
	            		</Row>
			        </FormItem>
			        <FormItem label="储存位置">
			        	<Input clearable v-model="whsysForm.ccwz"></Input>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhsysModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveWhsys">保存</Button>
	        </div>
		</Modal>
	</div>
</template>

<script>	
	import api from '@/api/api'
	import partTitle from '@/components/title'
	import areajs from '@/common/js/area'
	import lngjs from '@/common/js/lng'
	import datePickerjs from '@/common/js/datePicker'
	import { getDate } from '@/utils/tool'
	export default {
		name: '',
		mixins: [areajs, lngjs, datePickerjs],
		components: { partTitle },
		data() {
			return {
				step: 1,	
				showAreaModel: false,
				showLngModel: false,
				showWhsysModel: false,
				modeType: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					xxmc: '学校名称',
					jbdw: '',
					jbdwzcdjdz: '',
					tyshxydm: '',
					xxdz: '',
					quyu: [],
					jctysj: '',
					xxlx: '',
					hydm: '',
				},
				xxlxList: ['幼儿园', '小学', '初中', '普通高中', '九年一贯制', '十二年一贯制', '职业高中', '职业技术学校', '特殊学校', '大学', ],
				addressInfo: {
					xxdz: '',
					xxfw: '',
					lngAndLat: '',	
					xxzdmj: 0,
					jxjzzdmj: 0
				},
				contactInfo: {
					jbr: '',
					jbrdh: '',
					jbryx: '',
				},
				mostForm: {
					jzgrs: 0,
					xsrs: 0,
					jsz: '',
					cws: 0,
					xfzddw: ''
				},
				jszList: ['非寄宿', '寄宿', '仅提供午休'],
				xfzddwList: [
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
						value: 1,
						name: 'xxxx'
					}
				],
				areaList: [],
				whsysColumns: [
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
                        key: 'hxpmc',
                    }, {
                        title: 'CAS',
                        key: 'Ch',
                    }, {
                        title: '数量',
                        key: 'sl',
                    }, {
                        title: '储存位置',
                        key: 'ccwz',
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				whsysData: [],
				whsysForm: {
					hxpmc: '',
					Ch: '',
					sl: 0,
					jldw: '',
					ccwz: ''
				},
				jldwList: ['吨', '立方', 'KG', 'L'],
				whsysPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				xxfw: '',
				form: {}
			}
		},
		watch: {

		},
		computed: {

		},
		methods: {
			getBaseInfo() {
				if(this.$route.query.type == '2') {
					let baseInfo = this.$storage.get('baseInfo')
					// baseInfo.hyml = []
					// baseInfo.quyu = []
					this.baseInfo = baseInfo
					this.addressInfo = this.$storage.get('addressInfo')
					this.contactInfo = this.$storage.get('contactInfo')
					this.mostForm = this.$storage.get('mostForm')
					this.form = this.$storage.get('form')
					this.getQy()
					// this.getHy()
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
					jctysj: this.baseInfo.jctysj ? getDate(new Date(this.baseInfo.jctysj).getTime(), 'date') : '',
					quyu_id: this.baseInfo.quyu[this.baseInfo.quyu.length - 1],
					jd: this.addressInfo.lngAndLat.split(' ')[0],
					wd: this.addressInfo.lngAndLat.split(' ')[1],
				}	 
				if(this.$route.query.type == 2) {
					params.gkdx_id = this.form.gkdx_id
				}
				delete params.quyu
				delete params.lngAndLat
				let { status_code, message } = await api.addSchoolBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
					if(this.$route.query.type == 2) {
						this.$storage.set('gkdx_id', this.form.gkdx_id)
						this.$router.back()
					}else {
						let { status_code, data } = await api.getSchoolBase()
						if(status_code == 200) {
							this.$storage.set('gkdx_id', data.data[0].gkdx_id)
						}
						this.$router.replace('/baseInfo')
					}
				}
			},
			async saveInfo() {
				let params = {
					...this.mostForm,
					gkdx_id: this.gkdx_id
				}
				let { status_code, message } = await api.addSchoolBase(params);
				if(status_code == 200) {
					this.$Message.success(message)
					if(this.$route.query.type == 2) {
						this.$router.back()
					}else {
						this.$router.replace('/baseInfo')
					}
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
			            if(this.addressInfo.xxfw) {
			            	let xxfw = JSON.parse(this.addressInfo.xxfw)
			            	let points = xxfw.map(item => {
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
					this.addressInfo.xxfw = JSON.stringify(e.currentLnglats)
				})
			},
			clearArea() {
				this.addressInfo.xxfw = ''
				this.map.clearOverLays()
			},
			cancelArea() {
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.addressInfo.xxfw = this.xxfw || this.form.xxfw || '';
				this.showAreaModel = false
			},
			saveArea() {
				this.xxfw = this.addressInfo.xxfw;
				this.form.xxfw = this.addressInfo.xxfw;
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.showAreaModel = false
			},
			handleChangeWhsysPage(val) {
				this.whsysPage.pageIndex = val
				this.getWhsysItemList()
			},
			handleChangeWhsysPageSize(val) {
				this.whsysPage.pageSize = val
				this.getWhsysItemList()
			},
			whsysModelChange(status) {
				if(!status) {
					this.whsysForm = {
						hxpmc: '',
						Ch: '',
						sl: 0,
						jldw: '',
						ccwz: ''
					}
				}
			},
			async getWhsysItemList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.whsysPage.pageSize,
					page: this.whsysPage.pageIndex,
				}
				let { status_code, data } = await api.getWhsysItemList(params)
				if(status_code == 200) {
					this.whsysData = data.data
					this.whsysPage.totalRow = data.total
				}
			},
			openWhsysModel() {
				this.modeType = 1;
				this.showWhsysModel = true
			},
			editWhsysModel(row) {
				this.whsysForm = {
					hxpmc: row.hxpmc,
					Ch: row.Ch,
					sl: row.sl ? Number(row.sl) : '',
					jldw: row.jldw,
					ccwz: row.ccwz
				}
				this.id = row.id
				this.modeType = 2;
				this.showWhsysModel = true
			},
			async removeWhsys(row) {
				let { status_code } = await api.deleteWhsysItem(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getWhsysItemList()
			},
			async saveWhsys() {
				let params = {
					...this.whsysForm,
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addWhsysItem(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showWhsysModel = false
					this.getWhsysItemList()
				}
			},
		},
		created() {
			this.getArea('', list => {
				this.areaList = list
				this.getBaseInfo()
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