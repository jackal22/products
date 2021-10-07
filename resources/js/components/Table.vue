<template>
  <v-card>

    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>


      <v-data-table
        :headers="headers"
        :items="products"
        item-key="id"
        :search="search"
        v-model="selectedRows"
        class="elevation-1">
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
      ...mapState(['ProductsInfos']),
      products: function () {
        return this.ProductsInfos
      }
    },

  


    methods:{
      rowClicked(row) {
        this.toggleSelection(row.id);
        bus.$emit('itemsToDelete', this.selectedRows)
      },
      toggleSelection(keyID) {
        if (this.selectedRows.includes(keyID)) {
          this.selectedRows = this.selectedRows.filter(
            selectedKeyID => selectedKeyID !== keyID
          );
        } else {
          this.selectedRows.push(keyID);
        }
      }
    },


        mounted(){
      bus.$on( 'itemsToDelete', (data) => {
        this.itemsToDelete = data
      })

      




      bus.$on( 'resetSelection', () => {
        this.selectedRows = []
      })
    }
}

</script>