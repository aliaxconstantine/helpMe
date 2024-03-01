<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, type UploadFile, type UploadRequestHandler } from 'element-plus';
import { errorLog, url } from "@/utils/axiosRequest";
import { uploadFile } from "@/utils/utils";

const props = defineProps({
    pictures: {
        type: Array<String>,
        required: true
    }
});

const file = ref();
const dialogImageUrl = ref('');
const dialogVisible = ref(false);

const beforeAvatarUpload = (rawFile: File): boolean => {
    try {
        const isLt2M = rawFile.size! / 1024 / 1024 < 2;
        if (!isLt2M) {
            ElMessage.error('请上传 2MB 以下的图片!');
            return false;
        }
        return isLt2M;
    } catch (error) {
        errorLog(new Error('在上传头像之前验证时出错'));
        // 进行错误处理
        return false; // 或者返回合适的值，以表示验证失败
    }
};

const handlePictureCardPreview = (uploadFile: UploadFile) => {
    try {
        dialogImageUrl.value = uploadFile.url!;
        dialogVisible.value = true;
    } catch (error) {
        errorLog(new Error('处理图片预览时出错'));
        // 进行错误处理
    }
};

const handleRemove = async(file: UploadFile) => {
    try {
        const index = props.pictures.indexOf(file.url!);
        if (index > -1) {
            props.pictures.splice(index, 1);
        }
    } catch (error) {
        errorLog(new Error('处理删除图片时出错'));
        // 进行错误处理
    }
};

const handleUpload = async (param:any) => {
    try {
        beforeAvatarUpload(param.file);
        console.log(param.file);
        const iurl = await uploadFile(param.file) as String;
        if (iurl == null) {
            ElMessage.error('上传失败');
            param.onError();
        }
        if(props.pictures.length > 4){
            ElMessage.error('最多上传5张图片');
            param.onError();
        }
        props.pictures.push(url+iurl);
        param.onSuccess();
    } catch (error) {
        ElMessage.error('上传失败');
    }
};
</script>
  
<template>
    <el-upload action list-type="picture-card" :auto-upload="true" :http-request="handleUpload" :on-remove="handleRemove"
        :on-preview="handlePictureCardPreview" :file-list="props.pictures">
        <el-icon>
            <Plus />
        </el-icon>
        <el-image v-if="file" :src="file.url" class="avatar" />
    </el-upload>
    <el-dialog v-model="dialogVisible" width="100%" style="height: 100%;" class="dialog-back" :modal="false">
        <img :src="dialogImageUrl" alt="Preview Image" class="img-dia" />
    </el-dialog>
</template>



<style scoped>
.dialog-back {
    background-color: rgba(0, 0, 0, 0.312) !important;
}

.img-dia {
    max-width: 100%;
    /* 图片的最大宽度为父元素宽度 */
    max-height: 100%;
    /* 图片的最大高度为父元素高度 */
    width: auto;
    /* 根据max-width和max-height自适应调整宽度 */
    height: auto;
    /* 根据max-width和max-height自适应调整高度 */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>@/apis/axiosRequest@/utils/apis