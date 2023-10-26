<script setup>

import {ref} from "vue";
import {useRouter} from "vue-router";

const cities = ref([])
const newCity = ref('')

function addCityToList() {
  cities.value.push(newCity.value)
  newCity.value = ''
}

const selectedCity = ref('')
const router = useRouter()
function redirectToTheForecastPage() {
  if (!selectedCity.value) return
  router.push({name: 'cities.show', params: {city: selectedCity.value}})
}
</script>

<template>
  <div class="backdrop-blur p-8 rounded-2xl overflow-hidden">
    <div class="grid grid-cols-2 gap-2.5">
      <div>
        <label class="block mb-2 text-sm font-medium text-white" for="new_city">CITY ADDING</label>
        <input id="new_city" v-model="newCity"
               class="border text-sm rounded-lg block w-full p-2.5 bg-transparent border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
               placeholder="Kiev"
               required
               type="text" @keydown.enter="addCityToList">
      </div>
      <div>
        <label class="block mb-2 text-sm font-medium text-white" for="new_city">CITY SELECTING</label>
        <select id="new_city" v-model="selectedCity"
                class=" border text-sm rounded-lg block w-full p-2.5 bg-transparent border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                required>
          <option v-for="(city, index) in cities" :key="index" :value="city" class="text-black">{{ city }}</option>
        </select>
      </div>
    </div>
    <button @click="redirectToTheForecastPage"
        class="mt-4 relative  px-5 py-2.5  w-full inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-cyan-800">
      GET FORECAST
    </button>
  </div>
</template>

<style scoped>

</style>