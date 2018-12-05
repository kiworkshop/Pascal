<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout column wrap>
        <h1 class="headline font-weight-bold mb-2">설정</h1>

        <v-tabs slot="extension" v-model="activeTab" class="pb-3" slider-color="primary">
          <v-tab class="headline" v-for="tab of tabs" :key="tab" @click.native="changeClient()">{{tab}}</v-tab>
          <v-btn @click="addNewSetting()">
            <v-icon>add</v-icon>
          </v-btn>
        </v-tabs>
        <v-layout row>
          <v-flex class="pt-2">
            <v-btn v-if="!editMode" @click.native="editMode = !editMode" color="white">수정</v-btn>
            <v-btn v-else @click.native="applyChanges(); editMode = !editMode;" color="white">저장</v-btn>
          </v-flex>
          <v-flex class="pt-2">
            <v-btn color="white">삭제</v-btn>
          </v-flex>
        </v-layout>
        <v-layout column>
          <v-flex>거래처</v-flex>
          <v-flex>
            명칭: <input :disabled="!editMode" type="text" v-model="client">
          </v-flex>
          <v-flex v-for="stage in currentSetting" :key="stage.stageName">
            <v-flex>{{stage.stageName}}</v-flex>
            <v-flex>
              <v-data-table :items="stage.fee" class="elevation-1" hide-actions hide-headers>
                <template slot="items" slot-scope="props">
                  <td class="text-xs-right">{{ props.item.항목 }}</td>
                  <td class="text-xs-right">
                    <input :disabled="!editMode" type="text" v-model="props.item.비용">
                  </td>
                </template>
              </v-data-table>
            </v-flex>
          </v-flex>
        </v-layout>
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
      tabs: null,
      editMode: false,
      client: null
    };
  },
  created() {
    this.$noticeEventBus.$on("raiseNotice", message => {
      this.message = message;
      this.show = true;
    });
    this.activeTab = this.$store.getters.거래처목록.indexOf(this.$store.getters.현재거래처);
    this.tabs = this.$store.getters.거래처목록;
    this.getSetting(this.$store.getters.현재요금);
    this.client = this.$store.getters.현재거래처;
  },
  methods: {
    applyChanges() {
      let result = {
        "거래처" : this.client,
        "요금" : {}
      };
      for (var i = 0; i < this.currentSetting.length; i++) {
        let stage = this.currentSetting[i];
        result.요금[stage.stageName] = {};
        for (var j = 0; j < stage.fee.length; j++) {
          result.요금[stage.stageName][stage.fee[j].항목] = parseInt(
            stage.fee[j].비용
          );
        }
      }
      this.$store.dispatch("updateFee", result).then(() => {
        this.tabs = this.$store.getters.거래처목록;
        this.client = this.tabs[this.activeTab];
      });
    },
    getSetting(요금) {
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
    addNewSetting() {
      this.$store.dispatch("copyFee");
      this.tabs = this.$store.getters.거래처목록;
    },
    changeClient() {
      this.editMode = false;
      this.$store.dispatch("changeClient", this.tabs[this.activeTab]);
      this.client = this.tabs[this.activeTab];      
      this.getSetting(this.$store.getters.현재요금);
    }
  },
  computed: {
  }
};
</script>