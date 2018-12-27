const Toast = {
  installed: false,
  install (Vue, duration = 2000) {
    if(Toast.installed) return
    Vue.prototype.$toast = (toast) => {

      // 如果页面有toast则不继续执行
      if(document.querySelector('.ui-toast-mask')) return
      // 1、创建构造器，定义好提示信息的模板
      let toastTpl = Vue.extend({
        template: `
       <div class="ui-toast-mask">
         <div class="ui-toast">
          <span>${toast}</span>
         </div>
       </div>  
       `
      })

      // 2、创建实例，挂载到文档以后的地方
      let tpl = new toastTpl().$mount().$el

      // 3、把创建的实例添加到body中
      document.body.appendChild(tpl)
      // 4.三秒后移除
      setTimeout(() => {
        document.body.removeChild(tpl)
      }, duration)

      Toast.installed = true
    }
  }
}

export default Toast
