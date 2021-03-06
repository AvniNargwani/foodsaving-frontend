// modules
import angular from "angular";
import uiRouter from "angular-ui-router";
import ngMaterial from "angular-material";
import ngCookies from "angular-cookies";
import ngAnimate from "angular-animate";
import ngAria from "angular-aria";
import translate from "angular-translate";
import translateStorageCookie from "angular-translate-storage-cookie";
import "angular-breadcrumb";
import angularLoadingBar from "angular-loading-bar";
import ngLocale from "angular-dynamic-locale";
import "angular-promise-buttons";

// config
import Services from "./services/services";
import PageComponents from "./components/pages";
import AppMaterial from "./app.material";
import AppLocalizeConfig from "./app.localizeConfig";
import AppLocalizeRun from "./app.localizeRun";
import AppHTTPErrorHandler from "./app.HTTPErrorHandler";

// styles
import "angular-loading-bar/build/loading-bar.css";
import "normalize.css";
import "angular-material/angular-material.css";
import "./fonts/fonts";
import "./app.styl";

import breadcrumbTemplate from "./templates/breadcrumbs.html";

import mainLayout from "./layouts/main.html";
import splashLayout from "./layouts/splash.html";
import logo from "./components/_logo/logo";

angular.module("app", [
  ngLocale,
  uiRouter,
  ngMaterial,
  "ncy-angular-breadcrumb",
  "angularPromiseButtons",
  angularLoadingBar,
  ngAnimate,
  ngAria,
  ngCookies,
  translate,
  translateStorageCookie,
  Services,
  PageComponents,
  logo
]).config(($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) => {
  "ngInject";
  $locationProvider.html5Mode(false).hashPrefix("!");
  $stateProvider
    .state("main", {
      abstract: true,
      url: "",
      template: mainLayout
    })
    .state("splash", {
      abstract: true,
      url: "",
      template: splashLayout
    });
  $urlRouterProvider.otherwise("/login");
  $httpProvider.defaults.xsrfCookieName = "csrftoken";
  $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
})
.config(AppLocalizeConfig)
.run(AppLocalizeRun)
.config(AppMaterial)
.config(AppHTTPErrorHandler)
.config((cfpLoadingBarProvider) => {
  "ngInject";
  cfpLoadingBarProvider.includeSpinner = false;
})
.config(($breadcrumbProvider) => {
  "ngInject";
  $breadcrumbProvider.setOptions({
    template: breadcrumbTemplate
  });
});
