<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout column wrap>
        <h1 class="headline font-weight-bold mb-2">설정</h1>
        <v-layout row>
          <v-layout column>
            <v-flex v-for="stage in currentSetting" :key="stage.stageName">
              <v-flex>
                {{stage.stageName}}
              </v-flex>
              <v-flex>
                <v-data-table
                  :items="stage.fee"
                  class="elevation-1"
                  hide-actions
                  hide-headers
                >
                  <template slot="items" slot-scope="props">
                    <td class="text-xs-right">{{ props.item.항목 }}</td>
                    <td class="text-xs-right"><input type="text" v-model="props.item.비용"></td>
                  </template>
                </v-data-table>
              </v-flex>
            </v-flex>
          </v-layout>
          <v-layout column>
            <v-spacer></v-spacer>
            <v-flex>
              <v-select
              :items="Object.keys(설정목록)"
              @input="applySavedSetting"
              label="불러오기"
              ></v-select>
            </v-flex>
            <v-flex class="pt-2">
              <v-btn color="white" @click="applyChanges()">변경사항 적용</v-btn>
            </v-flex>
            <v-flex class="pt-2">
              <v-btn color="white" >현재 설정 저장</v-btn>
            </v-flex>
            <v-flex class="pt-2">
              <v-btn color="white" >설정 목록 관리</v-btn>
            </v-flex>
            <v-spacer></v-spacer>
          </v-layout>
        </v-layout>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>            

<script>
export default {
  name: "Settings",
  data () {
    return {
      currentSetting : []
    }
  },
  created() {
    this.$noticeEventBus.$on('raiseNotice', (message) => {
      this.message = message
      this.show = true
      });
    this.applySetting(this.$store.getters.기본료);
  },
  methods: {
    applyChanges() {
      let result = {};
      for (var i = 0; i < this.currentSetting.length; i++) {
        let stage = this.currentSetting[i];
        result[stage.stageName] = {};
        for (var j = 0; j < stage.fee.length ; j++) {
          result[stage.stageName][stage.fee[j].항목] = parseInt(stage.fee[j].비용);
        }
      }
      this.$store.dispatch("setFee", result)
    },
    applySetting(기본료) {
      let result = [];
      for (var stageName in 기본료) {
        let temp = {};
        temp['stageName'] = stageName;
        temp['fee'] = [];
        for (var item in 기본료[stageName]) {
          temp.fee.push({
            '항목' : item,
            '비용' : 기본료[stageName][item]
          });
        }
        result.push(temp);
      }
      this.currentSetting = result;
    },
    applySavedSetting(event) {
      this.applySetting(this.설정목록[event]);
    }
  },
  computed: {
    설정목록() {
      return this.$store.getters.설정목록;
    }
  }
}
</script>