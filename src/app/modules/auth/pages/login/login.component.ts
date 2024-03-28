import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  submitForm() {
    this.submitted = true;
    if (this.form.valid) {

      this.authService.login(this.form.value.email, this.form.value.password).subscribe({
        next: (r) => {

          let user = {
            user: r.data.user,
            token_type: r.data.token_type,
            access_token: r.data.access_token
          };

          Swal.fire({
            title: 'Exito!',
            text: 'Sesion iniciada correctamente',
            icon: 'success'
          });

          this.authService.setUser(user)
          this.router.navigate(['/admin/dashboard']);
        },
        error: (e) => {

          Swal.fire({
            title: 'Ooops!',
            text: `${e.error.message}`,
            icon: 'error'
          });

        }
      });

    } else {

      Swal.fire({
        title: 'Ooops!',
        text: 'Llene los campos requeridos',
        icon: 'error'
      });

    }
  }
}
