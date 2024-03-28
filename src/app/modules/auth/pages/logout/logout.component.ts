import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.logout();
  }

  logout() {

    let user = JSON.parse(this.authService.getUser());

    this.authService.logout(user.access_token).subscribe({
      next: (r) => {

        Swal.fire({
          title: 'Exito!',
          text: 'Sesion finalizada correctamente',
          icon: 'success'
        });

        this.authService.deleteUser();
        this.router.navigate(['/auth/login']);
      },
      error: (e) => {

        Swal.fire({
          title: 'Ooops!',
          text: `${e.error.message}`,
          icon: 'error'
        });

      }
    });
  }
}
