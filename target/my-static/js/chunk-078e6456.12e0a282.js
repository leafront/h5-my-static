(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-078e6456"],{"2d1a":function(e,t,a){},"3f04":function(e,t,a){"use strict";a.r(t);var i={data:function(){return{title:"伊豆规则",pageView:!0}},components:{AppHeader:a("d784").a}},s=(a("fd96"),a("2877")),n=Object(s.a)(i,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pageView"},[a("AppHeader",{attrs:{title:e.title}}),a("div",{staticClass:"scroll-view-wrapper",class:{visibility:e.pageView}},[e._m(0)])],1)},[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"my-yidou-rule"},[a("h4",{staticClass:"font"},[e._v("一、什么是伊豆？")]),a("p",[e._v("1.伊豆是仅限在来伊份APP使用，可用于APP内活动参与、社区互动、兑换等。")]),a("p",[e._v("2.伊豆可在“我的”中查看伊豆数量及伊豆明细。")]),a("p",[e._v("3.用户未使用的伊豆，来伊份将在后年的1月1日清零。例如2018年1月1日清零2016年1月1日至2016年12月31日的所有伊豆。")]),a("p",[e._v("4.来伊份积分可以按一定比例兑换成伊豆。")]),a("h4",[e._v("二、伊豆如何获得？")]),a("p",[e._v("1.用户成功注册来伊份APP均可获得伊豆。")]),a("p",[e._v("2.用户登录来伊份APP签到可以获得伊豆。")]),a("p",[e._v("3.用户分享来伊份APP商品、活动等行为可以获得伊豆。")]),a("p",[e._v("4.用户完成订单好评并晒图可以获得伊豆。")]),a("p",[e._v("5.用户在来伊份App社区内进行互动可以获得伊豆，比如评论、点赞、分享、关注、发布等。")]),a("p",[e._v("6.每天伊豆发放数量有限，送完为止。")]),a("h4",[e._v("三、伊豆如何使用？")]),a("p",[e._v("1.伊豆可以在APP内参与抽奖等活动时使用。")]),a("p",[e._v("2.伊豆可以用于兑换优惠券，按券额进行相应消耗。")]),a("p",[e._v("3.来伊份APP社区内用户之间的打赏可以使用伊豆。")]),a("p",[e._v("4.来伊份APP其他线上活动时可以使用伊豆。")]),a("p",[e._v("5.伊豆的使用数量视不同活动或互动行为情况而定。")]),a("h4",[e._v("四、其他说明")]),a("p",[e._v("伊豆规则最终解释权归来伊份所有。")])])}],!1,null,null,null);n.options.__file="rule.vue",t.default=n.exports},d784:function(e,t,a){"use strict";var i=a("327d"),s=a("6318"),n={props:{backFn:{default:null,type:Function},title:{default:"",type:String},isBorder:{default:!0,type:Boolean},isShowHeader:{default:!1,type:Boolean}},computed:{showHeader:function(){return s.a.isApp()?0==s.a.query("hideHead")&&s.a.getVersion()<5320:!s.a.weixin()&&!s.a.nativeQQ()&&(this.isShowHeader||!0)}},methods:{backAction:function(){this.backFn&&"function"==typeof this.backFn?this.backFn():s.a.isApp()?i.a.back():this.$router.back()}}},r=a("2877"),c=Object(r.a)(n,function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.showHeader?a("div",{staticClass:"ui-header",class:{"ui-header-border":e.isBorder}},[a("div",{staticClass:"ui-header-back",on:{click:e.backAction}},[a("div",{staticClass:"ui-header-back_btn"})]),a("h4",{staticClass:"ui-header-title"},[e._v(e._s(e.title))]),e._t("default")],2):e._e()},[],!1,null,null,null);c.options.__file="header.vue",t.a=c.exports},fd96:function(e,t,a){"use strict";var i=a("2d1a");a.n(i).a}}]);