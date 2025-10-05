import { onMounted, ref } from 'vue'

export const themes = {
  blue: {
    id: 'blue',
    name: 'Jedi Guardian',
    description: 'Blue Lightsaber',
    color: '#06b6d4',
    warpColor: 'rgba(173, 216, 230, 1)'
  },
  green: {
    id: 'green',
    name: 'Jedi Consular',
    description: 'Green Lightsaber',
    color: '#10b981',
    warpColor: 'rgba(134, 239, 172, 1)'
  },
  purple: {
    id: 'purple',
    name: 'Mace Windu',
    description: 'Purple Lightsaber',
    color: '#a855f7',
    warpColor: 'rgba(233, 213, 255, 1)'
  },
  red: {
    id: 'red',
    name: 'Sith',
    description: 'Red Lightsaber',
    color: '#ef4444',
    warpColor: 'rgba(254, 202, 202, 1)'
  },
  yellow: {
    id: 'yellow',
    name: 'Temple Guard',
    description: 'Yellow Lightsaber',
    color: '#eab308',
    warpColor: 'rgba(254, 240, 138, 1)'
  }
}

const STORAGE_KEY = 'hyperdrive-theme'

export function useTheme() {
  const currentTheme = ref('blue')

  const setTheme = (themeId) => {
    currentTheme.value = themeId
    if (themeId === 'blue') {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', themeId)
    }
    localStorage.setItem(STORAGE_KEY, themeId)
  }

  const loadTheme = () => {
    const savedTheme = localStorage.getItem(STORAGE_KEY)
    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme)
    }
  }

  onMounted(() => {
    loadTheme()
  })

  return {
    currentTheme,
    themes,
    setTheme,
    loadTheme
  }
}
