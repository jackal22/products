<template>

    <v-dialog
      v-model="isShown"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>

  <script>
import { bus } from '../app.js';
  export default{
    name: 'LoadingDialog',
    props: {
      isShown: Boolean,
    },
    data: () => ({




    }),
    mounted(){
      bus.$on('showLoading', (data) => {
        this.isShown = data
      })




    }

  }  



</script>