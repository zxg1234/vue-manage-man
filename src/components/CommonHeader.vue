<template>
  <div class="contaner">
    <div class="l-content">
      <el-button @click="isCollapse" icon="Menu" size="small" />
      <div class="l-bread-content">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in tableListData" :key="item.name" :to="{ path: item.path }">{{ item.label
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="r-content">
      <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link">
          <img class="user-avatar" src="../assets/img/img.png" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>

          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { usehideSideBarStore } from '@/store/header'

const hideSideBarStore = usehideSideBarStore()
const tableListData = hideSideBarStore.tableListData

function isCollapse() {
  hideSideBarStore.setHidden(!hideSideBarStore.isHidden)
}
</script>

<style lang="less" scoped>
.contaner {
  background-color: black;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;

  .l-content {
    display: flex;
    align-items: center;

    .text {
      color: #fff;
      font-size: 14px;
      padding-left: 10px;
    }

    .l-bread-content {
      margin-left: 20px;

      /deep/.el-breadcrumb__item {
        .el-breadcrumb__inner {
          font-weight: normal;

          &.is-link {
            color: #666;
          }

        }

        &:last-child {
          .el-breadcrumb__inner {
            color: #fff;
          }

        }
      }
    }
  }

  .r-content {
    padding-right: 20px;

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

}
</style>