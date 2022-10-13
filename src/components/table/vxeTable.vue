<template>
  <vxe-toolbar ref="xToolbarRole" custom>
    <template #buttons>
      <slot name="leftButton"></slot>
    </template>
    <template #tools>
      <slot name="rightButton"></slot>
    </template>
  </vxe-toolbar>
  <a-col style="height: calc(100vh - 360px)">
    <vxe-table
      round
      :id="tableId"
      show-header-overflow
      show-overflow
      border
      ref="xTableRole"
      width="100%"
      auto-resize
      height="auto"
      :data="tableList"
      :loading="tableLoading"
      align="center"
      :sort-config="{ trigger: 'cell', orders: ['desc', 'asc', null] }"
      @sort-change="clickOrder"
    >
      <slot name="tableInfo"></slot>
    </vxe-table>
  </a-col>
  <vxe-pager
    v-if="tableType == 1"
    perfect
    :current-page="pageNumber"
    :page-size="pageSize"
    :total="totalSize"
    :page-sizes="pageSizesList"
    @page-change="handlePageTable"
    :layouts="layouts"
  ></vxe-pager>
</template>
<script lang="ts" setup>
// 公共页面不要修改 如果达不到你的要求 找zhangle 让他来改
import { VxeTableInstance, VxeToolbarInstance } from "vxe-table";
import { reactive, ref, onMounted } from "vue";
const pageSizesList = ref([10, 20, 50, 100]);
const layouts = ref(["PrevPage", "JumpNumber", "NextPage", "FullJump", "Sizes", "Total"]);
const xToolbarRole = ref({} as VxeToolbarInstance);
const xTableRole = ref({} as VxeTableInstance);
const emits = defineEmits();
const props = defineProps({
  id: {
    required: false,
    default: () => {
      return "roleTable";
    },
  },
  topHeight: {
    required: false,
    default: () => {
      return "360px";
    },
  },
  tableDate: {
    required: false,
  },
});
const tableList = ref([]); //数据
const tableLoading = ref(false);
const totalSize = ref(0); //总数
const pageNumber = ref(1); //当前页
const pageSize = ref(10); //每页数
const tableId = ref(props.id);
const topHeight = ref(props.topHeight);
//绑定vxe-table
const changevisible = () => {
  const $table = xTableRole.value;
  const $toolbar = xToolbarRole.value;
  $table.connect($toolbar);
};

onMounted(() => {
  changevisible();
});

//排序
const clickOrder = ({ column, prop, order }) => {
  emits("clickOrder", { column, prop, order });
};

//分页查询
const handlePageTable = ({ currentPage, pageSize }) => {
  emits("handlePage", { currentPage, pageSize });
};

const tableType = ref(1)
//处理数据
const setTableDate = (res,type=1) => {
  if(type == 1){
    tableList.value = res.data?.items ?? [];
    pageNumber.value = res.data?.pageNumber ?? 1;
    pageSize.value = res.data?.pageSize ?? 10;
    totalSize.value = res.data?.totalSize ?? 0;
  }else{
    tableList.value = res.data?? [];
  }
  tableType.value = type
};

defineExpose({
  tableLoading,
  setTableDate,
});
</script>