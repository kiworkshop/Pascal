<template>
  <v-container fluid grid-list-md>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>
        <v-flex xs8>
          <v-card>
            <v-toolbar color="grey lighten-4">
              <v-toolbar-title>검색하기</v-toolbar-title>
              <v-spacer></v-spacer>
              <p class="caption"><br><br>특허청 고시상품명칭 11판(2018)에서 상품 명칭을 검색합니다.</p>
            </v-toolbar>
            <v-layout>  
              <v-spacer></v-spacer>
              <v-flex>
              <v-select
                v-model="search._class"
                :items="classes"
                label="분류"
              ></v-select> <!--분류별 검색 기능 추가-->
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex>
              <v-text-field
                v-model="search.name"
                append-icon="search"
                label="명칭"
                single-line
                hide-details
              ></v-text-field>
              </v-flex>
              <v-spacer></v-spacer>
            </v-layout>
            <v-data-table
              :headers="headers"
              :items="products"
              :search="search.name"
              :rows-per-page-items="rowsPerPageItems"
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
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                "{{ search.name }}"을(를) 찾을 수 없습니다.
              </v-alert>
            </v-data-table>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-layout column>
            <v-flex><briefcase-summary></briefcase-summary></v-flex>
            <v-flex><quotation-summary></quotation-summary></v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import BriefcaseSummary from "./BriefcaseSummary";
import QuotationSummary from "./QuotationSummary";
export default {
  name: "Search",
  components: {
    BriefcaseSummary,
    QuotationSummary
  },
  data() {
    return {
      rowsPerPageItems: [
        10,
        25,
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 }
      ],
      search: {
        _class: "",
        name: ""
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
      ]
    };
  },
  methods: {
    addProduct(item) {
      let temp = Object.assign({}, item)
      temp['고시명칭'] = true
      this.$store.dispatch("addProduct", temp);
      const message = "[ " + item["NICE분류"] + "류 ] " +
        item["지정상품(국문)"] + "이(가) 지정상품에 추가되었습니다.";
      this.$noticeEventBus.$emit("raiseNotice", message);
    }
  },
  computed: {
    classes() {
      return this.$store.getters.classes;
    },
    products() {
      return this.$store.getters.products;
    }
  }
};
</script>

<style scoped>
</style>
