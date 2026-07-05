import { ref, reactive, watch, Ref } from 'vue'
import { setTheme, setTextSize } from './themeutils'
import { ApplicationTheme, Breakpoints } from '../types/myTypes'


export const appTheme: Ref<ApplicationTheme> = ref('bcs-default')

export const appTextSize: Ref<Breakpoints> = ref('md')

watch(appTheme, (theme: ApplicationTheme, prevTheme: ApplicationTheme) => {
  //console.log(`THEME CHANGED: ${prevTheme} -> ${theme}`);
  console.log(prevTheme)
  setTheme(theme)
})

watch(appTextSize, (size: Breakpoints, prevSize: Breakpoints) => {
  //console.log(`TEXT SIZE CHANGED: ${prevSize} -> ${size}`, size);
  console.log(prevSize)
  setTextSize(size)
})
