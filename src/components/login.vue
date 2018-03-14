<template>
	<div>
		<mt-header fixed title="猜单词"></mt-header>
		<div class="content">
			<div>
				<i class="icon-username"></i>
				<input type="text" placeholder="请输入用户名" v-model="user.username">
			</div>
			<div>
				<i class="icon-newpass"></i>
				<input type="password" placeholder="请输入密码" v-model="user.password">
			</div>
			<button type="button" @click="login">登录</button>
		</div>	
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import { mapActions } from 'vuex'
	import Qs from 'qs'
	export default {
		data(){
			return {
				user: {
					username: '',
					password: ''
				}
			}
		},
		computed: {
	      ...mapActions({
	        UserLogin: 'UserLogin',
	      })
	    },
		methods: {
			login(){							
				if(this.user.username && this.user.password){
					this.$store.dispatch('UserLogin', Qs.stringify(this.user))
				}else{
					Toast({
						message: '请输入用户名和密码',
						position: 'bottom',
						className: 'toast'
					})
				}
			}
		}
	}	
</script>

<style lang="scss" scoped>
	.mint-header{
		background-color: #76a9fd;
	}
	.content{
		width: 500px;
		padding: 150px 100px;
		background-color: #fff;
		box-shadow: 8px 10px 20px rgba(63,127,233,0.1);					
		border-radius: 5px;		
		margin: 30px auto;
		div{
			overflow: hidden;
			position: relative;
			margin: 0 0 40px 0;
			.icon-username{
				position: absolute;
				left: 25px;
				display: block;
				width: 29px;
				height: 28px;
				background: url(../assets/images/icon-username.png) no-repeat;
				background-size: 100% 100%;
				top: 50%;
				margin-top: -14.5px;
			}
			.icon-newpass{
				position: absolute;
				left: 25px;
				display: block;
				width: 27px;
				height: 33px;
				background: url(../assets/images/icon-newpass.png) no-repeat;
				background-size: 100% 100%;
				top: 50%;
				margin-top: -14.5px;
			}
			input{
				width: 330px;
				height: 66px;
				border-radius: 30px;
				background: none;
				border: 2px solid #d6d6d6;
				padding: 0 80px;
				font-size: 30px;
				color: #333;
			}
		}
		button{
			width: 490px;
			height: 90px;
			line-height: 90px;
			border-radius: 45px;
			background-color: #85aff7;
			border: none;
			font-size: 30px;
			color: #d6d6d6;
			color: #fff;
			margin: 60px 0 0 0;
		}
	}
</style>