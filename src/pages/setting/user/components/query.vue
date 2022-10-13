<template>
  <SearchQuery>
    <a-col :span="4">
      <a-form-item :label="$t('setting.部门')">
        <DepartSelect
          ref="departSelectRef"
          :ID="formState.deptId"
          @changeZ="changeDepart"
        ></DepartSelect>
      </a-form-item>
    </a-col>
    <a-col :span="4">
      <a-form-item :label="$t('setting.用户名称')">
        <a-input
          type="text"
          v-model:value="formState.userName"
          :placeholder="getPlaceholder(1)"
          :allowClear="true"
        ></a-input>
      </a-form-item>
    </a-col>
    <a-col :span="4">
      <a-form-item :label="$t('setting.手机号')">
        <a-input
          type="text"
          v-model:value="formState.mobile"
          :placeholder="getPlaceholder(1)"
          :allowClear="true"
        ></a-input>
      </a-form-item>
    </a-col>
    <!-- <a-col :span="6">
      <a-form-item :label="$t('setting.创建时间')">
        <a-range-picker
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          :placeholder="getPlaceholder(3)"
          :value="dateTimeValue"
          @change="onChange"
        />
      </a-form-item>
    </a-col> -->
    <SureReset @search="search" @reset="reset" />
  </SearchQuery>
</template>
<script lang="ts">
interface formStateTs {
  userName: any;
  mobile: any;
  status: any;
  startTime: any;
  endTime: any;
  deptId: any;
}

import {
  public_form_empty,
  getPlaceholder,
  filterOption,
  handleTree,
} from "@/pages/utils";
import { defineComponent, reactive, onMounted, ref, onActivated } from "vue";
import IconCom from "@/components/modules/IconCom.vue";
import DepartSelect from "@/components/form/departSelect.vue";
import SearchQuery from "@/components/form/searchQuery.vue";
import SureReset from "@/components/form/sureReset.vue";
export default defineComponent({
  components: { IconCom, DepartSelect, SearchQuery, SureReset },
  setup(props, ctx) {
    const departSelectRef: any = ref(null);
    onMounted(() => {
      departSelectRef.value.getInit();
    });

    const formState = reactive<formStateTs>({
      userName: null,
      mobile: null,
      status: null,
      startTime: null,
      endTime: null,
      deptId: null,
    });

    const dateTimeValue = ref<any>([]);
    //选择时间
    const onChange = (val: any): void => {
      dateTimeValue.value = val;
      formState.startTime = !!dateTimeValue.value ? String(dateTimeValue.value[0]) : null;
      formState.endTime = !!dateTimeValue.value ? String(dateTimeValue.value[1]) : null;
    };

    //重置
    const reset = () => {
      public_form_empty(formState); //清空
      dateTimeValue.value = [];
      departSelectRef.value.reset();
    };

    //搜索
    const search = () => {
      ctx.emit("searchQuery", formState);
    };

    //部门
    const changeDepart = ({ value }: any) => {
      formState.deptId = value;
    };
    onActivated(() => {
      search();
    });

    return {
      departSelectRef,
      formState,
      dateTimeValue,
      reset,
      search,
      getPlaceholder,
      filterOption,
      onChange,
      changeDepart,
    };
  },
});
</script>
<style lang="less" scoped>
.col-block {
  display: none;
}
// .aside-left {
//   flex: 0 0 150px;
//   max-width: 150px;
//   min-width: 150px;
//   width: 150px;
//   float: left;
// }
// .aside-right {
//   flex: 1; /* 随父级变化 */
//   margin-left: 150px;
// }
</style>
