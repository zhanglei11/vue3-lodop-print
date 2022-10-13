<template>
  <a-modal
    v-model:visible="visible"
    :centered="state.modalCentered"
    :closable="state.modalClosable"
    :destroyOnClose="state.modalDestroyOnClose"
    :confirmLoading="state.modalConfirmLoading"
    :keyboard="state.modalKeyboard"
    :maskClosable="state.modalMaskClosable"
    :width="state.modalWidth"
    :zIndex="state.modalZIndex"
    @ok="handleOk"
    @cancel="handCancel"
  >
    <!-- 标题 -->
    <template #title>
      <template v-if="!isTitleSlot">
        {{ state.modalTitle }}
      </template>
      <slot name="titleSlot"></slot>
    </template>

    <!-- 底部 -->
    <template #footer>
      <template v-if="!isFooterSlot">
        <a-button @click="handCancel">{{ state.modalCancelText }}</a-button>
        <a-button type="primary" @click="handleOk">{{ state.modalOkText }} </a-button>
      </template>
      <slot name="footerSlot"></slot>
    </template>
    <!-- 内容 -->
    <slot></slot>
  </a-modal>
</template>
<script lang="ts" setup>
/**
此公共组件由本人亲自修改
 */
import {
  ref,
  reactive,
  toRefs,
  onMounted,
} from "vue";
import { useI18n } from "vue-i18n";
const emits = defineEmits();
const props = defineProps({
  modalProps: {
    required: false,
    default: {},
  },
});
const { t } = useI18n();
const visible = ref<boolean>(true);
const saveLoading = ref<boolean>(false);
//弹框初始值
const state = reactive({
  modalTitle: "Modal", //标题
  modalWidth: "500px", //宽度
  modalOkText: t("base.confirm"), //确定提示语
  modalCancelText: t("base.cancel"), //取消提示语
  modalCentered: false, //垂直居中展示 Modal
  modalClosable: true, //是否显示右上角的按钮
  modalDestroyOnClose: true, //关闭时销毁 Modal 里的子元素
  modalConfirmLoading: false, //确定按钮 loading
  modalKeyboard: false, //是否支持键盘 esc 关闭
  modalMaskClosable: false, //点击蒙层是否允许关闭
  modalZIndex: 1000, //设置 Modal 的 z-index
  isTitleSlot: false, //设置默认头部
  isFooterSlot: false, //设置默认底部
  layout: "Horizontal", //表单排列方式
});

//modalProps 对象值按照state中配置
onMounted(() => {
  mergeObject(state, props.modalProps);
});

//取消
const handCancel = () => {
  emits("handleCancel");
};

//确定
const handleOk = () => {
  if (saveLoading.value) return;
  saveLoading.value = true;
  emits("handleOk");
  setTimeout(() => {
    saveLoading.value = false;
  }, 1000);
};

//合并对象
const mergeObject = (objectA: Object, objectB: Object) => {
  Object.keys(objectA).forEach((key) => {
    objectA[key] = objectB[key] == undefined ? objectA[key] : objectB[key];
  });
  return objectA;
};

</script>
