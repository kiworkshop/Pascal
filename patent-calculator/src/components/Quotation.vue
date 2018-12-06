<template>
  <v-slide-y-transition mode="out-in">
    <v-container>
      <v-layout column>
        <h1 class="headline font-weight-bold mb-2">견적내기</h1>
        <v-container grid-list-xl>
          <v-layout>
            <v-flex s12 sm6 md4 lg4>
              <v-card flat>
                <v-card-title class="title font-weight-bold">검색단계</v-card-title>
                <v-divider class="title-divider"></v-divider>
                <v-list dense>
                  <v-subheader class="subheading">대리인 수수료</v-subheader>
                  <v-list-tile>
                    <v-list-tile-content>기본료</v-list-tile-content>
                    <v-list-tile-content class="align-center">1상표 {{numOfClasses}}개류</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{검색단계대리인수수료.toLocaleString()}}원</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>부가세</v-list-tile-content>
                    <v-list-tile-content class="align-center">10%</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{(검색단계대리인수수료 * 0.1).toLocaleString()}}원</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content class="font-weight-bold">소계</v-list-tile-content>
                    <v-list-tile-content
                      class="align-end font-weight-bold"
                    >{{검색단계비용.toLocaleString()}}원</v-list-tile-content>
                  </v-list-tile>
                  <v-divider class="content-divider"></v-divider>
                  <v-list-tile>
                    <v-list-tile-content class="font-weight-bold">검색단계 합계</v-list-tile-content>
                    <v-list-tile-content
                      class="align-end font-weight-bold"
                    >{{검색단계비용.toLocaleString()}}원</v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
            <v-flex s12 sm6 md4 lg4>
              <v-card flat>
                <v-card-title class="title font-weight-bold">출원단계</v-card-title>
                <v-divider class="title-divider"></v-divider>
                <v-list dense>
                  <v-subheader class="subheading">대리인 수수료</v-subheader>
                  <v-list-tile>
                    <v-list-tile-content>기본료</v-list-tile-content>
                    <v-list-tile-content class="align-center">1상표 {{numOfClasses}}개류</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{출원단계대리인수수료.toLocaleString()}}원</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>부가세</v-list-tile-content>
                    <v-list-tile-content class="align-center">10%</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{(출원단계대리인수수료 * 0.1).toLocaleString()}}원</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content class="font-weight-bold">소계</v-list-tile-content>
                    <v-list-tile-content
                      class="align-end font-weight-bold"
                    >{{(출원단계대리인수수료 * 1.1).toLocaleString()}}원</v-list-tile-content>
                  </v-list-tile>
                  <v-divider class="content-divider"></v-divider>
                  <v-subheader class="subheading">특허청 관납료</v-subheader>
                  <v-list-tile>
                    <v-list-tile-content>출원료</v-list-tile-content>
                    <v-list-tile-content class="align-center">1상표 {{numOfClasses}}개류</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{출원단계관납료.toLocaleString()}}원</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content class="font-weight-bold">소계</v-list-tile-content>
                    <v-list-tile-content
                      class="align-end font-weight-bold"
                    >{{출원단계관납료.toLocaleString()}}원</v-list-tile-content>
                  </v-list-tile>
                  <v-divider class="content-divider"></v-divider>
                  <v-list-tile>
                    <v-list-tile-content class="font-weight-bold">출원단계 합계</v-list-tile-content>
                    <v-list-tile-content
                      class="align-end font-weight-bold"
                    >{{출원단계비용.toLocaleString()}}원</v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
            <v-flex s12 sm6 md4 lg4>
              <v-card flat>
                <v-card-title class="title font-weight-bold">등록단계</v-card-title>
                <v-divider class="title-divider"></v-divider>
                <v-list dense>
                  <v-subheader class="subheading">대리인 수수료</v-subheader>
                  <v-list-tile>
                    <v-list-tile-content>기본료</v-list-tile-content>
                    <v-list-tile-content class="align-center">1상표 {{numOfClasses}}개류</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{등록단계대리인수수료.toLocaleString()}}원</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>부가세</v-list-tile-content>
                    <v-list-tile-content class="align-center">10%</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{(등록단계대리인수수료 * 0.1).toLocaleString()}}원</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content class="font-weight-bold">소계</v-list-tile-content>
                    <v-list-tile-content
                      class="align-end font-weight-bold"
                    >{{(등록단계대리인수수료 * 1.1).toLocaleString()}}원</v-list-tile-content>
                  </v-list-tile>
                  <v-divider class="content-divider"></v-divider>
                  <v-subheader class="subheading">특허청 관납료</v-subheader>
                  <v-list-tile>
                    <v-list-tile-content>등록수수료</v-list-tile-content>
                    <v-list-tile-content class="align-center">1상표 {{numOfClasses}}개류</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{등록단계관납료.toLocaleString()}}원</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>등록세</v-list-tile-content>
                    <v-list-tile-content class="align-center">1건</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{등록세.toLocaleString()}}원</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content class="font-weight-bold">소계</v-list-tile-content>
                    <v-list-tile-content
                      class="align-end font-weight-bold"
                    >{{(등록단계관납료 + 등록세).toLocaleString()}}원</v-list-tile-content>
                  </v-list-tile>
                  <v-divider class="content-divider"></v-divider>
                  <v-list-tile>
                    <v-list-tile-content class="font-weight-bold">등록단계 합계</v-list-tile-content>
                    <v-list-tile-content
                      class="align-end font-weight-bold"
                    >{{등록단계비용.toLocaleString()}}원</v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        <v-list dark class="primary mt-5">
          <v-list-tile>
            <v-list-tile-content class="title font-weight-bold">출원에서 등록까지</v-list-tile-content>
            <v-list-tile-content
              class="title align-end font-weight-bold"
            >합계 {{전체비용.toLocaleString()}}원</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-layout>
    </v-container>
  </v-slide-y-transition>
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
      return this.$store.state.기본료.등록단계.등록세;
    },
    검색단계비용() {
      return this.검색단계대리인수수료 * 1.1;
    },
    출원단계비용() {
      return this.출원단계대리인수수료 * 1.1 + this.출원단계관납료;
    },
    등록단계비용() {
      return (
        this.등록단계대리인수수료 * 1.1 + this.등록단계관납료 + this.등록세
      );
    },
    전체비용() {
      return this.검색단계비용 + this.출원단계비용 + this.등록단계비용;
    }
  }
};
</script>

<style scoped>
.title-divider {
  border: solid 1px black;
}

.content-divider {
  border: solid 1px #d0d0d0;
}
</style>
