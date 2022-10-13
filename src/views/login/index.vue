<template>
  <a-row class="login-container">
    <a-col class="name-middle">
      <img src="@/assets/bosch/bosch-logo-only.png" alt="" />
    </a-col>
    <a-col class="login-container-form">
      <a-col class="login-container-hello">欢迎登录</a-col>
      <a-form :model="form">
        <a-form-item label="用户名" :label-col="labelCol">
          <a-input v-model:value="form.userName" placeholder="Username">
            <template v-slot:prefix>
              <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="密码" :label-col="labelCol">
          <a-input v-model:value="form.password" type="password" placeholder="Password">
            <template v-slot:prefix>
              <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <span class="mr10">
            <img class="guojia" style="" src="@/assets/bosch/china.png" alt="" />
          </span>
          <span class="mr10">
            <img class="guojia" style="" src="@/assets/bosch/usa.png" alt="" />
          </span>
          <span class="btn-position">
            <a-button
              class="sub-btn"
              type="primary"
              size="small"
              @click="handleSubmit(false)"
              >登录
            </a-button>
            <a-button class="sub-btn" type="link" size="small" @click="handleSubmit(true)"
              >域账号登录
            </a-button>
          </span>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>
<script lang="ts" setup>
import { adlogin, login } from "@/apis/login";
interface formTs {
  userName: string;
  password: string;
}
interface routerListTs {
  list: Array<any>;
}
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { reactive, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getMenuListByUser } from "@/pages/apis/menu";
import { setMessageTips } from "@/pages/utils";
import { setAccessToken, removeAccessToken } from "@/utils/accessToken";
const router = useRouter();
const form = reactive<formTs>({
  userName: import.meta.env.DEV ? "admin" : "",
  password: import.meta.env.DEV ? "12345678" : "",
});

const routerList = reactive<routerListTs>({
  list: [],
});
onMounted(() => {});

//提交
const handleSubmit = async (useAd: boolean) => {
  removeSession();
  let loginType: any;
  if (useAd == false) {
    loginType = login({ userName: form.userName, password: form.password });
  } else {
    loginType = adlogin({
      userName: form.userName,
      password: form.password,
    });
  }
  removeSession();
  loginType.then((res) => {
    if (res.errorCode == "00000") {
      setAccessToken(res.data.split(" ")[1]);
      getAccount();
    }
    setMessageTips(res);
  });
};

//移除session
const removeSession = () => {
  localStorage.removeItem("allowRouter");
  removeAccessToken();
};

//获取相关信息
const getAccount = () => {
  getMenuListByUser({}).then((res) => {
    routerList.list = res.data.map((item: any) => {
      if (item.url) return item.url;
    });
    routerList.list.unshift("/welcome");
    localStorage.setItem("allowRouter", JSON.stringify(routerList));
    setTimeout(() => {
      router.push("/welcome");
    }, 500);
  });
};
const labelCol = ref({ style: { width: "60px" } });
</script>
<style lang="less" scoped>
.login-container {
  height: 100vh;
  background: #0183c9;
  display: block;
  text-align: center;

  &-form {
    width: calc(100% - 40px);
    height: 380px;
    padding: 4vh;
    margin-top: calc((100vh - 380px) / 2);
    margin-right: 20px;
    margin-left: 20px;
    background-size: 100% 100%;
    border-radius: 10px;
    box-shadow: 0 2px 8px 0 rgba(7, 17, 27, 0.06);
  }

  &-hello {
    font-size: 32px;
    color: #fff;
  }

  &-title {
    margin-bottom: 30px;
    font-size: 20px;
    color: #fff;
  }
  .ant-input {
    height: 35px;
  }

  .ant-btn {
    width: 100px;
    height: 32px;
    border-radius: 99px;
  }
  .btn-position {
    text-align: right;
    width: 100%;
    display: block;
  }
}

.login-container-form {
  margin: 100px auto;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -25%);
  width: 400px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  position: absolute;
  box-shadow: 0 5px 15px #000;
  text-align: left;
  height: 320px;
  & > .login-container-hello {
    margin-top: 0;
    margin-bottom: 24px;
    color: #005691;
  }
  & > .login-container-title {
    color: #000;
    width: 60%;
    font-size: 20px !important;
    margin-top: 10px !important;
    margin-bottom: 10px !important;
  }
}
.accept-is {
  font-size: 16px;
  text-decoration-line: underline;
}
:deep(.ant-radio-wrapper) {
  margin: 0;
  font-weight: bold;
  text-align: 16px;
}

.name-middle {
  background: #fff;
  height: 50px;
  line-height: 50px;
  text-align: right;
  & > img {
    width: 180px !important;
    margin: 0 20px;
  }
}
</style>
