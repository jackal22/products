<template>
  <v-layout row justify-center>
    <v-dialog v-model="isshown" scrollable max-width="800px">
      <v-card>
        <v-card-title>Total Sales</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 400px;">
        <v-simple-table fixed-header height="300px">
          <template v-slot:default>
            <thead>
              <tr>
              <th class="text-center">
                Product
              </th>
              <th class="text-center">
                Quantity
              </th>
               <th class="text-center">
                Total Price
              </th>         
             </tr>
           </thead>
          <tbody>
        <tr v-for="(item, index) in SalesList" :key="item.name">
          <td class="text-center">{{ item.products }}</td>
          <td class="text-center">{{ item.quantity }}</td>
          <td class="text-center">{{ item.totalsales }}</td>
<!--         <td class="text-center"><v-icon @click="deleteItems(item.id)">mdi-delete</v-icon></td> -->
      </tr>
    </tbody>
  </template>
</v-simple-table>

 </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="success" text @click="hideDialog()">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import { mapState } from 'vuex';
import { bus } from '../app.js'
  export default {
    name: 'ShowSales',
    props:{
      isshown : Boolean,
    },
  data: () => ({
 
  }),

  computed:{
    ...mapState(['SalesList'])
  },

  methods:{
    hideDialog(){
      bus.$emit('showSalesDialog', false);
    },

    deleteItems(id){
      this.$CrudFunc.DeleteSales(id)
    },
  },

}
</script>