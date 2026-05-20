import { Component, input, output } from '@angular/core'
import type { GuifierData } from '@/app/utils/guifier.utils'
import { ArrayContainerComponent } from './containers/array-container.component'
import { ObjectContainerComponent } from './containers/object-container.component'

@Component({
  selector: 'app-guifier',
  standalone: true,
  imports: [ObjectContainerComponent, ArrayContainerComponent],
  template: `
    @if (isArray()) {
      <app-array-container
        name="root"
        [data]="getArrayData()"
        [parentData]="data()"
        [levels]="0"
        [mainContainer]="true"
        [class]="className()"
        (dataChange)="onDataChange($event)"
        (parentDataChange)="onDataChange($event)"
      />
    } @else {
      <app-object-container
        name="root"
        [data]="getObjectData()"
        [parentData]="data()"
        [mainContainer]="true"
        [class]="className()"
        [entries]="getEntries()"
        (dataChange)="onDataChange($event)"
        (parentDataChange)="onDataChange($event)"
      />
    }
  `,
})
export class GuifierComponent {
  readonly data = input.required<GuifierData>()
  readonly className = input<string>()

  readonly dataChange = output<GuifierData>()

  isArray(): boolean {
    return Array.isArray(this.data())
  }

  getArrayData(): unknown[] {
    return this.data() as unknown[]
  }

  getObjectData(): Record<string, unknown> {
    return this.data() as Record<string, unknown>
  }

  getEntries(): { key: string; value: unknown }[] {
    return Object.entries(this.data() as Record<string, unknown>).map(([key, value]) => ({
      key,
      value,
    }))
  }

  onDataChange(newData: GuifierData): void {
    this.dataChange.emit(newData)
  }
}
