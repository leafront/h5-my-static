(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-52a8f738"],{"0fb9":function(t,i,e){"use strict";var a=e("2c59");e.n(a).a},"1bac":function(t,i,e){"use strict";var a={props:{showLoading:{type:Boolean,default:!1}}},n=(e("9297"),e("2877")),s=Object(n.a)(a,function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{directives:[{name:"show",rawName:"v-show",value:t.showLoading,expression:"showLoading"}],staticClass:"pageLoading"},[e("div",{staticClass:"ui-showPageLoading-gif"})])},[],!1,null,null,null);s.options.__file="pageLoading.vue",i.a=s.exports},"2c59":function(t,i,e){},"6d2b":function(t,i,e){"use strict";var a=e("94e9");e.n(a).a},8218:function(t,i,e){"use strict";e.r(i);var a=e("d784"),n=e("6318"),s=(e("cec2"),e("1bac")),o=e("fbcb"),c=e("c626"),r={data:function(){return{pageView:!1,title:"我的积分",list:[],pointStatus:0,navList:["全部","收入","支出"],amountBalance:0,currentPage:1,showLoading:!1,isScrollLoad:!1,totalPage:0,timer:null}},components:{AppHeader:a.a,PageLoading:s.a,UIEmpty:c.a},methods:{pageAction:function(t){this.$router.push(t)},selectNav:function(t){this.pointStatus!=t&&(this.pointStatus=t,this.currentPage=1,this.getPointList())},getPointList:function(t){var i=this,e=this.pointStatus,a=this.currentPage;o.a({type:"POST",data:{pageNo:1,pageSize:10,accountType:2,pointStatus:e}}).then(function(e){i.$hideLoading();var n=e.data;0==e.code&&n?(i.pageView=!0,i.totalPage=n.totalPage,1<a&&setTimeout(function(){i.showLoading=!1,i.isScrollLoad=!1},1e3),i.list=1==t?i.list.concat(n.data||[]):n.data||[]):(1<a&&setTimeout(function(){i.isScrollLoad=!1},1e3),i.$toast(e.message))})},getPointNumber:function(){var t=this;o.b({type:"POST",data:{accountType:2}}).then(function(i){var e=i.data;0==i.code&&e?t.amountBalance=e.amountBalance:t.$toast(i.message)})},scrollLoadList:function(){var t=this,i=window.innerHeight,e=document.documentElement.scrollTop||document.body.scrollTop,a=document.documentElement.offsetHeight;this.isScrollLoad||(this.isScrollLoad=!0,this.timer=requestAnimationFrame(function(){a<=i+e&&t.list.length<t.totalPage&&(t.showLoading=!0,t.currentPage+=1,t.getPointList(1)),t.isScrollLoad=!1}))}},created:function(){this.$showLoading(),this.getPointList(),this.getPointNumber(),window.addEventListener("touchmove",this.scrollLoadList,!!n.a.isPassive()&&{passive:!0})},beforeDestroy:function(){cancelAnimationFrame(this.timer),window.removeEventListener("touchmove",this.scrollLoadList,!!n.a.isPassive()&&{passive:!0})}},u=(e("6d2b"),e("2877")),l=Object(u.a)(r,function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"pageView"},[e("AppHeader",{attrs:{title:t.title}},[e("div",{staticClass:"ui-header-right",on:{click:function(i){t.pageAction("/my/yidou/rule")}}},[e("span",[t._v("伊豆规则")])])]),e("div",{staticClass:"scroll-view-wrapper",class:{visibility:t.pageView}},[e("div",{staticClass:"my_yidou_header"},[e("i",{staticClass:"icon"}),e("div",{staticClass:"my_yidou_number"},[e("span",[t._v("当前伊豆数")]),t.amountBalance?e("p",[t._v(t._s(t.amountBalance)),e("span",{staticClass:"font-xs"},[t._v("个")])]):t._e()])]),t._m(0),e("div",{staticClass:"my_yidou_nav font ui-bottom-line"},t._l(t.navList,function(i,a){return e("div",{key:a,staticClass:"my_yidou_nav_item",on:{click:function(i){t.selectNav(a)}}},[e("span",{class:{active:t.pointStatus==a}},[t._v(t._s(i))])])}),0),e("div",{staticClass:"my_yidou_list"},t._l(t.list,function(i){return e("div",{key:i.createTime,staticClass:"my_yidou_item"},[e("div",{staticClass:"my_yidou_info"},[e("span",{staticClass:"font c3"},[t._v(t._s(i.actionTypeName))]),e("strong",{staticClass:"c3"},[t._v(t._s(i.createTimeStr))])]),e("div",{staticClass:"my_yidou_txt"},[1==i.actionType?e("span",{staticClass:"font"},[t._v("+")]):t._e(),2==i.actionType?e("span",{staticClass:"font"},[t._v("-")]):t._e(),e("strong",{staticClass:"font-xb c3"},[t._v(t._s(i.balance))])])])}),0),e("PageLoading",{attrs:{showLoading:t.showLoading}}),e("div",{directives:[{name:"show",rawName:"v-show",value:t.pageView&&!t.list.length,expression:"pageView && !list.length"}],staticClass:"yidou-empty"},[e("UIEmpty")],1)],1)],1)},[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"my_yidou_title"},[i("p",{staticClass:"font"},[this._v("伊豆明细")])])}],!1,null,null,null);l.options.__file="index.vue",i.default=l.exports},9297:function(t,i,e){"use strict";var a=e("e878");e.n(a).a},"94e9":function(t,i,e){},c626:function(t,i,e){"use strict";var a=e("f121"),n={props:{pic:{type:String,default:a.a.staticPath+"/webapp-static/images/ui-empty-basic.png"},content:{type:String,default:"暂时没有任何数据呢"}}},s=(e("0fb9"),e("2877")),o=Object(s.a)(n,function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"ui-empty"},[e("img",{staticClass:"ui-empty-pic",attrs:{src:t.pic}}),e("p",{staticClass:"c9"},[t._v(t._s(t.content))])])},[],!1,null,null,null);o.options.__file="ui-empty.vue",i.a=o.exports},cec2:function(t,i){!function(){for(var t=0,i=["webkit","moz"],e=0;e<i.length&&!window.requestAnimationFrame;++e)window.requestAnimationFrame=window[i[e]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[i[e]+"CancelAnimationFrame"]||window[i[e]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(i){var e=(new Date).getTime(),a=Math.max(0,16.7-(e-t)),n=window.setTimeout(function(){i(e+a)},a);return t=e+a,n}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}()},d784:function(t,i,e){"use strict";var a=e("327d"),n=e("6318"),s={props:{backFn:{default:null,type:Function},title:{default:"",type:String},isBorder:{default:!0,type:Boolean},isShowHeader:{default:!1,type:Boolean}},computed:{showHeader:function(){return n.a.isApp()?0==n.a.query("hideHead")&&n.a.getVersion()<5320:!n.a.weixin()&&!n.a.nativeQQ()&&(this.isShowHeader||!0)}},methods:{backAction:function(){this.backFn&&"function"==typeof this.backFn?this.backFn():n.a.isApp()?a.a.back():this.$router.back()}}},o=e("2877"),c=Object(o.a)(s,function(){var t=this,i=t.$createElement,e=t._self._c||i;return t.showHeader?e("div",{staticClass:"ui-header",class:{"ui-header-border":t.isBorder}},[e("div",{staticClass:"ui-header-back",on:{click:t.backAction}},[e("div",{staticClass:"ui-header-back_btn"})]),e("h4",{staticClass:"ui-header-title"},[t._v(t._s(t.title))]),t._t("default")],2):t._e()},[],!1,null,null,null);c.options.__file="header.vue",i.a=c.exports},e878:function(t,i,e){},fbcb:function(t,i,e){"use strict";e.d(i,"a",function(){return n}),e.d(i,"b",function(){return s});var a=e("371a"),n=function(t){return Object(a.a)("/api/my/point/list",t)},s=function(t){return Object(a.a)("/api/my/point/account",t)}}}]);