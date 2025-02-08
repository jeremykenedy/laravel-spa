import {defineStore} from 'pinia'
import axios from 'axios';
import {ref} from "vue";

export const useSideBarStore = defineStore('sidebar', () => {

  state: () => {
    return {
      sideBarOpen: false,
      fullScreenSideBarOpen: true,
    }
  },

  return {}
}, {
  persist: true
})
