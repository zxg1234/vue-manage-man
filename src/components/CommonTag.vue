<template>
  <div class="flex gap-2">
    <el-tag v-for="tag in tags"
     :key="tag.name" 
     :closable="tag.path !== '/'"
     :effect="$route.name === tag.name ? 'dark' : 'light'"
     :type="tag.type"
     @click="changeMenu(tag)"
     @close="handleClose(tag)"
     >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script setup>
import { usehideSideBarStore } from '@/store/header'
import { useRouter,useRoute  } from 'vue-router'

const hideSideBarStore = usehideSideBarStore()
const tags = hideSideBarStore.tableListData
const router = useRouter()
const route = useRoute()

const changeMenu = (tag) => {
  router.push(tag.path)
}

const handleClose = (tag) => {
  const index = tags.findIndex(t => t.name === tag.name);
  hideSideBarStore.deleteTag(tag);
  // 删除非高亮的标签
  if(route.name !== tag.name) return
  if(index === tags.length) {
    router.push(tags[index-1].path)
  } else {
    router.push(tags[index+1].path)
  }

}
</script>