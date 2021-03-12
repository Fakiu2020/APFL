import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterBase, PagedResult } from '../../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  baseApiUrl = environment.apiUrl + 'Quote/';

  constructor(private http: HttpClient) {}

  getAllPaged(filters: FilterBase) : Observable<PagedResult<any[]>>  {
    let params = new HttpParams();
    const paginatedResult: PagedResult<any[]> = new PagedResult<any[]>();
    params = params.append('page', filters.page.toString() );
    params = params.append('MaxResults', filters.pageSize.toString());
    params = params.append('criteria', filters.criteria.toString());
    return this.http.get(this.baseApiUrl + 'GetAllPaged/' , { observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.entity = response.body['Quotes'];
        paginatedResult.filters.totalItems = response.body['TotalItems'];
        return paginatedResult;
      }));
  }
  create(quote) {
    return this.http.post(this.baseApiUrl, quote);
  }
  getById(id): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + 'getById/' +  id);
  }
  
  update( quote) {
    return this.http.put(this.baseApiUrl, quote);
  }

  delete(quoteId){
    return this.http.delete(this.baseApiUrl + '/' + quoteId);

  }
}
