import { Pipe, PipeTransform } from '@angular/core';
import { LocalstorageService } from '../services/localstorage.service';

@Pipe({
  name: 'localstorage',
  standalone: true
})
export class LocalstoragePipe implements PipeTransform {
  
  constructor(private localStorageService: LocalstorageService) {}

  transform(key: string) {
    return this.localStorageService.getItem(key);
  }

}
