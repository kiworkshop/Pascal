<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat v-for="(item, i) in menu" :key="i" @click="view=item.component">
        <v-badge color="blue-grey lighten-3">
          <span v-if="item.badge" slot="badge">{{selectedCount}}</span>
          <v-icon>{{item.icon}}</v-icon>
          {{item.title}}
      </v-badge>
      </v-btn>
    </v-toolbar>
    <v-content>
      <!-- 만약 투명도 변화를 주고 싶다면 css에 opacity transition 속성 추가 -->
      <transition name="component-fade" mode="out-in">
        <component v-bind:is="view"></component>
      </transition>
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
export default {
  name: "App",
  components: {
    Search,
    Briefcase,
    Quotation
  },
  data() {
    return {
      title: "상표 견적 도우미",
      fixed: false,
      menu: [
        {
          icon: "search",
          title: "검색하기",
          component: "Search",
          badge: false
        },
        {
          icon: "work",
          title: "내 상표 가방",
          component: "Briefcase",
          badge: true
        },
        {
          icon: "insert_chart_outlined",
          title: "견적내기",
          component: "Quotation",
          badge: false
        }
      ],
      view: "Search",
    };
  },
  computed: {
    selectedCount () {
      return this.$store.getters.selectedCount
    }
  },
  created () {
    this.$store.dispatch('fetchCategories')
    this.$store.dispatch('fetchProducts')
  }
};
</script>
