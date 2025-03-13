import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthGuardService } from '../../../guards/auth-guard.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {

  constructor(private authService: AuthGuardService, private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  @Input() set appHasRole(roles: string[]) {
    if (this.authService.hasRole(roles)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      return;
    }

    this.viewContainer.clear();
  }
}
