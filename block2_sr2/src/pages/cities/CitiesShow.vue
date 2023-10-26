<script setup>
import {ref} from "vue";

const {city} = defineProps({city: String})

const today = (new Date()).toLocaleDateString()

const API_KEY = '7914d5a440960cfd5df3bd0388a7ad0f'
const API_URL = 'https://api.openweathermap.org/data/2.5/weather'

const weather = ref({})
function getWeather() {
  fetch(`${API_URL}?q=${city}&appid=${API_KEY}`)
      .then(response => response.json())
      .then(data => weather.value = data)
}

getWeather()
</script>

<template>
  <div class="backdrop-blur p-4" v-if="weather.sys">
    <h2 class="text-white text-2xl font-semibold flex justify-between"><span>{{ city }}({{weather.sys.country}})</span> <span>{{ today }}</span>
    </h2>
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left mt-2 ">
        <tbody class="">
        <tr class="border border-gray-200 ">
          <th class="text-white font-semibold px-16 py-4" scope="row">
            humidity
          </th>
          <td class="py-4 text-gray-400 font-semibold px-16">
            {{ weather.main.humidity}}
          </td>
        </tr>

        <tr class="border border-gray-200 ">
          <th class="text-white font-semibold px-16 py-4" scope="row">
            temp
          </th>
          <td class="py-4 text-gray-400 font-semibold px-16">
            {{ (weather.main.temp - 273.15).toFixed(2) }}
          </td>
        </tr>

        <tr class="border border-gray-200 ">
          <th class="text-white font-semibold px-16 py-4" scope="row">
            main
          </th>
          <td class="py-4 text-gray-400 font-semibold px-16">
            {{ weather.weather[0].main}}
          </td>
        </tr>

        <tr class="border border-gray-200 ">
          <th class="text-white font-semibold px-16 py-4" scope="row">
            pressure
          </th>
          <td class="py-4 text-gray-400 font-semibold px-16">
            {{ weather.main.pressure }}
          </td>
        </tr>

        <tr class="border border-gray-200 ">
          <th class="text-white font-semibold px-16 py-4" scope="row">
            description
          </th>
          <td class="py-4 text-gray-400 font-semibold px-16">
            {{ weather.weather[0].description }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>