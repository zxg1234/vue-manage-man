<template>

    <el-menu 
    text-color="#fff" 
    active-text-color="#ffd04b" 
    background-color="#545c64"
    :collapse="isCollapse"
     :width="isCollapse ? '64px' : '200px'"
    >
      <h3>{{ isCollapse ? '管理' : '管理系统' }}</h3>
      <el-menu-item @click="changeRouter(item)" v-for="item in noneChildren" :key="item.name" :index="item.name">
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu v-for="item in hasChildren" :key="item.label" :index="item.label">
        <template #title>
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item v-for="subItem in item.children" :key="subItem.name" :index="subItem.name">
          <el-icon>
            <component :is="subItem.icon" />
          </el-icon>
          <span>{{ subItem.label }}</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>


</template>


<script setup>


import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router'
import { usehideSideBarStore } from '@/store/header'

const menuData = reactive(
  [
    {
      "path": "/",
      "name": "home",
      "label": "首页",
      "icon": "HomeFilled",
      "url": "Home"
    },
    {
      "path": "/mall",
      "name": "mall",
      "label": "商品管理",
      "icon": "VideoPlay",
      "url": "MallManage/MallManage"
    },
    {
      "path": "/user",
      "name": "user",
      "label": "用户管理",
      "icon": "user",
      "url": "UserManage/UserManage"
    },
    {

      "label": "其他",
      "icon": "location",
      "children": [
        {
          "path": "/page1",
          "name": "page1",
          "label": "页面1",
          "icon": "setting",
          "url": "Other/PageOne"
        },
        {
          "path": "/page2",
          "name": "page2",
          "label": "页面2",
          "icon": "setting",
          "url": "Other/PageTwo"
        }
      ]
    },
  ]
);


const hideSideBarStore = usehideSideBarStore()

const noneChildren = computed(() => {
  return menuData.filter(item => !item.children);
});

const isCollapse = computed(() => {
  return hideSideBarStore.isHidden
})
const hasChildren = computed(() => {
  return menuData.filter(item => item.children);
});


const router = useRouter();
const changeRouter = (item) => {
  if (item.path && item.path !== router.path) {
    router.push(item.path)
  }
  const index = hideSideBarStore.tableListData.findIndex(i => i.name === item.name);
  if (index === -1) {
     hideSideBarStore.tableListData.push(item);
  }
}
</script>


<style scoped lang="less">
.el-menu {
  height: 100vh;
  border:0
}

h3 {
  color: #fff;
  text-align: center;
  line-height: 40px;
}
</style>