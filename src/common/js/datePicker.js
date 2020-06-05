export default {
	data() {
		return {
			datePickerOptions: {
				disabledDate(date) {
					return date.getTime() > Date.now()
				}
			}
		}
	}
}