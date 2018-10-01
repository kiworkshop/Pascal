<template>
  <v-card>
    <v-toolbar color="grey lighten-4">
      <v-toolbar-title>견적 요약</v-toolbar-title>
    </v-toolbar>
    <v-list two-line subheader>
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <v-icon>bar_chart</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-sub-title>합계</v-list-tile-sub-title>
          <!--v-list-tile-title>{{ appFee.toLocaleString() }} 원</v-list-tile-title-->
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn icon ripple>
            <v-icon color="grey lighten-1">info</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "QuotationSummary",
  computed: {
    appFee() {
      return this.$store.getters.appFee;
    }
  }
};
</script>

<style scoped>
</style>