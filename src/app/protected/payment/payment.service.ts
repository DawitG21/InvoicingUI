import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HttpService } from 'src/app/providers/http.service';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ProtectedService } from '../protected.service';
import { BaseService } from 'src/app/shared/base.service';
import { ResourceEndpointService } from 'src/app/endpoints/resource-endpoint.service';

import { Payment } from 'src/app/models/payment.model ';
import { PaymentNew } from 'src/app/models/payment-new.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseService {
  httpOptions: any;

  constructor(
    private resEndpoint: ResourceEndpointService,
    private http: HttpService,
    private authService: AuthService,
    private protectedService: ProtectedService
  ) {
    super();
    this.httpOptions = this.protectedService.getHttpOptions(this.authService.authorizationHeaderValue);
  }

  get(id: string): Observable<Payment> {
    return this.http.get(this.resEndpoint.PaymentByIDUri(id), this.httpOptions)
      .pipe(map((response: any) => response), catchError(this.handleError));
  }

  create(newPayment: PaymentNew): Observable<Payment> {
    return this.http.post(this.resEndpoint.PaymentUri, newPayment, this.httpOptions)
      .pipe(map((response: any) => response), catchError(this.handleError));
  }

  void(id: string): Observable<any> {
    return this.http.delete(this.resEndpoint.PaymentByIDUri(id), this.httpOptions)
      .pipe(map((response: any) => response), catchError(this.handleError));
  }

}
