import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './_services/auth.service';
import { CommonModule } from '@angular/common';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'diab-pred-ui';

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  is_user_loggedIn = false;

  constructor(private authService: AuthService, private userService: UserService) {

    this.authService.isLoggedIn$.subscribe(value => {

      if (value != null) {
        this.isLoggedIn = true;
        this.username = value.email
      }
      
    })

   }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.userService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.user.username;
    }
  }

  logout(): void {
    this.authService.removeItem(this.username)
    // this.authService.logout().subscribe({
    //   next: res => {
    //     console.log(res);
    //     // this.authService.clean();

    //     window.location.reload();
    //   },
    //   error: err => {
    //     console.log(err);
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.authService.isLoggedInSubject.unsubscribe()
  }

}
