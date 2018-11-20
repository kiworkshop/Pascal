<template>
  <v-card>
    <v-toolbar color="grey lighten-4">
      <v-toolbar-title>추가할 지정상품</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs4>
            <v-select
            v-model="searchingClass"
            :items="classes"
            label="분류"
            ></v-select> <!--분류별 검색 기능 추가-->
          </v-flex>
          <v-flex xs8>
            <v-textarea
            v-model="inputString"
            label="명칭"
            :auto-grow="true"
            required
            ></v-textarea>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="black" flat @click.native="searchAndClassify(inputString)">검색 및 분류</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      inputString: '',
      backuptext: '',
      searchingClass: '',
      classes: this.$store.getters.classes,
      addingProduct: {
        'id':0,
        'NICE분류':'',
        '지정상품(국문)':'',
        '지정상품(영문)':'',
        '유사군코드':'',
        '고시명칭':false
      }
    }
  },
  methods: {
    initInput() { // 문자열 입력 input창 초기화
      this.searchingClass = '';
      this.backuptext = this.inputString;   //  검색 및 분류 버튼을 누른 이후에 되돌리는 기능 추가 구현 예정
      this.inputString = '';
    },
    splitText(text) {      //  space는 구분자로 인식하지 않고, ','만을 기준으로 하여 문자열 split해주는 함수
      return text.split(/[,]+[\s]*/);
    },
    searchAndClassify(inputString) {
      let searchingProducts = this.splitText(inputString);
      let productClass = this.$store.getters.classes.indexOf(this.searchingClass);
      let searchedList = [];

      if (searchingProducts[0] != "") {
        let encodedURL = this.makeURL(searchingProducts)
        this.$http.get(encodedURL).then((result) => {
          if (result.data.hits.found == 0) { // 고시목록 검색 결과가 없으면 모두 비고시상품으로 취급
            for (let searchingProduct of searchingProducts) {
              let unnoticedProduct = {
                'id': Math.random(),
                'NICE분류': '',
                '지정상품(국문)': searchingProduct,
                '지정상품(영문)': '',
                '유사군코드': '',
                '고시명칭': false
              };
              if (productClass != -1) {
                unnoticedProduct['NICE분류'] = productClass;
              }
              searchedList.push(unnoticedProduct);
            }
            if (searchedList != []) {
              this.transmitProducts(searchedList);
              this.initInput();
            }
          }
          else {    // 고시목록 검색 결과가 있는 경우 해당 목록 받아오고 분류
            let noticedProductsUpdator = this.getNoticedProducts(encodedURL, result.data.hits.found);
            noticedProductsUpdator.then((noticedProducts) => {
              const noticedProductsObj = noticedProducts.reduce((o, val) => {
                o[val["fields"]["name_kor"]] = val["fields"];
                o[val["fields"]["name_kor"]]["id"] = parseInt(val["id"]);
                return o;
              }, {});
              searchingProducts.forEach (
                (searchingProduct) => {
                  if(noticedProductsObj.hasOwnProperty(searchingProduct)) {
                    let noticedProduct = {
                      'id': noticedProductsObj[searchingProduct]["id"],
                      'NICE분류': parseInt(noticedProductsObj[searchingProduct]["nice"]),
                      '지정상품(국문)': noticedProductsObj[searchingProduct]["name_kor"],
                      '지정상품(영문)': noticedProductsObj[searchingProduct]["name_eng"],
                      '유사군코드': noticedProductsObj[searchingProduct]["code"],
                      '고시명칭': true
                    };
                    searchedList.push(noticedProduct);
                  } else {
                    let unnoticedProduct = {
                      'id': Math.random(),
                      'NICE분류': '',
                      '지정상품(국문)': searchingProduct,
                      '지정상품(영문)': '',
                      '유사군코드': '',
                      '고시명칭': false
                    };
                    if (productClass != -1) {
                      unnoticedProduct['NICE분류'] = productClass;
                    }
                    searchedList.push(unnoticedProduct);
                  }
                }
              );
              if (searchedList != []) {
                this.transmitProducts(searchedList);
                this.initInput();
              }
            });   //noticedProductsUpdator end
          }  // else end
        });  // this.http.get end
      }
    },
    makeURL(searchingProducts) {
      let productsString = ""
      for (let product of searchingProducts) {
          productsString += "|"+product;
      }
      let encodedProductsString = encodeURI(productsString);
      let encodedURL = 'https://oow1cmv2z7.execute-api.ap-northeast-2.amazonaws.com/Pascal?format=json&pretty=true&q=' + encodedProductsString;
      return encodedURL;
    },
    getNoticedProducts(url, found) {
      let repeatTimes = Math.ceil(found/10000);  // search 결과를 10000개 단위로 가져오도록 합니다.
      let noticedProducts = [];

      let noticedProductSearcher = this.$http.get(url + '&size=10000&cursor=initial');
      for (let cycle = 0; cycle < repeatTimes - 1; cycle++){  //10000개 단위로 결과를 받아올 때, 순차적으로 query를 보내도록 함
        noticedProductSearcher = noticedProductSearcher.then((response) => {
          let cursor = response.data.hits.cursor;
          noticedProducts = noticedProducts.concat(response.data.hits.hit);
          return this.$http.get(url + '&size=10000&cursor=' + cursor);
        });
      }
      noticedProductSearcher = noticedProductSearcher.then((response) => {
        noticedProducts = noticedProducts.concat(response.data.hits.hit);
        return noticedProducts;    // get request를 모두 보내고 search가 끝나면 찾아낸 고시상품들을 리턴
      });
      return noticedProductSearcher;
    },
    requestData(url, response) {
      let cursor = response.hits.cursor;
      return this.$http.get(url + '&size=10000&cursor=' + cursor)
    },
    checkEqual(product1, product2) {   // whitespace를 제외하고 나머지 글자들의 스펠링이 같은지 확인하는 함수. 현재 코드에서는 사용하지 않음
      let letterSplit1 = product1.split(/[\s]/);
      let letterSplit2 = product2.split(/[\s]/);
      let string1 = '';
      let string2 = '';
      for (let letter of letterSplit1) {
        string1 += letter;
      }
      for (let letter of letterSplit2) {
        string2 += letter;
      }
      return string1 == string2;
    },
    transmitProducts(searchedList) {
      for (let product of searchedList) {
        if (product["고시명칭"] == true) {
          this.$productTransmissionBus.$emit('transmit noticed', product);
        }
        else {
          this.$productTransmissionBus.$emit('transmit unnoticed', product);
        }
      }
    }
  }
}
</script>
