<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div v-show="step == 2">
			<Row type="flex" justify="center">
				<Col span="22">
					<div class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="危险化学品" name="name1">
				        	<part-title text="危险化学品" ref="xxx" :btns="['add']" @add="openWhModel"></part-title>
							<Table :columns="whColumns" :data="whData">
								<template slot-scope="{ row }" slot="sfzdjg">
									<span>{{sfzgyyqList.find(item => item.value === row.sfzdjg).name}}</span>
								</template>
								<template slot-scope="{ row }" slot="sfbzp">
									<span>{{sfzgyyqList.find(item => item.value === row.sfbzp).name}}</span>
								</template>
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editWhModel(row)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeWh(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="whPage.pageSize"
				                    :total="whPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeWhPage"
				                    @on-page-size-change="handleChangeWhPageSize"
				                />
							</Row>
				        </TabPane>
				        <TabPane label="主要生产工艺" name="name2">
				        	<part-title text="主要生产工艺" :btns="['add']" @add="openZyscgyModel"></part-title>
							<Table :columns="zyscgyColumns" :data="zyscgyData">
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editZyscgyModel(row)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeZyscgy(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="zyscgyPage.pageSize"
				                    :total="zyscgyPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeZyscgyPage"
				                    @on-page-size-change="handleChangeZyscgyPageSize"
				                />
							</Row>
				        </TabPane>
				        <TabPane label="主要设备" name="name3">
				        	<part-title text="主要设备" :btns="['add']" @add="openZysbModel"></part-title>
								<Table :columns="zysbColumns" :data="zysbData">
									<template slot-scope="{ row }" slot="action">
							            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editZysbModel(row)">编辑</Button>
							            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeZysb(row)">
									        <Button type="error" size="small" ghost>删除</Button>
									    </Poptip>
							        </template>
								</Table>
								<Row type="flex" justify="end">
									<Page
					                    size="small"
					                    style="margin-top: 10px"
					                    :page-size="zysbPage.pageSize"
					                    :total="zysbPage.totalRow"
					                    show-elevator
					                    show-total
					                    show-sizer
					                    @on-change="handleChangeZysbPage"
					                    @on-page-size-change="handleChangeZysbPageSize"
					                />
								</Row>
				        </TabPane>
				        <TabPane label="重大危险源" name="name4">
				        	<Form :model="baseInfo" label-position="left" :label-width="140" style="width: 600px">
					        	<FormItem label="重大危险源">
						        	<Select clearable v-model="baseInfo.zdwxy" placeholder="请选择">
						                <Option v-for="item in zdwxyList" :key="item" :value="item">{{item}}</Option>
						            </Select>
						        </FormItem>
						    </Form>
							<Row type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo">完成</Button>
								</Col>
							</Row>
				        </TabPane>
				        <TabPane label="周边环境" name="name5">
				        	<part-title text="周边环境" :btns="['add']" @add="openRimModel"></part-title>
				        	<div style="margin-bottom: 16px;">说明：调查周边200m范围</div>
							<Table :columns="rimColumns" :data="rimData">
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editRimModel(row)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeRim(row)">
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
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}危险化学品`" v-model="showWhModel" @on-visible-change="whModelChange">
			<div>
				<Form :model="whForm" label-position="left" :label-width="140">
					<FormItem label="化学品名称">
			        	<Input clearable v-model="whForm.hxpm"></Input>
			        </FormItem>
			        <FormItem label="别名">
			        	<Input clearable v-model="whForm.bm"></Input>
			        </FormItem>
			        <FormItem label="CAS号">
			        	<Input clearable v-model="whForm.cas"></Input>
			        </FormItem>
			        <FormItem label="是否重点监管">
			            <Select clearable v-model="whForm.sfzdjg" placeholder="请选择">
			                <Option v-for="item in sfzgyyqList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="是否爆炸品">
			            <Select clearable v-model="whForm.sfbzp" placeholder="请选择">
			                <Option v-for="item in sfzgyyqList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="是否剧毒化学品">
			            <Select clearable v-model="whForm.sfjdhxp" placeholder="请选择">
			                <Option v-for="item in sfzgyyqList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="火灾危险性等级">
			            <Select clearable v-model="whForm.hzwxxdj" placeholder="请选择">
			                <Option v-for="item in hzwxxdjList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="化学品状态">
			            <Select clearable v-model="whForm.hxpzt" placeholder="请选择">
			                <Option v-for="item in hxpztList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="年中转量">
			        	<Row type="flex" align="middle">
	            			<Col>
	            				<InputNumber :min="0" v-model="whForm.nzzl"></InputNumber>
	            			</Col>
	            			<Col>
	            				<Select clearable v-model="whForm.nzzldw" placeholder="单位">
					                <Option v-for="item in nzzldwList" :key="item" :value="item">{{item}}</Option>
					            </Select>
	            			</Col>
	            		</Row>
			        </FormItem>
			        <FormItem label="最大存储量">
			            <Row type="flex" align="middle">
	            			<Col>
	            			<InputNumber :min="0" v-model="whForm.zdccl"></InputNumber>
	            			</Col>
	            			<Col>
	            				<Select clearable v-model="whForm.zdccldw" placeholder="单位">
					                <Option v-for="item in nzzldwList" :key="item" :value="item">{{item}}</Option>
					            </Select>
	            			</Col>
	            		</Row>
			        </FormItem>
			        <FormItem label="MSDS">
			        	<Input clearable v-model="whForm.msds"></Input>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveWh">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}主要生产工艺`" v-model="showZyscgyModel" @on-visible-change="zyscgyModelChange">
			<div>
				<Form :model="zyscgyForm" label-position="left" :label-width="160">
					<FormItem label="工艺类型">
			        	<Select clearable v-model="zyscgyForm.gylx" placeholder="请选择">
			                <Option v-for="item in gylxList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
					<FormItem label="工艺名称">
			        	<Input clearable v-model="zyscgyForm.gymc"></Input>
			        </FormItem>
			        <FormItem label="岗位人数">
			        	<InputNumber :min="0" v-model="zyscgyForm.gwrs"></InputNumber>
			        </FormItem>
			        <FormItem label="加工金属名称">
			        	<Input clearable v-model="zyscgyForm.jgjsmc"></Input>
			        </FormItem>
			        <FormItem label="是否产生有毒有害气体">
			        	<Row type="flex" :gutter="20">
			        		<Col span="6">
					        	<Select clearable v-model="zyscgyForm.sfcsydyhqt" placeholder="请选择">
					                <Option v-for="item in sfzgyyqList" :key="item.value" :value="item.value">{{item.name}}</Option>
					            </Select>
			        		</Col>
			        		<Col span="18">
			        			<Input clearable v-show="zyscgyForm.sfcsydyhqt == 1" v-model="baseInfo.qtmc" placeholder="气体名称"></Input>
			        		</Col>
			        	</Row>
			        </FormItem>
			        <FormItem label="投用时间">
			            <DatePicker type="date" v-model="zyscgyForm.tysj"  placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="当前状态">
			            <Select clearable v-model="zyscgyForm.dqzt" placeholder="请选择">
			                <Option v-for="item in dqztList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>	
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveZyscgy">保存</Button>
	        </div>
		</Modal>

		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}主要设备`" v-model="showZysbModel" @on-visible-change="zysbModelChange">
			<div>
				<Form :model="zysbForm" label-position="left" :label-width="140">
					<FormItem label="设备名称">
			        	<Input clearable v-model="zysbForm.sbmc"></Input>
			        </FormItem>
			        <FormItem label="数量">
			            <InputNumber :min="0" v-model="zysbForm.sl"></InputNumber>
			        </FormItem>
			        <FormItem label="规格/大小">
			            <Input clearable v-model="zysbForm.gg"></Input>
			        </FormItem>
			        <FormItem label="投用时间">
			            <DatePicker type="datetime" v-model="zysbForm.tysj"  placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="当前运行状态">
			            <Select clearable v-model="zysbForm.dqyxzt" placeholder="请选择">
			                <Option v-for="item in dqztList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>	
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveZysb">保存</Button>
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
				zyscgy_id: '',	
				ccss_id: '',
				loading: true,
				step: 2,	
				showAreaModel: false,
				showLngModel: false,
				showWhModel: false,
				showWhRiskModel: false,
				showZyscgyModel: false,
				showCcssModel: false,
				showZaqModel: false,
				showGqscModel: false,
				showZysbModel: false,
				showRimModel: false,
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
                        title: '序号',
                        type: 'index',
                    }, {
                        title: '化学品名称',
                        key: 'hxpm',
                    }, {
                        title: 'CAS号',
                        key: 'cas',
                    }, {
                        title: '是否重点监管',
                        slot: 'sfzdjg',
                    }, {
                        title: '是否爆炸品',
                        slot: 'sfbzp',
                    }, {
                        title: '火灾风险等级',
                        key: 'hzwxxdj',
                    }, {
                        title: 'MSDS',
                        key: 'msds',
                    }, {
                        title: '操作',
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
				whRiskColumns: [
					{
                        title: '序号',
                        type: 'index',
                    }, {
                        title: '重大危险源单元名称',
                        key: 'zdwxydymc',
                    }, {
                        title: '重大危险源等级',
                        key: 'zdwxydj',
                    }, {
                        title: '危险化学品',
                        key: 'wxhxp',
                    }, {
                        title: '投用时间',
                        key: 'tysj',
                    }, {
                        title: '当前状态',
                        key: 'dqzt',
                    }, {
                        title: '操作',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				whRiskData: [],
				whRiskForm: {
					zdwxydymc: '',
					zdwxydj: '',
					wxhxp: '',
					tysj: '',
					dqzt: ''
				},
				dqztList: ['运行', '停运', '检修'],
				whRiskPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				zyscgyColumns: [
					{
                        title: '序号',
                        type: 'index',
                    }, {
                        title: '工艺类型',
                        key: 'gylx',
                    }, {
                        title: '工艺名称',
                        key: 'gymc',
                    }, {
                        title: '岗位人数',
                        key: 'gwrs',
                    }, {
                        title: '投用时间',
                        key: 'tysj',
                    }, {
                        title: '当前状态',
                        key: 'dqzt',
                    }, {
                        title: '操作',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				zyscgyData: [],
				zyscgyForm: {
					gylx: '',
					gymc: '',
					gwrs: 0,
					sfcsydyhqt: '',
					qtmc: '',
					jgjsmc: '',
					tysj: '',
					dqzt: '',
				},
				gylxList: ['冶炼', '熔融', '铸造', '锻造', '压延', '轧制', '电解', '挤压', '其他'],
				zdwxyList: ['否', '一级', '二级', '三级', '四级'],
				ksldzzList: [
					{
						value: 0,
						name: '无'
					}, {
						value: 1,
						name: '有'
					}
				],
				rarsList: ['采用', '不采用'],
				zyscgyPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				zyscgyNum: {
					gysl: 0,
					zyzrs: 0
				},
				zysbColumns: [
					{
                        title: '序号',
                        type: 'index',
                    }, {
                        title: '设备名称',
                        key: 'sbmc',
                    }, {
                        title: '数量',
                        key: 'sl',
                    }, {
                        title: '规格/大小',
                        key: 'gg',
                    }, {
                        title: '投用时间',
                        key: 'tysj',
                    }, {
                        title: '当前运行状态',
                        key: 'dqyxzt',
                    },{
                        title: '操作',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				zysbData: [],
				zysbForm: {
					sbmc: '',
					sl: 0,
					gg: '',
					tysj: '',
					dqyxzt: '',
				},
				csfbxList: ['封闭式', '半封闭式', '开放式（露天）'],
				ptfsList: ['高压喷涂', '静电喷涂', '中等压力喷涂', '浸涂、淋涂、滚涂', '其它'],
				zdhcdList: ['人工', '自动'],
				tlzlList: ['水性', '油性', '塑粉'],
				zysbPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				rimColumns: [
					{
                        title: '序号',
                        type: 'index',
                    }, {
                        title: '敏感目标名称',
                        key: 'mgmbmc',
                    }, {
                        title: '方位',
                        key: 'fw',
                    }, {
                        title: '目标类型',
                        key: 'mgmblx',
                    }, {
                        title: '人员数量',
                        key: 'rysl',
                    },{
                        title: '操作',
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
				fwList: ['东', '南', '西', '北'],
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
				let whParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.whPage.pageSize,
					page: this.whPage.pageIndex,
				}
				let zyscgyParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.zyscgyPage.pageSize,
					page: this.zyscgyPage.pageIndex,
				}
				let zysbParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.zysbPage.pageSize,
					page: this.zysbPage.pageIndex,
				}
				let rimParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.rimPage.pageSize,
					page: this.rimPage.pageIndex,
				}
				Promise.all([api.getWhsbfcList(whParams), api.getZyscgyList(zyscgyParams), api.getZysbList(zysbParams), api.getRimList(rimParams)]).then((result) => {
				  	let whRes = result[0], zyscgyRes = result[1], zysbRes = result[2], rimRes = result[3]
				  	if(whRes.status_code == 200) {
				  		this.whData = whRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.whPage.totalRow = whRes.data.total
				  	}
				  	if(zyscgyRes.status_code == 200) {
				  		this.zyscgyData = zyscgyRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.zyscgyPage.totalRow = zyscgyRes.data.total
				  	}
				  	if(zysbRes.status_code == 200) {
				  		this.zysbData = zysbRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.zysbPage.totalRow = zysbRes.data.total
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
				let { status_code, data, message } = await api.getJsylBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					this.baseInfo = { zdwxy: data.zdwxy}
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
					...this.baseInfo
				}
				let { status_code, message } = await api.addJsylBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
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
			async getWhsbfcList_() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: 1000,
					page: this.whPage.pageIndex,
				}
				let { status_code, data } = await api.getWhsbfcList(params)
				if(status_code == 200) {
					this.whList = data.data
				}
			},
			handleChangeWhPage(val) {
				this.whPage.pageIndex = val
				this.getWhsbfcList()
			},
			handleChangeWhPageSize(val) {
				this.whPage.pageSize = val
				this.getWhsbfcList()
			},
			async getWhsbfcList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.whPage.pageSize,
					page: this.whPage.pageIndex,
				}
				let { status_code, data } = await api.getWhsbfcList(params)
				if(status_code == 200) {
					this.whData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.whPage.totalRow = data.total
				}
			},
			openWhModel() {
				this.modeType = 1;
				this.showWhModel = true
			},
			editWhModel(row) {
				this.whForm = {
					hxpm: row.hxpm,
					bm: row.bm,
					cas: row.cas,
					sfzdjg: row.sfzdjg,
					sfbzp: row.sfbzp,
					sfjdhxp: row.sfjdhxp,
					hzwxxdj: row.hzwxxdj,
					hxpzt: row.hxpzt,
					msds: row.msds,
					nzzl: row.nzzl ? Number(row.nzzl) : 0,
					nzzldw: row.nzzldw,
					zdccl: row.zdccl ? Number(row.zdccl) : 0,
					zdccldw: row.zdccldw,
				}
				this.id = row.id
				this.modeType = 2;
				this.showWhModel = true
			},
			whModelChange(status) {
				if(!status) {
					this.whForm = {
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
					}
				}
			},
			async removeWh(row) {
				let { status_code } = await api.deleteWhsbfcInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getWhsbfcList()
			},
			async saveWh() {
				let params = {
					...this.whForm,
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addWhsbfcInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showWhModel = false
					this.getWhsbfcList()
				}
			},
			handleChangeZyscgyPage(val) {
				this.zyscgyPage.pageIndex = val
				this.getZyscgyList()
			},
			handleChangeZyscgyPageSize(val) {
				this.zyscgyPage.pageSize = val
				this.getZyscgyList()
			},
			async getZyscgyList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.zyscgyPage.pageSize,
					page: this.zyscgyPage.pageIndex,
				}
				let { status_code, data } = await api.getZyscgyList(params)
				if(status_code == 200) {
					this.zyscgyData = data.data
					this.zyscgyPage.totalRow = data.total
				}
			},
			async openZyscgyModel() {
				this.modeType = 1;
				this.showZyscgyModel = true
			},
			async editZyscgyModel(row) {
				this.zyscgyForm = {
					gylx: row.gylx,
					gymc: row.gymc,
					gwrs: row.gwrs ? Number(row.gwrs) : 0,
					sfcsydyhqt: row.sfcsydyhqt,
					qtmc: row.qtmc,
					jgjsmc: row.jgjsmc,
					tysj: row.tysj ? new Date(row.tysj) : '',
					dqzt: row.dqzt,
				}
				this.id = row.id
				this.modeType = 2;
				this.showZyscgyModel = true
			},
			zyscgyModelChange(status) {
				if(!status) {
					this.zyscgyForm = {
						gylx: '',
						gymc: '',
						gwrs: 0,
						sfcsydyhqt: '',
						qtmc: '',
						jgjsmc: '',
						tysj: '',
						dqzt: '',
					}
				}
			},
			async removeZyscgy(row) {
				let { status_code } = await api.deleteZyscgyInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getZyscgyList()
			},
			async saveZyscgy() {
				let params = {
					...this.zyscgyForm,
					tysj: this.zyscgyForm.tysj ? getDate(new Date(this.zyscgyForm.tysj).getTime(), 'date') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addZyscgyInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showZyscgyModel = false
					this.getZyscgyList()
				}
			},
			handleChangeZysbPage(val) {
				this.zysbPage.pageIndex = val
				this.getZysbList()
			},
			handleChangeZysbPageSize(val) {
				this.zysbPage.pageSize = val
				this.getZysbList()
			},
			async getZysbList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.zysbPage.pageSize,
					page: this.zysbPage.pageIndex,
				}
				let { status_code, data } = await api.getZysbList(params)
				if(status_code == 200) {
					this.zysbData = data.data
					this.zysbPage.totalRow = data.total
				}
			},
			openZysbModel() {
				this.modeType = 1;
				this.showZysbModel = true
			},
			editZysbModel(row) {
				this.zysbForm = {
					sbmc: row.sbmc,
					sl: row.sl ? Number(row.sl) : 0,
					gg: row.gg,
					tysj: row.tysj ? new Date(row.tysj) : '',
					dqyxzt: row.dqyxzt,
				}
				this.id = row.id
				this.modeType = 2;
				this.showZysbModel = true
			},
			zysbModelChange(status) {
				if(!status) {
					this.zysbForm = {
						sbmc: '',
						sl: 0,
						gg: '',
						tysj: '',
						dqyxzt: '',
					}
				}
			},
			async removeZysb(row) {
				let { status_code } = await api.deleteZysbInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getZysbList()
			},
			async saveZysb() {
				let params = {
					...this.zysbForm,
					tysj: this.zysbForm.tysj ? getDate(new Date(this.zysbForm.tysj).getTime(), 'year') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addZysbInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showZysbModel = false
					this.getZysbList()
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
		},
		mounted() {
			this.$refs.xxx.onLoad();
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