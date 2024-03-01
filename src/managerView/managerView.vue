<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <el-menu  class="el-menu-vertical-demo" @select="">
          <el-menu-item index="ad">广告管理</el-menu-item>
          <el-submenu index="user">
            <template #title>用户管理</template>
          </el-submenu>
          <el-menu-item index="task">任务管理</el-menu-item>
          <el-submenu index="ban">
            <template #title>类别管理</template>
            <el-menu-item index="subCat1"></el-menu-item>
            <el-menu-item index="subCat2"></el-menu-item>
          </el-submenu>
          <el-menu-item index="other">其他管理</el-menu-item>
          <el-submenu index="banword">
            <template #title>违禁词管理</template>
            <el-menu-item index="subWord1"></el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>





</script>