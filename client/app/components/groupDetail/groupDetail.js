import angular from "angular";
import uiRouter from "angular-ui-router";
import groupDetailComponent from "./groupDetail.component";
import AuthenticationModule from "../../common/authentication/authentication";
import groupModule from "../../common/group/group";
import storeList from "../_storeList/storeList";
import userList from "../_userList/userList";
import pickupList from "../_pickupList/pickupList";
import expandablePanel from "../_expandablePanel/expandablePanel";

let groupDetailModule = angular.module("groupDetail", [
  uiRouter,
  AuthenticationModule,
  groupModule,
  storeList,
  userList,
  pickupList,
  expandablePanel
])

.config(($stateProvider, hookProvider) => {
  "ngInject";
  $stateProvider
    .state("groupDetail", {
      parent: "main",
      url: "/group/{groupId:int}",
      component: "groupDetail",
      resolve: {
        groupData: (Group, CurrentGroup, $stateParams) => {
          return Group.get($stateParams.groupId).then((group) => {
            CurrentGroup.set(group);
            return group;
          });
        }
      }
    });
  hookProvider.setup("groupDetail", { authenticated: true, anonymous: "login" });
})

.component("groupDetail", groupDetailComponent)

.name;

export default groupDetailModule;
