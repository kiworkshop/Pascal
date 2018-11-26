<template>
  <v-container>
    <!-- <v-layout column wrap> -->
      <!-- <v-flex class='mb-5'>
        <v-layout row>
          <v-flex xs4>
            <v-select
              v-model="payload._class"
              :items="classes"
              label="분류"
            ></v-select>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs7>
            <v-textarea
              v-model="payload.searchingProducts"
              append-icon="search"
              placeholder="명칭 (붕산비료, 생물 비료, 도매업)"
              auto-grow
              hint="특허청 고시상품명칭 11판(2018)에서 상품 명칭을 검색합니다."
              persistent-hint
              rows="1"
            ></v-textarea>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs1 offset-xs10 class="mb-5">
        <v-btn color="primary" @click="classifyProducts()">
          상품 분류
        </v-btn>
      </v-flex> -->

      <!-- <v-flex> -->
        <v-layout row wrap>
          <v-flex xs5>
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

          <v-flex xs6 class="ml-5">
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
        </v-layout>
      <!-- </v-flex> -->
    <!-- </v-layout> -->
  </v-container>
</template>

<script>
export default {
  name: "ClassifiedResult",
  data() {
    return {
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
      this.products.noticed = this.products.noticed.concat(transmittedProducts.noticed);
      this.products.unnoticed = this.products.unnoticed.concat(transmittedProducts.unnoticed);
    });
  }
}
</script>
