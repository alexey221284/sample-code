import { Component } from '@angular/core';
import { TemplateService } from '@domains/template';
import { TemplateHeader } from '@domains/template/models';
import { TemplateSearchParams } from '@domains/template/models/template-filter.model';
import { ConfirmationDialogService, TemplateDetailsService } from '@shared/dialog';
import { IconRegistry } from '@shared/icon';
import {
  mixinArchiveItem,
  mixinFilterArchived,
  mixinPagination,
  mixinShowDetails,
} from '@shared/mixins';
import { mixinTemplateList } from '@shared/mixins/can-template-list';
import { mixinAutoUnsubscribe, mixinHandleActions } from '@shared/mixins/elementary';
import { mix } from '@shared/mixins/elementary/mix.util';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { svgDelete } from 'src/assets/ts';

class Base {
  readonly storageKey = 'templateListPageSize';

  constructor(
    public readonly detailsService: TemplateDetailsService,
    public readonly archivingConfirmationService: ConfirmationDialogService,
    public readonly templateService: TemplateService,
  ) {}

  getSearchParams(query: string): TemplateSearchParams {
    return { name: query };
  }
}

const MixinBase = mix(Base, [
  mixinAutoUnsubscribe,
  mixinHandleActions,
  mixinShowDetails,
  mixinArchiveItem,
  mixinFilterArchived,
  mixinTemplateList,
  mixinPagination,
]);

@Component({
  templateUrl: 'templates-list.component.html',
  styleUrls: ['templates-list.component.scss'],
})
export class TemplatesComponent extends MixinBase {
  public readonly templateName: Observable<TemplateHeader['name'][]>;

  constructor(
    detailsService: TemplateDetailsService,
    archivingConfirmationService: ConfirmationDialogService,
    templateService: TemplateService,
    private readonly iconRegistry: IconRegistry,
  ) {
    super(detailsService, archivingConfirmationService, templateService);
    this.iconRegistry.add([svgDelete]);
    this.templateName = this.getTemplateName();
  }

  private getTemplateName(): Observable<TemplateHeader['name'][]> {
    return this.templateService.getHeaders().pipe(map((templates) => templates.map(({ name }) => name)));
  }
}
