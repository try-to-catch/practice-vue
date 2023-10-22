<script setup>
import {getAddressByWarehouseNumber, getCitiesByString} from "./api.js"
import {computed, ref, watch} from "vue";
import InputWithSuggestions from "./components/InputWithSuggestions.vue";


const cityInput = ref("")
const citySuggestions = ref([])

watch(cityInput, async value => {
  if (value === "") return

  citySuggestions.value = await getCitiesByString(value)
})

const isWarehouseInputEnabled = computed(() => {
  return citySuggestions.value.some(city => city['Description'] === cityInput.value)
})

const warehouseInput = ref("")
const warehouseSuggestions = ref([])

watch(warehouseInput, async value => {
  if (value === "") return

  warehouseSuggestions.value = await getAddressByWarehouseNumber(value, cityInput.value)
})
</script>

<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <div class="w-[600px] rounded-md border border-slate-300 px-10 py-6 bg-slate-50">
      <div class="w-full flex flex-col space-y-3">

        <label>
          Населений пункт
          <InputWithSuggestions v-model="cityInput" :columns="['Description', 'AreaDescription']"
                                :suggestions="citySuggestions" class="mt-1.5 z-10" placeholder="Наприклад Київ"/>
        </label>

        <label>
          Поштове відділення
          <InputWithSuggestions v-model="warehouseInput" :columns="['Description']"
                                :disabled="!isWarehouseInputEnabled" :suggestions="warehouseSuggestions" class="mt-1.5"
                                placeholder="Пошук за номером"/>
        </label>
      </div>
    </div>
  </div>

</template>

