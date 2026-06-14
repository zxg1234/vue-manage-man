<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px;">
      <!-- 用户基本信息 -->
      <div class=" left-col">
        <el-card shadow="hover">
          <!-- 用户头像和基础信息 -->
          <div class="user-info">
            <img src="../assets/img/img.png" class="user-avatar" />
            <div class="login-info">
              <span class="accout">Admin</span>
              <span class="name">超级管理员</span>
            </div>
          </div>
          <!-- 登录信息 -->
          <div class="login-tip">
            <p>上次登录时间: <span class="login-time">2024-06-01 12:00:00</span></p>
            <p>上次登录地点: <span class="login-location">北京市</span></p>
          </div>
        </el-card>
        <!-- 课程购买列表 -->
        <el-card shadow="hover" class="course-card">
          <!-- 表格 -->
          <el-table :data="tableData" stripe style="width: 100%;">
            <el-table-column label="课程" prop="courseName" />
            <el-table-column label="今日购买" prop="todayBuy" />
            <el-table-column label="本月购买" prop="monthBuy" />
            <el-table-column label="总购买" prop="totalBuy" />
          </el-table>
        </el-card>
      </div>
    </el-col>
    <el-col :span="16" style="padding-left: 10px;">
      <!-- 数量支付统计 -->
      <div class="card-container">
        <el-card v-for="(item, index) in cardList" :key="index" shadow="hover" class="stat-card" :body-style="{padding:0}">
          <div class="card-inner">
            <!-- 图标圆框，动态背景色 -->
            <div class="icon-wrap" :style="{ backgroundColor: item.bgColor }">
              <el-icon size="28">
                <component :is="item.icon" />
              </el-icon>
            </div>
            <div class="info">
              <div class="num-text">{{ item.count }}</div>
              <div class="desc-text">{{ item.desc }}</div>
            </div>
          </div>
        </el-card>
      </div>

      <!-- echarts图 -->
      <div class="chart-container">
        <!-- 顶部：折线图卡片 通栏 -->
        <el-card shadow="hover" class="card-line" body-style="{height: 250px;padding: 0}">
            <div ref="barChartRef" style="width: 100%; height: 100%;"></div>
        </el-card>
        <!-- 下方一行两列：柱状图 + 饼图 -->
        <div class="bar-pie-container">
          <el-card shadow="hover" class="card-bar">

          </el-card>
          <el-card shadow="hover" class="card-pie">

          </el-card>
        </div>
      </div>

    </el-col>
  </el-row>
</template>

<script setup>
import { ref,reactive,onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts'
const tableData = [
  { courseName: 'JavaScript入门', todayBuy: 120, monthBuy: 3000, totalBuy: 50000 },
  { courseName: 'Vue.js实战', todayBuy: 80, monthBuy: 2000, totalBuy: 35000 },
  { courseName: 'React全栈', todayBuy: 150, monthBuy: 4000, totalBuy: 60000 },
  { courseName: 'Python数据分析', todayBuy: 200, monthBuy: 5000, totalBuy: 80000 },
  { courseName: 'Java后端开发', todayBuy: 90, monthBuy: 2500, totalBuy: 45000 },
  { courseName: 'C++性能优化', todayBuy: 60, monthBuy: 1500, totalBuy: 30000 },
  { courseName: 'Go微服务', todayBuy: 110, monthBuy: 3500, totalBuy: 55000 },
  { courseName: 'Rust系统编程', todayBuy: 70, monthBuy: 1800, totalBuy: 32000 }
];
const cardList = reactive([
  {
    icon: 'User',
    bgColor: '#409EFF',
    count: 12680,
    desc: '注册总用户'
  },
  {
    icon: 'ShoppingCart',
    bgColor: '#67C23A',
    count: 3521,
    desc: '今日订单量'
  },
  {
    icon: 'Money',
    bgColor: '#E6A23C',
    count: 125680,
    desc: '总收入(元)'
  },
  {
    icon: 'Goods',
    bgColor: '#F56C6C',
    count: 216,
    desc: '上架课程数'
  },
  {
    icon: 'View',
    bgColor: '#9C88FF',
    count: 98650,
    desc: '页面访问量'
  },
  {
    icon: 'Tickets',
    bgColor: '#18A0FB',
    count: 418,
    desc: '发放优惠券'
  }
])

 // 折线图配置项
const categoryOption = reactive({
    title: {
    text: 'Stacked Line'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  },
    grid: {
    top: 50,
    bottom: 60,   // 预留x轴文字空间即可
    left: 45,
    right: 15
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
  })
// 绑定DOM容器
const barChartRef = ref(null)
let chartInstance = null
// 初始化折线图
const initCategoryChart = () => {
  // 实例化图表
  if (!barChartRef.value) return
  // 避免重复创建实例
  if (chartInstance) chartInstance.dispose()
  chartInstance = echarts.init(barChartRef.value)
   // 应用配置项
  chartInstance.setOption(categoryOption)
}

// ✅ DOM挂载完成后再初始化图表
onMounted(() => {
  initCategoryChart()
})

// 组件销毁释放实例，内存泄漏
onUnmounted(() => {
  chartInstance?.dispose()
})
</script>

<style lang="less" scoped>
.left-col {
  height: 100%;
  display: flex;
  flex-direction: column;

  .course-card {
    margin-top: 20px;
    flex: 1;
  }

  .user-info {
    display: flex;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;

    .user-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-right: 20px;
    }

    .login-info {
      display: flex;
      flex-direction: column;
      /* 垂直方向排列 */
      justify-content: center;

      .accout {
        font-size: 25px;
        font-weight: bold;
      }

      .name {
        font-size: 15px;
        color: #aaa5a5;
      }
    }
  }

  .login-tip {
    p {
      margin: 0 0 8px 0; // 两行p之间上下间距
      line-height: 1.8;

      .login-time,
      .login-location {
        margin-left: 100px; // 静态文字和动态数据横向间隔
        color: #000000;
        font-size: 15px;
      }
    }
  }


}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .stat-card {
    width: 32%;
      margin-bottom: 10px;
    .card-inner {
      // 图标和右侧文字水平并排、垂直居中
      display: flex;
      align-items: center;
      gap: 18px;
      padding: 0;
    }

    .icon-wrap {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      flex-shrink: 0; // 固定图标大小，不会被压缩
    }

    .info {
      // 数量、描述上下纵向排列
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 10px;

      .num-text {
        font-size: 28px;
        font-weight: 700;
        line-height: 1.1;
      }

      .desc-text {
        font-size: 14px;
        color: #909399;
        margin-top: 6px;
      }
    }
  }
}

.chart-container {
  .card-line{
    height: 250px;
  }

 .bar-pie-container{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  height: 200px;
  .el-card{
    width: 48%;
  }
 }
}
</style>