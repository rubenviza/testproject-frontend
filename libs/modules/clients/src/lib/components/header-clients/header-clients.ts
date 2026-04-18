import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { listColor } from '../../constants/list-color';
import { Client } from '../../models/client';

@Component({
  selector: 'lib-header-clients',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './header-clients.html',
})
export class HeaderClientsComponent {
  public readonly title = input.required<string>();

  public readonly listColor = input(listColor.purple);

  public readonly clients = input([] as Client[]);

  public readonly loading = input(true);
}
