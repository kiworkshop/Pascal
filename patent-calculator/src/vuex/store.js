import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES'
const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS'

Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        categories: {},
        products: {},
        selected: []
    },
    getters: {
        products (state) {
            return state.products
        },
        categories (state) {
            return state.categories
        },
        selectedCount (state) {
            return state.selected.length
        }
    },
    mutations: {
        [UPDATE_CATEGORIES] (state, categories) {
            state.categories = categories
        },
        [UPDATE_PRODUCTS] (state, products) {
            state.products = products
        }
    },
    actions: {
        fetchCategories ({commit}) {
            const dataUrl = "https://s3.ap-northeast-2.amazonaws.com/pascal.kiworkshop/data/categories"
            axios.get(dataUrl)
            .then(result => result.data)
            .then(categories => commit(UPDATE_CATEGORIES, categories))
        },
        fetchProducts ({commit}) {
            const dataUrl = "https://s3.ap-northeast-2.amazonaws.com/pascal.kiworkshop/data/classification(minified)"
            axios.get(dataUrl)
            .then(result => result.data)
            .then(products => commit(UPDATE_PRODUCTS, products))
        }
    }
})