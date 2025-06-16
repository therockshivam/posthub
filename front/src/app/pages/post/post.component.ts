import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { SkeletonModule } from 'primeng/skeleton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [ 
          ToolbarModule,
          ButtonModule,
          SplitButtonModule,
          MenuModule,
          PanelModule,
          IconFieldModule,
          InputIconModule,
          InputTextModule,
          SkeletonModule,
          ChipModule
          ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
   items: MenuItem[] = [
        {
            label: 'Save',
            icon: 'pi pi-check'
        },
        {
            label: 'Update',
            icon: 'pi pi-upload'
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash'
        },
        {
            label: 'Home Page',
            icon: 'pi pi-home'
        }
    ];
}
