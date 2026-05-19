import { Component, input, output, computed } from '@angular/core'
import { StringFieldComponent } from './string-field.component'
import { NumberFieldComponent } from './number-field.component'
import { BooleanFieldComponent } from './boolean-field.component'
import { NullFieldComponent } from './null-field.component'

@Component({
  selector: 'app-field',
  standalone: true,
  imports: [StringFieldComponent, NumberFieldComponent, BooleanFieldComponent, NullFieldComponent],
  template: `
    @if (isString()) {
      <app-string-field [value]="stringValue()" (valueChange)="onStringChange($event)" />
    } @else if (isNumber()) {
      <app-number-field [value]="numberValue()" (valueChange)="valueChange.emit($event)" />
    } @else if (isBoolean()) {
      <app-boolean-field [value]="booleanValue()" (valueChange)="valueChange.emit($event)" />
    } @else if (isNull()) {
      <app-null-field />
    } @else {
      <div class="text-red-500">This type doesn't have a default field</div>
    }
  `,
})
export class FieldComponent {
  readonly value = input.required<unknown>()
  readonly valueChange = output<unknown>()

  readonly stringValue = computed(() => (typeof this.value() === 'string' ? this.value() : '') as string)
  readonly numberValue = computed(() => (typeof this.value() === 'number' ? this.value() : 0) as number)
  readonly booleanValue = computed(() => (typeof this.value() === 'boolean' ? this.value() : false) as boolean)

  isString(): boolean {
    return typeof this.value() === 'string'
  }

  isNumber(): boolean {
    return typeof this.value() === 'number'
  }

  isBoolean(): boolean {
    return typeof this.value() === 'boolean'
  }

  isNull(): boolean {
    return this.value() === null
  }

  onStringChange(val: string): void {
    this.valueChange.emit(val)
  }
}
