<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout column wrap>
        <h1 class="headline font-weight-bold mb-2">상품추가</h1>
        <v-stepper class="elevation-0" v-model="curStep">
          <v-stepper-header class="elevation-0">
            <v-stepper-step :complete="curStep>1" step="1">상품 입력</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="curStep>2" step="2">상품 분류</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">상품 추가 완료</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items class="elevation-0">
            <v-stepper-content step="1">
              <v-layout column wrap>
                <v-flex v-for="addFormId in addFormIds" class="mb-5">
                  <add-form v-bind:addformId="addFormId"></add-form>
                </v-flex>
                <v-flex xs1 offset-xs5 >
                  <v-btn color="primary" @click="addComponent()">
                    +
                  </v-btn>
                </v-flex>
                <v-flex xs1 offset-xs10 class="mt-5">
                  <v-btn color="primary" @click="classifyProducts()">
                    상품 분류
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-layout column wrap>
                <v-flex class="mb-5">
                  <classified-result></classified-result>
              </v-flex>
              <v-flex>
                <v-layout row>
                  <v-flex xs1  offset-xs1>
                    <v-btn color="primary" @click="curStep = 1">
                      이전 단계
                    </v-btn>
                  </v-flex>
                  <v-flex xs1 offset-xs8>
                    <v-btn color="primary" @click="addProducts()">
                      상품 추가
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
              </v-layout>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-flex class='mt-5'><h2 align=center>선택하신 상품들이 추가되었습니다.</h2></v-flex>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import AddForm from "./ProductAdder/AddForm"
import ClassifiedResult from "./ProductAdder/ClassifiedResult"

export default {
  name: "ProductAdder",
  components: {
    AddForm,
    ClassifiedResult
  },
  data() {
    return {
      curStep: 0,
      addFormIds: [1],
      completedCount: 0,
      idCount: 1,
      mutex: 1
    }
  },
  methods: {
    classifyProducts() {
      if (this.idCount != this.completedCount) {
        this.completedCount++;
        this.$submissionAlarmBus.$emit('classifyProducts' + this.completedCount);
      }
      else {
        this.curStep++;
      }
    },
    addProducts() {
      this.$submissionAlarmBus.$emit('submitProductsToBriefcase');
      this.curStep++;
    },
    addComponent() {
      this.addFormIds.push(++this.idCount);
    }
  },
  mounted() {
    this.$submissionAlarmBus.$on('classifyComplete', this.classifyProducts);
  },
  destroyed() {
    this.$submissionAlarmBus.$off();
    this.$productTransmissionBus.$off('transmitClassified');
  }
};
</script>

<style scoped>
</style>
