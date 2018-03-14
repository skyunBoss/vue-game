<template>
  <div id="app" :class="{portrait: portrait,landscape: landscape}">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
  	return {
  		portrait: false,
  		landscape: false
  	}
  },
  methods: {
	resize(){  //判断ios 竖屏还是横屏
		let _this = this
		if((window.screen.height - window.innerHeight) == 0){  //状态栏隐藏
			_this.portrait = true
		}
	  	window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize" , function() {
			if (window.orientation === 180 || window.orientation === 0) {  // 横屏
				_this.portrait = true
				_this.landscape = false
			}else{
				_this.landscape = true
			}
		},false)	
	}	
  },
  mounted(){ 
  	this.resize()
  }
}
</script>

<style lang="scss">

</style>
