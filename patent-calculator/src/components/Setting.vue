<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout column wrap>
        <h1 class="headline font-weight-bold mb-2">설정</h1>

        <v-tabs slot="extension" v-model="activeTab" class="pb-3" slider-color="primary">
          <v-tab class="headline" v-for="tab of tabs" :key="tab">{{tab}}</v-tab>
          <v-btn @click="addNewSetting()">
            <v-icon>add</v-icon>
          </v-btn>
        </v-tabs>
        <v-tabs-items v-model="activeTab" v-for="tab of tabs" :key="tab">
          <v-tab-item :key="tab">
            <v-layout row>
              <v-layout column>
                <v-flex v-for="stage in currentSetting" :key="stage.stageName">
                  <v-flex>{{stage.stageName}}</v-flex>
                  <v-flex>
                    <v-data-table :items="stage.fee" class="elevation-1" hide-actions hide-headers>
                      <template slot="items" slot-scope="props">
                        <td class="text-xs-right">{{ props.item.항목 }}</td>
                        <td class="text-xs-right">
                          <input type="text" v-model="props.item.비용" @keyup="applyChanges()">
                        </td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-flex>
              </v-layout>
              <v-layout column>
                <v-spacer></v-spacer>
                <v-flex>
                  <!-- <v-select :items="Object.keys(설정목록)" @input="applySavedSetting" label="불러오기"></v-select> -->
                </v-flex>
                <v-flex class="pt-2">
                  <v-btn color="white">현재 설정 저장</v-btn>
                </v-flex>
                <v-flex class="pt-2">
                  <v-btn color="white">설정 목록 관리</v-btn>
                </v-flex>
                <v-spacer></v-spacer>
              </v-layout>
            </v-layout>
          </v-tab-item>
        </v-tabs-items>       
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>            

<script>
export default {
  name: "Settings",
  data() {
    return {
      currentSetting: [],
      activeTab: null,
      tabs: null
    };
  },
  created() {
    this.$noticeEventBus.$on("raiseNotice", message => {
      this.message = message;
      this.show = true;
    });
    this.activeTab = this.$store.getters.거래처;
    this.tabs = this.$store.getters.거래처목록;
    this.applySetting(this.$store.getters.현재요금);
  },
  methods: {
    applyChanges() {
      let result = {};
      for (var i = 0; i < this.currentSetting.length; i++) {
        let stage = this.currentSetting[i];
        result[stage.stageName] = {};
        for (var j = 0; j < stage.fee.length; j++) {
          result[stage.stageName][stage.fee[j].항목] = parseInt(
            stage.fee[j].비용
          );
        }
      }
      this.$store.dispatch("setFee", result);
    },
    applySetting(요금) {
      let result = [];
      for (var stageName in 요금) {
        let temp = {};
        temp["stageName"] = stageName;
        temp["fee"] = [];
        for (var item in 요금[stageName]) {
          temp.fee.push({
            항목: item,
            비용: 요금[stageName][item]
          });
        }
        result.push(temp);
      }
      this.currentSetting = result;
    },
    applySavedSetting(event) {
      this.applySetting(this.설정목록[event]);
    },
    addNewSetting() {
    }
  },
  computed: {
  }
};
</script>