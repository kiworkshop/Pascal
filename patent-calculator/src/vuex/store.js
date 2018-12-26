import Vue from "vue";
import Vuex from "vuex";
import productClass from "../../public/data/class.json";
import 기본요금 from "../../public/data/basicFee.json";
import { deepcopy } from "../plugins/util";

const INITIALIZE_FEE = "INITIALIZE_FEE";
const UPDATE_FEE = "UPDATE_FEE";
const CHANGE_CLIENT = "CHANGE_CLIENT";
const ADD_PRODUCT = "ADD_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const EDIT_PRODUCT = "EDIT_PRODUCT";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    classes: productClass,
    selected: {},
    요금표: {},
    현재거래처: ""
  },
  getters: {
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
    요금표(state) {
      return deepcopy(state.요금표);
    },
    현재요금(state, getters) {
      return state.요금표[getters.현재거래처]
    },
    현재거래처(state) {
      return state.현재거래처
    },
    거래처목록(state) {
      return Object.keys(state.요금표);
    }
  },
  mutations: {
    [INITIALIZE_FEE](state) {
      if (store._vm.$session.get("요금표") === undefined || store._vm.$session.get("현재 거래처") === undefined) {
        store._vm.$session.set("요금표", { "기본": 기본요금 });
        store._vm.$session.set("현재 거래처", "기본")
      }
      state.요금표 = store._vm.$session.get("요금표");
      state.현재거래처 = store._vm.$session.get("현재 거래처");
    },
    [UPDATE_FEE](state, 새요금표) {
      state.요금표 = deepcopy(새요금표);
      store._vm.$session.set("요금표", state.요금표);
    },
    [CHANGE_CLIENT](state, client) {
      state.현재거래처 = client;
      store._vm.$session.set("현재 거래처", state.현재거래처);
    },
    [ADD_PRODUCT](state, product) {
      if (!(product["NICE분류"] in state.selected)) {
        state.selected[product["NICE분류"]] = {};
      }
      state.selected[product["NICE분류"]][product["id"]] = deepcopy(
        product
      );
      state.selected = deepcopy(state.selected);
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
      state.selected = deepcopy(state.selected);
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
      ] = deepcopy(product.edited);
      state.selected = deepcopy(state.selected);
    }
  },
  actions: {
    initializeFee({ commit }) {
      commit(INITIALIZE_FEE);
    },
    updateFee({ commit }, 새요금표) {
      commit(UPDATE_FEE, 새요금표);
    },
    changeClient({ commit }, client) {
      commit(CHANGE_CLIENT, client);
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