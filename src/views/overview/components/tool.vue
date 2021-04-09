<template>
	<div>
		<div class="tool_box">
			<div class="screenfull" @click="reload">
				<img src="@/assets/nstrument-1.png">
				<span>一键恢复</span>
			</div>
			<div class="screenfull" @click="allMap">
				<img src="@/assets/nstrument-2.png">
				<span>全图</span>
			</div>
			<div class="screenfull" @click="showLegend = !showLegend">
				<img src="@/assets/nstrument-3.png">
				<span>图例</span>
			</div>
			<div class="screenfull" @click="save('mapDiv')">
				<img src="@/assets/nstrument-4.png">
				<span>保存为图片</span>
			</div>
			<div class="screenfull" @click="print">
				<img src="@/assets/nstrument-5.png">
				<span>打印</span>
			</div>
			<div class="screenfull" v-show="!isScreenFull" @click="screenfull">
				<img src="@/assets/nstrument-6.png">
				<span>全屏</span>
			</div>
		</div>
		<div class="info" v-show="showLegend">
			<div class="info_model_box">
				<div class="close" @click="showLegend = false"></div>
				<div class="info_model">
					<div class="info_name">地图图例</div>
					<div class="info_content">
						<div class="info_content_over">
							<div class="unit_item" v-for="item in tradeList" :key="item.id" v-if="item.children">
								<div class="unit_name">{{item.fxylbmc}}</div>
								<div style="overflow: hidden; clear: both"></div>
								<div class="industry_list">
									<div class="industry_item" v-for="item_ in item.children" :key="item_.id">
										<img :src="getIcon(item_.dm)">
										<span>{{item_.fxylbmc}}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="level_list">
					<div class="level_item" v-for="(item, index) in levelList" :key="item.color">
						<div class="level_color" :style="{background: item.color}"></div>
						<div class="level_name">{{item.name}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import html2canvas from 'html2canvas'
	import $ from 'jquery'
	import { mapState } from 'vuex'
	export default {
		name: '',
		data() {
			return {
		        isScreenFull: false,
		        showLegend: false
			}
		},
		props: {
			levelList: {
				default: () => [],
				type: Array
			}
		},
		watch: {

		},
		computed: {
			...mapState(['tradeList']),
		},
		methods: {
      getIcon(dm) {
        let iconUrl
        try {
          iconUrl = require(`@/assets/risk-point/${dm}-6.png`)
        } catch {
          iconUrl = require(`@/assets/risk-point/fengxianyuan-6.png`)
        }
        return iconUrl
      },
			reload() {
				location.reload()
			},
			screenfull() {
				// let de = document.querySelector('#mapDiv_box') || document.documentElement;
				// const requestFullScreen = element => {
				//     if (de.requestFullscreen) {
				//         de.requestFullscreen();
				//     } else if (de.mozRequestFullScreen) {
				//         de.mozRequestFullScreen();
				//     } else if (de.webkitRequestFullScreen) {
				//         de.webkitRequestFullScreen();
				// 	}else if(div.msRequestFullScreen){
		  //               div.msRequestFullScreen();
		  //           }else {
				//     	this.$Message.error('不支持全屏')
				//     	return false
				//     }
				// }
				// if(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement){
    //             	this.$Message.info('当前窗口已全屏显示')
    //         	}else {
    //         		requestFullScreen();
    //         	}
    			function requesetFullScreen(elem) {
				  if (elem.requestFullscreen) {
				    elem.requestFullscreen();
				  } else if (elem.mozRequestFullScreen) {
				    elem.mozRequestFullScreen();
				  } else if (elem.webkitRequestFullScreen) {
				    elem.webkitRequestFullScreen();
				  }else if(elem.msRequestFullScreen){
				    elem.msRequestFullScreen();
				  }else {
				    alert('当前浏览器不支持全屏，请更换浏览器')
				    return false
				  }
				}

				function screenfull(elemId) {
				  let elem = document.querySelector(elemId) || document.documentElement;
				  if(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement){
				    alert('当前窗口已全屏显示')
				  }else {
				    console.log(elem)
				    requesetFullScreen(elem);
				  }
				}

				screenfull('#mapDiv_box')
			},
			allMap() {
				this.$parent.allMap()
			},
			print() {
				// var v = document.getElementById("mapDiv");
				// //向v中追加打印数据，可以将界面的元素追加进来
				// var h = window.open("打印窗口", "_blank");
			 //    h.document.write($(v).prop("outerHTML"));
			 //    h.document.close();
			 //    setTimeout(() => {
			 //    	h.print();
			 //    	h.close();
			 //    }, 1000)
			 	html2canvas(document.getElementById('mapDiv_box'), {
					allowTaint: false,
                    useCORS: true,
				}).then(canvas => {
					//将图片保存到变量
					var image = canvas.toDataURL("image/jpeg");
					let img = document.createElement('img');
					img.src = image
				    img.style.width = '100vw'
				    img.style.height = `${100 * img.height / img.width}vw`
				   	var h = window.open('打印窗口', "_blank");
				    h.document.write($(img).prop("outerHTML"));
				    h.document.close();
				    setTimeout(() => {
				    	h.print();
				    	h.close();
				    }, 1000)

				});
			},
			save(elemId) {
				html2canvas(document.getElementById(elemId), {
					allowTaint: false,
                    useCORS: true,
				}).then(canvas => {
					//将图片保存到变量
					var image = canvas.toDataURL("image/jpeg");
					downloadFile('杭州市风险地图', image);
				});
				function downloadFile(fileName, content) { //下载base64图片
				    var base64ToBlob = function(code) {
				        let parts = code.split(';base64,');
				        let contentType = parts[0].split(':')[1];
				        console.log(parts[1])
				        let raw = window.atob(parts[1]);
				        let rawLength = raw.length;
				        let uInt8Array = new Uint8Array(rawLength);
				        for(let i = 0; i < rawLength; ++i) {
				            uInt8Array[i] = raw.charCodeAt(i);
				        }
				        return new Blob([uInt8Array], {
				            type: contentType
				        });
				    };
				    let aLink = document.createElement('a');
				    let blob = base64ToBlob(content); //new Blob([content]);
				    let evt = document.createEvent("HTMLEvents");
				    evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
				    aLink.download = fileName;
				    aLink.href = URL.createObjectURL(blob);
				    aLink.click();
				};
			},
		},
		created() {

		},
		mounted() {
			document.addEventListener('fullscreenchange', e => {
        		this.isScreenFull = !this.isScreenFull
        	})
		}
	}
</script>

<style lang="scss" scoped>
	.tool_box {
		position: absolute;
		top: 10px;
		right: 424px;
		z-index: 1001;
		height: 44px;
		display: flex;
		background: rgba(5,27,74,0.80);
		border: 1px solid #10388C;
		box-shadow: inset 0 0 32px 0 rgba(0,163,255,0.30);
		border-radius: 2px;
		.screenfull {
			position: relative;
			padding: 0 12px;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			img {
				width: 24px;
				height: 24px;
			}
			span {
				margin-left: 8px;
				font-family: PingFangSC-Regular;
				font-size: 13px;
				color: #FFFFFF;
				text-align: center;
			}
			&:after {
				position: absolute;
				top: 12px;
				right: 0;
				content: '';
				width: 0;
				height: 20px;
				border-left: 1px dashed rgba(255,255,255,0.38);
			}
			&:last-child {
				&:after {
					display: none;
				}
			}
		}
	}
	.info {
		position: absolute;
		top: 70px;
		right: 489px;
		z-index: 1001;
		width: 880px;
		display: flex;
		justify-content: center;
		align-items: center;
		.info_model_box {
			position: relative;
			width: 100%;
			height: 100%;
			background: rgba(5,27,74,0.80);
			border: 1px solid #10388C;
			box-shadow: inset 0 0 32px 0 rgba(0,163,255,0.30);
			border-radius: 2px;
			.close {
				position: absolute;
				right: 16px;
				top: 24px;
				width: 16px;
				height: 16px;
				background: url('../../../assets/close.png');
				background-size: 100%;
			}
			.info_model {
				padding: 24px 32px;
				box-sizing: border-box;
				width: 100%;
				height: 100%;
				.info_name {
					font-family: PingFangSC-Medium;
					font-size: 20px;
					color: #10F6FF;
					text-align: center;
					line-height: 28px;
				}
				.info_content {
					margin-top: 24px;
					width: 100%;
					overflow-x: hidden;
					.info_content_over {
						padding-right: 20px;
						width: calc(100% + 20px);
						box-sizing: border-box;
						height: 600px;
						overflow-y: scroll;
						display: flex;
						.unit_item {
							margin-right: 24px;
							.unit_name {
								float: left;
								padding: 0 12px;
								height: 38px;
								background: #1C86F3;
								border-radius: 2px;
								font-family: PingFangSC-Medium;
								font-size: 16px;
								color: #FFFFFF;
								text-align: center;
								line-height: 38px;
								white-space: nowrap;
							}
							.industry_list {
								padding-top: 8px;
								.industry_item {
									margin-top: 16px;
									display: flex;
									align-items: center;
									img {
										margin-right: 8px;
										width: 20px;
										height: 20px;
									}
									span {
                    display: block;
										font-family: PingFangSC-Regular;
										font-size: 14px;
										color: #FFFFFF;
										text-align: left;
                    max-width: 95px;
									}
								}
							}
						}
					}
				}
			}
			.level_list {
				position: absolute;
				top: 50%;
				right: 32px;
				transform: translateY(-50%);
				.level_item {
					margin-top: 48px;
					.level_color {
						margin: 0 auto;
						width: 26px;
						height: 26px;
						border-radius: 2px;
					}
					.level_name {
						margin: 0 auto;
						margin-top: 8px;
						font-family: PingFangSC-Medium;
						font-size: 16px;
						color: #FFFFFF;
						text-align: center;
						line-height: 22px;
					}
				}
			}
		}
	}
</style>
