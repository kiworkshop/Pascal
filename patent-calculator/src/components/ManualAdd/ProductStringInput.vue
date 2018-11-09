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
      <v-btn color="black" flat @click.native="searchAndSplit(inputString)">검색 및 분류</v-btn>
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
    searchAndSplit(inputString) {     // 지금은 cloud search 기능이 붙기 전까지 사용할 테스트용 products 생성 함수. 추후 수정 예정
      let searchedProducts = this.splitText(inputString);
      let productClass = this.$store.getters.classes.indexOf(this.searchingClass);
      let i = 0;
      for (i = 0; i < searchedProducts.length; i++) {
        let productName = searchedProducts[i];
        let newproduct = {
          'id': Math.random(), // 상품 추가를 여러번에 나누어 하는 경우 생기는 id 중복을 피하기 위해 random값으로 지정
          'NICE분류':'',
          '지정상품(국문)':'',
          '지정상품(영문)':'',
          '유사군코드':'',
          '고시명칭':false
        };
        newproduct['지정상품(국문)'] = productName;
        if (productClass != -1) {
          newproduct['NICE분류'] = productClass;
        }

        let recognizer = productName.slice(0, 2)
        if (recognizer == "고시") {
          newproduct['고시명칭'] = true;
          this.$productTransmissionBus.$emit('transmit noticed', newproduct);
        }
        else if (recognizer == "비고") {
          newproduct['고시명칭'] = false;
          this.$productTransmissionBus.$emit('transmit unnoticed', newproduct);
        }
      }
      // 이 부분에 productlist 안의 product들을 하나씩 꺼내 query 날리는 함수 들어가야함
      // query에 대한 response 데이터를 고시/비고시로 분류하고 event bus를 이용해 나머지 두 컴포넌트들에게 넘겨줘야함
      this.initInput();
    }
  }
}
</script>
