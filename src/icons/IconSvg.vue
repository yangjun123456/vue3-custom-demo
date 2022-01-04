<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'IconSvg',

  props: {
    // 当前 svg 的文件名，如 arrow-left.svg，该值就应该是 arrow-left
    filename: {
      type: String,
      required: true
    },

    // 自定义的 class，非必填
    className: {
      type: String,
      default: ''
    }
  },

  computed: {
    iconName() {
      return `#icon-${this.filename}`;
    },

    svgClass() {
      return 'svg-icon' + (this.className ? ' ' + this.className : '');
    }
  }
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
