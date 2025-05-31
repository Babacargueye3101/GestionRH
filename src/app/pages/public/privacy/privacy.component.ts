import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../../../services/header.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private headerService: HeaderService
  ) {}

  ngOnInit() {
    this.headerService.toggleHeaderVisibility(false);
  }

  ngOnDestroy() {
    this.headerService.toggleHeaderVisibility(true);
  }

  goToHome() {
    this.router.navigate(['/public']);
  }
}
