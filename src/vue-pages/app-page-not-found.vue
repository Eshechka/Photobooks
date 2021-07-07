<template>
    <div class="wrapper wrapper_not_found">

		<!-- <header class="header">
	
			<div class="header__container">

                <div class="header__button-home">
                    <router-link title="Перейти на главную" class="button button_icon_space button_size_changing button_theme_color_changing"
                        to="/"
                        @click.prevent>
                        <span class="button__text">На главную</span>
                        <span class="button__icon button__icon_home"></span>
                    </router-link>
                </div>

			</div>

		</header> -->


            <div class="not-found">
                <router-link class="not-found__link"
                to="/"
                >Перейти на главную</router-link>                
            </div>


			
		<!-- <footer class="footer">
	
			<div class="footer__container">

				<div class="footer__desc">
					Перед вами сервис, который поможет вам организовать свои фотографии в альбомы и поделиться ими со всем миром!
				</div>
				<div class="footer__copyright">
                    2021 | Создано командой профессионалов: <a target="_blank" href="https://vk.com/id594716031">Lidia</a>&nbsp;&amp;&nbsp;<a target="_blank" href="https://xeniaweb.ch/">XeniaWeb</a>
				</div>
	
			</div>
		</footer> -->

    </div>

</template>


<script>

  export default { 
 

    data() {
        return {

           
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

    @import '../styles/common/site-button.pcss';


    /* .header {
        background-color: transparent;
        min-width: 320px;
        min-height: 100px;
        color: $color-white;
        position: relative;

        &__container {
            padding: 20px 0;
            margin: 0 auto;
            width: 90%;
            position: relative;
            @include max-with-container;
        }

        &__button-home {
            position: absolute;
            top: 20px;
            right: 0;
            z-index: 9;
        }

 
        &__title {
            display: inline-block;
            vertical-align: middle;
            font-family: 'Panton-Bold';
            font-size: 16px;
            mix-blend-mode: difference;
        }


        &__text {
            mix-blend-mode: difference;
            color: rgba($color-white, 0.9);
            margin-bottom: 18px;
            font-family: 'ProximaNova-Light';
            font-size: 14px;
            line-height: 21px;
            text-align: center;
            mix-blend-mode: difference;

            @include tablets {
                font-size: 16px;
                line-height: 24px;
                width: 85%;
                margin: auto;
            }            
        }
    } */

	.not-found {
        position: absolute;
        top: 60%;
        left: 35%;
            @include tablets {
                left: 50%;
            }

        &__link {
            color: $color-white;
            font-family: 'Panton Bold';
            font-size: 22px;
            text-decoration: none;

            @include tablets {
                font-size: 30px;
            }
            @include desktop {
                font-size: 40px;
            }
        }
	}

    /* .footer {
        background-color: transparent;

        min-width: 320px;
        padding: 15px;

        color: $color-white;
        font-family: 'ProximaNova-Light';
        text-align: center;
        font-size: 14px;
        line-height: 21px;

        &__container {
            display: flex;
            flex-direction: column;
            margin: 0 auto;
            width: 90%;
            position: relative;
            @include max-with-container;

            @include tablets {
                flex-direction: row;
                justify-content: space-between;
            }
        }

        &__desc {
            margin-bottom: 20px;
            mix-blend-mode: difference;
            color: rgba($color-white, 0.9);

            @include tablets {
                flex-basis: 40%;
                text-align: left;
            }
        }
        &__copyright {			
            mix-blend-mode: difference;
            color: rgba($color-white, 0.9);
            
            @include tablets {
                flex-basis: 40%;
                text-align: right;
            }
        }

    } */

</style>