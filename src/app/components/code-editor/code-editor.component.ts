import {
  type AfterViewInit,
  Component,
  type ElementRef,
  effect,
  input,
  type OnDestroy,
  output,
  viewChild,
} from '@angular/core'
import { javascript } from '@codemirror/lang-javascript'
import { json } from '@codemirror/lang-json'
import { xml } from '@codemirror/lang-xml'
import { yaml } from '@codemirror/lang-yaml'
import type { Extension } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { basicSetup } from 'codemirror'
import type { DataType } from '@/app/utils/guifier.utils'

@Component({
  selector: 'app-code-editor',
  standalone: true,
  template: `<div class="editor-container" #editorRef></div>`,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
        width: 100%;
      }
      .editor-container {
        height: 100%;
        width: 100%;
      }
      :host ::ng-deep .cm-editor {
        height: 100% !important;
      }
      :host ::ng-deep .cm-scroller {
        height: 100%;
        overflow: auto;
      }
    `,
  ],
})
export class CodeEditorComponent implements AfterViewInit, OnDestroy {
  readonly lang = input.required<DataType>()
  readonly value = input.required<string>()
  readonly valueChange = output<string>()

  readonly editorRef = viewChild.required<ElementRef<HTMLDivElement>>('editorRef')

  private view: EditorView | null = null
  private updating = false

  constructor() {
    effect(() => {
      const newValue = this.value()
      if (this.view && !this.updating) {
        const currentDoc = this.view.state.doc.toString()
        if (currentDoc !== newValue) {
          this.view.dispatch({
            changes: { from: 0, to: currentDoc.length, insert: newValue },
          })
        }
      }
    })

    effect(() => {
      this.lang()
      if (this.view) {
        this.reinitEditor()
      }
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initEditor()
    }, 0)
  }

  ngOnDestroy(): void {
    this.view?.destroy()
  }

  private initEditor(): void {
    this.view?.destroy()

    const langExt = this.getLanguageExtension()
    const extensions: Extension = [
      basicSetup as Extension,
      langExt,
      EditorView.lineWrapping,
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          this.updating = true
          this.valueChange.emit(update.state.doc.toString())
          Promise.resolve().then(() => {
            this.updating = false
          })
        }
      }),
    ]

    this.view = new EditorView({
      doc: this.value(),
      extensions,
      parent: this.editorRef().nativeElement,
    })
  }

  private reinitEditor(): void {
    if (!this.view) return

    const langExt = this.getLanguageExtension()
    const extensions: Extension = [
      basicSetup as Extension,
      langExt,
      EditorView.lineWrapping,
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          this.updating = true
          this.valueChange.emit(update.state.doc.toString())
          Promise.resolve().then(() => {
            this.updating = false
          })
        }
      }),
    ]

    const currentDoc = this.view.state.doc.toString()
    this.view.destroy()

    this.view = new EditorView({
      doc: currentDoc,
      extensions,
      parent: this.editorRef().nativeElement,
    })
  }

  private getLanguageExtension(): Extension {
    switch (this.lang()) {
      case 'json':
        return json()
      case 'yaml':
        return yaml()
      case 'xml':
        return xml()
      case 'toml':
        return javascript()
      default:
        return json()
    }
  }
}
