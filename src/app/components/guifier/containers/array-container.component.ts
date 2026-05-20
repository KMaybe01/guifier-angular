import { Component, forwardRef, input, output } from '@angular/core'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzCardModule } from 'ng-zorro-antd/card'
import { NzEmptyModule } from 'ng-zorro-antd/empty'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzTypographyModule } from 'ng-zorro-antd/typography'
import { isContainerValue, isPlainObject } from '@/app/utils/cn.utils'
import type { GuifierData } from '@/app/utils/guifier.utils'
import {
  CreateFieldButtonComponent,
  type CreateFieldOption,
} from '../create-field-button.component'
import { FieldComponent } from '../fields/field.component'
import { ObjectContainerComponent } from './object-container.component'

@Component({
  selector: 'app-array-container',
  standalone: true,
  imports: [
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzEmptyModule,
    NzTypographyModule,
    FieldComponent,
    forwardRef(() => ObjectContainerComponent),
    CreateFieldButtonComponent,
  ],
  template: `
    @if (name()) {
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
              <span nz-icon nzType="brackets"></span>
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

        <div class="overflow-auto">
          @if (data().length === 0) {
            <div class="p-4 text-center">
              <nz-empty nzNotFoundContent="No items yet" />
              <p class="text-xs text-gray-500 mt-2">Click + to add your first one</p>
            </div>
          } @else {
            @for (item of data(); track item; let idx = $index; let isLast = $last) {
              <div>
                <div class="flex items-center h-14" [class.border-b]="!isLast || isContainer(item)">
                  @for (_ of levelIndicators(); track _) {
                    <div class="flex flex-col w-[1.8rem] h-full">
                      <div class="flex-1 border-r border-dashed"></div>
                      <div class="flex-1 border-r border-dashed"></div>
                    </div>
                  }
                  <div class="relative flex w-14 h-full">
                    <div class="absolute top-0 flex justify-center items-center w-full h-full">
                      <div
                        class="w-8 h-8 border rounded-full bg-white text-gray-500 flex justify-center items-center text-xs"
                      >
                        {{ idx + 1 }}
                      </div>
                    </div>
                    @if (levels() === 0) {
                      <div class="flex-1 h-full border-r border-dashed"></div>
                      <div class="flex-1 h-full"></div>
                    } @else {
                      <div class="flex flex-col flex-1 h-full">
                        <div class="flex-1 h-full border-b border-dashed"></div>
                        <div
                          class="flex-1 h-full"
                          [class.border-r]="isContainer(item)"
                          [class.border-dashed]="isContainer(item)"
                        ></div>
                      </div>
                      <div class="flex flex-col flex-1 h-full">
                        <div class="flex h-full"></div>
                        <div class="flex h-full"></div>
                      </div>
                    }
                  </div>
                  <div class="flex items-center flex-1 h-full">
                    @if (isContainer(item)) {
                      <div class="flex items-center justify-between text-sm h-full w-full px-4">
                        <span>{{ isArray(item) ? 'Array' : 'Object' }}</span>
                        <div class="flex items-center gap-2">
                          <button
                            nz-button
                            nzType="text"
                            nzSize="small"
                            nzDanger
                            (click)="onDelete(idx)"
                          >
                            <span nz-icon nzType="delete"></span>
                          </button>
                          <app-create-field-button (select)="onAddToContainer(idx, $event)" />
                        </div>
                      </div>
                    } @else {
                      <div class="flex gap-2 pr-4 w-full items-center">
                        <div class="flex-1">
                          <app-field
                            [value]="item"
                            (valueChange)="onFieldChange(idx, $event)"
                          />
                        </div>
                        <button
                          nz-button
                          nzType="text"
                          nzSize="small"
                          nzDanger
                          (click)="onDelete(idx)"
                        >
                          <span nz-icon nzType="delete"></span>
                        </button>
                      </div>
                    }
                  </div>
                </div>
                @if (isContainer(item)) {
                  <div [class.border-b]="!isLast">
                    @if (isArray(item)) {
                      <app-array-container
                        [data]="getArrayValue(item)"
                        [parentData]="data()"
                        [levels]="levels() + 1"
                        (dataChange)="onNestedChange(idx, $event)"
                        (parentDataChange)="onParentDataChange($event)"
                      />
                    } @else if (isObject(item)) {
                      <div class="flex items-stretch">
                        @for (_ of nestedLevelIndicators(); track _) {
                          <div class="w-[1.8rem] border-r border-dashed"></div>
                        }
                        <div class="flex-1">
                          <app-object-container
                            [data]="getObjectValue(item)"
                            [parentData]="data()"
                            [entries]="getObjectEntries(item)"
                            (dataChange)="onNestedChange(idx, $event)"
                            (parentDataChange)="onParentDataChange($event)"
                          />
                        </div>
                      </div>
                    }
                  </div>
                }
              </div>
            }
          }
        </div>
      </nz-card>
    } @else {
      <div class="overflow-auto">
        @if (data().length === 0) {
          <div class="p-4 text-center">
            <nz-empty nzNotFoundContent="No items yet" />
            <p class="text-xs text-gray-500 mt-2">Click + to add your first one</p>
          </div>
        } @else {
          @for (item of data(); track item; let idx = $index; let isLast = $last) {
            <div>
              <div class="flex items-center h-14" [class.border-b]="!isLast || isContainer(item)">
                @for (_ of levelIndicators(); track _) {
                  <div class="flex flex-col w-[1.8rem] h-full">
                    <div class="flex-1 border-r border-dashed"></div>
                    <div class="flex-1 border-r border-dashed"></div>
                  </div>
                }
                <div class="relative flex w-14 h-full">
                  <div class="absolute top-0 flex justify-center items-center w-full h-full">
                    <div
                      class="w-8 h-8 border rounded-full bg-white text-gray-500 flex justify-center items-center text-xs"
                    >
                      {{ idx + 1 }}
                    </div>
                  </div>
                  @if (levels() === 0) {
                    <div class="flex-1 h-full border-r border-dashed"></div>
                    <div class="flex-1 h-full"></div>
                  } @else {
                    <div class="flex flex-col flex-1 h-full">
                      <div class="flex-1 h-full border-b border-dashed"></div>
                      <div
                        class="flex-1 h-full"
                        [class.border-r]="isContainer(item)"
                        [class.border-dashed]="isContainer(item)"
                      ></div>
                    </div>
                    <div class="flex flex-col flex-1 h-full">
                      <div class="flex h-full"></div>
                      <div class="flex h-full"></div>
                    </div>
                  }
                </div>
                <div class="flex items-center flex-1 h-full">
                  @if (isContainer(item)) {
                    <div class="flex items-center justify-between text-sm h-full w-full px-4">
                      <span>{{ isArray(item) ? 'Array' : 'Object' }}</span>
                      <div class="flex items-center gap-2">
                        <button
                          nz-button
                          nzType="text"
                          nzSize="small"
                          nzDanger
                          (click)="onDelete(idx)"
                        >
                          <span nz-icon nzType="delete"></span>
                        </button>
                        <app-create-field-button (select)="onAddToContainer(idx, $event)" />
                      </div>
                    </div>
                  } @else {
                    <div class="flex gap-2 pr-4 w-full items-center">
                      <div class="flex-1">
                        <app-field
                          [value]="item"
                          (valueChange)="onFieldChange(idx, $event)"
                        />
                      </div>
                      <button
                        nz-button
                        nzType="text"
                        nzSize="small"
                        nzDanger
                        (click)="onDelete(idx)"
                      >
                        <span nz-icon nzType="delete"></span>
                      </button>
                    </div>
                  }
                </div>
              </div>
              @if (isContainer(item)) {
                <div [class.border-b]="!isLast">
                  @if (isArray(item)) {
                    <app-array-container
                      [data]="getArrayValue(item)"
                      [parentData]="data()"
                      [levels]="levels() + 1"
                      (dataChange)="onNestedChange(idx, $event)"
                      (parentDataChange)="onParentDataChange($event)"
                    />
                  } @else if (isObject(item)) {
                    <div class="flex items-stretch">
                      @for (_ of nestedLevelIndicators(); track _) {
                        <div class="w-[1.8rem] border-r border-dashed"></div>
                      }
                      <div class="flex-1">
                        <app-object-container
                          [data]="getObjectValue(item)"
                          [parentData]="data()"
                          [entries]="getObjectEntries(item)"
                          (dataChange)="onNestedChange(idx, $event)"
                          (parentDataChange)="onParentDataChange($event)"
                        />
                      </div>
                    </div>
                  }
                </div>
              }
            </div>
          }
        }
      </div>
    }
  `,
})
export class ArrayContainerComponent {
  readonly data = input.required<unknown[]>()
  readonly parentData = input.required<GuifierData>()
  readonly name = input<string>()
  readonly levels = input(0)
  readonly className = input<string>()
  readonly mainContainer = input(false)

  readonly dataChange = output<unknown[]>()
  readonly parentDataChange = output<GuifierData>()

  readonly levelIndicators = input<number[]>([])
  readonly nestedLevelIndicators = input<number[]>([])

  isContainer(value: unknown): boolean {
    return isContainerValue(value)
  }

  isArray(value: unknown): boolean {
    return Array.isArray(value)
  }

  isObject(value: unknown): boolean {
    return isPlainObject(value)
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
    const newData = [...this.data()]
    switch (option) {
      case 'object':
        newData.push({})
        break
      case 'array':
        newData.push([])
        break
      case 'string':
        newData.push('')
        break
      case 'number':
        newData.push(0)
        break
      case 'boolean':
        newData.push(true)
        break
    }
    this.dataChange.emit(newData)
  }

  onAddToContainer(index: number, option: CreateFieldOption): void {
    const item = this.data()[index]
    const newData = [...this.data()]

    if (Array.isArray(item)) {
      const arrData = [...item]
      switch (option) {
        case 'object':
          arrData.push({})
          break
        case 'array':
          arrData.push([])
          break
        case 'string':
          arrData.push('')
          break
        case 'number':
          arrData.push(0)
          break
        case 'boolean':
          arrData.push(true)
          break
      }
      newData[index] = arrData
    } else if (isPlainObject(item)) {
      const keyName = prompt('Enter the name of the new property')
      if (keyName) {
        const objData = { ...(item as Record<string, unknown>) }
        switch (option) {
          case 'object':
            objData[keyName] = {}
            break
          case 'array':
            objData[keyName] = []
            break
          case 'string':
            objData[keyName] = ''
            break
          case 'number':
            objData[keyName] = 0
            break
          case 'boolean':
            objData[keyName] = true
            break
        }
        newData[index] = objData
      }
    }
    this.dataChange.emit(newData)
  }

  onDelete(index: number): void {
    this.dataChange.emit(this.data().filter((_, i) => i !== index))
  }

  onFieldChange(index: number, newValue: unknown): void {
    const newData = [...this.data()]
    newData[index] = newValue
    this.dataChange.emit(newData)
  }

  onNestedChange(index: number, newData: unknown): void {
    const arr = [...this.data()]
    arr[index] = newData
    this.dataChange.emit(arr)
  }

  onParentDataChange(newData: GuifierData): void {
    this.parentDataChange.emit(newData)
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
}
