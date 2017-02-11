import {Component, OnInit} from '@angular/core';
import {HttpApiService} from "../../services/http-api.service";
import {Endpoints} from "../../services/endpoints.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  private results: Array<string> = [];

  constructor(private http: HttpApiService) {
  }

  ngOnInit(): void {

  }

  search(query: string) {
    this.http.get(Endpoints.getTypeAheadUrl(query))
      .subscribe(response => {
        this.results = response;
      })
  }
}
