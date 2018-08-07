import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'catfilter'
})
export class CatfilterPipe implements PipeTransform {

  transform(value: any, category: any): any {
    if(value.length==0||category=="")
    return value;
    var resArray:any=[];
    for(const item of value){
      if(item.category==category){
        resArray.push(item);
      }
    }
    return resArray;
  }

}
