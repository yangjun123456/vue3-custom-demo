export const vue3DemoOptions = [
  {
    path: 'testCommunication',
    name: 'TestCommunication',
    component: () => import('../../views/vue3-api-test/test-communication/test-communication-parent.vue')
  },
  {
    path: 'refAndReactive',
    name: 'RefAndReactive',
    component: () => import('../../views/vue3-api-test/ref-reactive.vue')
  },
  {
    path: 'shallowRefAndShallowReactive',
    name: 'ShallowRefAndShallowReactive',
    component: () => import('../../views/vue3-api-test/shallowRef-shallowReactive.vue')
  },
  {
    path: 'toRawAndMakeRaw',
    name: 'ToRawAndMakeRaw',
    component: () => import('../../views/vue3-api-test/toRaw-makeRaw.vue')
  },
  {
    path: 'toRefAndToRefs',
    name: 'ToRefAndToRefs',
    component: () => import('../../views/vue3-api-test/toRef-toRefs.vue')
  },
  {
    path: 'watchAndWatchEffect',
    name: 'WatchAndWatchEffect',
    component: () => import('../../views/vue3-api-test/watch-watchEffect.vue')
  },
  {
    path: 'getSetupJsStyle',
    name: 'GetSetupJsStyle',
    component: () => import('../../views/vue3-api-test/get-setup-js-style.vue')
  },
  {
    path: 'vMemo',
    name: 'VMemo',
    component: () => import('../../views/vue3-api-test/v-memo.vue')
  },
  {
    path: 'mixinTest',
    name: 'MixinTest',
    component: () => import('../../views/vue3-api-test/mixins-test/mixins-parent.vue')
  }
]
