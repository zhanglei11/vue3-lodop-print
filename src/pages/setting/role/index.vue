<template>
  <a-card :bordered="false"><Query ref="queryRef" @searchQuery="searchQuery" /></a-card>
  <a-card :bordered="false">
    <AddModal ref="addModalRef" @addSubmit="addSubmit" />
    <vxe-toolbar ref="xToolbarRole" custom>
      <template #buttons></template>
      <template #tools ref="xToolbarRole">
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
        id="roleTable"
        show-header-overflow
        show-overflow
        border
        ref="xTableRole"
        width="100%"
        height="auto"
        auto-resize
        :custom-config="{ storage: true }"
        :data="tableData.list"
        :loading="tableData.loading"
        align="center"
      >
        <vxe-column field="roleName" :title="$t('setting.角色名称')" min-width="120"></vxe-column>
        <vxe-column field="roleKey" :title="$t('setting.权限字符')" min-width="120"></vxe-column>
        <vxe-column field="roleSort" :title="$t('setting.排序')" min-width="120"> </vxe-column>
        <vxe-column field="createTime" :title="$t('setting.创建时间')" min-width="120">
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
import { deleteRole, getRoleList } from '@/pages/apis/role'
interface tableDataTs {
  list: Array<any> //table 数据
  loading: boolean
  pageIndex: number //table 数据
  pageSize: number
  pageTotal: number
}
import { defineComponent, reactive, ref, onMounted } from 'vue'
import Query from './components/query.vue'
import AddModal from './components/addModal.vue'
import IconCom from '@/components/modules/IconCom.vue'
import { setMoment, layouts, pageSizesList, handleTree, setMessageTips } from '@/pages/utils'
import { VxeTableInstance, VxeToolbarInstance } from 'vxe-table'
import { message } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'demo1',
  components: { IconCom, Query, AddModal },
  setup(props, ctx) {
    const { t } = useI18n()
    const formState = ref<any>({})
    const xToolbarRole = ref({} as VxeToolbarInstance)
    const xTableRole = ref({} as VxeTableInstance)
    const addModalRef = ref<any>()
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
      xTableRole.value.connect(xToolbarRole.value)
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
      getRoleList(params)
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
        deleteRole({ roleId: row.id }).then((res: any) => {
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

    //新增收货
    const add = (row: any, type: string) => {
      addModalRef.value.openModal(row, type)
    }

    const addSubmit = () => {
      init('initial')
    }
    return {
      layouts,
      pageSizesList,
      addModalRef,
      xToolbarRole,
      xTableRole,
      tableData,
      setMoment,
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
