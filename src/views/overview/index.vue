<template>
	<div class="content" id="mapDiv_box">
		<header-title></header-title>
		<router-view />
	</div>
</template>

<script>
	import HeaderTitle from './components/header'
	export default {
		name: '',
		data() {
			return {
				
			}
		},
		components: {
			HeaderTitle
		},
		watch: {

		},
		computed: {

		},
		methods: {

		},
		created() {
			
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: calc(100% - 98px);
	}
</style>