 <template>
  <v-dialog v-model="dialog" width="500">
    <v-btn
        absolute
        slot="activator"
        color="primary" 
        dark @click.native="initAddingProduct()"
    >
        <v-icon>add</v-icon>
    </v-btn>
    <v-card>
        <v-card-title>
        <span class="headline">추가하기</span>
        </v-card-title>
        <v-card-text>
        <v-container grid-list-md>
            <v-layout wrap>
            <v-flex xs12>
                <v-select
                v-model="addingProduct['NICE분류']"
                :items="classes"
                label="분류"
                ></v-select>
            </v-flex>
            <v-flex xs12>
                <v-text-field v-model="addingProduct['지정상품(국문)']" label="명칭" required></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field v-model="addingProduct['지정상품(영문)']" label="영문 명칭"></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field v-model="addingProduct['유사군코드']" label="유사군코드"></v-text-field>
            </v-flex>
            </v-layout>
        </v-container>
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.native="commitAdding()">추가</v-btn>
        <v-btn color="primary" flat @click.native="dialog = false">취소</v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>                
</template>

<script>
export default {
  name: "Snackbar",
  data () {
    return {
      dialog: false,
      addingProduct: {
        'id':0,
        'NICE분류':'',
        '지정상품(국문)':'',
        '지정상품(영문)':'',
        '유사군코드':''
      },
      manuallyAddedProducts: 0
    }
  },
  methods:{
    initAddingProduct() {
      this.addingProduct['NICE분류']='';
      this.addingProduct['지정상품(국문)']='';
      this.addingProduct['지정상품(영문)']='';
      this.addingProduct['유사군코드']='';
    },
    commitAdding() {
      this.manuallyAddedProducts += 1;
      this.addingProduct['id'] = -this.manuallyAddedProducts;
      this.addingProduct['NICE분류'] = this.classes.indexOf(this.addingProduct['NICE분류']);
      this.$store.dispatch("addProduct", this.addingProduct);
      this.dialog = false;
      const message = "[ " + this.addingProduct["NICE분류"] + "류 ] " + this.addingProduct["지정상품(국문)"] + "이(가) 지정상품에 추가되었습니다.";
      this.$noticeEventBus.$emit("raiseNotice", message);
    }
  },
  created() {
    this.$noticeEventBus.$on('raiseNotice', (message) => {
      this.message = message
      this.show = true
      })
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
}
</script>