define(function(require) {
	'use strict'
	require('js/dialog.js')
	require('js/avatar.js')
	const dialog = new Dialog()
	const vm = new Vue({
		el: 'body',
		data: {},
		methods: {

			upload() {
				dialog.custom('.dialog-1')
				Ar = new Avatar('.j-avatar-wrap', {
					vw: 300,
					cw: 150,
				})
			},
			saveAvatar: async() => {
				if(Ar.URL) {
					document.querySelector('.img').src = Ar.URL
					dialog.closeCustom()
				} else {
					dialog.alert('请上传一张图片')
				}
			},
		}
	})

})
