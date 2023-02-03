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
			:default-active="defaultActive"
			@select="handleSelect"
			@close="handleClose">
			<template v-for="(item) in menus">
				<el-sub-menu v-if="item.children"
					:key="item.index"
					:index="item.index">
					<template #title>
						<el-icon>
							<message />
						</el-icon>
						<span>{{item.title}}</span>
					</template>

					<template v-for="(cont) in item.children">
						<el-sub-menu v-if="cont.children"
							:key="cont.index"
							:index="cont.index">
							<template #title>
								<el-icon>
									<message />
								</el-icon>
								<span>{{cont.title}}</span>
							</template>
							<el-menu-item v-for="childMenu in cont.children"
								:key="childMenu.title"
								:index="childMenu.index "
								@click="routerTo(childMenu)">
								{{ childMenu.title }}
							</el-menu-item>
						</el-sub-menu>
						<el-menu-item v-else
							:key="cont.index"
							:index="cont.index"
							@click="routerTo(cont)">
							<template #title>
								<el-icon>
									<message />
								</el-icon>
								<span>{{cont.title}}</span>
							</template>
						</el-menu-item>
					</template>
				</el-sub-menu>
				<el-menu-item v-else
					:key="item.index"
					:index="item.index"
					@click="routerTo(item)">
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
                        title: 'line-echarts',
                        url: '/lineEcharts',
                        icon: '',
                        index: '1-1'
                    },
                    {
                        title: 'bar-echarts',
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
                        title: '测试父子通信',
                        url: '/testCommunication',
                        icon: '',
                        index: '2-1'
                    },
                    {
                        title: '测试ref 和 reactive',
                        url: '/refAndReactive',
                        icon: '',
                        index: '2-2'
                    },
                    {
                        title: '测试shallowRef 和 shallowReactive',
                        url: '/shallowRefAndShallowReactive',
                        icon: '',
                        index: '2-3'
                    },
                    {
                        title: '测试toRaw 和 makeRaw',
                        url: '/toRawAndMakeRaw',
                        icon: '',
                        index: '2-4'
                    },
                    {
                        title: '测试toRef 和 toRefs',
                        url: '/toRefAndToRefs',
                        icon: '',
                        index: '2-5'
                    },
                    {
                        title: '测试watch 和 watchEffect',
                        url: '/watchAndWatchEffect',
                        icon: '',
                        index: '2-6'
                    },
                    {
                        title: '通过v-bind获取js中的样式并且实现响应式更新',
                        url: '/getSetupJsStyle',
                        icon: '',
                        index: '2-7'
                    },
                    {
                        title: 'v-memo',
                        url: '/vMemo',
                        icon: '',
                        index: '2-8'
                    },
                    {
                        title: 'mixin-test',
                        url: '/mixinTest',
                        icon: '',
                        index: '2-9'
                    },
                    {
                        title: 'test-axios测试axios请求',
                        url: '/testAxios',
                        icon: '',
                        index: '2-10'
                    },
                    {
                        title: 'vueI18n-测试',
                        url: '/vueI18n',
                        icon: '',
                        index: '2-11'
                    },
                    {
                        title: '自定义指令测试',
                        url: '/testCustomDirective',
                        icon: '',
                        index: '2-12'
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
                        title: 'svg-icon',
                        url: '/iconSvg',
                        icon: '',
                        index: '3-1'
                    },
                    {
                        title: 'el-tabs 测试tabs中是否能获取到refs',
                        url: '/elTabs',
                        icon: '',
                        index: '3-2'
                    },
                    {
                        title: '测试导出docx插件-导出html为docx文件',
                        url: '/exportDocx',
                        icon: '',
                        index: '3-3'
                    },
                    {
                        title: '测试flexible转换px-rem实现响应式',
                        url: '/testFlexible',
                        icon: '',
                        index: '3-4'
                    },
                    // {
                    //     title: 'jquery-ui',
                    //     url: '',
                    //     icon: '',
                    //     index: '3-5',
                    //     children: [
                    //         {
                    //             title: 'draggable',
                    //             url: '/draggable',
                    //             icon: '',
                    //             index: '3-5-1'
                    //         }
                    //     ]
                    // },
                    {
                        title: '字体包测试',
                        url: '/fontFamilyTestCom',
                        icon: '',
                        index: '3-6'
                    },
                    {
                        title: 'pdf文件转为png',
                        url: '/transPdfToImg',
                        icon: '',
                        index: '3-7'
                    },
                    {
                        title: 'Table表格组件',
                        url: '/table',
                        icon: '',
                        index: '3-8'
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
        const handleSelect = (key: string, keyPath: string[]) => {
            console.log(key, keyPath);
            defaultActive.value = key;
        };

        const routerTo = (item: any) => {
            // defaultActive.value = item.index;
            router.push({ path: item.url });
        };
        const defaultActive = ref<string>('3-2');
        return {
            defaultActive,
            isCollapse,
            handleOpen,
            handleClose,
            handleSelect,
            routerTo,
            menus
        };
    }
});
</script>

<style scoped lang="scss">
.menu {
	height: calc(100vh - 60px);
	display: flex;
	flex-direction: column;
	position: relative;
	.el-menu {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		width: 300px;
		border: none;
	}
	.el-menu.el-menu--collapse {
		width: 70px;
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
	// 一级菜单选中样式
	& > .el-sub-menu.is-active {
		& > .el-sub-menu__title {
			span {
				color: #409eff;
			}
		}
		// 二级菜单选中样式
		& > .el-sub-menu.is-active {
			& > .el-sub-menu__title {
				span {
					color: #409eff;
				}
			}
			// 三级菜单选中样式
			& > .el-sub-menu.is-active {
				& > .el-sub-menu__title {
					span {
						color: #409eff;
					}
				}
				// 四级菜单选中样式
				& > .el-sub-menu.is-active {
					& > .el-sub-menu__title {
						span {
							color: #409eff;
						}
					}
				}
			}
		}
	}
}
</style>
