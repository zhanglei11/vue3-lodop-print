<template>
  <ModalCom
    v-if="modalFlag"
    :modal-props="modalProps"
    @handleOk="handleOk"
    @handleCancel="handleCancel"
  >
    <a-divider orientation="left">{{$t('setting.基本信息')}}</a-divider>
    <a-form :model="modalForm" :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }" ref="formRef">
      <a-row :gutter="16">
        <a-col :span="10">
          <a-form-item :label="$t('setting.用户名称')" name="gpNo">
            <span>{{ modalForm.userName }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item :label="$t('setting.登录账号')" name="">
            <span>{{ modalForm.loginName }}</span>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-divider orientation="left">{{$t('setting.角色信息')}}</a-divider>
    <a-col style="height: calc(100vh - 570px)">
      <vxe-table
        v-if="tableFlag"
        round
        id="goodsQuery"
        show-header-overflow
        show-overflow
        border
        ref="xTableRef"
        width="100%"
        auto-resize
        height="auto"
        :custom-config="{ storage: true }"
        :data="tableData.list"
        :loading="tableData.loading"
        :row-config="{ isCurrent: true, keyField: 'id' }"
        :checkbox-config="{
          reserve: true,
          highlight: true,
          checkRowKeys: tableData.selectedRowKeys,
        }"
        @checkbox-change="checkedChange"
        @checkbox-all="checkedChange"
        align="center"
      >
        <vxe-column type="checkbox" :width="50" fixed="left" align="center" :resizable="false">
        </vxe-column>
        <vxe-column field="roleKey" :title="$t('setting.角色编号')"></vxe-column>
        <vxe-column field="roleName" :title="$t('setting.角色名称')"></vxe-column>
        <vxe-column field="roleKey" :title="$t('setting.权限字符')"></vxe-column>
        <vxe-column field="createTime" :title="$t('setting.创建时间')">
          <template v-slot="{row}">
            {{setMoment(row.createTime)}}
          </template>
        </vxe-column>
      </vxe-table>
    </a-col>
    <vxe-pager
      perfect
      :current-page="tableData.pageIndex"
      :page-size="tableData.pageSize"
      :total="tableData.pageTotal"
      :page-sizes="pageSizesList"
      @page-change="handlePage"
      :layouts="layouts"
    ></vxe-pager>
  </ModalCom>
</template>
<script lang="ts">
import {
  handleTree,
  public_form_data_replace,
  public_form_empty,
  layouts,
  pageSizesList,
  setMoment,setMessageTips
} from "@/pages/utils";
interface modalFormTs {
  userName: string | null;
  loginName: string | null;
}
interface tableDataTs {
  list: Array<any>; //table 数据
  loading: boolean;
  pageIndex: number; //table 数据
  pageSize: number;
  pageTotal: number;
  selectedRowKeys: Array<any>;
  /*table选中records*/
  selectionRows: Array<any>;
}
import ModalCom from "@/components/modal/modalCom.vue";
import { defineComponent, onMounted, reactive, ref, nextTick } from "vue";
import { getRoleList, getUserRoleList } from "@/pages/apis/role";
import { authRole } from "@/pages/apis/user";
export default defineComponent({
  name: "authRole",
  components: {
    ModalCom,
  },
  setup(props, ctx) {
    const modalFlag = ref<boolean>(false);
    const modalProps = ref<any>({});
    const modalForm = reactive<modalFormTs>({
      userName: null,
      loginName: null,
    });
    const xTableRef = ref<any>([]);
    const tableFlag = ref<any>(false);
    const tableData = reactive<tableDataTs>({
      list: [], //table 数据
      loading: false,
      pageIndex: 1, //table 数据
      pageSize: 10,
      pageTotal: 0,
      selectedRowKeys: [],
      /*table选中records*/
      selectionRows: [],
    });
    //弹框信息 若编辑 可保留id
    const modalInfo: {
      type: string | null;
      id: string | null;
    } = reactive({
      type: null,
      id: null,
    });

    const openModal = async (row: any) => {
      let res = await getUserRoleList({ userId: row.id });
      tableData.selectedRowKeys = !res.data
        ? []
        : res.data.map((e: any) => {
            return e.id;
          });
      modalInfo.id = row.id;
      init();
      public_form_data_replace(modalForm, row);
      modalProps.value = {
        modalTitle: "角色分配",
        modalWidth: "800px",
      };
      modalFlag.value = true;
      tableFlag.value = true;
    };
    const init = () => {
      let params: Object = {
        pageNumber: tableData.pageIndex,
        pageSize: tableData.pageSize,
      };
      getRoleList(params)
        .then((res: any) => {
          if (res.errorCode == "00000") {
            tableData.list = !res.data.items ? [] : handleTree(res.data.items);
            tableData.pageIndex = Number(res.data.pageNumber);
            tableData.pageSize = Number(res.data.pageSize);
            tableData.pageTotal = Number(res.data.totalSize);
          }
          setMessageTips(res,false)
        })
    };

    //分页查询
    const handlePage = ({ currentPage, pageSize }: any) => {
      tableData.pageIndex = currentPage;
      tableData.pageSize = pageSize;
      init();
    };
    onMounted(() => {});
    //复选框点击
    const checkedChange = (val: any) => {      
      tableData.selectedRowKeys = val.records.map((e: any) => {
        return e.id;
      });
    };
    const handleOk = () => {
      let params = {
        id: modalInfo.id,
        roleIds: tableData.selectedRowKeys,
      };
      authRole(params).then((res: any) => {
        if (res.errorCode == "00000") {
          modalFlag.value = false;
          ctx.emit("addSubmit");
          public_form_empty(modalForm);
          setMessageTips(res)
          tableData.selectedRowKeys = [];
        }
      });
    };
    const handleCancel = () => {
      modalFlag.value = false;
    };
    return {
      modalFlag,
      tableFlag,
      xTableRef,
      modalProps,
      modalForm,
      tableData,
      layouts,
      pageSizesList,
      checkedChange,
      openModal,
      handleOk,
      handleCancel,
      handlePage,
      setMoment
    };
  },
});
</script>
