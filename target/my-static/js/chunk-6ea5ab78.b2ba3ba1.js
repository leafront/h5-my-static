(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6ea5ab78"],{"061a":function(t,a,e){},"87d2":function(t,a,e){"use strict";var i=e("f637");e.n(i).a},9639:function(t,a,e){"use strict";e.r(a),e("ac6a");var i=e("6318"),s=e("371a"),n={data:function(){return{cartCount:0,index:-1}},methods:{pageAction:function(t){t!=location.pathname&&(location.href=t)},setFooterActive:function(){var t=["/index.html","/webapp/category","/view/h5/30.html","/cart.html","/my/index"].indexOf(location.pathname);-1<t&&(this.index=t)}},created:function(){var t=this,a={sessionId:i.a.getSessionId()};this.setFooterActive(),Object(s.a)("/api/cart/count",{type:"GET",data:a}).then(function(a){var e=a.data;0==a.code&&(t.cartCount=e)})}},o=(e("87d2"),e("2877")),c=Object(o.a)(n,function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"footer_wrapper",attrs:{id:"footer_wrapper"}},[e("div",{staticClass:"footer"},[e("div",{staticClass:"footer-item",class:{active:0==t.index},on:{click:function(a){t.pageAction("/index.html")}}},[e("i",{staticClass:"icon1"}),e("span",[t._v("首页")])]),e("div",{staticClass:"footer-item",class:{active:1==t.index},on:{click:function(a){t.pageAction("/webapp/category")}}},[e("i",{staticClass:"icon2"}),e("span",[t._v("分类")])]),e("div",{staticClass:"footer-item",class:{active:2==t.index},on:{click:function(a){t.pageAction("/view/h5/30.html")}}},[e("i",{staticClass:"icon3"}),e("span",[t._v("全球尖货")])]),e("div",{staticClass:"footer-item",class:{active:3==t.index},on:{click:function(a){t.pageAction("/cart.html")}}},[e("i",{staticClass:"icon4"}),e("span",[t._v("购物车")]),0<t.cartCount?e("strong",[t._v(t._s(t.cartCount))]):t._e()]),e("div",{staticClass:"footer-item",class:{active:4==t.index},on:{click:function(a){t.pageAction("/my/index")}}},[e("i",{staticClass:"icon5"}),e("span",[t._v("我")])])]),e("div",{staticClass:"safe-area-inset"}),e("div",{staticClass:"safe-area-inset"})])},[],!1,null,null,null);c.options.__file="footer.vue";var r=c.exports,l=e("f121"),d=e("1313"),m={data:function(){return{title:"我的",pageView:!0,loggedIn:i.a.loggedIn(),userInfo:{},walletInfo:{},yCardBalanceState:!1,yesterdayRecharge:0,orderSummaryState:{},kfConfig:{},readyMessage:!1,readyCount:0,serviceStatus:-1,uid:"",crmInfo:[],personalItem:[]}},components:{AppFooter:r},methods:{pageAction:function(t){location.href=t},routerAction:function(t){this.$router.push(t)},personalAction:function(t,a){t&&(location.href=t),"lyf://callcustomservice"==a&&this._openCustom()},goOneWord:function(){if(this.loggedIn){var t=i.a.getUserToken(),a=window.encodeURIComponent(location.origin);location.href=l.a.redPacket+"/wap/wordgetcoupon.html?session=".concat(t,"&source=").concat(a)}else location.href="/login.html?from=/my/home.html"},getUserInfo:function(){var t,a=this;(t={type:"GET",ignoreLogin:!0},Object(s.a)("/api/my/user/info",t)).then(function(t){var e=t.data||{};0==t.code&&e?(d.a.set("kf_head_pic",e.url100x100,"session"),e.headPicUrl=e.headPicUrl||l.a.staticPath+"/webapp-static/images/logo-laiyifen.png"):e.headPicUrl=l.a.staticPath+"/webapp-static/images/logo-laiyifen.png",a.userInfo=e})},getYesterday:function(t){var a=new Date,e=a.getFullYear();a.setDate(a.getDate()+t);var i=a.getMonth()+1,s=a.getDate();return i<10&&(i="0"+i),s<10&&(s="0"+s),e+"-"+i+"-"+s},getWalletInfo:function(){var t,a=this;(t={type:"GET",ignoreLogin:!0,data:{isECard:1,isYCard:1,isBean:1,isCoupon:1,isPoint:1}},Object(s.a)("/api/my/wallet/summary",t)).then(function(t){var e=t.data;0==t.code&&e&&null!==(a.walletInfo=e).yCardBalance&&(a.yCardBalanceState=!0)})},getPersonalItem:function(){var t,a=this;(t={type:"GET"},Object(s.a)("/ouser-web/personalCenter/queryMy.do",t)).then(function(t){var e=t.data;0==t.code&&e&&e[0]&&e[0].moduleList.length&&(a.personalItem=e[0].moduleList)})},getUserRecharge:function(){var t,a=this;(t={type:"GET",ignoreLogin:!0,data:{startDate:this.getYesterday(-1),endDate:this.getYesterday(-1)}},Object(s.a)("/back-finance-web/api/commission/queryPreCommissionAmount.do",t)).then(function(t){var e=t.data;0==t.code&&e&&(a.yesterdayRecharge=e.preCommissionAmount)})},orderSummary:function(){var t,a=this;(t={type:"GET",ignoreLogin:!0,data:{sysSource:"ody"}},Object(s.a)("/api/my/order/summary",t)).then(function(t){var e=t.data;0==t.code&&e&&(a.orderSummaryState=e)})},getMessageInfo:function(){var t,a=this;(t={type:"GET",ignoreLogin:!0,data:{status:0}},Object(s.a)("/api/social/vl/message/getMsgSummary",t)).then(function(t){var e=t.data;if(0==t.code&&e){a.readyMessage=!0;var i=e[0].unReadMsgCount;e&&0<e.length&&0<i&&(a.readyCount+=i)}})},goCustomService:function(){if(i.a.weixin())this.$showModal({content:"请点击右上角菜单选择“在浏览器打开",confirmText:"知道了"});else{var t=d.a.get("username","local");if(!this.loggedIn||!t){var a=window.encodeURIComponent(i.a.getRelatedUrl());return void(location.href="/login.html?from=".concat(a))}this._getServiceStatus()}},_getServiceStatus:function(){var t,a=this;"0"==this.serviceStatus||"1"==this.serviceStatus?this._openService():(t={type:"GET",data:{token:i.a.getUserToken(),terminal:"H5"}},Object(s.a)("/im/appModule",t)).then(function(t){var e=t.data;e&&0!==e.length&&(e.forEach(function(t){"2"==t.type&&(a.serviceStatus=t.status)}),a._openService())})},_openService:function(){var t=this;"1"==this.serviceStatus?this.uid?this._openCustom():this._getUid().then(function(){t._openCustom()}):this._openTaoBaoIm()},_getUid:function(){var t,a=this,e="";return i.a.isApp()&&(e=i.a.getUaParams().version||""),(t={type:"POST",data:{appVersion:e}},Object(s.a)("/customer/user/getInfo.do",t)).then(function(t){var e=t.data;if(e){var i=e.uid;a.uid=i||"",a.crmInfo=e.data||""}})},_openCustom:function(){var t=this,a=l.a.QYKeFuKey,e=document.createElement("script");e.type="text/javascript",e.src="https://qiyukf.com/script/".concat(a,".js"),document.getElementsByTagName("head")[0].appendChild(e),e.onload=function(){window.ysf&&window.ysf.config({uid:t.uid,data:JSON.stringify(t.crmInfo),success:function(){window.ysf.open()},error:function(a){t.$toast("连接中，请稍后再试...")}})}},getBaichuanConfig:function(){var t,a=this,e=d.a.get("username","local");return(t={type:"GET",data:{userId:e}},Object(s.a)("/search-backend-web/getTaoBaoOpenIM.json",t)).then(function(t){var e=t.data;if(0==t.code&&e){var i=e.appKey,s=e.password,n=e.receiveId;e&&i&&s&&n&&(a.kfConfig={appKey:i,password:s,receiveId:n})}return t})},_openTaoBaoIm:function(){var t=this.kfConfig,a=t.appKey,e=t.password,i=t.receiveId;a?location.href="/kf.html?ak=".concat(a,"&pwd=").concat(e,"&rid=").concat(i):this.getBaichuanConfig().then(function(){location.href="/kf.html?ak=".concat(a,"&pwd=").concat(e,"&rid=").concat(i)})}},created:function(){this.getUserInfo(),this.getWalletInfo(),this.orderSummary(),this.getPersonalItem(),this.loggedIn&&this.getMessageInfo()}},u=(e("dde3"),Object(o.a)(m,function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"pageView"},[i("div",{staticClass:"scroll-view-wrapper",class:{visibility:t.pageView}},[i("div",{staticClass:"my-index-info"},[i("div",{staticClass:"my-index-title"},[i("div",{staticClass:"my_signIn_icon",on:{click:function(a){t.pageAction("/community/my-signIn.html")}}},[i("i")]),i("div",{staticClass:"my-wrapper-icon"},[i("div",{staticClass:"my_message_icon",on:{click:function(a){t.pageAction("/message/message-center.html")}}},[i("i"),t.readyMessage&&t.readyCount?i("span",{staticClass:"my-message-tips",class:{active:9<t.readyCount}},[t._v(t._s(99<t.readyCount?"99+":t.readyCount))]):t._e()]),i("div",{staticClass:"my_setting_icon",on:{click:function(a){t.routerAction("/my/setting")}}},[i("i")])])]),i("div",{staticClass:"my-index-personal"},[i("div",{staticClass:"my-vip-txt"},[i("p",[t._v(t._s(t.loggedIn?t.userInfo.userLevlName:"- -"))]),i("span",[t._v("会员等级")])]),i("img",{staticClass:"my-vip-pic",attrs:{src:t.userInfo.headPicUrl},on:{click:function(a){t.routerAction("/my/personal")}}}),i("div",{staticClass:"my-vip-txt",on:{click:function(a){t.routerAction("/my/yidou")}}},[t.loggedIn?i("p",[t._v(t._s(t.walletInfo.yBean||0))]):i("p",[t._v("- -")]),i("span",[t._v("伊豆")])])]),i("div",{staticClass:"my-index-name"},[t.loggedIn?i("p",{staticClass:"font-b cfff"},[t._v(t._s(t.userInfo.nickname))]):i("div",{staticClass:"my-index-action cfff font"},[i("span",{staticClass:"my-index-login",on:{click:function(a){t.pageAction("/login.html?from=/my/index")}}},[t._v("登录")]),i("i",[t._v("/")]),i("span",{staticClass:"my-index-reg",on:{click:function(a){t.pageAction("/regis.html?from=/my/index")}}},[t._v("注册")])]),i("div",{staticClass:"my-index-qrcode",on:{click:function(a){t.pageAction("/my/coupons-usercode.html")}}},[i("i"),i("span",{staticClass:"cfff"},[t._v("会员码")])])])]),i("div",{staticClass:"my-index-money-bg",on:{click:function(a){t.pageAction("/activity/make/money")}}},[i("img",{attrs:{src:e("d229")}})]),i("div",{staticClass:"my-index-money",on:{click:function(a){t.pageAction("/placeChannel/index.html")}}},[i("div",{staticClass:"my-index-money-wrapper"},[t._m(0),i("div",{staticClass:"my-index-money-txt"},[i("p",[t._v("昨日成交预估金额")]),i("span",{staticClass:"ff6900"},[t._v("￥"+t._s(t._f("price")(t.yesterdayRecharge)))])]),i("div",{staticClass:"ui-right-arrow"})])]),i("div",{staticClass:"my-finance"},[i("div",{staticClass:"my-finance-item",on:{click:function(a){t.pageAction("/my/my-income.html")}}},[i("i",{staticClass:"icon1"}),i("span",[t._v("我的收入")])]),i("div",{staticClass:"my-finance-item",on:{click:function(a){t.pageAction("/my/report-center.html")}}},[i("i",{staticClass:"icon2"}),i("span",{staticClass:"c3"},[t._v("报表中心")])])]),i("div",{staticClass:"my-index-menu",on:{click:function(a){t.pageAction("/my/my-order.html")}}},[t._m(1)]),i("div",{staticClass:"my-index-order"},[i("div",{staticClass:"my-index-order-item",on:{click:function(a){t.pageAction("/my/my-order.html?t=1")}}},[i("i",{staticClass:"icon1"}),i("span",{staticClass:"c3"},[t._v("待付款")]),0!=t.orderSummaryState.unpay&&null!=t.orderSummaryState.unpay?i("strong",{staticClass:"my-index-tips",class:{active:9<t.orderSummaryState.unpay}},[t._v(t._s(99<t.orderSummaryState.unpay?"99+":t.orderSummaryState.unpay))]):t._e()]),i("div",{staticClass:"my-index-order-item",on:{click:function(a){t.pageAction("/my/my-order.html?t=2")}}},[i("i",{staticClass:"icon2"}),i("span",{staticClass:"c3"},[t._v("待发货")]),0!=t.orderSummaryState.undelivery&&null!=t.orderSummaryState.undelivery?i("strong",{staticClass:"my-index-tips",class:{active:9<t.orderSummaryState.undelivery}},[t._v(t._s(99<t.orderSummaryState.undelivery?"99+":t.orderSummaryState.undelivery))]):t._e()]),i("div",{staticClass:"my-index-order-item",on:{click:function(a){t.pageAction("/my/my-order.html?t=3")}}},[i("i",{staticClass:"icon3"}),i("span",{staticClass:"c3"},[t._v("待收货")]),0!=t.orderSummaryState.unreceive&&null!=t.orderSummaryState.unreceive?i("strong",{staticClass:"my-index-tips",class:{active:9<t.orderSummaryState.unreceive}},[t._v(t._s(99<t.orderSummaryState.unreceive?"99+":t.orderSummaryState.unreceive))]):t._e()]),i("div",{staticClass:"my-index-order-item",on:{click:function(a){t.pageAction("/my/my-order.html?t=4")}}},[i("i",{staticClass:"icon4"}),i("span",{staticClass:"c3"},[t._v("待评价")]),0!=t.orderSummaryState.unEvaluate&&null!=t.orderSummaryState.unEvaluate?i("strong",{staticClass:"my-index-tips",class:{active:9<t.orderSummaryState.unEvaluate}},[t._v(t._s(99<t.orderSummaryState.unEvaluate?"99+":t.orderSummaryState.unEvaluate))]):t._e()]),i("div",{staticClass:"my-index-order-item",on:{click:function(a){t.pageAction("/my/aftersale-list.html")}}},[i("i",{staticClass:"icon5"}),i("span",{staticClass:"c3"},[t._v("退换货")]),0!=t.orderSummaryState.isAfter&&null!=t.orderSummaryState.isAfter?i("strong",{staticClass:"my-index-tips",class:{active:9<t.orderSummaryState.isAfter}},[t._v(t._s(99<t.orderSummaryState.isAfter?"99+":t.orderSummaryState.isAfter))]):t._e()])]),i("div",{staticClass:"my-index-menu",on:{click:function(a){t.routerAction("/my/wallet")}}},[t._m(2)]),i("div",{staticClass:"my-index-discount"},[t.yCardBalanceState?i("div",{staticClass:"my-index-discount-item",on:{click:function(a){t.pageAction("/pay/youdianCard.html")}}},[t.loggedIn?i("span",{staticClass:"ff6900"},[t._v(t._s(t._f("price")(t.walletInfo.yCardBalance||0)))]):i("span",{staticClass:"ff6900"},[t._v("- -")]),i("p",{staticClass:"c3"},[t._v("悠点卡")])]):t._e(),i("div",{staticClass:"my-index-discount-item",on:{click:function(a){t.pageAction("/my/pointCards-list.html")}}},[t.loggedIn?i("span",{staticClass:"ff6900"},[t._v(t._s(t._f("price")(t.walletInfo.eCardBalance||0)))]):i("span",{staticClass:"ff6900"},[t._v("- -")]),i("p",{staticClass:"c3"},[t._v("伊点卡")])]),i("div",{staticClass:"my-index-discount-item",on:{click:function(a){t.routerAction("/my/integral")}}},[t.loggedIn?i("span",{staticClass:"ff6900"},[t._v(t._s(t._f("price")(t.walletInfo.point||0)))]):i("span",{staticClass:"ff6900"},[t._v("- -")]),i("p",{staticClass:"c3"},[t._v("积分")])]),i("div",{staticClass:"my-index-discount-item",on:{click:function(a){t.pageAction("/my/coupons-list.html")}}},[t.loggedIn?i("span",{staticClass:"ff6900"},[t._v(t._s(t.walletInfo.coupon||0))]):i("span",{staticClass:"ff6900"},[t._v("- -")]),i("p",{staticClass:"c3"},[t._v("优惠券")])])]),t.personalItem.length?i("div",{staticClass:"my-index-column clearfix"},t._l(t.personalItem,function(a){return i("div",{key:a.id,staticClass:"my-index-column-item",on:{click:function(e){t.personalAction(a.linkUrlH5,a.linkUrlIos)}}},[i("img",{attrs:{src:a.logoUrl}}),i("span",[t._v(t._s(a.name))])])}),0):t._e()]),i("AppFooter")],1)},[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"my-index-money-icon"},[a("i"),a("p",{staticClass:"c000 font-xb"},[this._v("伊起赚")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"my-index-menu-wrapper"},[a("i",{staticClass:"order-icon"}),a("p",{staticClass:"c000 font-xb"},[this._v("我的订单")]),a("span",{staticClass:"font-s"},[this._v("全部订单")]),a("div",{staticClass:"ui-right-arrow"})])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"my-index-menu-wrapper"},[a("i",{staticClass:"money-icon"}),a("p",{staticClass:"c000 font-xb"},[this._v("我的钱包")]),a("span",{staticClass:"font-s"},[this._v("查看全部")]),a("div",{staticClass:"ui-right-arrow"})])}],!1,null,null,null));u.options.__file="index.vue",a.default=u.exports},d229:function(t,a,e){t.exports=e.p+"my-static/img/sales.31600184.gif"},dde3:function(t,a,e){"use strict";var i=e("061a");e.n(i).a},f637:function(t,a,e){}}]);