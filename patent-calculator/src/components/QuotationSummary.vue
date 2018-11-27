<template>
  <v-card flat>
    <v-list>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title class="font-weight-bold">견적 요약</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-group
        v-for="(description, title) in fee"
        :key="title"
      >
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>{{title}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-flex class="text-xs-right">{{description.소계.toLocaleString()}} 원</v-flex>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-for="(value, index) in description.내역" :key="index">
          <v-list-tile-content>
            <v-list-tile-title>{{value.명목}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-flex class="text-xs-right">{{value.가격.toLocaleString()}} 원</v-flex>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
      <v-divider></v-divider>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title class="font-weight-bold">합계</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-flex class="text-xs-right font-weight-bold">{{전체비용.toLocaleString()}} 원</v-flex>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "QuotationSummary",
  computed: {
    fee() {
      return {
        검색단계: {
          내역: [
            {
              명목: "대리인 수수료",
              가격: this.검색단계대리인수수료
            },
            {
              명목: "부가세",
              가격: this.검색단계대리인수수료 * 0.1
            }
          ],
          소계: this.검색단계비용
        },
        출원단계: {
          내역: [
            {
              명목: "대리인 수수료",
              가격: this.출원단계대리인수수료
            },
            {
              명목: "부가세",
              가격: this.출원단계대리인수수료 * 0.1
            },
            {
              명목: "특허청 관납료",
              가격: this.출원단계관납료
            }
          ],
          소계: this.출원단계비용
        },
        등록단계: {
          내역: [
            {
              명목: "대리인 수수료",
              가격: this.등록단계대리인수수료
            },
            {
              명목: "부가세",
              가격: this.등록단계대리인수수료 * 0.1
            },
            {
              명목: "특허청 관납료",
              가격: this.등록단계관납료 + this.등록세
            }
          ],
          소계: this.등록단계비용
        }
      };
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