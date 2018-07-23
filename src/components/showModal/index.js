
const ShowModal = {
  installed: false,
  install (Vue,options) {
    if(ShowModal.installed) return
    Vue.prototype.$showModal = (options) => {

      // 如果页面有toast则不继续执行
      if(document.querySelector('.dialog-container')) return
      // 1、创建构造器，定义好提示信息的模板
      const cancelText = options.cancelText || '取消'
      const confirmText = options.confirmText || '确定'
      const toast = options.showCancel == false ? 'none' : 'block'

      let toastTip = Vue.extend({
        template: `
				<div class="ui-dialog">
					<div class="ui-dialog-mask"></div>
					<div class="ui-dialog-container">
						<div class="ui-dialog__bd" id = "dialog-content">${options.content}</div>
						<div class="ui-dialog__ft">
							<span id = "ui-dialog-cancel" style="display:${toast}" class="ui-dialog__btn ui-dialog__btn_default">${cancelText}</span>
							<span id = "ui-dialog-confirm" class="ui-dialog__btn">${confirmText}</span>
						</div>
					</div>
				</div>`
      })

      // 2、创建实例，挂载到文档以后的地方
      let tpl = new toastTip().$mount().$el

      // 3、把创建的实例添加到body中

      const bodyElement = document.body
      bodyElement.appendChild(tpl)

      document.getElementById('ui-dialog-cancel').addEventListener('click',() => {

        bodyElement.removeChild(tpl)

        options.cancel && options.cancel()

      })

      document.getElementById('ui-dialog-confirm').addEventListener('click', () => {

        bodyElement.removeChild(tpl)

        options.success && options.success()

      })

      ShowModal.installed = true
    }
  }
}

export default ShowModal
