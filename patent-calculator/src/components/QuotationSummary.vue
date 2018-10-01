<template>
  <v-card>
    <v-toolbar color="grey lighten-4">
      <v-toolbar-title>견적 요약</v-toolbar-title>
    </v-toolbar>
    <v-list>
      <v-list-group>
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>검색단계</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-flex>{{ searchFee.toLocaleString() }} 원</v-flex>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>대리인 수수료</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-flex>{{agentFeeSearch.toLocaleString()}} 원</v-flex>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>부가세</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-flex>{{(agentFeeSearch * 0.1).toLocaleString()}} 원</v-flex>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
      <v-list-group>
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>출원단계</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-flex>{{appFee.toLocaleString()}} 원</v-flex>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>대리인 수수료</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-flex>{{agentFeeApp.toLocaleString()}} 원</v-flex>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>부가세</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-flex>{{(agentFeeApp * 0.1).toLocaleString()}} 원</v-flex>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>특허청 관납료</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-flex>{{officialFeeApp.toLocaleString()}} 원</v-flex>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
      <v-list-group>
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>등록단계</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-flex>{{regFee.toLocaleString() }} 원</v-flex>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>대리인 수수료</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-flex>{{agentFeeReg.toLocaleString()}} 원</v-flex>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>부가세</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-flex>{{(agentFeeReg* 0.1).toLocaleString()}} 원</v-flex>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>특허청 관납료</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-flex>{{(officialFeeReg + basicOfficialFeeTax).toLocaleString()}} 원</v-flex>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>합계</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-flex>{{ totalFee.toLocaleString() }} 원</v-flex>
        </v-list-tile-action>
      </v-list-tile>

    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "QuotationSummary",
  computed: {
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