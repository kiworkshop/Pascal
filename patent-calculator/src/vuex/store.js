import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const UPDATE_CLASSES = 'UPDATE_CLASSES'
const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        classes: [],
        products: [],
        selected: {}
    },
    getters: {
        products(state) {
            return state.products
        },
        classes(state) {
            return state.classes
        },
        selected(state) {
            return state.selected
        },
        selectedCount(state) {
            let count = 0
            const classes = state.selected
            for (const _class in classes) {
                if (classes.hasOwnProperty(_class)) {
                    count += Object.keys(classes[_class]).length
                }
            }
            return count
        }
    },
    mutations: {
        [UPDATE_CLASSES](state, classes) {
            state.classes = classes
        },
        [UPDATE_PRODUCTS](state, products) {
            state.products = products
        },
        [ADD_PRODUCT](state, product) {
            if (!(product['NICE분류'] in state.selected)) {
                state.selected[product['NICE분류']] = {}
            }
            state.selected[product['NICE분류']][product['id']] = Object.assign({}, product)
            state.selected = Object.assign({}, state.selected)
        },
        [DELETE_PRODUCT](state, product) {
            let classObject = state.selected[product['NICE분류']]
            delete classObject[product['id']]
            if (Object.keys(classObject).length === 0 && classObject.constructor === Object) {
                delete state.selected[product['NICE분류']]
            }
            state.selected = Object.assign({}, state.selected)
        },
        [EDIT_PRODUCT](state, productToEdit) {
            state.selected[productToEdit['NICE분류']][productToEdit['id']] = Object.assign({}, productToEdit)
            state.selected = Object.assign({}, state.selected)
        }
    },
    actions: {
        fetchClasses({ commit }) {
            const dataUrl = "https://s3.ap-northeast-2.amazonaws.com/pascal.kiworkshop/data/categories.json"
            axios.get(dataUrl)
                .then(result => result.data)
                .then(classes => commit(UPDATE_CLASSES, classes))
        },
        fetchProducts({ commit }) {
            const dataUrl = "https://s3.ap-northeast-2.amazonaws.com/pascal.kiworkshop/data/classification(minified).json"
            axios.get(dataUrl)
                .then(result => result.data)
                .then(products => commit(UPDATE_PRODUCTS, products))
        },
        addProduct({ commit }, product) {
            commit(ADD_PRODUCT, product)
        },
        deleteProduct({ commit }, product) {
            commit(DELETE_PRODUCT, product)
        },
        editProduct({ commit }, productToEdit) {
            commit(EDIT_PRODUCT, productToEdit)
        }
    }
})