<template>
  <div class="hello">
      <h1>helloword</h1>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
import { take, interval } from 'rxjs';
import {
    defineComponent,
    markRaw,
    toRaw,
    reactive,
    ref,
    onMounted,
    watchEffect,
    watch,
    computed,
    getCurrentInstance
} from 'vue';
import { useStore } from 'vuex';
import { NavModule } from '@/store/modules/nav';

// setup 中使用watch、computed、ref、reactive
const HellowWord = defineComponent({
    name: 'HellowWord',
    inject: ['$getUuidv4'],
    props: {
        msg: {
            type: String,
            default: ''
        }
    },
    setup(props, context) {
        return {
            props,
            context
        }
    }
});

export default HellowWord;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
