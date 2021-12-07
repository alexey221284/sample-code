import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { TemplateModule } from '@domains/template';
import { ColumnSorterModule } from '@shared/column-sorter';
import { TemplateDetailsService } from '@shared/dialog';
import { ConfirmationDialogModule } from '@shared/dialog/confirmation-dialog';
import { IconModule } from '@shared/icon';
import { NdcPipeModule } from '@shared/pipes/ndc';
import { SearchBarModule } from '@shared/search-bar';

import { TemplatesComponent } from './templates-list.component';
import { TemplatesTableComponent } from './templates-table/templates-table.component';

const routes: Routes = [{ path: '', component: TemplatesComponent, pathMatch: 'full' }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TemplateModule,
    MatDialogModule,
    NdcPipeModule,
    SearchBarModule,
    IconModule,
    ConfirmationDialogModule,
    ColumnSorterModule,
  ],
  declarations: [TemplatesComponent, TemplatesTableComponent],
  providers: [TemplateDetailsService],
})
export class TemplatesListModule {}
