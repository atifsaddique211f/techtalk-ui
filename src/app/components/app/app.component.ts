import {Component, OnInit} from '@angular/core';
import {HttpApiService} from "../../services/http-api.service";
import {Endpoints} from "../../services/endpoints.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  private searching: boolean = false;
  private searchFailed: boolean = false;

  constructor(private http: HttpApiService) {
  }

  ngOnInit(): void {

  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(100)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.http.get(Endpoints.getTypeAheadUrl(term))
          .do(() => this.searchFailed = false)
          .catch(() => {
            this.searchFailed = true;
            return Observable.of([]);
          }))
      .do(() => this.searching = false);
}
