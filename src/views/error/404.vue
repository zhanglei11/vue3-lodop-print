<template>
  <a-result
    status="404"
    title="404"
    sub-title="Sorry, the page you visited does not exist."
  >
    <template #extra>
      <a-button type="primary" @click="backGo">Back Home</a-button>
    </template>
  </a-result>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const backGo = () => {
  router.push(route.query.url);
};
</script>
