import { Component, input, signal, OnInit, OnDestroy } from '@angular/core'
import { NzSpinModule } from 'ng-zorro-antd/spin'
import { NzAlertModule } from 'ng-zorro-antd/alert'
import { GuifierComponent } from '../guifier/guifier.component'
import { CodeEditorComponent } from '../code-editor/code-editor.component'
import { encode, decode, type GuifierData, type DataType } from '@/app/utils/guifier.utils'
import { SampleDataService } from '@/app/services/sample-data.service'

@Component({
  selector: 'app-guifier-editor',
  standalone: true,
  imports: [NzSpinModule, NzAlertModule, GuifierComponent, CodeEditorComponent],
  template: `
    @if (loading()) {
      <div class="flex justify-center items-center h-64">
        <nz-spin nzSimple [nzSize]="'large'"></nz-spin>
      </div>
    } @else {
      <div class="flex flex-col items-center gap-4">
        <div class="relative flex gap-4 w-full" style="height: 600px;">
          <div class="flex-1 min-w-0 border rounded-md overflow-hidden bg-white" style="height: 100%;">
            <app-code-editor
              [lang]="type()"
              [value]="codeValue()"
              (valueChange)="onCodeChange($event)"
            />
          </div>

          @if (error()) {
            <div class="flex-1 min-w-0 border rounded-md bg-red-50 p-4">
              <nz-alert
                nzType="error"
                nzMessage="Encoding Error"
                [nzDescription]="error()"
              />
            </div>
          } @else if (guiData()) {
            <div class="flex-1 min-w-0 border rounded-md overflow-hidden bg-white p-4" style="height: 100%;">
              <app-guifier [data]="guiData()!" (dataChange)="onGuiDataChange($event)" />
            </div>
          } @else {
            <div class="flex-1 min-w-0 border rounded-md bg-gray-50"></div>
          }
        </div>
      </div>
    }
  `,
})
export class GuifierEditorComponent implements OnInit, OnDestroy {
  readonly type = input.required<DataType>()

  readonly loading = signal(true)
  readonly error = signal<string | null>(null)
  readonly codeValue = signal('')
  readonly guiData = signal<GuifierData | null>(null)

  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly sampleService: SampleDataService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.loading.set(true)
    try {
      const sample = await this.sampleService.loadSample(this.type())
      this.error.set(null)
      const encoded = encode(this.type(), sample)
      this.guiData.set(encoded)
      this.codeValue.set(decode(this.type(), encoded))
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      this.loading.set(false)
    }
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  onCodeChange(newCode: string): void {
    this.codeValue.set(newCode)
    try {
      this.error.set(null)
      const encoded = encode(this.type(), newCode)
      this.guiData.set(encoded)
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  onGuiDataChange(newData: GuifierData): void {
    this.guiData.set(newData)
    try {
      this.error.set(null)
      this.codeValue.set(decode(this.type(), newData))
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Unknown error')
    }
  }
}
