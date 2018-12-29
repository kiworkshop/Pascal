<template>
  <v-slide-y-transition mode="out-in">
    <v-container fluid id="print-area">
      <v-layout column>
        <v-layout row>
          <v-flex s6>
            <h1 class="headline font-weight-bold mb-5">{{현재거래처}} 견적서</h1>
          </v-flex>
          <v-spacer></v-spacer>
          <v-btn :loading="saveLoading" icon @click="saveAsExcel()">
            <v-icon>vertical_align_bottom</v-icon>
          </v-btn>
          <v-btn icon @click="print()">
            <v-icon>print</v-icon>
          </v-btn>
        </v-layout>
        <v-layout row class="mt-2 mb-5">
          <v-flex s12 sm6 md4 lg4>
            <v-card flat class="mx-2">
              <v-card-title class="title font-weight-bold">검색단계</v-card-title>
              <v-divider class="title-divider"></v-divider>
              <v-list dense>
                <v-subheader class="black--text font-weight-bold">대리인 수수료</v-subheader>
                <v-list-tile class="pl-3">
                  <v-list-tile-content>기본료</v-list-tile-content>
                  <v-list-tile-content class="align-center">1상표 {{numOfClasses}}개류</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{검색단계대리인수수료.toLocaleString()}}원</v-list-tile-content>
                </v-list-tile>
                <v-list-tile class="pl-3">
                  <v-list-tile-content>부가세</v-list-tile-content>
                  <v-list-tile-content class="align-center">10%</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{(검색단계대리인수수료 * 0.1).toLocaleString()}}원</v-list-tile-content>
                </v-list-tile>
                <v-list-tile class="pl-3">
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
            <v-card flat class="mx-2">
              <v-card-title class="title font-weight-bold">출원단계</v-card-title>
              <v-divider class="title-divider"></v-divider>
              <v-list dense>
                <v-subheader class="black--text font-weight-bold">대리인 수수료</v-subheader>
                <v-list-tile class="pl-3">
                  <v-list-tile-content>기본료</v-list-tile-content>
                  <v-list-tile-content class="align-center">1상표 {{numOfClasses}}개류</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{출원단계대리인수수료.toLocaleString()}}원</v-list-tile-content>
                </v-list-tile>
                <v-list-tile class="pl-3">
                  <v-list-tile-content>부가세</v-list-tile-content>
                  <v-list-tile-content class="align-center">10%</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{(출원단계대리인수수료 * 0.1).toLocaleString()}}원</v-list-tile-content>
                </v-list-tile>
                <v-list-tile class="pl-3">
                  <v-list-tile-content class="font-weight-bold">소계</v-list-tile-content>
                  <v-list-tile-content
                    class="align-end font-weight-bold"
                  >{{(출원단계대리인수수료 * 1.1).toLocaleString()}}원</v-list-tile-content>
                </v-list-tile>
                <v-divider class="content-divider"></v-divider>
                <v-subheader class="black--text font-weight-bold">특허청 관납료</v-subheader>
                <v-list-tile class="pl-3">
                  <v-list-tile-content>출원료</v-list-tile-content>
                  <v-list-tile-content class="align-center">1상표 {{numOfClasses}}개류</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{출원단계관납료.toLocaleString()}}원</v-list-tile-content>
                </v-list-tile>
                <v-list-tile class="pl-3">
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
            <v-card flat class="mx-2">
              <v-card-title class="title font-weight-bold">등록단계</v-card-title>
              <v-divider class="title-divider"></v-divider>
              <v-list dense>
                <v-subheader class="black--text font-weight-bold">대리인 수수료</v-subheader>
                <v-list-tile class="pl-3">
                  <v-list-tile-content>기본료</v-list-tile-content>
                  <v-list-tile-content class="align-center">1상표 {{numOfClasses}}개류</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{등록단계대리인수수료.toLocaleString()}}원</v-list-tile-content>
                </v-list-tile>
                <v-list-tile class="pl-3">
                  <v-list-tile-content>부가세</v-list-tile-content>
                  <v-list-tile-content class="align-center">10%</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{(등록단계대리인수수료 * 0.1).toLocaleString()}}원</v-list-tile-content>
                </v-list-tile>
                <v-list-tile class="pl-3">
                  <v-list-tile-content class="font-weight-bold">소계</v-list-tile-content>
                  <v-list-tile-content
                    class="align-end font-weight-bold"
                  >{{(등록단계대리인수수료 * 1.1).toLocaleString()}}원</v-list-tile-content>
                </v-list-tile>
                <v-divider class="content-divider"></v-divider>
                <v-subheader class="black--text font-weight-bold">특허청 관납료</v-subheader>
                <v-list-tile class="pl-3">
                  <v-list-tile-content>등록수수료</v-list-tile-content>
                  <v-list-tile-content class="align-center">1상표 {{numOfClasses}}개류</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{등록단계관납료.toLocaleString()}}원</v-list-tile-content>
                </v-list-tile>
                <v-list-tile class="pl-3">
                  <v-list-tile-content>등록세</v-list-tile-content>
                  <v-list-tile-content class="align-center">1건</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{등록세.toLocaleString()}}원</v-list-tile-content>
                </v-list-tile>
                <v-list-tile class="pl-3">
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
        <v-layout row>
          <v-flex s12 class="mt-5 mx-2">
            <v-divider class="title-divider"></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content class="title font-weight-bold">출원에서 등록까지</v-list-tile-content>
                <v-list-tile-content
                  class="title align-end font-weight-bold"
                >{{전체비용.toLocaleString()}}원</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </v-slide-y-transition>
</template>

<script>
import download from "js-file-download";

export default {
  name: "Quotation",
  data() {
    return {
      saveLoading: false
    };
  },
  methods: {
    print() {
      window.print();
    },
    saveAsExcel() {
      const ec2URL =
        "http://ec2-13-125-38-231.ap-northeast-2.compute.amazonaws.com/excel";

      let quotationPointer = this;
      this.toggleLoader();
      this.$http({
        method: "post",
        url: ec2URL,
        data: {
          분류: Object.keys(this.$store.getters.selected),
          비용: this.$store.getters.calculateFee
        },
        responseType: "arraybuffer"
      })
        .then(function(response) {
          download(
            response.data,
            "견적서.xlsx",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          );
          quotationPointer.toggleLoader();
        })
        .catch(function() {
          quotationPointer.toggleLoader();
          quotationPointer.$noticeEventBus.$emit(
            "raiseNotice",
            "견적서 다운로드에 실패했습니다. 네트워크를 확인해주세요."
          );
        });
    },
    toggleLoader() {
      this.saveLoading = !this.saveLoading;
    }
  },
  computed: {
    현재거래처() {
      return this.$store.getters.현재거래처;
    },
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

@media print {
  @page {
    size: landscape;
    margin: 0mm;
  }

  #print-area {
    background-color: white;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    z-index: 9999;
  }
}
</style>
