<template>
<el-row>
  <el-col :span="17" :offset="1">
    <h1>{{ newsInfo.title }}</h1>
    <div>
      <p>{{ newsInfo.updateTime }}</p>
    </div>
    <!-- 分割线 -->
    <el-divider>
      <el-icon>
        <StarFilled></StarFilled>
      </el-icon>
    </el-divider>
   <div v-html="newsInfo.content"></div>
  </el-col >
  <el-col :span="5" :offset="1" :pull="1">
    <el-card style="max-width: 480px">
    <template #header>
      <div class="card-header">
        <span>最新热点</span>
      </div>
    </template>
    <div style="margin-top: 20px;" v-for="item in newsTop" :key="item.id" class="text item"  @click="handleChangepage(item.id)" >
      <div style="
      width: 100%;
      font-size: 1.5rem;
      font-weight: bold;
      overflow: hidden;
      white-space: nowrap;
      /* 换行显示省略号; */
      text-overflow: ellipsis;
      "
      >{{ item.title }}</div>
      <div>
        <span style="font-size: 1rem;font-weight: lighter">{{ item.updateTime }}</span>
      </div> 
    </div>
  </el-card>
  </el-col>
</el-row>
</template>

<script setup>
import { onMounted,ref,onUpdated } from 'vue';
import { useRoute } from 'vue-router';
import {useRouter} from 'vue-router';
import { getNews } from '@/api/news';
import { StarFilled} from '@element-plus/icons-vue';
import { usenewsStore } from '../store';

const newsStore = usenewsStore();
const route = useRoute();
const router = useRouter();
const newsInfo = ref({});
const newsTop = ref([]);
onMounted(() => {
  console.log(route.params.id);
  getNewsOne({ id: route.params.id });
  newsStore.getNewsTop(5);
  newsTop.value = newsStore.newsTop;
  console.log('555555',newsTop.value);
});
onUpdated(() => {
  getNewsOne({ id: route.params.id });
});
const getNewsOne = async (params) => {
  const res = await getNews(params);
  if(res.data.code === 200){
    newsInfo.value = res.data.data[0];
    console.log(res.data.data);
  }
  else {
    ElMessage.error('该新闻不存在');
  }
  console.log(res);
};
const handleChangepage = (id) => {
  router.push(`/news/${id}`);
};
</script>

<style lang="scss" scoped>
.el-row{
  margin-top: 20px;
}
</style>