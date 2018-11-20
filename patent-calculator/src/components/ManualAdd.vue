<template>
  <v-container fluid grid-list-md>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>
        <v-flex d-flex xs12>
          <v-layout row wrap>
            <v-flex d-flex xs12>
              <v-layout row wrap>
                <v-flex d-flex xs8>
                  <v-layout column>
                    <v-flex><product-string-input></product-string-input></v-flex>
                  </v-layout>
                </v-flex>
                <v-flex d-flex xs4>
                  <v-layout column>
                    <v-flex><briefcase-summary></briefcase-summary></v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex d-flex xs6>
              <noticed-list></noticed-list>
            </v-flex>
            <v-flex d-flex xs6>
              <unnoticed-list></unnoticed-list>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex d-flex xs10></v-flex>
            <v-flex d-flex xs2>
              <v-btn large color="white" @click.native="submitProducts()"><b>상품 추가하기 >></b></v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import ProductStringInput from "./ManualAdd/ProductStringInput";
import NoticedList from "./ManualAdd/NoticedList";
import UnnoticedList from "./ManualAdd/UnnoticedList";
import BriefcaseSummary from "./BriefcaseSummary";

export default {
  name: "ManualAdd",
  components: {
    'ProductStringInput': ProductStringInput,
    'NoticedList': NoticedList,
    'UnnoticedList': UnnoticedList,
    'BriefcaseSummary': BriefcaseSummary
  },
  methods: {
    submitProducts() {
      this.$submissionAlarmBus.$emit('submitProducts');
    }
  },
  destroyed() {
    this.$submissionAlarmBus.$off();
    this.$productTransmissionBus.$off();
  }
}
</script>
