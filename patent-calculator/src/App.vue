<template>
  <v-app>
    <v-toolbar app dark color="#2b2b2b" flat id="app-toolbar">
      <v-toolbar-title v-text="title" class="headline font-weight-bold"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat v-for="(item, i) in menu" :key="i" @click="view=item.component">
          <v-badge color="#808080">
            <span v-if="item.badge" slot="badge" class="caption font-weight-medium">{{selectedCount}}</span>
            <!-- <v-icon>{{item.icon}}</v-icon> -->
            <span class="subheading">{{item.title}}</span>
          </v-badge>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <transition name="component-fade" mode="out-in">
        <component v-bind:is="view"></component>
      </transition>
      <snackbar></snackbar>
    </v-content>
    <v-footer :fixed="fixed">
      <v-layout column align-center>
        <span>&copy; 2018 광일공방</span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import Search from "./components/Search";
import Briefcase from "./components/Briefcase";
import Quotation from "./components/Quotation";
import Snackbar from "./components/Snackbar";
import ManualAdd from "./components/ManualAdd";
import Setting from "./components/Setting";
export default {
  name: "App",
  components: {
    Search,
    Briefcase,
    Quotation,
    Snackbar,
    ManualAdd,
    Setting,
  },
  data() {
    return {
      title: "상표 견적 도우미",
      fixed: false,
      menu: [
        {
          icon: "add",
          title: "상품추가",
          component: "ManualAdd",
          badge: false
        },
        {
          icon: "search",
          title: "검색",
          component: "Search",
          badge: false
        },
        {
          icon: "work",
          title: "상품 관리",
          component: "Briefcase",
          badge: true
        },
        {
          icon: "insert_chart_outlined",
          title: "견적",
          component: "Quotation",
          badge: false
        },
        {
          icon: "settings",
          title: "설정",
          component: "Setting",
          badge: false
        }
      ],
      view: "Search"
    };
  },
  computed: {
    selectedCount() {
      return this.$store.getters.selectedCount;
    }
  },
  created() {
    this.$store.dispatch("fetchClasses");
    this.$store.dispatch("fetchProducts");
    this.$store.dispatch("fetchFeeSettings");
  }
};
</script>
<style>
* {
  font-family: 'Noto Sans KR', sans-serif;
}

#app-toolbar > .v-toolbar__content {
  padding-left: 10rem;
  padding-right: 10rem;
}
</style>
