import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '@/store';

@Module({
  dynamic: true,
  name: 'navOptions',
  namespaced: true,
  stateFactory: true,
  store: store,
  preserveState: localStorage.getItem('vuex') !== null // 从localstorage获取保存的vuex数据
})
export default class Nav extends VuexModule {
  public test: string = 'a';

  @Mutation
  public setTest(val: string) {
    this.test = val;
  }

  @Action
  public changeTest() {
    console.log(this.test);
    const str: string = this.test === 'a' ? 'b' : 'a';
    this.setTest(str);
    console.log(this.test);
  }
}

export const NavModule = getModule(Nav);
