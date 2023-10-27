import {computed, onMounted, ref, watch} from "vue";
import {defineStore} from "pinia";


export const useTheme = defineStore('theme', () => {
    const theme = ref('light')

    onMounted(() => {
        const localTheme = localStorage.getItem('theme')
        if (localTheme) {
            theme.value = localTheme
        }
    })

    function toggleTheme() {
        theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    watch(theme, (currentTheme) => {
        localStorage.setItem('theme', currentTheme)
    })


    const themeStyles = computed(() => {
        // semi-dark mode colors
        return {
            'background-color': theme.value === 'light' ? '#fff' : '#777',
            'color': theme.value === 'light' ? '#000' : '#fff',
            height: '100vh',
        }
    })

    return {themeStyles, toggleTheme}
})