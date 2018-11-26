<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout column wrap>
       <h1 class="headline font-weight-bold mb-2">상품 관리</h1>
          <v-layout row>
            <v-flex xs4>
              <v-select
                v-model="search._class"
                :items="classes"
                label="분류"
              ></v-select>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs7>
              <v-text-field
                v-model="search.name"
                append-icon="search"
                label="명칭"
                single-line
                hint="선택된 지정상품에서 검색합니다."
                persistent-hint
              ></v-text-field>
          </v-flex>
        </v-layout>
        <v-data-table
          :headers="headers"
          :items="selected"
          :search="search.name"
          :rows-per-page-items="rowsPerPageItems"
          no-data-text="선택된 지정상품이 없습니다."
          class="mt-3"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item['NICE분류'] }}</td>
            <td> {{ props.item['지정상품(국문)'] }}</td>
            <td> {{ props.item['지정상품(영문)'] }}</td>
            <td class="text-xs-center">{{ props.item['유사군코드'] }}</td>
            <td class="text-xs-center">
              <v-icon v-if="!props.item['고시명칭']" small color="secondary">X</v-icon>
              <v-icon v-if="props.item['고시명칭']" small color="secondary">O</v-icon>
            </td>
            <td class="text-xs-center">
              <v-dialog v-model="dialog" width="500">
                <v-btn flat icon slot="activator" color="grey darken-2" dark @click.native="copyProductToEdit(props.item)">
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
              <v-btn flat icon slot="activator" color="grey darken-2" dark @click.native="deleteProduct(props.item)">
                <v-icon small>delete</v-icon>
              </v-btn>            
            </td>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            "{{ search.name }}"을(를) 찾을 수 없습니다.
          </v-alert>
        </v-data-table>
    </v-layout>
  </v-slide-y-transition>
</v-container>
</template>

<script>
export default {
  name: "Briefcase",
  data() {
    return {
      dialog: false,
      rowsPerPageItems: [
        10,
        25,
        100
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
      const message =
        "[ " +
        item["NICE분류"] +
        "류 ] " +
        item["지정상품(국문)"] +
        "이(가) 지정상품에서 삭제되었습니다.";
      this.$noticeEventBus.$emit("raiseNotice", message);
      this.$store.dispatch("deleteProduct", item);
    },
    copyProductToEdit(item) {
      this.editingProduct = Object.assign({}, item);
    },
    commitEditing() {
      this.$store.dispatch("editProduct", this.editingProduct);
      this.dialog = false;
      const message =
        "[ " +
        this.editingProduct["NICE분류"] +
        "류 ] " +
        this.editingProduct["지정상품(국문)"] +
        "으로 수정되었습니다.";
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
        goods = goods.concat(Object.values(classes[classId]));
      }
      return goods;
    }
  }
};
</script>

<style scoped>
</style>
