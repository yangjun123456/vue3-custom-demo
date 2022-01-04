<template>
  <!-- v-on="$listeners" -->
  <svg :class="svgClass"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
    aria-hidden="true"
    title
    mode="open"
    :style="{ width: size, height: size }">
    <use title
      :xlink:href="name" />
    <title></title>
  </svg>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
// import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Options({
  components: {},
  props: {
    iconClass: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '14px'
    },
    hover: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      oldIconClass: '',
      iconName: ''
    };
  },
  mounted() {
    this.oldIconClass = this.iconClass;
    this.name = this.iconClass;
  },
  methods: {
    mouseenter() {
      if (this.hover) {
        this.iconName = `#icon-${this.hover}`;
      }
    },

    mouseleave() {
      if (this.hover) {
        this.iconName = `#icon-${this.oldIconClass}`;
      }
    }
  },
  get name() {
    return this.iconName;
  },
  set name(val: string) {
    this.iconName = `#icon-${val}`;
  },
  get svgClass() {
    if (this.className) {
      return 'svg-icon ' + this.className;
    } else {
      return 'svg-icon';
    }
  },

  watch: {
    iconClass: {
      handler(val) {
        this.iconName = `#icon-${val}`;
      },
      immediate: true,
      deep: true
    }
  }
})
export default class IconSvg extends Vue {
  // @Watch('iconClass')
  // iconClassChange(val: string) {
  //   this.iconName = `#icon-${val}`;
  // }
  // get name() {
  //   return this.iconName;
  // }
  // set name(val: string) {
  //   this.iconName = `#icon-${val}`;
  // }
  // get svgClass() {
  //   if (this.className) {
  //     return 'svg-icon ' + this.className;
  //   } else {
  //     return 'svg-icon';
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.svg-icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
</style>
