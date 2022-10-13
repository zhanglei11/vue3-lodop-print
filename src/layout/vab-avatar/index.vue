<template>
  <a-col class="vab-avatar">
    <span class="mr10">
      <!-- <component
        :is="!isFullscreen ? 'FullscreenOutlined' : 'FullscreenExitOutlined'"
        @click="clickFullscreen"
        class="full-screen"
      /> -->

      <FullscreenOutlined
        v-if="!stateFullscreen.isFullscreen"
        @click="stateFullscreen.clickFullscreen"
        class="full-screen"
      ></FullscreenOutlined>
      <FullscreenExitOutlined
        v-else
        @click="stateFullscreen.clickFullscreen"
        class="full-screen"
      ></FullscreenExitOutlined>
    </span>
    <span class="mr10">
      <a-dropdown>
        <span class="dropDown">
          <i class="iconfont icon-guojihua"></i>
        </span>
        <template #overlay>
          <a-menu class="menu" @click="changeLang" :selectedKeys="[locale]">
            <a-menu-item v-for="item in locales" :key="item">
              <span role="img" :aria-label="languageLabels[item]">
                {{ languageIcons[item] }}
              </span>
              {{ languageLabels[item] }}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </span>
    <a-dropdown>
      <span class="ant-dropdown-link">
        {{ username }}
        <IconCom type="DownOutlined" />
      </span>
      <template v-slot:overlay>
        <a-menu>
          <a-menu-item @click="logout">{{ $t("base.logOut") }}</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <span class="ml10">
      <img class="anticon-s" src="@/assets/bosch/bosch-logo-only.png" />
    </span>
  </a-col>
</template>
<script lang="ts" setup>
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { ref, reactive, onMounted, toRefs, inject } from "vue";
import { useRouter } from "vue-router";
import IconCom from "@/components/modules/IconCom.vue";
import screenfull from "screenfull";
import { useI18n } from "vue-i18n";
import _default from "ant-design-vue/es/color-picker";
const sf = screenfull;
import { removeAccessToken } from "@/utils/accessToken";
const emits = defineEmits();
const reload = inject<any>("reload");
const { locale, t } = useI18n();
const router = useRouter();
const store = useStore();
const username = ref<string | null>();
const facilityList = ref<any>();
const logout = async () => {
  removeAccessToken();
  router.push("/login");
};

//更新名称 外部调用 这里必须抛出
const updateData = (value: any) => {
  username.value = value;
};

const locales: string[] = ["zh", "en"];
const languageLabels: { [key: string]: string } = {
  zh: "简体中文",
  en: "English",
};
const languageIcons: { [key: string]: string } = {
  zh: "🇨🇳",
  en: "🇺🇸",
};
const changeLang = ({ key }: any): void => {
  locale.value = key;
  localStorage.setItem("activeI18n", key);
  reload();
};

const stateFullscreen = reactive({
  isFullscreen: false,
  clickFullscreen: () => {
    if (!sf.isEnabled) {
      return false;
    }
    sf.toggle();
  },
});

const change = () => {
  if (sf.isEnabled) {
    stateFullscreen.isFullscreen = sf.isFullscreen;
    store.dispatch("settings/toggleIsFullscreen");
    emits("changeIsFullscreen", stateFullscreen.isFullscreen);
  }
};

onMounted(() => {
  if (sf.isEnabled) {
    sf.on("change", change);
  }
});
defineExpose({
  updateData,
});
</script>
<style lang="less" scoped>
.vab-avatar {
  text-align: right;
  display: block;
  min-width: 300px;
  height: 64px;
  .ant-dropdown-link {
    cursor: pointer;
    font-size: 18px;
  }
}
.ant-dropdown-link-hover {
  z-index: 10000;
  padding: 20px;
}
.menu {
  .anticon {
    margin-right: 8px;
  }
  .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
.dropDown {
  cursor: pointer;
}
.icon-guojihua {
  font-size: 20px;
  cursor: pointer;
}
.full-screen {
  cursor: pointer;
  font-size: 20px;
  line-height: 68px;
}
.anticon-s {
  width: 180px;
  margin-top: -6px;
}
</style>
