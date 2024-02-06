import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { UpdatePaymentMethodComponent } from './update-payment-method/update-payment-method.component';
import { ConfirmDialogComponent } from '../app-dialog/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodGuard implements CanDeactivate<UpdatePaymentMethodComponent> {

  constructor(
    public dialog: MatDialog,
  ) { }

  public async canDeactivate(component: UpdatePaymentMethodComponent) {
    if (component.form.touched && component.form.dirty) {
      const dialogRef = this.getConfirmationDialog();
      let input = false;

      await dialogRef.afterClosed().toPromise()
        .then((result) => {
          if (result) {
            input = true;
          }
        });
      return input;
    } else {
      return true;
    }
  }

  public getConfirmationDialog() {
    return this.dialog.open(ConfirmDialogComponent, {
      data: {
        input: true,
        message: `There are unsaved changes. Are you sure you want to proceed?`,
      },
      width: '450px',
    });
  }
}
