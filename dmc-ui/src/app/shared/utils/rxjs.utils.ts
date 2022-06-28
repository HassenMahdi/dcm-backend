import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

export function withValue(o: Observable<any>, cb, err=null){
    o.pipe(take(1)).subscribe((value)=>cb(value), (error)=>err(error))
}