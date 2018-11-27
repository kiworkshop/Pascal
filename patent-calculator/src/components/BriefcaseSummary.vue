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
      >
        <v-list-tile-content>
          {{ classes[classNo] }}
        </v-list-tile-content>
        <v-list-tile-avatar>
          <v-avatar slot="activator" color="primary" size=22>
            <span class="white--text body-1 font-weight-medium">
              {{ Object.keys(products).length }}
            </span>
          </v-avatar>
        </v-list-tile-avatar>
      </v-list-tile>
      <v-list-tile v-if="Object.keys(selected).length === 0">
        <v-list-tile-content>선택된 상품이 없습니다.</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "BriefcaseSummary",
  computed: {
    selected() {
      return this.$store.getters.selected;
    },
    classes() {
      return Object.values(this.$store.getters.classes);
    },
  }
};
</script>

<style scoped>
</style>
