import Vue from 'vue';
import Vuex from 'vuex';
import productClass from '../../public/data/class.json'
import 기본료 from '../../public/data/basicFee.json'

const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        trademarks: 1,
        classes: productClass,
        products: [],
        selected: {},
        기본료: 기본료
    },
    getters: {
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
        allAnnounced(state) {
            for (var _class in state.selected) {
                for (var id in state.selected[_class]) {
                    if (!state.selected[_class][id]['고시명칭']) {
                        return false
                    }
                }
            } 
            return true
        },
        calculateFee(state, getters) {
            let 비용 = { 
                검색단계: {
                    대리인수수료: 0
                },
                출원단계: {
                    대리인수수료: 0,
                    관납료: 0
                },
                등록단계: {
                    대리인수수료: 0,
                    관납료: 0
                }                
            }
            비용.검색단계.대리인수수료 = getters.selectedClassesCount * state.기본료.검색단계.대리인수수료
            비용.출원단계.대리인수수료 = getters.selectedClassesCount * state.기본료.출원단계.대리인수수료
            비용.등록단계.대리인수수료 = getters.selectedClassesCount * state.기본료.등록단계.대리인수수료
 
            // 모든 상품 명칭이 고시명칭인 경우 officialAppAnnounced를 사용
            var 출원관납료 = state.기본료.출원단계.관납료
            if (getters.allAnnounced){
                출원관납료 = state.기본료.출원단계['관납료(고시)']
            }

            let goodsOver20 = 0;
            for (const _class in getters.selected) {
              if (getters.selected.hasOwnProperty(_class)) {
                비용.출원단계.관납료 += 출원관납료;
                비용.등록단계.관납료 += state.기본료.등록단계.관납료;
                goodsOver20 = Object.keys(_class).length - 20;
                if (goodsOver20 > 0) {
                  비용.출원단계.관납료 += goodsOver20 * state.기본료.추가관납료
                  비용.등록단계.관납료 += goodsOver20 * state.기본료.추가관납료
                }
              }
            }
            return 비용
        }
    },
    mutations: {
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
        [EDIT_PRODUCT](state, product) {
            let classObject = state.selected[product.toEdit['NICE분류']]
            delete classObject[product.toEdit['id']]
            if (Object.keys(classObject).length === 0 && classObject.constructor === Object) {
                delete state.selected[product.toEdit['NICE분류']]
            }
            if (!(product.edited['NICE분류'] in state.selected)) {
                state.selected[product.edited['NICE분류']] = {}
            }
            state.selected[product.edited['NICE분류']][product.edited['id']] = Object.assign({}, product.edited)
            state.selected = Object.assign({}, state.selected)
        }
    },
    actions: {
        addProduct({ commit }, product) {
            commit(ADD_PRODUCT, product)
        },
        deleteProduct({ commit }, product) {
            commit(DELETE_PRODUCT, product)
        },
        editProduct({ commit }, product) {
            commit(EDIT_PRODUCT, product)
        }
    }
})