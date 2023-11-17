import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'
import {MatIconModule} from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  exports: [
    BrowserModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatPaginatorModule,
    MatTableModule,
  ]
})
export class MaterialModule { }
