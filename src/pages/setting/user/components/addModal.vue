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
      <a-form-item :label="$t('setting.用户昵称')" name="userName">
        <a-input
          type="text"
          v-model:value="modalForm.userName"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('setting.归属部门')" name="deptId">
        <a-tree-select
          :disabled="modalInfo.type === 'edit'"
          v-model:value="modalForm.deptId"
          show-search
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :placeholder="getPlaceholder(2)"
          allow-clear
          treeDefaultExpandAll="false"
          @change="changeData"
          :tree-data="initData.deptList"
          :field-names="{ label: 'deptName', value: 'id', options: 'children' }"
        >
          <template #title="{ id, deptName }">
            <b v-if="id === '0'" style="color: #08c">sss</b>
            <template v-else>{{ deptName }}</template>
          </template>
        </a-tree-select>
      </a-form-item>
      <a-form-item :label="$t('setting.工号')">
        <a-input
          type="text"
          v-model:value="modalForm.workNo"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('setting.手机号码')">
        <a-input
          type="text"
          v-model:value="modalForm.mobile"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('setting.邮箱')">
        <a-input
          type="text"
          v-model:value="modalForm.email"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('setting.登录账号')" name="loginName">
        <a-input
          :disabled="modalInfo.type === 'edit'"
          type="text"
          v-model:value="modalForm.loginName"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item v-if="modalInfo.type == 'add'" :label="$t('setting.用户密码')" name="password">
        <a-input-password v-model:value="modalForm.password" :placeholder="getPlaceholder(1)" />
      </a-form-item>
      <a-form-item :label="$t('setting.用户性别')" name="sex">
        <a-select
          :disabled="modalInfo.type === 'edit'"
          v-model:value="modalForm.sex"
          :allowClear="true"
          :placeholder="getPlaceholder(2)"
        >
          <a-select-option value="0">男</a-select-option>
          <a-select-option value="1">女</a-select-option>
          <a-select-option value="2">未知</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label="$t('setting.备注')">
        <a-textarea v-model:value="modalForm.remark" placeholder="备注" :rows="4" />
      </a-form-item>
    </a-form>
  </ModalCom>
</template>
<script lang="ts">
import { getDeptList } from '@/pages/apis/dept'

interface modalFormTs {
  userName: string | null
  deptId: string | null
  mobile: string | null
  workNo: string | null
  email: string | null
  loginName: string | null
  password: string | null
  sex: string | null
  status: number | string | null
  roleKey: string | null
  remark: string | null
}

import {
  public_form_empty,
  public_form_data_replace,
  getPlaceholder,
  setRules,
  handleTree,
  setMessageTips
} from '@/pages/utils'
import { defineComponent, reactive, ref, nextTick, onMounted } from 'vue'
import ModalCom from '@/components/modal/modalCom.vue'
import { addUser, updateUser } from '@/pages/apis/user'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'demo2',
  components: { ModalCom },
  setup(props, ctx) {
    const { t } = useI18n()
    const formRef = ref<any>()
    const modalFlag = ref<boolean>(false)
    const modalProps = ref<any>({})
    const modalForm = reactive<modalFormTs>({
      userName: null,
      deptId: null,
      mobile: null,
      workNo: null,
      email: null,
      loginName: null,
      password: null,
      sex: null,
      status: 1,
      roleKey: null,
      remark: null
    })
    const initData = reactive({
      deptList: [] as any[]
    })
    const getInitData = () => {
      let params: Object = {
        pageNumber: 1,
        pageSize: 20
      }
      getDeptList(params).then((res: any) => {
        if (res.errorCode == '00000') {
          initData.deptList = !res.data ? [] : handleTree(res.data)
        }
      })
    }
    //弹框信息 若编辑 可保留id
    const modalInfo: {
      type: string | null
      id: string | null
    } = reactive({
      type: null,
      id: null
    })
    //表单验证
    const formRules = reactive({
      userName: [setRules(2)],
      deptId: [setRules(2)],
      mobile: [setRules(2)],
      email: [setRules(2)],
      loginName: [setRules(2)],
      password: [setRules(2)],
      sex: [setRules(2)],
      status: [setRules(2)],
      roleKey: [setRules(2)]
    })

    //打开弹框
    const openModal = (row: any, type: any) => {
      public_form_empty(modalForm)
      getInitData()
      public_form_data_replace(modalForm, row)
      modalInfo.type = type
      modalInfo.id = row.id
      modalProps.value = {
        modalTitle: type == 'add' ? t('base.新建') : t('base.编辑')
        // modalTitle: type == "add" ? "添加用户" : "修改用户",
      }
      modalFlag.value = true
    }

    //取消
    const handleCancel = () => {
      modalFlag.value = false
    }

    //确定
    const handleOk = () => {
      formRef.value.validate().then(() => {
        if (modalInfo.type == 'add') {
          addUser(modalForm).then((res: any) => handleMessage(res))
        } else if (modalInfo.type == 'edit') {
          let params = {
            ...modalForm,
            id: modalInfo.id
          }
          updateUser(params).then((res: any) => handleMessage(res))
        }
      })
    }

    //统一信息处理
    const handleMessage = (res: any) => {
      if (res.errorCode == '00000') ctx.emit('addSubmit')
      setMessageTips(res)
      handleCancel()
    }

    return {
      initData,
      modalFlag,
      modalProps,
      modalInfo,
      modalForm,
      formRef,
      formRules,
      handleOk,
      handleCancel,
      openModal,
      getPlaceholder
    }
  }
})
</script>
