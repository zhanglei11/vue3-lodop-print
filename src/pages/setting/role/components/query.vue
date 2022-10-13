<template>
  <SearchQuery>
    <a-col :span="4">
      <a-form-item :label="$t('setting.角色名称')" >
        <a-input
          type="text"
          v-model:value="formState.roleName"
          :placeholder="getPlaceholder(1)"
          :allowClear="true"
        ></a-input>
      </a-form-item>
    </a-col>
    <a-col :span="4">
      <a-form-item :label="$t('setting.权限字符')" >
        <a-input
          type="text"
          v-model:value="formState.roleKey"
          :placeholder="getPlaceholder(1)"
          :allowClear="true"
        ></a-input>
      </a-form-item>
    </a-col>

    <!-- <a-col :span="6">
      <a-form-item :label="$t('setting.创建时间')" >
        <a-range-picker
          :allowClear="true"
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
  roleName: any;
  roleKey: any;
  status: any;
  startTime: any;
  endTime: any;
}
import { public_form_empty, getPlaceholder, filterOption } from "@/pages/utils";
import { defineComponent, reactive, ref, onActivated } from "vue";
import IconCom from "@/components/modules/IconCom.vue";
import SearchQuery from "@/components/form/searchQuery.vue";
import SureReset from "@/components/form/sureReset.vue";
export default defineComponent({
  components: { IconCom, SearchQuery, SureReset },
  setup(props, ctx) {
    const formState = reactive<formStateTs>({
      roleName: null,
      roleKey: null,
      status: null,
      startTime: null,
      endTime: null,
    });

    const dateTimeValue = ref<any>([]);
    //选择时间
    const onChange = (val: any): void => {
      dateTimeValue.value = val;
      formState.startTime = !!dateTimeValue.value
        ? String(dateTimeValue.value[0])
        : null;
      formState.endTime = !!dateTimeValue.value
        ? String(dateTimeValue.value[1])
        : null;
    };

    //重置
    const reset = () => {
      public_form_empty(formState); //清空
      dateTimeValue.value = [];
    };

    //搜索
    const search = () => {
      ctx.emit("searchQuery", formState);
    };

    onActivated(() => {
      search();
    });

    return {
      formState,
      dateTimeValue,
      reset,
      search,
      getPlaceholder,
      filterOption,
      onChange,
    };
  },
});
</script>
