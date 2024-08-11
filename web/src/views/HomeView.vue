<template>
  <div>
 <el-carousel v-if="imgList.length" 
 :interval="3000" type="card" 
 height="calc(100vh - 60px)">
    <el-carousel-item v-for="item in imgList" :key="item.id">
      <div :style="{
        backgroundImage: `url(${item.cover})`,
        height: '100%',
        width: '100%',
        backgroundSize: 'cover',
      }">
      <h3 text="2xl" justify="center">{{ item.title }}</h3>
      </div>
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { getHomeImg } from '@/api/home';
let imgList = ref([]);
onMounted(() => {
  getImg();
  console.log(imgList);
});
const getImg = async () => {
 const res = await getHomeImg();
 if (res.data.code === 200) {
   imgList.value = res.data.data;
 }
};
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: black;
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
</style>