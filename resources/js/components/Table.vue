<template>
  <v-card>
    <br>
     <v-btn class="pl-3 btn btn-primary" title="click to view sales" @click="showSales()"><strong>Total Sales: {{ $CrudFunc.GetTotalSales() }}</strong></v-btn>
    <v-card-title>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details />
    </v-card-title>
    <v-data-table :headers="headers" :items="ProductList" item-key="id" :search="search" v-model="selectedRows" class="elevation-1">
      <template v-slot:item="{ item }">
        <tr :class="selectedRows.indexOf(item.id) >-1?'cyan':''" @click="rowClicked(item)">
          <td>{{item.products}}</td>
          <td>{{item.stocks}}</td>
          <td>{{item.price}}</td>
        </tr>
      </template>
    </v-data-table>
  </v-card>

</template>
<script>
import { bus } from '../app.js'
import { mapState } from 'vuex';

export default{
  data () {
    return {
      search: '',
      singleSelect: false,
      selectedRows: [],
      headers: [
        { text: 'Products', value: 'products' },
        { text: 'Stocks', value: 'stocks' },
        { text: 'Price', value: 'price' },
      ]
    }
  },
  
  computed:{
    ...mapState(['ProductList', 'SalesList']),
  },

  watch:{
    ProductList: function (){
      bus.$emit('showLoading', false)
    }
  },

  methods:{
    rowClicked(row) {
      this.toggleSelection(row.id);
      bus.$emit('selectedItems', this.selectedRows)

      if(this.selectedRows.length == 1){
        bus.$emit('disableEdit', false)
        bus.$emit('disableDelete', false)
      }else if(this.selectedRows.length > 1){
        bus.$emit('disableEdit', true)
      }else if(this.selectedRows.length == 0){
        bus.$emit('disableEdit', true)
        bus.$emit('disableDelete', true)
      }
    },

    toggleSelection(keyID) {
      if (this.selectedRows.includes(keyID)) {
        this.selectedRows = this.selectedRows.filter(
          selectedKeyID => selectedKeyID !== keyID
        );
      }else {
        this.selectedRows.push(keyID);
      }
    },
      showSales(){
    bus.$emit('showSalesDialog', true)
  }
  },


  mounted(){
      bus.$on( 'resetSelection', () => {
        this.selectedRows = []
      })
    }
}

</script>