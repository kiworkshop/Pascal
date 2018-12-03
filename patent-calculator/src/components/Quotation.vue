<template>
  <v-container fluid grid-list-md>
    <v-slide-y-transition mode="out-in">
      <v-layout>
        <v-flex>
          <v-card>
            <v-toolbar color="grey lighten-4">
              <v-toolbar-title>견적내기</v-toolbar-title>
              <v-spacer></v-spacer>
              <p class="caption text-xs-left" ><br><br>상표 출원 견적을 표시합니다.</p>
            </v-toolbar>
            <v-layout row wrap>
              <v-flex>
                <v-container>
                  <v-toolbar color="elevation-0">
                    <v-toolbar-title>검색단계</v-toolbar-title>
                  </v-toolbar>
                  <v-layout column wrap>
                    <v-flex text-xs-center>검색단계 대리인 수수료</v-flex>
                    <v-layout row wrap>
                      <v-flex text-xs-center>기본료</v-flex>
                      <v-flex text-xs-center>1상표 {{numOfClasses}}개류</v-flex>
                      <v-flex text-xs-right>{{검색단계대리인수수료.toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex text-xs-center>부가세</v-flex>
                      <v-flex text-xs-center>10%</v-flex>
                      <v-flex text-xs-right>{{(검색단계대리인수수료 * 0.1).toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex text-xs-center>소계</v-flex>
                      <v-flex text-xs-right>{{(검색단계대리인수수료 * 1.1).toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-divider light></v-divider>
                    <v-layout row wrap>
                      <v-flex text-xs-center>검색단계 합계</v-flex>
                      <v-flex text-xs-right>{{검색단계비용.toLocaleString()}} 원</v-flex>
                    </v-layout>
                  </v-layout>
                </v-container>
              </v-flex>
              <v-flex>
                <v-container>
                  <v-toolbar color="elevation-0">
                    <v-toolbar-title>출원단계</v-toolbar-title>
                  </v-toolbar>
                  <v-layout column wrap>
                    <v-flex text-xs-center>출원단계 대리인 수수료</v-flex>
                    <v-layout row wrap>
                      <v-flex text-xs-center>기본료</v-flex>
                      <v-flex text-xs-center>1상표 {{numOfClasses}}개류</v-flex>
                      <v-flex text-xs-right>{{출원단계대리인수수료.toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex text-xs-center>부가세</v-flex>
                      <v-flex text-xs-center>10%</v-flex>
                      <v-flex text-xs-right>{{(출원단계대리인수수료 * 0.1).toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex text-xs-center>소계</v-flex>
                      <v-flex text-xs-right>{{(출원단계대리인수수료 * 1.1).toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-divider light></v-divider>
                    <v-flex text-xs-center>출원단계 특허청 관납료</v-flex>
                    <v-layout row wrap>
                      <v-flex text-xs-center>출원료</v-flex>
                      <v-flex text-xs-center>1상표 {{numOfClasses}}개류</v-flex>
                      <v-flex text-xs-right>{{출원단계관납료.toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-divider light></v-divider>
                    <v-layout row wrap>
                      <v-flex text-xs-center>출원단계 합계</v-flex>
                      <v-flex text-xs-right>{{출원단계비용.toLocaleString()}} 원</v-flex>
                    </v-layout>
                  </v-layout>
                </v-container>
              </v-flex>
              <v-flex>
                <v-container>
                  <v-toolbar color="elevation-0">
                    <v-toolbar-title>등록단계</v-toolbar-title>
                  </v-toolbar>
                  <v-layout column wrap>
                    <v-flex text-xs-center>등록단계 대리인 수수료</v-flex>
                    <v-layout row wrap>
                      <v-flex text-xs-center>등록수수료</v-flex>
                      <v-flex text-xs-center>1상표 {{numOfClasses}}개류</v-flex>
                      <v-flex text-xs-right>{{등록단계대리인수수료.toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex text-xs-center>부가세</v-flex>
                      <v-flex text-xs-center>10%</v-flex>
                      <v-flex text-xs-right>{{(등록단계대리인수수료 * 0.1).toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex text-xs-center>소계</v-flex>
                      <v-flex text-xs-right>{{(등록단계대리인수수료 * 1.1).toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-divider light></v-divider>
                    <v-flex text-xs-center>등록단계 특허청 관납료</v-flex>
                    <v-layout row wrap>
                      <v-flex text-xs-center>등록수수료</v-flex>
                      <v-flex text-xs-center>1상표 {{numOfClasses}}개류</v-flex>
                      <v-flex text-xs-right>{{등록단계관납료.toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex text-xs-center>등록세</v-flex>
                      <v-flex text-xs-center>1건</v-flex>
                      <v-flex text-xs-right>{{등록세.toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex text-xs-center>소계</v-flex>
                      <v-flex text-xs-right>{{(등록단계관납료 + 등록세).toLocaleString()}} 원</v-flex>
                    </v-layout>
                    <v-divider light></v-divider>
                    <v-layout row wrap>
                      <v-flex text-xs-center>등록단계 합계</v-flex>
                      <v-flex text-xs-right>{{등록단계비용.toLocaleString()}} 원</v-flex>
                    </v-layout>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
            <v-flex>
              <v-container>
                <v-toolbar color="elevation-0">
                  <v-toolbar-title>출원에서 등록까지</v-toolbar-title>
                </v-toolbar>
                <v-flex text-xs-center>{{전체비용.toLocaleString()}} 원</v-flex>
              </v-container>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
export default {
  name: "Quotation",
  computed: {
    numOfClasses() {
      return this.$store.getters.selectedClassesCount;
    },
    검색단계대리인수수료() {
      return this.$store.getters.calculateFee.검색단계.대리인수수료;
    },
    출원단계대리인수수료() {
      return this.$store.getters.calculateFee.출원단계.대리인수수료;
    },
    등록단계대리인수수료() {
      return this.$store.getters.calculateFee.등록단계.대리인수수료;
    },
    출원단계관납료() {
      return this.$store.getters.calculateFee.출원단계.관납료;
    },
    등록단계관납료() {
      return this.$store.getters.calculateFee.등록단계.관납료;
    },
    등록세() {
      return this.$store.getters.현재요금.등록단계.등록세;
    },
    검색단계비용() {
      return this.검색단계대리인수수료 * 1.1;
    },
    출원단계비용() {
      return this.출원단계대리인수수료 * 1.1 + this.출원단계관납료;
    },
    등록단계비용() {
      return this.등록단계대리인수수료 * 1.1 + this.등록단계관납료 + this.등록세;
    },
    전체비용() {
      return this.검색단계비용 + this.출원단계비용 + this.등록단계비용;
    }
  }
};
</script>

<style scoped>
</style>
