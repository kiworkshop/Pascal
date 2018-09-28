import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES'
const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'

Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        categories: [],
        products: [],
        selected: {}
    },
    getters: {
        products (state) {
            return state.products
        },
        categories (state) {
            return state.categories
        },
        selected (state) {
            return state.selected
        },
        selectedCount (state) {
            let count = 0
            const categories = state.selected
            for (const category in categories) {
                if (categories.hasOwnProperty(category)) {
                    count += Object.keys(categories[category]).length
                }
            }
            return count
        }
    },
    mutations: {
        [UPDATE_CATEGORIES] (state, categories) {
            state.categories = categories
        },
        [UPDATE_PRODUCTS] (state, products) {
            state.products = products
        },
        [ADD_PRODUCT] (state, product) {
            if (!(product['NICE분류'] in state.selected)) {
                state.selected[product['NICE분류']] = {}
            }
            state.selected[product['NICE분류']][product['id']] = product
            state.selected = Object.assign({}, state.selected)
        }
    },
    actions: {
        fetchCategories ({commit}) {
            const dataUrl = "https://s3.ap-northeast-2.amazonaws.com/pascal.kiworkshop/data/categories.json"
            axios.get(dataUrl)
            .then(result => result.data)
            .then(categories => commit(UPDATE_CATEGORIES, categories))
        },
        fetchProducts ({commit}) {
            const dataUrl = "https://s3.ap-northeast-2.amazonaws.com/pascal.kiworkshop/data/classification(minified).json"
            axios.get(dataUrl)
            .then(result => result.data)
            .then(products => commit(UPDATE_PRODUCTS, products))
        },
        addProduct ({commit}, product) {
            commit(ADD_PRODUCT, product)
        }
    }
})