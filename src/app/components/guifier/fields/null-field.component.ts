import { Component } from '@angular/core'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzTagModule } from 'ng-zorro-antd/tag'

@Component({
  selector: 'app-null-field',
  standalone: true,
  imports: [NzTagModule, NzIconModule],
  template: `
    <nz-tag nzColor="default">
      <span nz-icon nzType="close-circle"></span>
      null
    </nz-tag>
  `,
})
export class NullFieldComponent {}
