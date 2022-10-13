<template>
  <a-card :bordered="false">
    <Query ref="queryRef" @searchQuery="searchQuery" />
  </a-card>
  <a-card :bordered="false">
    <AddModal ref="addModalRef" @addSubmit="addSubmit" />
    <vxe-toolbar ref="xToolbarDept" custom>
      <template #buttons></template>
      <template #tools ref="xToolbarDept">
        <a-button type="primary" @click="add({}, 'add')">
          <template #icon>
            <IconCom type="PlusOutlined" />
          </template>
          {{ $t("base.新建") }}
        </a-button>
      </template>
    </vxe-toolbar>
    <a-col style="height: calc(100vh - 300px)">
      <vxe-table
        round
        id="deptTable"
        show-header-overflow
        show-overflow
        border
        ref="xTableDept"
        width="100%"
        height="auto"
        auto-resize
        :tree-config="{ children: 'children', expandAll: false }"
        :custom-config="{ storage: true }"
        :data="tableData.list"
        :loading="tableData.loading"
        align="center"
      >
        <vxe-column
          type="deptId"
          tree-node
          field="deptName"
          :title="$t('setting.部门名称')"
        ></vxe-column>
        <vxe-column field="orderNum" :title="$t('setting.排序')"></vxe-column>
        <vxe-column field="leader" :title="$t('setting.负责人')"></vxe-column>
        <vxe-column field="mobile" :title="$t('setting.手机号')"></vxe-column>
        <vxe-column field="email" :title="$t('setting.邮箱')"></vxe-column>
        <!-- <vxe-column field="status" :title="$t('setting.状态')"
          ><template v-slot="{ row }">
            {{ row.status == 0 ? "停用" : "正常" }}
          </template>
        </vxe-column> -->
        <vxe-column field="remark" :title="$t('setting.备注')"></vxe-column>
        <vxe-column field="createTime" :title="$t('setting.创建时间')">
          <template v-slot="{ row }">
            {{ setMoment(row.createTime) }}
          </template>
        </vxe-column>
        <vxe-column :title="$t('base.operation')" fixed="right" width="120">
          <template v-slot="{ row }">
            <a-tooltip placement="topLeft" :title="$t('base.edit')">
              <a-button type="primary" @click="add(row, 'edit')" class="mr10">
                <template #icon>
                  <IconCom type="EditOutlined" />
                </template>
              </a-button>
            </a-tooltip>
            <a-tooltip placement="topLeft" :title="$t('base.删除')">
              <a-popconfirm
                :title="$t('base.confirm')"
                :ok-text="$t('base.yes')"
                :cancel-text="$t('base.no')"
                @confirm="onDelete(row)"
              >
                <a-button type="danger" class="table-button">
                  <template #icon>
                    <IconCom type="DeleteOutlined" />
                  </template>
                </a-button>
              </a-popconfirm>
            </a-tooltip>
          </template>
        </vxe-column>
      </vxe-table>
    </a-col>
  </a-card>
</template>
<script lang="ts">
interface tableDataTs {
  list: Array<any>; //table 数据
  loading: boolean;
}
import { defineComponent, reactive, ref, onMounted } from "vue";
import Query from "./components/query.vue";
import AddModal from "./components/addModal.vue";
import IconCom from "@/components/modules/IconCom.vue";
import { setMoment, layouts, pageSizesList, setMessageTips } from "@/pages/utils";
import { handleTree } from "@/pages/utils";
import { deleteDept, getDeptList } from "@/pages/apis/dept";
export default defineComponent({
  name: "demo1",
  components: { IconCom, Query, AddModal },
  setup() {
    const formState = ref<any>({});
    const xToolbarDept = ref<any>();
    const xTableDept = ref<any>();
    const addModalRef = ref<any>();
    const tableData = reactive<tableDataTs>({
      list: [], //table 数据
      loading: false,
    });

    //弹框基本信息
    onMounted(() => {
      changevisible();
    });

    const changevisible = () => {
      xTableDept.value.connect(xToolbarDept.value);
    };

    //将子组件获取到的对象返回
    const searchQuery = (formValue: any) => {
      formState.value = formValue;
      init();
    };

    //查询表格数据
    const init = () => {
      let params: Object = {
        ...formState.value,
      };
      tableData.loading = true;
      getDeptList(params)
        .then((res: any) => {
          if (res.errorCode == "00000") {
            tableData.list = !res.data ? [] : handleTree(res.data);
          }
          setMessageTips(res, false);
        })
        .finally(() => {
          tableData.loading = false;
        });
    };

    //删除
    const onDelete = (row: any) => {
      deleteDept({ id: row.id }).then((res: any) => {
        if (res.errorCode == "00000") init();
        setMessageTips(res);
      });
    };

    //新增收货
    const add = (row: any, type: string) => {
      addModalRef.value.openModal(row, type);
    };

    const addSubmit = () => {
      init();
    };

    return {
      layouts,
      pageSizesList,
      addModalRef,
      xToolbarDept,
      xTableDept,
      tableData,
      setMoment,
      searchQuery,
      add,
      addSubmit,
      onDelete,
      init,
    };
  },
});
</script>
