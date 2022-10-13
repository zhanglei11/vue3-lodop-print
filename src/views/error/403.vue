<template>
  <a-result
    status="403"
    title="403"
    sub-title="Sorry, you are not authorized to access this page."
  >
    <template #extra>
      <a-button type="primary" @click="backGo">Back Home</a-button>
    </template>
  </a-result>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route= useRoute();
//返回到上一页
const backGo = () => {
  router.push(route.query.url);
};
</script>
