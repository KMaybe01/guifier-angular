import { Component, input, output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NzInputNumberModule } from 'ng-zorro-antd/input-number'

@Component({
  selector: 'app-number-field',
  standalone: true,
  imports: [FormsModule, NzInputNumberModule],
  template: `
    <nz-input-number
      [ngModel]="value()"
      (ngModelChange)="valueChange.emit($event ?? 0)"
      nzSize="small"
      class="w-full"
    />
  `,
})
export class NumberFieldComponent {
  readonly value = input.required<number>()
  readonly valueChange = output<number>()
}
