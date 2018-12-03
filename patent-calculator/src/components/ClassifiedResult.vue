<template>
  <v-container class="pa-0">
    <v-tabs slot="extension" show-arrows v-model="activeTab" class="pb-3" slider-color="primary">
      <v-tab class="headline" v-for="tab of tabs" :key="tab.index">{{tab.name}}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeTab">
      <!-- 고시상품 테이블 -->
      <v-tab-item :key="0">
        <v-layout column>
          <v-flex>
            <v-layout align-center justify-end row fill-height>
              <v-btn
                class="mt-3"
                slot="activator"
                color="primary"
                dark
                @click.native="moveProduct('toUnnoticed')"
              >비고시 상품으로</v-btn>
            </v-layout>
          </v-flex>
          <v-data-table
            v-model="selected"
            :headers="noticedProductsHeaders"
            :items="products.noticed"
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
                <td class="text-xs-center">{{ props.item['지정상품(국문)'] }}</td>
                <td class="text-xs-center">
                  <v-btn
                    flat
                    icon
                    slot="activator"
                    color="secondary"
                    dark
                    @click.native="deleteFromTable(props.item)"
                  >
                    <v-icon small>delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-layout>
      </v-tab-item>
      <!-- 비고시상품 테이블 -->
      <v-tab-item :key="1">
        <v-layout column>
          <v-flex>
            <v-layout align-center justify-end row fill-height>
              <v-flex xs5 class="mr-3">
                <v-select v-model="selectedClass" :items="classes" label="분류"></v-select>
              </v-flex>
              <v-btn color="primary" @click="applyClass()">분류 적용</v-btn>
              <v-btn
                slot="activator"
                color="primary"
                dark
                @click.native="moveProduct('toNoticed')"
              >고시 상품으로</v-btn>
            </v-layout>
          </v-flex>
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
                  <td class="text-xs-center">
                    <input class="text-xs-center" type="text" v-model="props.item['지정상품(국문)']">
                  </td>
                  <td class="text-xs-center">
                    <v-btn
                      flat
                      icon
                      slot="activator"
                      color="secondary"
                      dark
                      @click.native="deleteFromTable(props.item)"
                    >
                      <v-icon small>delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
export default {
  name: "ClassifiedResult",
  data() {
    return {
      tabIsLoaded: false,
      activeTab: 1,
      tabs: [{ index: 0, name: "고시상품" }, { index: 1, name: "비고시상품" }],
      selected: [],
      selectedClass: "미지정",
      rowsPerPageItems: [10, 25, 100],
      noticedProductsHeaders: [
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
          text: "삭제하기",
          align: "center",
          sortable: false,
          value: "삭제하기"
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
          text: "삭제하기",
          align: "center",
          sortable: false,
          value: "삭제하기"
        }
      ],
      products: {
        noticed: [],
        unnoticed: []
      }
    };
  },
  computed: {
    classes() {
      return Object.values(this.$store.getters.classes);
    }
  },
  methods: {
    applyClass() {
      if (this.selected.length > 0) {
        let selectedClass = -1; //"미지정" class의 id값
        if (this.selectedClass != "미지정") {
          selectedClass = this.classes.indexOf(this.selectedClass);
        }
        for (const selected of this.selected) {
          if (selectedClass != -1 && selected["고시명칭"] == false) {
            let selectedIndex = this.products.unnoticed.findIndex(
              product => product["id"] == selected["id"]
            );
            this.products.unnoticed[selectedIndex]["NICE분류"] = selectedClass;
          }
        }
        const message =
          "선택하신 상품이 " +
          "[ " +
          selectedClass +
          "류 ] " +
          "로 분류되었습니다.";
        this.$noticeEventBus.$emit("raiseNotice", message);
        this.selected = [];
      } else {
        const message = "선택된 상품이 없습니다.";
        this.$noticeEventBus.$emit("raiseNotice", message);
      }
    },
    moveProduct(toTheOther) {
      let movedCount = 0; //몇 개 상품이 이동하였는지를 snackbar에 전달해주기 위한 변수
      if (toTheOther == "toUnnoticed") {
        //고시 -> 비고시 이동인 경우
        for (const product of this.selected) {
          // selected에 고시/비고시 섞여있을 수 있음
          if (product["고시명칭"]) {
            product["고시명칭"] = false;
            let selectedIndex = this.products.noticed.findIndex(
              temp => temp["id"] == product["id"]
            );
            this.products.unnoticed.push(
              this.products.noticed.splice(selectedIndex, 1)[0]
            );
            movedCount++;
          }
        }
        const message =
          movedCount + "개의 고시상품이 비고시상품으로 변경되었습니다.";
        this.$noticeEventBus.$emit("raiseNotice", message);
      } else {
        //비고시 -> 고시 이동인 경우
        for (const product of this.selected) {
          if (!product["고시명칭"]) {
            product["고시명칭"] = true;
            let selectedIndex = this.products.unnoticed.findIndex(
              temp => temp["id"] == product["id"]
            );
            this.products.noticed.push(
              this.products.unnoticed.splice(selectedIndex, 1)[0]
            );
            movedCount++;
          }
        }
        const message =
          movedCount + "개의 비고시상품이 고시상품으로 변경되었습니다.";
        this.$noticeEventBus.$emit("raiseNotice", message);
      }
      this.selected = [];
    },
    deleteFromTable(product) {
      if (product["고시명칭"]) {
        let selectedIndex = this.products.noticed.findIndex(
          temp => temp["id"] == product["id"]
        );
        this.products.noticed.splice(selectedIndex, 1);
      } else {
        let selectedIndex = this.products.unnoticed.findIndex(
          temp => temp["id"] == product["id"]
        );
        this.products.unnoticed.splice(selectedIndex, 1)[0];
      }
      const message =
        "[ " +
        product["NICE분류"] +
        "류 ] " +
        product["지정상품(국문)"] +
        "이(가) 목록에서 삭제되었습니다.";
      this.$noticeEventBus.$emit("raiseNotice", message);
    },
    submitProductsToBriefcase() {
      for (const product of this.products.noticed) {
        this.$store.dispatch("addProduct", Object.assign({}, product));
      }
      for (const product of this.products.unnoticed) {
        this.$store.dispatch("addProduct", product);
      }
      this.products = {};
      const message = "상품 관리 탭에서 추가된 상품들을 확인해주세요.";
      this.$noticeEventBus.$emit("raiseNotice", message);
      this.$submissionAlarmBus.$emit("Ready", true);
    }
  },
  mounted() {
    this.$submissionAlarmBus.$on(
      "submitProductsToBriefcase",
      this.submitProductsToBriefcase
    );
    this.$productTransmissionBus.$on(
      "transmitClassified",
      transmittedProducts => {
        this.products.noticed = transmittedProducts.noticed;
        this.products.unnoticed = transmittedProducts.unnoticed;
        if (!this.tabIsLoaded) {
          // tab이 stepper의 step 2에서 mount 되는 경우, 처음에 slidebar가 보이지 않는 버그를 해결
          this.activeTab--;
          this.tabIsLoaded = true;
        }
      }
    );
  }
};
</script>
