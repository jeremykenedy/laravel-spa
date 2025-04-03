<template>
  <a
    v-if="octocatEnabled"
    :href="url"
    :target="blankAttr"
    :rel="relAttr"
    class="github-corner"
    :class="position"
    aria-label="View on GitHub"
    @click="track(`OctoCat clicked`)"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :style="svgStyle"
      viewBox="0 0 250 250"
      :fill="color"
      height="80"
      width="80"
    >
      <path d="m249.578,250.294C163.683,162.067 87.406,88.123 -0.422,0.294 H 249.578z" />
      <path
        fill="currentColor"
        d="m194.579,71.296c-2,-4 -5.003,-7.999 -9.003,-11.999 -3.999,-3.999 -7.999,-7.003 -11.999,-9.003 -4,-14 -8.997,-16.998 -8.997,-16.998 -8,3.999 -11.005,8.999 -11.005,10.999 -6,0 -10.997,2.001 -15.997,7.001 -16,16 -10.002,29.997 -2.002,40.997 -3,0 -6.999,0.999 -10.999,4.999 L 113.579,109.297c-2,1 -5.999,-1.001 -5.999,-1.001 l 26.996,26.996c0,0 -1.999,-3.998 0,-4.998 l 14.001,-14.001c2,-3 3.002,-5.995 3.002,-7.995 11,8 23.997,14.998 40.997,-2.001 5,-5 7,-9.997 7,-15.997 -0.903,-9.744 -2.806,-14.230 -4.998,-19z"
      />
      <path
        fill="currentColor"
        :class="animatedArm ? 'octo-arm' : ''"
        d="m121.286,101.847c-14.999,-9 -8.999,-19 -8.999,-19 2.999,-6.999 1.999,-10.999 1.999,-10.999 -1,-7 3,-1.999 3,-1.999 4,4.999 2,11 2,11 -2.999,9.999 5,14.999 9,15.999"
        style="transform-origin: 130px 106px"
      />
      <path
        fill="currentColor"
        :class="animatedEar ? 'octo-ear' : ''"
        d="m210.616,77.354c0,0 -2.997,-5 -15.997,-7 -0.014,-0.028 0.007,0.014 0,0 -0.007,-0.014 -3.990,0.468 -3.990,0.468 l 5.446,19.797 3.572,-1.284c2.015,-1.004 6.983,-3.016 10.968,-11.981z"
        style="transform-origin: 170px 100px"
      />
      <path
        v-if="showFace"
        :fill="isDarkMode ? faceColorDark : faceColor"
        class="octo-face"
        d="m157.893,66.610c-3.695,-3.732 -7.911,-5.499 -12.189,-5.109 -4.402,0.402 -7.139,2.856 -7.874,3.598 -7.076,7.147 -5.830,16.656 3.507,26.774 1.749,1.898 3.654,3.889 5.663,5.918 1.988,2.008 3.993,3.970 5.960,5.829 11.661,11.032 19.883,7.516 24.726,2.623 4.699,-4.747 6.925,-12.647 -0.935,-20.588 -0.193,-0.195 -0.515,-0.479 -1.318,-1.179 -1.714,-1.495 -4.904,-4.280 -7.845,-7.250 -3.247,-3.280 -6.325,-6.797 -8.162,-8.899 -0.857,-0.980 -1.279,-1.464 -1.531,-1.718z"
      />
      <path
        v-if="showFace"
        fill="currentColor"
        d="m152.148,95.779c-0.167,-0.167 -0.439,-0.167 -0.607,-6e-6 -0.669,0.669 -2.203,0.630 -3.256,-0.421 -0.151,-0.151 -0.281,-0.314 -0.390,-0.484 -0.274,-0.424 -0.425,-0.891 -0.491,-1.329 -0.013,-0.087 -0.023,-0.174 -0.030,-0.259 -0.021,-0.254 -0.014,-0.493 0.011,-0.702 0.042,-0.347 0.136,-0.610 0.243,-0.717 0.167,-0.167 0.167,-0.439 0,-0.607 -0.167,-0.167 -0.439,-0.167 -0.607,-10e-7 -0.086,0.086 -0.165,0.201 -0.234,0.337 -0.102,0.205 -0.183,0.460 -0.232,0.749 -0.049,0.288 -0.066,0.609 -0.045,0.945 0.021,0.336 0.082,0.687 0.191,1.036 0.135,0.435 0.346,0.867 0.647,1.260 0.100,0.130 0.210,0.257 0.331,0.378 0.630,0.630 1.382,0.973 2.108,1.079 0.103,0.015 0.206,0.025 0.308,0.031 0.204,0.011 0.405,0.003 0.598,-0.021 0.483,-0.062 0.922,-0.235 1.263,-0.498 0.068,-0.052 0.132,-0.109 0.192,-0.168 0.168,-0.167 0.168,-0.439 3.6e-4,-0.607z"
      />
      <path
        v-if="showFace"
        fill="currentColor"
        d="m150.730,91.109c-0.036,0.186 -0.036,0.378 -1e-5,0.565 0.013,0.069 0.032,0.139 0.055,0.206 0.047,0.135 0.114,0.265 0.203,0.385 0.044,0.059 0.093,0.117 0.147,0.171 0.216,0.216 0.483,0.352 0.763,0.406 0.116,0.022 0.235,0.031 0.353,0.025 0.164,-0.007 0.325,-0.053 0.480,-0.116 0.178,-0.072 0.349,-0.170 0.494,-0.315 0.577,-0.577 0.577,-1.514 1.7e-4,-2.092 -0.288,-0.288 -0.667,-0.433 -1.046,-0.433 -0.016,-2.1e-5 -0.032,0.004 -0.049,0.004 -0.111,0.003 -0.221,0.022 -0.329,0.050 -0.151,0.040 -0.299,0.098 -0.435,0.188 -0.082,0.054 -0.159,0.117 -0.232,0.189 -0.072,0.072 -0.135,0.150 -0.189,0.232 -0.108,0.163 -0.180,0.344 -0.216,0.531z"
      />
      <path
        v-if="showFace"
        fill="currentColor"
        d="m153.954,72.390c0.049,-0.477 0.051,-0.942 0.004,-1.387 -0.047,-0.444 -0.142,-0.869 -0.288,-1.266 -0.145,-0.397 -0.341,-0.767 -0.589,-1.103 -0.123,-0.167 -0.260,-0.327 -0.410,-0.476 -2.395,-2.395 -7.230,-1.443 -10.799,2.126 -3.569,3.569 -4.116,7.999 -1.721,10.394 0.149,0.149 0.307,0.288 0.472,0.414 0.329,0.253 0.688,0.460 1.070,0.621 0.381,0.161 0.787,0.276 1.210,0.344 0.422,0.068 0.863,0.090 1.316,0.066 0.452,-0.024 0.917,-0.095 1.388,-0.212 1.648,-0.411 3.374,-1.394 4.936,-2.956 1.561,-1.561 2.622,-3.365 3.120,-5.101 0.142,-0.496 0.239,-0.986 0.288,-1.464z"
      />
      <path
        v-if="showFace"
        fill="currentColor"
        :class="animatedEye ? 'octo-eye' : ''"
        d="m176.110,91.594c-2.395,-2.395 -7.230,-1.443 -10.799,2.126 -3.569,3.569 -4.116,7.999 -1.721,10.394 2.395,2.395 6.825,1.848 10.394,-1.721 3.569,-3.569 4.521,-8.404 2.126,-10.799z"
        style="transform-origin: 170px 100px"
      />
    </svg>
  </a>
</template>

<script>
import { track } from '@services/analytics';
import { mapStores, mapState, mapActions } from 'pinia';
import { useAuthStore } from '@store/auth';

export default {
  name: 'OctoCat',
  props: {
    blank: {
      type: Boolean,
      default: true,
    },
    showFace: {
      type: Boolean,
      default: false,
    },
    animatedEye: {
      type: Boolean,
      default: false,
    },
    animatedEar: {
      type: Boolean,
      default: false,
    },
    animatedArm: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: 'left-top',
      validator(value) {
        return ['left-top', 'right-top', 'left-bottom', 'right-bottom'].includes(value);
      },
    },
    bgColor: {
      type: String,
      default: '#64748B',
    },
    color: {
      type: String,
      default: '#ffffff',
    },
    faceColor: {
      type: String,
      default: '#64748B',
    },
    bgColorDark: {
      type: String,
      default: '#64748B',
    },
    colorDark: {
      type: String,
      default: '#1E293B',
    },
    faceColorDark: {
      type: String,
      default: '#ffffff',
    },
  },
  mounted() {
    if (this.user && this.user.id) {
      localStorage.setItem('data-theme', this.user.theme_dark);
      if (this.user.theme_dark) {
        this.darkMode = 'dark';
      } else {
        this.darkMode = 'light';
      }
    } else {
      this.darkMode = localStorage.getItem('data-theme');
    }
    window.addEventListener('theme-localstorage-changed', (event) => {
      this.darkMode = event.detail.storage;
    });
  },
  computed: {
    ...mapState(useAuthStore, ['user', 'authenticated']),
    isDarkMode() {
      if (this.darkMode == 'dark') {
        return true;
      }
      return false;
    },
    octocatEnabled() {
      return OCTOCAT_ENABLED;
    },
    url() {
      return `${OCTOCAT_BASE_URL}/${OCTOCAT_USERNAME}/${OCTOCAT_REPO}`;
    },
    svgStyle() {
      let positionStyles = {};
      switch (this.position) {
        case 'left-top':
          positionStyles = {
            top: 0,
            left: 0,
            transform: 'rotate(-90deg)',
          };
          break;
        case 'right-top':
          positionStyles = {
            top: 0,
            right: 0,
          };
          break;
        case 'left-bottom':
          positionStyles = {
            bottom: 0,
            left: 0,
            transform: 'rotate(-180deg)',
          };
          break;
        case 'right-bottom':
          positionStyles = {
            bottom: 0,
            right: 0,
            transform: 'rotate(90deg)',
          };
          break;
      }
      return {
        fill: this.isDarkMode ? this.bgColorDark : this.bgColor,
        color: this.isDarkMode ? this.colorDark : this.color,
        position: 'absolute',
        border: 0,
        ...positionStyles,
      };
    },
    blankAttr() {
      return this.blank ? '_blank' : null;
    },
    relAttr() {
      return this.blank ? 'noopener noreferrer' : null;
    },
  },
  data() {
    return {
      darkMode: false,
    };
  },
  methods: {
    track,
  },
};
</script>

<style lang="scss" scoped>
.github-corner {
  display: none;
  position: absolute;
  z-index: 9999;

  &.left-top {
    top: 1px;
    left: 0;
  }

  &.right-top {
    top: 1px;
    right: 0;
  }

  &.left-bottom {
    bottom: 0;
    left: 0;
  }

  &.right-bottom {
    bottom: 0;
    right: 0;
  }

  &:hover {
    .octo-face {
      display: inline;
    }
  }

  .octo-face {
    display: none;
  }

  &:hover {
    .octo-arm {
      animation: octocat-wave 560ms ease-in-out infinite;
    }

    .octo-ear {
      animation: octocat-twitch 560ms ease-in-out infinite;
    }

    .octo-eye {
      animation: octocat-blink 560ms ease-in-out infinite;
    }
  }
}

@media (min-width: 768px) {
  .github-corner {
    display: block;
  }
}

@media (max-width: 900px) {
  .github-corner {
    .octo-arm {
      animation: octocat-wave 560ms ease-in-out 3;
    }

    .octo-ear {
      animation: octocat-twitch 560ms ease-in-out 2;
    }

    .octo-eye {
      animation: octocat-blink 560ms ease-in-out 1;
    }

    &:hover {
      .octo-face {
        display: inline;
      }

      .octo-arm {
        animation: none;
      }

      .octo-ear {
        animation: none;
      }

      .octo-eye {
        animation: octocat-blink 560ms ease-in-out infinite;
      }
    }
  }
}

@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0deg);
  }

  20%,
  60% {
    transform: rotate(-25deg);
  }

  40%,
  80% {
    transform: rotate(10deg);
  }
}

@keyframes octocat-twitch {
  0%,
  100% {
    transform: rotate(0deg);
  }

  25%,
  75% {
    transform: rotate(6deg);
  }

  50% {
    transform: rotate(-4deg) scale(1);
  }
}

@keyframes octocat-blink {
  0%,
  25%,
  100% {
    transform: scale(1);
  }

  60% {
    transform: scale(0, 0);
  }

  85% {
    transform: scale(0.8, 0.8);
  }
}
</style>
