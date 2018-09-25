import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS'

Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        products: {}
    },
    mutations: {
        [UPDATE_PRODUCTS] (state, products) {
            state.products = products
        }
    },
    actions: {
        fetchProducts ({commit}) {
            const dataUrl = "https://s3.ap-northeast-2.amazonaws.com/pascal.kiworkshop/data/classification"
            axios.get(dataUrl)
            .then(result => result.data)
            .then(products => commit(UPDATE_PRODUCTS, products))
        }
    }
})