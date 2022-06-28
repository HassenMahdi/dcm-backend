import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@app/core/notifications/notification.service';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  token: string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: LoginService,
              private not: NotificationService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.token = params.token;
    });
  }

  updatePw(pw: string): void {
    this.service.updatePw(pw, this.token).subscribe((res: any) => {
      if (res.status === 'success') {
        this.not.success('Your password has been successfully reset.');
        this.router.navigate(['/login']);
      }
    });
  }

  login(): void {
    this.router.navigate(['/login']);
  }

}
