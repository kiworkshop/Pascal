<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in menu"
          :key="i"
          @click="view=item.component"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
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
      clipped: false,
      drawer: false,
      fixed: false,
      menu: [
        {
          icon: "search",
          title: "검색하기",
          component: "Search"
        },
        {
          icon: "work",
          title: "내 상표 가방",
          component: "Briefcase"
        },
        {
          icon: "insert_chart_outlined",
          title: "견적내기",
          component: "Quotation"
        }
      ],
      view: "Search",
      miniVariant: false
    };
  }
};
</script>
