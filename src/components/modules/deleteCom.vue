<template>
  <a-tooltip placement="topLeft" :title="$t('base.删除')">
    <a-popconfirm
      :title="$t('base.sureDelete')"
      :ok-text="$t('base.yes')"
      :cancel-text="$t('base.no')"
      @confirm="confirmSure()"
    >
      <a-button :type="_type">
        <template #icon>
          <IconCom :type="_iconType" />
        </template>
      </a-button>
    </a-popconfirm>
  </a-tooltip>
</template>
<script lang="ts" setup>
// 公共页面不要修改 如果达不到你的要求 找zhangle 让他来改
import { ref } from "vue";
import IconCom from "./IconCom.vue";
const emits = defineEmits();
const props = defineProps({
  row: {
    //参数数组
    required: true,
    default: {},
  },
  type: {
    //button按钮类型
    required: false,
    default: "danger",
  },
  iconType: {
    //图标类型
    required: false,
    default: "DeleteOutlined",
  },
});

const _type = ref(props.type);
const _iconType = ref(props.iconType);
const confirmSure = () => {
  emits("confirmSure", props.row);
};
defineExpose({
  confirmSure,
});
</script>
