(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-432ecebd"],{a6d8:function(e,t,i){e.exports=i.p+"my-static/img/error.e54ce666.png"},bd00:function(e,t,i){},c584:function(e,t,i){"use strict";i.r(t);var a=[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"scroll-view-wrapper visibility"},[t("div",{staticClass:"svip_error"},[t("img",{attrs:{src:i("a6d8")}})])])}],s={data:function(){return{title:"页面找不到",isBorder:!0}},components:{AppHeader:i("d784").a}},r=(i("e645"),i("2877")),n=Object(r.a)(s,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"pageView"},[i("AppHeader",{attrs:{title:e.title,isBorder:e.isBorder}}),e._m(0)],1)},a,!1,null,null,null);n.options.__file="404.vue",t.default=n.exports},d784:function(e,t,i){"use strict";var a=i("327d"),s=i("6318"),r={props:{backFn:{default:null,type:Function},title:{default:"",type:String},isBorder:{default:!0,type:Boolean},isShowHeader:{default:!1,type:Boolean}},computed:{showHeader:function(){return s.a.isApp()?0==s.a.query("hideHead")&&s.a.getVersion()<5320:!s.a.weixin()&&!s.a.nativeQQ()&&(this.isShowHeader||!0)}},methods:{backAction:function(){this.backFn&&"function"==typeof this.backFn?this.backFn():s.a.isApp()?a.a.back():this.$router.back()}}},n=i("2877"),c=Object(n.a)(r,function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.showHeader?i("div",{staticClass:"ui-header",class:{"ui-header-border":e.isBorder}},[i("div",{staticClass:"ui-header-back",on:{click:e.backAction}},[i("div",{staticClass:"ui-header-back_btn"})]),i("h4",{staticClass:"ui-header-title"},[e._v(e._s(e.title))]),e._t("default")],2):e._e()},[],!1,null,null,null);c.options.__file="header.vue",t.a=c.exports},e645:function(e,t,i){"use strict";var a=i("bd00");i.n(a).a}}]);