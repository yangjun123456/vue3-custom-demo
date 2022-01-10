<template>
    <section class="menu">
        <!-- <el-menu :default-openeds="['1', '3']"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            @open="handleOpen"
            :default-active="$route.path"
            @close="handleClose">
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <message />
                    </el-icon>
                    <span>Navigator One</span>
                </template>
                <el-menu-item-group>
                    <template #title><span>echarts</span></template>
                    <el-menu-item index="1-1"
                        @click="routerTo('lineEcharts')">line-echarts</el-menu-item>
                    <el-menu-item index="1-2"
                        @click="routerTo('barEcharts')">bar-echarts</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group 2">
                    <el-menu-item index="1-3">Option 3</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                    <template #title><span>Option 4</span></template>
                    <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <pie-chart />
                    </el-icon>
                    <span>Vue Api Test</span>
                </template>
                <el-menu-item index="2-1"
                    @click="routerTo('setupAndApiApply')">setup and api apply</el-menu-item>
                <el-menu-item index="2-2">Option 2</el-menu-item>
                <el-menu-item index="2-3">Option 3</el-menu-item>
                <el-menu-item index="2-4">Option 4</el-menu-item>
            </el-sub-menu>
        </el-menu> -->

        <el-menu :default-openeds="['1']"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            @open="handleOpen"
            :default-active="$route.path"
            @close="handleClose">
            <template v-for="(item) in menus">
                <el-sub-menu v-if="item.children"
                    :key="item.title||item.content"
                    :index="item.title||item.content">
                    <template #title>
                        <el-icon>
                            <message />
                        </el-icon>
                        <span>{{item.title}}</span>
                    </template>
                    <el-menu-item v-for="childMenu in item.children"
                        :key="childMenu.content"
                        :index="childMenu.url "
                        @click="routerTo(childMenu.url)">
                        {{ childMenu.content }}
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else
                    :key="item.title"
                    :index="item.title||item.content"
                    @click="routerTo(item.url)">
                    <template #title>
                        <el-icon>
                            <message />
                        </el-icon>
                        <span>{{item.title}}</span>
                    </template>
                </el-menu-item>
            </template>
        </el-menu>

        <section class="collapse-icon">
            <el-icon v-if="!isCollapse"
                @click="isCollapse=!isCollapse">
                <arrow-left-bold />
            </el-icon>
            <el-icon v-if="isCollapse"
                @click="isCollapse=!isCollapse">
                <arrow-right-bold />
            </el-icon>

        </section>

    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Message, Menu, Setting, ArrowRightBold, ArrowLeftBold, PieChart } from '@element-plus/icons-vue';

export default defineComponent({
  components: {
    Message,
    ArrowRightBold,
    ArrowLeftBold
    // PieChart
    // Setting
    // 'icon-menu': Menu
  },
  setup() {
    const menus = [
      {
        title: 'home',
        url: '/home',
        index: '0',
        icon: ''
      },
      {
        title: 'echarts',
        url: '',
        index: '1',
        icon: '',
        children: [
          {
            content: 'line-echarts',
            url: '/lineEcharts',
            icon: '',
            index: '1-1'
          },
          {
            content: 'bar-echarts',
            url: '/barEcharts',
            icon: '',
            index: '1-2'
          }
        ]
      },
      {
        title: 'Vue Test',
        url: '',
        index: '2',
        icon: '',
        children: [
          {
            content: '测试父子通信',
            url: '/testCommunication',
            icon: '',
            index: '2-1'
          },
          {
            content: '测试ref 和 reactive',
            url: '/refAndReactive',
            icon: '',
            index: '2-2'
          },
          {
            content: '测试shallowRef 和 shallowReactive',
            url: '/shallowRefAndShallowReactive',
            icon: '',
            index: '2-3'
          },
          {
            content: '测试toRaw 和 makeRaw',
            url: '/toRawAndMakeRaw',
            icon: '',
            index: '2-4'
          },
          {
            content: '测试toRef 和 toRefs',
            url: '/toRefAndToRefs',
            icon: '',
            index: '2-5'
          },
          {
            content: '测试watch 和 watchEffect',
            url: '/watchAndWatchEffect',
            icon: '',
            index: '2-6'
          },
          {
            content: '通过v-bind获取js中的样式并且实现响应式更新',
            url: '/getSetupJsStyle',
            icon: '',
            index: '2-7'
          },
          {
            content: 'v-memo',
            url: '/vMemo',
            icon: '',
            index: '2-8'
          },
          {
            content: 'mixin-test',
            url: '/mixinTest',
            icon: '',
            index: '2-9'
          },
          {
            content: 'test-axios测试axios请求',
            url: '/testAxios',
            icon: '',
            index: '2-10'
          }
        ]
      },
      {
        title: '组件测试',
        url: '',
        index: '3',
        icon: '',
        children: [
          {
            content: 'svg-icon',
            url: '/iconSvg',
            icon: '',
            index: '3-1'
          }
        ]
      }
    //   {
    //     title: 'lodash',
    //     url: '',
    //     index: '3',
    //     icon: ''
    //   }
    ];
    const router = useRouter();
    const isCollapse = ref(false);
    const handleOpen = (key: any, keyPath: any) => {
      console.log(key, keyPath);
    };
    const handleClose = (key: any, keyPath: any) => {
      console.log(key, keyPath);
    };

    const routerTo = (name: string) => {
      router.push({ path: name });
    };
    return {
      isCollapse,
      handleOpen,
      handleClose,
      routerTo,
      menus
    };
  }
});
</script>

<style scoped lang="scss">
.menu {
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
	.el-menu {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		width: 250px;
        border: none;

	}
	.el-menu.el-menu--collapse {
		width: inherit;
	}
	.collapse-icon {
		height: 60px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		i {
            cursor: pointer;
			color: #000;
		}
	}
}
.el-menu {
	.el-sub-menu.is-active {
		.el-sub-menu__title {
			span {
				color: #409eff;
			}
		}
	}
}
</style>
