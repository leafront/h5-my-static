
import utils from '@/widget/utils'

const pageLoading = {
  installed: false,
  install (Vue) {
    if(pageLoading.installed) return
    Vue.prototype.$showPageLoading = () => {

      // 如果页面有pageLoading则不继续执行
      if(document.querySelector('.ui-pageLoading-mask')) return
      // 1、创建构造器，定义好提示信息的模板
      let pageLoadingTpl = Vue.extend({
        template: `
			<div class="ui-pageLoading-mask">
			 <div class="ui-mask-cont">
         <i class="pageLoading-icon">
          </i>
          <p>努力加载中...</p>
			 </div>   
			 </div>
			`
      })
      // 2、创建实例，挂载到文档以后的地方
      let tpl = new pageLoadingTpl().$mount().$el
      // 3、把创建的实例添加到body中
      document.body.appendChild(tpl)

      tpl.addEventListener('touchmove', function(e) {
        if (!utils.isPassive()) {
          e.preventDefault()
        }
        e.stopPropagation()
      },utils.isPassive() ? {passive: true} : false)

      pageLoading.installed = true

    }

    Vue.prototype.$hidePageLoading = () => {

      const maskUi = document.querySelector('.ui-pageLoading-mask')

      if (maskUi) {
        maskUi.parentNode.removeChild(maskUi)
      }
    }
  }
}

export default pageLoading
