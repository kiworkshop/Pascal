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
                      <v-flex text-xs-center>{{numOfTrademarks}}상표 {{numOfClasses()}}개류</v-flex>
                      <v-flex text-xs-right>{{agentFeeSearch().toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex text-xs-center>부가세</v-flex>
                      <v-flex text-xs-center>10%</v-flex>
                      <v-flex text-xs-right>{{(agentFeeSearch() * 0.1).toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex text-xs-center>소계</v-flex>
                      <v-flex text-xs-right>{{(agentFeeSearch() * 1.1).toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-divider light></v-divider>
                    <v-layout row wrap>
                      <v-flex text-xs-center>검색단계 합계</v-flex>
                      <v-flex text-xs-right>{{(agentFeeSearch() * 1.1).toLocaleString()}} 원</v-flex>
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
                      <v-flex text-xs-center>{{numOfTrademarks}}상표 {{numOfClasses()}}개류</v-flex>
                      <v-flex text-xs-right>{{(agentFeeApp()).toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex text-xs-center>부가세</v-flex>
                      <v-flex text-xs-center>10%</v-flex>
                      <v-flex text-xs-right>{{(agentFeeApp() * 0.1).toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex text-xs-center>소계</v-flex>
                      <v-flex text-xs-right>{{(agentFeeApp() * 1.1).toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-divider light></v-divider>
                    <v-flex text-xs-center>출원단계 특허청 관납료</v-flex>
                    <v-layout row wrap>
                      <v-flex text-xs-center>출원료</v-flex>
                      <v-flex text-xs-center>{{numOfTrademarks}}상표 {{numOfClasses()}}개류</v-flex>
                      <v-flex text-xs-right>{{(officialFeeApp()).toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-divider light></v-divider>
                    <v-layout row wrap>
                      <v-flex text-xs-center>출원단계 합계</v-flex>
                      <v-flex text-xs-right>{{(agentFeeApp() * 1.1 + officialFeeApp()).toLocaleString()}} 원</v-flex>
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
                      <v-flex text-xs-center>{{numOfTrademarks}}상표 {{numOfClasses()}}개류</v-flex>
                      <v-flex text-xs-right>{{agentFeeReg().toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex text-xs-center>부가세</v-flex>
                      <v-flex text-xs-center>10%</v-flex>
                      <v-flex text-xs-right>{{(agentFeeReg() * 0.1).toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex text-xs-center>소계</v-flex>
                      <v-flex text-xs-right>{{(agentFeeReg() * 1.1).toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-divider light></v-divider>
                    <v-flex text-xs-center>등록단계 특허청 관납료</v-flex>
                    <v-layout row wrap>
                      <v-flex text-xs-center>등록수수료</v-flex>
                      <v-flex text-xs-center>{{numOfTrademarks}}상표 {{numOfClasses()}}개류</v-flex>
                      <v-flex text-xs-right>{{officialFeeReg().toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex text-xs-center>등록세</v-flex>
                      <v-flex text-xs-center>1건</v-flex>
                      <v-flex text-xs-right>{{basicOfficialFeeTax.toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex text-xs-center>소계</v-flex>
                      <v-flex text-xs-right>{{(officialFeeReg() + basicOfficialFeeTax).toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-divider light></v-divider>
                    <v-layout row wrap>
                      <v-flex text-xs-center>등록단계 합계</v-flex>
                      <v-flex text-xs-right>{{(agentFeeReg() * 1.1 + basicOfficialFeeTax).toLocaleString()}} 원</v-flex>
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
                <v-flex text-xs-center>{{(agentFeeSearch() * 1.1 + agentFeeApp() * 1.1 + officialFeeApp() + agentFeeReg() * 1.1 + basicOfficialFeeTax).toLocaleString()}} 원</v-flex>
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
  data(){
    return{
      numOfTrademarks: 1,
      basicAgentFeeSearch: 50000,
      basicAgentFeeApp: 200000,
      basicAgentFeeReg: 150000,
      additionalFee: 2000,
      basicOfficialFeeApp: 62000,
      basicOfficialFeeReg: 211000,
      basicOfficialFeeTax: 9120
    }
  },
  methods: {
    numOfClasses() {
      let count = 0;
      for (const _class in this.selected) {
        if (this.selected.hasOwnProperty(_class)) {
           count += 1;
        }
      }
      return count
    },
    agentFeeSearch() {
      return this.numOfClasses() * this.basicAgentFeeSearch
    },
    agentFeeApp() {
      return this.numOfClasses() * this.basicAgentFeeApp
    },
    agentFeeReg() {
      return this.numOfClasses() * this.basicAgentFeeReg
    },
    officialFeeApp() {
      let fee = 0;
      let goodsOver20 = 0;
      for (const _class in this.selected) {
        if (this.selected.hasOwnProperty(_class)) {
          fee += this.basicOfficialFeeApp;
          goodsOver20 = Object.keys(_class).length - 20;
          if (goodsOver20 > 0) {
            fee += goodsOver20 * this.additionalFee
          }
        }
      }
      return fee
    },
    officialFeeReg() {
      let fee = 0;
      let goodsOver20 = 0;
      for (const _class in this.selected) {
        if (this.selected.hasOwnProperty(_class)) {
          fee += this.basicOfficialFeeReg;
          goodsOver20 = Object.keys(_class).length - 20;
          if (goodsOver20 > 0) {
            fee += goodsOver20 * this.additionalFee
          }
        }
      }
      return fee
    }
  },
  computed: {
    classes() {
      return this.$store.getters.classes;
    },
    selected() {
      let classes = this.$store.getters.selected;
      let goods = [];
      for (const classId in classes) {
        goods = goods.concat(Object.values(classes[classId]))
      }
      return goods;
    }
  }
};
</script>

<style scoped>
</style>
