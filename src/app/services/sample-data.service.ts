import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { firstValueFrom } from 'rxjs'
import type { DataType } from '../utils/guifier.utils'

@Injectable({ providedIn: 'root' })
export class SampleDataService {
  private readonly http = inject(HttpClient)

  async loadSample(type: DataType): Promise<string> {
    return firstValueFrom(
      this.http.get(`assets/samples/sample.${type === 'json' ? 'json' : type}`, {
        responseType: 'text',
      }),
    )
  }
}
