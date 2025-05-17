import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from '../../services/facade.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('200ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in',
          style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class NavbarComponent {
  showProfileMenu: boolean = false;

  constructor(
    private router: Router,
    private facadeService: FacadeService
  ) {}

  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
  }

  viewProfile(): void {
    this.showProfileMenu = false;
    this.router.navigate(['/perfil']);
  }

  logout(): void {
    this.showProfileMenu = false;
    this.facadeService.logout().subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error al cerrar sesión:', error);
      }
    );
  }

  // Cerrar menú al hacer clic fuera
  onClickedOutside(): void {
    this.showProfileMenu = false;
  }
}
