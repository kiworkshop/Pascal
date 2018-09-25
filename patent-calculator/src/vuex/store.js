import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS'

Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        products: {},
        categories: [
            '전체',
            '1류 (공업용, 과학용 및 농업용 화학품)',
            '2류 (페인트, 착색제, 부식방지제, 목재보존재)',
            '3류 (세정제 및 화장용품 제제)',
            '4류 (공업용 오일, 연료, 발광체)',
            '5류 (약제)',
            '6류 (금속제품, 금속제, 건축재료)',
            '7류 (기계, 기계공구, 모터 및 엔진)',
            '8류 (수동식 기기)',
            '9류 (전기기기, 과학기기)',
            '10류 (의료기기)',
            '11류 (환경제어장치)',
            '12류 (수송기계기구)',
            '13류 (화기 및 화공품)',
            '14류 (귀금속 제품, 보석류[장신구], 시계류)',
            '15류 (악기)',
            '16류 (종이제품, 인쇄물, 문방구)',
            '17류 (고무제품, 반가공 플라스틱, 절연, 단열 방음용 재료)',
            '18류 (가죽제품, 마구)',
            '19류 (비금속제 건축재료)',
            '20류 (가구, 플라스틱 제품)',
            '21류 (가정용 및 주방용 기구, 화장용구, 유리 및 도자기제품',
            '22류 (로프, 끈, 직물용 미가공 섬유)',
            '23류 (직물용 실)',
            '24류 (직물, 가정용 직물제 커버)',
            '25류 (의류, 신발, 모자)',
            '26류 (의류 및 헤어 장식품)',
            '27류 (완공된 마루 및 벽 등에 붙이는 비품)',
            '28류 (오락 및 놀이용구, 운동용품)',
            '29류 (육류, 가공식품)',
            '30류 (곡물, 커피, 차, 코코아)',
            '31류 (신선한(가공하지 않은) 육산물, 살아있는 동식물 및 사료)',
            '32류 (비알코올성 음료, 맥주)',
            '33류 (알코올 음료)',
            '34류 (담배, 흡연용품, 성냥)',
            '35류 (광고, 기업관리업)',
            '36류 (금융업, 보험업, 부동산업)',
            '37류 (건설업, 수선업)',
            '38류 (통신업)',
            '39류 (운송[사람, 동물, 물품] 서비스업, 물품 보관서비스업)',
            '40류 (재료처리업[주문자 제조방식의 서비스 포함])',
            '41류 (교육업, 연예오락업)',
            '42류 (컴퓨터, 과학기술 서비스업)',
            '43류 (음식료품 제공서비스업, 임시숙박업)',
            '44류 (의료, 미용, 농업)',
            '45류 (개인 또는 법무 서비스업)'
        ]
    },
    getters: {
        products (state) {
            return state.products
        },
        categories (state) {
            return state.categories
        }
    },
    mutations: {
        [UPDATE_PRODUCTS] (state, products) {
            state.products = products
        }
    },
    actions: {
        fetchProducts ({commit}) {
            const dataUrl = "https://s3.ap-northeast-2.amazonaws.com/pascal.kiworkshop/data/classification(minified)"
            axios.get(dataUrl)
            .then(result => result.data)
            .then(products => commit(UPDATE_PRODUCTS, products))
        }
    }
})