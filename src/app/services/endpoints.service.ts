export class Endpoints {
  private static baseUrl: string = "http://localhost:8080/";

  public static getTypeAheadUrl(query: string) {
    return this.baseUrl + "api/v2/search/typeahead?query=" + query;
  }
}
