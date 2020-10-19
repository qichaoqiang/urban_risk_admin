<template>
	<div class="container">
		<div style="">
			<div>
				<!-- <div slot="header" style="margin-top: 16px">
					<Breadcrumb separator=">">
				        <BreadcrumbItem>
				        	<span class="link" @click="showListModel = false">项目列表</span>
				        </BreadcrumbItem>
				        <BreadcrumbItem>{{xmItem ? xmItem.xmmc : '项目名称'}}</BreadcrumbItem>
				        <BreadcrumbItem>风险源列表</BreadcrumbItem>
				    </Breadcrumb>
				</div>
				<Divider /> -->
				<Row type="flex" justify="space-between" :gutter="24">
					<Col span="12">
						<Row type="flex" align="middle" :gutter="24">
							<Col span="6">
								<Select clearable v-model="searchFxyForm.fxdj" placeholder="风险源等级">
					                <Option v-for="item in fxdjList" :key="item.name" :value="item.name">{{item.name}}</Option>
					            </Select>
							</Col>
							<Col span="6">
								<Cascader 
					            	readonly 
					            	change-on-select
					            	:transfer="true"
					            	v-model="searchFxyForm.fxylb" 
					            	:data="fxylbList" 
					            	:load-data="loadFxylb" 
					            	placeholder="风险源类别"></Cascader>
							</Col>
							<Col span="6">
								<Input clearable type="tel" v-model="searchFxyForm.fxymc"></Input>
							</Col>
							<Col span="6">
								<Button type="primary" icon="ios-search" @click="getFxyList(1)">搜索</Button>
							</Col>
						</Row>
					</Col>
					<Col span="12">
						<Row type="flex" justify="end" align="middle" :gutter="24">
				            <Poptip v-if="selectFxyList.length > 0"" confirm placement="left-end" :transfer="true" title="确认删除选中数据吗？" @on-ok="deleteFxy" style="padding: 0 12px">
						        <Button type="error" ghost>批量删除</Button>
						    </Poptip>
							<Col v-else>
								<Button type="error" ghost  @click="deleteFxy">批量删除</Button>
							</Col>
							<Col v-if="hasAuth('fengxianyuan_store')">
								<Button type="primary" ghost  @click="importExcel">导入</Button>
							</Col>
							<Col v-if="hasAuth('fengxianyuan_export')">
								<Button type="primary" ghost  @click="exportExcel">导出</Button>
							</Col>
							<Col v-if="hasAuth('fengxianyuan_store')">
								<Button type="primary" @click="openFxyModel" style="width: 60px">
									<Icon type="ios-add" size="28" />
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>
				<div v-if="hasAuth('fengxianyuan')">
					<Table :columns="fxyColumns" :data="fxyData" :loading="fxyLoading" style="margin-top: 16px" @on-selection-change="handleSelectFxyChange">
						<template slot-scope="{ row }" slot="fxdj">
							<div class="fxdj" :style="{background: getFxdj(row.fxdj)}"></div>
						</template>
						<template slot-scope="{ row }" slot="fxymc">
							<!-- <div class="fxdj" :style="{background: getFxdj(row.fxdj)}"></div> -->
							<span>{{row.fxymc}}</span>
						</template>
						<template slot-scope="{ row }" slot="action">
							<!-- <Button v-if="hasAuth('fengxianyuan_show')" type="primary" size="small" ghost style="margin-right: 5px" @click="viewFxyModel(row)">查看</Button> -->
							<Button v-if="hasAuth('fengxianyuan_update')" type="primary" size="small" ghost style="margin-right: 5px" @click="editFxyModel(row)">编辑</Button>
				            <Poptip v-if="hasAuth('fengxianyuan_destroy')" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeFxy(row)">
						        <Button type="error" size="small" ghost v-if="hasAuth('fengxianyuan')">删除</Button>
						    </Poptip>
						</template>
					</Table>
					<Row type="flex" justify="end">
						<Page
			                size="small"
			                style="margin-top: 10px"
			                :page-size="fxyPage.pageSize"
			                :total="fxyPage.totalRow"
			                :page-size-opts="[10, 20, 50, 100, 500, 1000]"
			                show-elevator
			                show-total
			                show-sizer
			                @on-change="handleChangeFxyPage"
			                @on-page-size-change="handleChangeFxyPageSize"
			            />
			        </Row>
				</div>
				<Modal width="820" :title="`${modelTypeList[modeType - 1]}风险源`" v-model="showFxyModel" @on-visible-change="fxyModelChange">
					<Form :disabled="modeType == 3" :model="fxyForm" ref="fxy" :rules="fxyRules" hide-required-mark label-position="left" :label-width="120">
						<FormItem label="风险源名称" prop="fxymc">
				        	<Input clearable v-model="fxyForm.fxymc"></Input>
				        </FormItem>
				        <FormItem label="风险源类别" prop="fxylb">
				        	<Cascader 
			            	readonly 
			            	change-on-select
			            	v-model="fxyForm.fxylb" 
			            	:data="fxylbList" 
			            	:load-data="loadFxylb" 
			            	placeholder="请选择"></Cascader>
				        </FormItem>
				        <FormItem label="风险值">
				            <InputNumber :min="0" v-model="fxyForm.fxz"></InputNumber>
				        </FormItem>
				        <FormItem label="风险等级">
				            <Select clearable v-model="fxyForm.fxdj" placeholder="请选择">
				                <Option v-for="item in fxdjList" :key="item.name" :value="item.name">{{item.name}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="所属区域" prop="quyu_id">
				        	<Cascader 
				            	readonly 
				            	change-on-select
				            	v-model="fxyForm.quyu_id" 
				            	:data="areaList" 
				            	:load-data="loadArea" 
				            	placeholder="所属区域"></Cascader>
				        </FormItem>
				        <FormItem label="经纬度">
				        	<lng :lngAndLat.sync="fxyForm.lngAndLat"></lng>
				        </FormItem>
				        <FormItem label="地址" prop="dz">
				        	<Input clearable v-model="fxyForm.dz"></Input>
				        </FormItem>
					</Form>
					<div slot="footer">
				        <Button v-if="modeType != 3" type="primary" size="large" :loading="fxyLoading" @click="saveFxy">保存</Button>
			        </div>
				</Modal>
			</div>
		    <div v-show="showExcelModel">
				<div style="color: #e23114">请按照以下格式导入数据</div>
				<Table :columns="excelColumns" :data="listData" style="margin-top: 16px"></Table>
				<Form label-position="left" :label-width="120" style="margin-top: 16px">
			        <FormItem label="风险源类别">
			        	<Cascader 
		            	readonly 
		            	change-on-select
		            	v-model="fxylb" 
		            	:data="fxylbList" 
		            	:load-data="loadFxylb" 
		            	placeholder="请选择"></Cascader>
			        </FormItem>
			        <FormItem label="excel文件">
			        	<Upload
							:before-upload="handleUpload"
							action="xxx">
					        <Button size="small" type="primary" ghost>选择文件</Button>
					    </Upload>
					    <Row type="flex" align="middle" v-for="(item, index) in files" :key="index">
					    	<Col span="12">{{ item.name }}</Col>
					    	<Col class="link">
					    		<div class="link" style="color: #ed4014" @click="handleRemoveFile(index)">删除</div>
					    	</Col>
					    </Row>
			        </FormItem>
				</Form>
				<Row type="flex" justify="center" style="margin-top: 16px;">
					<Button type="primary" :disabled="files.length == 0 && fxylb.length > 0" icon="ios-cloud-upload-outline" @click="uploadFiles">开始导入</Button>
				</Row>
		    </div>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	import partTitle from '@/components/title'
	import baseInfo from './components/index'
	import tablejs from '@/common/js/table'
	import { getDate } from '@/utils/tool'
	import lng from '../baseInfo/components/lng'
	import areajs from '@/common/js/area'
	import fxylbjs from '@/common/js/fxylb'
	import axios from 'axios'
	import $ from 'zhangjia-zepto'
	export default {
		name: 'xm',
		components: { partTitle, lng, baseInfo },
		mixins: [tablejs, areajs, fxylbjs],
		data() {
			return {
				xm_id: '',
				xmItem: null,
				gkdx_id: '',
				showXmModel: false,
				showHistoryModel: false,
				showListModel: false,
				showFxyModel: false,
				showExcelModel: false,
				xmLoading: true,
				fxyLoading: true,
				xmFormLoading: false,
				modeType: '',
				type: 1,
				statusList: [
					{
						value: 1,
						name: 'xxxx'
					}
				],
				fxylb: [],
				xmColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.xmPage.pageIndex- 1) * this.xmPage.pageSize + 1);
				        }
                    }, {
                        title: '项目名称',
                        slot: 'xmmc',
                        minWidth: 100
                    }, {
                        title: '项目负责人',
                        key: 'xmfzr',
                        minWidth: 120
                    }, {
                        title: '联系电话',
                        key: 'lxdh',
                        minWidth: 100
                    }, {
                        title: '创建时间',
                        key: 'cjsj',
                        minWidth: 100
                    }, 
                    // {
                    //     title: '变更历史',
                    //     slot: 'history',
                    // }, 
                    {
                        title: '操作',
                        width: 200,
                        slot: 'action',
                        fixed: 'right'
                    }, 
				],
				xmData: [],
				xmForm: {
					xmmc: '',
					xmfzr: '',
					lxdh: '',
					xmjj: '',
					cjsj: ''
				},
				searchXmForm: {
					xmmc: ''
				},
				xmPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				fxyColumns: [
					{
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    }, {
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.fxyPage.pageIndex- 1) * this.fxyPage.pageSize + 1);
				        }
                    }, {
                        title: '风险源名称',
                        slot: 'fxymc',
                        minWidth: 200
                    }, {
                        title: '风险源类别',
                        key: 'fxylbmc',
                        minWidth: 180
                    }, {
                        title: '风险值',
                        key: 'fxz',
                        minWidth: 100
                    }, {
                        title: '风险源等级',
                        slot: 'fxdj',
                        minWidth: 120
                    }, {
                        title: '操作',
                        slot: 'action',
                        width: 200,
                        fixed: 'right'
                    }
				],
				fxyData: [],
				fxyForm: {
					fxymc: '',
					dz: '',
					quyu_id: [],
					fxz: 0,
					fxdj: '',
					fxylb: [],
					lngAndLat: ''
				},
				searchFxyForm: {
					fxdj: '',
					fxylb: [],
					fxymc: ''
				},
				fxdjList: [{
		            name: '重大风险',
		            value: '#F25E5E',
		        }, {
		            name: '较大风险',
		            value: '#F49852',
		        }, {
		            name: '一般风险',
		            value: '#EFE850',
		        }, {
		            name: '低风险',
		            value: '#1C86F3',
		        }],
				fxylbList: [],
				fxyPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				historyColumns: [
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
                        title: '变更内容',
                        key: 'name',
                    }, {
                        title: '创建时间',
                        key: 'cas',
                    }, {
                        title: '变更人',
                        key: 'cas',
                    }
				],
				historyData: [
					{
						name: 'hahaha',
						cas: 1111
					}
				],
				excelColumns: [
					{
                        title: '风险源名称',
                        key: 'fxymc',
                        minWidth: 110
                    }, {
                        title: '所属区域',
                        key: 'quyu',
                        minWidth: 110
                    }, {
                        title: '地址',
                        key: 'dz',
                        minWidth: 100
                    }, {
                        title: '经度',
                        key: 'jd',
                        minWidth: 100
                    }, {
                        title: '纬度',
                        key: 'wd',
                        minWidth: 100
                    }, {
                        title: '风险值',
                        key: 'fxz',
                        minWidth: 100
                    }, {
                        title: '风险等级',
                        key: 'fxdj',
                        minWidth: 100
                    }
				],
				listData: [
					{
						fxymc: '名称',
						quyu: '上城区',
						dz: '地址',
						jd: '120.116500',
						wd: '30.353281',
						fxz: '90',
						fxdj: '重大风险'
					}
				],
				itemForm: {
					name: '',
					num: 0
				},
				files: [],
				selectFxyList: []
			}
		},
		watch: {

		},
		computed: {
			xmFormRules() {
				return {
					xmmc: [{ required: true, message: '请输入', trigger: 'change' }],
					xmfzr: [{ required: true, message: '请选择', trigger: 'change' }],
					lxdh: [{ required: true, message: '请选择', trigger: 'change' }],
					xmjj: [{ required: true, message: '请选择', trigger: 'change' }],
					cjsj: [{ required: true, type: 'date', message: '请选择', trigger: 'change' }],
				}
			},
			fxyRules() {
				return {
					fxymc: [{ required: true, message: '请输入', trigger: 'change' }],
					fxylb: [{ required: true, type: 'array', message: '请选择', trigger: 'change' }],
					fxz: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					fxdj: [{ required: true, message: '请选择', trigger: 'change' }],
					quyu_id: [{ required: true, type: 'array', message: '请选择', trigger: 'change' }],
					lngAndLat: [{ required: true, message: '请选择', trigger: 'change' }],
					dz: [{ required: true, message: '请输入', trigger: 'change' }],
				}
			},
		},
		methods: {
			handleChangeXmPage(val) {
				this.xmPage.pageIndex = val
				this.getXmList()
			},
			handleChangeXmPageSize(val) {
				this.xmPage.pageSize = val
				this.getXmList()
			},
			async getXmList() {
				this.xmLoading = true
				let params = {
					...this.searchXmForm,
					per_page: this.xmPage.pageSize,
					page: this.xmPage.pageIndex,
				}
				let { status_code, data } = await api.getProjectList(params)
				if(status_code == 200) {
					this.xmData = data.data
					this.xmPage.totalRow = data.total
				}
				this.xmLoading = false
			},
			openXmModel() {
				this.modeType = 1;
				this.showXmModel = true
			},
			viewXmModel(row) {
				this.xmForm = {
					xmmc: row.xmmc,
					xmfzr: row.xmfzr,
					lxdh: row.lxdh,
					xmjj: row.xmjj,
					cjsj: row.cjsj ? new Date(row.cjsj) : '',
				}
				this.xm_id = row.xm_id
				this.modeType = 3;
				this.showXmModel = true
			},
			editXmModel(row) {
				this.xmForm = {
					xmmc: row.xmmc,
					xmfzr: row.xmfzr,
					lxdh: row.lxdh,
					xmjj: row.xmjj,
					cjsj: row.cjsj ? new Date(row.cjsj) : '',
				}
				this.xm_id = row.xm_id
				this.modeType = 2;
				this.showXmModel = true
			},
			xmModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.xmForm = {
							xmmc: '',
							xmfzr: '',
							lxdh: '',
							xmjj: '',
							cjsj: ''
						}
						this.$refs.xmForm.resetFields();
					})
				}
			},
			async removeXm(row) {
				let { status_code } = await api.deleteProjectItem(row.xm_id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getXmList()
			},
			async saveXm() {
				this.$refs.xmForm.validate(async valid => {
                    if (valid) {
                    	this.xmFormLoading = true
						let params = {
							...this.xmForm,
							cjsj: this.xmForm.cjsj ? getDate(new Date(this.xmForm.cjsj).getTime(), 'date') : '',
						}
						if(this.modeType == 2) {
							params.xm_id = this.xm_id
						}
						let { status_code, message } = await api.addProjectItem(params);
						if(status_code == 200) {
							this.$Message.success(message)
							this.showXmModel = false
							this.getXmList()
						}
						this.xmFormLoading = false
                    }
                })
			},
			openHistoryModel(row) {
				this.showHistoryModel = true
			},
			openFxyList(row) {
				this.xmItem = row;
				this.getFxyList()
				this.showListModel = true
			},
			handleChangeFxyPage(val) {
				this.fxyPage.pageIndex = val
				this.getFxyList()
			},
			handleChangeFxyPageSize(val) {
				this.fxyPage.pageSize = val
				this.getFxyList()
			},
			async getFxyList(type) {
				if(type == 1) {
					this.fxyPage.pageIndex = 1
				}
				this.fxyLoading = true
				let params = {
					...this.searchFxyForm,
					fxylb: this.searchFxyForm.fxylb[0] ? this.searchFxyForm.fxylb[this.searchFxyForm.fxylb.length - 1] : '',
					xm_id: this.$route.query.id - 0,
					per_page: this.fxyPage.pageSize,
					page: this.fxyPage.pageIndex,
				}
				let { status_code, data } = await api.getFxyList(params)
				if(status_code == 200) {
					this.fxyData = data.data
					this.fxyPage.totalRow = data.total
				}
				this.fxyLoading = false
			},
			listModelChange(status) {
				if(!status) {
					this.fxyPage = {
						pageSize: 10,
						pageIndex: 1,
						totalRow: 0
					}
					this.fxyData = []
				}
			},
			openFxyModel() {
				this.modeType = 1;
				this.showFxyModel = true
			},
			goPoi(row) {
				console.log(row)
				this.$router.push({
					path: '/poi',
					query: {
						id: row.gkdx_id
					}
				})
			},
			viewFxyModel(row) {
				this.fxyForm = {
					fxymc: row.fxymc,
					dz: row.dz,
					quyu_id: row.quyu_id ? [row.quyu_id] : [],
					fxz: row.fxz ? Number(row.fxz) : 0,
					fxdj: row.fxdj,
					fxylb: row.fxylb ? [row.fxylb] : [],
					lngAndLat: row.jd && row.wd ? `${(row.jd - 0).toFixed(6)} ${(row.wd - 0).toFixed(6)}` : ''
				}
				this.gkdx_id = row.gkdx_id
				this.modeType = 3;
				this.showFxyModel = true
			},
			editFxyModel(row) {
				let userInfo = this.$storage.get('userInfo')
				userInfo.gkdx_id = row.gkdx_id
				userInfo.fxylb = row.fxylb
				this.$storage.set('userInfo', userInfo)
				this.$storage.set('fxyInfo', row)
				location.href = process.env.NODE_ENV === "development" ? `${location.origin}/#/editInfo?type=2` : `${location.origin}/v2/#/editInfo?type=2`
			},
			fxyModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.fxyForm = {
							fxymc: '',
							dz: '',
							quyu_id: [],
							fxz: 0,
							fxdj: '',
							fxylb: [],
							lngAndLat: ''
						}
						this.$refs.fxy.resetFields();
					})
				}
			},
			handleSelectFxyChange(list) {
				this.selectFxyList = list
			},
			async deleteFxy() {
				if(this.selectFxyList.length === 0) {
					this.$Message.error('请先选择删除项')
					return
				}
				let params = {
					act: 'piliang_destroy',
					gkdx_id_list: this.selectFxyList.map(item => item.gkdx_id).join(',')
				}
				let { status_code, message } = await api.addFxyItem(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.getFxyList()
				}
			},
			async removeFxy(row) {
				let { status_code } = await api.deleteFxyItem(row.gkdx_id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getFxyList()
			},
			async saveFxy() {
				this.$refs.fxy.validate(async valid => {
                    if (valid) {
                    	this.fxyLoading = true
						let params = {
							...this.fxyForm,
							fxylb: this.fxyForm.fxylb[0] ? this.fxyForm.fxylb[this.fxyForm.fxylb.length - 1] : '',
							quyu_id: this.fxyForm.quyu_id[this.fxyForm.quyu_id.length - 1],
							jd: this.fxyForm.lngAndLat.split(' ')[0],
							wd: this.fxyForm.lngAndLat.split(' ')[1],
							xm_id: this.$route.query.id
						}
						if(this.modeType == 2) {
							params.gkdx_id = this.gkdx_id
						}
						delete params.lngAndLat
						let { status_code, message } = await api.addFxyItem(params);
						if(status_code == 200) {
							this.$Message.success(message)
							this.showFxyModel = false
							this.getFxyList()
						}
						this.fxyLoading = false
                    }
                })
			},
			getFxdj(val) {
				let item_ = this.fxdjList.find(item => {
					return item.name == val
				})
				return item_ ? item_.value : 'transparent'
			},
	        handleRemove(index) {
	        	this.xmForm.items.splice(index, 1);
	        },
	        handleAdd() {
	        	this.xmForm.items.push({
	        		type: '',
					rule: ''
	        	});
	        },
	        importExcel() {
	        	// this.showExcelModel = true
	        	this.$router.push({
	        		name: 'city_import',
	        		query: {
	        			id: this.$route.query.id
	        		}
	        	})
	        },
	        handleUpload(file) {
	        	let list = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
	        	if(list.includes(file.type)) {
	        		this.files = [file]
	        	}else {
	        		this.$Message.error('请选择excel文件')
	        	}
	        	return false
	        },
	        handleRemoveFile(index) {
	        	this.files.splice(index, 1);
	        },
	        async uploadFiles() {
	        	let params = new FormData();
				params.append("xls_file", this.files[0]);
				params.append("fxylb", this.fxylb[0] ? this.fxylb[this.fxylb.length - 1] : '');
				params.append("xm_id", this.xmItem.xm_id);
	        	let { status_code, message } = await api.importFxyItem(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.getFxyList()
				}
	        },
	        async exportExcel() {
	        	let params = {
					...this.searchFxyForm,
					act: 'export',
					fxylb: this.searchFxyForm.fxylb.join(','),
					xm_id: this.xmItem.xm_id,
					per_page: this.fxyPage.pageSize,
					page: this.fxyPage.pageIndex,
				}
				let { status_code, url } = await api.getFxyList(params)
				if(status_code == 200) {
					location.href = url
				}
	        },
	        excelModelChange(status) {
				if(!status) {
					this.fxylb = []
					this.files = []
					this.xmItem = null
				}
			},
		},
		created() {
			this.getFxyList()
			// this.getXmList()
			this.getArea('', list => {
				this.areaList = list
			})
			this.getFxylbList('', list => {
				this.fxylbList = list
			})
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		
	}
</style>

