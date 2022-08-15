import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { asyncScheduler, scheduled } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss'],
})
export class TestErrorComponent implements OnInit {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  get400Error() {
    return scheduled(
      this.http.get(this.baseUrl + 'buggy/badrequest'),
      asyncScheduler
    ).subscribe({
      next: (response) => console.log(response),
      error: (error: any) => console.log(error),
      complete: () => console.log('complete'),
    });
  }

  get400ValidationError() {
    return scheduled(
      this.http.get(this.baseUrl + 'products/fortytwo'),
      asyncScheduler
    ).subscribe({
      next: (response) => console.log(response),
      error: (error: any) => console.log(error),
      complete: () => console.log('complete'),
    });
  }

  get404Error() {
    return scheduled(
      this.http.get(this.baseUrl + 'buggy/notfound'),
      asyncScheduler
    ).subscribe({
      next: (response) => console.log(response),
      error: (error: any) => console.log(error),
      complete: () => console.log('complete'),
    });
  }

  get500Error() {
    return scheduled(
      this.http.get(this.baseUrl + 'buggy/servererror'),
      asyncScheduler
    ).subscribe({
      next: (response) => console.log(response),
      error: (error: any) => console.log(error),
      complete: () => console.log('complete'),
    });
  }
}
