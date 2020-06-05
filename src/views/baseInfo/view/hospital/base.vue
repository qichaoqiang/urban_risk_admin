<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div>
			<Row type="flex" justify="center">
				<Col>
					<Row type="flex" justify="end" style="margin-top: 12px">
						<Col>
							<Button type="primary" @click="edit">编辑</Button>
						</Col>
					</Row>
					<part-title text="基本信息"></part-title>
					<Form :model="baseInfo" disabled label-position="left" :label-width="140" style="width: 600px">
						<FormItem label="医院名称">
				            {{baseInfo.yymc}}
				        </FormItem>
				        <FormItem label="医院类型">
				            <Select clearable v-model="baseInfo.yylx" placeholder="医院类型">
				                <Option v-for="item in yylxList" :key="item" :value="item">{{item}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="医院等级">
				        	<Cascader clearable :data="levelList" v-model="baseInfo.yydj" placeholder="医院等级"></Cascader>
				        </FormItem>
				        <FormItem label="举办单位">
				            <Input clearable v-model="baseInfo.jbdw" placeholder="举办单位"></Input>
				        </FormItem>
				        <FormItem label="建成投用时间">
				            <DatePicker type="date" v-model="baseInfo.jctysj"  placeholder="建成投用时间"></DatePicker>
				        </FormItem>
				        <FormItem label="医院地址">
				        	<Input clearable v-model="addressInfo.yydz" placeholder="医院地址"></Input>
				        </FormItem>
				        <FormItem label="经纬度">
				        	<div>
			        			<Input 
			        				readonly 
			        				v-model="addressInfo.lngAndLat" 
			        				icon="md-pin" 
			        				placeholder="经纬度" />
			        		</div>
				        </FormItem>
				        <FormItem label="场所范围">
				        	<div @click.stop="openAreaModal">
			        			<!-- <Input 
			        				readonly 
			        				v-model="addressInfo.yyfw" 
			        				icon="md-pin" 
			        				placeholder="场所范围" /> -->
			        				<span class="link">查看</span>
			        		</div>
				        </FormItem>
				        <FormItem label="行业代码">
				            <Input clearable v-model="baseInfo.hydm" placeholder="行业代码"></Input>
				        </FormItem>
				        <FormItem label="所辖管区">
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
				        <FormItem label="注册登记地址">
				            <Input clearable v-model="baseInfo.zcdjdz" placeholder="注册登记地址"></Input>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<div class="line"></div>
			<Row type="flex" justify="center">
				<Col>
					<part-title text="建筑物信息"></part-title>
					<Form :model="addressInfo" disabled label-position="left" :label-width="140" style="width: 600px">
				        <FormItem label="占地面积（㎡）">
				        	<InputNumber clearable v-model="addressInfo.zdmj" placeholder="占地面积"></InputNumber>
				        </FormItem>
				        <FormItem label="建筑面积（㎡）">
				        	<InputNumber clearable v-model="addressInfo.jzmj" placeholder="建筑面积"></InputNumber>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<div class="line"></div>
			<Row type="flex" justify="center">
				<Col>
					<part-title text="联系人信息"></part-title>
					<Form :model="addressInfo" disabled label-position="left" :label-width="140" style="width: 600px">
				        <FormItem label="经办人">
				        	<Row type="flex" :gutter="20">
					        	<Col span="8">
				        			<Input clearable v-model="contactInfo.jbr" placeholder="姓名"></Input>
				        		</Col>
				        		<Col span="16">
				        			<Input type="tel" clearable v-model="contactInfo.jbrdh" placeholder="电话"></Input>
				        		</Col>
				        		<Col span="24">
				        			<Input type="email" clearable v-model="contactInfo.jbryx" placeholder="邮箱"></Input>
				        		</Col>
				        	</Row>
				        </FormItem>
					</Form>
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
		<Modal width="1000" title="区域范围标注" v-model="showAreaModel">
			<div id="area_box" class="area_box"></div>
			<div slot="footer"></div>
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
	const levelChildren = [
		{
			value: '1', 
			label: '甲'
		}, {
			value: '2', 
			label: '乙'
		}, {
			value: '3', 
			label: '丙'
		}
	]
	export default {
		name: '',
		mixins: [areajs, lngjs, datePickerjs],
		components: { partTitle },
		data() {
			return {
				gkdx_id: this.$storage.get('userInfo').gkdx_id,
				loading: true,
				showAreaModel: false,
				showLngModel: false,
				showWhModel: false,
				showYaModel: false,
				showSbfcgyModel: false,
				showZaqModel: false,
				showMainRiskModel: false,
				showRimModel: false,
				modeType: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					yymc: '医院',
					yylx: '',
					jbdw: '',
					zcdjdz: '',
					tyshxydm: '',
					quyu: [],
					jctysj: '',
					hydm: '',
					yydj: [],
				},
				addressInfo: {
					yydz: '',
					zdmj: 0,
					jzmj: 0,
					lngAndLat: '',	
					yyfw: ''	
				},
				contactInfo: {
					jbr: '',
					jbrdh: '',
					jbryx: '',
				},
				mostForm: {
					cyrs: 0,
					rjmzrs: 0,
					cws: 0,
					rjcwsyl: 0,
					xfzddw: '',
					hzgwdw: '',
				},
				lng: '',
				lat: '',
				yylxList: ['民办', '公办', '合资', '其他'],
				levelList: [
					{
						value: '0',
	                    label: '未定级'
					}, {
						value: '1',
	                    label: '一级',
	                    children: levelChildren
					}, {
						value: '2',
	                    label: '二级',
	                    children: levelChildren
					}, {
						value: '3',
	                    label: '三级',
	                    children: levelChildren
					}, {
						value: '4',
	                    label: '卫生院',
	                    children: levelChildren
					}
				],
				xfzddwList: [
					{
						value: 0,
						name: '否'
					}, {
						value: 1,
						name: '是'
					}
				],
				form: {},
			}
		},
		watch: {

		},
		computed: {
			
		},
		methods: {
			async getBaseInfo() {
				let { status_code, data, message } = await api.getHospitalBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					let { jbr, jbrdh, jbryx, yymc, jbdw, zcdjdz, tyshxydm, yydz, quyu_id, jd, wd, yyfw, jctysj, yylx, hydm, yydj, zdmj, jzmj, cyrs, rjmzrs, cws, rjcwsyl, xfzddw, hzgwdw } = this.form
					this.baseInfo = { yymc, jbdw, zcdjdz, tyshxydm, yylx, hydm }
					this.baseInfo.jctysj = this.form.jctysj ? new Date(this.form.jctysj) : '';
					this.baseInfo.yydj = this.form.yydj ? this.form.yydj.split(',') : [];
					this.addressInfo = { yydz, yyfw }
					this.addressInfo.zdmj = zdmj ? Number(zdmj) : 0
					this.addressInfo.jzmj = jzmj ? Number(jzmj) : 0
					this.addressInfo.lngAndLat = this.form.jd && this.form.wd ? `${(this.form.jd - 0).toFixed(6)} ${(this.form.wd - 0).toFixed(6)}` : ''
					this.contactInfo = { jbr, jbrdh, jbryx }
					this.mostForm = { cyrs, rjmzrs, cws, rjcwsyl, xfzddw, hzgwdw }
					this.getQy()
					// this.getHy()
				}
			},
			saveInfo() {

			},
			openAreaModal() {	
				this.showAreaModel = true;
				this.$nextTick(() => {
					let lo = new T.Geolocation();
		            lo.getCurrentPosition((e) => {
						this.map = new T.Map('area_box');
			            if(this.addressInfo.yyfw) {
			            	let config = {
				                showLabel: true,
				                color: "blue", 
				                weight: 3, 
				                opacity: 0.5, 
				                fillColor: "#FFFFFF", 
				                fillOpacity: 0.5
				            };
			            	let yyfw = JSON.parse(this.addressInfo.yyfw)
			            	let points = yyfw.map(item => {
			            		return new T.LngLat(item.lng, item.lat)
			            	})
			            	let lng = 0, lat = 0;
			            	yyfw.forEach(item => {
			            		lng += item.lng - 0
			            	})
			            	yyfw.forEach(item => {
			            		lat += item.lat - 0
			            	})
			            	this.map.centerAndZoom(new T.LngLat(lng / yyfw.length, lat / yyfw.length), 10);
			            	// this.map.centerAndZoom(new T.LngLat(e.lnglat.lng, e.lnglat.lat), 10);
			            	this.map.addOverLay(new T.Polygon(points, config));
			            }else {
							this.map.centerAndZoom(new T.LngLat(e.lnglat.lng, e.lnglat.lat), 10);
			            }
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
			edit() {
				this.$storage.set('baseInfo', this.baseInfo);
				this.$storage.set('addressInfo', this.addressInfo);
				this.$storage.set('contactInfo', this.contactInfo);
				this.$storage.set('mostForm', this.mostForm);
				this.$storage.set('form', this.form);
				this.$router.push({
					path: '/base',
					query: {
						type: 2
					}
				})
			}
		},
		created() {
			this.getArea('', list => {
				this.areaList = list
				this.getBaseInfo()
			})
			// this.getIndustry('', list => {
			// 	this.industryList = list
			// 	if(this.areaList.length > 0) {
			// 		this.getBaseInfo()
			// 	}
			// })
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