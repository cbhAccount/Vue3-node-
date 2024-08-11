<template>
  <div class="container">
    <div class="news-header" :style="{
      backgroundImage: `url(${img})`,
    }">
    <div class="search">
      <el-popover
    placement="bottom"
    title="检索结果"
    trigger="click"
    width="50%"
    :visible="visibleText"
    content="slot"
  >
  <template #default>
<div v-if="searchList.length && searchText">
  <div class="news-item" v-for="item in searchList" :key="item.id"
  @click="handleChangepage(item.id)" 
   >
    <span>{{ item.title }}</span>
  </div>
</div>
<div v-else>
    <el-empty description="暂无新闻" :image-size="50"></el-empty>
  </div>
  </template>
    <template #reference>
      <div>
        <el-input
        placeholder="请输入内容"
        v-model="searchText"
        :prefix-icon="Search"
        @input="
        if(searchText){
          visibleText = true
        }else{
          visibleText = false
        };"
        @blur="visibleText = false"
        type="search"
        size="large"
        @keyup.enter="searchNewsList({ keyword: searchText })"
      ></el-input>
      <el-button type="danger" @click="searchNewsList({keyword: searchText})">搜索</el-button>
      </div>
    </template>
  </el-popover>
    </div>
    </div>
    <div class="news-list">
      <el-row :gutter="20" style="margin: 0">
        <el-col :span="6" v-for="item in topList" :key="item.id">
      <el-card style="max-width: 480px" shadow="hover"
      @click="handleChangepage(item.id)">
    <template #header> 
      <div class="card">
        <div style="max-width: 40%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        /* 换行拼接单词 */
        word-break: break-all;
        ">
      <span style="font-weight: bold;font-size: 1.5rem;">{{ item.title }}</span>
      </div>
      <div>
        <span style="font-size: 1rem;font-weight: lighter;">{{ item.updateTime }}</span> 
      </div>
      </div>
      </template>
      <template #default>
        <div class="image" :style="{
          backgroundImage: `url(${item.cover})`,
        }">
        </div>
        <div class="content" v-html="item.content"></div>
      </template>
  </el-card>
        </el-col>
      </el-row>
    </div>
    <el-tabs
    style="margin-top: 20px;"
    v-model="activeName"
    type="card"
    class="demo-tabs"
  >
    <el-tab-pane v-for="item in tableList" :key="item.name" :label="item.label" :name="item.name">
      <el-row :gutter="20" style="margin: 0;">
        <el-col :span="18">
      <div v-for="data in tabNewsList[item.label]" :key="data._id">
        <el-card 
        style="width:100%; margin-top: 10px;" shadow="hover"
        @click="handleChangepage(data.id)">
        <div class="image" style="width:400px" :style="{
          backgroundImage: `url(${data.cover})`,
        }">
        </div>
        <div style="width:800px">
          <div class="card">
        <div style="max-width: 40%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        /* 换行拼接单词 */
        word-break: break-all;
        ">
      <span style="font-weight: bold;font-size: 1.5rem;">{{ data.title }}</span>
      </div>
      <div>
        <span style="font-size: 1rem;font-weight: lighter;">{{ data.updateTime }}</span> 
      </div>
      </div>
          <div class="content" v-html="data.content"></div>
        </div>
  </el-card>
      </div>
    </el-col>
 <el-col :span="6">
  <el-timeline style="max-width: 600px">
    <el-timeline-item
      v-for="(data, index) in tabNewsList[item.label]"
      :key="index"
      :timestamp="data.updateTime"
    >
    <el-card>
      <div style="width:100%">
        <span style="font-size: 2rem;">{{ data.title}}</span>
        <div class="content" v-html="data.content"></div>
      </div> 
      </el-card>
    </el-timeline-item>
  </el-timeline>
 </el-col>
</el-row>
    </el-tab-pane>
  </el-tabs>
  <el-backtop :right="100" :bottom="100" />
  </div>
  </template>
  
<script setup>
import img from '@/assets/news-header.jpg';
import { ref,onMounted, computed } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { getNews,searchNews } from '@/api/news';
import { useRouter } from 'vue-router';
//导入lodash
import _ from 'lodash';

const router=useRouter();
const activeName = ref(1);
const searchText = ref('');
const visibleText = ref(false);
const newsList = ref([]);
const searchList = ref([]);
const topList = ref([]);
const tableList = [
  {
    label: '最新动态',
    name: 1,
  },
  {
    label: '典型案例',
    name: 2,
  },
  {
    label: '通知公告',
    name: 3,
  }
]
onMounted(() => {
  getNewsList();
});
const getNewsList = async (params) => {
  const res = await getNews(params);
  if (res.data.code === 200) {
    newsList.value = res.data.data;
    topList.value = newsList.value.slice(0, 4);
  }
};
// 搜索新闻
const searchNewsList = async (params) => {
  if(!params.keyword){
    ElMessage.error('请输入搜索内容');
    return;
  }
  const res = await searchNews(params);
  if (res.data.code === 200) {
    searchList.value = res.data.data;
    visibleText.value = true;
  }
};
const tabNewsList = computed(() => {
  return _.groupBy(newsList.value, item=>item.category);
});
const handleChangepage = (id) => {
  router.push(`/news/${id}`);
};
</script>
  
<style lang="scss" scoped>
.news-header{
    height: 500px;
    background-size: cover;
    background-position: center;
    position: relative;
  }
.search{
    font-size: 0;
    width: 100%;
    position: absolute;
    top: 70%;
    text-align: center;
    vertical-align: center;
  }
::v-deep .el-input{
    font-size: 1.5rem;
      width: 50%;
      height:3rem;
      line-height: 3rem;
      vertical-align: middle;
}
::v-deep .el-button{
      height: 3rem;
      line-height: 3rem;
      width: 5rem;
      border:0;
      padding: 0;
      span{
        font-size: 1.5rem;
        line-height: 1.5rem;
        vertical-align: middle;
      }
}
.news-item{
  border-radius: 5px;
    padding: 1rem;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    //鼠标移入变色
    &:hover{
      background-color: skyblue;
    }
  }
  .news-list{
    width:100%;
    margin-top: 20px;
}
.image{
    width:100%;
    height: 200px;
    background-size: cover;
    background-position: center;
  }
.card{
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      background-color: rgba(255,255,255,0.5);
    }
.content{
    margin-top: 1rem;
    height: 4rem;
    max-height: 4rem;
    font-size: 1.5rem;
    line-height: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    word-break: break-all;
}
::v-deep .el-tab-pane .el-card .el-card__body{
  //弹性布局
  display: flex;
  flex-flow: row nowrap;
  justify-content: start;
}
</style>