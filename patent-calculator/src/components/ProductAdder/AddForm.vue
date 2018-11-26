<template>
  <v-container>
    <v-layout column wrap>
      <v-flex>
        <v-layout row>
          <v-flex xs4>
            <v-select
              v-model="payload._class"
              :items="classes"
              label="분류"
            ></v-select>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs7>
            <v-textarea
              v-model="payload.searchingProducts"
              append-icon="search"
              placeholder="명칭 (붕산비료, 생물 비료, 도매업)"
              auto-grow
              hint="특허청 고시상품명칭 11판(2018)에서 상품 명칭을 검색합니다."
              persistent-hint
              rows="1"
            ></v-textarea>
          </v-flex>
        </v-layout>
      </v-flex>
  </v-layout>

  </v-container>
  <!-- <v-card>
    <v-toolbar color="grey lighten-4">
      <v-toolbar-title>추가할 지정상품</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs4>
            <v-select
            v-model="searchingClass"
            :items="classes"
            label="분류"
            ></v-select>
          </v-flex>
          <v-flex xs8>
            <v-textarea
            v-model="inputString"
            label="명칭"
            :auto-grow="true"
            required
            ></v-textarea>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="black" flat @click.native="searchAndClassify(inputString)">검색 및 분류</v-btn>
    </v-card-actions>
  </v-card> -->
</template>

<script>
export default {
  name: "AddForm",
  props: ['addformId'],
  data() {
    return {
      // TODO: _class의 기본값을 설정해주어야합니다.
      payload: {
        _class: -1,
        searchingProducts: ""
      }
    }
  },
  methods: {
    searchAndClassify() {
      this.$searchManager.search(this.payload).then(result => {
        this.$productTransmissionBus.$emit('transmitClassified', result);
        this.$submissionAlarmBus.$emit('classifyComplete');
      });
    }
  },
  computed: {
    classes() {
      return this.$store.getters.classes;
    }
  },
  mounted() {
    this.$submissionAlarmBus.$on('classifyProducts' + this.addformId, this.searchAndClassify);
  }
}
</script>
