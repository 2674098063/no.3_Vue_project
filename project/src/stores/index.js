import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        sorting: '',
        price: {
            min: 0,
            max: 1000
        },
        search: {
            value: ''
        },
        homeTop: 0,
        insTop: 0,
        batch_shop: {},
        foods: []
    },
    getters: {
        getAuthor(state) {
            return state.search
        },
        getSorting(state) {
            return state.sorting
        },
        getPrice(state) {
            return {...state.price }
        },
        getHomeTop(state) {
            return state.homeTop
        },
        getInsTop(state) {
            return state.insTop
        },
        getBatchShop(state) {
            return {...state.batch_shop }
        },
        getFoods(state) {
            return state.foods
        }
    },
    mutations: {
        setAuthor(state, data) {
            state.search = data
        },
        setSorting(state, data) {
            state.sorting = data
        },
        setPrice(state, data) {
            state.price = data
        },
        setHomeTop(state, data) {
            state.homeTop = data
        },
        setInsTop(state, data) {
            state.insTop = data
        },
        setBatchShop(state, data) {
            state.batch_shop = {...data }
        },
        setFoods(state, data) {
            state.foods = data
        }
    },
    actions: {
        setAuthor(context, data) {
            context.commit('setAuthor', data)
        },
        setSorting(context, data) {
            context.commit('setSorting', data)
        },
        setPrice(context, data) {
            context.commit('setPrice', data)
        },
        setHomeTop(context, data) {
            context.commit('setHomeTop', data)
        },
        setInsTop(context, data) {
            context.commit('setInsTop', data)
        },
        setBatchShop(context, data) {
            context.commit('setBatchShop', data)
        },
        setFoods(context, data) {
            context.commit('setFoods', data)
        }
    }
})