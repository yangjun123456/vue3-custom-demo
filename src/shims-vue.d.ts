/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "js-cookie";
declare module "lodash";
declare module "vuex-persist";
declare module "vuex-module-decorators";
declare module "rxjs";
declare module "uuid";
declare module "xe-utils";
// declare module "axios";
declare module "element-plus";
