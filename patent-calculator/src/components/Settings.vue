<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout column wrap>
        <h1 class="headline font-weight-bold mb-4">설정하기</h1>
        <v-layout row wrap justify-center>
          <v-flex xs12 md3 class='mr-5'>
            <v-card flat>
              <v-card-title>
                <input class="title font-weight-bold" type="text" name="" value="거래처 목록" readonly>
              </v-card-title>
              <v-divider class="title-divider"></v-divider>
              <v-list dense>
                <v-list-tile avatar v-for="(거래처, idx) in 거래처목록" :key="idx" @click="changeClient(거래처)">
                  <v-list-tile-avatar>
                    <v-icon color="primary" v-if="거래처 === 현재거래처">bookmark</v-icon>
                    <v-icon v-else>bookmark_border</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content class="font-weight-bold">
                    <v-list-tile-title v-if="거래처 === 현재거래처">{{거래처}}</v-list-tile-title>
                    <v-list-tile-title v-else class="grey--text">{{거래처}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
          <v-flex xs12 md4 class="ml-3">
            <v-card flat>
              <v-card-title>
                <input v-if="editing === null" class="title font-weight-bold client-name" type="text" name="" v-model="현재거래처" readonly>
                <input v-else class="title font-weight-bold client-name edit" type="text" name="" v-model="현재거래처">
              </v-card-title>
              <v-divider class="title-divider"></v-divider>
              <div v-if="editing === null">
                <v-list dense v-for="(단계별요금, 단계) in 현재요금" :key="단계">
                  <v-subheader class="black--text font-weight-bold">{{단계}}</v-subheader>
                  <v-list-tile class="pl-3" v-for="(금액, 명목) in 단계별요금" :key="명목">
                    <v-list-tile-content>{{명목}}</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{금액.toLocaleString()}}원</v-list-tile-content>
                  </v-list-tile>
                  <v-divider class="content-divider"></v-divider>
                </v-list>
              </div>
              <div v-else>
                <v-list dense v-for="(단계별요금, 단계) in editing" :key="단계">
                  <v-subheader class="black--text font-weight-bold">{{단계}}</v-subheader>
                  <v-list-tile class="pl-3" v-for="(금액, 명목) in 단계별요금" :key="명목">
                    <v-list-tile-content>{{명목}}</v-list-tile-content>
                    <v-list-tile-content class="align-end">
                      <input type="number" class="price" v-model="editing[단계][명목]">
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider class="content-divider"></v-divider>
                </v-list>
              </div>
              <v-layout align-center justify-end row>
                <v-btn color="primary" v-if="editing === null" @click="copyClient()">복사</v-btn>
                <v-btn color="primary" v-if="this.현재거래처 !== '기본' && editing === null" @click="editClient()">수정</v-btn>
                <v-btn color="primary" v-if="this.현재거래처 !== '기본' && editing === null" @click="deleteClient()">삭제</v-btn>

                <v-btn color="primary" v-if="this.현재거래처 !== '기본' && editing !== null" @click="updateClient()">저장</v-btn>
                <v-btn color="primary" v-if="this.현재거래처 !== '기본' && editing !== null" @click="resetState()">취소</v-btn>
              </v-layout>
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

<style scoped>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

.title-divider {
  border: solid 1px black;
}

.content-divider {
  border: solid 1px #d0d0d0;
}

.client-name {
  width: 100%;
}

.client-name.edit {
  margin: -5px -9px;
  padding: 4px 8px;
  border: 1px solid lightgrey;
}

.price {
  width: 100px;
  border-bottom: 1px dashed lightgrey;
}

.price:focus {
  border-bottom: 1px solid black;
  outline: none;
}

.price:hover {
  border-bottom: 1px solid black;
}
</style>
