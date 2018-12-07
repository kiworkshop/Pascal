<template>
  <v-app>
    <v-toolbar app dark color="primary" flat clipped-right id="app-toolbar">
      <v-toolbar-title v-text="title" class="headline font-weight-bold"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat v-for="(item, i) in menu" :key="i" @click="view=item.component">
          <v-badge color="grey darken-2">
            <!-- <v-icon>{{item.icon}}</v-icon> -->
            <span class="subheading">{{item.title}}</span>
          </v-badge>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer app right clipped :mini-variant.sync="mini" width="350">
      <v-list>
        <v-list-tile v-if="mini">
          <v-list-tile-action>
            <v-btn flat icon>
              <v-icon>arrow_back</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-if="mini">
          <v-list-tile-action>
            <v-btn flat icon>
              <v-badge v-model="selectedCount" small>
                <v-icon>work</v-icon>
                <span slot="badge">{{selectedCount}}</span>
              </v-badge>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-if="mini">
          <v-list-tile-action>
            <v-btn flat icon>
              <v-icon>insert_chart_outlined</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-else @click="mini = !mini">
          <v-list-tile-action>
            <v-icon>arrow_forward</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-layout column v-if="!mini">
          <v-flex>
            <briefcase-summary></briefcase-summary>
          </v-flex>
          <v-flex>
            <quotation-summary></quotation-summary>
          </v-flex>
        </v-layout>
      </v-list>
    </v-navigation-drawer>
    <v-content class="white">
      <transition name="component-fade" mode="out-in">
        <component v-bind:is="view"></component>
      </transition>
      <snackbar></snackbar>
    </v-content>
  </v-app>
</template>

<script>
import Search from "./components/Search";
import ProductAdder from "./components/ProductAdder";
import Briefcase from "./components/Briefcase";
import Quotation from "./components/Quotation";
import Settings from "./components/Settings";
import Snackbar from "./components/Snackbar";
import BriefcaseSummary from "./components/BriefcaseSummary";
import QuotationSummary from "./components/QuotationSummary";
export default {
  name: "App",
  components: {
    Search,
    ProductAdder,
    Briefcase,
    Quotation,
    Settings,
    BriefcaseSummary,
    QuotationSummary,
    Snackbar
  },
  data() {
    return {
      title: "상표 견적 도우미",
      fixed: false,
      menu: [
        {
          icon: "search",
          title: "검색",
          component: "Search",
          badge: false
        },
        {
          icon: "add",
          title: "상품추가",
          component: "ProductAdder",
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
          component: "Settings",
          badge: false
        }
      ],
      view: "Search",
      mini: true
    };
  },
  computed: {
    selectedCount() {
      return this.$store.getters.selectedCount;
    }
  },
  created() {
    this.$store.dispatch("initializeFee");
  }
};
</script>
<style>
* {
  font-family: "Noto Sans KR", sans-serif;
}

#app-toolbar > .v-toolbar__content {
  padding-left: 10rem;
  padding-right: 10rem;
}
</style>
