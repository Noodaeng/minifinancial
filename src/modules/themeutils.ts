import { Ref, isRef } from 'vue'
import { ApplicationTheme, Breakpoints } from '../types/myTypes'
import MyConfig from '../modules/myConfig'

/* export function setTheme(theme: ApplicationTheme | Ref<ApplicationTheme>) {
  document &&
    document.body.setAttribute(
      'data-application-theme',
      isRef(theme) ? theme.value : theme,
    );
  const elm = document.getElementById('app');
  elm && elm.classList.add('bg-body');
  MyConfig.instance.LastTheme = isRef(theme) ? theme.value : theme;
} */

export function setTheme(theme: ApplicationTheme | Ref<ApplicationTheme>) {
  if (document) {
    document.body.setAttribute('data-application-theme', isRef(theme) ? theme.value : theme)
  }

  const elm = document.getElementById('app')
  if (elm) {
    elm.classList.add('bg-body')
  }

  MyConfig.instance.LastTheme = isRef(theme) ? theme.value : theme
}

/* export function setTextSize(size: Breakpoints | Ref<Breakpoints>) {
  document && document.body.setAttribute('data-text-size', isRef(size) ? size.value : size)
} */

export function setTextSize(size: Breakpoints | Ref<Breakpoints>) {
  if (document) {
    document.body.setAttribute('data-text-size', isRef(size) ? size.value : size)
  }
}
