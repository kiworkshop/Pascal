<template>
  <v-container>
        <v-layout row wrap>
          <v-flex xs5 class='mr-4'>
            <v-data-table
              :headers="noticedProductsHeaders"
              :items="products.noticed"
              :rows-per-page-items="rowsPerPageItems"
              no-data-text="검색 결과가 없습니다."
              class="mt-3"
            >
              <template slot="items" slot-scope="props">
                <td class="text-xs-center">{{ props.item['NICE분류'] }}</td>
                <td class="text-xs-center"><input type="text" v-model="props.item['지정상품(국문)']"></td>
                <td class="text-xs-center">
                  <!--수정하기-->
                  <v-btn flat icon slot="activator" color="primary" dark @click.native="moveProduct(props.item)">
                    <v-icon small>compare_arrows</v-icon>
                  </v-btn>
                  <v-btn flat icon slot="activator" color="red" dark @click.native="deleteFromTable(props.item)">
                    <v-icon small>delete</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-flex>

          <v-divider vertical></v-divider>

          <v-flex xs6 class="ml-4">
            <v-layout column>
              <v-flex>
                <v-data-table
                  v-model="selected"
                  :headers="unnoticedProductsHeaders"
                  :items="products.unnoticed"
                  :rows-per-page-items="rowsPerPageItems"
                  no-data-text="검색 결과가 없습니다."
                  class="mt-3"
                >
                  <template slot="items" slot-scope="props">
                    <tr :active="props.selected">
                      <td>
                        <v-checkbox
                        :input-value="props.selected"
                        primary
                        hide-details
                        @click="props.selected = !props.selected"
                        ></v-checkbox>
                      </td>
                      <td class="text-xs-center">{{ props.item['NICE분류'] }}</td>
                      <td class="text-xs-center"><input type="text" v-model="props.item['지정상품(국문)']"></td>
                      <td class="text-xs-center">
                        <!--추가하기-->
                        <v-btn flat icon slot="activator" color="primary" dark @click.native="moveProduct(props.item)">
                          <v-icon small>compare_arrows</v-icon>
                        </v-btn>
                        <v-btn flat icon slot="activator" color="red" dark @click.native="deleteFromTable(props.item)">
                          <v-icon small>delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-flex>
              <v-flex>
                <v-layout row>
                  <v-spacer></v-spacer>
                    <v-flex>
                      <v-select
                      v-model="selectedClass"
                      :items="classes"
                      label="분류"
                      ></v-select> <!--적용할 분류 검색 기능-->
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex class="pt-2">
                      <v-btn color="white" @click="applyClass()">선택한 항목에 분류 적용</v-btn>
                    </v-flex>
                    <v-spacer></v-spacer>
                </v-layout>
              </v-flex>

            </v-layout>
          </v-flex>
        </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "ClassifiedResult",
  data() {
    return {
      selected: [],
      // TODO: selectedClass의 기본값을 설정해주어야합니다.
      selectedClass: -1,
      rowsPerPageItems: [10, 25, 100],
      noticedProductsHeaders: [
        {
          text: "분류",
          align: "center",
          value: "NICE분류"
        },
        {
          text: "명칭",
          align: "center",
          sortable: false,
          value: "지정상품(국문)"
        },
        {
          text: "수정하기",
          align: "center",
          sortable: false,
          value: "수정하기"
        }
      ],
      unnoticedProductsHeaders: [
        {
          text: "선택",
          align: "left",
          sortable: false,
          value: "선택"
        },
        {
          text: "분류",
          align: "center",
          value: "NICE분류"
        },
        {
          text: "명칭",
          align: "center",
          sortable: false,
          value: "지정상품(국문)"
        },
        {
          text: "수정하기",
          align: "center",
          sortable: false,
          value: "수정하기"
        }
      ],
      products: {
        noticed: [],
        unnoticed: []
      }
    }
  },
  computed: {
    classes() {
      return Object.values(this.$store.getters.classes);
    }
  },
  methods: {
    applyClass() {
      let selectedClass = this.selectedClass;
      let i = 0;
      for (i = 0; i < this.selected.length; i++) {
        let selectedIndex =  this.products.unnoticed.findIndex(x => x['id'] == this.selected[i]['id']);
          if (selectedClass != -1) {
            this.products.unnoticed[selectedIndex]['NICE분류'] = selectedClass;
          }
      }
      this.selected = [];
    },
    moveProduct(product) {
      if(product['고시명칭']) {  //고시상품인경우 비고시상품으로 이동
        product['고시명칭'] = false;
        let selectedIndex = this.products.noticed.findIndex(temp => temp['id'] == product['id']);
        this.products.unnoticed.push(this.products.noticed.splice(selectedIndex, 1)[0]);
      }
      else {  //비고시상품인경우 고시상품으로 이동
        product['고시명칭'] = true;
        let selectedIndex = this.products.unnoticed.findIndex(temp => temp['id'] == product['id']);
        this.products.noticed.push(this.products.unnoticed.splice(selectedIndex, 1)[0]);
      }
    },
    deleteFromTable(product) {
      if(product['고시명칭']) {
        let selectedIndex = this.products.noticed.findIndex(temp => temp['id'] == product['id']);
        this.products.noticed.splice(selectedIndex, 1);
      }
      else {
        let selectedIndex = this.products.unnoticed.findIndex(temp => temp['id'] == product['id']);
        this.products.unnoticed.splice(selectedIndex, 1)[0];
      }
    },
    submitProductsToBriefcase () {
      for (const product of this.products.noticed) {
        this.$store.dispatch("addProduct", Object.assign({}, product));
      }
      for (const product of this.products.unnoticed) {
        this.$store.dispatch("addProduct", product);
      }
      this.products = {};
      this.$submissionAlarmBus.$emit('Ready', true);
    },
  },
  mounted() {
    this.$submissionAlarmBus.$on('submitProductsToBriefcase', this.submitProductsToBriefcase);
    this.$productTransmissionBus.$on('transmitClassified', (transmittedProducts) => {
      this.products.noticed = transmittedProducts.noticed;
      this.products.unnoticed = transmittedProducts.unnoticed;
    });
  }
}
</script>
