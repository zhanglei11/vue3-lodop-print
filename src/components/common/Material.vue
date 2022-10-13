<template>
  <!-- 物料类型 v2.0 -->
  <a-select
    show-search
    v-model:value="ID_"
    :allowClear="true"
    :placeholder="getPlaceholder(2)"
    :disabled="DIS_"
    option-label-prop="children"
    :filterOption="filterOption"
    @change="changeID"
  >
    <a-select-option
      v-for="item in LIST_"
      :key="item.materialNo"
      :value="item.materialNo"
      :label="item.materialName"
    >
      {{ item.materialName }}
      <div class="select-color">{{ `${$t('basic.编号')}:` }}{{ item.materialNo }}</div>
    </a-select-option>
  </a-select>
</template>
<script setup>
import { filterOption, getPlaceholder } from '@/utils/common'
import { ref, onMounted } from 'vue'
import { getmaterialtList } from '@/apis/marketbase'
const emits = defineEmits()
const props = defineProps({
  ID: {
    required: true
  },
})
const DIS_ = ref(false)
const ID_ = ref(props.ID)
const LIST_ = ref(null)
onMounted(() => {
  getInit()
})
//重置
const reset = () => {
  ID_.value = null
  changeID()
}

//重置所有
const resetList = () => {
  reset()
  LIST_.value = []
}
//字典
const getInit = () => {
  getmaterialtList().then((res) => {
    if (res.errorCode == '00000') {
      let data = res.data
      if (typeof data !== 'undefined' && typeof data !== 'null' && data) {
        LIST_.value = data.sort(function (a, b) {
          let x = a['materialNo']
          let y = b['materialNo']
          return x < y ? -1 : x > y ? 1 : 0
        })
      }
    } else {
      LIST_.value = []
    }
  })
}
const changeID = (val) => {
  let obj = {
    label: null,
    value: null
  }
  if (!!!val) {
    obj = {
      label: null,
      value: null
    }
  } else {
    LIST_.value.forEach((it) => {
      if (it.materialNo == val) {
        obj = {
          label: it.materialName,
          value: it.materialNo
        }
      }
    })
  }
  emits('changz', obj)
}
defineExpose({
  resetList,
  reset,
  getInit
})
</script>
