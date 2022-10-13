<template>
  <a-card :bordered="false">
    <Query ref="queryRef" @searchQuery="searchQuery"></Query>
  </a-card>
  <a-card :bordered="false">
    <AddModal ref="addModalRef" @addSubmit="addSubmit" />
    <AuthRole ref="authModalRef" @addSubmit="addSubmit" />
    <vxe-toolbar ref="xToolbarUser" custom>
      <template #buttons></template>
      <template #tools ref="xToolbarUser">
        <a-button type="primary" @click="add({}, 'add')">
          <template #icon>
            <IconCom type="PlusOutlined" />
          </template>
          {{ $t('base.新建') }}
        </a-button>
      </template>
    </vxe-toolbar>
    <a-col style="height: calc(100vh - 360px)">
      <vxe-table
        round
        id="userTable"
        show-header-overflow
        show-overflow
        border
        ref="xTableUser"
        width="100%"
        height="auto"
        auto-resize
        :custom-config="{ storage: true }"
        :data="tableData.list"
        :loading="tableData.loading"
        align="center"
      >
        <vxe-column field="workNo" :title="$t('setting.工号')" min-width="120"></vxe-column>
        <vxe-column field="userName" :title="$t('setting.用户名称')" min-width="120"></vxe-column>
        <vxe-column field="department.deptName" :title="$t('setting.部门名称')" min-width="120">
        </vxe-column>
        <vxe-column field="email" :title="$t('setting.邮箱')" min-width="120"> </vxe-column>
        <vxe-column field="createTime" :title="$t('setting.创建时间')" min-width="120">
          <template v-slot="{ row }">
            {{ setMoment(row.createTime) }}
          </template>
        </vxe-column>
        <vxe-column :title="$t('base.operation')" width="180" fixed="right">
          <template v-slot="{ row }">
            <a-tooltip placement="topLeft" :title="$t('base.edit')">
              <a-button type="primary" @click="add(row, 'edit')" class="mr10">
                <template #icon>
                  <IconCom type="EditOutlined" />
                </template>
              </a-button>
            </a-tooltip>
            <a-tooltip placement="topLeft" :title="$t('setting.分配角色')">
              <a-button type="dashed" danger @click="authRole(row)" class="mr10">
                <template #icon>
                  <IconCom type="ContactsOutlined" />
                </template>
              </a-button>
            </a-tooltip>
            <a-tooltip placement="topLeft" :title="$t('base.删除')">
              <a-popconfirm
                :title="$t('base.confirm') + $t('base.删除')"
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
    <vxe-pager
      perfect
      :current-page="tableData.pageIndex"
      :page-size="tableData.pageSize"
      :total="tableData.pageTotal"
      :page-sizes="pageSizesList"
      @page-change="handlePage"
      :layouts="layouts"
    ></vxe-pager>
  </a-card>
</template>
<script lang="ts">
interface tableDataTs {
  list: Array<any> //table 数据
  loading: boolean
  pageIndex: number //table 数据
  pageSize: number
  pageTotal: number
}
import { defineComponent, reactive, ref, onMounted, onActivated } from 'vue'
import Query from './components/query.vue'
import AddModal from './components/addModal.vue'
import AuthRole from '@/pages/setting/user/components/authRole.vue'
import IconCom from '@/components/modules/IconCom.vue'
import { setMoment, layouts, pageSizesList, handleTree, setMessageTips } from '@/pages/utils'
import { deleteUser, getUserList } from '@/pages/apis/user'
import { message } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: { IconCom, Query, AddModal, AuthRole },
  setup() {
    const { t } = useI18n()
    const formState = ref<any>({})
    const xToolbarUser = ref<any>()
    const xTableUser = ref<any>()
    const addModalRef = ref<any>()
    const authModalRef = ref<any>()
    const tableData = reactive<tableDataTs>({
      list: [], //table 数据
      loading: false,
      pageIndex: 1, //table 数据
      pageSize: 20,
      pageTotal: 0
    })
    //弹框基本信息
    onMounted(() => {
      changevisible()
    })
    const changevisible = () => {
      xTableUser.value.connect(xToolbarUser.value)
    }

    //将子组件获取到的对象返回
    const searchQuery = (formValue: any) => {
      formState.value = formValue
      init('initial')
    }

    //查询表格数据
    const init = (type: any) => {
      if (type == 'initial') tableData.pageIndex = 1
      let params: Object = {
        ...formState.value,
        pageNumber: tableData.pageIndex,
        pageSize: tableData.pageSize
      }
      tableData.loading = true
      getUserList(params)
        .then((res: any) => {
          if (res.errorCode == '00000') {
            tableData.list = !res.data.items ? [] : handleTree(res.data.items)
            tableData.pageIndex = Number(res.data.pageNumber)
            tableData.pageSize = Number(res.data.pageSize)
            tableData.pageTotal = Number(res.data.totalSize)
          }
          setMessageTips(res, false)
        })
        .finally(() => {
          tableData.loading = false
        })
    }

    //删除 内容
    const onDelete = (row: any) => {
      if (row.id == '1') {
        message.error(`${t('base.不可删除')}`)
      } else {
        deleteUser({ userId: row.id }).then((res: any) => {
          if (res.errorCode == '00000') init('update')
          setMessageTips(res)
        })
      }
    }

    //分页查询
    const handlePage = ({ currentPage, pageSize }: any) => {
      tableData.pageIndex = currentPage
      tableData.pageSize = pageSize
      init('update')
    }

    //新增用户
    const add = (row: any, type: string) => {
      addModalRef.value.openModal(row, type)
    }
    //分配角色
    const authRole = (row: any) => {
      authModalRef.value.openModal(row)
    }
    const addSubmit = () => {
      init('initial')
    }

    return {
      layouts,
      pageSizesList,
      addModalRef,
      authModalRef,
      xToolbarUser,
      xTableUser,
      tableData,
      setMoment,
      authRole,
      onDelete,
      handlePage,
      searchQuery,
      add,
      addSubmit,
      init
    }
  }
})
</script>
