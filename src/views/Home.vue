<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <Table />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Table from '@/components/Table.vue'; // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
    Table
  }
})
export default class Home extends Vue {}
</script>
