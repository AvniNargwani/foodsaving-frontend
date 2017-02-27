import angular from "angular";
import uiRouter from "angular-ui-router";
import pickupDate from "../../../../services/pickupDate/pickupDate";
import pickupManageComponent from "./pickupManage.component";

let pickupManageModule = angular.module("pickupManage", [
  uiRouter,
  pickupDate
])

.component("pickupManage", pickupManageComponent)

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state("group.pickupManage", {
      url: "/store/{storeId:int}/manage",
      component: "pickupManage",
      resolve: {
        series: (PickupDateSeries, $stateParams) => {
          return PickupDateSeries.listByStoreId($stateParams.storeId);
        },
        pickups: (PickupDate, $stateParams) => {
          return PickupDate.listByStoreId($stateParams.storeId);
        }
      }
    });
})

.name;

export default pickupManageModule;
