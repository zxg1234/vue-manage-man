import { defineStore } from 'pinia'

export const usehideSideBarStore = defineStore('hideSideBar', {
  state: () => ({
    isHidden: false,
    tableListData: [
      {
        "path": "/",
        "name": "home",
        "label": "首页",
        "icon": "HomeFilled",
        "url": "Home"
      }
    ]
  }),

  actions: {
    setHidden(isHidden) {
      this.isHidden = isHidden
    },
    deleteTag(item) {
      const index = this.tableListData.findIndex(t => t.name === item.name);
      if (index !== -1) {
        this.tableListData.splice(index, 1);
      }
    }
  }
})