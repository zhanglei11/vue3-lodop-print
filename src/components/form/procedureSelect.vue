<template>
  <!-- 工序 v2.0 -->
  <a-select
    v-model:value="ID_"
    :allowClear="true"
    :placeholder="getPlaceholder(2)"
    show-search
    :disabled="DIS_"
    :filterOption="filterOption"
    @change="changeID()"
    :mode="MODE_"
  >
    <a-select-option
      v-for="item in LIST_"
      :key="item.workingProcedureId"
      :value="item.workingProcedureId"
      :data="item.workingProcedureName"
    >
      {{ item.workingProcedureName }}
    </a-select-option>
  </a-select>
</template>
<script lang="ts" setup>
// 公共页面不要修改 如果达不到你的要求 找zhangle 让他来改
import { filterOption, getPlaceholder } from "@/utils/common";
import { ref } from "vue";
import { procedureList } from "@/apis/basic";
const emits = defineEmits();
const props = defineProps({
  ID: {
    required: true,
  },
  DIS: {
    required: false,
    default: () => {
      return false;
    },
  },
  MODE: {
    required: false,
    default: () => {
      return "combobox";
    },
  },
});
const ID_ = ref<any>(props.ID);
const DIS_ = ref<any>(props.DIS);
const MODE_ = ref<any>(props.MODE);
const LIST_ = ref<any>([]);
const getInit = (params: Object) => {
  LIST_.value = [];
  procedureList(params).then((res) => {
    if (res.errorCode == "00000") {
      LIST_.value = !res.data ? [] : res.data;
    } else {
      LIST_.value = [];
    }
  });
};

//重置
const reset = () => {
  ID_.value = MODE_.value == "combobox" ? null : [];
  changeID()
};

//重置所有
const resetList = () => {
  reset();
  LIST_.value = [];
};
const changeID = (): void => {
  let obj: Object = {
    value: null,
    label: null,
  };
  if (!!!ID_.value) {
    obj = {
      value: null,
      label: null,
    };
  } else {
    LIST_.value.forEach((item: Object) => {
      if (ID_.value == item.workingProcedureId) {
        (obj.value = item.workingProcedureId), (obj.label = item.workingProcedureName);
      }
    });
  }
  emits("changeZ", obj);
};
defineExpose({
  changeID,
  resetList,
  reset,
  getInit,
});
</script>
