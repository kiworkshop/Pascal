<template>
  <v-card flat>
    <v-list>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title class="font-weight-bold">견적 요약</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-group
        v-for="(description, title) in fee"
        :key="title"
      >
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>{{title}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-flex class="text-xs-right">{{description.소계.toLocaleString()}} 원</v-flex>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-for="(value, index) in description.내역" :key="index">
          <v-list-tile-content>
            <v-list-tile-title>{{value.명목}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-flex class="text-xs-right">{{value.가격.toLocaleString()}} 원</v-flex>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
      <v-divider></v-divider>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title class="font-weight-bold">합계</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-flex class="text-xs-right font-weight-bold">{{totalFee.toLocaleString()}} 원</v-flex>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "QuotationSummary",
  computed: {
    fee() {
      return {
        검색단계: {
          내역: [
            {
              명목: "대리인 수수료",
              가격: this.agentFeeSearch
            },
            {
              명목: "부가세",
              가격: this.agentFeeSearch * 0.1
            }
          ],
          소계: this.searchFee
        },
        출원단계: {
          내역: [
            {
              명목: "대리인 수수료",
              가격: this.agentFeeApp
            },
            {
              명목: "부가세",
              가격: this.agentFeeApp * 0.1
            },
            {
              명목: "특허청 관납료",
              가격: this.officialFeeApp
            }
          ],
          소계: this.appFee
        },
        등록단계: {
          내역: [
            {
              명목: "대리인 수수료",
              가격: this.agentFeeReg
            },
            {
              명목: "부가세",
              가격: this.agentFeeReg * 0.1
            },
            {
              명목: "특허청 관납료",
              가격: this.officialFeeReg + this.basicOfficialFeeTax
            }
          ],
          소계: this.regFee
        }
      };
    },

    agentFeeSearch() {
      return this.$store.getters.calculateFee.agentSearch;
    },
    agentFeeApp() {
      return this.$store.getters.calculateFee.agentApp;
    },
    agentFeeReg() {
      return this.$store.getters.calculateFee.agentReg;
    },
    officialFeeApp() {
      return this.$store.getters.calculateFee.officialApp;
    },
    officialFeeReg() {
      return this.$store.getters.calculateFee.officialReg;
    },
    basicOfficialFeeTax() {
      return this.$store.state.basicFee.officialTax;
    },
    searchFee() {
      return this.agentFeeSearch * 1.1;
    },
    appFee() {
      return this.agentFeeApp * 1.1 + this.officialFeeApp;
    },
    regFee() {
      return (
        this.agentFeeReg * 1.1 + this.officialFeeReg + this.basicOfficialFeeTax
      );
    },
    totalFee() {
      return this.searchFee + this.appFee + this.regFee;
    }
  }
};
</script>

<style scoped>
</style>