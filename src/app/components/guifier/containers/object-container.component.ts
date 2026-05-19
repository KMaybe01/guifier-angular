import { Component, input, output, forwardRef } from '@angular/core'
import { NzCardModule } from 'ng-zorro-antd/card'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzEmptyModule } from 'ng-zorro-antd/empty'
import { NzTypographyModule } from 'ng-zorro-antd/typography'
import { FieldComponent } from '../fields/field.component'
import { ArrayContainerComponent } from './array-container.component'
import { CreateFieldButtonComponent, type CreateFieldOption } from '../create-field-button.component'
import { isContainerValue, isPlainObject } from '@/app/utils/cn.utils'
import type { GuifierData } from '@/app/utils/guifier.utils'

@Component({
  selector: 'app-object-container',
  standalone: true,
  imports: [
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzEmptyModule,
    NzTypographyModule,
    FieldComponent,
    forwardRef(() => ArrayContainerComponent),
    CreateFieldButtonComponent,
  ],
  template: `
    <nz-card
      [nzTitle]="headerTpl"
      [nzBordered]="true"
      [nzSize]="'small'"
      class="h-fit"
      [class]="className()"
    >
      <ng-template #headerTpl>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-lg">&#123;&#125;</span>
            <span nz-typography>{{ name() }}</span>
          </div>
          <div class="flex items-center gap-2">
            @if (!mainContainer() && name()) {
              <button
                nz-button
                nzType="text"
                nzSize="small"
                nzDanger
                (click)="onDeleteContainer()"
              >
                <span nz-icon nzType="delete"></span>
              </button>
            }
            <app-create-field-button (select)="onAdd($event)" />
          </div>
        </div>
      </ng-template>

      <div class="grid grid-cols-2 gap-4">
        @if (entries().length > 0) {
          @for (entry of entries(); track entry.key) {
            <div [class.col-span-2]="isContainer(entry.value)">
              @if (isContainer(entry.value)) {
                @if (isArray(entry.value)) {
                  <app-array-container
                    [name]="entry.key"
                    [data]="getArrayValue(entry.value)"
                    [parentData]="data()"
                    [levels]="0"
                    class="rounded-t-none"
                    (dataChange)="onFieldChange(entry.key, $event)"
                    (parentDataChange)="onParentDataChange($event)"
                  />
                } @else {
                  <app-object-container
                    [name]="entry.key"
                    [data]="getObjectValue(entry.value)"
                    [parentData]="data()"
                    class="rounded-t-none"
                    [entries]="getObjectEntries(entry.value)"
                    (dataChange)="onFieldChange(entry.key, $event)"
                    (parentDataChange)="onParentDataChange($event)"
                  />
                }
              } @else {
                <div>
                  <div class="flex items-center gap-1 mb-1">
                    <span class="font-bold text-xs">{{ entry.key }}</span>
                    <button
                      nz-button
                      nzType="text"
                      nzSize="small"
                      nzDanger
                      class="h-4 w-4 p-0"
                      (click)="onDeleteField(entry.key)"
                    >
                      <span nz-icon nzType="delete"></span>
                    </button>
                  </div>
                  <app-field
                    [value]="entry.value"
                    (valueChange)="onFieldChange(entry.key, $event)"
                  />
                </div>
              }
            </div>
          }
        } @else {
          <div class="col-span-full text-center py-4">
            <nz-empty nzNotFoundContent="No items yet" />
            <p class="text-xs text-gray-500 mt-2">Click + to add your first one</p>
          </div>
        }
      </div>
    </nz-card>
  `,
})
export class ObjectContainerComponent {
  readonly data = input.required<Record<string, unknown>>()
  readonly parentData = input.required<GuifierData>()
  readonly name = input<string>()
  readonly className = input<string>()
  readonly mainContainer = input(false)
  readonly entries = input.required<{ key: string; value: unknown }[]>()

  readonly dataChange = output<Record<string, unknown>>()
  readonly parentDataChange = output<GuifierData>()

  isContainer(value: unknown): boolean {
    return isContainerValue(value)
  }

  isArray(value: unknown): boolean {
    return Array.isArray(value)
  }

  getArrayValue(value: unknown): unknown[] {
    return value as unknown[]
  }

  getObjectValue(value: unknown): Record<string, unknown> {
    return value as Record<string, unknown>
  }

  getObjectEntries(value: unknown): { key: string; value: unknown }[] {
    return Object.entries(value as Record<string, unknown>).map(([key, val]) => ({
      key,
      value: val,
    }))
  }

  onAdd(option: CreateFieldOption): void {
    const keyName = prompt('Enter the name of the new property')
    if (!keyName) return

    const newData = { ...this.data() }
    switch (option) {
      case 'object':
        newData[keyName] = {}
        break
      case 'array':
        newData[keyName] = []
        break
      case 'string':
        newData[keyName] = ''
        break
      case 'number':
        newData[keyName] = 0
        break
      case 'boolean':
        newData[keyName] = true
        break
    }
    this.dataChange.emit(newData)
  }

  onDeleteField(key: string): void {
    const newData = { ...this.data() }
    delete newData[key]
    this.dataChange.emit(newData)
  }

  onDeleteContainer(): void {
    const parent = this.parentData()
    const name = this.name()
    if (isPlainObject(parent) && name) {
      const newParent = { ...parent }
      delete newParent[name]
      this.parentDataChange.emit(newParent)
    }
  }

  onFieldChange(key: string, newValue: unknown): void {
    this.dataChange.emit({ ...this.data(), [key]: newValue })
  }

  onDataChange(newData: Record<string, unknown>): void {
    this.dataChange.emit(newData)
  }

  onParentDataChange(newData: GuifierData): void {
    this.parentDataChange.emit(newData)
  }
}
