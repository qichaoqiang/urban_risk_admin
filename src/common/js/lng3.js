import $ from 'zhangjia-zepto'

export default {
  props: {
    lngAndLat: {
      default: '',
      type: String
    },
    id: {
      default: 'lng_box1',
      type: String
    },
    dz: {
      default: '',
      type: String
    },
    canEdit: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      lng: '',
      lat: '',
      map: null,
      showLngModel: false,
      keyword: ''
    }
  },
  watch: {
    'baseInfo.lngAndLat'(val) {
      console.log('baseInfo.lngAndLat')
      this.$emit('update:lngAndLat', val)
    },
    lngAndLat(val) {
      console.log('lngAndLat')
      this.baseInfo.lngAndLat = val
    },
    dz(val) {
      console.log('dz')
      if (val) {
        this.keyword = val
        this.$nextTick(() => {
          this.search();
        })
      }
    }
  },
  methods: {
    openLngModal() {
      this.showLngModel = true;
      if (!this.map) {
        this.$nextTick(() => {
          if (this.baseInfo.lngAndLat) {
            this.lng = this.baseInfo.lngAndLat.split(' ')[0]
            this.lat = this.baseInfo.lngAndLat.split(' ')[1]
            this.map = new T.Map(this.id);
            let zoomCtrl = new T.Control.Zoom({
              position: T_ANCHOR_BOTTOM_RIGHT
            })
            this.map.addControl(zoomCtrl);
            let marker = new T.Marker(new T.LngLat(this.lng, this.lat));
            this.map.addOverLay(marker);
            this.map.centerAndZoom(new T.LngLat(this.lng, this.lat), 10);
            this.map.addEventListener("click", ({
              lnglat
            }) => {
              this.addMark(lnglat.lng, lnglat.lat)
            });
            let ctrl = new T.Control.MapType();
            this.map.addControl(ctrl); // 增加地图类型控件
            //移除图层
            this.map.removeControl(TMAP_NORMAL_MAP);
            //添加图层
            this.map.addControl(TMAP_HYBRID_MAP);
          } else {
            let lo = new BMap.Geolocation();
            lo.getCurrentPosition((e) => {
              console.log(e)
              this.lng = e.point.lng.toFixed(6);
              this.lat = e.point.lat.toFixed(6);
              this.map = new T.Map(this.id);
              let zoomCtrl = new T.Control.Zoom({
                position: T_ANCHOR_BOTTOM_RIGHT
              })
              this.map.addControl(zoomCtrl);
              let marker = new T.Marker(e.point);
              this.map.addOverLay(marker);
              this.map.centerAndZoom(new T.LngLat(e.point.lng, e.point.lat), 10);
              this.map.addEventListener("click", ({
                lnglat
              }) => {
                this.addMark(lnglat.lng, lnglat.lat)
              });
              let ctrl = new T.Control.MapType();
              this.map.addControl(ctrl); // 增加地图类型控件
              //移除图层
              this.map.removeControl(TMAP_NORMAL_MAP);
              //添加图层
              this.map.addControl(TMAP_HYBRID_MAP);
            });
          }
          // let ctrl = new T.Control.MapType([{
          // 	title: '地图', //地图控件上所要显示的图层名称
          // 	icon:'http://api.tianditu.gov.cn/v4.0/image/map/maptype/vector.png', //地图控件上所要显示的图层图标（默认图标大小80x80）
          // 	layer: TMAP_NORMAL_MAP //地图类型对象，即MapType。
          // },
          // {
          // 	title: '卫星',
          // 	icon:' http://api.tianditu.gov.cn/v4.0/image/map/maptype/satellite.png',
          // 	layer: TMAP_SATELLITE_MAP
          // },
          // {
          // 	title: '卫星混合',
          // 	icon: 'http://api.tianditu.gov.cn/v4.0/image/map/maptype/satellitepoi.png',
          // 	layer: TMAP_HYBRID_MAP
          // },
          // {
          // 	title: '地形',
          // 	icon:' http://api.tianditu.gov.cn/v4.0/image/map/maptype/terrain.png',
          // 	layer: TMAP_TERRAIN_MAP
          // },
          // {
          // 	title: '地形混合',
          // 	icon:' http://api.tianditu.gov.cn/v4.0/image/map/maptype/terrainpoi.png',
          // 	layer: TMAP_TERRAIN_HYBRID_MAP
          // }]);
          //         	this.map.addControl(ctrl);
        })
      }

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
    search() {
      let self = this
      $.ajax({
        type: 'get',
        url: 'http://api.tianditu.gov.cn/geocoder',
        data: {
          ds: `{"keyWord":"${this.keyword}"}`,
          tk: '701640b81eacb6c191dd460f74393688'
        },
        dataType: 'json',
        success(res) {
          let {
            status,
            location,
            msg
          } = res
          if (status == '0') {
            self.map && self.addMark(location.lon, location.lat)
          } else {
            self.$Message.error(msg || '未查询到结果')
          }
        },
        error(err) {
          self.$Message.error('未查询到结果')
        }
      })
    },
    addMark(lng, lat) { //添加标注
      console.log(lng, lat)
      this.map.clearOverLays()
      var marker = new T.Marker(new T.LngLat(lng, lat));
      this.map.addOverLay(marker);
      this.lng = lng.toFixed(6)
      this.lat = lat.toFixed(6)
      this.baseInfo.lngAndLat = `${this.lng} ${this.lat}`
      this.map.centerAndZoom(new T.LngLat(lng, lat), 15);
    },
  }
}
