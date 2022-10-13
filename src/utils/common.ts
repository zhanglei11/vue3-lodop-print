import moment from 'moment';
import { useI18n } from 'vue-i18n';

/**
 * 数据合并规则 2021-11-1
 * arrA 对象A
 * arrB 对象B
 * 将对象B与对象A相同属性的进行赋值
 * @param {array}
 * @returns {array}
 */
export const public_form_data_replace = (arrA: any, arrB: any) => {
  Object.keys(arrA).forEach((key) => {
    arrA[key] = arrB[key] || null;
  });
  return arrA;
};

/**
 * 数据清空 2021-11-1
 * arrA 清空的对象
 * arrB 不清空的值组成的数组数组 ['a','b']
 * @param {array}
 * @returns {array}
 */
export const public_form_empty = (arrA: any, arrB: any = []) => {
  Object.keys(arrA).forEach((key) => {
    if (!arrB.includes(key)) {
      arrA[key] = null;
    }
  });
  return arrA;
};

//过滤
export const filterOption = (input: any, option: any) => {
  //搜索过滤
  if (
    option.key?.toLowerCase().includes(input.toLowerCase()) ||
    option.data?.toLowerCase().includes(input.toLowerCase()) ||
    option.label?.toLowerCase().includes(input.toLowerCase()) ||
    option.data_2?.toLowerCase().includes(input.toLowerCase()) ||
    option.data_3?.toLowerCase().includes(input.toLowerCase()) ||
    option.data_4?.toLowerCase().includes(input.toLowerCase())
  ) {
    return true;
  }
  return false;

};

//返回值是否为空
export const isEmptyResultList = (res: any) => {
  return !res.resultList ? [] : res.resultList;
};

//导出表格
export const exportBlod = (res: any, name: any) => {
  const blob = new Blob([res], { type: 'application/ms-excel;charset=utf-8' });
  const downloadElement = document.createElement('a');
  const href = window.URL.createObjectURL(blob); //创建下载的链接

  downloadElement.href = href;
  downloadElement.download = name; //下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); //点击下载
  document.body.removeChild(downloadElement); //下载完成移除元素
  window.URL.revokeObjectURL(href); //释放掉blob对象
};

/**
 * 时间格式返回值
 * 1 time 时间
 * 2 format 格式
 * @returns { string }
 * @zhanglei
 * 此方法为公共方法，涉及面比较广  请勿随便更改
 */
export const setMoment = (time: any, format = 'YYYY-MM-DD') => {
  return time ? moment(time).format(format) : '';
};

/**
 * 国际化placeholder 请选择 请输入
 * 1 input输入规则  blur
 * 2 select输入规则  change
 * @returns { string }
 * @zhanglei
 * 此方法为公共方法，涉及面比较广  请勿随便更改
 */
export const getPlaceholder = (type: number) => {
  const { t } = useI18n();
  let name;

  switch (type) {
  case 1:
    name = t('base.pleaseEnter');
    break;
  case 2:
    name = t('base.pleaseSelect');
    break;
  case 3:
    name = [t('base.startTime'), t('base.endTime')];
    break;
  }
  return name;
};

/**
 * 国际化表单效验的规则 请选择 请输入
 * 1 input输入规则  blur
 * 2 select输入规则  change
 * @type {string} change  blur
 * @returns {Object}
 * @zhanglei
 * 此方法为公共方法，涉及面比较广  请勿随便更改
 */
export const setRules = (type: number) => {
  const { t } = useI18n();
  const obj = {
    required: true,
    message: type === 1 ? t('base.pleaseEnter') : t('base.pleaseSelect'),
    trigger: type === 1 ? 'blur' : 'change'
  };

  return obj;
};

/**
 * layouts
 * @zhanglei
 * 此为公共数组，涉及面比较广  请勿随便更改
 */

export const layouts = ['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total'];
/**
 * pageSizes
 * @zhanglei
 * 此为公共数组，涉及面比较广  请勿随便更改
 */
export const pageSizesList = [10, 20, 50, 100];

/**
 *
 * @zhanglei
 * 此为公共数组，涉及面比较广  请勿随便更改
 */
let timeout: any;

export const debounce = (func: any, wait = 1000) => {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    func.apply();
  }, wait);
};

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export const handleTree = (
  data: Array<any>,
  id?: string,
  parentId: any = 'parentId',
  children: any = 'children'
) => {
  let config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children'
  };

  let childrenListMap = {};
  let nodeIds = {};
  let tree = [];

  for (let d of data) {
    let parentId = d[config.parentId];

    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (let d of data) {
    let parentId = d[config.parentId];

    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }

  for (let t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o: any) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]] ? childrenListMap[o[config.id]] : [];
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
};



