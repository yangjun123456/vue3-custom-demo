<template>
	<div style="overflow:auto;">
		<el-dropdown trigger="click"
			class="vue-asdfasdf">
			<el-button type="primary">
				<span>{{$t('changeLanguage.btnText')}}</span>
				<el-icon class="el-icon--right">
					<arrow-down />
				</el-icon>
			</el-button>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item class="drop-menu"
						@click="changeLanguage('zh')">{{$t('changeLanguage.zh')}}</el-dropdown-item>
					<el-dropdown-item class="drop-menu"
						@click="changeLanguage('en')">{{$t('changeLanguage.en')}}</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
		<br>
		<br>
		<br>
		<h1>name测试</h1>
		name: {{$t('test.name')}}
		<br>
		<br>
		<br>
		<h1>遍历 动态获取</h1>
		<ul>
			<template v-for="(item,index) of list"
				:key="index">
				<li>{{$t(`list.${item.en}`)}}</li>
			</template>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, shallowRef, triggerRef, defineAsyncComponent } from 'vue';
import { interval, take, timer } from 'rxjs';
import { ArrowDown } from '@element-plus/icons-vue';
import { useI18n } from 'vue-i18n';
const VueI18n = defineComponent({
  name: 'VueI18n',
  components: {
    ArrowDown
  },
  setup(props, context) {
    const language = ref<string>('zh');
    const i18n = useI18n();
    const $t = i18n.t;
    const changeLanguage = (languageStr: any) => {
      i18n.locale.value = languageStr;
      const str = ref('btnText');
      console.log($t(`changeLanguage.${str.value}`));
    };
    const languageList = ref(['zh', 'en']);
    const list = ref([
      {
        content: '第一',
        en: 'first'
      },
      {
        content: '第二',
        en: 'second'
      },
      {
        content: '第三',
        en: 'third'
      },
      {
        content: '第四',
        en: 'fourth'
      }
    ]);

    return { props, changeLanguage, list, language, languageList };
  }
});
export default VueI18n;
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
.drop-menu {
	width: 100px;
}
</style>
