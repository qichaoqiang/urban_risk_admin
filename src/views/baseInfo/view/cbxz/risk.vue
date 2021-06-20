<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div v-show="step == 2">
			<Row type="flex" justify="center">
				<Col span="22">
					<div v-show="!isDisEditInfo" class="title">请完善风险信息</div>
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
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editWhModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeWh(row)">
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
				        <TabPane label="主要生产作业" name="name2">
				        	<part-title text="主要生产作业" :btns="['add']" @add="openZysczyModel"></part-title>
							<Table :columns="zysczyColumns" :data="zysczyData">
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editZysczyModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeZysczy(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="zysczyPage.pageSize"
				                    :total="zysczyPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeZysczyPage"
				                    @on-page-size-change="handleChangeZysczyPageSize"
				                />
							</Row>
				        </TabPane>
				        <TabPane label="主要设备" name="name3">
				        	<part-title text="主要设备" :btns="['add']" @add="openZysbModel"></part-title>
								<Table :columns="zysbColumns" :data="zysbData">
									<template slot-scope="{ row }" slot="action">
							            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editZysbModel(row)">编辑</Button>
							            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeZysb(row)">
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
				        	<Form :disabled="isDisEditInfo" :model="baseInfo" ref="baseInfo" :rules="baseInfoRules" hide-required-mark label-position="left" :label-width="140" style="width: 600px">
					        	<FormItem label="重大危险源" prop="zdwxy">
						        	<Select clearable v-model="baseInfo.zdwxy" placeholder="请选择">
						                <Option v-for="item in zdwxyList" :key="item" :value="item">{{item}}</Option>
						            </Select>
						        </FormItem>
						    </Form>
							<Row v-show="!isDisEditInfo" type="flex" justify="center" style="margin-top: 24px">
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
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}危险化学品`" v-model="showWhModel" @on-visible-change="whModelChange">
			<div>
				<Form :model="whForm" ref="wh" :rules="whRules" hide-required-mark label-position="left" :label-width="140">
					<FormItem label="化学品名称" prop="hxpm">
			        	<Input clearable v-model="whForm.hxpm"></Input>
			        </FormItem>
			        <FormItem label="别名" prop="bm">
			        	<Input clearable v-model="whForm.bm"></Input>
			        </FormItem>
			        <FormItem label="CAS号" prop="cas">
			        	<Input clearable v-model="whForm.cas"></Input>
			        </FormItem>
			        <FormItem label="是否重点监管" prop="sfzdjg">
			            <Select clearable v-model="whForm.sfzdjg" placeholder="请选择">
			                <Option v-for="item in sfzgyyqList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="是否爆炸品" prop="sfbzp">
			            <Select clearable v-model="whForm.sfbzp" placeholder="请选择">
			                <Option v-for="item in sfzgyyqList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="是否剧毒化学品" prop="sfjdhxp">
			            <Select clearable v-model="whForm.sfjdhxp" placeholder="请选择">
			                <Option v-for="item in sfzgyyqList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="火灾危险性等级" prop="hzwxxdj">
			            <Select clearable v-model="whForm.hzwxxdj" placeholder="请选择">
			                <Option v-for="item in hzwxxdjList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="化学品状态" prop="hxpzt">
			            <Select clearable v-model="whForm.hxpzt" placeholder="请选择">
			                <Option v-for="item in hxpztList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="年中转量">
			        	<Row type="flex" align="middle">
	            			<Col>
		            			<FormItem prop="nzzl">
		            				<InputNumber :min="0" v-model="whForm.nzzl"></InputNumber>
		            			</FormItem>
	            			</Col>
	            			<Col>
		            			<FormItem prop="nzzldw">
		            				<Select clearable v-model="whForm.nzzldw" placeholder="单位">
						                <Option v-for="item in nzzldwList" :key="item" :value="item">{{item}}</Option>
						            </Select>
						        </FormItem>
	            			</Col>
	            		</Row>
			        </FormItem>
			        <FormItem label="最大存储量">
			            <Row type="flex" align="middle">
	            			<Col>
	            				<FormItem prop="zdccl">
	            					<InputNumber :min="0" v-model="whForm.zdccl"></InputNumber>
		            			</FormItem>
	            			</Col>
	            			<Col>
		            			<FormItem prop="zdccldw">
		            				<Select clearable v-model="whForm.zdccldw" placeholder="单位">
						                <Option v-for="item in nzzldwList" :key="item" :value="item">{{item}}</Option>
						            </Select>
						        </FormItem>
	            			</Col>
	            		</Row>
			        </FormItem>
			        <FormItem label="MSDS" prop="msds">
			        	<Input clearable v-model="whForm.msds"></Input>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="whLoading" @click="saveWh">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}主要生产作业`" v-model="showZysczyModel" @on-visible-change="zysczyModelChange">
			<div>
				<Form :model="zysczyForm" ref="zysczy" :rules="zysczyRules" hide-required-mark label-position="left" :label-width="160">
					<FormItem label="工序类型" prop="gxlx">
			        	<Select clearable v-model="zysczyForm.gxlx" placeholder="请选择">
			                <Option v-for="item in gxlxList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
					<FormItem label="工序名称" prop="gxmc">
			        	<Input clearable v-model="zysczyForm.gxmc"></Input>
			        </FormItem>
			        <FormItem label="岗位人数" prop="gwrs">
			        	<InputNumber :min="0" v-model="zysczyForm.gwrs"></InputNumber>
			        </FormItem>
			        <FormItem label="是否产生有毒有害气体">
			        	<Row type="flex" :gutter="20">
			        		<Col span="6">
			        			<FormItem prop="sfcsydyhqt">
						        	<Select clearable v-model="zysczyForm.sfcsydyhqt" placeholder="请选择">
						                <Option v-for="item in sfzgyyqList" :key="item.value" :value="item.value">{{item.name}}</Option>
						            </Select>
						        </FormItem>
			        		</Col>
			        		<Col span="18">
			        			<FormItem prop="qtmc" v-if="zysczyForm.sfcsydyhqt == 1">
			        				<Input clearable v-model="zysczyForm.qtmc" placeholder="气体名称"></Input>
			        			</FormItem>
			        		</Col>
			        	</Row>
			        </FormItem>
			        <FormItem label="是否产生粉尘" prop="sfcsfc">
			        	<Select clearable v-model="zysczyForm.sfcsfc" placeholder="请选择">
			                <Option v-for="item in sfzgyyqList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="是否有限空间作业">
			        	<Row type="flex" :gutter="20">
			        		<Col span="6">
				        		<FormItem prop="sfyxkjzy">
						        	<Select clearable v-model="zysczyForm.sfyxkjzy" placeholder="请选择">
						                <Option v-for="item in sfzgyyqList" :key="item.value" :value="item.value">{{item.name}}</Option>
						            </Select>
						        </FormItem>
			        		</Col>
			        		<Col span="18">
			        			<FormItem prop="zycs" v-if="zysczyForm.sfyxkjzy == 1">
			        				<Select clearable v-model="zysczyForm.zycs" placeholder="作业场所">
						                <Option v-for="item in zycsList" :key="item" :value="item">{{item}}</Option>
						            </Select>
			        			</FormItem>
			        		</Col>
			        	</Row>
			        </FormItem>
			        <FormItem label="典型作业形式" prop="dxzyxs">
			        	<Select clearable multiple v-model="zysczyForm.dxzyxs" placeholder="请选择">
			                <Option v-for="item in dxzyxsList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="zysczyLoading" @click="saveZysczy">保存</Button>
	        </div>
		</Modal>

		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}主要设备`" v-model="showZysbModel" @on-visible-change="zysbModelChange">
			<div>
				<Form :model="zysbForm" ref="zysb" :rules="zysbRules" hide-required-mark label-position="left" :label-width="140">
					<FormItem label="设备名称" prop="sbmc">
			        	<Input clearable v-model="zysbForm.sbmc"></Input>
			        </FormItem>
			        <FormItem label="数量" prop="sl">
			            <InputNumber :min="0" v-model="zysbForm.sl"></InputNumber>
			        </FormItem>
			        <FormItem label="起重量（t）" prop="qzl">
			            <InputNumber :min="0" v-model="zysbForm.qzl"></InputNumber>
			        </FormItem>
			        <FormItem label="投用时间" prop="tysj">
			            <DatePicker type="datetime" v-model="zysbForm.tysj"  placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="当前运行状态" prop="dqyxzt">
			            <Select clearable v-model="zysbForm.dqyxzt" placeholder="请选择">
			                <Option v-for="item in dqztList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>	
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="zysbLoading" @click="saveZysb">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}周边环境`" v-model="showRimModel"  @on-visible-change="rimModelChange">
			<div>
				<Form :model="rimForm" ref="rim" :rules="rimRules" hide-required-mark label-position="left" :label-width="140">
					<FormItem label="敏感目标名称" prop="mgmbmc">
			        	<Input clearable v-model="rimForm.mgmbmc"></Input>
			        </FormItem>
			        <FormItem label="方位" prop="fw">
			        	<Select clearable v-model="rimForm.fw" placeholder="请选择">
			                <Option v-for="item in fwList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="敏感目标类型" prop="mgmblx">
			            <Select clearable v-model="rimForm.mgmblx" placeholder="请选择">
			                <Option v-for="item in mgmblxList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="敏感目标距离(m)" prop="mgmbjl">
			        	<InputNumber :min="0" v-model="rimForm.mgmbjl"></InputNumber>
			        </FormItem>	
			        <FormItem label="人员数量" prop="rysl">
			        	<InputNumber :min="0" v-model="rimForm.rysl"></InputNumber>
			        </FormItem>
			        <FormItem label="经纬度" prop="lngAndLat">
			        	<lng :lngAndLat.sync="rimForm.lngAndLat"></lng>
			        	<!-- <div @click="openLngModal">
		        			<Input 
		        				readonly 
		        				v-model="rimForm.lngAndLat" 
		        				icon="md-pin" 
		        				placeholder="经纬度" />
		        		</div> -->
			        </FormItem>
			        <FormItem label="区域范围" prop="qyfw">
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
		        <Button type="primary" size="large" :loading="rimLoading" @click="saveRim">保存</Button>
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
				zysczy_id: '',	
				ccss_id: '',
				loading: true,
				step: 2,	
				showAreaModel: false,
				showLngModel: false,
				showWhModel: false,
				showWhRiskModel: false,
				showZysczyModel: false,
				showCcssModel: false,
				showZaqModel: false,
				showGqscModel: false,
				showZysbModel: false,
				showRimModel: false,
				whLoading: false,
				zysczyLoading: false,
				zysbLoading: false,
				rimLoading: false,
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
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.whPage.pageIndex- 1) * this.whPage.pageSize + 1);
				        }
                    }, {
                        title: '化学品名称',
                        key: 'hxpm',
                        minWidth: 110
                    }, {
                        title: 'CAS号',
                        key: 'cas',
                        minWidth: 100
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
                        minWidth: 100
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
					sfzdjg: 0,
					sfbzp: 0,
					sfjdhxp: 0,
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
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.whRiskPage.pageIndex- 1) * this.whRiskPage.pageSize + 1);
				        }
                    }, {
                        title: '重大危险源单元名称',
                        key: 'zdwxydymc',
                        minWidth: 160
                    }, {
                        title: '重大危险源等级',
                        key: 'zdwxydj',
                        minWidth: 140
                    }, {
                        title: '危险化学品',
                        key: 'wxhxp',
                        minWidth: 110
                    }, {
                        title: '投用时间',
                        key: 'tysj',
                        minWidth: 100
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
				zysczyColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.zysczyPage.pageIndex- 1) * this.zysczyPage.pageSize + 1);
				        }
                    }, {
                        title: '工序类型',
                        key: 'gxlx',
                        minWidth: 100
                    }, {
                        title: '工序名称',
                        key: 'gxmc',
                        minWidth: 100
                    }, {
                        title: '岗位人数',
                        key: 'gwrs',
                        minWidth: 100
                    }, {
                        title: '作业形式',
                        key: 'dxzyxs',
                        minWidth: 100
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				zysczyData: [],
				zysczyForm: {
					gxlx: '',
					gxmc: '',
					gwrs: 0,
					sfcsydyhqt: 0,
					qtmc: '',
					sfcsfc: 0,
					sfyxkjzy: 0,
					zycs: '',
					dxzyxs: [],
				},
				gxlxList: ['刚材预处理', '装配', '舾装', '涂装', '总组', '清洗', '其他'],
				zycsList: ['车间', '场地', '船台', '船坞', '码头', '其他'],
				dxzyxsList: ['切割', '吊装', '叉车运输', '焊接', '打磨', '抛丸', '喷砂', '喷漆', '其他'],
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
				zysczyPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				zysczyNum: {
					gysl: 0,
					zyzrs: 0
				},
				zysbColumns: [
					{
                        title: "序号",
						// // fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.zysbPage.pageIndex- 1) * this.zysbPage.pageSize + 1);
				        }
                    }, {
                        title: '设备名称',
                        key: 'sbmc',
                        minWidth: 100
                    }, {
                        title: '数量',
                        key: 'sl',
                        minWidth: 80
                    }, {
                        title: '起重量（t）',
                        key: 'qzl',
                        minWidth: 120
                    }, {
                        title: '投用时间',
                        key: 'tysj',
                        minWidth: 180
                    }, {
                        title: '当前运行状态',
                        key: 'dqyxzt',
                        minWidth: 120
                    },{
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				zysbData: [],
				zysbForm: {
					sbmc: '',
					sl: 0,
					qzl: 0,
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
			baseInfoRules() {
				return {
					zdwxy: [{ required: true, message: '请选择', trigger: 'change' }],
				}
			},
			whRules() {
				return {
					hxpm: [{ required: true, message: '请输入', trigger: 'change' }],
					bm: [{ required: true, message: '请选择', trigger: 'change' }],
					cas: [{ required: true, message: '请选择', trigger: 'change' }],
					hzwxxdj: [{ required: true, message: '请选择', trigger: 'change' }],
					hxpzt: [{ required: true, message: '请选择', trigger: 'change' }],
					nzzldw: [{ required: true, message: '请选择', trigger: 'change' }],
					zdccldw: [{ required: true, message: '请选择', trigger: 'change' }],
					msds: [{ required: true, message: '请输入', trigger: 'change' }],
					sfzdjg: [{ required: true, type: 'number', message: '请选择', trigger: 'change' }],
					sfbzp: [{ required: true, type: 'number', message: '请选择', trigger: 'change' }],
					sfjdhxp: [{ required: true, type: 'number', message: '请选择', trigger: 'change' }],
					nzzl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					zdccl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
				}
			},
			zysczyRules() {
				return {
					gxlx: [{ required: true, message: '请选择', trigger: 'change' }],
					gxmc: [{ required: true, message: '请输入', trigger: 'change' }],
					qtmc: [{ required: true, message: '请输入', trigger: 'change' }],
					zycs: [{ required: true, message: '请输入', trigger: 'change' }],
					dxzyxs: [{ required: true, type: 'array', min: 1, message: '请选择', trigger: 'change' }],
					sfcsydyhqt: [{ required: true, type: 'number', message: '请选择', trigger: 'change' }],
					sfcsfc: [{ required: true, type: 'number', message: '请选择', trigger: 'change' }],
					sfyxkjzy: [{ required: true, type: 'number', message: '请选择', trigger: 'change' }],
					gwrs: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
				}
			},
			zysbRules() {
				return {
					sbmc: [{ required: true, message: '请输入', trigger: 'change' }],
					tysj: [{ required: true, type: 'date', message: '请选择', trigger: 'change' }],
					dqyxzt: [{ required: true, message: '请选择', trigger: 'change' }],
					sl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					qzl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
				}
			},
			rimRules() {
				const validatorQyfw = (rule, value, callback) => {
					if (!this.rimForm.qyfw) {
	                    callback(new Error('请选择'));
	                } else {
	                    callback();
	                }
				}
				return {
					mgmbmc: [{ required: true, message: '请输入', trigger: 'change' }],
					// fw: [{ required: true, message: '请选择', trigger: 'change' }],
					// mgmblx: [{ required: true, message: '请选择', trigger: 'change' }],
                	// lngAndLat: [{ required: true, message: '请选择', trigger: 'change' }],
                	// qyfw: [{ required: true, validator: validatorQyfw, trigger: 'change' }],
					// mgmbjl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					// rysl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
				}
			},
		},
		methods: {
			async getBaseInfo() {
				this.loading = true
				let whParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.whPage.pageSize,
					page: this.whPage.pageIndex,
				}
				let zysczyParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.zysczyPage.pageSize,
					page: this.zysczyPage.pageIndex,
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
				Promise.all([api.getWhsbfcList(whParams), api.getZysczyList(zysczyParams), api.getZysbList(zysbParams), api.getRimList(rimParams)]).then((result) => {
				  	let whRes = result[0], zysczyRes = result[1], zysbRes = result[2], rimRes = result[3]
				  	if(whRes.status_code == 200) {
				  		this.whData = whRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.whPage.totalRow = whRes.data.total
				  	}
				  	if(zysczyRes.status_code == 200) {
				  		this.zysczyData = zysczyRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.zysczyPage.totalRow = zysczyRes.data.total
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
				let { status_code, data, message } = await api.getCbxzBase(this.gkdx_id);
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
				this.$refs.baseInfo.validate(async valid => {
                    if (valid) {
                    	let params = {
							gkdx_id: this.gkdx_id,
							...this.baseInfo
						}
						let { status_code, message } = await api.addCbxzBase(params);
						if(status_code == 200) {
							this.$Message.success('保存成功')
						}
                    }
                })
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
					this.$nextTick(() => {
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
						this.$refs.wh.resetFields();
					})
				}
			},
			async removeWh(row) {
				let { status_code } = await api.deleteWhsbfcInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getWhsbfcList()
			},
			async saveWh() {
				this.$refs.wh.validate(async valid => {
                    if (valid) {
                    	this.whLoading = true
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
							this.whLoading = false
							this.getWhsbfcList()
						}
                    }
                })
			},
			handleChangeZysczyPage(val) {
				this.zysczyPage.pageIndex = val
				this.getZysczyList()
			},
			handleChangeZysczyPageSize(val) {
				this.zysczyPage.pageSize = val
				this.getZysczyList()
			},
			async getZysczyList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.zysczyPage.pageSize,
					page: this.zysczyPage.pageIndex,
				}
				let { status_code, data } = await api.getZysczyList(params)
				if(status_code == 200) {
					this.zysczyData = data.data
					this.zysczyPage.totalRow = data.total
				}
			},
			async openZysczyModel() {
				this.modeType = 1;
				this.showZysczyModel = true
			},
			async editZysczyModel(row) {
				this.zysczyForm = {
					gxlx: row.gxlx,
					gxmc: row.gxmc,
					gwrs: row.gwrs ? Number(row.gwrs) : 0,
					sfcsydyhqt: row.gwrs ? Number(row.gwrs) : 0,
					qtmc: row.qtmc,
					sfcsfc: row.sfcsfc ? Number(row.sfcsfc) : 0,
					sfyxkjzy: row.sfyxkjzy ? Number(row.sfyxkjzy) : 0,
					zycs: row.zycs,
					dxzyxs: row.dxzyxs.split(','),
				}
				this.id = row.id
				this.modeType = 2;
				this.showZysczyModel = true
			},
			zysczyModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.zysczyForm = {
							gxlx: '',
							gxmc: '',
							gwrs: 0,
							sfcsydyhqt: 0,
							qtmc: '',
							sfcsfc: 0,
							sfyxkjzy: 0,
							zycs: '',
							dxzyxs: [],
						}
						this.$refs.zysczy.resetFields();
					})
				}
			},
			async removeZysczy(row) {
				let { status_code } = await api.deleteZysczyInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getZysczyList()
			},
			async saveZysczy() {
				this.$refs.zysczy.validate(async valid => {
                    if (valid) {
                    	this.zysczyLoading = true
						let params = {
							...this.zysczyForm,
							dxzyxs: this.zysczyForm.dxzyxs.join(','),
							gkdx_id: this.gkdx_id
						}
						delete params.isWxgy
						delete params.lngAndLat
						if(this.modeType == 2) {
							params.id = this.id
						}
						let { status_code, message } = await api.addZysczyInfo(params);
						if(status_code == 200) {
							this.$Message.success(message)
							this.showZysczyModel = false
							this.getZysczyList()
						}
						this.zysczyLoading = false
                    }
                })
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
					qzl: row.qzl ? Number(row.qzl) : 0,
					tysj: row.tysj ? new Date(row.tysj) : '',
					dqyxzt: row.dqyxzt,
				}
				this.id = row.id
				this.modeType = 2;
				this.showZysbModel = true
			},
			zysbModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.zysbForm = {
							sbmc: '',
							sl: 0,
							qzl: 0,
							tysj: '',
							dqyxzt: '',
						}
						this.$refs.zysb.resetFields();
					})
				}
			},
			async removeZysb(row) {
				let { status_code } = await api.deleteZysbInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getZysbList()
			},
			async saveZysb() {
				this.$refs.zysb.validate(async valid => {
                    if (valid) {
                    	this.zysbLoading = true
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
						this.zysbLoading = false
                    }
                })
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
					lngAndLat: row.jd && row.wd ? `${(row.jd - 0).toFixed(6)} ${(row.wd - 0).toFixed(6)}` : '',
					qyfw: row.qyfw,
				}
				this.id = row.id
				this.modeType = 2;
				this.showRimModel = true
			},
			rimModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.rimForm = {
							mgmbmc: '',
							mgmblx: '',
							fw: '',
							mgmbjl: 0,
							rysl: 0,
							lngAndLat: '',
							qyfw: ''
						}
						this.$refs.rim.resetFields();
					})
				}
			},
			async removeRim(row) {
				let { status_code } = await api.deleteRimInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getRimList()
			},
			async saveRim() {
				this.$refs.rim.validate(async valid => {
                    if (valid) {
                    	this.rimLoading = true
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
						this.rimLoading = false
                    }
                })
			},
		},
		created() {
			this.getBaseInfo()
			if(this.isDisEditInfo) {
			  this.whColumns.pop()
			  this.zysczyColumns.pop()
			  this.zysbColumns.pop()
			  this.rimColumns.pop()
			}
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