import {
  CdkConnectedOverlay,
  DEFAULT_TOOLTIP_POSITIONS,
  NzConnectedOverlayDirective,
  NzNoAnimationDirective,
  NzOverlayModule,
  OverlayModule,
  POSITION_MAP,
  TOOLTIP_OFFSET_MAP,
  getPlacementName,
  setConnectedPositionOffset
} from "./chunk-EYBHOVGW.js";
import {
  NzI18nService
} from "./chunk-FIYE7DBW.js";
import "./chunk-GJUQUZSC.js";
import {
  NzAutosizeDirective,
  NzInputDirective,
  NzInputModule,
  NzResizeService
} from "./chunk-LW22UNWY.js";
import "./chunk-A4Y3VZTG.js";
import {
  cancelAnimationFrame,
  requestAnimationFrame
} from "./chunk-IRFOIPHF.js";
import "./chunk-UK5VAOSV.js";
import {
  ENTER,
  ESCAPE
} from "./chunk-U5CLN3AJ.js";
import "./chunk-PIRFNR5Q.js";
import "./chunk-CDIT6HCK.js";
import "./chunk-2RJ7ZCZ5.js";
import {
  zoomBigMotion
} from "./chunk-IKK64QXK.js";
import "./chunk-4VRCB25K.js";
import {
  NzIconDirective,
  NzIconModule
} from "./chunk-AWCN7PTS.js";
import "./chunk-L56RFBKG.js";
import {
  Platform,
  _getEventTarget
} from "./chunk-JN7LUZMM.js";
import "./chunk-KX6NQVU4.js";
import {
  NzOutletModule,
  NzStringTemplateOutletDirective
} from "./chunk-UGPOJWXJ.js";
import {
  NzConfigService,
  WithConfig,
  isPresetColor,
  takeUntilDestroyed
} from "./chunk-AQ53G453.js";
import {
  fromEventOutsideAngular,
  isNotNil,
  isStyleSupport,
  measure,
  toBoolean
} from "./chunk-YK7AGL5N.js";
import "./chunk-3DDCKMDV.js";
import {
  Directionality
} from "./chunk-7PCUHPM7.js";
import "./chunk-E5DBFY3L.js";
import "./chunk-FKTVGP64.js";
import "./chunk-MEJRGN6B.js";
import {
  NgTemplateOutlet,
  isPlatformBrowser
} from "./chunk-3T2R5HY6.js";
import "./chunk-G7O3BYNQ.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DOCUMENT,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  NgZone,
  Output,
  PLATFORM_ID,
  Renderer2,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  afterNextRender,
  booleanAttribute,
  inject,
  numberAttribute,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-LYK4LAP3.js";
import {
  BehaviorSubject,
  Subject,
  Subscription,
  __esDecorate,
  __runInitializers,
  asapScheduler,
  delay,
  distinctUntilChanged,
  filter,
  first,
  switchMap
} from "./chunk-PNAWZPWB.js";
import {
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-E7DWTVYE.js";

// node_modules/.pnpm/@angular+cdk@20.2.14_@angul_6a9c580a83d18025d6559b05ce79fdc6/node_modules/@angular/cdk/fesm2022/clipboard.mjs
var PendingCopy = class {
  _document;
  _textarea;
  constructor(text, _document) {
    this._document = _document;
    const textarea = this._textarea = this._document.createElement("textarea");
    const styles = textarea.style;
    styles.position = "fixed";
    styles.top = styles.opacity = "0";
    styles.left = "-999em";
    textarea.setAttribute("aria-hidden", "true");
    textarea.value = text;
    textarea.readOnly = true;
    (this._document.fullscreenElement || this._document.body).appendChild(textarea);
  }
  /** Finishes copying the text. */
  copy() {
    const textarea = this._textarea;
    let successful = false;
    try {
      if (textarea) {
        const currentFocus = this._document.activeElement;
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        successful = this._document.execCommand("copy");
        if (currentFocus) {
          currentFocus.focus();
        }
      }
    } catch {
    }
    return successful;
  }
  /** Cleans up DOM changes used to perform the copy operation. */
  destroy() {
    const textarea = this._textarea;
    if (textarea) {
      textarea.remove();
      this._textarea = void 0;
    }
  }
};
var Clipboard = class _Clipboard {
  _document = inject(DOCUMENT);
  constructor() {
  }
  /**
   * Copies the provided text into the user's clipboard.
   *
   * @param text The string to copy.
   * @returns Whether the operation was successful.
   */
  copy(text) {
    const pendingCopy = this.beginCopy(text);
    const successful = pendingCopy.copy();
    pendingCopy.destroy();
    return successful;
  }
  /**
   * Prepares a string to be copied later. This is useful for large strings
   * which take too long to successfully render and be copied in the same tick.
   *
   * The caller must call `destroy` on the returned `PendingCopy`.
   *
   * @param text The string to copy.
   * @returns the pending copy operation.
   */
  beginCopy(text) {
    return new PendingCopy(text, this._document);
  }
  static ɵfac = function Clipboard_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Clipboard)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _Clipboard,
    factory: _Clipboard.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Clipboard, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var CDK_COPY_TO_CLIPBOARD_CONFIG = new InjectionToken("CDK_COPY_TO_CLIPBOARD_CONFIG");
var CdkCopyToClipboard = class _CdkCopyToClipboard {
  _clipboard = inject(Clipboard);
  _ngZone = inject(NgZone);
  /** Content to be copied. */
  text = "";
  /**
   * How many times to attempt to copy the text. This may be necessary for longer text, because
   * the browser needs time to fill an intermediate textarea element and copy the content.
   */
  attempts = 1;
  /**
   * Emits when some text is copied to the clipboard. The
   * emitted value indicates whether copying was successful.
   */
  copied = new EventEmitter();
  /** Copies that are currently being attempted. */
  _pending = /* @__PURE__ */ new Set();
  /** Whether the directive has been destroyed. */
  _destroyed;
  /** Timeout for the current copy attempt. */
  _currentTimeout;
  constructor() {
    const config = inject(CDK_COPY_TO_CLIPBOARD_CONFIG, {
      optional: true
    });
    if (config && config.attempts != null) {
      this.attempts = config.attempts;
    }
  }
  /** Copies the current text to the clipboard. */
  copy(attempts = this.attempts) {
    if (attempts > 1) {
      let remainingAttempts = attempts;
      const pending = this._clipboard.beginCopy(this.text);
      this._pending.add(pending);
      const attempt = () => {
        const successful = pending.copy();
        if (!successful && --remainingAttempts && !this._destroyed) {
          this._currentTimeout = this._ngZone.runOutsideAngular(() => setTimeout(attempt, 1));
        } else {
          this._currentTimeout = null;
          this._pending.delete(pending);
          pending.destroy();
          this.copied.emit(successful);
        }
      };
      attempt();
    } else {
      this.copied.emit(this._clipboard.copy(this.text));
    }
  }
  ngOnDestroy() {
    if (this._currentTimeout) {
      clearTimeout(this._currentTimeout);
    }
    this._pending.forEach((copy) => copy.destroy());
    this._pending.clear();
    this._destroyed = true;
  }
  static ɵfac = function CdkCopyToClipboard_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkCopyToClipboard)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _CdkCopyToClipboard,
    selectors: [["", "cdkCopyToClipboard", ""]],
    hostBindings: function CdkCopyToClipboard_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("click", function CdkCopyToClipboard_click_HostBindingHandler() {
          return ctx.copy();
        });
      }
    },
    inputs: {
      text: [0, "cdkCopyToClipboard", "text"],
      attempts: [0, "cdkCopyToClipboardAttempts", "attempts"]
    },
    outputs: {
      copied: "cdkCopyToClipboardCopied"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkCopyToClipboard, [{
    type: Directive,
    args: [{
      selector: "[cdkCopyToClipboard]",
      host: {
        "(click)": "copy()"
      }
    }]
  }], () => [], {
    text: [{
      type: Input,
      args: ["cdkCopyToClipboard"]
    }],
    attempts: [{
      type: Input,
      args: ["cdkCopyToClipboardAttempts"]
    }],
    copied: [{
      type: Output,
      args: ["cdkCopyToClipboardCopied"]
    }]
  });
})();
var ClipboardModule = class _ClipboardModule {
  static ɵfac = function ClipboardModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ClipboardModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _ClipboardModule,
    imports: [CdkCopyToClipboard],
    exports: [CdkCopyToClipboard]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClipboardModule, [{
    type: NgModule,
    args: [{
      imports: [CdkCopyToClipboard],
      exports: [CdkCopyToClipboard]
    }]
  }], null, null);
})();

// node_modules/.pnpm/ng-zorro-antd@20.4.4_5c87d87af9ed56c9ef0fa0020dfa9f57/node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-core-trans-button.mjs
var NzTransButtonDirective = class _NzTransButtonDirective {
  static ɵfac = function NzTransButtonDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTransButtonDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _NzTransButtonDirective,
    selectors: [["button", "nz-trans-button", ""]],
    hostVars: 8,
    hostBindings: function NzTransButtonDirective_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵstyleProp("border", "0")("background", "transparent")("padding", "0")("line-height", "inherit");
      }
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTransButtonDirective, [{
    type: Directive,
    args: [{
      selector: "button[nz-trans-button]",
      host: {
        "[style.border]": '"0"',
        "[style.background]": '"transparent"',
        "[style.padding]": '"0"',
        "[style.line-height]": '"inherit"'
      }
    }]
  }], null, null);
})();
var NzTransButtonModule = class _NzTransButtonModule {
  static ɵfac = function NzTransButtonModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTransButtonModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _NzTransButtonModule,
    imports: [NzTransButtonDirective],
    exports: [NzTransButtonDirective]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTransButtonModule, [{
    type: NgModule,
    args: [{
      imports: [NzTransButtonDirective],
      exports: [NzTransButtonDirective]
    }]
  }], null, null);
})();

// node_modules/.pnpm/ng-zorro-antd@20.4.4_5c87d87af9ed56c9ef0fa0020dfa9f57/node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-tooltip.mjs
var _c0 = ["overlay"];
function NzTooltipComponent_ng_template_0_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.nzTitle);
  }
}
function NzTooltipComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 2);
    ɵɵelement(1, "div", 3);
    ɵɵelementStart(2, "div", 4)(3, "div", 5);
    ɵɵtemplate(4, NzTooltipComponent_ng_template_0_ng_container_4_Template, 2, 1, "ng-container", 6);
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵstyleMap(ctx_r1.nzOverlayStyle);
    ɵɵclassMap(ctx_r1._classMap);
    ɵɵclassProp("ant-tooltip-rtl", ctx_r1.dir === "rtl");
    ɵɵproperty("@.disabled", !!(ctx_r1.noAnimation == null ? null : ctx_r1.noAnimation.nzNoAnimation))("nzNoAnimation", ctx_r1.noAnimation == null ? null : ctx_r1.noAnimation.nzNoAnimation)("@zoomBigMotion", "active");
    ɵɵadvance();
    ɵɵstyleMap(ctx_r1._arrowStyleMap);
    ɵɵadvance(2);
    ɵɵstyleMap(ctx_r1._contentStyleMap);
    ɵɵadvance();
    ɵɵproperty("nzStringTemplateOutlet", ctx_r1.nzTitle)("nzStringTemplateOutletContext", ctx_r1.nzTitleContext);
  }
}
var NzTooltipBaseDirective = class _NzTooltipBaseDirective {
  componentType;
  config;
  cdkConnectedOverlayPush;
  visibleChange = new EventEmitter();
  /**
   * This true title that would be used in other parts on this component.
   */
  get _title() {
    return this.title || this.directiveTitle || null;
  }
  get _content() {
    return this.content || this.directiveContent || null;
  }
  get _trigger() {
    return typeof this.trigger !== "undefined" ? this.trigger : "hover";
  }
  get _placement() {
    const p = this.placement;
    return Array.isArray(p) && p.length > 0 ? p : typeof p === "string" && p ? [p] : ["top"];
  }
  get _visible() {
    return (typeof this.visible !== "undefined" ? this.visible : this.internalVisible) || false;
  }
  get _mouseEnterDelay() {
    return this.mouseEnterDelay || 0.15;
  }
  get _mouseLeaveDelay() {
    return this.mouseLeaveDelay || 0.1;
  }
  get _overlayClassName() {
    return this.overlayClassName || null;
  }
  get _overlayStyle() {
    return this.overlayStyle || null;
  }
  get _overlayClickable() {
    return this.overlayClickable ?? true;
  }
  internalVisible = false;
  getProxyPropertyMap() {
    return {
      noAnimation: ["noAnimation", () => !!this.noAnimation]
    };
  }
  component;
  destroy$ = new Subject();
  triggerDisposables = [];
  delayTimer;
  elementRef = inject(ElementRef);
  hostView = inject(ViewContainerRef);
  renderer = inject(Renderer2);
  noAnimation = inject(NzNoAnimationDirective, {
    host: true,
    optional: true
  });
  nzConfigService = inject(NzConfigService);
  destroyRef = inject(DestroyRef);
  platformId = inject(PLATFORM_ID);
  constructor(componentType) {
    this.componentType = componentType;
    this.destroyRef.onDestroy(() => {
      this.clearTogglingTimer();
      this.removeTriggerListeners();
    });
  }
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.createComponent();
      this.registerTriggers();
    }
  }
  ngOnChanges(changes) {
    const {
      trigger
    } = changes;
    if (trigger && !trigger.isFirstChange()) {
      this.registerTriggers();
    }
    if (this.component) {
      this.updatePropertiesByChanges(changes);
    }
  }
  show() {
    this.component?.show();
  }
  hide() {
    this.component?.hide();
  }
  /**
   * Force the component to update its position.
   */
  updatePosition() {
    if (this.component) {
      this.component.updatePosition();
    }
  }
  /**
   * Create a dynamic tooltip component. This method can be overridden.
   */
  createComponent() {
    const componentRef = this.hostView.createComponent(this.componentType);
    this.component = componentRef.instance;
    this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), componentRef.location.nativeElement);
    this.component.setOverlayOrigin(this.origin || this.elementRef);
    this.initProperties();
    const visibleChange$ = this.component.nzVisibleChange.pipe(distinctUntilChanged());
    visibleChange$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((visible) => {
      this.internalVisible = visible;
      this.visibleChange.emit(visible);
    });
    visibleChange$.pipe(filter((visible) => visible), delay(0, asapScheduler), filter(() => Boolean(this.component?.overlay?.overlayRef)), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.component?.updatePosition();
    });
  }
  registerTriggers() {
    const el = this.elementRef.nativeElement;
    const trigger = this.trigger;
    this.removeTriggerListeners();
    if (trigger === "hover") {
      let overlayElement;
      this.triggerDisposables.push(this.renderer.listen(el, "mouseenter", () => {
        this.delayEnterLeave(true, true, this._mouseEnterDelay);
      }));
      this.triggerDisposables.push(this.renderer.listen(el, "mouseleave", () => {
        this.delayEnterLeave(true, false, this._mouseLeaveDelay);
        if (this.component?.overlay.overlayRef && !overlayElement) {
          overlayElement = this.component.overlay.overlayRef.overlayElement;
          this.triggerDisposables.push(this.renderer.listen(overlayElement, "mouseenter", () => {
            this.delayEnterLeave(false, true, this._mouseEnterDelay);
          }));
          this.triggerDisposables.push(this.renderer.listen(overlayElement, "mouseleave", () => {
            this.delayEnterLeave(false, false, this._mouseLeaveDelay);
          }));
        }
      }));
    } else if (trigger === "focus") {
      this.triggerDisposables.push(this.renderer.listen(el, "focusin", () => this.show()));
      this.triggerDisposables.push(this.renderer.listen(el, "focusout", () => this.hide()));
    } else if (trigger === "click") {
      this.triggerDisposables.push(this.renderer.listen(el, "click", (e) => {
        e.preventDefault();
        this.show();
      }));
    }
  }
  updatePropertiesByChanges(changes) {
    this.updatePropertiesByKeys(Object.keys(changes));
  }
  updatePropertiesByKeys(keys) {
    const mappingProperties = __spreadValues({
      // common mappings
      title: ["nzTitle", () => this._title],
      directiveTitle: ["nzTitle", () => this._title],
      content: ["nzContent", () => this._content],
      directiveContent: ["nzContent", () => this._content],
      trigger: ["nzTrigger", () => this._trigger],
      placement: ["nzPlacement", () => this._placement],
      visible: ["nzVisible", () => this._visible],
      mouseEnterDelay: ["nzMouseEnterDelay", () => this._mouseEnterDelay],
      mouseLeaveDelay: ["nzMouseLeaveDelay", () => this._mouseLeaveDelay],
      overlayClassName: ["nzOverlayClassName", () => this._overlayClassName],
      overlayStyle: ["nzOverlayStyle", () => this._overlayStyle],
      overlayClickable: ["nzOverlayClickable", () => this._overlayClickable],
      arrowPointAtCenter: ["nzArrowPointAtCenter", () => this.arrowPointAtCenter],
      cdkConnectedOverlayPush: ["cdkConnectedOverlayPush", () => this.cdkConnectedOverlayPush]
    }, this.getProxyPropertyMap());
    (keys || Object.keys(mappingProperties).filter((key) => !key.startsWith("directive"))).forEach((property) => {
      if (mappingProperties[property]) {
        const [name, valueFn] = mappingProperties[property];
        this.updateComponentValue(name, valueFn());
      }
    });
    this.component?.updateByDirective();
  }
  initProperties() {
    this.updatePropertiesByKeys();
  }
  updateComponentValue(key, value) {
    if (typeof value !== "undefined") {
      this.component[key] = value;
    }
  }
  delayEnterLeave(isOrigin, isEnter, delay2 = -1) {
    if (this.delayTimer) {
      this.clearTogglingTimer();
    } else if (delay2 > 0) {
      this.delayTimer = setTimeout(() => {
        this.delayTimer = void 0;
        isEnter ? this.show() : this.hide();
      }, delay2 * 1e3);
    } else {
      isEnter && isOrigin ? this.show() : this.hide();
    }
  }
  removeTriggerListeners() {
    this.triggerDisposables.forEach((dispose) => dispose());
    this.triggerDisposables.length = 0;
  }
  clearTogglingTimer() {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = void 0;
    }
  }
  static ɵfac = function NzTooltipBaseDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTooltipBaseDirective)(ɵɵdirectiveInject(Type));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _NzTooltipBaseDirective,
    features: [ɵɵNgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTooltipBaseDirective, [{
    type: Directive
  }], () => [{
    type: Type
  }], null);
})();
var NzTooltipBaseComponent = class _NzTooltipBaseComponent {
  overlay;
  noAnimation = inject(NzNoAnimationDirective, {
    host: true,
    optional: true
  });
  directionality = inject(Directionality);
  cdr = inject(ChangeDetectorRef);
  elementRef = inject(ElementRef);
  destroyRef = inject(DestroyRef);
  nzTitle = null;
  nzContent = null;
  nzArrowPointAtCenter = false;
  nzOverlayClassName;
  nzOverlayStyle = {};
  nzOverlayClickable = true;
  nzBackdrop = false;
  nzMouseEnterDelay;
  nzMouseLeaveDelay;
  cdkConnectedOverlayPush = true;
  nzVisibleChange = new Subject();
  set nzVisible(value) {
    const visible = toBoolean(value);
    if (this._visible !== visible) {
      this._visible = visible;
      this.nzVisibleChange.next(visible);
    }
  }
  get nzVisible() {
    return this._visible;
  }
  _visible = false;
  set nzTrigger(value) {
    this._trigger = value;
  }
  get nzTrigger() {
    return this._trigger;
  }
  _trigger = "hover";
  set nzPlacement(value) {
    const preferredPosition = value.map((placement) => setConnectedPositionOffset(POSITION_MAP[placement], TOOLTIP_OFFSET_MAP[placement]));
    this._positions = [...preferredPosition, ...DEFAULT_TOOLTIP_POSITIONS];
  }
  preferredPlacement = "top";
  origin;
  dir = "ltr";
  _classMap = {};
  _prefix = "ant-tooltip";
  _positions = [...DEFAULT_TOOLTIP_POSITIONS];
  constructor() {
    this.destroyRef.onDestroy(() => {
      this.nzVisibleChange.complete();
    });
  }
  ngOnInit() {
    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
    this.dir = this.directionality.value;
  }
  show() {
    if (this.nzVisible) {
      return;
    }
    if (!this.isEmpty()) {
      this.nzVisible = true;
      this.nzVisibleChange.next(true);
      this.cdr.detectChanges();
    }
    if (this.origin && this.overlay && this.overlay.overlayRef && this.overlay.overlayRef.getDirection() === "rtl") {
      this.overlay.overlayRef.setDirection("ltr");
    }
  }
  hide() {
    if (!this.nzVisible) {
      return;
    }
    this.nzVisible = false;
    this.nzVisibleChange.next(false);
    this.cdr.detectChanges();
  }
  updateByDirective() {
    this.updateStyles();
    this.cdr.detectChanges();
    Promise.resolve().then(() => {
      this.updatePosition();
      this.updateVisibilityByTitle();
    });
  }
  /**
   * Force the component to update its position.
   */
  updatePosition() {
    if (this.origin && this.overlay && this.overlay.overlayRef) {
      this.overlay.overlayRef.updatePosition();
    }
  }
  onPositionChange(position) {
    this.preferredPlacement = getPlacementName(position);
    this.updateStyles();
    this.cdr.detectChanges();
  }
  setOverlayOrigin(origin) {
    this.origin = origin;
    this.cdr.markForCheck();
  }
  onClickOutside(event) {
    if (!this.nzOverlayClickable) {
      return;
    }
    const target = _getEventTarget(event);
    if (!this.origin.nativeElement.contains(target) && this.nzTrigger !== null) {
      this.hide();
    }
  }
  /**
   * Hide the component while the content is empty.
   */
  updateVisibilityByTitle() {
    if (this.isEmpty()) {
      this.hide();
    }
  }
  updateStyles() {
    this._classMap = __spreadProps(__spreadValues({}, this.transformClassListToMap(this.nzOverlayClassName)), {
      [`${this._prefix}-placement-${this.preferredPlacement}`]: true
    });
  }
  transformClassListToMap(klass) {
    const result = {};
    const classes = klass !== null ? klass.split(/\s+/) : [];
    classes.forEach((className) => result[className] = true);
    return result;
  }
  static ɵfac = function NzTooltipBaseComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTooltipBaseComponent)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _NzTooltipBaseComponent,
    viewQuery: function NzTooltipBaseComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.overlay = _t.first);
      }
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTooltipBaseComponent, [{
    type: Directive
  }], () => [], {
    overlay: [{
      type: ViewChild,
      args: ["overlay", {
        static: false
      }]
    }]
  });
})();
function isTooltipEmpty(value) {
  return value instanceof TemplateRef ? false : value === "" || !isNotNil(value);
}
var NzTooltipDirective = class _NzTooltipDirective extends NzTooltipBaseDirective {
  /* eslint-disable @angular-eslint/no-input-rename, @angular-eslint/no-output-rename */
  title;
  titleContext = null;
  directiveTitle;
  trigger = "hover";
  placement = "top";
  origin;
  visible;
  mouseEnterDelay;
  mouseLeaveDelay;
  overlayClassName;
  overlayStyle;
  arrowPointAtCenter;
  cdkConnectedOverlayPush = true;
  nzTooltipColor;
  directiveContent = null;
  content = null;
  overlayClickable;
  visibleChange = new EventEmitter();
  constructor() {
    super(NzTooltipComponent);
  }
  getProxyPropertyMap() {
    return __spreadProps(__spreadValues({}, super.getProxyPropertyMap()), {
      nzTooltipColor: ["nzColor", () => this.nzTooltipColor],
      titleContext: ["nzTitleContext", () => this.titleContext]
    });
  }
  static ɵfac = function NzTooltipDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTooltipDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _NzTooltipDirective,
    selectors: [["", "nz-tooltip", ""]],
    hostVars: 2,
    hostBindings: function NzTooltipDirective_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("ant-tooltip-open", ctx.visible);
      }
    },
    inputs: {
      title: [0, "nzTooltipTitle", "title"],
      titleContext: [0, "nzTooltipTitleContext", "titleContext"],
      directiveTitle: [0, "nz-tooltip", "directiveTitle"],
      trigger: [0, "nzTooltipTrigger", "trigger"],
      placement: [0, "nzTooltipPlacement", "placement"],
      origin: [0, "nzTooltipOrigin", "origin"],
      visible: [0, "nzTooltipVisible", "visible"],
      mouseEnterDelay: [0, "nzTooltipMouseEnterDelay", "mouseEnterDelay"],
      mouseLeaveDelay: [0, "nzTooltipMouseLeaveDelay", "mouseLeaveDelay"],
      overlayClassName: [0, "nzTooltipOverlayClassName", "overlayClassName"],
      overlayStyle: [0, "nzTooltipOverlayStyle", "overlayStyle"],
      arrowPointAtCenter: [2, "nzTooltipArrowPointAtCenter", "arrowPointAtCenter", booleanAttribute],
      cdkConnectedOverlayPush: [2, "cdkConnectedOverlayPush", "cdkConnectedOverlayPush", booleanAttribute],
      nzTooltipColor: "nzTooltipColor"
    },
    outputs: {
      visibleChange: "nzTooltipVisibleChange"
    },
    exportAs: ["nzTooltip"],
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTooltipDirective, [{
    type: Directive,
    args: [{
      selector: "[nz-tooltip]",
      exportAs: "nzTooltip",
      host: {
        "[class.ant-tooltip-open]": "visible"
      }
    }]
  }], () => [], {
    title: [{
      type: Input,
      args: ["nzTooltipTitle"]
    }],
    titleContext: [{
      type: Input,
      args: ["nzTooltipTitleContext"]
    }],
    directiveTitle: [{
      type: Input,
      args: ["nz-tooltip"]
    }],
    trigger: [{
      type: Input,
      args: ["nzTooltipTrigger"]
    }],
    placement: [{
      type: Input,
      args: ["nzTooltipPlacement"]
    }],
    origin: [{
      type: Input,
      args: ["nzTooltipOrigin"]
    }],
    visible: [{
      type: Input,
      args: ["nzTooltipVisible"]
    }],
    mouseEnterDelay: [{
      type: Input,
      args: ["nzTooltipMouseEnterDelay"]
    }],
    mouseLeaveDelay: [{
      type: Input,
      args: ["nzTooltipMouseLeaveDelay"]
    }],
    overlayClassName: [{
      type: Input,
      args: ["nzTooltipOverlayClassName"]
    }],
    overlayStyle: [{
      type: Input,
      args: ["nzTooltipOverlayStyle"]
    }],
    arrowPointAtCenter: [{
      type: Input,
      args: [{
        alias: "nzTooltipArrowPointAtCenter",
        transform: booleanAttribute
      }]
    }],
    cdkConnectedOverlayPush: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzTooltipColor: [{
      type: Input
    }],
    visibleChange: [{
      type: Output,
      args: ["nzTooltipVisibleChange"]
    }]
  });
})();
var NzTooltipComponent = class _NzTooltipComponent extends NzTooltipBaseComponent {
  nzTitle = null;
  nzTitleContext = null;
  nzColor;
  _arrowStyleMap = {};
  _contentStyleMap = {};
  isEmpty() {
    return isTooltipEmpty(this.nzTitle);
  }
  updateStyles() {
    const isColorPreset = this.nzColor && isPresetColor(this.nzColor);
    this._classMap = __spreadProps(__spreadValues({}, this.transformClassListToMap(this.nzOverlayClassName)), {
      [`${this._prefix}-placement-${this.preferredPlacement}`]: true,
      [`${this._prefix}-${this.nzColor}`]: isColorPreset
    });
    this._contentStyleMap = {
      backgroundColor: !!this.nzColor && !isColorPreset ? this.nzColor : null
    };
    this._arrowStyleMap = {
      "--antd-arrow-background-color": !!this.nzColor && !isColorPreset ? this.nzColor : null
    };
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵNzTooltipComponent_BaseFactory;
    return function NzTooltipComponent_Factory(__ngFactoryType__) {
      return (ɵNzTooltipComponent_BaseFactory || (ɵNzTooltipComponent_BaseFactory = ɵɵgetInheritedFactory(_NzTooltipComponent)))(__ngFactoryType__ || _NzTooltipComponent);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _NzTooltipComponent,
    selectors: [["nz-tooltip"]],
    exportAs: ["nzTooltipComponent"],
    features: [ɵɵInheritDefinitionFeature],
    decls: 2,
    vars: 5,
    consts: [["overlay", "cdkConnectedOverlay"], ["cdkConnectedOverlay", "", "nzConnectedOverlay", "", 3, "overlayOutsideClick", "detach", "positionChange", "cdkConnectedOverlayOrigin", "cdkConnectedOverlayOpen", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPush", "nzArrowPointAtCenter"], [1, "ant-tooltip", 3, "nzNoAnimation"], [1, "ant-tooltip-arrow"], [1, "ant-tooltip-content"], [1, "ant-tooltip-inner"], [4, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"]],
    template: function NzTooltipComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = ɵɵgetCurrentView();
        ɵɵtemplate(0, NzTooltipComponent_ng_template_0_Template, 5, 15, "ng-template", 1, 0, ɵɵtemplateRefExtractor);
        ɵɵlistener("overlayOutsideClick", function NzTooltipComponent_Template_ng_template_overlayOutsideClick_0_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onClickOutside($event));
        })("detach", function NzTooltipComponent_Template_ng_template_detach_0_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.hide());
        })("positionChange", function NzTooltipComponent_Template_ng_template_positionChange_0_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onPositionChange($event));
        });
      }
      if (rf & 2) {
        ɵɵproperty("cdkConnectedOverlayOrigin", ctx.origin)("cdkConnectedOverlayOpen", ctx._visible)("cdkConnectedOverlayPositions", ctx._positions)("cdkConnectedOverlayPush", ctx.cdkConnectedOverlayPush)("nzArrowPointAtCenter", ctx.nzArrowPointAtCenter);
      }
    },
    dependencies: [OverlayModule, CdkConnectedOverlay, NzNoAnimationDirective, NzOutletModule, NzStringTemplateOutletDirective, NzOverlayModule, NzConnectedOverlayDirective],
    encapsulation: 2,
    data: {
      animation: [zoomBigMotion]
    },
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTooltipComponent, [{
    type: Component,
    args: [{
      selector: "nz-tooltip",
      exportAs: "nzTooltipComponent",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      // todo: currently the animation will cause small shake for the arrow (< 1px) when the tooltip is shown
      animations: [zoomBigMotion],
      template: `
    <ng-template
      #overlay="cdkConnectedOverlay"
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="_visible"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayPush]="cdkConnectedOverlayPush"
      [nzArrowPointAtCenter]="nzArrowPointAtCenter"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
    >
      <div
        class="ant-tooltip"
        [class.ant-tooltip-rtl]="dir === 'rtl'"
        [class]="_classMap"
        [style]="nzOverlayStyle"
        [@.disabled]="!!noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="ant-tooltip-arrow" [style]="_arrowStyleMap"></div>
        <div class="ant-tooltip-content">
          <div class="ant-tooltip-inner" [style]="_contentStyleMap">
            <ng-container *nzStringTemplateOutlet="nzTitle; context: nzTitleContext">{{ nzTitle }}</ng-container>
          </div>
        </div>
      </div>
    </ng-template>
  `,
      imports: [OverlayModule, NzNoAnimationDirective, NzOutletModule, NzOverlayModule]
    }]
  }], null, null);
})();
var NzTooltipModule = class _NzTooltipModule {
  static ɵfac = function NzTooltipModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTooltipModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _NzTooltipModule,
    imports: [NzTooltipComponent, NzTooltipDirective],
    exports: [NzTooltipComponent, NzTooltipDirective]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [NzTooltipComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTooltipModule, [{
    type: NgModule,
    args: [{
      imports: [NzTooltipComponent, NzTooltipDirective],
      exports: [NzTooltipComponent, NzTooltipDirective]
    }]
  }], null, null);
})();

// node_modules/.pnpm/ng-zorro-antd@20.4.4_5c87d87af9ed56c9ef0fa0020dfa9f57/node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-typography.mjs
function NzTextCopyComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "nz-icon", 2);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const icon_r1 = ctx.$implicit;
    ɵɵadvance();
    ɵɵproperty("nzType", icon_r1);
  }
}
var _c02 = ["textarea"];
function NzTextEditComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "textarea", 2, 0);
    ɵɵlistener("blur", function NzTextEditComponent_Conditional_0_Template_textarea_blur_0_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.confirm());
    });
    ɵɵelementEnd();
    ɵɵelementStart(2, "button", 3);
    ɵɵlistener("click", function NzTextEditComponent_Conditional_0_Template_button_click_2_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.confirm());
    });
    ɵɵelement(3, "nz-icon", 4);
    ɵɵelementEnd();
  }
}
function NzTextEditComponent_Conditional_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "nz-icon", 7);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const icon_r4 = ctx.$implicit;
    ɵɵadvance();
    ɵɵproperty("nzType", icon_r4);
  }
}
function NzTextEditComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 5);
    ɵɵlistener("click", function NzTextEditComponent_Conditional_1_Template_button_click_0_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onClick());
    });
    ɵɵtemplate(1, NzTextEditComponent_Conditional_1_ng_container_1_Template, 2, 1, "ng-container", 6);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("nzTooltipTitle", ctx_r1.tooltip === null ? null : ctx_r1.tooltip || (ctx_r1.locale == null ? null : ctx_r1.locale.edit));
    ɵɵadvance();
    ɵɵproperty("nzStringTemplateOutlet", ctx_r1.icon);
  }
}
var _c1 = ["ellipsisContainer"];
var _c2 = ["expandable"];
var _c3 = ["contentTemplate"];
var _c4 = ["*"];
var _c5 = (a0) => ({
  content: a0
});
function NzTypographyComponent_ng_template_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
  }
}
function NzTypographyComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, NzTypographyComponent_ng_template_0_Conditional_0_Template, 1, 0);
    ɵɵtext(1);
  }
  if (rf & 2) {
    const content_r1 = ctx.content;
    ɵɵconditional(!content_r1 ? 0 : -1);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", content_r1, " ");
  }
}
function NzTypographyComponent_Conditional_2_Conditional_0_ng_template_0_Template(rf, ctx) {
}
function NzTypographyComponent_Conditional_2_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵtextInterpolate1(" ", ctx_r1.nzSuffix, " ");
  }
}
function NzTypographyComponent_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, NzTypographyComponent_Conditional_2_Conditional_0_ng_template_0_Template, 0, 0, "ng-template", 5);
    ɵɵconditionalCreate(1, NzTypographyComponent_Conditional_2_Conditional_0_Conditional_1_Template, 1, 1);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    const contentTemplate_r3 = ɵɵreference(1);
    ɵɵproperty("ngTemplateOutlet", contentTemplate_r3)("ngTemplateOutletContext", ɵɵpureFunction1(3, _c5, ctx_r1.nzContent));
    ɵɵadvance();
    ɵɵconditional(ctx_r1.nzSuffix ? 1 : -1);
  }
}
function NzTypographyComponent_Conditional_2_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵtextInterpolate1(" ", ctx_r1.ellipsisStr, " ");
  }
}
function NzTypographyComponent_Conditional_2_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵtextInterpolate1(" ", ctx_r1.nzSuffix, " ");
  }
}
function NzTypographyComponent_Conditional_2_Conditional_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 7, 2);
    ɵɵlistener("click", function NzTypographyComponent_Conditional_2_Conditional_1_Conditional_4_Template_a_click_0_listener() {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.onExpand());
    });
    ɵɵtext(2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance(2);
    ɵɵtextInterpolate1(" ", ctx_r1.locale == null ? null : ctx_r1.locale.expand, " ");
  }
}
function NzTypographyComponent_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", null, 1);
    ɵɵconditionalCreate(2, NzTypographyComponent_Conditional_2_Conditional_1_Conditional_2_Template, 1, 1);
    ɵɵconditionalCreate(3, NzTypographyComponent_Conditional_2_Conditional_1_Conditional_3_Template, 1, 1);
    ɵɵconditionalCreate(4, NzTypographyComponent_Conditional_2_Conditional_1_Conditional_4_Template, 3, 1, "a", 6);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance(2);
    ɵɵconditional(ctx_r1.isEllipsis ? 2 : -1);
    ɵɵadvance();
    ɵɵconditional(ctx_r1.nzSuffix ? 3 : -1);
    ɵɵadvance();
    ɵɵconditional(ctx_r1.nzExpandable && ctx_r1.isEllipsis ? 4 : -1);
  }
}
function NzTypographyComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, NzTypographyComponent_Conditional_2_Conditional_0_Template, 2, 5)(1, NzTypographyComponent_Conditional_2_Conditional_1_Template, 5, 3);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵconditional(ctx_r1.expanded || !ctx_r1.hasOperationsWithEllipsis && ctx_r1.nzEllipsisRows === 1 && !ctx_r1.hasEllipsisObservers || ctx_r1.canCssEllipsis || ctx_r1.nzSuffix && ctx_r1.expanded ? 0 : 1);
  }
}
function NzTypographyComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "nz-text-edit", 8);
    ɵɵlistener("endEditing", function NzTypographyComponent_Conditional_3_Template_nz_text_edit_endEditing_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onEndEditing($event));
    })("startEditing", function NzTypographyComponent_Conditional_3_Template_nz_text_edit_startEditing_0_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onStartEditing());
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("text", ctx_r1.nzContent)("icon", ctx_r1.nzEditIcon)("tooltip", ctx_r1.nzEditTooltip);
  }
}
function NzTypographyComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "nz-text-copy", 9);
    ɵɵlistener("textCopy", function NzTypographyComponent_Conditional_4_Template_nz_text_copy_textCopy_0_listener($event) {
      ɵɵrestoreView(_r6);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onTextCopy($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("text", ctx_r1.copyText)("tooltips", ctx_r1.nzCopyTooltips)("icons", ctx_r1.nzCopyIcons);
  }
}
var NzTextCopyComponent = class _NzTextCopyComponent {
  cdr = inject(ChangeDetectorRef);
  clipboard = inject(Clipboard);
  i18n = inject(NzI18nService);
  destroyRef = inject(DestroyRef);
  copied = false;
  copyId;
  locale;
  nativeElement = inject(ElementRef).nativeElement;
  copyTooltip = null;
  copedTooltip = null;
  copyIcon = "copy";
  copedIcon = "check";
  text;
  tooltips;
  icons = ["copy", "check"];
  textCopy = new EventEmitter();
  constructor() {
    this.destroyRef.onDestroy(() => {
      clearTimeout(this.copyId);
    });
  }
  ngOnInit() {
    this.i18n.localeChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.locale = this.i18n.getLocaleData("Text");
      this.updateTooltips();
      this.cdr.markForCheck();
    });
  }
  ngOnChanges(changes) {
    const {
      tooltips,
      icons
    } = changes;
    if (tooltips) {
      this.updateTooltips();
    }
    if (icons) {
      this.updateIcons();
    }
  }
  onClick() {
    if (this.copied) {
      return;
    }
    this.copied = true;
    this.cdr.detectChanges();
    const text = this.text;
    this.textCopy.emit(text);
    this.clipboard.copy(text);
    this.onCopied();
  }
  onCopied() {
    clearTimeout(this.copyId);
    this.copyId = setTimeout(() => {
      this.copied = false;
      this.cdr.detectChanges();
    }, 3e3);
  }
  updateTooltips() {
    if (this.tooltips === null) {
      this.copedTooltip = null;
      this.copyTooltip = null;
    } else if (Array.isArray(this.tooltips)) {
      const [copyTooltip, copedTooltip] = this.tooltips;
      this.copyTooltip = copyTooltip || this.locale?.copy;
      this.copedTooltip = copedTooltip || this.locale?.copied;
    } else {
      this.copyTooltip = this.locale?.copy;
      this.copedTooltip = this.locale?.copied;
    }
    this.cdr.markForCheck();
  }
  updateIcons() {
    const [copyIcon, copedIcon] = this.icons;
    this.copyIcon = copyIcon;
    this.copedIcon = copedIcon;
    this.cdr.markForCheck();
  }
  static ɵfac = function NzTextCopyComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTextCopyComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzTextCopyComponent,
    selectors: [["nz-text-copy"]],
    inputs: {
      text: "text",
      tooltips: "tooltips",
      icons: "icons"
    },
    outputs: {
      textCopy: "textCopy"
    },
    exportAs: ["nzTextCopy"],
    features: [ɵɵNgOnChangesFeature],
    decls: 2,
    vars: 4,
    consts: [["type", "button", "nz-tooltip", "", "nz-trans-button", "", 1, "ant-typography-copy", 3, "click", "nzTooltipTitle"], [4, "nzStringTemplateOutlet"], [3, "nzType"]],
    template: function NzTextCopyComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "button", 0);
        ɵɵlistener("click", function NzTextCopyComponent_Template_button_click_0_listener() {
          return ctx.onClick();
        });
        ɵɵtemplate(1, NzTextCopyComponent_ng_container_1_Template, 2, 1, "ng-container", 1);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵclassProp("ant-typography-copy-success", ctx.copied);
        ɵɵproperty("nzTooltipTitle", ctx.copied ? ctx.copedTooltip : ctx.copyTooltip);
        ɵɵadvance();
        ɵɵproperty("nzStringTemplateOutlet", ctx.copied ? ctx.copedIcon : ctx.copyIcon);
      }
    },
    dependencies: [NzTooltipModule, NzTooltipDirective, NzTransButtonModule, NzTransButtonDirective, NzIconModule, NzIconDirective, NzOutletModule, NzStringTemplateOutletDirective],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTextCopyComponent, [{
    type: Component,
    args: [{
      selector: "nz-text-copy",
      exportAs: "nzTextCopy",
      template: `
    <button
      type="button"
      nz-tooltip
      nz-trans-button
      [nzTooltipTitle]="copied ? copedTooltip : copyTooltip"
      class="ant-typography-copy"
      [class.ant-typography-copy-success]="copied"
      (click)="onClick()"
    >
      <ng-container *nzStringTemplateOutlet="copied ? copedIcon : copyIcon; let icon">
        <nz-icon [nzType]="icon" />
      </ng-container>
    </button>
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [NzTooltipModule, NzTransButtonModule, NzIconModule, NzOutletModule]
    }]
  }], () => [], {
    text: [{
      type: Input
    }],
    tooltips: [{
      type: Input
    }],
    icons: [{
      type: Input
    }],
    textCopy: [{
      type: Output
    }]
  });
})();
var NzTextEditComponent = class _NzTextEditComponent {
  ngZone = inject(NgZone);
  cdr = inject(ChangeDetectorRef);
  i18n = inject(NzI18nService);
  destroyRef = inject(DestroyRef);
  editing = false;
  locale;
  text;
  icon = "edit";
  tooltip;
  startEditing = new EventEmitter();
  endEditing = new EventEmitter(true);
  set textarea(textarea) {
    this.textarea$.next(textarea);
  }
  autosizeDirective;
  beforeText;
  currentText;
  nativeElement = inject(ElementRef).nativeElement;
  // We could've saved the textarea within some private property (e.g. `_textarea`) and have a getter,
  // but having subject makes the code more reactive and cancellable (e.g., event listeners will be
  // automatically removed and re-added through the `switchMap` below).
  textarea$ = new BehaviorSubject(null);
  injector = inject(Injector);
  ngOnInit() {
    this.i18n.localeChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.locale = this.i18n.getLocaleData("Text");
      this.cdr.markForCheck();
    });
    this.textarea$.pipe(switchMap((textarea) => fromEventOutsideAngular(textarea?.nativeElement, "keydown")), takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (event.keyCode !== ESCAPE && event.keyCode !== ENTER) {
        return;
      }
      this.ngZone.run(() => {
        if (event.keyCode === ESCAPE) {
          this.onCancel();
        } else {
          this.onEnter(event);
        }
        this.cdr.markForCheck();
      });
    });
    this.textarea$.pipe(switchMap((textarea) => fromEventOutsideAngular(textarea?.nativeElement, "input")), takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      this.currentText = event.target.value;
    });
  }
  onClick() {
    this.beforeText = this.text;
    this.currentText = this.beforeText;
    this.editing = true;
    this.startEditing.emit();
    this.focusAndSetValue();
  }
  confirm() {
    this.editing = false;
    this.endEditing.emit(this.currentText);
  }
  onEnter(event) {
    event.stopPropagation();
    event.preventDefault();
    this.confirm();
  }
  onCancel() {
    this.currentText = this.beforeText;
    this.confirm();
  }
  focusAndSetValue() {
    const {
      injector
    } = this;
    afterNextRender(() => {
      this.textarea$.pipe(
        // It may still not be available, so we need to wait until view queries
        // are executed during the change detection. It's safer to wait until
        // the query runs, and the textarea is set on the behavior subject.
        first((textarea) => textarea != null),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe((textarea) => {
        textarea.nativeElement.focus();
        textarea.nativeElement.value = this.currentText || "";
        this.autosizeDirective.resizeToFitContent();
        this.cdr.markForCheck();
      });
    }, {
      injector
    });
  }
  static ɵfac = function NzTextEditComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTextEditComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzTextEditComponent,
    selectors: [["nz-text-edit"]],
    viewQuery: function NzTextEditComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c02, 5);
        ɵɵviewQuery(NzAutosizeDirective, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.textarea = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.autosizeDirective = _t.first);
      }
    },
    inputs: {
      text: "text",
      icon: "icon",
      tooltip: "tooltip"
    },
    outputs: {
      startEditing: "startEditing",
      endEditing: "endEditing"
    },
    exportAs: ["nzTextEdit"],
    decls: 2,
    vars: 1,
    consts: [["textarea", ""], ["nz-tooltip", "", "nz-trans-button", "", 1, "ant-typography-edit", 3, "nzTooltipTitle"], ["nz-input", "", "nzAutosize", "", 3, "blur"], ["nz-trans-button", "", 1, "ant-typography-edit-content-confirm", 3, "click"], ["nzType", "enter"], ["nz-tooltip", "", "nz-trans-button", "", 1, "ant-typography-edit", 3, "click", "nzTooltipTitle"], [4, "nzStringTemplateOutlet"], [3, "nzType"]],
    template: function NzTextEditComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵconditionalCreate(0, NzTextEditComponent_Conditional_0_Template, 4, 0)(1, NzTextEditComponent_Conditional_1_Template, 2, 2, "button", 1);
      }
      if (rf & 2) {
        ɵɵconditional(ctx.editing ? 0 : 1);
      }
    },
    dependencies: [NzInputModule, NzInputDirective, NzAutosizeDirective, NzTransButtonModule, NzTransButtonDirective, NzIconModule, NzIconDirective, NzTooltipModule, NzTooltipDirective, NzOutletModule, NzStringTemplateOutletDirective],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTextEditComponent, [{
    type: Component,
    args: [{
      selector: "nz-text-edit",
      exportAs: "nzTextEdit",
      template: `
    @if (editing) {
      <textarea #textarea nz-input nzAutosize (blur)="confirm()"></textarea>
      <button nz-trans-button class="ant-typography-edit-content-confirm" (click)="confirm()">
        <nz-icon nzType="enter" />
      </button>
    } @else {
      <button
        nz-tooltip
        nz-trans-button
        class="ant-typography-edit"
        [nzTooltipTitle]="tooltip === null ? null : tooltip || locale?.edit"
        (click)="onClick()"
      >
        <ng-container *nzStringTemplateOutlet="icon; let icon">
          <nz-icon [nzType]="icon" />
        </ng-container>
      </button>
    }
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [NzInputModule, NzTransButtonModule, NzIconModule, NzTooltipModule, NzOutletModule]
    }]
  }], null, {
    text: [{
      type: Input
    }],
    icon: [{
      type: Input
    }],
    tooltip: [{
      type: Input
    }],
    startEditing: [{
      type: Output
    }],
    endEditing: [{
      type: Output
    }],
    textarea: [{
      type: ViewChild,
      args: ["textarea", {
        static: false
      }]
    }],
    autosizeDirective: [{
      type: ViewChild,
      args: [NzAutosizeDirective, {
        static: false
      }]
    }]
  });
})();
var NZ_CONFIG_MODULE_NAME = "typography";
var EXPAND_ELEMENT_CLASSNAME = "ant-typography-expand";
var NzTypographyComponent = (() => {
  var _a;
  let _nzCopyTooltips_decorators;
  let _nzCopyTooltips_initializers = [];
  let _nzCopyTooltips_extraInitializers = [];
  let _nzCopyIcons_decorators;
  let _nzCopyIcons_initializers = [];
  let _nzCopyIcons_extraInitializers = [];
  let _nzEditTooltip_decorators;
  let _nzEditTooltip_initializers = [];
  let _nzEditTooltip_extraInitializers = [];
  let _nzEditIcon_decorators;
  let _nzEditIcon_initializers = [];
  let _nzEditIcon_extraInitializers = [];
  let _nzEllipsisRows_decorators;
  let _nzEllipsisRows_initializers = [];
  let _nzEllipsisRows_extraInitializers = [];
  return _a = class {
    _nzModuleName = NZ_CONFIG_MODULE_NAME;
    nzConfigService = inject(NzConfigService);
    el = inject(ElementRef).nativeElement;
    cdr = inject(ChangeDetectorRef);
    viewContainerRef = inject(ViewContainerRef);
    renderer = inject(Renderer2);
    platform = inject(Platform);
    i18n = inject(NzI18nService);
    resizeService = inject(NzResizeService);
    directionality = inject(Directionality);
    document = inject(DOCUMENT);
    destroyRef = inject(DestroyRef);
    nzCopyable = false;
    nzEditable = false;
    nzDisabled = false;
    nzExpandable = false;
    nzEllipsis = false;
    nzCopyTooltips = __runInitializers(this, _nzCopyTooltips_initializers, void 0);
    nzCopyIcons = (__runInitializers(this, _nzCopyTooltips_extraInitializers), __runInitializers(this, _nzCopyIcons_initializers, ["copy", "check"]));
    nzEditTooltip = (__runInitializers(this, _nzCopyIcons_extraInitializers), __runInitializers(this, _nzEditTooltip_initializers, void 0));
    nzEditIcon = (__runInitializers(this, _nzEditTooltip_extraInitializers), __runInitializers(this, _nzEditIcon_initializers, "edit"));
    nzContent = __runInitializers(this, _nzEditIcon_extraInitializers);
    nzEllipsisRows = __runInitializers(this, _nzEllipsisRows_initializers, 1);
    nzType = __runInitializers(this, _nzEllipsisRows_extraInitializers);
    nzCopyText;
    nzSuffix;
    nzContentChange = new EventEmitter();
    nzCopy = new EventEmitter();
    nzExpandChange = new EventEmitter();
    // This is not a two-way binding output with {@link nzEllipsis}
    nzOnEllipsis = new EventEmitter();
    textEditRef;
    textCopyRef;
    ellipsisContainer;
    expandableBtn;
    contentTemplate;
    locale;
    expandableBtnElementCache = null;
    editing = false;
    ellipsisText;
    cssEllipsis = false;
    isEllipsis = true;
    expanded = false;
    ellipsisStr = "...";
    dir = "ltr";
    get hasEllipsisObservers() {
      return this.nzOnEllipsis.observers.length > 0;
    }
    get canCssEllipsis() {
      return this.nzEllipsis && this.cssEllipsis && !this.expanded && !this.hasEllipsisObservers;
    }
    get hasOperationsWithEllipsis() {
      return (this.nzCopyable || this.nzEditable || this.nzExpandable) && this.nzEllipsis;
    }
    viewInit = false;
    requestId = -1;
    windowResizeSubscription = Subscription.EMPTY;
    get copyText() {
      return typeof this.nzCopyText === "string" ? this.nzCopyText : this.nzContent;
    }
    constructor() {
      this.destroyRef.onDestroy(() => {
        this.expandableBtnElementCache = null;
        this.windowResizeSubscription.unsubscribe();
      });
    }
    onTextCopy(text) {
      this.nzCopy.emit(text);
    }
    onStartEditing() {
      this.editing = true;
    }
    onEndEditing(text) {
      this.editing = false;
      this.nzContentChange.emit(text);
      if (this.nzContent === text) {
        this.renderOnNextFrame();
      }
      this.cdr.markForCheck();
    }
    onExpand() {
      this.isEllipsis = false;
      this.expanded = true;
      this.nzExpandChange.emit();
      this.nzOnEllipsis.emit(false);
    }
    canUseCSSEllipsis() {
      if (this.nzEditable || this.nzCopyable || this.nzExpandable || this.nzSuffix) {
        return false;
      }
      if (this.hasEllipsisObservers) {
        return false;
      }
      if (this.nzEllipsisRows === 1) {
        return isStyleSupport("textOverflow");
      } else {
        return isStyleSupport("webkitLineClamp");
      }
    }
    renderOnNextFrame() {
      cancelAnimationFrame(this.requestId);
      if (!this.viewInit || !this.nzEllipsis || this.nzEllipsisRows < 0 || this.expanded || !this.platform.isBrowser) {
        return;
      }
      this.requestId = requestAnimationFrame(() => this.syncEllipsis());
    }
    getOriginContentViewRef() {
      const viewRef = this.viewContainerRef.createEmbeddedView(this.contentTemplate, {
        content: this.nzContent
      });
      viewRef.detectChanges();
      return {
        viewRef,
        removeView: () => this.viewContainerRef.remove(this.viewContainerRef.indexOf(viewRef))
      };
    }
    syncEllipsis() {
      if (this.cssEllipsis) {
        return;
      }
      const {
        viewRef,
        removeView
      } = this.getOriginContentViewRef();
      const fixedNodes = [this.textCopyRef, this.textEditRef].filter((e) => e && e.nativeElement).map((e) => e.nativeElement);
      const expandableBtnElement = this.getExpandableBtnElement();
      if (expandableBtnElement) {
        fixedNodes.push(expandableBtnElement);
      }
      const {
        contentNodes,
        text,
        ellipsis
      } = measure(this.el, this.nzEllipsisRows, viewRef.rootNodes, fixedNodes, this.ellipsisStr, this.nzSuffix);
      removeView();
      this.ellipsisText = text;
      if (ellipsis !== this.isEllipsis) {
        this.isEllipsis = ellipsis;
        this.nzOnEllipsis.emit(ellipsis);
      }
      const ellipsisContainerNativeElement = this.ellipsisContainer.nativeElement;
      while (ellipsisContainerNativeElement.firstChild) {
        this.renderer.removeChild(ellipsisContainerNativeElement, ellipsisContainerNativeElement.firstChild);
      }
      contentNodes.forEach((n) => {
        this.renderer.appendChild(ellipsisContainerNativeElement, n.cloneNode(true));
      });
      this.cdr.markForCheck();
    }
    // Need to create the element for calculation size before view init
    getExpandableBtnElement() {
      if (this.nzExpandable) {
        const expandText = this.locale ? this.locale.expand : "";
        const cache = this.expandableBtnElementCache;
        if (!cache || cache.innerText === expandText) {
          const el = this.document.createElement("a");
          el.className = EXPAND_ELEMENT_CLASSNAME;
          el.innerText = expandText;
          this.expandableBtnElementCache = el;
        }
        return this.expandableBtnElementCache;
      } else {
        this.expandableBtnElementCache = null;
        return null;
      }
    }
    renderAndSubscribeWindowResize() {
      if (this.platform.isBrowser) {
        this.windowResizeSubscription.unsubscribe();
        this.cssEllipsis = this.canUseCSSEllipsis();
        this.renderOnNextFrame();
        this.windowResizeSubscription = this.resizeService.connect().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.renderOnNextFrame());
      }
    }
    ngOnInit() {
      this.i18n.localeChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.locale = this.i18n.getLocaleData("Text");
        this.cdr.markForCheck();
      });
      this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
        this.dir = direction;
        this.cdr.detectChanges();
      });
      this.dir = this.directionality.value;
    }
    ngAfterViewInit() {
      this.viewInit = true;
      this.renderAndSubscribeWindowResize();
    }
    ngOnChanges(changes) {
      const {
        nzCopyable,
        nzEditable,
        nzExpandable,
        nzEllipsis,
        nzContent,
        nzEllipsisRows,
        nzSuffix
      } = changes;
      if (nzCopyable || nzEditable || nzExpandable || nzEllipsis || nzContent || nzEllipsisRows || nzSuffix) {
        if (this.nzEllipsis) {
          if (this.expanded) {
            this.windowResizeSubscription.unsubscribe();
          } else {
            this.renderAndSubscribeWindowResize();
          }
        }
      }
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzCopyTooltips_decorators = [WithConfig()];
    _nzCopyIcons_decorators = [WithConfig()];
    _nzEditTooltip_decorators = [WithConfig()];
    _nzEditIcon_decorators = [WithConfig()];
    _nzEllipsisRows_decorators = [WithConfig()];
    __esDecorate(null, null, _nzCopyTooltips_decorators, {
      kind: "field",
      name: "nzCopyTooltips",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzCopyTooltips" in obj,
        get: (obj) => obj.nzCopyTooltips,
        set: (obj, value) => {
          obj.nzCopyTooltips = value;
        }
      },
      metadata: _metadata
    }, _nzCopyTooltips_initializers, _nzCopyTooltips_extraInitializers);
    __esDecorate(null, null, _nzCopyIcons_decorators, {
      kind: "field",
      name: "nzCopyIcons",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzCopyIcons" in obj,
        get: (obj) => obj.nzCopyIcons,
        set: (obj, value) => {
          obj.nzCopyIcons = value;
        }
      },
      metadata: _metadata
    }, _nzCopyIcons_initializers, _nzCopyIcons_extraInitializers);
    __esDecorate(null, null, _nzEditTooltip_decorators, {
      kind: "field",
      name: "nzEditTooltip",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzEditTooltip" in obj,
        get: (obj) => obj.nzEditTooltip,
        set: (obj, value) => {
          obj.nzEditTooltip = value;
        }
      },
      metadata: _metadata
    }, _nzEditTooltip_initializers, _nzEditTooltip_extraInitializers);
    __esDecorate(null, null, _nzEditIcon_decorators, {
      kind: "field",
      name: "nzEditIcon",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzEditIcon" in obj,
        get: (obj) => obj.nzEditIcon,
        set: (obj, value) => {
          obj.nzEditIcon = value;
        }
      },
      metadata: _metadata
    }, _nzEditIcon_initializers, _nzEditIcon_extraInitializers);
    __esDecorate(null, null, _nzEllipsisRows_decorators, {
      kind: "field",
      name: "nzEllipsisRows",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzEllipsisRows" in obj,
        get: (obj) => obj.nzEllipsisRows,
        set: (obj, value) => {
          obj.nzEllipsisRows = value;
        }
      },
      metadata: _metadata
    }, _nzEllipsisRows_initializers, _nzEllipsisRows_extraInitializers);
    if (_metadata) Object.defineProperty(_a, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_a, "ɵfac", function NzTypographyComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "ɵcmp", ɵɵdefineComponent({
    type: _a,
    selectors: [["nz-typography"], ["", "nz-typography", ""], ["p", "nz-paragraph", ""], ["span", "nz-text", ""], ["h1", "nz-title", ""], ["h2", "nz-title", ""], ["h3", "nz-title", ""], ["h4", "nz-title", ""]],
    viewQuery: function NzTypographyComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(NzTextEditComponent, 5);
        ɵɵviewQuery(NzTextCopyComponent, 5);
        ɵɵviewQuery(_c1, 5);
        ɵɵviewQuery(_c2, 5);
        ɵɵviewQuery(_c3, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.textEditRef = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.textCopyRef = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.ellipsisContainer = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.expandableBtn = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.contentTemplate = _t.first);
      }
    },
    hostVars: 26,
    hostBindings: function NzTypographyComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵstyleProp("-webkit-line-clamp", ctx.canCssEllipsis && ctx.nzEllipsisRows > 1 ? ctx.nzEllipsisRows : null);
        ɵɵclassProp("ant-typography", !ctx.editing)("ant-typography-rtl", ctx.dir === "rtl")("ant-typography-edit-content", ctx.editing)("ant-typography-secondary", ctx.nzType === "secondary")("ant-typography-warning", ctx.nzType === "warning")("ant-typography-danger", ctx.nzType === "danger")("ant-typography-success", ctx.nzType === "success")("ant-typography-disabled", ctx.nzDisabled)("ant-typography-ellipsis", ctx.nzEllipsis && !ctx.expanded)("ant-typography-single-line", ctx.nzEllipsis && ctx.nzEllipsisRows === 1)("ant-typography-ellipsis-single-line", ctx.canCssEllipsis && ctx.nzEllipsisRows === 1)("ant-typography-ellipsis-multiple-line", ctx.canCssEllipsis && ctx.nzEllipsisRows > 1);
      }
    },
    inputs: {
      nzCopyable: [2, "nzCopyable", "nzCopyable", booleanAttribute],
      nzEditable: [2, "nzEditable", "nzEditable", booleanAttribute],
      nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
      nzExpandable: [2, "nzExpandable", "nzExpandable", booleanAttribute],
      nzEllipsis: [2, "nzEllipsis", "nzEllipsis", booleanAttribute],
      nzCopyTooltips: "nzCopyTooltips",
      nzCopyIcons: "nzCopyIcons",
      nzEditTooltip: "nzEditTooltip",
      nzEditIcon: "nzEditIcon",
      nzContent: "nzContent",
      nzEllipsisRows: [2, "nzEllipsisRows", "nzEllipsisRows", numberAttribute],
      nzType: "nzType",
      nzCopyText: "nzCopyText",
      nzSuffix: "nzSuffix"
    },
    outputs: {
      nzContentChange: "nzContentChange",
      nzCopy: "nzCopy",
      nzExpandChange: "nzExpandChange",
      nzOnEllipsis: "nzOnEllipsis"
    },
    exportAs: ["nzTypography"],
    features: [ɵɵNgOnChangesFeature],
    ngContentSelectors: _c4,
    decls: 5,
    vars: 3,
    consts: [["contentTemplate", ""], ["ellipsisContainer", ""], ["expandable", ""], [3, "text", "icon", "tooltip"], [3, "text", "tooltips", "icons"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "ant-typography-expand"], [1, "ant-typography-expand", 3, "click"], [3, "endEditing", "startEditing", "text", "icon", "tooltip"], [3, "textCopy", "text", "tooltips", "icons"]],
    template: function NzTypographyComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵtemplate(0, NzTypographyComponent_ng_template_0_Template, 2, 2, "ng-template", null, 0, ɵɵtemplateRefExtractor);
        ɵɵconditionalCreate(2, NzTypographyComponent_Conditional_2_Template, 2, 1);
        ɵɵconditionalCreate(3, NzTypographyComponent_Conditional_3_Template, 1, 3, "nz-text-edit", 3);
        ɵɵconditionalCreate(4, NzTypographyComponent_Conditional_4_Template, 1, 3, "nz-text-copy", 4);
      }
      if (rf & 2) {
        ɵɵadvance(2);
        ɵɵconditional(!ctx.editing ? 2 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.nzEditable ? 3 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.nzCopyable && !ctx.editing ? 4 : -1);
      }
    },
    dependencies: [NgTemplateOutlet, NzTextEditComponent, NzTextCopyComponent],
    encapsulation: 2,
    changeDetection: 0
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTypographyComponent, [{
    type: Component,
    args: [{
      selector: `
  nz-typography,
  [nz-typography],
  p[nz-paragraph],
  span[nz-text],
  h1[nz-title], h2[nz-title], h3[nz-title], h4[nz-title]
  `,
      exportAs: "nzTypography",
      template: `
    <ng-template #contentTemplate let-content="content">
      @if (!content) {
        <ng-content></ng-content>
      }
      {{ content }}
    </ng-template>
    @if (!editing) {
      @if (
        expanded ||
        (!hasOperationsWithEllipsis && nzEllipsisRows === 1 && !hasEllipsisObservers) ||
        canCssEllipsis ||
        (nzSuffix && expanded)
      ) {
        <ng-template
          [ngTemplateOutlet]="contentTemplate"
          [ngTemplateOutletContext]="{ content: nzContent }"
        ></ng-template>
        @if (nzSuffix) {
          {{ nzSuffix }}
        }
      } @else {
        <span #ellipsisContainer></span>
        @if (isEllipsis) {
          {{ ellipsisStr }}
        }
        @if (nzSuffix) {
          {{ nzSuffix }}
        }
        @if (nzExpandable && isEllipsis) {
          <a #expandable class="ant-typography-expand" (click)="onExpand()">
            {{ locale?.expand }}
          </a>
        }
      }
    }

    @if (nzEditable) {
      <nz-text-edit
        [text]="nzContent"
        [icon]="nzEditIcon"
        [tooltip]="nzEditTooltip"
        (endEditing)="onEndEditing($event)"
        (startEditing)="onStartEditing()"
      ></nz-text-edit>
    }

    @if (nzCopyable && !editing) {
      <nz-text-copy
        [text]="copyText"
        [tooltips]="nzCopyTooltips"
        [icons]="nzCopyIcons"
        (textCopy)="onTextCopy($event)"
      ></nz-text-copy>
    }
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "[class.ant-typography]": "!editing",
        "[class.ant-typography-rtl]": 'dir === "rtl"',
        "[class.ant-typography-edit-content]": "editing",
        "[class.ant-typography-secondary]": 'nzType === "secondary"',
        "[class.ant-typography-warning]": 'nzType === "warning"',
        "[class.ant-typography-danger]": 'nzType === "danger"',
        "[class.ant-typography-success]": 'nzType === "success"',
        "[class.ant-typography-disabled]": "nzDisabled",
        "[class.ant-typography-ellipsis]": "nzEllipsis && !expanded",
        "[class.ant-typography-single-line]": "nzEllipsis && nzEllipsisRows === 1",
        "[class.ant-typography-ellipsis-single-line]": "canCssEllipsis && nzEllipsisRows === 1",
        "[class.ant-typography-ellipsis-multiple-line]": "canCssEllipsis && nzEllipsisRows > 1",
        "[style.-webkit-line-clamp]": "(canCssEllipsis && nzEllipsisRows > 1) ? nzEllipsisRows : null"
      },
      imports: [NgTemplateOutlet, NzTextEditComponent, NzTextCopyComponent]
    }]
  }], () => [], {
    nzCopyable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzEditable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzExpandable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzEllipsis: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzCopyTooltips: [{
      type: Input
    }],
    nzCopyIcons: [{
      type: Input
    }],
    nzEditTooltip: [{
      type: Input
    }],
    nzEditIcon: [{
      type: Input
    }],
    nzContent: [{
      type: Input
    }],
    nzEllipsisRows: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzType: [{
      type: Input
    }],
    nzCopyText: [{
      type: Input
    }],
    nzSuffix: [{
      type: Input
    }],
    nzContentChange: [{
      type: Output
    }],
    nzCopy: [{
      type: Output
    }],
    nzExpandChange: [{
      type: Output
    }],
    nzOnEllipsis: [{
      type: Output
    }],
    textEditRef: [{
      type: ViewChild,
      args: [NzTextEditComponent, {
        static: false
      }]
    }],
    textCopyRef: [{
      type: ViewChild,
      args: [NzTextCopyComponent, {
        static: false
      }]
    }],
    ellipsisContainer: [{
      type: ViewChild,
      args: ["ellipsisContainer", {
        static: false
      }]
    }],
    expandableBtn: [{
      type: ViewChild,
      args: ["expandable", {
        static: false
      }]
    }],
    contentTemplate: [{
      type: ViewChild,
      args: ["contentTemplate", {
        static: false
      }]
    }]
  });
})();
var NzTypographyModule = class _NzTypographyModule {
  static ɵfac = function NzTypographyModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTypographyModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _NzTypographyModule,
    imports: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent],
    exports: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTypographyModule, [{
    type: NgModule,
    args: [{
      imports: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent],
      exports: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent]
    }]
  }], null, null);
})();
export {
  NzTextCopyComponent,
  NzTextEditComponent,
  NzTypographyComponent,
  NzTypographyModule
};
//# sourceMappingURL=ng-zorro-antd_typography.js.map
