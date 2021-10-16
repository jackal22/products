<template>

    <v-dialog
      v-model="isshown"

      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Loading...
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
      isshown: Boolean,
    },
    data: () => ({




    }),
    mounted(){




    }

  }  

</script>