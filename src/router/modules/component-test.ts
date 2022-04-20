export const componentRouteOptions = [
    {
        path: 'iconSvg',
        name: 'IconSvg',
        component: () => import('../../views/component-test/iconsvg-test/iconsvg-test.vue')
    },
    {
        path: 'elTabs',
        name: 'ElTabs',
        component: () => import('../../views/component-test/el-tabs/el-tabs.vue')
    },
    {
        path: 'exportDocx',
        name: 'ExportDocx',
        component: () => import('../../views/component-test/export-docx/index.vue')
    },
    {
        path: 'testFlexible',
        name: 'TestFlexible',
        component: () => import('../../views/component-test/test-flexible/test-flexible.vue')
    },
    {
        path: 'draggable',
        name: 'Draggable',
        component: () => import('../../views/component-test/jquery-ui/draggable.vue')
    }

]
