<template>
  <svg :width="w" :height="h" :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg" :stroke="stroke">
    <g fill="none" fill-rule="evenodd">
      <g transform="translate(1 1)" stroke-width="2">
        <circle stroke-opacity=".8" cx="18" cy="18" r="18" />
        <path d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    stroke: {
      type: String,
      default: '#ffffff',
    },
    w: {
      type: Number,
      default: 38,
    },
    h: {
      type: Number,
      default: 38,
    },
  },
  computed: {
    viewBox() {
      return `0 0 ${this.w} ${this.h}`;
    },
  },
};
</script>
