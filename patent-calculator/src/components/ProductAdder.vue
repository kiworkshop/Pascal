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
                <v-flex v-for="payload in payloads" :key="payload.id" class="mb-5">
                  <v-container>
                    <v-layout column wrap>
                      <v-flex>
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
                    </v-layout>
                  </v-container>
                </v-flex>
                <v-flex xs1 offset-xs5 >
                  <v-btn color="primary" @click="addForm()">
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
import ClassifiedResult from "./ClassifiedResult"

export default {
  name: "ProductAdder",
  components: {
    ClassifiedResult
  },
  data() {
    return {
      payloads: [
        {
          id: 1,
          _class: -1,
          searchingProducts: ""
        }
      ],
      curStep: 0,
      numOfForms: 1
    }
  },
  computed: {
    classes() {
      return Object.values(this.$store.getters.classes);
    }
  },
  methods: {
    classifyProducts() {
      const requests = [];
      for (let i=0; i<this.payloads.length ; i++) {
        requests.push(this.$searchManager.search(this.payloads[i]).then(response => {
          return response; 
        }));
      }
      let productAdderPointer = this
      Promise.all(requests).then((responses) => {
        let result = {noticed:[], unnoticed:[]};
        for (let i=0; i<responses.length; i++){
          result.noticed = result.noticed.concat(responses[i].noticed);
          result.unnoticed = result.unnoticed.concat(responses[i].unnoticed);
        }
        productAdderPointer.$productTransmissionBus.$emit('transmitClassified', result);
      })
      this.curStep++;
    },
    addProducts() {
      this.$submissionAlarmBus.$emit('submitProductsToBriefcase');
      this.curStep++;
    },
    addForm() {
      this.payloads.push({id:++this.numOfForms, _class:-1, searchingProducts:""});
    }
  },
  destroyed() {
    this.$submissionAlarmBus.$off();
    this.$productTransmissionBus.$off('transmitClassified');
  }
};
</script>

<style scoped>
</style>
