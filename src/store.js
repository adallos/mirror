import Vue from 'vue'
import Vuex from 'vuex'
import db from './firebase'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        appts: [],
        nextTenAppts: [],
        fetchStart: 10,
        selectedAppt: ''
    },
    getters: {
        getAppts(state) {
            return state.appts
        },
        getFetchStart(state) {
            return state.fetchStart
        },
        selectedAppt(state) {
            return (apptId) => {
                return state.appts.find((apptId) => {
                    return apptId.id === apptId
                })
            }
        }
    },
    mutations: {
        increaseFetchLimit(state) {
            return state.fetchStart += 10
        },
        setAppts(state, appts) {
            return state.appts = appts
        },
    },
    actions: {
        fetchAppts({ commit }, payload) {
            const nextTenAppts = []
            let d = new Date()
            let currentTime = `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + (d.getDate())).slice(-2)} ${('0' + (d.getHours() + 1)).slice(-2)}:${('0' + (d.getMinutes())).slice(-2)}:${('0' + (d.getSeconds() + 1)).slice(-2)}`

            db.collection('appts')
                .where('appointmentStart', '>=', currentTime)
                .orderBy('appointmentStart')
                .limit(payload)
                .get()
                .then(snapshot => {
                    let lastVisible = snapshot.docs[snapshot.docs.length - 1];
                    snapshot.forEach(document => {
                        let appt = document.data()
                        appt.id = document.id;
                        nextTenAppts.push(appt)
                    })
                    console.log(lastVisible);
                })
            commit('setAppts', nextTenAppts)


        },
        fetchNextTen(context) {
            context.commit('increaseFetchLimit')
        },
    }
})