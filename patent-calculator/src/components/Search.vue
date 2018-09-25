<template>
  <v-container fluid grid-list-md>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>
        <v-flex xs8>
          <v-flex class="h_title">검색하기</v-flex>
          <v-flex class="h_explanation">
            <p>특허청 고시상품명칭 11판(2018)에서 상품 명칭을 검색합니다.</p>
          </v-flex>
          <v-card>
            <v-layout>  
              <v-spacer></v-spacer>
              <v-flex>
              <v-select
                v-model="search.category"
                :items="categories"
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
                  <v-btn flat icon slot="activator" color="primary" dark @click.native="add_to_list(props.item)">
                    <v-icon small>add</v-icon>
                  </v-btn>            
                </td>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search.name }}" found no results.
              </v-alert>
            </v-data-table>
          </v-card>
        </v-flex>
        <!-- TODO: 현재 담은 목록을 간단하게 보여줍니다. -->
        <v-flex xs4>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      rowsPerPageItems: [
        10,
        25,
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 }
      ],
      search: {
        category: "",
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
          text: "유사군 코드",
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
    add_to_list(item) {
      alert("지정상품에 추가되었습니다.");
      // TODO
      // 1. alert창을 snackbar로 교체
      // 2. 선택된 아이템을 vuex store에 저장합니다.
    }
  },
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
    products() {
      return this.$store.getters.products;
    }
  }
};
</script>

<style scoped>
</style>
