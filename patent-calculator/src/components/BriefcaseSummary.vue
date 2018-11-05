<template>
  <v-card>
    <v-toolbar color="grey lighten-4">
      <v-toolbar-title>선택된 상품</v-toolbar-title>
    </v-toolbar>
    <v-list>
      <v-list-tile
        v-for="(_class, classNo) in selected"
        v-if="Object.keys(_class).length > 0"
        :key="classNo"
      >
          <v-list-tile-content>
            {{ classes[classNo] }}
          </v-list-tile-content>
          <v-list-tile-avatar>
          <v-btn fab small slot="activator" color="primary" size=22 @click.native="copyToClipboard(_class, classNo)">
            <span class="white--text body-1 font-weight-medium">
              {{ Object.keys(_class).length }}
            </span>
          </v-btn>
          </v-list-tile-avatar>
      </v-list-tile>
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
  data(){
    return {
      dialog: false,
    }
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
    },
    getNames(_class) {
      let keys = Object.keys(_class)
      let text = _class[keys[0]]['지정상품(국문)'];
      for (let i =1; i<keys.length; i++) {
        text += ', '
        text += _class[keys[i]]['지정상품(국문)'];
      }
      return text
    },
    copyToClipboard(_class, classNo) {
      var copyText = this.getNames(_class)
      var temp = document.createElement("textarea");
      document.body.appendChild(temp);
      temp.value = copyText;
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      const message = this.classes[classNo] + "의 지정상품이 클립보드에 복사되었습니다.";
      this.$noticeEventBus.$emit("raiseNotice", message);
    }
  }
};
</script>

<style scoped>
</style>