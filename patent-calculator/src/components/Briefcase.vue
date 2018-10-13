<template>
  <v-container fluid grid-list-md>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>
        <v-flex xs8>
          <v-card>
            <v-toolbar color="grey lighten-4">
              <v-toolbar-title>상품 관리</v-toolbar-title>
              <v-spacer></v-spacer>
              <p class="caption text-xs-left" ><br><br>선택된 지정상품을 표시하고 관리합니다.</p>
            </v-toolbar>
            <v-layout>  
              <v-spacer></v-spacer>
              <v-flex>
              <v-select
                v-model="search._class"
                :items="classes"
                label="분류"
                buttom
              ></v-select> <!--분류별 검색 기능 추가-->
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex>
              <v-text-field
                v-model="search.name"
                append-icon="search"
                label="명칭"
                single-line
                hide-details
              ></v-text-field>
              </v-flex>
              <v-spacer></v-spacer>
            </v-layout>
            <v-data-table
              :headers="headers"
              :items="selected"
              :search="search.name"
              :rows-per-page-items="rowsPerPageItems"
            >
              <template slot="items" slot-scope="props">
                <td class="text-xs-center">{{ props.item['NICE분류'] }}</td>
                <td> {{ props.item['지정상품(국문)'] }}</td>
                <td> {{ props.item['지정상품(영문)'] }}</td>
                <td class="text-xs-center">{{ props.item['유사군코드'] }}</td>
                <td class="text-xs-center">
                  <v-icon v-if="!props.item['고시명칭']" small color="red">X</v-icon>
                  <v-icon v-if="props.item['고시명칭']" small color="blue">O</v-icon>
                </td>
                <td class="text-xs-center">
                  <v-dialog v-model="dialog" width="500">
                    <v-btn flat icon slot="activator" color="primary" dark @click.native="copyProductToEdit(props.item)">
                      <v-icon small>edit</v-icon>
                    </v-btn>            
                    <v-card>
                      <v-card-title>
                        <span class="headline">수정하기</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container grid-list-md>
                          <v-layout wrap>
                            <v-flex xs12>
                              {{ classes[editingProduct['NICE분류']] }}
                            </v-flex>
                            <v-flex xs12>
                              <v-text-field v-model="editingProduct['지정상품(국문)']" label="명칭" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                              <v-text-field v-model="editingProduct['지정상품(영문)']" label="영문 명칭"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                              <v-text-field v-model="editingProduct['유사군코드']" label="유사군코드"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                              <v-checkbox :label="`고시명칭`" v-model="editingProduct['고시명칭']"></v-checkbox>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat @click.native="commitEditing()">수정</v-btn>
                        <v-btn color="primary" flat @click.native="dialog = false">취소</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>                
                  <v-btn flat icon slot="activator" color="red" dark @click.native="deleteProduct(props.item)">
                    <v-icon small>delete</v-icon>
                  </v-btn>            
                </td>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                "{{ search.name }}"을(를) 찾을 수 없습니다.
              </v-alert>
            </v-data-table>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-layout column>
            <v-flex><briefcase-summary></briefcase-summary></v-flex>
            <v-flex><quotation-summary></quotation-summary></v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import BriefcaseSummary from "./BriefcaseSummary";
import QuotationSummary from "./QuotationSummary";
export default {
  name: "Briefcase",
  components: {
    BriefcaseSummary,
    QuotationSummary
  },
  data() {
    return {
      dialog: false,
      rowsPerPageItems: [
        10,
        25,
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 }
      ],
      search: {
        _class: "",
        name: ""
      },
      headers: [
        {
          text: "분류",
          align: "center",
          value: "NICE분류"
        },
        {
          text: "명칭",
          align: "left",
          sortable: false,
          value: "지정상품(국문)"
        },
        {
          text: "영문 명칭",
          align: "left",
          sortable: false,
          value: "지정상품(영문)"
        },
        {
          text: "유사군코드",
          align: "center",
          sortable: false,
          value: "유사군코드"
        },
        {
          text: "고시명칭",
          align: "center",
          sortable: false,
          value: "고시명칭"
        },
        {
          text: "수정하기",
          align: "center",
          sortable: false,
          value: "수정하기"
        }
      ],
      editingProduct: {}
    };
  },
  methods: {
    deleteProduct(item) {
      const message = "[ " + item['NICE분류'] + "류 ] " + item['지정상품(국문)'] + "이(가) 지정상품에서 삭제되었습니다.";
      this.$noticeEventBus.$emit('raiseNotice', message);
      this.$store.dispatch("deleteProduct", item);
    },
    copyProductToEdit(item) {
      this.editingProduct = Object.assign({}, item)
    },
    commitEditing() {
      this.$store.dispatch("editProduct", this.editingProduct);
      this.dialog = false;
      const message = "[ " + this.editingProduct["NICE분류"] + "류 ] " + this.editingProduct["지정상품(국문)"] + "으로 수정되었습니다.";
      this.$noticeEventBus.$emit("raiseNotice", message);
    }
  },
  computed: {
    classes() {
      return this.$store.getters.classes;
    },
    selected() {
      let classes = this.$store.getters.selected;
      let goods = [];
      for (const classId in classes) {
        goods = goods.concat(Object.values(classes[classId]))
      }
      return goods;
    }
  }
};
</script>

<style scoped>
</style>
