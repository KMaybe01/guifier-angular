import { Component } from '@angular/core'
import { NzTagModule } from 'ng-zorro-antd/tag'
import { NzIconModule } from 'ng-zorro-antd/icon'

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
