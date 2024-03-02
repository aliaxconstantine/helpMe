<template>
    <footer class="footer">
      <div class="footer-content">
        <p>© 2024 商洛学院 - 版权所有</p>
        <ul class="footer-links">
          <li><a href="#">首页</a></li>
          <li><a href="#">关于我们</a></li>
          <li><a href="#">服务</a></li>
          <li><a href="#">联系方式</a></li>
        </ul>
      </div>
    </footer>
  </template>
    
  <style scoped>
  .footer {
    background-color: #000; /* 黑色背景 */
    color: #fff; /* 白色文字 */
    text-align: center; /* 文字居中 */
    padding: 20px 0; /* 上下填充 */
  }
  
  .footer-content {
    max-width: 1200px;
    margin: 0 auto; /* 水平居中 */
  }
  
  .footer-links {
    list-style: none; /* 移除列表项目的默认样式 */
    padding: 0;
  }
  
  .footer-links li {
    display: inline; /* 列表项水平排列 */
    margin-right: 20px; /* 列表项之间的间距 */
  }
  
  .footer-links a {
    color: #fff; /* 链接文字颜色 */
    text-decoration: none; /* 移除下划线 */
  }
  
  .footer-links a:hover {
    text-decoration: underline; /* 鼠标悬停时添加下划线 */
  }
  </style>
  