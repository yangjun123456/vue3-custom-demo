<template>
  <el-container class="layout-body"
    height="100%">
    <el-header class="header">Header</el-header>
    <el-container class="content"
      style="height: calc(100% - 56px);">
      <section class="aside">
        <SideBar></SideBar>
      </section>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import SideBar from '@/views/layout/sidebar/index.vue';

@Options({
    name: 'Layout',
    components: {
        SideBar
    },
    props: {
        msg: String
    }
})
export default class Layout extends Vue {
	msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.layout-body {
	.header {
		background-color: #42b983;
	}
	.content {
		display: flex;
		justify-content: space-between;
		.main {
			box-shadow: 0px 0px 10px 0px #888888;
			flex: 1;
			z-index: 1;
		}
	}
}
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
