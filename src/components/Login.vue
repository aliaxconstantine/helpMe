<template>
  <!-- 弹窗 -->
  <el-dialog :visible="showDialog" title="登录失败" @close="handleCloseDialog">
    <p>{{ errorMessage }}</p>
  </el-dialog>
  <el-card class="login-card">
    <el-container>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="登录" name="first">
          <el-main>
            <h3>用户登录</h3>
            <el-form :model="loginForm" :rules="loginrules" label-width="80px" class="login-form">
              <el-form-item label="用户名" prop="name">
                <el-input v-model.trim="loginForm.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pwd">
                <el-input type="password" v-model.trim="loginForm.password" placeholder="请输入密码" :show-password="true"></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="code">
                <el-input v-model.trim="loginForm.code" placeholder="">
                  <template #append>
                    <el-button class="get-code" type="primary" @click="getCaptcha(loginForm.username)">获取验证码</el-button>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="stretch-button" type="primary"
                  @click="login(loginForm.username, loginForm.password, loginForm.code)">登录</el-button>
              </el-form-item>
            </el-form>
          </el-main>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <el-main>
            <h3>用户注册</h3>
            <el-form :model="registerForm" :rules="registerRules" label-width="80px" class="register-form">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model.trim="registerForm.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
              <el-form-item label="用户名" prop="username">
                <el-input v-model.trim="registerForm.loginName" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model.trim="registerForm.password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input v-model.trim="registerForm.phone" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="stretch-register" type="primary" @click="register(registerForm)">注册</el-button>
              </el-form-item>
            </el-form>
          </el-main>
        </el-tab-pane>
      </el-tabs>

    </el-container>
  </el-card>
</template>
  
<script setup lang="ts">
import { h, ref, reactive } from 'vue';
import { type TabsPaneContext, type FormRules, ElMessageBox } from 'element-plus'
import { getSelfInfo, routerView, registerUser, getVerificationCode } from "../utils/utils"
import { type TUser, type UserFrom, type RegisterForm, type HttpResult } from "../utils/TypeInclass"
import { type UserInfoFrom } from "../utils/Typeimpl";
import { store } from '../utils/auth';
import { userStore } from '../utils/role';


const ustore = userStore()

document.title = "请登录"
interface RuleForm {
  username: string,
  password: string,
  code: String
}

// 存储登录表单数据
const loginForm = ref({
  username: '',
  password: '',
  code: ''
});

// 登录方法
const showDialog = ref(false);
const errorMessage = ref('');

const getCaptcha = async (name: string) => {
  const code = await getVerificationCode(name) as string;
  if (code == null) {
    ElMessageBox({
      title: '提示消息',
      message: '验证码发送失败',
    })
    return
  }
  loginForm.value.code = code
  // 发送验证码
  ElMessageBox({
    title: '提示消息',
    message: '验证码已发送',
  })
}


//弹窗登录失败
const handleCloseDialog = (message: string) => {
  ElMessageBox({
    title: '提示消息',
    message: h('p', null, [
      h('span', null, message),
    ]),
  })
};

const loginsuccess = async (token: string) => {
  // 登录成功后的处理逻辑
  ustore.token = token;
  handleCloseDialog("登录成功")
  const user = await getSelfInfo() as UserInfoFrom;
  ustore.$patch(
    (state) => {
      if (user.userId != undefined) {
        state.userId = user.userId
        state.userName = user.nickName
        state.userImage = user.icon
      }
    }
  )
  routerView('')
}

const loginfailed = () => {
  handleCloseDialog("登录失败")
};

const login = async (username: string, password: string, code: string) => {

  try {
    const token = await store.dispatch('auth/login', {
      username,
      password,
      code
    })
    loginsuccess(token)
  }
  catch (e) {
    loginfailed()
  }

}
//首选登录
const activeName = ref('first');

//更换标签时
const handleClick = (tab: TabsPaneContext, event: Event) => {

};

const loginrules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]

})


const registerForm = ref<RegisterForm>({
  email: '',
  nickName: '',
  loginName: '',
  password: '',
  achUrl: ''
});

const registerRules = reactive<FormRules<RegisterForm>>({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱', trigger: ['blur', 'change'] }
  ],
  nickName: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^[1][3-9]\d{9}$/, message: '请输入有效的手机号', trigger: ['blur', 'change'] }
  ],
  achUrl: [
    { required: true, message: '请上传用户头像', trigger: 'blur' }
  ]
});


const register = async (user: RegisterForm) => {
  const res = await registerUser(user)
  if (res !== undefined) {
    handleCloseDialog("注册成功,请登录")
  }
};

</script>
  
<style scoped>
.login-card {
  width: 400px;
  padding: 20px;
}

.login-form {
  margin-top: 20px;
}

.stretch-button {
  width: 100%;
  height: 120%;
}

.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.register-card {
  width: 400px;
  padding: 20px;
}

.register-form {
  margin-top: 20px;
}

.avatar-upload-tip {
  color: #999;
  font-size: 12px;
  margin-top: 5px;
}

.stretch-register {
  width: 100%;
  height: 120%;
}
</style>

../utils/apis../pojos/TypeInclass../pojos/Typeimpl