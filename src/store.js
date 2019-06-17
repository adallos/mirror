import Vue from 'vue'
import Vuex from 'vuex'
import db from './firebase'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appts:[],
    fetchStart:10
  },
  getters:{
    getAppts(state){
      return state.appts
    },
    getFetchStart(state){
      return state.fetchStart
    },
    selectedAppt(state){
      return(apptId) =>{
        return state.appts.find((apptId) => {
          return apptId.id === apptId
        })
      }
    }
  },
  mutations: {
    increaseFetchLimit(state){
      return state.fetchStart += 10
    },
    setAppts(state, appts){
      return state.appts = appts
    },    
  },
  actions: {
    fetchAppts({commit}, payload){
      const appts = []
      db.collection('appts')
        .orderBy('appointmentStart')
        .limit(payload)
        .get()
        .then(snapshot => {
          snapshot.forEach(document =>{
            let appt = document.data()
            appt.id = document.id;
            appts.push(appt)
          })
        })
        commit('setAppts', appts)
    },
    fetchNextTen(context){
      context.commit('increaseFetchLimit')
    },
  }
})