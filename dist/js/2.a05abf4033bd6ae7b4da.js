(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{205:function(t,e,s){},211:function(t,e,s){"use strict";var i=s(205);s.n(i).a},213:function(t,e,s){"use strict";s.r(e);var i=s(1),a={components:{},data(){return{stateEnter:!1,stateRegistration:!0,stateForgotPassword:!1,urlInlineSvgSprite:s(36).default,logindata:{title:this.stateRegistration?"Регистрация":"Добро пожаловать",text:this.stateRegistration?"":"Перед вами сервис, который поможет вам организовать свои фотографии в альбомы и поделиться ими со всем миром!"},registerUser:{name:"",email:"",password:"",password_confirmation:""},loginUser:{email:"",password:""}}},methods:{registerHandle(){console.log("registerHandle"),i.a.post("/register",this.registerUser).then(t=>{console.log(t);const e=t.data.token;localStorage.setItem("token",e),i.a.defaults.headers.Authorization="Bearer "+e}).catch(t=>{console.log(t)})},loginHandle(){i.a.post("/login",this.loginUser).then(t=>{console.log(t);const e=t.data.token;localStorage.setItem("token",e),i.a.defaults.headers.Authorization="Bearer "+e}).catch(t=>{console.log(t)})}}},r=(s(211),s(3)),o=Object(r.a)(a,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper"},[s("section",{staticClass:"login"},[s("div",{staticClass:"login__container"},[s("div",{staticClass:"login__greeting"},[s("h1",{staticClass:"login__title"},[t._v(t._s(t.logindata.title))]),t._v(" "),s("p",{staticClass:"login__text"},[t._v(t._s(t.logindata.text))])]),t._v(" "),s("div",{staticClass:"login__form"},[t.stateRegistration?s("form",{staticClass:"registration",on:{submit:function(e){return e.preventDefault(),t.registerHandle(e)}}},[s("label",{staticClass:"registration__label registration__label_name"},[s("svg",{staticClass:"registration__icon registration__icon_name"},[s("use",{attrs:{"xlink:href":t.urlInlineSvgSprite+"#name"}})]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.registerUser.name,expression:"registerUser.name"}],staticClass:"registration__input registration__input_name",attrs:{type:"text",placeholder:"Имя"},domProps:{value:t.registerUser.name},on:{input:function(e){e.target.composing||t.$set(t.registerUser,"name",e.target.value)}}})]),t._v(" "),s("label",{staticClass:"registration__label registration__label_email"},[s("svg",{staticClass:"registration__icon registration__icon_email"},[s("use",{attrs:{"xlink:href":t.urlInlineSvgSprite+"#envelope"}})]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.registerUser.email,expression:"registerUser.email"}],staticClass:"registration__input registration__input_email",attrs:{type:"text",placeholder:"Электронная почта"},domProps:{value:t.registerUser.email},on:{input:function(e){e.target.composing||t.$set(t.registerUser,"email",e.target.value)}}})]),t._v(" "),s("label",{staticClass:"registration__label registration__label_password"},[s("svg",{staticClass:"registration__icon registration__icon_password"},[s("use",{attrs:{"xlink:href":t.urlInlineSvgSprite+"#password"}})]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.registerUser.password,expression:"registerUser.password"}],staticClass:"registration__input registration__input_password",attrs:{type:"password",placeholder:"Пароль"},domProps:{value:t.registerUser.password},on:{input:function(e){e.target.composing||t.$set(t.registerUser,"password",e.target.value)}}})]),t._v(" "),s("label",{staticClass:"registration__label registration__label_password"},[s("svg",{staticClass:"registration__icon registration__icon_password"},[s("use",{attrs:{"xlink:href":t.urlInlineSvgSprite+"#password"}})]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.registerUser.password_confirmation,expression:"registerUser.password_confirmation"}],staticClass:"registration__input registration__input_password",attrs:{type:"password",placeholder:"Подтвердите пароль"},domProps:{value:t.registerUser.password_confirmation},on:{input:function(e){e.target.composing||t.$set(t.registerUser,"password_confirmation",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"registration__wrapper"},[s("p",{staticClass:"registration__text"},[t._v("Ваши данные остаются строго конфиденциальны")]),t._v(" "),t._m(0),t._v(" "),s("div",{staticClass:"registration__toenter"},[s("p",{staticClass:"registration__text"},[t._v("Уже зарегистрированы?")]),t._v(" "),s("button",{staticClass:"site-button site-button_theme-just-text",attrs:{type:"button"},on:{click:function(e){e.preventDefault(),t.stateRegistration=!t.stateRegistration,t.stateEnter=!t.stateEnter}}},[t._v("Войти")])])])]):t._e(),t._v(" "),t.stateEnter?s("form",{staticClass:"enter",on:{submit:function(e){return e.preventDefault(),t.loginHandle(e)}}},[s("label",{staticClass:"enter__label enter__label_email"},[s("svg",{staticClass:"enter__icon enter__icon_email"},[s("use",{attrs:{"xlink:href":t.urlInlineSvgSprite+"#envelope"}})]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.loginUser.email,expression:"loginUser.email"}],staticClass:"enter__input enter__input_email",attrs:{type:"text",placeholder:"Электронная почта"},domProps:{value:t.loginUser.email},on:{input:function(e){e.target.composing||t.$set(t.loginUser,"email",e.target.value)}}})]),t._v(" "),s("label",{staticClass:"enter__label enter__label_password"},[s("svg",{staticClass:"enter__icon enter__icon_password"},[s("use",{attrs:{"xlink:href":t.urlInlineSvgSprite+"#password"}})]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.loginUser.password,expression:"loginUser.password"}],staticClass:"enter__input enter__input_password",attrs:{type:"password",placeholder:"Пароль"},domProps:{value:t.loginUser.password},on:{input:function(e){e.target.composing||t.$set(t.loginUser,"password",e.target.value)}}})]),t._v(" "),t._m(1)]):t._e(),t._v(" "),t.stateForgotPassword?s("form",{staticClass:"forgot"},[t._m(2),t._v(" "),s("label",{staticClass:"forgot__label forgot__label_email forgot__label_topborder"},[s("svg",{staticClass:"forgot__icon forgot__icon_email"},[s("use",{attrs:{"xlink:href":t.urlInlineSvgSprite+"#envelope"}})]),t._v(" "),s("input",{staticClass:"forgot__input forgot__input_email",attrs:{type:"text",placeholder:"Электронная почта"}})]),t._v(" "),t._m(3)]):t._e()]),t._v(" "),s("div",{staticClass:"login__footer"},[t._v(" 2016 Создано командой профессионалов на продвинутом курсе по веб-разработке от LoftSchool\n                ")])])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"registration__submit"},[e("button",{staticClass:"site-button site-button_min_width",attrs:{type:"submit"}},[this._v("Создать аккаунт")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"enter__wrapper"},[e("button",{staticClass:"site-button site-button_theme-just-text",attrs:{type:"button"}},[this._v("Забыли пароль?")]),this._v(" "),e("div",{staticClass:"enter__submit"},[e("button",{staticClass:"site-button site-button_min_width",attrs:{type:"submit"}},[this._v("Войти")])]),this._v(" "),e("div",{staticClass:"enter__toregistration"},[e("p",{staticClass:"enter__text"},[this._v("Нет аккаунта?")]),this._v(" "),e("button",{staticClass:"site-button site-button_theme-just-text",attrs:{type:"button"}},[this._v("Зарегистрироваться")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"forgot__wrapper"},[e("h4",{staticClass:"forgot__title"},[this._v("Забыли пароль?")]),this._v(" "),e("p",{staticClass:"forgot__text"},[this._v("Ничего страшного, введите свой email и мы вышлем инструкции по восстановлению пароля")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"forgot__wrapper forgot__wrapper_bottom"},[e("div",{staticClass:"forgot__submit"},[e("button",{staticClass:"site-button site-button_min_width",attrs:{type:"submit"}},[this._v("Восстановить пароль")])]),this._v(" "),e("div",{staticClass:"forgot__toanotherform forgot__toanotherform_center"},[e("p",{staticClass:"forgot__text"},[this._v("Вспомнили пароль?")]),this._v(" "),e("button",{staticClass:"site-button site-button_theme-just-text",attrs:{type:"button"}},[this._v("Войти")])])])}],!1,null,null,null);e.default=o.exports}}]);