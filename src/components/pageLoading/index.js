const pageLoading = {
  installed: false,
  install (Vue, options) {
    if(pageLoading.installed) return
    let opt = {
      // 默认持续时间
      duration: "3000"
    }
    // 使用options的配置
    for(let i in options) {
      opt[i] = options[i]
    }
    Vue.prototype.$showPageLoading = () => {

      // 如果页面有toast则不继续执行
      if(document.querySelector('.ui-pageLoading-mask')) return
      // 1、创建构造器，定义好提示信息的模板
      let toastTip = Vue.extend({
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
      let tpl = new toastTip().$mount().$el
      // 3、把创建的实例添加到body中
      document.body.appendChild(tpl)

      //阻止遮罩滑动
      tpl.addEventListener("touchmove", function(e) {
        e.stopPropagation()
        e.preventDefault()
      })

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
