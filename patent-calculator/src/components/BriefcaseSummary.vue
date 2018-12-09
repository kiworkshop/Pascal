<template>
  <v-card flat>
    <v-list>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title class="font-weight-bold">선택된 상품</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile
        v-for="(products, classNo) in selected"
        v-if="Object.keys(products).length > 0"
        :key="classNo"
        @click="copyToClipboard(classNo, products)"
      >
        <v-list-tile-content class="text-no-wrap text-truncate">{{ classes[classNo] }}</v-list-tile-content>
        <v-list-tile-avatar>
          <v-avatar slot="activator" color="secondary" size="22">
            <span class="white--text body-1 font-weight-medium">{{ Object.keys(products).length }}</span>
          </v-avatar>
        </v-list-tile-avatar>
      </v-list-tile>
      <v-list-tile v-if="Object.keys(selected).length === 0">
        <v-list-tile-content>선택된 상품이 없습니다.</v-list-tile-content>
      </v-list-tile>
      <template v-else>
        <v-divider></v-divider>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title class="font-weight-bold">총 {{Object.keys(selected).length}}개 류</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-flex class="text-xs-right font-weight-bold">{{selectedCount}}개 지정상품</v-flex>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "BriefcaseSummary",
  methods: {
    copyToClipboard(classNo, products) {
      const stringfied = Object.values(products)
        .reduce((acc, val) => {
          acc = acc.concat(val["지정상품(국문)"]);
          return acc;
        }, [])
        .join(", ");
      let temp = document.createElement("textarea");
      document.body.appendChild(temp);
      temp.value = stringfied;
      temp.select();
      document.execCommand("copy");
      document.body.removeChild(temp);
      const message =
        this.classes[classNo] + "의 지정상품이 클립보드에 복사되었습니다.";
      this.$noticeEventBus.$emit("raiseNotice", message);
    }
  },
  computed: {
    selected() {
      return this.$store.getters.selected;
    },
    selectedCount() {
      return this.$store.getters.selectedCount;
    },
    classes() {
      return Object.values(this.$store.getters.classes);
    }
  }
};
</script>

<style scoped>
</style>
