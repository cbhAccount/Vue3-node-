import { defineStore } from 'pinia'
import { getTopnews } from '../api/news'
 
export const usenewsStore = defineStore('news', {
    state: () => ({ newsTop: [] }),
    getters: {
    },
    actions: {
        async getNewsTop(num) {
            const res = await getTopnews(num)
            this.newsTop = res.data.data
            console.log('top', this.newsTop)
        },
    },
    //数据持久化
    persist: {
        enabled: true,
    },
})