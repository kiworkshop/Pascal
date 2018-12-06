<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout column wrap>
        <h1 class="headline font-weight-bold mb-2">설정하기</h1>
        <v-layout row wrap>
          <v-flex xs12 md6>
            <v-list dense>
              <v-list-tile v-for="(거래처, idx) in 거래처목록" :key="idx" @click="changeClient(거래처)">
                <v-list-tile-content>
                  <v-list-tile-title>{{거래처}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-flex>
          <v-flex xs12 md6>
            <v-card flat>
              <v-card-title class="title font-weight-bold">
                <input :disabled="editing === null" type="text" v-model="현재거래처">
              </v-card-title>
              <v-divider class="title-divider"></v-divider>
              <div v-if="editing === null">
                <v-list dense v-for="(단계별요금, 단계) in 현재요금" :key="단계">
                  <v-subheader class="subheading">{{단계}}</v-subheader>
                  <v-list-tile v-for="(금액, 명목) in 단계별요금" :key="명목">
                    <v-list-tile-content>{{명목}}</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{금액}}원</v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </div>
              <div v-else>
                <v-list dense v-for="(단계별요금, 단계) in editing" :key="단계">
                  <v-subheader class="subheading">
                    <v-subheader class="subheading">{{단계}}</v-subheader>
                  </v-subheader>
                  <v-list-tile v-for="(금액, 명목) in 단계별요금" :key="명목">
                    <v-list-tile-content>{{명목}}</v-list-tile-content>
                    <v-list-tile-content class="align-end">
                      <v-text-field type="number" single-line outline v-model="editing[단계][명목]"></v-text-field>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </div>
              <v-divider></v-divider>
              <v-spacer></v-spacer>
              <v-btn @click="copyClient()">복사</v-btn>
              <v-btn v-if="this.현재거래처 !== '기본' && editing === null" @click="editClient()">수정</v-btn>
              <v-btn v-if="this.현재거래처 !== '기본' && editing !== null" @click="updateClient()">저장</v-btn>
              <v-btn v-if="this.현재거래처 !== '기본'" @click="deleteClient()">삭제</v-btn>
            </v-card>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>            

<script>
import { deepcopy } from "../plugins/util";
export default {
  name: "Settings",
  data() {
    return {
      요금표: null,
      현재거래처: null,
      editing: null
    };
  },
  created() {
    this.요금표 = this.$store.getters.요금표;
    this.현재거래처 = this.$store.getters.현재거래처;
  },
  methods: {
    changeClient(client) {
      this.resetState();
      this.현재거래처 = client;
      this.$store.dispatch("changeClient", this.현재거래처);
    },
    copyClient() {
      this.resetState();
      const newClientName = new Date().toLocaleString() + "에 만들어진 거래처";
      this.요금표[newClientName] = this.요금표[this.현재거래처];
      this.요금표 = deepcopy(this.요금표);
      this.$store.dispatch("updateFee", this.요금표);
      this.changeClient(newClientName);
    },
    editClient() {
      this.editing = deepcopy(this.현재요금);
      this.지울거래처 = this.현재거래처;
    },
    updateClient() {
      for (const key in this.editing) {
        let 단계 = this.editing[key];
        for (const 명목 in 단계) {
          단계[명목] = parseInt(단계[명목]);
        }
      }

      delete this.요금표[this.지울거래처];
      this.요금표[this.현재거래처] = deepcopy(this.editing);
      this.요금표 = deepcopy(this.요금표);
      this.$store.dispatch("updateFee", this.요금표);
      this.changeClient(this.현재거래처);
      this.resetState();
    },
    deleteClient() {
      this.resetState();
      delete this.요금표[this.현재거래처];
      this.요금표 = deepcopy(this.요금표);
      this.changeClient("기본");
      this.$store.dispatch("updateFee", this.요금표);
    },
    resetState() {
      if (this.editing !== null) {
        this.editing = null;
        this.현재거래처 = this.지울거래처;
      }
    }
  },
  computed: {
    거래처목록() {
      return Object.keys(this.요금표);
    },
    현재요금() {
      return this.요금표[this.현재거래처];
    }
  }
};
</script>