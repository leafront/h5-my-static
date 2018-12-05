<template>
	<div class="pageView">
    <AppHeader :title="title"></AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
   	</div>
  </div> 	 	
</template>	

<script type="text/javascript">

	import AppHeader from '@/components/common/header'
	
	export default {
		data () {
			return {
				pageView: true,
				title: '我的积分'
			}
		},
		components: {
			AppHeader
		}
	}
</script>
