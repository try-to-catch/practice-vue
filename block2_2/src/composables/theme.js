import {computed, onMounted, ref, watch} from "vue";

const theme = ref('light')

export function useTheme() {

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
}