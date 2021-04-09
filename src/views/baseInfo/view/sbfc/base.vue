<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div>
			<Row type="flex" justify="center">
				<Col>
					<part-title text="基本信息"></part-title>
					<Form :model="baseInfo" disabled label-position="left" :label-width="140" style="width: 600px">
						<FormItem label="企业名称">
				            {{baseInfo.qymc}}
				        </FormItem>
				        <FormItem label="运行状态">
				            <Select clearable v-model="baseInfo.yxzt" placeholder="运行状态">
				                <Option v-for="item in yxztList" :key="item" :value="item">{{item}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="所属区域">
				            <Cascader 
				            	readonly 
				            	change-on-select
				            	v-model="baseInfo.quyu" 
				            	:data="areaList" 
				            	:load-data="loadArea" 
				            	placeholder="所属区域"></Cascader>
				        </FormItem>
				        <FormItem label="是否在工业园区">
				        	<Row type="flex" :gutter="20">
				        		<Col span="6">
						        	<Select clearable v-model="baseInfo.sfzgyyq" placeholder="请选择">
						                <Option v-for="item in sfzgyyqList" :key="item.value" :value="item.value">{{item.name}}</Option>
						            </Select>
				        		</Col>
				        		<Col span="18">
				        			<Input clearable v-show="baseInfo.sfzgyyq == 1" v-model="baseInfo.yqmc" placeholder="工业园区名称"></Input>
				        		</Col>
				        	</Row>
				        </FormItem>
				        <FormItem label="安全生产标准化">
				        	<Input clearable v-model="baseInfo.aqscbzh" placeholder="安全生产标准化"></Input>
				        </FormItem>
						<FormItem label="生产地址">
				        	<Input clearable v-model="addressInfo.scdz" placeholder="生产地址"></Input>
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
				        <FormItem label="企业范围">
				        	<div @click.stop="openAreaModal">
			        			<span class="link">查看</span>
			        		</div>
				        </FormItem>
				        <FormItem label="职工人数">
				            <InputNumber :min="0" v-model="baseInfo.zgrs"></InputNumber>
				        </FormItem>
				        <FormItem label="管理人员">
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
				        <FormItem label="统一社会信用代码">
				            <Input clearable v-model="baseInfo.tyshxydm" placeholder="统一社会信用代码"></Input>
				        </FormItem>
				        <FormItem label="注册地址">
				        	<Input clearable v-model="baseInfo.zcdz" placeholder="注册地址"></Input>
				        </FormItem>
				        <FormItem label="企业基本简况">
				            <Input clearable v-model="baseInfo.qyjbjk" type="textarea" placeholder="企业基本简况"></Input>
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
				        	<InputNumber :min="0" v-model="addressInfo.zdmj" placeholder="占地面积"></InputNumber>
				        </FormItem>
				        <FormItem label="建筑面积（㎡）">
				        	<InputNumber :min="0" v-model="addressInfo.jzmj" placeholder="建筑面积"></InputNumber>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<div class="line"></div>
			<Row type="flex" justify="center">
				<Col>
					<part-title text="联系人信息"></part-title>
					<Form :model="contactInfo" disabled label-position="left" :label-width="140" style="width: 600px">
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
	import tablejs from '@/common/js/table'
	import areajs from '@/common/js/area'
	import industryjs from '@/common/js/industry'
	export default {
		name: '',
		mixins: [tablejs, areajs, industryjs],
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
				lng: '',
				lat: '',
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
				let { status_code, data, message } = await api.getSbfcBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					let { jbr, jbrdh, jbryx, qyfzr, qyfzrdh, fgaqfzr, fgaqfzrdh, qymc, tyshxydm, zcdz, scdz, jd, wd, qyfw, zdmj, jzmj, sfzgyyq, yqmc, zgrs, glrysl, hyml, hydm, aqscbzh, qyjbjk, zdwxy, yxzt } = this.form
					this.baseInfo = { qymc, tyshxydm, zcdz, sfzgyyq, yqmc, zgrs, glrysl, hydm, aqscbzh, qyjbjk, zdwxy, yxzt }
					this.addressInfo = { scdz, qyfw }
					this.addressInfo.zdmj = zdmj ? Number(zdmj) : 0
					this.addressInfo.jzmj = jzmj ? Number(jzmj) : 0
					this.addressInfo.lngAndLat = this.form.jd && this.form.wd ? `${(this.form.jd - 0).toFixed(6)} ${(this.form.wd - 0).toFixed(6)}` : ''
					this.contactInfo = { jbr, jbrdh, jbryx, qyfzr, qyfzrdh, fgaqfzr, fgaqfzrdh }
					this.getQy()
					this.getHy()
				}
			},
			saveInfo() {

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
			openLngModal() {
				this.showLngModel = true;
				this.$nextTick(() => {
					let self = this;
					let lo = new BMap.Geolocation();
		            lo.getCurrentPosition((e) => {
	                    this.lng = e.point.lng.toFixed(1);
	                    this.lat = e.point.lat.toFixed(1);
						this.map = new T.Map('lng_box');
	                    let marker = new T.Marker(e.lnglat);
	                    this.map.addOverLay(marker);
						this.map.centerAndZoom(new T.LngLat(e.point.lng, e.point.lat), 10);
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
				this.addressInfo.lngAndLat = `${this.lng} ${this.lat}`
				this.showLngModel = false
				this.$nextTick(() => {
					this.map = null;
					this.lng = '';
					this.lat = ''
				})
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