<template>
 <el-carousel v-if="productList.length!==0" height="calc(100vh - 60px)" direction="vertical" :autoplay="false">
    <el-carousel-item v-for="item in productList" :key="item._id">
     <div :style="{
      backgroundImage: `url(${item.cover})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh'
      
     }">
     <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ item.title }}</span>
      </div>
    </template>
    <div>
      <div>{{ item.introduction }}</div>
      <div style="margin-top:20px">{{ item.detail }}</div>
    </div>
    </el-card>
    </div>
    </el-carousel-item>
  </el-carousel>
  <el-empty v-else description="产品不存在"></el-empty>
  </template>
  
  <script setup>
  import { ref,onMounted } from 'vue';
  import { getProductImg } from '@/api/product';

  const productList = ref([]);
  onMounted(()=>{
    getProductImgList();
  } 
  );
  const getProductImgList = async () => {
    const res = await getProductImg();
    if(res.data.code === 200){
      productList.value = res.data.data;
    } else{
      ElMessage.error('产品不存在');
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.box-card{
  width: 50%;
  height: 100%;
  background-color: white ;
  opacity: 0.8;
}
  </style>