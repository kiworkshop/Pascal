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
        trademarks: 1,
        classes: [],
        products: [],
        selected: {},
        basicFee: {
            basicAgentFeeSearch: 50000,
            basicAgentFeeApp: 200000,
            basicAgentFeeReg: 150000,
            additionalFee: 2000,
            basicOfficialFeeApp: 62000,
            basicOfficialFeeReg: 211000,
            basicOfficialFeeTax: 9120      
        },
        fee: {}
    },
    getters: {
        trademarks(state) {
            return state.trademarks
        },
        basicFee(state) {
            return state.basicFee
        },
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
        },
        selectedClassesCount(state) {
            let count = 0;
            const classes = state.selected
            for (const _class in classes) {
              if (classes.hasOwnProperty(_class)) {
                 count += 1;
              }
            }
            return count      
        },
        calculateFee(state, getters) {
            let fee = { 
                agentFeeSearch: 0, agentFeeApp: 0, agentFeeReg: 0, 
                officialFeeApp: 0, officialFeeReg: 0
            }
            fee.agentFeeSearch = getters.selectedClassesCount * state.basicFee.basicAgentFeeSearch
            fee.agentFeeApp = getters.selectedClassesCount * state.basicFee.basicAgentFeeApp
            fee.agentFeeReg = getters.selectedClassesCount * state.basicFee.basicAgentFeeReg
 
            let goodsOver20 = 0;
            for (const _class in getters.selected) {
              if (getters.selected.hasOwnProperty(_class)) {
                fee.officialFeeApp += state.basicFee.basicOfficialFeeApp;
                fee.officialFeeReg += state.basicFee.basicOfficialFeeReg;
                goodsOver20 = Object.keys(_class).length - 20;
                if (goodsOver20 > 0) {
                  fee.officialFeeApp += goodsOver20 * state.basicFee.basicAdditionalFee
                  fee.officialFeeReg += goodsOver20 * state.basicFee.basicAdditionalFee
                }
              }
            }
            return fee
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