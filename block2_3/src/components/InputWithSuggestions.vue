<script setup>
import {ref} from "vue";

const props = defineProps({
  modelValue: String,
  placeholder: String,
  suggestions: Array,
  columns: Array,
  disabled: {
    required: false,
    type: Boolean,
    default: false
  }
})

const emit = defineEmits({
  'update:modelValue': value => typeof value === 'string'
})

const shouldShowSuggestionList = ref(false)
const hasSuggestionBeenRecentlyAccepted = ref(false)
const inputRef = ref(null)
function onAcceptSuggestion(value) {
  emit('update:modelValue', value)

  shouldShowSuggestionList.value = false
  hasSuggestionBeenRecentlyAccepted.value = true
}

function onFocusIn() {
  if (hasSuggestionBeenRecentlyAccepted.value) {
    shouldShowSuggestionList.value = false
    hasSuggestionBeenRecentlyAccepted.value = false

    return
  }

  shouldShowSuggestionList.value = true
}
</script>

<template>
  <div class="relative">
    <input
        :disabled="disabled"
        :placeholder="placeholder"
        :value="modelValue"
        class="py-3 px-4 rounded font-thin focus:outline-none duration-100 h-auto w-full border border-slate-300"
        type="search"
        ref="inputRef"
        @focusin="onFocusIn" @focusout="shouldShowSuggestionList = false"
        @input="$emit('update:modelValue', $event.target.value)">
    <transition
        enter-active-class="transition ease-out duration-300"
        enter-class="opacity-0 translate"
        enter-to-class="opacity-100 translate"
        leave-active-class="transition ease-in duration-300"
        leave-class="opacity-100 translate"
        leave-to-class="opacity-0 translate"
        name="custom-transition"
    >
      <ul v-if="shouldShowSuggestionList && suggestions.length"
          class="rounded-lg border border-slate-300 shadow shadow-slate-300 mt-3 absolute top-11 right-0 left-0 max-h-36 overflow-auto z-10 bg-white"
          @click.stop>
        <li v-for="(suggestion, index) in suggestions" :key="index"
            class="w-full text-gray-700 px-4 p-2 mt-2 bg-white border-b space-x-1.5 cursor-pointer"
            @click="onAcceptSuggestion(suggestion[columns[0]])">
          {{ suggestion[columns[0]] }}
          <template v-if="columns.length > 1"> ({{ suggestion[columns[1]] }})</template>
        </li>
      </ul>
    </transition>
  </div>
</template>
