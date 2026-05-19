import { Component, signal } from '@angular/core'
import { NzTabsModule } from 'ng-zorro-antd/tabs'
import { NzTypographyModule } from 'ng-zorro-antd/typography'
import { GuifierEditorComponent } from './components/guifier-editor/guifier-editor.component'
import type { DataType } from './utils/guifier.utils'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NzTabsModule, NzTypographyModule, GuifierEditorComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <h2 nz-typography class="text-center mb-6">Guifier Angular</h2>

        <nz-tabs
          [nzSelectedIndex]="activeTabIndex()"
          (nzSelectedIndexChange)="onTabChange($event)"
          class="bg-white rounded-lg"
        >
          @for (tab of tabs; track tab.key) {
            <nz-tab [nzTitle]="tab.label">
              <div class="p-4">
                <app-guifier-editor [type]="tab.key" />
              </div>
            </nz-tab>
          }
        </nz-tabs>
      </div>
    </div>
  `,
})
export class AppComponent {
  readonly activeTabIndex = signal(0)

  readonly tabs: { key: DataType; label: string }[] = [
    { key: 'json', label: 'JSON' },
    { key: 'yaml', label: 'YAML' },
    { key: 'toml', label: 'TOML' },
    { key: 'xml', label: 'XML' },
  ]

  onTabChange(index: number): void {
    this.activeTabIndex.set(index)
  }
}
