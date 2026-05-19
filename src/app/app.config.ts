import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideHttpClient } from '@angular/common/http'
import { provideNzIcons } from 'ng-zorro-antd/icon'
import { zh_CN, provideNzI18n } from 'ng-zorro-antd/i18n'
import { registerLocaleData } from '@angular/common'
import zh from '@angular/common/locales/zh'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import {
  DeleteOutline,
  PlusOutline,
  FontSizeOutline,
  NumberOutline,
  CheckOutline,
  CloseCircleOutline,
} from '@ant-design/icons-angular/icons'
import type { IconDefinition } from '@ant-design/icons-angular'

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
