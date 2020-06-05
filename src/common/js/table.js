export default {
	data() {
		return {
			form: {
				pageSize: 10,
				pageIndex: 1,
			},
			totalRow: 0
		}
	},
	methods: {
        handleChangePage(val) {
            this.form.pageIndex = val
            this.init()
        },
	}
}