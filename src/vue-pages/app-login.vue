<template>
    <div class="wrapper">
        <section class="login">
            <div class="login__container">

                <div class="login__greeting">
                    
                    <h1 class="login__title">{{logindata.title}}</h1>

                    <p class="login__text">{{logindata.text}}</p>

                </div>

                <div class="login__form">

                    <form
                        v-if="stateRegistration"
                        class="registration"
						@submit.prevent="registerHandle"
						>

                        <label class="registration__label registration__label_name">
                            
                            <svg class="registration__icon registration__icon_name">
                                <use :xlink:href="urlInlineSvgSprite+'#name'"></use>                                
                            </svg>
                            <input class="registration__input registration__input_name" type="text" placeholder="Имя" v-model="registerUser.name">

                        </label>
                        <label class="registration__label registration__label_email">					
                            
                            <svg class="registration__icon registration__icon_email">
                                <use :xlink:href="urlInlineSvgSprite+'#envelope'"></use>
                            </svg>
                            <input class="registration__input registration__input_email" type="text" placeholder="Электронная почта" v-model="registerUser.email">

                        </label>
                        <label class="registration__label registration__label_password">					
                            
                            <svg class="registration__icon registration__icon_password">
                                <use :xlink:href="urlInlineSvgSprite+'#password'"></use>
                            </svg>
                            <input class="registration__input registration__input_password" type="password" placeholder="Пароль" v-model="registerUser.password">
                        </label>
                        <label class="registration__label registration__label_password">					
                            
                            <svg class="registration__icon registration__icon_password">
                                <use :xlink:href="urlInlineSvgSprite+'#password'"></use>
                            </svg>
                            <input class="registration__input registration__input_password" type="password" placeholder="Подтвердите пароль" v-model="registerUser.password_confirmation">
                        </label>

                        <div class="registration__wrapper">
                            
                            <p class="registration__text">Ваши данные остаются строго конфиденциальны</p>

                            <div class="registration__submit">
                                <button class="site-button site-button_min_width" type="submit">Создать аккаунт</button>
                            </div>
                            <div class="registration__toenter">
                                <p class="registration__text">Уже зарегистрированы?</p>
                                <button class="site-button site-button_theme-just-text" type="button"
									@click.prevent="stateRegistration=!stateRegistration; stateEnter=!stateEnter"
								>Войти</button>
                            </div>

                        </div>

                    </form>


                    <form
						@submit.prevent="loginHandle"
                        v-if="stateEnter"
                        class="enter">

                        <label class="enter__label enter__label_email">					
                            
                            <svg class="enter__icon enter__icon_email">
                                <use :xlink:href="urlInlineSvgSprite+'#envelope'"></use>
                            </svg>
                            <input class="enter__input enter__input_email" type="text" placeholder="Электронная почта"
								v-model="loginUser.email"
							>

                        </label>

                        <label class="enter__label enter__label_password">
                            
                            <svg class="enter__icon enter__icon_password">
                                <use :xlink:href="urlInlineSvgSprite+'#password'"></use>
                            </svg>
                            <input class="enter__input enter__input_password" type="password" placeholder="Пароль"
								v-model="loginUser.password"
							>

                        </label>
                        

                        <div class="enter__wrapper">
                            
                            <button class="site-button site-button_theme-just-text" type="button">Забыли пароль?</button>

                            <div class="enter__submit">
                                <button class="site-button site-button_min_width" type="submit">Войти</button>
                            </div>
                            
                            
                            <div class="enter__toregistration">
                                <p class="enter__text">Нет аккаунта?</p> 
                                <button class="site-button site-button_theme-just-text" type="button"
									@click.prevent="stateRegistration=!stateRegistration; stateEnter=!stateEnter"
								>Зарегистрироваться</button>
                            </div>

                        </div>

                    </form>
                    

                    <form 
                        v-if="stateForgotPassword"
                        class="forgot">

                        <div class="forgot__wrapper">

                            <h4 class="forgot__title">Забыли пароль?</h4>
                            <p class="forgot__text">Ничего страшного, введите свой email и мы вышлем инструкции по восстановлению пароля</p> 
                        
                        </div>

                        <label class="forgot__label forgot__label_email forgot__label_topborder">					
                            
                            <svg class="forgot__icon forgot__icon_email">
                                <use :xlink:href="urlInlineSvgSprite+'#envelope'"></use>
                            </svg>
                            <input class="forgot__input forgot__input_email" type="text" placeholder="Электронная почта">

                        </label>
                                    

                        <div class="forgot__wrapper forgot__wrapper_bottom">
                            
                            <div class="forgot__submit">
                                <button class="site-button site-button_min_width" type="submit">Восстановить пароль</button>
                            </div>
                            
                            
                            <div class="forgot__toanotherform forgot__toanotherform_center">
                                <p class="forgot__text">Вспомнили пароль?</p> 
                                <button class="site-button site-button_theme-just-text" type="button">Войти</button>
                            </div>

                        </div>

                    </form>

                </div>

                <div class="login__footer"> 
					2020 | Создано командой профессионалов: <a target="_blank" href="https://vk.com/id594716031">Lidia</a>&nbsp;&amp;&nbsp;<a target="_blank" href="https://xeniaweb.ch/">XeniaWeb</a>
                </div> 
                
            </div>	
        </section>

    </div>

</template>


<script>

	import { mapState, mapActions } from 'vuex';
	import axios from '../requests';

  export default {   

    data() {
        return {
            stateEnter: !false,
            stateRegistration: !!false,
            stateForgotPassword: !!false,
            
            urlInlineSvgSprite: require('../img/spriteIcons.svg').default,

            logindata: {
                title: this.stateRegistration ? 'Регистрация' : 'Добро пожаловать',
                text: this.stateRegistration ? '' : 'Перед вами сервис, который поможет вам организовать свои фотографии в альбомы и поделиться ими со всем миром!',
			},
			
			registerUser: {
				name: '',
				email: '',
				password: '',
				password_confirmation: ''
			},
			loginUser: {
				email: '',
				password: '',
			},
           
        }
    },


    methods: {  
		...mapActions('user', ['login']),

        loginHandle() {
			axios.post('/login', this.loginUser).then(response => {
				const token = response.data.access_token;
				localStorage.setItem('token', token);
				axios.defaults.headers['Authorization'] = `Bearer ${token}`;

				const user = response.data.user;
				this.login(user);
				this.$router.replace(`/${response.data.user.id}`);

			}).catch(error => {
				alert('я ошибка login: ' + error.message);
			});
		}, 

		registerHandle() {			
			axios.post('/register', this.registerUser).then(response => { 
				const token = response.data.token;
				localStorage.setItem('token', token);
				axios.defaults.headers['Authorization'] = `Bearer ${token}`;

				const user = response.data.user;
				this.login(user);
				this.$router.replace(`/${response.data.user.id}`);

			}).catch(error => {
				alert('я ошибка register: ' + error.message);
			});
		},

    },

        
    }

</script>


<style lang="postcss">

    @import 'normalize.css';
    @import '../fonts/fonts.pcss';
    @import '../styles/mixins.pcss';
    @import '../styles/layout.pcss';

    @import '../styles/common/site-button.pcss';


.login {
	min-height: 100vh;
	min-width: 320px;
	font-family: 'Proxima Nova-Light';
	color: $color-white;	
	background-color: $color-text;

    background-image: url('../img/bg.png');
	background-repeat: no-repeat;
	background-size: cover;

	&__container {
		min-height: 100vh;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 
								0.5fr
								2fr 
								75px;

		grid-template-areas: 	'greeting'
								'content'
								'footer';
		
		align-items: end;

        @include tablets {
            grid-template-rows: 
                        1fr
                        2fr 
                        75px;
        }
	}

	&__greeting {
		grid-area: greeting;
		padding-bottom: 23px;
		padding-top: 36px;
		text-align: center;
	}

	&__title {
		font-family: 'Panton-Bold';		
		color: $color-white;

        @include tablets {
            margin-bottom: 15px;
        }		
	}

	&__text {
		font-family: 'Proxima Nova-Light';
		color: $color-white;
        font-size: 16px;
        line-height: 24px;
        margin: 0 auto;
        width: 90%;

        @include tablets {
            width: 80%;
        }
	}

	&__form {
		grid-area: content;
		align-self: start;
	}

	&__footer {
		grid-area: footer;
		text-align: center;
		padding: 0 17px;
	}
}


.forgot {
	display: flex;
	flex-direction: column;
	margin: 0 auto;

	color: $color-text;
	background-color: $color-white;
	min-width: 300px;
	width: 90%;
	min-height: 200px;
	border-radius: 20px;
	overflow: hidden;

    @include tablets {
        width: 273px;
		min-width: unset;
        min-height: 200px;
    }


	&__label {
		height: 40px;
		width: 100%;
		padding-left: 44px;
		border-bottom: 1px solid rgba($color-text, 0.2);
		position: relative;		
		
		&_topborder {
			border-top: 1px solid rgba($color-text, 0.2);
		}
	}

	&__icon {
		position: absolute;
		top: 50%;
		left: 5px;
		height: 40%;
		width: 44px;
		transform: translateY(-50%);

		& use {
			fill: rgba($color-text, 0.6);
		}
	}

	&__input {
		height: 100%;
		width: 100%;
		border: none;
		outline: none;
		
		padding: 17px 0;

		&::placeholder {
			color: rgba($color-text, 0.6);
		}
	}


	&__wrapper {
		padding: 20px 20px 0;
		display: flex;
		flex-direction: column;
        font-size: 14px;

        &_bottom {
            @include tablets {
                align-items: center;
            }
        }
	}

	&__toanotherform {
		flex-direction: row;

		&_center {
			margin: 0 auto;
		}
	}
	

	&__title {
        font-family: 'Proxima Nova Semibold';
        font-size: 16px;
		margin-bottom: 5px;
        color: rgba($color-text, 0.9);
	}

	&__text {
        font-family: 'Proxima Nova-Light';
        font-size: 14px;
        line-height: 14px;
		display: inline-block;
		margin-top: 10px;
		margin-bottom: 16px;
        color: rgba($color-text, 0.8);
	}

	&__submit {
		align-self: center;
        
        @include tablets {
            align-self: auto;
        }
	}

}


.enter {
	display: flex;
	flex-direction: column;
	margin: 0 auto;

	color: $color-text;
	background-color: $color-white;
	min-width: 300px;
	width: 90%;
	min-height: 200px;
	border-radius: 20px;
	overflow: hidden;

    @include tablets {
        width: 273px;
        min-height: 200px;
    }


	&__label {
		height: 40px;
		width: 100%;
		padding-left: 44px;
		border-bottom: 1px solid #e1e1e1;
		position: relative;
	}

	&__icon {
		position: absolute;
		top: 50%;
		left: 5px;
		height: 40%;
		width: 44px;
		transform: translateY(-50%);

		& use {
			fill: rgba($color-text, 0.6);
		}
	}

	&__input {
		height: 100%;
		width: 100%;
		border: none;
		outline: none;
		
		padding: 17px 0;

		&::placeholder {
			color: rgba($color-text, 0.6);
		}
	}


	&__wrapper {
		padding: 10px 20px;
        font-size: 14px;
		display: flex;
		flex-direction: column;
	}
	
	&__toregistration {
		flex-direction: row;
	}
	

	&__text {
        font-family: 'Proxima Nova-Light';
        font-size: 14px;
        line-height: 14px;
        color: rgba($color-text, 0.8);
		display: inline-block;
		margin-top: 10px;
		margin-bottom: 16px;
	}

	&__submit {
		align-self: center;
        padding-top: 10px;

        @include tablets {
            align-self: auto;
        }
	}

}


.registration {
	display: flex;
	flex-direction: column;
	margin: 0 auto;

	color: $color-text;
	background-color: $color-white;
	min-width: 300px;
	width: 90%;
	min-height: 200px;
	border-radius: 20px;
	overflow: hidden;

    @include tablets {
        width: 273px;
        min-height: 200px;
    }


	&__label {
		height: 40px;
		width: 100%;
		padding-left: 44px;
		border-bottom: 1px solid #e1e1e1;
		position: relative;
	}

	&__icon {
		position: absolute;
		top: 50%;
		left: 5px;
		height: 40%;
		width: 44px;
		transform: translateY(-50%);

		& use {
			fill: rgba($color-text, 0.6);
		}
	}

	&__input {
		height: 100%;
		width: 100%;
		border: none;
		outline: none;
		
		padding: 17px 0;

		&::placeholder {
			color: rgba($color-text, 0.6);
		}
	}


	&__wrapper {
		padding: 0px 20px;
		display: flex;
		flex-direction: column;
	}

	&__toenter {
        font-size: 14px;
		flex-direction: row;
	}
	

	&__text {
        font-family: 'Proxima Nova-Light';
        font-size: 14px;
        line-height: 14px;
        color: rgba($color-text, 0.8);
		display: inline-block;
		margin-top: 10px;
		margin-bottom: 16px;
	}

	&__submit {
		align-self: center;

        @include tablets {
            align-self: auto;
        }
	}

}


</style>