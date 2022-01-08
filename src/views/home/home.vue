<template>
  <div class="home">
    <img alt="Vue logo"
      src="../../assets/logo.png" />
      <br>
      <h1>说明： 通过is动态渲染组件</h1>
    <component :is="helloWorldComponent"></component>
  </div>
</template>

<script lang="ts">
import { interval } from 'rxjs';
import { defineAsyncComponent, defineComponent, ref } from 'vue';
import { Options, Vue } from 'vue-class-component';
import websocket from '@/websocket/websocket';

const Home = defineComponent({
  name: 'Home',
  components: {
    HelloWorld: defineAsyncComponent(() => import('./components/hello-world.vue')),
    HelloWorldTwo: defineAsyncComponent(() => import('./components/hello-world-two.vue'))
  },
  setup(props, context) {
    const helloWorldComponent = ref('HelloWorld');
    interval(2000).subscribe(() => {
      helloWorldComponent.value = helloWorldComponent.value === 'HelloWorld' ? 'HelloWorldTwo' : 'HelloWorld';
    })

    // const websocketInit = websocket();

    // interval(2000).subscribe(() => {
    //   websocketInit.send('发送成功');
    // })

    return { props, context, helloWorldComponent };
  }

})
export default Home;
</script>
