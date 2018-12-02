<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout column wrap>

        <h1 class="headline font-weight-bold mb-2">상품추가</h1>

        <v-stepper class="elevation-0 pa-0" v-model="curStep">
          <v-stepper-header class="elevation-0">
            <v-stepper-step :complete="curStep>1" step="1">상품 입력</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="curStep>2" step="2">상품 분류</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">상품 추가 완료</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items class="elevation-0">
            <v-stepper-content step="1" class="pt-0">
              <v-layout column wrap>
                <v-flex v-for="payload in payloads" :key="payload.id" class="my-2">
                  <v-layout column wrap>
                    <v-flex>
                      <v-layout row>
                        <v-flex xs4 class="ml-2">
                          <v-select
                          v-model="payload.classString"
                          :items="classes"
                          label="분류"
                          ></v-select>
                        </v-flex>
                        <v-flex xs8 class="ml-5">
                          <v-textarea
                          v-model="payload.searchingProducts"
                          append-icon="search"
                          placeholder="명칭 (붕산비료, 생물 비료, 도매업)"
                          auto-grow
                          persistent-hint
                          rows="1"
                          ></v-textarea>
                        </v-flex>
                        <v-flex>
                          <v-layout align-center justify-center row fill-height>
                            <v-btn icon color="secondary" flat slot="activator" @click="deleteForm(payload.id)">
                              <v-icon>delete</v-icon>
                            </v-btn>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex>
                  <v-btn block outline color="secondary" class="add-button mt-4" @click="addForm()">
                    <v-icon>add</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-layout align-end justify-end row fill-height>
                <v-btn
                :loading="searchLoading"
                icon
                color="primary"
                class="mx-0 mt-3"
                @click="classifyProducts()">
                <v-icon>
                  arrow_forward
                </v-icon>
              </v-btn>
            </v-layout>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-layout column wrap>
              <v-flex>
                <classified-result></classified-result>
              </v-flex>
              <v-flex>
                <v-layout align-center justify-space-between row fill-height class="mx-1">
                  <v-btn
                  icon
                  color="primary"
                  class="mx-0 mt-3"
                  @click="curStep = 1">
                  <v-icon>
                    arrow_back
                  </v-icon>
                </v-btn>
                <v-btn
                icon
                color="primary"
                class="mx-0 mt-3"
                @click="addProducts()">
                <v-icon>
                  arrow_forward
                </v-icon>
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-flex><h2 align=center>선택하신 상품들이 추가되었습니다.</h2></v-flex>
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
          classString: "",
          _class: -1,
          searchingProducts: ""
        }
      ],
      curStep: 0,
      formCount: 1,
      searchLoading: false
    }
  },
  computed: {
    classes() {
      return Object.values(this.$store.getters.classes);
    }
  },
  methods: {
    classifyProducts() {
      this.searchLoading = true;
      for (let i=0; i<this.payloads.length ; i++) {
        this.payloads[i]._class = this.classes.indexOf(this.payloads[i].classString)
      }
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
        this.curStep++;
        this.searchLoading = false;
      })
    },
    addProducts() {
      this.$submissionAlarmBus.$emit('submitProductsToBriefcase');
      this.curStep++;
    },
    addForm() {
      this.payloads.push({id:++this.formCount, _class:-1, searchingProducts:""});
    },
    deleteForm(payloadId) {
      const deletedIndex = this.payloads.findIndex(payload => payload['id'] == payloadId);
      this.payloads.splice(deletedIndex, 1);
    }
  },
  destroyed() {
    this.$submissionAlarmBus.$off();
    this.$productTransmissionBus.$off('transmitClassified');
  }
};
</script>

<style scoped>
.add-button {
  height: 3.5rem;
  border: dashed 1.3px;
}

.classify-button {
  width: 10%
}
</style>
