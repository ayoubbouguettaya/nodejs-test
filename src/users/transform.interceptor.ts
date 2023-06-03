
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';


export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
   
    return next.
    handle()
    .pipe(map(
        data => {
            const shapedData = Array.isArray(data) ? data.map(item => this.ShapeData(item)): this.ShapeData(data) 
            return ({ data: shapedData })}));
  }

  private ShapeData (data: any) {
    const {password = "",firstName = "",lastName = "",birthDay= "",...rest} =data;

    return {
        ...rest,
        fullName: `${firstName} ${lastName}`,
        age: this.calculateAge(birthDay)
    }
  }

  private calculateAge(birthDay: string) {
    const birthDayYear = new Date(birthDay).getFullYear()
    const currentYear = new Date().getFullYear()
    return currentYear - birthDayYear
  }



}