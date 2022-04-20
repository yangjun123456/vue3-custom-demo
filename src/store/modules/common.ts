import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '@/store';

@Module({
    dynamic: true,
    name: 'commonOptions',
    namespaced: true,
    stateFactory: true,
    store: store,
    preserveState: localStorage.getItem('vuex') !== null
})
export default class Common extends VuexModule {
  public test2: string = 'c';

  @Mutation
  public setTest(val: string) {
      this.test2 = val;
  }

  @Action
  public changeTest() {
      console.log(this.test2);
      const str: string = this.test2 === 'c' ? 'd' : 'c';
      this.setTest(str);
      console.log(this.test2);
  }
}

export const CommonModule = getModule(Common);
