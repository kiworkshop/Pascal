<template>
  <v-card>
        <v-toolbar color="grey lighten-4">
          <v-toolbar-title>선택된 상표들</v-toolbar-title>
        </v-toolbar>
      <v-list>
          <v-list-group
            v-for="(category, categoryNo) in selected"
            v-if="Object.keys(category).length > 0"
            :key="categoryNo"
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ categories[categoryNo] }}
                </v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-avatar color="blue" size=22>
                  <span class="white--text body-1 font-weight-medium">
                    {{ Object.keys(category).length }}
                  </span>
                </v-avatar>
              </v-list-tile-action>
            </v-list-tile>

            <v-list-tile
                v-for="(item, itemNo) in category"
                :key="itemNo"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item['지정상품(국문)'] }}</v-list-tile-title>
              </v-list-tile-content>
              <!-- <v-icon color="red" small class="mr-2" @click="editItem(item)">edit</v-icon> -->
              <v-icon color="red" small @click="deleteItem(item)">delete</v-icon>
            </v-list-tile>
          </v-list-group>
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
    categories() {
      return this.$store.getters.categories;
    }
  },
  methods: {
    deleteItem(item) {
      this.$store.dispatch("deleteProduct", item);
    }
  }
};
</script>

<style scoped>
</style>