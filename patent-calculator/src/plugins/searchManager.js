import axios from 'axios'

export default class SearchManager {
  constructor () {
    this.unnoticedId = 0;
  }
  
  search (payload, callback) {
    let searchingProducts = this.trimSearchingProducts(payload.searchingProducts);
    return this.makeRequests(payload._class, searchingProducts);
  }

  trimSearchingProducts (searchingProducts) {
    return Object.keys(searchingProducts.split(/[,]+[\s]*/)
    .reduce((accumulator, value) => {
      if (!accumulator.hasOwnProperty(value)) {
        accumulator[value] = null;
      }
      return accumulator;
    }, {}));
  }

  makeURL (searchingProducts) {
    let productsString = "";
    for (let product of searchingProducts) {
        productsString += "|" + product;
    }
    const baseURL = 'https://oow1cmv2z7.execute-api.ap-northeast-2.amazonaws.com/Pascal';
    const encodedURL = baseURL + '?format=json&pretty=true&q=' + encodeURI(productsString);
    return encodedURL;
  }

  makeRequests (_class, searchingProducts) {
    const batchSize = 20;
    let requests = [];
    const repeat = Math.ceil(searchingProducts.length / batchSize);

    for (let cycle = 0; cycle < repeat; cycle++) {
      requests.push(this.makeRequestPromise(this.makeURL(searchingProducts.slice(batchSize * cycle, batchSize * (cycle + 1)))));
    }
    return Promise.all(requests).then((response) => {
      return this.classifyNoticedOrUnnoticed(_class, searchingProducts, this.buildCheckList(response));
    });
  }

  makeRequestPromise (url) {
    return axios.get(url).then((response) => {
      let repeatTimes = Math.ceil(response.data.hits.found / 10000);  // search 결과를 10000개 단위로 가져오도록 합니다.
      let noticedProducts = [];

      let noticedProductSearcher = axios.get(url + '&size=10000&cursor=initial');
      for (let cycle = 0; cycle < repeatTimes - 1; cycle++){  //10000개 단위로 결과를 받아올 때, 순차적으로 query를 보내도록 함
        noticedProductSearcher = noticedProductSearcher.then((response) => {
          let cursor = response.data.hits.cursor;
          noticedProducts = noticedProducts.concat(response.data.hits.hit);
          return axios.get(url + '&size=10000&cursor=' + cursor);
        });
      }
      noticedProductSearcher = noticedProductSearcher.then((response) => {
        noticedProducts = noticedProducts.concat(response.data.hits.hit);
        return noticedProducts;    // get request를 모두 보내고 search가 끝나면 찾아낸 고시상품들을 리턴
      });
      return noticedProductSearcher;
    });
  }

  buildCheckList (response) {
    return response.reduce((accumulator, array) => {
      for (const value of array) {
        accumulator[value["fields"]["name_kor"]] = value["fields"];
        accumulator[value["fields"]["name_kor"]]["id"] = parseInt(value["id"]);
      }
      return accumulator;
    }, {});
  }

  classifyNoticedOrUnnoticed (_class, searchingProducts, checklist) {
    return searchingProducts.reduce((accumulator, searchingProduct) => {
      if (checklist && checklist.hasOwnProperty(searchingProduct)) {
        accumulator['noticed'].push({
          'id': checklist[searchingProduct]["id"],
          'NICE분류': parseInt(checklist[searchingProduct]["nice"]),
          '지정상품(국문)': checklist[searchingProduct]["name_kor"],
          '지정상품(영문)': checklist[searchingProduct]["name_eng"],
          '유사군코드': checklist[searchingProduct]["code"],
          '고시명칭': true
        });
      } else {
        accumulator['unnoticed'].push({
          'id': this.generateProductId(),
          'NICE분류': _class,
          '지정상품(국문)': searchingProduct,
          '지정상품(영문)': '',
          '유사군코드': '',
          '고시명칭': false
        });
      }
      return accumulator;
    }, {'noticed': [], 'unnoticed': []})
  }

  generateProductId() {
    return --this.unnoticedId;
  }
}
