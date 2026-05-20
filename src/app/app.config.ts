import { registerLocaleData } from '@angular/common'
import { provideHttpClient } from '@angular/common/http'
import zh from '@angular/common/locales/zh'
import { type ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'
import type { IconDefinition } from '@ant-design/icons-angular'
import {
  CheckOutline,
  CloseCircleOutline,
  DeleteOutline,
  FontSizeOutline,
  NumberOutline,
  PlusOutline,
} from '@ant-design/icons-angular/icons'
import { provideNzI18n, zh_CN } from 'ng-zorro-antd/i18n'
import { provideNzIcons } from 'ng-zorro-antd/icon'

registerLocaleData(zh)

const icons: IconDefinition[] = [
  DeleteOutline,
  PlusOutline,
  FontSizeOutline,
  NumberOutline,
  CheckOutline,
  CloseCircleOutline,
]

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter([]),
    provideHttpClient(),
    provideNzI18n(zh_CN),
    provideNzIcons(icons),
    provideAnimationsAsync(),
  ],
}
