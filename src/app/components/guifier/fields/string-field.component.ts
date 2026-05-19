import { Component, input, output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NzInputModule } from 'ng-zorro-antd/input'

@Component({
  selector: 'app-string-field',
  standalone: true,
  imports: [FormsModule, NzInputModule],
  template: `
    <input
      nz-input
      type="text"
      [ngModel]="value()"
      (ngModelChange)="onModelChange($event)"
      placeholder="string"
      size="small"
    />
  `,
})
export class StringFieldComponent {
  readonly value = input.required<string>()
  readonly valueChange = output<string>()

  onModelChange(event: Event | string): void {
    const val = typeof event === 'string' ? event : ''
    this.valueChange.emit(val)
  }
}
