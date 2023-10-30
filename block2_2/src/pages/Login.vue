<script setup>

import {ref} from "vue";
import axios from "axios";
import {useAuth} from "../composables/auth.js";
import {useRouter} from "vue-router";

const input = ref('')
const {user} = useAuth()
const router = useRouter()

function login() {
  axios.get("http://34.82.81.113:3000/students/name/" + input.value).then((response) => {
    if ((response.data === null) || (response.data.name === "CastError")) {
      return
    }

    user.value = response.data
    router.push('/');
  })
}
</script>

<template>
  <div>
    <input v-model="input" placeholder="ім'я студента" required type="text"/>
    <button @click="login">Ввійти</button>
  </div>
</template>
