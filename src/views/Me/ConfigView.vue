<template>
    <Suspense>
        <HeaderView :ismain="false"></HeaderView>
    </Suspense>
    <div class="config-all">
        <el-container>
            <el-aside>
                <div class="config-item">
                    <el-menu class="config-container">
                        <el-menu-item index="2" @click="selectView(2)">
                            <span>个人信息修改</span>
                        </el-menu-item>
                        <el-menu-item index="3" @click="selectView(3)">
                            <span>修改密码</span>
                        </el-menu-item>
                        <el-menu-item index="4" @click="selectView(4)">
                            <span>修改绑定手机</span>
                        </el-menu-item>
                        <el-menu-item index="5" @click="selectView(5)">
                            <span>默认回复</span>
                        </el-menu-item>
                        <el-menu-item index="6" @click="selectView(6)">
                            <span>更换头像</span>
                        </el-menu-item>
                    </el-menu>
                </div>
            </el-aside>
            <el-main>
                <div v-if="index == 2">
                    <el-form :model="tuser" v-if="tuser != undefined && userInfo != undefined">
                        <el-form-item label="昵称" prop="nickName">
                            <el-input v-model="tuser.nickName" placeholder="请输入昵称" :maxlength="10" clearable
                                :style="{ width: '40%' }"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form :model="userInfo" v-if="tuser != undefined && userInfo != undefined">
                        <el-form-item label="性别" prop="sex">
                            <el-select v-model="userInfo.sex" placeholder="请选择性别" clearable :style="{ width: '20%' }">
                                <el-option label="男" value="男"></el-option>
                                <el-option label="女" value="女"></el-option>
                                <el-option label="保密" value="保密"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="职业" prop="workType">
                            <el-input v-model="userInfo.workType" placeholder="请输入职业" clearable
                                :style="{ width: '50%' }"></el-input>
                        </el-form-item>
                        <el-form-item label="简介" prop="desc">
                            <el-input v-model="userInfo.desc" type="textarea" placeholder="请输入简介"
                                :autosize="{ minRows: 4, maxRows: 4 }" :style="{ width: '60%' }"></el-input>
                        </el-form-item>
                        <el-form-item size="large">
                            <el-button type="primary" @click="submitForm">提交</el-button>
                            <el-button @click="resetForm">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <div v-if="index == 3">
                    <el-form v-model="password" v-if="tuser != undefined && userInfo != undefined">
                        <el-form-item label="原密码">
                            <el-input type="password" show-password="true" v-model="password.old" placeholder="请输入原密码"
                                clearable :style="{ width: '40%' }"></el-input>
                        </el-form-item>
                        <el-form-item label="验证码">
                            <el-input v-model="password.code" placeholder="请输入验证码" clearable
                                :style="{ width: '20%' }"></el-input>
                            <el-button type="primary" @click="sendCode()">获取验证码</el-button>
                        </el-form-item>
                        <el-form-item label="新密码">
                            <el-input type="password" show-password="true" v-model="password.new" placeholder="请输入新密码"
                                clearable :style="{ width: '40%' }"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码">
                            <el-input type="password" show-password="true" v-model="password.new2" placeholder="请再次输入新密码"
                                clearable :style="{ width: '40%' }"></el-input>
                        </el-form-item>
                        <el-form-item size="large">
                            <el-button type="primary" @click="submitFormPassword">提交</el-button>
                            <el-button @click="resetFormPassword">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-if="index == 4" class="config-phone">
                    <el-steps :active="active" align-center v-if="tuser != undefined && userInfo != undefined">
                        <el-step title="验证旧手机号" />
                        <el-step title="输入新手机号" />
                        <el-step title="完成手机绑定修改" />
                    </el-steps>
                    <div v-if="active == 1" class="config-phone-1">
                        <el-form v-if="tuser != undefined && userInfo != undefined" v-model="phone">
                            <el-form-item label="原绑定手机手机号">
                                <el-input v-model="phone.phone" placeholder="请输入手机号" clearable
                                    :style="{ width: '40%' }"></el-input>
                            </el-form-item>
                            <el-form-item size="large">
                                <el-button type="primary" @click="nextView">下一步</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div v-if="active == 2" class="config-phone-2">
                        <el-form v-if="tuser != undefined && userInfo != undefined">
                            <el-form-item label="需要更换的手机号">
                                <el-input v-model="phone.newphone" placeholder="请输入手机号" clearable
                                    :style="{ width: '40%' }"></el-input>
                            </el-form-item>
                            <el-form-item size="large">
                                <el-button type="primary" @click="subPhone">下一步</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div v-if="active == 3" class="config-phone-3"> </div>
                </div>
                <div v-if="index == 5">
                    <el-form class="config-recode">
                        <el-form-item>
                            <el-table v-if="recodeList.length > 0" :data="recodeList" style="width: 100%" border>
                                <el-table-column prop="key" label="关键词" />
                                <el-table-column prop="value" label="回复内容" />
                                <el-table-column label="Operations">
                                    <template #default="scope">
                                        <el-button size="small" @click="handleEdit(scope.$index)">编辑</el-button>
                                        <el-button size="small" type="danger"
                                            @click="handleDelete(scope.$index)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="addlag"><el-icon>
                                    <Plus />
                                </el-icon> 添加默认回复</el-button>
                        </el-form-item>
                        <el-form-item size="large">
                            <el-button type="primary" @click="submitRecode(recodeList)">提交</el-button>
                            <el-button @click="resetCode(recodeList)">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-if="index == 6"> 
                    <el-text tag="h1">更改头像</el-text>
                    <pictureLoadViewVue :pictures="pictureList"></pictureLoadViewVue>
                    <el-button @click="uploadPicture(pictureList)">确认更改</el-button>
                </div>
            </el-main>
        </el-container>
    </div>

    <el-dialog v-model="dialogVisible" title="添加关键词" width="40%">
        <el-form>
            <el-form-item label="关键词">
                <el-input v-model="listItem.key" placeholder="请输入关键词"></el-input>
            </el-form-item>
            <el-form-item label="回复词">
                <el-input v-model="listItem.value" placeholder="请输入回复词">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="addEventListener">确认</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script lang="ts" setup>
import type { UserInfo } from '@/pojos/Typeimpl';
import HeaderView from './HeaderView.vue';
import { ref } from 'vue';
import type { UserFrom } from '@/pojos/TypeInclass';
import { getSelfInfo,updateAavatar, getUserInfo, updateInfoUser, updateDetailUser, updatePassword, getVerificationCode, getAllRecodeList, sendResetCode } from '@/apis/apis';
import { ElMessageBox } from 'element-plus';
import  pictureLoadViewVue from './picture/pictureLoadView.vue';
import {onMounted} from 'vue';
const index = ref(2);
const dialogVisible = ref(false);
const active = ref(1);
const recodeList = ref<recode[]>([])
const pictureList = ref([])

class recode {
    constructor(
        public key: string,
        public value: string
    ) { }
}

const listItem = ref<recode>({
    "key": "",
    "value": ""
})

const tuser = ref<UserFrom>()
const userInfo = ref<UserInfo>()
const olduserInfo = ref<UserInfo>();
const olduser = ref<UserFrom>();

const selectView = (indexs: number) => {
    index.value = indexs;
    console.log(indexs);
}
onMounted( async () => {
    userInfo.value = await getUserInfo() as UserInfo;
    tuser.value = await getSelfInfo() as UserFrom;
    recodeList.value = await getAllRecodeList() as recode[];
    olduser.value = { ...tuser.value };
    olduserInfo.value = { ...userInfo.value };
}
)
const password = ref({
    old: '',
    new: '',
    new2: '',
    code: ''
});

const phone = ref({
    phone: '',
    newphone: '',
});

const uploadPicture = async(list:string[]) =>{
    if(list.length > 0){
        const flag  = await updateAavatar(list[0]);
        if(flag){
            ElMessageBox.alert('修改成功');
        }
    }
    else{
        ElMessageBox.alert('请先上传头像');
    }
}
const subPhone = async () => {

}
//提交修改
const resetForm = async (userInfo: UserInfo | undefined, tuser: UserFrom | undefined) => {
    if (userInfo != undefined && tuser != undefined) {
        const flag = await updateInfoUser(tuser)
        const iflag = await updateDetailUser(userInfo)
        ElMessageBox.alert('修改成功', '成功', {
            type: 'success'
        })
        return
    }
    ElMessageBox.alert('修改失败', '失败', {
        type: 'error'
    })
}
//重置
const submitForm = () => {
    tuser.value = { ...olduser.value } as UserFrom;
    userInfo.value = { ...olduserInfo.value } as UserInfo;

}


//提交默认回复
const submitRecode = (list: any) => {

}
//提交修改密码
const submitFormPassword = async () => {
    const flag = await updatePassword(password.value.old, password.value.new)
    if (flag) {
        ElMessageBox.alert('修改成功', '成功', {
            type: 'success'
        })
        resetFormPassword()
    } else {
        ElMessageBox.alert('修改失败', '失败', {
            type: 'error'
        })
    }
}

//重置默认回复
const resetCode = async (list: recode[]) => {
    //确认全部重置
    ElMessageBox.confirm('确定重置所有默认回复吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(async () => {
        //发送清空请求
        const flag = await sendResetCode(list) as boolean
        if (flag) {
            ElMessageBox.alert('重置成功')
        }
        //清空
        list.splice(0)
    }).catch(() => {
        return
    })
}

//重置修改密码
const resetFormPassword = () => {
    password.value = {
        old: '',
        new: '',
        new2: '',
        code: ''
    }
}

//发送验证码
const sendCode = async () => {
    const code = await getVerificationCode(phone.value.phone) as string
    password.value.code = code
}

//下一步
const nextView = () => {
    active.value++;
}
//打开弹窗
const addlag = () => {
    dialogVisible.value = true
}


//添加默认回复
const addEventListener = () => {
    const existingIndex = recodeList.value.findIndex(item => item.key === listItem.value.key);
    if (existingIndex !== -1) {
        // 如果存在相同的 key，则更新对应项
        recodeList.value[existingIndex] = { ...listItem.value };
    }
    else {
        // 否则将新项添加到列表中
        recodeList.value.push({ ...listItem.value });
    }
    listItem.value.key = ''
    listItem.value.value = ''
    dialogVisible.value = false
}

//编辑
const handleEdit = (item: any) => {
    listItem.value = recodeList.value[item]
    dialogVisible.value = true
}
//删除
const handleDelete = (item: any) => {
    const index = recodeList.value.findIndex((v: any) => v.key === item.key)
    recodeList.value.splice(index, 1)
}

</script>
<style>
@import '../../assets/bask.css';
</style>


@/utils/apis@/pojos/TypeInclass@/pojos/Typeimpl