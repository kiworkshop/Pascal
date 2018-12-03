import Vue from "vue";
import Vuex from "vuex";
import productClass from "../../public/data/class.json";
import 기본요금 from "../../public/data/basicFee.json";

const SET_FEE = "SET_FEE";
const ADD_PRODUCT = "ADD_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const EDIT_PRODUCT = "EDIT_PRODUCT";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    trademarks: 1,
    classes: productClass,
    products: [],
    selected: {},
    거래처: "",
    현재요금: {}
  },
  getters: {
    products(state) {
      return state.products;
    },
    classes(state) {
      return state.classes;
    },
    selected(state) {
      return state.selected;
    },
    selectedCount(state) {
      let count = 0;
      const classes = state.selected;
      for (const _class in classes) {
        if (classes.hasOwnProperty(_class)) {
          count += Object.keys(classes[_class]).length;
        }
      }
      return count;
    },
    selectedClassesCount(state) {
      let count = 0;
      const classes = state.selected;
      for (const _class in classes) {
        if (classes.hasOwnProperty(_class)) {
          count += 1;
        }
      }
      return count;
    },
    allAnnounced(state) {
      for (var _class in state.selected) {
        for (var id in state.selected[_class]) {
          if (!state.selected[_class][id]["고시명칭"]) {
            return false;
          }
        }
      }
      return true;
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
      };
      비용.검색단계.대리인수수료 =
        getters.selectedClassesCount * getters.현재요금.검색단계.대리인수수료;
      비용.출원단계.대리인수수료 =
        getters.selectedClassesCount * getters.현재요금.출원단계.대리인수수료;
      비용.등록단계.대리인수수료 =
        getters.selectedClassesCount * getters.현재요금.등록단계.대리인수수료;

      // 모든 상품 명칭이 고시명칭인 경우 officialAppAnnounced를 사용
      let 출원관납료 = getters.현재요금.출원단계.관납료;
      if (getters.allAnnounced) {
        출원관납료 = getters.현재요금.출원단계["관납료(고시)"];
      }

      let goodsOver20 = 0;
      for (const _class in getters.selected) {
        if (getters.selected.hasOwnProperty(_class)) {
          비용.출원단계.관납료 += 출원관납료;
          비용.등록단계.관납료 += getters.현재요금.등록단계.관납료;
          goodsOver20 = Object.keys(_class).length - 20;
          if (goodsOver20 > 0) {
            비용.출원단계.관납료 +=
              goodsOver20 * getters.현재요금.출원단계.추가관납료;
            비용.등록단계.관납료 +=
              goodsOver20 * getters.현재요금.등록단계.추가관납료;
          }
        }
      }
      return 비용;
    },
    현재요금(state) {
      if (Object.keys(state.현재요금).length === 0) {
        if (store._vm.$session.get("비용") === undefined) {
          store._vm.$session.set("비용", {
            기본: 기본요금,
            "마지막 거래처": "기본"
          });
        }
        state.거래처 = store._vm.$session.get("비용")["마지막 거래처"];
        state.현재요금 = store._vm.$session.get("비용")[state.거래처];
      }
      return state.현재요금;
    },
    거래처(state) {
      return state.거래처;
    },
    거래처목록() {
      let 비용 = store._vm.$session.get("비용");
      delete 비용["마지막 거래처"];
      return Object.keys(비용);
    }
  },
  mutations: {
    [SET_FEE](state, feeSetting) {
      state.현재요금 = feeSetting;
    },
    [ADD_PRODUCT](state, product) {
      if (!(product["NICE분류"] in state.selected)) {
        state.selected[product["NICE분류"]] = {};
      }
      state.selected[product["NICE분류"]][product["id"]] = Object.assign(
        {},
        product
      );
      state.selected = Object.assign({}, state.selected);
    },
    [DELETE_PRODUCT](state, product) {
      let classObject = state.selected[product["NICE분류"]];
      delete classObject[product["id"]];
      if (
        Object.keys(classObject).length === 0 &&
        classObject.constructor === Object
      ) {
        delete state.selected[product["NICE분류"]];
      }
      state.selected = Object.assign({}, state.selected);
    },
    [EDIT_PRODUCT](state, product) {
      let classObject = state.selected[product.toEdit["NICE분류"]];
      delete classObject[product.toEdit["id"]];
      if (
        Object.keys(classObject).length === 0 &&
        classObject.constructor === Object
      ) {
        delete state.selected[product.toEdit["NICE분류"]];
      }
      if (!(product.edited["NICE분류"] in state.selected)) {
        state.selected[product.edited["NICE분류"]] = {};
      }
      state.selected[product.edited["NICE분류"]][
        product.edited["id"]
      ] = Object.assign({}, product.edited);
      state.selected = Object.assign({}, state.selected);
    }
  },
  actions: {
    setFee({ commit }, feeSetting) {
      commit(SET_FEE, feeSetting);
    },
    addProduct({ commit }, product) {
      commit(ADD_PRODUCT, product);
    },
    deleteProduct({ commit }, product) {
      commit(DELETE_PRODUCT, product);
    },
    editProduct({ commit }, product) {
      commit(EDIT_PRODUCT, product);
    }
  }
});
