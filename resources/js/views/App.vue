<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h4>Stock Management</h4>
      </div>
      <v-spacer></v-spacer>
      <v-toolbar-items >

        <v-btn text @click="addItems()">
          <span class="mr-2">Add</span>
        </v-btn>

        <v-divider></v-divider>

        <v-btn text @click="editItems()">
          <span class="mr-2">Edit</span>
        </v-btn>

        <v-divider></v-divider>

        <v-btn text @click="$CrudFunc.deleteData(itemsToDelete)">
          <span class="mr-2">Delete</span>
        </v-btn>

          <v-btn text @click="addToCart()">
          <span class="mr-2">Add To Cart</span>
        </v-btn>

      </v-toolbar-items>
    </v-app-bar>


    <table-component class="pt-12" />
     <dialog-info :isshown="showInfoDialog" :itemID="itemID" />
   

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>
<script>
import TableComponent from '../components/Table.vue';
import DialogInfo from '../components/DialogInfo.vue';

import { bus } from '../app.js';
  export default {
    components:{
    TableComponent,
    DialogInfo,
    },

    data: () => ({
    showInfoDialog: false,
    itemsToDelete: [],
    itemID: '',
    }),

    mounted(){
    

    bus.$on( 'hideDialogs', (data) =>{
      this.showInfoDialog = data
    })


    bus.$on( 'hideAddToCart', (data) =>{
      this.showAddToCart = data
    })



    bus.$on( 'itemsToDelete', (data) => {
      this.itemsToDelete = data
    })

     this.$CrudFunc.readData();
    




    },

    methods: {
      editItems(){
      bus.$emit('UpdateTitle', {title: 'Update Item', button: 'Update', isSales: 0} )
      this.$CrudFunc.editData(this.itemsToDelete); 
      this.itemID = this.itemsToDelete[0] + '' 
    },

    addToCart(){
      bus.$emit('UpdateTitle', {title: 'Add To Sales', button: 'Add Sales', isSales: 1} )
      this.$CrudFunc.editData(this.itemsToDelete); 
      this.itemID = this.itemsToDelete[0] + '' 

    },



    addItems(){
      bus.$emit('UpdateTitle', {title: 'Add Item', button: 'Add Product', isSales: 0} )
      this.showInfoDialog = true
    }
    }

  }
</script>