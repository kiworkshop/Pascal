<template>
  <v-card>
    <v-toolbar color="grey lighten-4">
      <v-toolbar-title>선택된 상표</v-toolbar-title>
    </v-toolbar>
    <v-list>
      <v-list-group
        v-for="(_class, classNo) in selected"
        v-if="Object.keys(_class).length > 0"
        :key="classNo"
      >
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>
              {{ classes[classNo] }}
            </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-avatar color="primary" size=22>
              <span class="white--text body-1 font-weight-medium">
                {{ Object.keys(_class).length }}
              </span>
            </v-avatar>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-for="(item, itemNo) in _class" :key="itemNo">
          <v-list-tile-content>
            <v-list-tile-title>{{ item['지정상품(국문)'] }}</v-list-tile-title>
          </v-list-tile-content>
          <v-icon color="red" small @click="deleteProduct(item)">delete</v-icon>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
import ManualAdd from "./ManualAdd";
export default {
  name: "BriefcaseSummary",
  components:{
    ManualAdd
  },
  computed: {
    selected() {
      return this.$store.getters.selected;
    },
    classes() {
      return this.$store.getters.classes;
    }
  },
  methods: {
    deleteProduct(item) {
      const message = "[ " + item['NICE분류'] + "류 ] " + item['지정상품(국문)'] + "이(가) 지정상품에서 삭제되었습니다.";
      this.$noticeEventBus.$emit('raiseNotice', message);
      this.$store.dispatch("deleteProduct", item);
    }
  }
};
</script>

<style scoped>
</style>