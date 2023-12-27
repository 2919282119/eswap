import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const state = reactive({
    aggCart:[]
  })
  const addToCart = (item) => {
    if(state.aggCart.findIndex(item2=>item2.id==item.id)==-1){
      state.aggCart.push({...item,count:1})
    }else{
      const tindex=state.aggCart.findIndex(item2=>item2.id==item.id);
      state.aggCart[tindex].count++;
    }
    
  }
  const removeFromCart = (cid) => {
    //我真tm服了，终于知道为啥出错了，删除一定要根据id删除，而不是根据整个对象删除，对象在修改count过程中改变了md
    const target=state.aggCart.find(item=>item.id==cid);
    const tindex=state.aggCart.indexOf(target);
    if(target.count>1){
      state.aggCart[tindex].count--;
    }else{
      state.aggCart.splice(tindex,1);
    }
  }
  const clearCart = () => {
    state.aggCart.splice(0);
  }
  const getCommodityCount = (cid) => {
    return state.aggCart.find(item=>item.id==cid)?.count??0;
  }
  const sumMoney = computed(() => {
    return state.aggCart.reduce((pre,cur)=>pre+cur.price*cur.count,0);
  })
  return {
    state,
    addToCart,
    removeFromCart,
    clearCart,
    getCommodityCount,
    sumMoney
  }
})