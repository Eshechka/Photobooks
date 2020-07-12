<template>
    <div class="wrapper">
        <section class="login">
            <div class="login__container">

                <div class="login__greeting">
                    
                    <h1 class="login__title">{{login.title}}</h1>

                    <p class="login__text">{{login.text}}</p>

                </div>

                <div class="login__form">

                    <form
                        v-if="stateRegistration"
                        class="registration">

                        <label class="registration__label registration__label_name">
                            
                            <svg class="registration__icon registration__icon_name">
                                <use :xlink:href="urlInlineSvgSprite+'#name'"></use>
                                
                            </svg>
                            <input class="registration__input registration__input_name" type="text" placeholder="Имя">

                        </label>
                        <label class="registration__label registration__label_email">					
                            
                            <svg class="registration__icon registration__icon_email">
                                <use :xlink:href="urlInlineSvgSprite+'#envelope'"></use>
                            </svg>
                            <input class="registration__input registration__input_email" type="text" placeholder="Электронная почта">

                        </label>
                        <label class="registration__label registration__label_password">					
                            
                            <svg class="registration__icon registration__icon_password">
                                <use :xlink:href="urlInlineSvgSprite+'#password'"></use>
                            </svg>
                            <input class="registration__input registration__input_password" type="text" placeholder="Пароль">
                        </label>

                        <div class="registration__wrapper">
                            
                            <p class="registration__text">Ваши данные остаются строго конфиденциальны</p>

                            <div class="registration__submit">
                                <button class="site-button site-button_min_width" type="submit">Создать аккаунт</button>
                            </div>
                            <div class="registration__toenter">
                                <p class="registration__text">Уже зарегистрированы?</p>
                                <button class="site-button site-button_theme-just-text" type="button">Войти</button>
                            </div>

                        </div>

                    </form>


                    <form 
                        v-if="stateEnter"
                        class="enter">

                        <label class="enter__label enter__label_email">					
                            
                            <svg class="enter__icon enter__icon_email">
                                <use :xlink:href="urlInlineSvgSprite+'#envelope'"></use>
                            </svg>
                            <input class="enter__input enter__input_email" type="text" placeholder="Электронная почта">

                        </label>

                        <label class="enter__label enter__label_password">
                            
                            <svg class="enter__icon enter__icon_password">
                                <use :xlink:href="urlInlineSvgSprite+'#password'"></use>
                            </svg>
                            <input class="enter__input enter__input_password" type="text" placeholder="Пароль">

                        </label>
                        

                        <div class="enter__wrapper">
                            
                            <button class="site-button site-button_theme-just-text" type="button">Забыли пароль?</button>

                            <div class="enter__submit">
                                <button class="site-button site-button_min_width" type="submit">Войти</button>
                            </div>
                            
                            
                            <div class="enter__toregistration">
                                <p class="enter__text">Нет аккаунта?</p> 
                                <button class="site-button site-button_theme-just-text" type="button">Зарегистрироваться</button>
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
                                    

                        <div class="forgot__wrapper">
                            
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

                <div class="login__footer"> 2016 Создано командой профессионалов на продвинутом курсе по веб-разработке от LoftSchool
                </div> 
                
            </div>	
        </section>

    </div>

</template>


<script>
//   import appCard from '../vue-components/app-card.vue'

  export default {   

    components: {
    //   appCard,
    },

    data() {
        return {
            stateEnter: !!false,
            stateRegistration: !!false,
            stateForgotPassword: !false,
            

            // urlAvatar: require('../img/anton.png').default,
            urlInlineSvgSprite: require('../img/spriteIcons.svg').default,

            login: {
                title: this.stateRegistration ? 'Регистрация' : 'Добро пожаловать',
                text: this.stateRegistration ? '' : 'Перед вами сервис, который поможет вам организовать свои фотографии в альбомы и поделиться ими со всем миром!',

            }
           
        }
    },


    methods: {      

    },

        
    }

</script>


<style lang="postcss">

    @import 'normalize.css';
    @import '../fonts/fonts.pcss';
    @import '../styles/mixins.pcss';
    @import '../styles/layout.pcss';

    @import '../styles/blocks/site-button.pcss';


.login {
	min-height: 100vh;
	min-width: 320px;
	font-family: 'ProximaNova-Light';
	color: $color-white;	


    background-image: url('../img/bg.png');
	background-repeat: no-repeat;
	background-size: cover;

	&__container {
		min-height: 100vh;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 
								20%
								1fr 
								75px;

		grid-template-areas: 	'greeting'
								'content'
								'footer';
		
		align-items: end;
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
	}

	&__toanotherform {
		flex-direction: row;

		&_center {
			margin: 0 auto;
		}
	}
	

	&__text {
		display: inline-block;
		margin-top: 10px;
		margin-bottom: 16px;
	}

	&__submit {
		align-self: center;
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
	
	&__toregistration {
		flex-direction: row;
	}
	

	&__text {
		display: inline-block;
		margin-top: 10px;
		margin-bottom: 16px;
	}

	&__submit {
		align-self: center;
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
		flex-direction: row;
	}
	

	&__text {
		display: inline-block;
		margin-top: 10px;
		margin-bottom: 16px;
	}

	&__submit {
		align-self: center;
	}

}


</style>