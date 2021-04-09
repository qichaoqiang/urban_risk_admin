<template>
  <div class="container" id="overview" style="min-width: 1200px; height: 100%">
    <!-- <header-title></header-title> -->
    <div class="mapDiv">
      <div id="mapDiv" style="width: 100%; height: 100%"></div>
    </div>
    <div class="level_box" ref="level_box" v-show="!isSearch">
      <div class="level_item" v-for="item in stateCurrentLevelList" :key="item.color" v-show="item.name !== '不分级' || item.value > 0"
        style="width: 200px; height: 36px;">
        <div class="check" :class="{selected: item.selected}" @click="selectLevel(item)"></div>
        <div class="level_item_name">{{item.name}}（{{item.value || 0}}）</div>
        <div class="level_item_color" :style="{background: item.color, width: '16px', height: '16px'}"></div>
      </div>
    </div>
    <div class="selected_industry_box">
      <div class="selected_industry_title">已选行业</div>
      <div class="selected_industry_list">
        <div class="selected_industry_item" v-for="item in $store.state.industryList" :key="item.id">
          <div class="selected_industry_name">
            <span>{{item.fxylbmc}}</span>
            <span v-show="item.tckdj === 0">（不可叠加）</span>
          </div>
        </div>
      </div>
    </div>
    <tool :levelList="levelList"></tool>
    <div class="left" id="left1" ref="left1" v-show="!isSearch">
      <!-- <risk-detail :data="riskInfo" :currentRisk="currentRisk"  @drawRiskSource="handleDrawRiskSource"></risk-detail> -->
      <div class="left_box">
        <div class="left_item" ref="areaBox">
          <title-top name="选择区域"></title-top>
          <div class="header_select_dropdown_list">
            <div class="header_select_dropdown_item">
              <div class="check" :class="{selected: cityName == '全部'}" @click="selectArea('all')"></div>
              <span :class="{active: cityName == '全部'}">全部</span>
            </div>
            <div class="header_select_dropdown_item" v-for="item in cityList" :key="item.dropName">
              <div class="check" :class="{selected: cityName == item.name}" @click="selectArea(item.dropName, item.zoom)"></div>
              <span :class="{active: cityName == item.name}">{{item.name}}</span>
            </div>
            <div class="header_select_dropdown_item" v-if="xm_id === 11">
              <div class="check"></div>
              <span>名胜区</span>
            </div>
          </div>
        </div>
        <div class="left_item">
          <div class="line" @mousedown="drag"></div>
          <title-top name="选择行业"></title-top>
          <div class="trade_list">
            <trade ref="trade_list" :data="tradeList" left="32px" :level="1"></trade>
          </div>
        </div>
      </div>
      <div class="drag_line" @mousedown="dragLeft"></div>
    </div>
    <div class="left" id="left2" ref="left2" v-show="isSearch" style="width: 290px;">
      <div class="left_box">
        <div class="left_item" style="height: 100%;">
          <title-top name="检索">
            <div style="margin-right: 32px; flex: 1; text-align: right; font-size: 12px; color: #fff">共<span style="color: #10F6FF;">{{totalSl}}</span>条</div>
          </title-top>
          <div class="search_form">
            <div class="search_form_content">
              <Form :model="searchForm" ref="fxy" label-position="left" :label-width="42">
                <FormItem label="区域" v-if="isSearch">
                  <Select clearable multiple v-model="searchForm.quyu_id" placeholder="" :max-tag-count="1" @on-change="handleQuyuChange">
                    <Option value="all">全部</Option>
                    <Option v-for="item in cityList" :key="item.dropName" :value="item.id">{{item.name}}</Option>
                  </Select>
                </FormItem>
                <FormItem label="风险等级">
                  <Select clearable multiple v-model="searchForm.fxdj" placeholder="" :max-tag-count="1" @on-change="handleFxdjChange">
                    <Option v-for="item in stateLevelList" :key="item.name" :value="item.name">{{item.name}}</Option>
                  </Select>
                </FormItem>
                <FormItem label="名称">
                  <Input clearable v-model="searchForm.fxymc"></Input>
                </FormItem>
                <FormItem label="行业">
                  <div style="overflow-x: hidden;">
                    <div style="width: 400px; max-height: 300px; overflow-y: scroll;">
                      <Tree ref="searchTradeTree" :data="tradeSearchData" show-checkbox multiple @on-check-change="handleTradeChange"></Tree>
                    </div>
                  </div>
                </FormItem>
              </Form>
            </div>
            <div class="btn" @click="searchFxy(1)">检索</div>
            <div class="bottom_line"></div>
          </div>
          <div class="search_list">
            <div class="search_item" :class="{is_select: selectGkdxId == item.gkdx_id}" v-for="item in searchFxyList"
              :key="item.id" @click="selectIcon(item)" @mouseenter="findIconLight($event, item)" @mouseleave="findIconDark($event, item)">
              <img v-if="getIcon(item)" :src="getIcon(item)" />
              <div class="search_title">{{item.fxymc}}</div>
              <div class="search_content">风险源类别：{{item.fxylbmc}}</div>
              <div class="search_content">风险等级：{{item.fxdj}}</div>
              <div class="search_content">详细地址：{{item.dz}}</div>
              <div class="search_line"></div>
            </div>
          </div>
          <div class="search_page">
            <Page :total="totalSl" :current.sync="currentPage" size="small" @on-change="handleSearchPageChange" />
          </div>
        </div>
      </div>
      <div class="drag_line" @mousedown="dragLeft"></div>
    </div>
    <div class="trade_box" id="right" v-show="!isSearch">
      <div class="right_box">
        <title-top :name="`${cityName}${$store.state.industry ? $store.state.industry.fxylbmc : ''}风险等级分布图`" :area="area"></title-top>
        <div>
          <overview></overview>
        </div>
        <title-top :name="`${$store.state.industry ? $store.state.industry.fxylbmc : ''}风险源数量`"></title-top>
        <div class="trade_order_popup">
          <div class="trade_order_content">
            <poi-tj :qyfxList="qyfxList" :cityName="cityName"></poi-tj>
          </div>
        </div>
      </div>
    </div>
    <div class="info" v-show="showMarkers && !showInfoModel" @click.stop.self="showMarkers = false">
      <div class="info_model_box">
        <div class="info_model marker_model">
          <div class="marker_content">
            <Tree :data="markersList" @on-select-change="selectMarker"></Tree>
          </div>
        </div>
        <div class="close" @click="showMarkers = false"></div>
      </div>
    </div>
    <!-- <div class="info" v-if="showInfoModel" @click.stop.self="closeInfoModel">
			<div class="info_model_box">
				<div class="info_model">
					<div class="info_name">{{fxyInfo.fengxianyuan.fxymc}}</div>
					<div class="info_content">
						<Tabs value="name1">
					        <TabPane label="基本信息" name="name1">
								<div class="baseInfo_box">
									<div class="baseInfo">
										<p>所属区域：{{fxyInfo.fengxianyuan.quyu}}</p>
										<p>地址：{{fxyInfo.fengxianyuan.dz}}</p>
									</div>
								</div>
					        </TabPane>
					        <TabPane label="风险信息" name="name2">
					        	<div class="baseInfo_box" v-if="fxyInfo.fengxianyuan.fxylb == 'zadao'">
					        		<div class="baseInfo">
										<div v-for="(item, index) in fxyInfo.fengxianxinxi" :key="index">
											<p>道路名称：{{item['道路名称']}}</p>
											<p>主线设计速度(km/h)：{{item['主线设计速度(km/h)']}}</p>
											<p>主线车道数：{{item['主线车道数']}}</p>
											<p>跨主线桥梁最小净空（m）：{{item['跨主线桥梁最小净空（m）']}}</p>
											<p style="color: #10F6FF">匝道信息：</p>
											<div :style="{height: `${item['匝道信息'].length * 48 + 39}px`, overflow: 'hidden'}">
												<Table :row-class-name="rowClassName" :columns="zdColumns" :data="item['匝道信息']"></Table>
											</div>
											<p style="color: #10F6FF">图像信息：</p>
											<div class="img_box">
												<Carousel v-model="zdImg" loop dots="none" arrow="always" @on-click="zoomImg(zdImg, item['图片'])">
											        <CarouselItem v-for="(item_, index_) in item['图片']" :key="item_.url">
											        	<div>
											        		<span style="color: #fff">&nbsp;&nbsp;{{item_.title}}</span>
															<img style="margin-top: 8px; width: 100%" :src="item_.url">
											        	</div>
											        </CarouselItem>
											    </Carousel>
											</div>

										</div>
									</div>
					        	</div>
								<div class="baseInfo_box" v-else>
									<div class="baseInfo">
										<p v-for="item in fxyInfo.fengxianxinxi" :key="item.fxmc">{{item.fxmc}}：{{item.value}}</p>
										<div class="radar" id="radar" v-show="fxyInfo.fengxiangoucheng">

										</div>
									</div>
								</div>
					        </TabPane>
					    </Tabs>
					</div>
				</div>
				<div class="close" @click="closeInfoModel"></div>
			</div>
		</div> -->
    <div class="fxyInfo_model" v-if="showInfoModel" @click.stop.self="closeInfoModel">
      <div class="fxyInfo_model_box" :class="{fxyInfo_model_box_mini: innerWidth < 1680}">
        <iframe :src="fxyInfoSrc" width="100%" height="100%"></iframe>
        <div class="close" @click="closeInfoModel">
          <Icon type="md-close" size="32" />
        </div>
      </div>
    </div>
    <div class="info" v-if="showImg" @click.stop.self="showImg = false">
      <img :src="imgUrl" style="width: 1000px" />
    </div>
    <div class="city_model" id="city_model" v-if="overCity" :style="{left: `${cityModelLeft}px`, top: `${cityModelTop}px`}">
      <div class="city_name">{{overCity.name}}</div>
      <div class="city_level" v-for="(item, index) in levelList" :key="item.color">
        <div class="city_level_color" :style="{background: item.color, width: '16px', height: '16px'}"></div>
        <div class="city_level_name">{{item.name}}：{{overCity.fxyList[index]}}</div>
      </div>
    </div>
    <div class="step_box" v-show="riskPoints.length < zsl && zsl > 1000">
      <div class="value" :style="{left: `${riskPoints.length / zsl * 100}%`}">已加载{{riskPoints.length}}个poi</div>
      <div class="step">
        <div class="step_content" :style="{width: `${riskPoints.length / zsl * 100}%`}"></div>
      </div>
      <div class="sum">poi总数{{zsl}}</div>
    </div>
  </div>
</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/radar')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  import {
    getScript
  } from '@/utils/global'
  import {
    getIntersection
  } from '@/utils/tool'
  import axios from '@/api/axios'
  import $ from 'jquery'
  import tradeList from '@/utils/trade'
  import api from '@/api/api'
  import mixins from './mixins'
  import quyu from '@/common/js/quyu_overview'
  import storage from 'good-storage'
  import TitleTop from '@/components/common/title'
  import Tool from './components/tool'
  import HeaderTitle from './components/header'
  import Overview from '@/components/left/overview'
  import PoiTj from '@/components/left/poi_tj'
  import Trade from '@/components/right/trade'
  import all_county from '@/common/area/all.json'
  import minhou from '@/common/area/mh.json'
  export default {
    name: 'poi',
    components: {
      TitleTop,
      Tool,
      Overview,
      PoiTj,
      Trade,
      HeaderTitle
    },
    mixins: [mixins, quyu],
    data() {
      return {
        searchForm: {
          fxdj: [],
          fxylb: [],
          fxymc: '',
          quyu_id: []
        },
        showCityList: false,
        showInfoModel: false,
        fxyInfo: {},
        cityName: '全部',
        username: storage.get('username'),
        area: '全部',
        showLeft: false,
        showRight: false,
        tradeList,
        reset: false,
        map: null, // 地图
        polygon: null, // 面对象
        cityList: [],
        iconList: [{
            name: '风险点',
            id: 1,
            color: '#F25E5E',
          },
          // {
          //     name: '重大风险源',
          //     id: 2,
          //     color: '#F49852',
          // }
        ],
        innerWidth: window.innerWidth,
        levelList: [{
          name: '重大风险',
          color: '#F25E5E',
          value: 0,
          color_: 'red',
          selected: true
        }, {
          name: '较大风险',
          color: '#F49852',
          value: 0,
          color_: 'orange',
          selected: true
        }, {
          name: '一般风险',
          color: '#EFE850',
          value: 0,
          color_: 'yellow',
          selected: true
        }, {
          name: '低风险',
          color: '#1C86F3',
          value: 0,
          color_: 'blue',
          selected: true
        }, {
          name: '未分级',
          color: '#10F6FF',
          value: 0,
          color_: 'blue',
          selected: true
        }, {
          name: '不分级',
          color: 'rgb(51, 51, 51)',
          value: 0,
          color_: 'blue',
          selected: true
        }],
        stationList: [],
        allTrade: [],
        areaVisible: false,
        riskInfo: {}, // 风险点详细信息
        currentRisk: {}, // 当前点击风险点
        infoWin: null, // 重大风险源信息
        overCity: null,
        cityModelLeft: 0,
        cityModelTop: 0,
        xm_id: this.$storage.get('xm') ? this.$storage.get('xm').xm_id : 11,
        markersList: [],
        showMarkers: false,
        riskPoints: [],
        isScreenFull: false,
        markerList: [],
        qyfxList: [],
        zsl: 0,
        totalSl: 0,
        currentPage: 1,
        searchFxyList: [],
        selectGkdxId: '',
        labelList: [],
        markers: null,
        markerArr: [],
        zdImg: 0,
        imgUrl: '',
        showImg: false,
        oldIndustry: null,
        fxyInfoSrc: '',
        zdColumns: [{
          title: '匝道段名称',
          key: '匝道段名称',
          width: 220,
          fixed: 'left'
        }, {
          title: '匝道车道数',
          key: '匝道车道数',
          width: 120
        }, {
          title: '坡长（m）',
          key: '坡长（m）',
          width: 120
        }, {
          title: '最大纵坡（%）',
          key: '最大纵坡（%）',
          width: 140
        }, {
          title: '设计速度（Km/h）',
          key: '设计速度（Km/h）',
          width: 160
        }, {
          title: '路基宽度（m）',
          key: '路基宽度（m）',
          width: 140
        }, {
          title: '转弯半径（m）',
          key: '转弯半径（m）',
          width: 140
        }]
      }
    },
    watch: {
      quyuList: async function(val) {
        if (val.length > 0) {
          let cityList = []
          if (this.xm_id == 13) {
            let colorList = ['#1C86F3', '#F25E5E', '#F49852', '#EFE850', ]
            cityList = minhou.features.filter(item => item.properties.NAME !== '闽侯县').map((item_, index) => {
              return {
                name: item_.properties.NAME,
                dropName: item_.properties.NAME,
                polygon: null,
                color: colorList[index % colorList.length],
                index: 0,
                point: {
                  x: -20,
                  y: -10
                },
                zoom: 12
              }
            })
          } else if (this.xm_id == 1) {
            cityList = [{
                "name": "上城区",
                dropName: "sc",
                "polygon": null,
                color: '#1C86F3',
                index: 0,
                point: {
                  x: -20,
                  y: -10
                },
                zoom: 12
              },
              {
                "name": "下城区",
                dropName: "xc",
                "polygon": null,
                color: '#1C86F3',
                index: 0,
                point: {
                  x: -20,
                  y: -10
                },
                zoom: 12
              },
              {
                "name": "西湖区",
                dropName: "xh",
                "polygon": null,
                color: '#1C86F3',
                index: 1,
                point: {
                  x: -20,
                  y: -10
                },
                zoom: 11
              },
              {
                "name": "江干区",
                dropName: "jg",
                "polygon": null,
                color: '#1C86F3',
                index: 0,
                point: {
                  x: -20,
                  y: -10
                },
                zoom: 12
              },
              {
                "name": "拱墅区",
                dropName: "gs",
                "polygon": null,
                color: '#1C86F3',
                index: 0,
                point: {
                  x: -20,
                  y: -10
                },
                zoom: 12
              },
              {
                "name": "滨江区",
                dropName: "bj",
                "polygon": null,
                color: '#1C86F3',
                index: 0,
                point: {
                  x: -20,
                  y: -10
                },
                zoom: 12
              },
              {
                "name": "萧山区",
                dropName: "xs",
                "polygon": null,
                color: '#F25E5E',
                index: 0,
                point: {
                  x: -20,
                  y: -10
                }
              },
              {
                "name": "余杭区",
                dropName: "yh",
                "polygon": null,
                color: '#F49852',
                index: 0,
                point: {
                  x: -20,
                  y: -10
                }
              },
              {
                "name": "临安区",
                dropName: "la",
                "polygon": null,
                color: '#EFE850',
                index: 0,
                point: {
                  x: -20,
                  y: -10
                }
              },
              {
                "name": "富阳区",
                dropName: "fy",
                "polygon": null,
                color: '#F49852',
                index: 0,
                point: {
                  x: -20,
                  y: -10
                }
              },
              {
                "name": "建德市",
                dropName: "jd",
                "polygon": null,
                color: '#F25E5E',
                index: 0,
                point: {
                  x: -20,
                  y: -10
                }
              },
              {
                "name": "桐庐县",
                dropName: "tl",
                "polygon": null,
                color: '#EFE850',
                index: 0,
                point: {
                  x: -20,
                  y: -10
                }
              },
              {
                "name": "淳安县",
                dropName: "ca",
                "polygon": null,
                color: '#1C86F3',
                index: 0,
                point: {
                  x: -20,
                  y: -10
                }
              },
              {
                "name": "钱塘新区",
                dropName: "qt",
                "polygon": null,
                color: '#1C86F3',
                index: 0,
                point: {
                  x: -20,
                  y: -10
                },
                zoom: 11
              }
            ]

          }
          this.getTradeList()
          let parent_ids = {
            '1': 28,
            '13': 26
          }
          let {
            status_code,
            data
          } = await api.getAreaList({
            parent_id: val[0].value,
            per_page: 1000
          })
          if (status_code == 200) {
            this.areaList = data.data
            cityList.forEach(item => {
              let item_ = this.areaList.find(areaItem => areaItem.mc == item.name)
              item_ && (item.id = item_.id)
            })
            this.cityList = cityList
          }
          this.$nextTick(() => {
            $('.tdt-bottom').css('right', this.isSearch ? '0px' : '400px')
            this.init();
            document.addEventListener('fullscreenchange', e => {
              this.isScreenFull = !this.isScreenFull
            })
            // document.getElementsByClassName('tdt-bottom').style.bottom = document.getElementById('mapDiv').offsetHeight / 2 + 'px'
          })
        }
      },
      cityName(val) {
        // let params = {
        // 	xm_id: this.xm_id,
        // 	per_page: 1000,
        // 	page: 1,
        // }
        // let quyu = this.areaList.find(areaItem => areaItem.mc == val)
        // this.cityList.forEach(item => {
        // 	if(item.polygon) {
        // 		if(item.name == val) {
        // 			item.polygon.setFillOpacity(1)
        // 			item.polygon.setWeight(5)
        // 		}else {
        // 			item.polygon.setFillOpacity(0.8)
        // 			item.polygon.setWeight(2)
        // 		}
        // 	}
        // })
        this.labelList.forEach(item => {
          let opacity = item.NP == this.cityName ? 1 : 0.01
          item.setOpacity(opacity)
        })
        // this.getFxysl(() => {
        // 	this.clearOverlays()
        // 	this.getFxy()
        // });
      },
      showCityList(val) {
        $('#header_select_dropdown').slideToggle('normal', 'swing');
      },
      'isSearch'(val) {
        this.start()
      },
      '$store.state.industryList'(val, oldVal) {
        this.clearOverlays()
        this.getAreaIndustryList(() => {
          this.getFxysl(() => {
            this.getFxy()

            // this.cityList.forEach(item => {
            // 	let qyfx = this.qyfxList.find(qyfxItem => qyfxItem.qxmc == item.name)
            // 	let fxdj = qyfx ? qyfx.fxdj : ''
            // 	let level = this.levelList.find(levelItem => fxdj == levelItem.name)
            // 	item.color = level ? level.color : item.color
            // 	item.polygon.setFillColor(item.color)
            // })
          })
        })

      },
      '$store.state.levelIds'(val) {
        setTimeout(() => {
          if (val == this.$store.state.levelIds) {
            this.clearOverlays()
            this.drawRiskMap()
            let list = this.$store.state.selectIds.split(',');
            getIntersection(list, ['14', '15', '16']).length > 0 && this.drawSubwayLine();
          }
        }, 300)
      },
      // 'searchForm.quyu_id'(val) {
      // 	this.searchFxy(1)
      // },
      // 'searchForm.fxymc'(val) {
      // 	this.searchFxy(1)
      // },
      // 'searchForm.fxylb'(val) {
      // 	this.searchFxy(1)
      // },
      // 'searchForm.fxdj'(val) {
      // 	this.searchFxy(1)
      // }
    },
    computed: {
      fxdjList() {
        return this.$store.state.levelList.filter(item => item.selected).map(item => item.name)
      },
      stateLevelList() {
        return JSON.parse(JSON.stringify(this.$store.state.levelList))
      },
      stateCurrentLevelList() {
        return JSON.parse(JSON.stringify(this.$store.state.currentLevelList))
      },
      isSearch() {
        return this.$route.query.isSearch
      },
      tradeSearchData() {
        return [{
          title: '全部',
          expand: false,
          children: JSON.parse(JSON.stringify(this.tradeList))
        }]
      }
    },
    methods: {
      closeInfoModel() {
        this.showInfoModel = false
        this.markerArr.forEach(marker => {
          marker.getIcon().setIconSize(new T.Point(29, 44))
        })
      },
      handleQuyuChange(val) {
        if (val.includes('all')) {
          let index = val.indexOf('all')
          if (index == (val.length - 1)) {
            this.searchForm.quyu_id = ['all']
          } else {
            this.searchForm.quyu_id.splice(index, 1)
          }
        }
      },
      handleFxdjChange(val) {
        if (val[val.length - 1] === 'all') {
          this.searchForm.fxdj = ['all']
        } else if (val.includes('all')) {
          this.searchForm.fxdj = this.searchForm.fxdj.join(',').replace('all,').split(',')
        }
      },
      init() {
        let self = this;
        let zoom = 10;

        this.map = new T.Map('mapDiv');
        this.map.centerAndZoom(this.mapConfig.center || new T.LngLat(119.886055, 29.996153), this.mapConfig.zoom || 9);
        // this.map.setStyle('indigo') // 修改地图风格
        this.map.enableScrollWheelZoom();
        // this.map.disableDoubleClickZoom() // 禁止双击放大
        this.map.setMinZoom(4);
        this.map.setMaxZoom(18);
        let ctrl = new T.Control.MapType({
          position: T_ANCHOR_BOTTOM_RIGHT
        });
        this.map.addControl(ctrl); // 增加地图类型控件
        //移除图层
        this.map.removeControl(TMAP_NORMAL_MAP);
        //添加图层
        this.map.addControl(TMAP_SATELLITE_MAP);
        let zoomCtrl = new T.Control.Zoom({
          position: T_ANCHOR_BOTTOM_RIGHT
        })
        this.map.addControl(zoomCtrl);
        this.map.on('zoomend', (type, target) => {
          this.labelList.forEach(item => {
            item.setFontSize(Math.pow(2, (this.map.getZoom() - 5) > 5 ? 5 : (this.map.getZoom() - 5)))
          })
        })
        this.getAreaIndustryList(() => {
          this.getFxysl(() => {
            this.drawMunicipios();
            this.clearOverlays()
            this.isSearch ? this.searchFxy(1) : this.getFxy()

          })
        })
        setTimeout(() => {
          this.map.checkResize()
        }, 100)
      },
      allMap() {
        this.map.centerAndZoom(this.mapConfig.center || new T.LngLat(119.886055, 29.996153), this.mapConfig.zoom || 9);
      },
      // 区域选择
      selectArea(name, zoom) {
        if (name == 'all') {
          this.cityName = '全部'
          this.map.centerAndZoom(this.mapConfig.center || new T.LngLat(119.886055, 29.996153), this.mapConfig.zoom || 9);
          this.getFxysl(this.getFxy)

        } else {
          let item = this.cityList.find(item => item.dropName == name)
          this.cityName = item.name;
          this.map.centerAndZoom(item.latlng, zoom || 12);
          this.getFxysl(this.getFxy)
        }
      },
      selectLevel(item) {
        item.selected = !item.selected
        this.$nextTick(() => {
          this.handleMarkerShow()
        })
      },
      handleMarkerShow() {
        this.markerArr.forEach(item => {
          this.fxdjList.includes(item.item.fxdj) ? item.setOpacity(1) : item.setOpacity(0)
        })

      },
      visibleChange(status) {
        this.areaVisible = status;
      },
      // 绘制县区覆盖物
      async drawMunicipios() {
        let self = this;
        let times = Math.ceil(this.zsl / 1000)
        let url = axios.defaults.baseURL + this.quyuList[0].map_file
        $.getJSON(url,{},res => {
          let bdary = new BMap.Boundary();
          this.labelList = []
          this.cityList.forEach(async item => {
            item.fxyList = []
            let qyfx = this.qyfxList.find(qyfxItem => qyfxItem.qxmc == item.name)
            let fxdj = qyfx ? qyfx.fxdj : ''
            let level = this.levelList.find(levelItem => fxdj == levelItem.name)
            item.color = level ? level.color : item.color
            item.data = res.features.find(item_ => item_.properties.NAME == item.name)
            let points = [];
            item.data.geometry.coordinates[0].forEach((item_, index) => {
              // if(index % 5 === 0) {
              // 	points.push(new T.LngLat(item_[0], item_[1]));
              // }
              points.push(new T.LngLat(item_[0], item_[1]));
            })
            item.polygon = new T.Polygon(points, {
              color: '#ffffff',
              weight: 2,
              opacity: 1,
              fillColor: 'transparent',
              fillOpacity: 0.5
            });
            this.map.addOverLay(item.polygon);
            item.latlng = new T.LngLat(item.data.properties.centerLon, item.data.properties.centerLat);
            let label = new T.Label({
              text: item.name,
              position: item.latlng,
              offset: new T.Point(-20, 0)
            });
            label.setFontColor('#000')
            this.map.addOverLay(label);
            label.setOpacity(0.01)
            this.labelList.push(label)
            item.polygon.addEventListener("click", () => {
              this.cityName = item.name;

              this.map.centerAndZoom(item.latlng, 10);
            });
            item.polygon.addEventListener("mouseover", e => {
              item.polygon.setFillOpacity(1)
              label.setOpacity(1)
            });
            item.polygon.addEventListener("mouseout", e => {
              if (item.name !== this.cityName) {
                item.polygon.setFillOpacity(0.5)
                label.setOpacity(0.01)
              }
            });
          })
        })

      },
      async getAreaIndustryList(cb) {
        let quyu = this.areaList.find(areaItem => areaItem.mc == this.cityName)
        let params = {
          act: 'quyu',
          xm_id: this.xm_id
        }
        quyu && (params.quyu_id = quyu.id)
        this.$store.state.industry && (params.fxylb = this.$store.state.industry.dm)
        let {
          status_code,
          data
        } = await api.getQyfxySlList(params)
        if (status_code == 200) {
          this.qyfxList = data
          cb && cb()
        }
      },
      async getFxysl(cb) {
        let quyu = this.cityList.find(item => item.dropName == this.cityName)
        let params = {
          xm_id: this.xm_id,
          per_page: 10,
          page: 1,
        }
        quyu && (params.quyu_id = quyu.id)
        // this.$store.state.industry && (params.fxylb = this.$store.state.industry.dm)
        // this.$store.state.industryList.length > 0 && (params.fxylb = this.$store.state.industryList.map(item => item.dm).join(','))
        let fxylb = []
        const map = list => {
          list.forEach(item => {
            fxylb.push(item.dm)
            if (item.children && item.children.length > 0) {
              map(item.children)
            }
          })
        }
        map(this.$store.state.industryList)
        params.fxylb = fxylb.join(',')
        let {
          status_code: status_code_,
          fxdjsl,
          zsl
        } = await api.getFxyList(params)
        this.zsl = zsl
        // if(params.fxylb == 'jiayouzhan') {
        // 	let obj = {
        // 		'一级': '重大风险',
        // 		'二级': '较大风险',
        // 		'三级': '一般风险',
        // 	}
        // 	this.levelList.forEach(item => {
        // 		for(let key in obj) {
        // 			obj[key] == item.name && (item.value = fxdjsl[key])
        // 		}
        // 	})
        // 	this.levelList[3].value = 0
        // }else {
        // 	this.levelList.forEach(item => {
        // 		item.value = fxdjsl[item.name]
        // 	})
        // }
        let levelList = JSON.parse(JSON.stringify(this.levelList))
        levelList.forEach(item => {
          item.value = fxdjsl[item.name]
          console.log(item.value)
        })
        this.$store.dispatch('save_currentLevelList', [...levelList])
        let levelList_
        if (this.$store.state.levelList.length > 0) {
          levelList_ = [...this.$store.state.levelList]
        } else {
          levelList_ = [...this.levelList]
        }
        levelList_.forEach((item, index) => {
          item.value = fxdjsl[item.name]
          // if(!this.$store.state.industry.tckdj) {
          // 	console.log(1)
          // 	item.value = fxdjsl[item.name]
          // }else {
          // 	console.log(2)
          // 	if(fxdjsl[item.name] && !this.riskPoints.find(item => params.fxylb === item.fxylb)) {
          // 		console.log(fxdjsl[item.name])
          // 		item.value = item.value ? (item.value + fxdjsl[item.name]) : fxdjsl[item.name]
          // 	}else {
          // 		console.log({...this.$store.state.levelList[index]})
          // 		item.value = this.$store.state.levelList[index] ? this.$store.state.levelList[index].value : 0
          // 	}
          // }
        })
        this.$store.dispatch('save_levelList', [...this.levelList])
        cb && cb()
      },
      getFxy() {
        let times = Math.ceil(this.zsl / 100)
        this.riskPoints = []
        let length = this.riskPoints.length
        let quyu = this.cityList.find(item => item.dropName == this.cityName)
        this.clearIcons()
        for (let i = 0; i < times; i++) {
          setTimeout(async () => {
            let params = {
              xm_id: this.xm_id,
              per_page: 100,
              page: i + 1,
            }
            quyu && (params.quyu_id = quyu.id)
            // this.$store.state.industry && (params.fxylb = this.$store.state.industry.dm)
            // this.$store.state.industryList.length > 0 && (params.fxylb = this.$store.state.industryList.map(item => item.dm).join(','))
            let fxylb = []
            const map = list => {
              list.forEach(item => {
                fxylb.push(item.dm)
                if (item.children && item.children.length > 0) {
                  map(item.children)
                }
              })
            }
            map(this.$store.state.industryList)
            params.fxylb = fxylb.join(',')
            let {
              status_code,
              data
            } = await api.getFxyList(params)
            if (status_code == 200) {
              // let riskPoints = [...this.riskPoints, ...data.data]
              // let riskPoints_ = []
              // riskPoints.forEach(item => {
              // 	!riskPoints_.find(item_ => item_.gkdx_id === item.gkdx_id) && riskPoints_.push(item)
              // })
              this.riskPoints = [...this.riskPoints, ...data.data]
              console.log(this.riskPoints.length)
              if (this.riskPoints.length == this.zsl) {
                this.$store.dispatch('save_riskPoints', this.riskPoints)
                this.drawRiskPoints(this.riskPoints)
              }
            }
          }, 1)
        }
      },
      getIcon(item) {
        if (item.fxdj && item.fxylb) {
          let index = this.levelList.findIndex(levelItem => item.fxdj == levelItem.name)
          let iconUrl
          try {
            iconUrl = require(`@/assets/risk-point/${item.fxylb}-${index + 1}.png`)
          } catch {
            iconUrl = require(`@/assets/risk-point/fengxianyuan-${index + 1}.png`)
          }
          return iconUrl
        } else {
          return ''
        }

      },
      selectIcon(item) {
        this.selectGkdxId = item.gkdx_id
        this.markerArr.forEach(marker => {
          if (marker.item.gkdx_id !== this.selectGkdxId) {
            marker.getIcon().setIconSize(new T.Point(29, 44))
          } else {
            this.map.centerAndZoom(marker.item.LngLat, 15);
            this.showInfo(item)
          }
        })
      },
      findIconLight(e, item) {
        let marker = this.markerArr.find(item_ => item_.item.gkdx_id === item.gkdx_id)
        if (!marker) {
          return
        }
        marker.getIcon().setIconSize(new T.Point(58, 88))
      },
      findIconDark(e, item) {
        let marker = this.markerArr.find(item_ => item_.item.gkdx_id === item.gkdx_id)
        if (!marker || marker.item.gkdx_id === this.selectGkdxId) {
          return
        }
        marker.getIcon().setIconSize(new T.Point(29, 44))
      },
      clearOverlays() {
        let allOverlay = this.map.getOverlays();
        for (let i = allOverlay.length - 1; i >= 0; i--) {
          if (!allOverlay[i].Yt && !allOverlay[i].NP) {
            this.map.removeLayer(allOverlay[i]);
          }
        }
        if (this.markers) {
          this.markers.clearMarkers()
        }
        // document.getElementsByClassName('tdt-interactive').remove()
        // this.map.clearOverLays()
        // this.drawMunicipios()
      },
      clearIcons() {
        let allOverlay = this.map.getOverlays();
        for (let i = allOverlay.length - 1; i >= 0; i--) {
          if (allOverlay[i].isIcon) {
            this.map.removeOverLay(allOverlay[i]);
          }
        }
        // document.getElementsByClassName('tdt-interactive').remove()
        // this.map.clearOverLays()
        // this.drawMunicipios()
      },
      drawRiskPoints(list) {
        let self = this
        let markerArr = []
        list.forEach(item => {
          if (item.jd && item.wd) {
            let fxdj = item.fxdj || "不分级"
            let iconItem = this.levelList.find(item_ => item_.name == fxdj)
            if (!iconItem) {
              return
            }
            let index = this.levelList.findIndex(levelItem => fxdj == levelItem.name)
            if (index < 0) {
              return
            }
            let iconUrl
            try {
              console.log(`${item.fxylb}-${fxdj === '不分级' ? 7 : (index + 1)}.png`)
              iconUrl = require(`../../assets/risk-point/${item.fxylb}-${fxdj === '不分级' ? 7 : (index + 1)}.png`)
            } catch {
              iconUrl = require(`../../assets/risk-point/fengxianyuan-${index + 1}.png`)
            }
            // 创建图片对象
            let icon = new T.Icon({
              iconUrl,
              iconSize: new T.Point(29, 44),
              iconAnchor: new T.Point(14, 44)
            });
            //向地图上添加自定义标注
            let param1 = new T.LngLat(item.jd, item.wd)
            let marker = new T.Marker(param1, {
              icon: icon
            });
            marker.isIcon = true
            marker.item = { ...item,
              LngLat: param1
            }
            marker.addEventListener("click", () => {
              this.showInfo(item)
            });
            markerArr.push(marker)
            this.map.addOverLay(marker);
          }
        })
        this.markerArr = markerArr
        // this.markers = new T.MarkerClusterer(this.map, {markers: markerArr});
        // this.markerArr = markerArr
        // for(let i = 0; i < Object.keys(this.markers).length; i++) {
        // 	if(this.markers[Object.keys(this.markers)[i]].clusterclick) {
        // 		this.markers[Object.keys(this.markers)[i]].clusterclick.shift()
        // 	}
        // }
        // this.markers.addEventListener('clusterclick', e => {
        // 	let markersList = []
        // 	if(!e.target.selfData) {
        // 		e.target.options.markers.forEach(item => {
        // 			let cupx = e.layerPoint
        // 			let px = this.map.lngLatToLayerPoint(item.or)
        // 			let distance = this.getDistance(cupx, px)
        // 			if((distance + '') != 'NaN' && this.getDistance(cupx, px) < 61) {
        // 				let fxylb = markersList.find(marker => item.item.fxylb == marker.fxylb)
        // 				if(!fxylb) {
        // 					markersList.push({
        // 						title: item.item.fxylbmc,
        // 						fxylb: item.item.fxylb,
        // 						expand: false,
        // 						children: [
        // 							{
        // 								title: item.item.fxymc,
        // 								...item.item
        // 							}
        // 						]
        // 					})
        // 				}else {
        // 					fxylb.children.push({
        // 						title: item.item.fxymc,
        // 						...item.item
        // 					})
        // 				}
        // 				this.markersList = markersList
        // 				this.$nextTick(() => {
        // 					this.showMarkers = true;
        // 				})
        // 			}
        // 		})
        // 	}
        // })
      },
      selectMarker(data) {
        if (!data[0].children) {
          // this.showMarkers = false;
          this.showInfo(data[0]);
        }
      },
      // 判断两点间直线像素距离
      getDistance(point1, point2) {
        let x = point1.x - point2.x
        let y = point1.y - point2.y
        let distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
        return distance
      },
      async showInfo(item) {
        let params = {
          gkdx_id: item.gkdx_id
        }
        let {
          status_code,
          data
        } = await api.getFxxxList(params)
        if (status_code == 200) {
          let userInfo = this.$storage.get('userInfo')
          userInfo.gkdx_id = item.gkdx_id
          userInfo.fxylb = item.fxylb
          this.$storage.set('userInfo', userInfo)
          item.fxgc = data.fengxiangoucheng
          this.$storage.set('fxyInfo', item)
          this.fxyInfoSrc = process.env.NODE_ENV === "development" ? `${location.origin}/#/disEditInfo?type=2` :
            `${location.origin}/v2/#/disEditInfo?type=2`
          this.showInfoModel = true;
          // this.fxyInfo = data
          // this.getQy(() => {
          // 	this.showInfoModel = true;
          // 	this.$nextTick(() => {
          // 		if(data.fengxiangoucheng) {
          // 			let list = data.fengxiangoucheng.map(item => {
          // 				return {
          // 					name: item.mc,
          // 					max: Math.ceil(item.value * 1.5) + 1,
          // 					value: item.value
          // 				}
          // 			})
          // 			let myChart = echarts.init(document.getElementById('radar'));
          // 			myChart.setOption({
          // 			    radar: {
          // 			        indicator: list,
          // 			        shape: 'circle',
          // 			    	radius: 60,
          // 			        splitNumber: 3,
          // 			        name: {
          // 			            textStyle: {
          // 			                color: '#fff',
          // 			                fontSize: 12
          // 			            }
          // 			        },
          // 			        splitLine: {
          // 			            lineStyle: {
          // 			                color: '#fff'
          // 			            }
          // 			        },
          // 			        splitArea: {
          // 			            show: false
          // 			        },
          // 			        axisLine: {
          // 			            lineStyle: {
          // 			                color: '#fff'
          // 			            }
          // 			        }
          // 			    },
          // 	            tooltip: {
          // 	                // trigger: 'axis'
          // 	                backgroundColor: '#10388C'
          // 	            },
          // 			    series: [
          // 			        {
          // 			            name: '风险点信息',
          // 			            type: 'radar',
          // 			            lineStyle: {
          // 						    normal: {
          // 						        width: 1,
          // 						        opacity: 0.5
          // 						    }
          // 						},
          // 			            data: [{
          // 			            	value: list.map(item => item.value)
          // 			            }],
          // 			            symbol: 'none',
          // 			            itemStyle: {
          // 			                color: 'rgb(16,246,255)'
          // 			            },
          // 			            lineStyle: {
          // 			            	color: '#10F6FF'
          // 			            },
          // 			            areaStyle: {
          // 			                opacity: 0.8
          // 			            }
          // 			        }
          // 			    ]
          // 			});
          // 		}
          // 	})
          // })
        }
      },
      zoomImg(zdImg, list) {
        this.imgUrl = list[zdImg].url
        this.showImg = true
      },
      start() {
        if (!this.isSearch) {
          $('#left1').slideDown();
          $('#right').slideDown();
          $('#left2').slideUp();
          this.clearOverlays()
          this.getFxy()
          this.$nextTick(() => {
            $('.tdt-bottom').css('right', '400px')
          })
        } else {
          $('#left1').slideUp();
          $('#right').slideUp();
          $('#left2').slideDown();
          this.clearOverlays()
          this.searchFxy(1)
          this.$nextTick(() => {
            $('.tdt-bottom').css('right', '0px')
          })
        }
      },
      async searchFxy(isSl) {
        isSl && (this.currentPage = 1)
        let params = {
          xm_id: this.xm_id,
          per_page: 10,
          page: this.currentPage,
          quyu_id: this.searchForm.quyu_id.includes('all') ? '' : this.searchForm.quyu_id.join(','),
          fxdj: this.searchForm.fxdj.includes('all') ? '' : this.searchForm.fxdj.join(','),
          fxymc: this.searchForm.fxymc,
          fxylb: this.searchForm.fxylb.join(',')
        }
        let {
          status_code,
          data,
          zsl
        } = await api.getFxyList(params)
        if (status_code == 200) {
          this.clearIcons()
          this.totalSl = zsl
          this.searchFxyList = data.data
          this.drawRiskPoints(this.searchFxyList)
          this.$store.dispatch('save_riskPoints', this.searchFxyList)
          // if(!isSl) {
          // 	this.searchFxyList = data.data
          // 	this.drawRiskPoints(this.searchFxyList)
          // 	this.$store.dispatch('save_riskPoints', this.searchFxyList)
          // }
        }
      },
      handleSearchPageChange(val) {
        this.currentPage = val
        this.clearOverlays()
        this.searchFxy()
      },
      handleTradeChange(list) {
        let fxylb = []
        list.forEach(item => {
          item.dm && fxylb.push(item.dm)
        })
        this.searchForm.fxylb = fxylb
      },
      async getTradeList() {
        let params = {
          act: 'getall'
        }
        let {
          status_code,
          data
        } = await api.getFxylbList(params)
        if (status_code == 200) {
          this.allTrade = data;
          this.tradeList = this.toTree(data, 1);
          this.$store.dispatch('save_tradeList', this.tradeList);
          this.$nextTick(() => {
            this.$refs.trade_list.setHeight()
          })
        }
      },
      toTree(data, index) {
        // 删除 所有 children,以防止多次调用
        data.forEach(function(item) {
          item.selected = false
          item.showChildren = false
          delete item.children
        })
        // 将数据存储为 以 id 为 KEY 的 map 索引数据列
        var map = {}
        data.forEach(function(item) {
          map[item.id] = item
        })
        var val = []
        data.forEach(function(item) {
          item.title = item.fxylbmc
          // 以当前遍历项，的pid,去map对象中找到索引的id
          var parent = map[item.parent_id]
          // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
          if (parent) {
            // if(!map[parent.parent_id]) {
            // 	;(parent.children || (parent.children = [])).push(item)
            // }
            ;
            (parent.children || (parent.children = [])).push(item)
          } else {
            //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
            val.push(item)
          }
        })
        return val
      },
      drag(e) {
        let elem = e.target
        let distance = e.clientY - e.target.offsetTop
        document.onmousemove = e => {
          this.$refs.areaBox.style.height = (e.clientY - distance) + 'px'
        }
        document.onmouseup = e => {
          document.onmousemove = null
          document.onmouseup = null
          this.$nextTick(() => {
            this.$refs.trade_list.setHeight()
          })
        }
      },
      dragLeft(e) {
        let elem = e.target
        let distance = e.clientX - e.target.offsetLeft
        document.onmousemove = e => {
          this.$refs.left1.style.width = (e.clientX - distance) + 'px'
          this.$refs.left2.style.width = (e.clientX - distance) + 'px'
        }
        document.onmouseup = e => {
          document.onmousemove = null
          document.onmouseup = null
          // this.$nextTick(() => {
          // 	this.$refs.trade_list.setHeight()
          // })
        }
      },
      rowClassName(row, index) {
        return 'demo-table-info-row';
      }
    },
    async created() {
      // let cityList = []
      // if(this.xm_id == 13) {
      // 	let colorList = ['#1C86F3', '#F25E5E', '#F49852', '#EFE850', ]
      // 	cityList = minhou.features.filter(item => item.properties.NAME !== '闽侯县').map((item_, index) => {
      // 		return {
      // 			name: item_.properties.NAME,
      // 			dropName: item_.properties.NAME,
      // 			polygon: null,
      // 			color: colorList[index % colorList.length],
      // 			index: 0,
      // 			point: {x: -20, y: -10},
      // 			zoom: 12
      // 		}
      // 	})
      // }else if(this.xm_id == 1) {
      // 	cityList = [
      // 		{"name": "上城区", dropName: "sc", "polygon": null, color: '#1C86F3', index: 0, point: {x: -20, y: -10}, zoom: 12},
      // 		{"name": "下城区", dropName: "xc", "polygon": null, color: '#1C86F3', index: 0, point: {x: -20, y: -10}, zoom: 12},
      // 		{"name": "西湖区", dropName: "xh", "polygon": null, color: '#1C86F3', index: 1, point: {x: -20, y: -10}, zoom: 11},
      // 		{"name": "江干区", dropName: "jg", "polygon": null, color: '#1C86F3', index: 0, point: {x: -20, y: -10}, zoom: 12},
      // 		{"name": "拱墅区", dropName: "gs", "polygon": null, color: '#1C86F3', index: 0, point: {x: -20, y: -10}, zoom: 12},
      // 		{"name": "滨江区", dropName: "bj", "polygon": null, color: '#1C86F3', index: 0, point: {x: -20, y: -10}, zoom: 12},
      // 		{"name": "萧山区", dropName: "xs", "polygon": null, color: '#F25E5E', index: 0, point: {x: -20, y: -10}},
      // 		{"name": "余杭区", dropName: "yh", "polygon": null, color: '#F49852', index: 0, point: {x: -20, y: -10}},
      // 		{"name": "临安区", dropName: "la", "polygon": null, color: '#EFE850', index: 0, point: {x: -20, y: -10}},
      // 		{"name": "富阳区", dropName: "fy", "polygon": null, color: '#F49852', index: 0, point: {x: -20, y: -10}},
      // 		{"name": "建德市", dropName: "jd", "polygon": null, color: '#F25E5E', index: 0, point: {x: -20, y: -10}},
      // 		{"name": "桐庐县", dropName: "tl", "polygon": null, color: '#EFE850', index: 0, point: {x: -20, y: -10}},
      // 		{"name": "淳安县", dropName: "ca", "polygon": null, color: '#1C86F3', index: 0, point: {x: -20, y: -10}},
      // 		{"name": "钱塘新区", dropName: "qt", "polygon": null, color: '#1C86F3', index: 0, point: {x: -20, y: -10}, zoom: 11}
      // 	]

      // }
      // this.getTradeList()
      // let parent_ids = {
      // 	'1': 28,
      // 	'13': 26
      // }
      // let { status_code, data } = await api.getAreaList({parent_id: parent_ids[this.xm_id], per_page: 1000})
      // if(status_code == 200) {
      // 	this.areaList = data.data
      // 	cityList.forEach(item => {
      // 		let item_ = this.areaList.find(areaItem => areaItem.mc == item.name)
      // 		item_ && (item.id = item_.id)
      // 	})
      // 	this.cityList = cityList
      // }
      // this.$nextTick(() => {
      // 	$('.tdt-bottom').css('right', this.isSearch ? '0px' : '400px')
      // 	this.init();
      //       	document.addEventListener('fullscreenchange', e => {
      //       		this.isScreenFull = !this.isScreenFull
      //       	})
      // 	// document.getElementsByClassName('tdt-bottom').style.bottom = document.getElementById('mapDiv').offsetHeight / 2 + 'px'
      // })
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: hidden;

    .trade1 {
      margin-left: 0;
      margin-right: 40px;
    }

    .mapDiv {
      // position: fixed;
      // left: 0;
      // right: 0;
      // top: 40px;
      // bottom: 0;
      // z-index: 100;
      width: 100%;
      height: 100%;
    }

    .level_box {
      position: absolute;
      left: 280px;
      top: 40px;
      z-index: 1000;

      .level_item {
        margin-bottom: 12px;
        padding: 0 14px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        background: url('../../assets/frame.png');
        background-size: 100% 100%;

        .check {
          margin-right: 16px;
          width: 20px;
          height: 20px;
          background: url('../../assets/agreement_off.png');
          background-size: 100%;
          cursor: pointer;
        }

        .selected {
          background: url('../../assets/agreement_on.png');
          background-size: 100%;
        }

        .level_item_name {
          margin-right: 8px;
          flex: 1;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #FFFFFF;
          text-align: center;
        }

        .level_item_color {}
      }
    }

    .selected_industry_box {
      position: absolute;
      left: 280px;
      bottom: 20px;
      z-index: 1000;
      width: 180px;
      border: 1px solid #10F6FF;
      border-radius: 8px;
      padding: 16px;
      background: rgba(5, 27, 74, 0.87);

      .selected_industry_title {
        margin-bottom: 20px;
        color: #10F6FF;
        line-height: 28px;
        font-size: 20px;
      }

      .selected_industry_list {
        max-height: 300px;
        overflow-y: auto;

        .selected_industry_item {
          color: #10F6FF;

          .selected_industry_name {
            line-height: 20px;
          }
        }
      }
    }

    .left {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      z-index: 1000;
      // padding-top: 48px;
      box-sizing: border-box;
      width: 240px;
      background: rgba(5, 27, 74, 0.87);
      overflow: hidden;

      .drag_line {
        position: absolute;
        top: 0;
        right: 0;
        width: 3px;
        height: 100%;
        background: transparent;
        cursor: ew-resize;
      }

      .left_box {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        .left_item {
          width: 100%;
          height: 50%;
          overflow: hidden;
          border: 1px solid #10388C;
          box-shadow: inset 0 0 32px 0 rgba(0, 163, 255, 0.30);
          display: flex;
          flex-direction: column;

          &:first-child {
            height: 30%;
          }

          &:last-child {
            .line {
              width: 100%;
              height: 1px;
              background: #25b5d8;
              cursor: s-resize;
            }

            flex: 1;
          }

          .search_form {
            margin-top: 24px;
            padding: 0 32px;
            box-sizing: border-box;
            width: 100%;

            // border: 1px solid #10388C;
            .btn {
              margin: 10px auto 20px;
              border: 1px solid #10F6FF;
              border-radius: 2px;
              height: 30px;
              width: 148px;
              font-family: PingFangSC-Medium;
              font-size: 15px;
              color: #10F6FF;
              text-align: center;
              line-height: 30px;
            }

            .bottom_line {
              margin-bottom: 16px;
              width: 100%;
              height: 1px;
              background: linear-gradient(270deg, rgba(255, 255, 255, 0.00) 0%, #10F6FF 50%, rgba(255, 255, 255, 0.00) 100%);
            }

            /deep/.ivu-form {
              .ivu-form-item {
                margin-bottom: 4px !important;

                .ivu-form-item-label {
                  padding: 10px 12px 4px 0;
                  color: #ffffff;
                }

                .ivu-form-item-content {
                  .ivu-select {
                    color: #fff;

                    .ivu-select-selection {
                      border: 1px solid #FFFFFF;
                      border-radius: 2px;
                      background: transparent;
                      min-height: 0;
                      height: 28px;
                    }

                    .ivu-select-dropdown {
                      max-height: 10000px;
                    }
                  }

                  .ivu-input {
                    color: #fff;
                    border: 1px solid #FFFFFF;
                    border-radius: 2px;
                    background: transparent;
                  }

                  .ivu-tree {
                    .ivu-tree-children {
                      li {
                        margin: 0;

                        .ivu-checkbox-wrapper {

                          .ivu-checkbox-checked,
                          .ivu-checkbox-indeterminate {
                            .ivu-checkbox-inner {
                              background-color: #214076;
                              border-color: #214076;
                            }
                          }
                        }

                        .ivu-tree-title {
                          color: #fff;
                          background: transparent !important;

                          &:hover {
                            background: transparent;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          .search_list {
            padding-right: 40px;
            padding-bottom: 42px;
            box-sizing: content-box;
            width: 100%;
            flex: 1;
            overflow-y: scroll;

            .search_item {
              position: relative;
              padding-top: 16px;
              padding-left: 56px;
              padding-bottom: 12px;
              box-sizing: border-box;
              width: 100%;

              &:last-child {
                .search_line {
                  border-bottom: none;
                }
              }

              img {
                position: absolute;
                top: 16px;
                left: 16px;
                width: 24px;
                height: 37px;
              }

              .search_title {
                margin-bottom: 16px;
                font-family: PingFangSC-Medium;
                font-size: 14px;
                color: #10F6FF;
                text-align: left;
              }

              .search_content {
                margin-bottom: 8px;
                font-family: PingFangSC-Regular;
                font-size: 13px;
                color: #FFFFFF;
                text-align: left;
              }

              .search_line {
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 280px;
                height: 0px;
                border-bottom: 1px dashed rgba(255, 255, 255, 0.38);
              }
            }

            .is_select {
              background: #214076;
            }
          }

          .search_page {
            position: absolute;
            bottom: 0;
            padding: 8px 0;
            width: 100%;
            background: #214076;

            /deep/.ivu-page {
              display: flex;
              justify-content: center;

              li {
                margin: 0;
                background: transparent;

                a {
                  color: #fff;
                }
              }

              .ivu-page-item-active {
                background: #1C86F3;
              }
            }
          }

          .trade_list {
            height: 100%;
            box-sizing: border-box;
            // padding-bottom: 24px;
          }

          .header_select_dropdown_list {
            padding-right: 20px;
            box-sizing: border-box;
            width: calc(100% + 24px);
            height: calc(100% - 58px);
            overflow-y: scroll;
            // min-height: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

            .header_select_dropdown_item {
              margin-top: 28px;
              width: 40%;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              justify-content: center;

              .check {
                margin-right: 16px;
                width: 20px;
                height: 20px;
                background: url('../../assets/agreement_off.png');
                background-size: 100%;
                cursor: pointer;
              }

              .selected {
                background: url('../../assets/agreement_on.png');
                background-size: 100%;
              }

              span {
                width: 60px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                text-align: left;
                color: #fff;
                line-height: 20px;
                cursor: pointer;
                display: inline-block;
              }

              .active {
                color: rgb(16, 246, 255);
              }
            }
          }
        }
      }

      .close {
        position: absolute;
        left: 16px;
        top: 24px;
        width: 16px;
        height: 16px;
        background: url('../../assets/close.png');
        background-size: 100%;
      }
    }

    .select_trade {
      position: fixed;
      top: 280px;
      right: 24px;
      z-index: 100;
      background: url('../../assets/right-case.png');
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;

      img {}

      .select_trade_text {
        margin: 12px 0 4px;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #FFFFFF;
        text-align: center;
        line-height: 20px;
      }
    }

    .trade_box {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 1000;
      box-sizing: border-box;
      width: 400px;
      background: rgba(5, 27, 74, 0.87);
      border: 1px solid #10388C;
      box-shadow: inset 0 0 32px 0 rgba(0, 163, 255, 0.30);
      overflow: hidden;

      .right_box {
        width: 420px;
        height: 100%;

        .trade_order_popup {
          width: 100%;
          height: calc(100% - 342px);
          overflow-x: hidden;

          .trade_order_content {
            width: calc(100% + 20px);
            height: 100%;
            overflow-y: scroll;
          }
        }
      }

      .close {
        position: absolute;
        right: 16px;
        top: 24px;
        width: 16px;
        height: 16px;
        background: url('../../assets/close.png');
        background-size: 100%;
      }
    }

    .bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1002;
      background: rgba(5, 27, 74, 0.95);
      border: 1px solid #10388C;
      box-shadow: inset 0 0 32px 0 rgba(0, 163, 255, 0.30);
      box-sizing: border-box;
      height: 276px;
    }

    .bottom_left {
      left: 400px;
    }

    .bottom_right {
      right: 400px;
    }

    /deep/.tdt-label {
      background: transparent;
      box-shadow: none;
      border: none;
      color: rgba(255, 255, 255, 0.87);
    }

    .city_model {
      position: fixed;
      z-index: 1003;
      background: rgba(5, 27, 74, .87);
      border-radius: 8px;
      border: 1px solid #10388c;
      box-shadow: inset 0 0 4px 0 rgba(0, 163, 255, .3);
      padding: 16px;
      width: 160px;

      .city_name {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #FFFFFF;
        text-align: left;
        line-height: 22px;
      }

      .city_level {
        display: flex;
        align-items: center;

        .city_level_color {
          margin-right: 8px;
          border-radius: 8px;
        }

        .city_level_name {
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #FFFFFF;
          text-align: left;
          line-height: 26px;
        }
      }
    }

    .fxyInfo_model {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1001;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.38);

      .fxyInfo_model_box {
        position: relative;
        width: 1000px;
        height: 700px;
        background: #ffffff;

        &.fxyInfo_model_box_mini {
          width: 800px;
          height: 540px;
        }

        .close {
          position: absolute;
          right: 8px;
          top: 8px;
          // background: url('../../assets/close.png');
          // background-size: 100%;
        }
      }
    }

    .info {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1001;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.38);

      .info_model_box {
        position: relative;
        width: 560px;
        height: 410px;
        background: url('../../assets/point-up.png') center no-repeat;
        background-size: contain;

        .close {
          position: absolute;
          right: 16px;
          top: 24px;
          width: 16px;
          height: 16px;
          background: url('../../assets/close.png');
          background-size: 100%;
        }

        .info_model {
          border: 24px transparent solid;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          overflow-x: hidden;
          overflow-y: auto;

          .info_name {
            font-family: PingFangSC-Medium;
            font-size: 18px;
            color: #FFFFFF;
            text-align: center;
            line-height: 26px;
          }

          .info_content {
            margin-top: 8px;

            /deep/.ivu-tabs {
              .ivu-tabs-bar {
                border-bottom: none;

                .ivu-tabs-nav {
                  .ivu-tabs-tab {
                    font-size: 18px;
                    color: rgba(255, 255, 255, 0.70);

                    &:hover {
                      color: #10F6FF;
                    }
                  }

                  .ivu-tabs-tab-active {
                    color: #10F6FF;
                  }

                  .ivu-tabs-ink-bar {
                    background-color: #10F6FF;
                  }
                }
              }
            }

            .baseInfo_box {
              width: 100%;
              height: 280px;
              overflow: hidden;

              .baseInfo {
                padding-right: 50px;
                box-sizing: border-box;
                width: calc(100% + 50px);
                height: 280px;
                overflow-y: scroll;

                p {
                  margin-bottom: 8px;
                  font-family: PingFangSC-Regular;
                  font-size: 16px;
                  color: #FFFFFF;
                  text-align: left;

                  .red {
                    font-family: PingFangSC-Medium;
                    font-size: 24px;
                    color: #F25E5E;
                    text-align: left;
                  }
                }

                .radar {
                  width: 100%;
                  height: 200px;
                }

                /deep/ .ivu-table {
                  background-color: transparent;

                  &:before {
                    height: 0;
                  }

                  .ivu-table-overflowX {
                    overflow-y: hidden;
                    height: calc(100% - 20px);

                    table {
                      padding-bottom: 20px;
                    }
                  }

                  .ivu-table-fixed {
                    &:before {
                      height: 0;
                    }
                  }

                  th {
                    background-color: #022a63;
                    color: #fff;
                    border: none;
                  }

                  td {
                    background-color: #022a63;
                    color: #fff;
                    border: none;
                  }

                  .demo-table-info-row {
                    td {}
                  }
                }

                /deep/.img_box {
                  width: calc(100% - 20px);

                  .ivu-carousel-arrow {
                    background-color: rgba(31, 45, 61, .38);

                    &:hover {
                      background-color: rgba(31, 45, 61, .6);
                    }
                  }
                }
              }
            }
          }
        }

        /deep/ .marker_model {
          overflow: hidden;

          .marker_content {
            width: calc(100% + 50px);
            height: 100%;
            overflow-y: scroll;

            .ivu-tree-title-selected {
              background-color: #4e7eb1;
            }

            .ivu-tree-title {
              color: #fff;

              &:hover {
                background-color: #4e7eb1;
              }
            }

            .ivu-icon {
              &:before {
                color: #fff;
              }
            }
          }
        }
      }
    }

    .step_box {
      position: absolute;
      bottom: 42px;
      left: 50%;
      z-index: 1001;
      transform: translateX(-50%);
      display: flex;
      align-items: center;

      .step {
        width: 600px;
        height: 16px;
        background: rgba(255, 255, 255, 0.50);
        border-radius: 8px;

        .step_content {
          height: 16px;
          background: #1C86F3;
          border-radius: 8px;
        }
      }

      .value {
        position: absolute;
        bottom: 20px;
        transform: translateX(-100%);
        font-family: PingFangSC-Medium;
        font-size: 15px;
        color: #1C86F3;
        text-align: left;
        white-space: nowrap;
      }

      .sum {
        margin-left: 16px;
        font-family: PingFangSC-Medium;
        font-size: 15px;
        color: #1C86F3;
        text-align: left;
      }
    }
  }

  .ivu-dropdown-menu {
    background: rgba(5, 27, 74, 0.87);
    border: 1px solid #10388C;
    box-shadow: inset 0 0 0.16667rem 0 rgba(0, 163, 255, 0.3);
  }

  .ivu-dropdown-item {
    color: #ffffff;

    &:hover {
      color: #2b85e4;
      background: transparent;
    }
  }

  /deep/.tdt-right {
    right: 400px;
  }

  /deep/.tdt-bottom {
    bottom: 0 !important;
  }
</style>
