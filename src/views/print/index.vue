<template>
  <a-button type="primary" size="small" @click="handleSubmit(false)">打印 </a-button>
  <a-button type="primary" size="small" @click="handlePreview(false)">预览 </a-button>
  <form id="form1" style="dispaly: none">
    <table border="1" style="border-collapse: collapse">
      <tr>
        <td>打印初始化</td>
        <td>打印初始化</td>
      </tr>
      <tr>
        <td>打印初始化</td>
        <td>打印初始化</td>
      </tr>
    </table>
  </form>
</template>
<script lang="ts" setup>
import { getLodop } from "@/utils/LodopFuncs.js";
import { notification } from "ant-design-vue";

/**
 * PRINT_INIT
 * 打印初始化
 */
/**
 * PREVIEW
 * 打印预览
 */
/**
 * PRINT
 * 直接打印
 */
/**
 * PRINT_SETUP
 * 打印维护
 */
/**
 * PRINT_DESIGN
 * 打印设计
 */

/**
 * ADD_PRINT_TEXT
 * intTop,intLeft,intWidth,intHeight,strHtml
 * 距离顶部距离，距离左边距离，宽，高，文本内容
 */

/**
 * SET_PRINT_STYLE
 * strStyleName, varStyleValue
 * 一、整体设置（针对文本项），打印初始化后、增加打印项之前调用本函数
    LODOP.SET_PRINT_STYLE("FontSize",11);
 */

/**
 * SET_PRINT_STYLEA
 * strStyleName, varStyleValue
 *二、单个打印项（针对文本项）进行字体设置，例如：
LODOP.SET_PRINT_STYLEA(3,"FontName","隶书");
设置第3个内容项的字体为隶书。
 */

/**
 * ADD_PRINT_TABLE
 * intTop,intLeft,intWidth,intHeight,strHtml
 * 距离顶部距离，距离左边距离，宽，高，文本内容
 */
/**
 * SET_PRINT_PAGESIZE(intOrient,intPageWidth,intPageHeight,strPageName)
 * intOrient 值为1---纵向打印，固定纸张； 值为2---横向打印，固定纸张；值为3---纵向打印，宽度固定，高度按打印内容的高度自适应；0(或其它)----打印方向由操作者自行选择或按打印机缺省设置。
 * intPageWidth 纸张宽，单位为0.1mm 譬如该参数值为45，则表示4.5mm,计量精度是0.1mm。
 * intPageHeight：固定纸张时该参数是纸张高；高度自适应时该参数是纸张底边的空白高，计量单位与纸张宽一样。
 * strPageName：纸张名，必须intPageWidth等于零时本参数才有效，有如下选择：
    Letter, LetterSmall, Tabloid, Ledger, Legal,Statement, Executive,
    A3, A4, A4Small, A5, B4, B5, Folio, Quarto, qr10X14, qr11X17, Note,
    Env9, Env10, Env11, Env12,Env14, Sheet, DSheet, ESheet
 *
 */

const handleSubmit = () => {
  let LODOP = getLodop();
  LODOP.PRINT_INIT("");
  LODOP.SET_PRINT_PAGESIZE(1, 900, 700);
  AddPrintContent();
  LODOP.PRINT();
};

const handlePreview = () => {
  let LODOP = getLodop();
  LODOP.PRINT_INIT("");
  LODOP.SET_PRINT_PAGESIZE(1, 900, 700);
  AddPrintContent();
  LODOP.PREVIEW();
};

const AddPrintContent = () => {
  LODOP.ADD_PRINT_BARCODE(28, 88, 100, 100, "QRCode", "123456789012"); //设置条码位置、宽高、字体、值
  // LODOP.ADD_PRINT_TABLE(0, 0, 100,100,document.getElementById("form1").innerHTML)
  // LODOP.SET_PRINT_STYLEA(0, "FontSize", 18); //设置上面这个条码下方的文字字体大小
  // LODOP.SET_PRINT_STYLEA(0, "Color", "#FF0000"); //设置当前条码以及条码下方字体的颜色
  // LODOP.SET_PRINT_STYLEA(0, "Angle", 180); //设置旋转角度
  // LODOP.SET_PRINT_STYLEA(0, "ShowBarText", 0); //设置是否显示下方的文字
  // LODOP.SET_PRINT_STYLEA(0, "AlignJustify", 2); //设置条码下方的文字相对于条码本身居中
  // LODOP.SET_PRINT_STYLEA(0, "AlignJustify", 1); //设置条码下方的文字相对于条码本身居左
  // LODOP.SET_PRINT_STYLEA(0, "AlignJustify", 3); //设置条码下方的文字相对于条码本身居右
  // LODOP.SET_PRINT_STYLEA(0, "GroundColor", "#0080FF"); //设置条码的背景色
};
</script>
<style lang="less" scoped></style>
