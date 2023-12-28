import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useMsgStore = defineStore('msgStore', () => {
  const state = reactive({
    msgList:[]
  })
  const addChat=(user,commodity,dialogList,date)=>{
    let isExist=state.msgList.findIndex(item=>item.user.userid==user.userid&&item.commodity.id==commodity.id);
    if(isExist==-1){
      state.msgList.unshift({user,commodity,dialogList,date});
    }else{
      state.msgList.splice(isExist,1);
      state.msgList.unshift({user,commodity,dialogList,date});
    }
  }
  return {
    state,
    addChat
  }
})