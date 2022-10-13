<template>
  <SearchQuery>
    <a-col :span="4">
      <a-form-item :label="$t('setting.菜单名称')" >
        <a-input
          type="text"
          v-model:value="formState.menuName"
          :placeholder="getPlaceholder(1)"
          :allowClear="true"
        ></a-input>
      </a-form-item>
    </a-col>
    <SureReset @search="search" @reset="reset" />
  </SearchQuery>
</template>
<script lang="ts">
interface formStateTs {
  menuName: any;
}
import { public_form_empty, getPlaceholder, filterOption } from "@/pages/utils";
import { defineComponent, reactive, ref, onActivated } from "vue";
import SearchQuery from "@/components/form/searchQuery.vue";
import SureReset from "@/components/form/sureReset.vue";
import IconCom from "@/components/modules/IconCom.vue";
export default defineComponent({
  components: { IconCom, SearchQuery, SureReset },
  setup(props, ctx) {
    const formState = reactive<formStateTs>({
      menuName: null,
    });

    //重置
    const reset = () => {
      public_form_empty(formState); //清空
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
      reset,
      search,
      getPlaceholder,
      filterOption,
    };
  },
});
</script>
<style lang="less" scoped>
.col-block {
  display: none;
}
</style>
