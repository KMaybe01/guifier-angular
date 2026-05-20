import { Component, output } from '@angular/core'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzIconModule } from 'ng-zorro-antd/icon'

export type CreateFieldOption = 'object' | 'array' | 'string' | 'number' | 'boolean'

@Component({
  selector: 'app-create-field-button',
  standalone: true,
  imports: [NzDropDownModule, NzButtonModule, NzIconModule],
  template: `
    <button
      nz-button
      nzType="text"
      nzSize="small"
      [nzDropdownMenu]="menu"
      nz-dropdown
      nzTrigger="click"
      nzPlacement="bottomRight"
    >
      <span nz-icon nzType="plus"></span>
    </button>

    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu>
        <li nz-menu-item (click)="onSelect('object')">
          <span class="mr-2">&#123;&#125;</span>
          Object
        </li>
        <li nz-menu-item (click)="onSelect('array')">
          <span nz-icon nzType="brackets" class="mr-2"></span>
          Array
        </li>
        <li nz-menu-item (click)="onSelect('string')">
          <span nz-icon nzType="font-size" class="mr-2"></span>
          String
        </li>
        <li nz-menu-item (click)="onSelect('number')">
          <span nz-icon nzType="number" class="mr-2"></span>
          Number
        </li>
        <li nz-menu-item (click)="onSelect('boolean')">
          <span nz-icon nzType="check" class="mr-2"></span>
          Boolean
        </li>
      </ul>
    </nz-dropdown-menu>
  `,
})
export class CreateFieldButtonComponent {
  readonly select = output<CreateFieldOption>()

  onSelect(option: CreateFieldOption): void {
    this.select.emit(option)
  }
}
