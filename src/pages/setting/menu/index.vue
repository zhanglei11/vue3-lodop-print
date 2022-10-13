<template>
  <a-card :bordered="false">
    <Query ref="queryRef" @searchQuery="searchQuery" />
  </a-card>
  <a-card :bordered="false">
    <AddModal ref="addModalRef" @addSubmit="addSubmit" />
    <vxe-toolbar ref="xToolbarMenu" custom>
      <template #buttons></template>
      <!-- <template #tools ref="xToolbarMenu">
       <a-button type="primary" @click="add({}, 'add')">
          <template #icon>
            <IconCom type="PlusOutlined" />
          </template>
          {{ $t('base.新建') }}
        </a-button>
      </template> -->
    </vxe-toolbar>
    <a-col style="height: calc(100vh - 300px)">
      <vxe-table
        round
        id="menuTable"
        show-header-overflow
        show-overflow
        border
        ref="xTableMenu"
        width="100%"
        height="auto"
        auto-resize
        :custom-config="{ storage: true }"
        :tree-config="{ children: 'children', expandAll: false }"
        :data="tableData.list"
        :loading="tableData.loading"
        align="center"
      >
        <vxe-column
          type="menuId"
          tree-node
          field="menuName"
          :title="$t('setting.菜单名称')"
        ></vxe-column>
        <vxe-column field="menuType" :title="$t('setting.菜单类型')">
          <template v-slot="{ row }">
            {{ menuTypeFilter(row.menuType) }}
          </template>
        </vxe-column>
        <vxe-column field="url" :title="$t('setting.路径')"></vxe-column>
        <vxe-column field="createTime" :title="$t('setting.创建时间')">
          <template v-slot="{ row }">
            {{ setMoment(row.createTime) }}
          </template>
        </vxe-column>
        <vxe-column :title="$t('base.operation')" fixed="right" width="150">
          <template v-slot="{ row }">
            <a-tooltip placement="topLeft" :title="$t('base.edit')">
              <a-button type="primary" @click="add(row, 'edit')" class="mr10">
                <template #icon>
                  <IconCom type="EditOutlined" />
                </template>
              </a-button>
            </a-tooltip>
            <a-tooltip
              v-if="row.menuType == 'M'"
              placement="topLeft"
              :title="$t('setting.添加子菜单')"
            >
              <a-button type="dashed" danger @click="add(row, 'addSub')" class="mr10">
                <template #icon>
                  <IconCom type="PlusOutlined" />
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
import { deleteMenu, getMenuListByUser } from "@/pages/apis/menu";
interface tableDataTs {
  list: Array<any>; //table 数据
  loading: boolean;
}
import { defineComponent, reactive, ref, onMounted } from "vue";
import Query from "./components/query.vue";
import AddModal from "./components/addModal.vue";
import IconCom from "@/components/modules/IconCom.vue";
import {
  setMoment,
  layouts,
  pageSizesList,
  handleTree,
  setMessageTips,
} from "@/pages/utils";
export default defineComponent({
  name: "demo1",
  components: { IconCom, Query, AddModal },
  setup() {
    const formState = ref<any>({});
    const xToolbarMenu = ref<any>();
    const xTableMenu = ref<any>();
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
      xTableMenu.value.connect(xToolbarMenu.value);
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
      getMenuListByUser(params)
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

    //删除 内容
    const onDelete = (row: any) => {
      let params = {
        id: row.id,
      };
      deleteMenu(params).then((res: any) => {
        if (res.errorCode == "00000") init();
        setMessageTips(res);
      });
    };

    const menuTypeFilter = (val: any) => {
      let result;
      switch (val) {
        case "M":
          result = "目录";
          break;
        case "C":
          result = "菜单";
          break;
        case "F":
          result = "按钮";
          break;
      }
      return result;
    };

    //添加菜单
    const add = (row: any, type: string) => {
      addModalRef.value.openModal(row, type);
    };
    const addSubMenu = (row: any, type: string) => {
      addModalRef.value.openModal(row, type);
    };

    const addSubmit = () => {
      init();
    };

    return {
      layouts,
      pageSizesList,
      addModalRef,
      xToolbarMenu,
      xTableMenu,
      tableData,
      setMoment,
      searchQuery,
      menuTypeFilter,
      add,
      addSubMenu,
      addSubmit,
      onDelete,
      init,
    };
  },
});
</script>
