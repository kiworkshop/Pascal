<template>
  <v-container fluid grid-list-md>
    <v-slide-y-transition mode="out-in">
      <v-layout>
        <v-flex>
          <v-card>
            <v-toolbar color="grey lighten-4">
              <v-toolbar-title>견적내기</v-toolbar-title>
              <v-spacer></v-spacer>
              <p class="caption text-xs-left" ><br><br>상표 출원 견적을 표시합니다.</p>
            </v-toolbar>
            <v-layout row wrap>
              <v-flex>
                <v-container>
                  <v-toolbar color="elevation-0">
                    <v-toolbar-title>검색단계</v-toolbar-title>
                  </v-toolbar>
                  <v-layout column wrap>
                    <v-flex text-xs-center>검색단계 대리인 수수료</v-flex>
                    <v-layout row wrap>
                      <v-flex text-xs-center>기본료</v-flex>
                      <v-flex text-xs-center>{{numOfTrademarks}}상표 {{numOfClasses}}개류</v-flex>
                      <v-flex text-xs-right>{{agentFeeSearch.toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex text-xs-center>부가세</v-flex>
                      <v-flex text-xs-center>10%</v-flex>
                      <v-flex text-xs-right>{{(agentFeeSearch * 0.1).toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex text-xs-center>소계</v-flex>
                      <v-flex text-xs-right>{{(agentFeeSearch * 1.1).toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-divider light></v-divider>
                    <v-layout row wrap>
                      <v-flex text-xs-center>검색단계 합계</v-flex>
                      <v-flex text-xs-right>{{searchFee.toLocaleString()}} 원</v-flex>
                    </v-layout>
                  </v-layout>
                </v-container>
              </v-flex>
              <v-flex>
                <v-container>
                  <v-toolbar color="elevation-0">
                    <v-toolbar-title>출원단계</v-toolbar-title>
                  </v-toolbar>
                  <v-layout column wrap>
                    <v-flex text-xs-center>출원단계 대리인 수수료</v-flex>
                    <v-layout row wrap>
                      <v-flex text-xs-center>기본료</v-flex>
                      <v-flex text-xs-center>{{numOfTrademarks}}상표 {{numOfClasses}}개류</v-flex>
                      <v-flex text-xs-right>{{agentFeeApp.toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex text-xs-center>부가세</v-flex>
                      <v-flex text-xs-center>10%</v-flex>
                      <v-flex text-xs-right>{{(agentFeeApp * 0.1).toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex text-xs-center>소계</v-flex>
                      <v-flex text-xs-right>{{(agentFeeApp * 1.1).toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-divider light></v-divider>
                    <v-flex text-xs-center>출원단계 특허청 관납료</v-flex>
                    <v-layout row wrap>
                      <v-flex text-xs-center>출원료</v-flex>
                      <v-flex text-xs-center>{{numOfTrademarks}}상표 {{numOfClasses}}개류</v-flex>
                      <v-flex text-xs-right>{{officialFeeApp.toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-divider light></v-divider>
                    <v-layout row wrap>
                      <v-flex text-xs-center>출원단계 합계</v-flex>
                      <v-flex text-xs-right>{{appFee.toLocaleString()}} 원</v-flex>
                    </v-layout>
                  </v-layout>
                </v-container>
              </v-flex>
              <v-flex>
                <v-container>
                  <v-toolbar color="elevation-0">
                    <v-toolbar-title>등록단계</v-toolbar-title>
                  </v-toolbar>
                  <v-layout column wrap>
                    <v-flex text-xs-center>등록단계 대리인 수수료</v-flex>
                    <v-layout row wrap>
                      <v-flex text-xs-center>등록수수료</v-flex>
                      <v-flex text-xs-center>{{numOfTrademarks}}상표 {{numOfClasses}}개류</v-flex>
                      <v-flex text-xs-right>{{agentFeeReg.toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex text-xs-center>부가세</v-flex>
                      <v-flex text-xs-center>10%</v-flex>
                      <v-flex text-xs-right>{{(agentFeeReg* 0.1).toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex text-xs-center>소계</v-flex>
                      <v-flex text-xs-right>{{(agentFeeReg * 1.1).toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-divider light></v-divider>
                    <v-flex text-xs-center>등록단계 특허청 관납료</v-flex>
                    <v-layout row wrap>
                      <v-flex text-xs-center>등록수수료</v-flex>
                      <v-flex text-xs-center>{{numOfTrademarks}}상표 {{numOfClasses}}개류</v-flex>
                      <v-flex text-xs-right>{{officialFeeReg.toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex text-xs-center>등록세</v-flex>
                      <v-flex text-xs-center>1건</v-flex>
                      <v-flex text-xs-right>{{basicOfficialFeeTax.toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex text-xs-center>소계</v-flex>
                      <v-flex text-xs-right>{{(officialFeeReg + basicOfficialFeeTax).toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-divider light></v-divider>
                    <v-layout row wrap>
                      <v-flex text-xs-center>등록단계 합계</v-flex>
                      <v-flex text-xs-right>{{regFee.toLocaleString()}} 원</v-flex>
                    </v-layout>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
            <v-flex>
              <v-container>
                <v-toolbar color="elevation-0">
                  <v-toolbar-title>출원에서 등록까지</v-toolbar-title>
                </v-toolbar>
                <v-flex text-xs-center>{{totalFee.toLocaleString()}} 원</v-flex>
              </v-container>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import QuotationSummary from "./QuotationSummary"
export default {
  name: "Quotation",
  components:{
    QuotationSummary
  },
  computed: {
    numOfTrademarks() {
      return this.$store.getters.trademarks;
    },
    numOfClasses() {
      return this.$store.getters.selectedClassesCount;
    },
    agentFeeSearch() {
      return this.$store.getters.calculateFee.agentFeeSearch;
    },
    agentFeeApp() {
      return this.$store.getters.calculateFee.agentFeeApp;
    },
    agentFeeReg() {
      return this.$store.getters.calculateFee.agentFeeReg;
    },
    officialFeeApp() {
      return this.$store.getters.calculateFee.officialFeeApp;
    },
    officialFeeReg() {
      return this.$store.getters.calculateFee.officialFeeReg;
    },
    basicOfficialFeeTax() {
      return this.$store.state.basicFee.basicOfficialFeeTax;
    },
    searchFee() {
      return this.agentFeeSearch * 1.1;
    },
    appFee() {
      return this.agentFeeApp * 1.1 + this.officialFeeApp;
    },
    regFee() {
      return this.agentFeeReg * 1.1 + this.officialFeeReg + this.basicOfficialFeeTax;
    },
    totalFee() {
      return this.searchFee + this.appFee + this.regFee;
    }
  }
};
</script>

<style scoped>
</style>
