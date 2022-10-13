<template>
  <ModalCom
    v-if="modalFlag"
    :modalProps="modalProps"
    @handleOk="handleOk"
    @handleCancel="handleCancel"
  >
    <a-form
      :model="modalForm"
      :rules="formRules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      ref="formRef"
    >
      <a-form-item label="上级菜单" name="parentId">
        <a-tree-select
          v-model:value="modalForm.parentId"
          show-search
          class="width_100"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :placeholder="getPlaceholder(2)"
          :allowClear="true"
          :disabled="modalInfo.type === 'addSub'"
          :tree-data="initData.menuList"
          :field-names="{ label: 'menuName', value: 'id', options: 'children' }"
        >
          <template #title="{ value: id, menuName }">
            <b v-if="id === 0" style="color: #08c">sss</b>
            <template v-else>{{ menuName }}</template>
          </template>
        </a-tree-select>
      </a-form-item>
      <a-form-item label="菜单类型">
        <a-radio-group
          :disabled="modalInfo.type == 'addSub'"
          v-model:value="modalForm.menuType"
          @change="changeType"
        >
          <a-radio value="M">目录</a-radio>
          <a-radio value="C">菜单</a-radio>
          <!-- <a-radio value="F">按钮</a-radio> -->
        </a-radio-group>
      </a-form-item>
      <a-form-item label="菜单名称:" name="menuName">
        <a-input
          type="text"
          v-model:value="modalForm.menuName"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item label="显示排序:">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.orderNum"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item label="是否刷新">
        <a-radio-group v-model:value="modalForm.isRefresh">
          <a-radio value="0">是</a-radio>
          <a-radio value="1">否</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-if="modalForm.menuType == 'C'" label="路由地址:">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.url"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
    </a-form>
  </ModalCom>
</template>
<script lang="ts">
import IconCom from "@/components/modules/IconCom.vue";
interface modalFormTs {
  parentId: any;
  menuType: any;
  perms: any;
  icon: any;
  menuName: any;
  id: any;
  orderNum: any;
  isRefresh: any;
  url: any;
  visible: any;
  status: any;
}

import {
  public_form_empty,
  getPlaceholder,
  setRules,
  public_form_data_replace,
  handleTree,
  setMessageTips,
} from "@/pages/utils";
import { defineComponent, reactive, ref, onMounted } from "vue";
import ModalCom from "@/components/modal/modalCom.vue";
import { addMenu, getMenuListByUser, updateMenu } from "@/pages/apis/menu";
export default defineComponent({
  name: "demo2",
  components: { ModalCom, IconCom },
  setup(props, ctx) {
    const formRef = ref<any>();
    const modalFlag = ref<boolean>(false);
    const modalProps = ref<any>({});
    const modalForm = reactive<modalFormTs>({
      parentId: null,
      menuType: "C",
      perms: null,
      icon: null,
      menuName: null,
      id: null,
      orderNum: null,
      isRefresh: "1",
      url: "",
      visible: "1",
      status: "0",
    });
    //弹框信息 若编辑 可保留id
    const modalInfo: {
      type: any;
      id: any;
    } = reactive({
      type: null,
      id: null,
    });
    const initData = reactive({
      menuList: [] as any[],
    });
    const getInitData = () => {
      let params: Object = {
        pageNumber: 1,
        pageSize: 20,
      };
      getMenuListByUser(params).then((res: any) => {
        if (res.errorCode == "00000") {
          initData.menuList = [
            {
              id: 0,
              menuName: "顶级菜单",
              children: !res.data ? [] : handleTree(res.data),
            },
          ];
        }
      });
    };

    //表单验证
    const formRules = reactive({
      parentId: [setRules(2)],
      menuType: [setRules(2)],
      icon: [setRules(2)],
      menuName: [setRules(2)],
      orderNum: [setRules(2)],
      isRefresh: [setRules(2)],
      url: [setRules(2)],
      visible: [setRules(2)],
      status: [setRules(2)],
    });

    //打开弹框
    const openModal = (row: any, type: any) => {
      getInitData();
      if (type == "edit") public_form_data_replace(modalForm, row);
      modalInfo.type = type;
      modalInfo.id = row.id;
      if (type == "addSub") {
        modalForm.parentId = row.id;
        modalForm.menuType = "C";
      }
      modalProps.value = {
        modalTitle: type == "add" || type == "addSub" ? "添加菜单" : "修改菜单",
      };
      modalFlag.value = true;
    };
    const changeType = (val: any) => {
      if (val != "C") {
        modalForm.url = "";
      }
    };

    //取消
    const handleCancel = () => {
      public_form_empty(modalForm, ["status"]);
      modalFlag.value = false;
    };

    //确定
    const handleOk = () => {
      formRef.value
        .validate()
        .then(() => {
          if (modalInfo.type == "add" || modalInfo.type == "addSub") {
            addMenu(modalForm).then((res: any) => handleMessage(res));
          } else if (modalInfo.type == "edit") {
            let params = {
              ...modalForm,
              id: modalInfo.id,
            };
            updateMenu(params).then((res: any) => handleMessage(res));
          }
        })
    };

    //统一信息处理
    const handleMessage = (res: any) => {
      if (res.errorCode == "00000") ctx.emit("addSubmit");
      setMessageTips(res);
      handleCancel();
    };

    return {
      initData,
      modalFlag,
      modalProps,
      modalForm,
      formRef,
      formRules,
      modalInfo,
      changeType,
      handleOk,
      handleCancel,
      openModal,
      getPlaceholder,
    };
  },
});
</script>
