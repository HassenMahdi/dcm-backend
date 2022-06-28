import {
  Component,
  Directive,
  ElementRef,
  Input,
  SimpleChange,
  HostListener,
  ChangeDetectorRef,
} from "@angular/core";
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import { NzTableComponent } from "ng-zorro-antd/table";

/**
 * 根据SimpleTable内部Top位置，自动计算Scroll.height，达到自动出内部滚动条的效果。
 * 例：<st #itemTable [data]="itemDataUrl" [columns]="columns" ncSimpleTableAutoScroll></st>
 * 注意 SimpleTable 要放置到Card或其他容器里。
 * 需要自定义偏移量时，可使用：<st ncSimpleTableAutoScroll="100"></st>
 */
@Directive({
  selector: "[nsAutoHeightTable]",
  host: {},
})
export class NsAutoHeightTableDirective {

  @Input("nsAutoHeightTable") offset: number;
  
  timeout = null

  constructor(
    private element: ElementRef,
    private table: NzTableComponent,
    private cd: ChangeDetectorRef
  ) {
    // 当前页码改变时自动回到顶部
    if (this.table && this.table.nzPageIndexChange) {
      this.table.nzPageIndexChange.subscribe((index) => {
        let tableBody = this.element.nativeElement.querySelector(
          ".ant-table-body"
        );
        if (tableBody && tableBody.scrollTop) {
          tableBody.scrollTop = 0;
        }
      });

      this.table.nzCurrentPageDataChange.subscribe(()=>this.doAutoSize())

      new ResizeSensor(this.element.nativeElement, () => this.doAutoSize());
    }
  }

  /**
   * 响应浏览器窗体大小变化
   * @param event
   */
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.doAutoSize();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.doAutoSize();
  }

  private doAutoSize() {
    if(this.timeout){
      clearTimeout(this.timeout)
    }

    this.timeout = setTimeout(() => {
      let offset = this.offset || 70;
      if (
        this.element &&
        this.element.nativeElement &&
        this.element.nativeElement.parentElement &&
        this.element.nativeElement.parentElement.offsetHeight
      ) {
        if (this.table && this.table.nzScroll && this.table.nzScroll.x) {
          let originNzScroll = this.table.nzScroll
            ? { ...this.table.nzScroll }
            : null;
          this.table.nzScroll = {
            y: this.calculateYaxis(),
            x: this.table.nzScroll.x,
          };
          this.table.ngOnChanges({
            nzScroll: new SimpleChange(
              { originNzScroll },
              this.table.nzScroll,
              false
            ),
          });
          this.cd.detectChanges();
        } else {
          let originNzScroll = this.table.nzScroll
            ? { ...this.table.nzScroll }
            : null;
            
          this.table.nzScroll = {
            y: this.calculateYaxis()
          };

          this.table.ngOnChanges({
            nzScroll: new SimpleChange(
              { originNzScroll },
              this.table.nzScroll,
              false
            ),
          });
          this.cd.detectChanges();
        }
      }
    }, 10);
  }

  calculateYaxis(){
    let offset = this.offset || 0;
    let parentHeight = this.element.nativeElement.parentElement.offsetHeight
    let relativeParentTopOffset = this.element.nativeElement.offsetTop
    let paginationOffset = 0
    let headerOffset = 0

    const paginator = this.element.nativeElement.querySelector('.ant-table-pagination')
    if(paginator)
    paginationOffset = paginator.offsetHeight

    const header = this.element.nativeElement.querySelector('.ant-table-header')
    if(header)
      headerOffset = header.offsetHeight

    const y =  (
      parentHeight
      - relativeParentTopOffset
      - paginationOffset 
      - headerOffset

      - offset
      // offset
    ).toString() + "px"


    return y
  }
}