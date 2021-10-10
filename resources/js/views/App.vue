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

        <v-btn :disabled="disableButton" text @click="editItems()">
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
     <form-input :isshown="showInfoDialog" :itemID="itemID" />
     <loading-dialog :isshown="showLoading" />

   

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>
<script>
import TableComponent from '../components/Table.vue';
import FormInput from '../components/FormInput.vue';
import LoadingDialog from '../components/FormInput.vue';

import { bus } from '../app.js';
  export default {
    components:{
    TableComponent,
    FormInput,
    LoadingDialog,
    },

    data: () => ({
      productList: [],

      showInfoDialog: false,
      showLoading: false,
      itemsToDelete: [],
      itemID: '',
      disableButton: true
    }),


    async mounted(){
 
    bus.$on( 'hideDialogs', (data) =>{
      this.showInfoDialog = data
    })

    bus.$on( 'allowEdit', (data) =>{
      this.disableButton = data
    })


   

    bus.$on( 'itemsToDelete', (data) => {
      this.itemsToDelete = data
    })

     




    },

    methods: {
    //   editItems(){
    //   bus.$emit('UpdateTitle', {title: 'Update Item', button: 'Update'} )
    //   this.$CrudFunc.editData(this.itemsToDelete); 
    //   this.itemID = this.itemsToDelete[0] + '' 
    // },





    addItems(){
      bus.$emit('UpdateTitle', {title: 'Add Item', button: 'Add Product'} )
      this.showInfoDialog = true
    }
  }

  }
</script>