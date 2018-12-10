<template>
  <v-container class="pa-0">
    <v-tabs slot="extension" v-model="activeTab" class="pb-3" slider-color="primary">
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
              >비고시상품으로</v-btn>
            </v-layout>
          </v-flex>
          <v-data-table
          v-model="selected.noticed"
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
              <td v-if="props.item['NICE분류'] === -1"></td>
              <td v-else class="text-xs-center">{{ props.item['NICE분류'] }}</td>
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
          >고시상품으로</v-btn>
        </v-layout>
      </v-flex>
      <v-flex>
        <v-data-table
        v-model="selected.unnoticed"
        :headers="unnoticedProductsHeaders"
        :items="products.unnoticed"
        :rows-per-page-items="rowsPerPageItems"
        no-data-text="검색 결과가 없습니다."
        class="mt-3"
        >
        <template slot="items" slot-scope="props">
          <tr
          :active="props.selected"
          :style="[props.item['NICE분류'] === -1 ? backgroundColor : '']"
          >
          <td>
            <v-checkbox
            :input-value="props.selected"
            primary
            hide-details
            @click="props.selected = !props.selected"
            ></v-checkbox>
          </td>
          <td v-if="props.item['NICE분류'] === -1"></td>
          <td v-else class="text-xs-center">{{ props.item['NICE분류'] }}</td>
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

<v-dialog v-model="dialogView" width="400">
  <v-card>
    <v-card-text>
      <v-layout column>
        <v-flex class="mt-3">
          <h4>분류하신 상품들을 정말로 추가하시겠습니까?</h4>
        </v-flex>
        <v-flex class="mt-3">
          <v-layout align-center justify-end row>
            <v-btn color="primary" @click.native="submitProductsToBriefcase(products)">추가 확정</v-btn>
            <v-btn color="primary" @click.native="dialogView = false">취소</v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</v-dialog>
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
      selected: {
        noticed: [],
        unnoticed: []
      },
      selectedClass: "미지정",
      backgroundColor: {},
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
      },
      dialogView: false
    };
  },
  computed: {
    classes() {
      let classes = Object.values(this.$store.getters.classes);
      classes.splice(0, 1); //index 0에 있는 "전체"는 빼고, 나머지 분류들만 리턴해주도록 합니다.
      return classes;
    }
  },
  methods: {
    applyClass() {
      if (this.selected.unnoticed.length > 0) {
        let selectedClass = -1; //"미지정" class의 id값
        if (this.selectedClass != "미지정") {
          selectedClass = this.classes.indexOf(this.selectedClass) + 1;
          for (const selected of this.selected.unnoticed) {
            let selectedIndex = this.products.unnoticed.findIndex(
              product => product["id"] == selected["id"]
            );
            this.products.unnoticed[selectedIndex][
              "NICE분류"
            ] = selectedClass;
          }
          const message =
          "선택하신 상품이 " +
          "[ " +
          selectedClass +
          "류 ] " +
          "로 분류되었습니다.";
          this.$noticeEventBus.$emit("raiseNotice", message);
          this.selected.unnoticed = [];
        } else {
          const message = "지정할 분류를 골라주세요.";
          this.$noticeEventBus.$emit("raiseNotice", message);
        }
      } else {
        const message = "선택된 비고시상품이 없습니다.";
        this.$noticeEventBus.$emit("raiseNotice", message);
      }
    },
    moveProduct(toTheOther) {
      let movedCount = 0; //몇 개 상품이 이동하였는지를 snackbar에 전달해주기 위한 변수
      if (toTheOther == "toUnnoticed") {
        //고시 -> 비고시 이동인 경우
        if (this.selected.noticed.length == 0) {
          const message = "선택된 고시상품이 없습니다.";
          this.$noticeEventBus.$emit("raiseNotice", message);
        } else {
          for (const product of this.selected.noticed) {
            product["고시명칭"] = false;
            let selectedIndex = this.products.noticed.findIndex(
              temp => temp["id"] == product["id"]
            );
            this.products.unnoticed.push(
              this.products.noticed.splice(selectedIndex, 1)[0]
            );
            movedCount++;
          }
          const message =
          movedCount + "개의 고시상품이 비고시상품으로 변경되었습니다.";
          this.$noticeEventBus.$emit("raiseNotice", message);
          this.selected.noticed = [];
        }
      } else {
        //비고시 -> 고시 이동인 경우
        if (this.selected.unnoticed.length == 0) {
          const message = "선택된 비고시상품이 없습니다.";
          this.$noticeEventBus.$emit("raiseNotice", message);
        } else {
          if (this.checkUnclassified(this.selected.unnoticed)) {
            const message = "미분류 상태인 상품은 이동할 수 없습니다.";
            this.$noticeEventBus.$emit("raiseNotice", message);
          } else{
            for (const product of this.selected.unnoticed) {
              product["고시명칭"] = true;
              let selectedIndex = this.products.unnoticed.findIndex(
                temp => temp["id"] == product["id"]
              );
              this.products.noticed.push(
                this.products.unnoticed.splice(selectedIndex, 1)[0]
              );
              movedCount++;
            }
            const message =
            movedCount + "개의 비고시상품이 고시상품으로 변경되었습니다.";
            this.$noticeEventBus.$emit("raiseNotice", message);
            this.selected.unnoticed = [];
          }
        }
      }
    },
    deleteFromTable(product) {
      //product가 선택된 상품인 경우 selected에서 삭제
      if (this.selected.noticed.includes(product)){
        let selectedIndex = this.selected.noticed.findIndex(
          temp => temp["id"] == product["id"]
        );
        this.selected.noticed.splice(selectedIndex, 1);
      } else if (this.selected.unnoticed.includes(product)) {
        let selectedIndex = this.selected.unnoticed.findIndex(
          temp => temp["id"] == product["id"]
        );
        this.selected.unnoticed.splice(selectedIndex, 1);
      }

      // products에서 삭제
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

      //snackbar 알람
      if (product["NICE분류"] == -1) {
        const message =
        "[미분류] " +
        product["지정상품(국문)"] +
        "이(가) 목록에서 삭제되었습니다.";
        this.$noticeEventBus.$emit("raiseNotice", message);
      } else{
        const message =
        "[ " +
        product["NICE분류"] +
        "류 ] " +
        product["지정상품(국문)"] +
        "이(가) 목록에서 삭제되었습니다.";
        this.$noticeEventBus.$emit("raiseNotice", message);
      }
    },
    submitProductsToBriefcase(products) {
      for (const product of products.noticed) {
        this.$store.dispatch("addProduct", Object.assign({}, product));
      }
      for (const product of products.unnoticed) {
        this.$store.dispatch("addProduct", Object.assign({}, product));
      }
      const message = "상품 관리 탭에서 추가된 상품들을 확인해주세요.";
      this.$noticeEventBus.$emit("raiseNotice", message);
      this.$submissionAlarmBus.$emit("submissionComplete");
      this.dialogView = false;
    },
    checkUnclassified(products) {
      let unclassified = false;
      for (const product of products) {
        if (product["NICE분류"] == -1) {
          unclassified = true;
        }
      }
      return unclassified;
    },
    highlightUnclassified() {
      this.backgroundColor = { background: "#fff0f0" };
    }
  },
  mounted() {
    this.$submissionAlarmBus.$on("submitProductsToBriefcase", () => {
      if (this.checkUnclassified(this.products.unnoticed)) {
        const message = "아직 미분류 상태인 상품들이 있습니다!";
        this.$noticeEventBus.$emit("raiseNotice", message);
        this.highlightUnclassified();
      } else if (this.products.noticed.length == 0 && this.products.unnoticed.length == 0) {
        const message = "추가할 상품이 없습니다.";
        this.$noticeEventBus.$emit("raiseNotice", message);
      } else {
        this.dialogView = true;
      }
    });
    this.$productTransmissionBus.$on(
      "transmitClassified",
      transmittedProducts => {
        this.products.noticed = transmittedProducts.noticed;
        this.products.unnoticed = transmittedProducts.unnoticed;

        //선택된 상품 초기화
        this.selected.noticed = [];
        this.selected.unnoticed= [];

        // tab이 stepper의 step 2에서 mount 되는 경우, 처음에 slidebar가 보이지 않는 버그를 해결
        if (!this.tabIsLoaded) {
          this.activeTab--;
          this.tabIsLoaded = true;
        }
      }
    );
  }
};
</script>
