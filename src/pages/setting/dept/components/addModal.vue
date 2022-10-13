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
      <a-form-item :label="$t('setting.上级部门')" name="parentId">
        <a-tree-select
          v-model:value="modalForm.parentId"
          show-search
          class="width_100"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :placeholder="getPlaceholder(2)"
          :allowClear="true"
          :tree-data="initData.deptList"
          :field-names="{ label: 'deptName', value: 'id', options: 'children' }"
        >
          <template #title="{ id, deptName }">
            <b v-if="id === '0'" style="color: #08c">sss</b>
            <template v-else>{{ deptName }}</template>
          </template>
        </a-tree-select>
      </a-form-item>
      <a-form-item :label="$t('setting.部门名称')" name="deptName">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.deptName"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('setting.显示排序')" name="orderNum">
        <a-input-number
          :min="0"
          :allowClear="true"
          v-model:value="modalForm.orderNum"
          :placeholder="getPlaceholder(1)"
          class="width_100"
        ></a-input-number>
      </a-form-item>
      <a-form-item :label="$t('setting.负责人')">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.leader"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('setting.联系电话')">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.mobile"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('setting.邮箱')">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.email"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
       <a-form-item :label="$t('setting.备注')">
        <a-textarea
          :allowClear="true"
          v-model:value="modalForm.remark"
          :placeholder="getPlaceholder(1)"
        ></a-textarea>
      </a-form-item>
      <!-- <a-form-item label="部门状态">
        <a-radio-group v-model:value="modalForm.status">
          <a-radio value="1">正常</a-radio>
          <a-radio value="0">停用</a-radio>
        </a-radio-group>
      </a-form-item> -->
    </a-form>
  </ModalCom>
</template>
<script lang="ts">
import { addDept, getDeptList, updateDept } from "@/pages/apis/dept";
interface modalFormTs {
  deptName: any;
  parentId: any;
  leader: any;
  orderNum: number | null;
  email: any;
  mobile: any;
  remark:any
  // status: any;
}
import {
  public_form_empty,
  getPlaceholder,
  setRules,
  public_form_data_replace,
  handleTree,
  setMessageTips,
} from "@/pages/utils";
import { defineComponent, reactive, ref } from "vue";
import ModalCom from "@/components/modal/modalCom.vue";
import { useI18n } from "vue-i18n";
export default defineComponent({
  name: "demo2",
  components: { ModalCom },
  setup(props, ctx) {
    const { t } = useI18n();
    const formRef = ref<any>();
    const modalFlag = ref<boolean>(false);
    const modalProps = ref<any>({});
    const modalForm = reactive<modalFormTs>({
      deptName: null,
      parentId: null,
      leader: null,
      orderNum: null,
      email: null,
      mobile: null,
      remark:null
      // status: "1",
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
      deptList: [] as any[],
    });

    const getInitData = () => {
      let params: Object = {
        pageNumber: 1,
        pageSize: 20,
      };
      getDeptList(params).then((res: any) => {
        if (res.errorCode == "00000") {
          initData.deptList = [
            {
              id: 0,
              deptName: "RBCD",
              children: !res.data ? [] : handleTree(res.data),
            },
          ];
        }
      });
    };

    //表单验证
    const formRules = reactive({
      deptName: [setRules(1)],
      parentId: [setRules(2)],
      orderNum: [setRules(1)],
    });

    //打开弹框
    const openModal = (row: any, type: any) => {
      if (type == "edit") public_form_data_replace(modalForm, row);
      modalInfo.type = type;
      modalInfo.id = row.id;
      getInitData();
      modalProps.value = {
        modalTitle: type == "add" ? t("base.新建") : t("base.编辑"),
        // modalTitle: type == "add" ? "添加部门" : "修改部门",
      };
      modalFlag.value = true;
    };

    //取消
    const handleCancel = () => {
      modalFlag.value = false;
      public_form_empty(modalForm);
    };

    //确定
    const handleOk = () => {
      formRef.value
        .validate()
        .then(() => {
          //添加编辑
          if (modalInfo.type == "add") {
            addDept(modalForm).then((res: any) => handleMessage(res));
          } else if (modalInfo.type == "edit") {
            let params = {
              ...modalForm,
              id: modalInfo.id,
            };
            updateDept(params).then((res: any) => handleMessage(res));
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
      handleOk,
      handleCancel,
      openModal,
      getPlaceholder,
    };
  },
});
</script>
