<template>
  <v-card>
    <v-toolbar color="grey lighten-4">
      <v-toolbar-title>비고시명칭 상품 목록</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-layout>
      <v-spacer></v-spacer>
      <v-flex>
        <v-select
        v-model="appliedClass"
        :items="classes"
        label="분류"
        ></v-select> <!--적용할 분류 검색 기능-->
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex class="pt-2">
        <v-btn color="white" @click="applyClass()">선택한 항목에 분류 적용</v-btn>
      </v-flex>
      <v-spacer></v-spacer>
    </v-layout>
    <v-data-table
    v-model="selected"
    :headers="headers"
    :items="products"
    :rows-per-page-items="rowsPerPageItems"
    >
    <template slot="items" slot-scope="props">
      <tr :active="props.selected">
        <td>
          <v-checkbox
          :input-value="props.selected"
          primary
          hide-details
          @click="props.selected = !props.selected"
          ></v-checkbox>
        </td>
        <td class="text-xs-center">{{ props.item['NICE분류'] }}</td>
        <td class="text-xs-center"><input type="text" v-model="props.item['지정상품(국문)']"></td>
        <td class="text-xs-center">
          <!--수정하기-->
          <v-btn flat icon slot="activator" color="primary" dark @click.native="moveProduct(props.item.id)">
            <v-icon small>compare_arrows</v-icon>
          </v-btn>
          <v-btn flat icon slot="activator" color="red" dark @click.native="deleteFromList(props.item.id)">
            <v-icon small>delete</v-icon>
          </v-btn>
        </td>
      </tr>
    </template>
  </v-data-table>
</v-card>
</template>

<script>
export default {
  data() {
    return {
      classes: this.$store.getters.classes,
      appliedClass: "",
      products: [],
      selected: [],
      rowsPerPageItems: [
        10,
        25,
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 }
      ],
      headers: [
        {
          text: "선택",
          align: "left",
          sortable: false,
          value: "선택"
        },
        {
          text: "분류",
          align: "center",
          value: "NICE분류"
        },
        {
          text: "명칭",
          align: "center",
          sortable: false,
          value: "지정상품(국문)"
        },
        {
          text: "수정하기",
          align: "center",
          sortable: false,
          value: "수정하기"
        }
      ],
    }
  },
  methods: {
    moveProduct(id) {
      let index = this.products.findIndex(x => x['id'] == id);
      let movedProductList = this.products.splice(index, 1);
      let movedProduct = movedProductList[0]
      movedProduct['고시명칭'] = true;
      this.$productTransmissionBus.$emit('transmit noticed', movedProduct);
    },
    deleteFromList(id) {
      let index = this.products.findIndex(x => x['id'] == id);
      this.products.splice(index, 1);
    },
    applyClass() {
      let productClass = this.$store.getters.classes.indexOf(this.appliedClass);
      let i = 0;
      for (i = 0; i < this.selected.length; i++) {
        let appliedIndex =  this.products.findIndex(x => x['id'] == this.selected[i]['id']);
          if (productClass != -1) {
            this.products[appliedIndex]['NICE분류'] = productClass;
          }
      }
      this.selected = [];
    },
    submitProductsToBriefcase() {
      for (let i = 0; i < this.products.length; i++) {
        let currentProduct = Object.assign({}, this.products[i]);
        currentProduct['고시명칭'] = false;
        this.$store.dispatch("addProduct", currentProduct);
      }
      this.products = [];
    }
  },
  mounted() {
    this.$submissionAlarmBus.$on('submitProducts', this.submitProductsToBriefcase);
    this.$productTransmissionBus.$on('transmit unnoticed', (movedProduct) => {
      this.products.push(movedProduct);
    });
  }
}
</script>
