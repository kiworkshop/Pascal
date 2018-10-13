import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const UPDATE_CLASSES = 'UPDATE_CLASSES'
const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS'
const UPDATE_FEE = 'UPDATE_FEE'
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
        basicFee: {},
        fee: {},
        feeSettingList: {
            '기본값': {
              agentSearch: 50000,
              agentApp: 200000,
              agentReg: 150000,
              additional: 2000,
              officialApp: 62000,
              officialAppAnnounced: 56000,
              officialReg: 211000,
              officialTax: 9120      
            }
          }
    },
    getters: {
        trademarks(state) {
            return state.trademarks
        },
        basicFee(state) {
            return state.basicFee
        },
        feeSettingList(state) {
            return state.feeSettingList
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
                agentSearch: 0, agentApp: 0, agentReg: 0, 
                officialApp: 0, officialReg: 0
            }
            fee.agentSearch = getters.selectedClassesCount * state.basicFee.agentSearch
            fee.agentApp = getters.selectedClassesCount * state.basicFee.agentApp
            fee.agentReg = getters.selectedClassesCount * state.basicFee.agentReg
 
            // 모든 상품 명칭이 고시명칭인 경우 officialAppAnnounced를 사용
            let goodsOver20 = 0;
            for (const _class in getters.selected) {
              if (getters.selected.hasOwnProperty(_class)) {
                fee.officialApp += state.basicFee.officialApp;
                fee.officialReg += state.basicFee.officialReg;
                goodsOver20 = Object.keys(_class).length - 20;
                if (goodsOver20 > 0) {
                  fee.officialApp += goodsOver20 * state.basicFee.additional
                  fee.officialReg += goodsOver20 * state.basicFee.additional
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
        [UPDATE_FEE](state) {
            state.basicFee = this.state.feeSettingList['기본값']
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
        fetchFeeSettings({ commit }) {
            commit(UPDATE_FEE)
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