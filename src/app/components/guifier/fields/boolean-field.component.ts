import { Component, input, output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NzRadioModule } from 'ng-zorro-antd/radio'

@Component({
  selector: 'app-boolean-field',
  standalone: true,
  imports: [FormsModule, NzRadioModule],
  template: `
    <nz-radio-group [ngModel]="value()" (ngModelChange)="valueChange.emit($event)">
      <label nz-radio-button [nzValue]="true">true</label>
      <label nz-radio-button [nzValue]="false">false</label>
    </nz-radio-group>
  `,
})
export class BooleanFieldComponent {
  readonly value = input.required<boolean>()
  readonly valueChange = output<boolean>()
}
