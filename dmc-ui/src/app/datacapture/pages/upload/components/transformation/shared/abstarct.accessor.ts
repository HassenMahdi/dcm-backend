import { forwardRef, Output, EventEmitter, Directive } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive()
export abstract class AbstractValueAccessor implements ControlValueAccessor {

    @Output() change = new EventEmitter<any>();

    _value: any = '';
    get value(): any { return this._value; };
    set value(v: any) {
      this.setValue(v)
    }

    setValue(v){
      if (v !== this._value) {
        this._value = v;
        this.onChange(v);
        this.change.emit(this._value)
      }
    }

    writeValue(value: any) {
      this._value = value;
      // warning: comment below if only want to emit on user intervention
      this.onChange(value);
    }

    onChange = (_) => {};
    onTouched = () => {};
    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}

export function MakeProvider(type: any) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true
  };
}
