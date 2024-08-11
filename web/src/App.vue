<template>
 <div>
<NavBar></NavBar>
<router-view/>
 </div>
</template>
<script setup>
import NavBar from './components/NavBar.vue';
</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
::-webkit-scrollbar {
  height: 5px;
  width: 5px;
  position: absolute;

}
::-webkit-scrollbar-thumb{
  background-color: #1890ff;
  border-radius: 5px;
}
::-webkit-scrollbar-track{
  background-color: #ddd;
}
</style>