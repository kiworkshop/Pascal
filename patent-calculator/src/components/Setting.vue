<template>
  <v-container fluid grid-list-md>
    <v-slide-y-transition mode="out-in">
      <v-layout>
        <v-flex>
          <v-card>
            <v-toolbar color="grey lighten-4">
              <v-toolbar-title>설정</v-toolbar-title>
              <v-spacer></v-spacer>
              <p class="caption text-xs-left" ><br><br>프로그램의 설정을 변경합니다.</p>
            </v-toolbar>
            <v-layout row wrap>
              <v-flex>
                <v-container>
                  <v-toolbar color="elevation-0">
                    <v-toolbar-title>기본 대리인 수수료</v-toolbar-title>
                  </v-toolbar>

                  <v-layout column wrap>
                    <v-layout row wrap>
                      <v-flex text-xs-center>검색단계 수수료</v-flex>
                      <v-flex text-xs-center>{{ basicFeeEdited.agentSearch.toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-divider light></v-divider>
                    <v-layout row wrap>
                      <v-flex text-xs-center>출원단계 수수료</v-flex>
                      <v-flex text-xs-center>{{ basicFeeEdited.agentApp.toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-divider light></v-divider>
                    <v-layout row wrap>
                      <v-flex text-xs-center>등록단계 수수료</v-flex>
                      <v-flex text-xs-center>{{ basicFeeEdited.agentReg.toLocaleString()}} 원</v-flex>
                    </v-layout>
                  </v-layout>
                </v-container>
              </v-flex>                
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>            

<script>
export default {
  name: "Settings",
  data () {
    return {
      dialog: false,
      basicFeeEdited: {}
    }
  },
  methods:{
  },
  created() {
    this.$noticeEventBus.$on('raiseNotice', (message) => {
      this.message = message
      this.show = true
      });
    this.basicFeeEdited = this.basicFee;
  },
  computed: {
    basicFee() {
      return this.$store.getters.basicFee;
    },
    feeSettingList() {
      return this.$store.getters.feeSettingList;
    },
  }
}
</script>