import {defineStore} from 'pinia'
import axios from 'axios';
import {ref} from "vue";

export const useSideBarStore = defineStore('sidebar', {
  namespaced: true,
  state: () => ({
    sideBarOpen: false,
    fullScreenSideBarOpen: true,
  }),
  getters: {
    sideBarOpenGetter: (state) => state.sideBarOpen,
    fullScreenSideBarOpenGetter: (state) => state.fullScreenSideBarOpen,
  },
  actions: {
    toggleSidebar() {
      this.sideBarOpen = !this.sideBarOpen;
    },
    toggleFullScreenSidebar() {
      this.fullScreenSideBarOpen = !this.fullScreenSideBarOpen;
    },
  },
  persist: true,
})
