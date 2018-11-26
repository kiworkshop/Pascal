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
                  <v-btn flat icon slot="activator" color="primary" dark @click.native="moveProductToUnnoticed(props.item.id)">
                    <v-icon small>compare_arrows</v-icon>
                  </v-btn>
                  <v-btn flat icon slot="activator" color="red" dark @click.native="deleteFromList(props.item.id)">
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
                        <v-btn flat icon slot="activator" color="primary" dark @click.native="moveProduct(props.item.id)">
                          <v-icon small>compare_arrows</v-icon>
                        </v-btn>
                        <v-btn flat icon slot="activator" color="red" dark @click.native="deleteFromList(props.item.id)">
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
                      v-model="payload._class"
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
      classes: [1, 2, 3],
      rowsPerPageItems: [10, 25, 100],
      // TODO: _class의 기본값을 설정해주어야합니다.
      payload: {
        _class: -1,
        searchingProducts: ""
      },
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
  methods: {
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
