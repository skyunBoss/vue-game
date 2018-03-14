<template>
	<div class="bg">
		<mt-header fixed title="猜图识单词"></mt-header>
		<div class="num">第 {{index}} 题</div>
		<!-- <div :class="['music', {'stopped': !isPlaying}]" @click="play">
			<audio src="/static/audios/audio.mp3" loop autoplay id="audio"></audio>
			<div class="control">
				<div class="control-after"></div>
			</div>
		</div> -->		
		<div class="content">
			<div class="title">
				<span>{{exerciseList.length !== 0 ? exerciseList[index-1].cName : ''}}</span>
				<img :src="exerciseList.length !== 0 ? exerciseList[index-1].imgUrl : ''">
			</div>
			<span class="prompt" @click="prompt"></span>
			<ul class="result">
				<li v-for="(val,index) in splictName" @click="cannel(val, index)">{{val}}</li>
				<li class="reload" @click="reload"></li>
			</ul>
			<ul>
				<li v-for="(val,index) in result" @click="toggle(val.name,index)" :class="!val.show ? 'animated fadeOut' : 'animated fadeIn'">{{val.name}}</li>
			</ul>
			<audio src="/static/audios/success.mp3" id="success"></audio>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui' 
	export default {
		data(){
			return {
				result: [],
				exerciseList: [],
				index: 1,
				splictName: [],
				count: 15,
				cannel_index: '',
				duration: 2000,
				prompt_num: 0,
				isPlaying: false, 
				toast: {
					error: '答错了，再接再厉',
					missError: '悄悄告诉你，不知道可以提示的哦',
					success: '恭喜您，答对了,奖励1个时间币',
					all: '恭喜您，全部答对,本轮游戏共获得20个时间币',
					none: '请选择答案',
					moreNum: '你提示的次数太多了，发挥你的大脑想象吧'
				}
			}
		},
		methods: {
			toggle(letter, index){	
				let _this = this,
					eName = _this.exerciseList[_this.index-1].eName,
					successAudio = document.getElementById('success')
				for(let i=0;i<_this.splictName.length;i++){
					if(_this.splictName[i] == '' && _this.result[index].show){
						if(!_this.cannel_index){
							_this.splictName.splice(i, 1, letter)  //splice
						}else{
							_this.splictName.splice(_this.cannel_index, 1, letter)  //splice
							_this.cannel_index = ''							
						}
						for(let j=0;j<_this.result.length;j++){  // hide
							if(j == index){
								_this.result[j].show = false
							}
						}
						if(i == _this.splictName.length-1 || _this.splictName.join("").length == eName.length){  // todo
							if(eName !== _this.splictName.join("")){ // error
								Toast({
								  message: _this.toast.error,
								  position: 'bottom',
								  duration: _this.duration
								})							
							}else{  // success
								Toast({
								  message: _this.toast.success,
								  position: 'bottom',
								  duration: _this.duration
								})
								successAudio.play() //music
								_this.changeExercise()  //切换题目
							}
						}
						break
					}
				}
			},
			prompt(){  //提示
				let _this = this,
					eName = _this.exerciseList[_this.index-1].eName
				if(_this.prompt_num < 2){
					for(let i=0;i<_this.splictName.length;i++){
						if(_this.splictName[i] == ''){
							if(!_this.cannel_index){
								_this.splictName.splice(i, 1, eName.split("")[i])  //splice
							}else{
								_this.splictName.splice(_this.cannel_index, 1, eName.split("")[i])  //splice
								_this.cannel_index = ''							
							}
							for(let j=0;j<_this.result.length;j++){  // hide
								if(_this.result[i].name == eName.split("")[i] && (eName.split(eName.split("")[i])).length-1 <= 1){
									_this.result[i].show = false
								}
							}
							if(i == _this.splictName.length-1){  // todo
								if(eName !== _this.splictName.join("")){ // error
									Toast({
									  message: _this.toast.error,
									  position: 'bottom',
									  duration: _this.duration
									})							
								}else{  // success
									Toast({
									  message: _this.toast.success,
									  position: 'bottom',
									  duration: _this.duration
									})
									_this.changeExercise()  //切换题目
								}
							}
							break
						}
					}
					_this.prompt_num += 1
				}else{
					Toast({
					  message: _this.toast.moreNum,
					  position: 'bottom'
					})	
				}
			},
			changeExercise(){  //换题目
				if(this.index <= this.exerciseList.length){
					this.index += 1
					this.reload()
				}else{
					Toast({
					  message: this.toast.all,
					  position: 'bottom'
					})	
				}
			},
			cannel(name, index){  //取消
				let _this = this
				for(let i=0;i<_this.result.length;i++){
					if(name == _this.result[i].name){
						_this.result[i].show = true
					}
				}
				_this.splictName.splice(index, 1, '')
				_this.cannel_index = index
			},
			reload(){  //刷新
				let _this = this
				// result update format
				_this.change()
				_this.prompt_num = 0
				_this.splictName = _this.exerciseList[_this.index-1].eName.split("").map(() => {
					return ''
				})
			},
			change(){  //变换答题区
				let _this = this,
					count = _this.count,
					eName = _this.exerciseList[_this.index-1].eName,
					eName_arr = eName.split(""),
					result = ['a','f','z','h','y','b','g','d','w','j','v','l','m','t','o','p','q','r','s','n','u','k','i','x','e','c'],
					completeArr = ['s','b','m','e','g']
				 for(let i=0;i<eName_arr.length;i++){
			 		for(let j=0;j<result.length;j++){
			 			if(eName_arr[i] == result[j]){
			 				result.splice(j, 1)
			 			}
			 		}
				 }
				 result = (result.length < (count-eName_arr.length)) ? result.concat(eName_arr, completeArr.splice(1, count-parseInt(eName_arr.length+result.length))) : result.splice(parseInt(eName_arr.length+result.length)-count, result.length).concat(eName_arr) 
				 // sort arrays
				 result.sort(() => {
				 	return 0.5 - Math.random()
				 })
				// result update format
				_this.result = result.map(item => {
					return {
						name: item,
						show: true
					}
				})
			},
			play(){
		        let _this = this,
		        	audio = document.getElementById('success')
		        if(!_this.isPlaying){
		            audio.play()
		            _this.isPlaying = true
		        }else{
		        	audio.pause()
		        	_this.isPlaying = false
		        }
		    }
		},
		mounted(){
			let _this = this
			_this.$axios.get('/exercise/list').then(res => {
				_this.splictName = res.data.list[_this.index-1].eName.split("").map(() => {
					return ''
				})
				_this.exerciseList = res.data.list
				// result update format
				_this.change()
			})
		},
		created(){

		}
	}	
</script>

<style lang="scss" scoped>
	.bg{
		height: 94%;
		padding: 82px 25px 0 25px;
		background-color: #76a9fd;
		position: fixed;
	}
	.mint-header{
		background-color: #76a9fd;
	}
	.num{
		font-size: 26px;
		color: #76a9fd;
		text-align: center;
		margin: 40px auto;
		width: 127px;
		height: 44px;
		line-height: 44px;
		background-color: #fff;
		border-radius: 10px;
		box-shadow: rgba(255, 255, 255, 0.5) 0px 2px 8px;
	    -webkit-box-shadow: rgba(255, 255, 255, 0.5) 0px 2px 8px;
	}	
	.music{
		width: 80px;
		height: 80px;
		position: absolute;
		right: 60px;
		top: 90px;
		z-index: 10;
		.control{
			width: 100px;
			height: 100px;
			background: url(../assets/images/musicPlay.gif) no-repeat;
			background-size: 100% 100%;
			position: relative;
			.control-after{
				width: 60px;
				height: 60px;
				position: absolute;
				top: 50%;
				left: 50%;
				margin-top: -30px;
				margin-left: -30px;
				background: url(../assets/images/music.png) no-repeat;
				background-size: 100% 100%;
			    -webkit-animation: rotate2d 1.2s linear infinite;
			    animation: rotate2d 1.2s linear infinite;
			    z-index: -1;
			}
		}
		&.stopped{
			.control{
				background: none;
				.control-after{
				    -webkit-animation: none;
				    animation: none;
				}
			}
		}
	}	
	.content{
		width: 100%;
		background-color: #fff;
		border-radius: 10px;
		overflow: hidden;
		padding: 50px 0;
		position: relative;
		.title{
			width: 258px;
			height: 258px;
			position: relative;
			margin: 60px auto 0;
			img{
				width: 100%;
				height: 100%;
				border: 4px solid #76a9fd;
			}
			span{
				position: absolute;
				display: block;
				width: 140px;
				height: 49px;
				line-height: 49px;
				text-align: center;
				color: #fff;
				font-size: 30px;
				background: linear-gradient(to right, #ef765d , #f18353);
				border-radius: 10px;
				left: 50%;
				margin-left: -70px;
				top: -30px;
			}
		}
		.prompt{
			display: block;
			position: absolute;
			right: 24px;
			top: 20px;
			width: 100px;
			height: 100px;
			background: url(../assets/images/prompt.png) no-repeat;
			background-size: 100% 100%;
			color: #fff;
			font-size: 30px;
			text-align: center;
		}
		ul.result{
			margin: 60px 0 0;
			display: flex;
	        flex-wrap: wrap-reverse;
	        justify-content: center;
	        align-items:center;
	        width: 100%;
			li{
				width: 60px;
				height: 60px;
				line-height: 60px;
				text-align: center;
				color: #fff;
				font-size: 36px;
				border-radius: 5px;
				float: left;
				background-color: #f78d47;
				margin: 0 10px;
				box-shadow: rgba(247, 141, 71, 0.5) 0px 3px 8px;
			    -webkit-box-shadow: rgba(247, 141, 71, 0.5) 0px 3px 8px;
			    font-family: '微软雅黑';
				&.reload{
					background: url('../assets/images/reload.png') no-repeat;
					background-size: 100% 100%;
					width: 40px; 
					height: 40px;
					box-shadow: none;
				}
			}
		}
		ul{
			margin: 60px 0 0;
			padding: 0 0 0 10px;
			li{
				width: 100px;
				line-height: 100px;
				text-align: center;
				color: #fff;
				font-size: 48px;
				border-radius: 5px;
				float: left;
				margin: 10px 18px;
				background-color: #76a9fd;
				box-shadow: rgba(118, 169, 253, 0.5) 0px 3px 8px;
			    -webkit-box-shadow: rgba(118, 169, 253, 0.5) 0px 3px 8px;
			    font-family: '微软雅黑';
			}
		}		
	}
	@-webkit-keyframes rotate2d {
		from {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg)
		}

		to {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg)
		}
	}

	@keyframes rotate2d {
		from {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg)
		}

		to {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg)
		}
	}
</style>