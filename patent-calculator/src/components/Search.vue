<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout column wrap>
        <h1 class="headline font-weight-bold mb-2">검색하기</h1>
        <v-flex>
          <v-layout row>
            <v-flex xs4>
              <v-select
                v-model="payload._class"
                :items="classes"
                label="분류"
              ></v-select> <!--분류별 검색 기능 추가-->
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs7>
              <v-text-field
                v-model="payload.searchingProducts"
                append-icon="search"
                label="명칭 (붕산비료, 생물 비료, 도매업)"
                single-line
                hint="특허청 고시상품명칭 11판(2018)에서 상품 명칭을 검색합니다."
                persistent-hint
                @keyup.enter="search()"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-data-table
          :headers="headers"
          :items="products"
          :rows-per-page-items="rowsPerPageItems"
          no-data-text="검색 결과가 없습니다."
          class="mt-3"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item['NICE분류'] }}</td>
            <td> {{ props.item['지정상품(국문)'] }}</td>
            <td> {{ props.item['지정상품(영문)'] }}</td>
            <td class="text-xs-center">{{ props.item['유사군코드'] }}</td>
            <td class="text-xs-center">
              <!--추가하기-->
              <v-btn flat icon slot="activator" color="primary" dark @click.native="addProduct(props.item)">
                <v-icon small>add</v-icon>
              </v-btn>            
            </td>
          </template>
        </v-data-table>
    </v-layout>
  </v-slide-y-transition>
</v-container>
</template>

<script>
export default {
  name: "Search",
  components: {},
  data() {
    return {
      rowsPerPageItems: [10, 25, 100],
      // TODO: _class의 기본값을 설정해주어야합니다.
      payload: {
        _class: -1,
        searchingProducts: ""
      },
      headers: [
        {
          text: "분류",
          align: "center",
          value: "NICE분류"
        },
        {
          text: "명칭",
          align: "left",
          sortable: false,
          value: "지정상품(국문)"
        },
        {
          text: "영문 명칭",
          align: "left",
          sortable: false,
          value: "지정상품(영문)"
        },
        {
          text: "유사군코드",
          align: "center",
          sortable: false,
          value: "유사군코드"
        },
        {
          text: "추가하기",
          align: "center",
          sortable: false,
          value: "추가하기"
        }
      ],
      products: []
    };
  },
  methods: {
    addProduct(item) {
      let temp = Object.assign({}, item);
      temp["고시명칭"] = true;
      this.$store.dispatch("addProduct", temp);
      const message =
        "[ " +
        item["NICE분류"] +
        "류 ] " +
        item["지정상품(국문)"] +
        "이(가) 지정상품에 추가되었습니다.";
      this.$noticeEventBus.$emit("raiseNotice", message);
    },
    search() {
      this.$searchManager.search(this.payload, false).then(result => {
        this.products = result.noticed;
      });
    }
  },
  computed: {
    classes() {
      return this.$store.getters.classes;
    }
  }
};
</script>

<style scoped>
</style>
