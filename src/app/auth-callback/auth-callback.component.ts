import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/authentication/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {
  error: boolean = false;

  constructor(
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  async ngOnInit() {

    // check for error
    if (this.route.snapshot.fragment!.indexOf('error') >= 0) {
      this.error = true;
      return;
    }

    await this.authService.completeAuthentication();
    this.router.navigate(['/protected']);
  }

}
