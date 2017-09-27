import { isUndefined } from 'util';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

import { ErrorMessageComponent } from '../shared/error-message/error-message.component';
import { ErrorMessageService } from '../shared/error-message.service';
import { ContainerStateService  } from '../shared/container-state.service';

// https://stackoverflow.com/questions/36527605/how-to-style-child-components-from-parent-components-css-file
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [],
})
export class ProjectsComponent implements OnInit, AfterViewInit, OnDestroy {

  viewsMap = {
    '/projects': 'Project',
    '/works': 'Work',
    '/units': 'Unit'
  }

  @ViewChild(ErrorMessageComponent)
  private errorMessageComponent: ErrorMessageComponent;

  private isDetailHidden: boolean;
  private listTitle: string;
  private detailTitle: string;

  private currentView: any;
  private subscriptions: Subscription[] = [];

  constructor(
    private location: Location,
    private messageService: ErrorMessageService,
    private containerState: ContainerStateService,
    ) { };

  ngOnInit() {
    this.setCurrentView(this.location);
    this.detailTitle = 'Detail title';
    this.listTitle = 'List title';

    this.subscribeMessages();
    this.subscribeContainerState()
    this.containerState.hideDetail();

    if (this.currentView === 'Work') {
      this.containerState.showDetail();
    }
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngAfterViewInit() {
    setTimeout(0);
  }

  subscribeContainerState(): void {
    let subscription: Subscription;

    subscription = this.containerState.isDetailHidden.subscribe(
      isDetailHidden => { this.isDetailHidden = isDetailHidden; } );

    this.subscriptions.push(subscription);
  }

  subscribeMessages(): void {
    let subscription: Subscription;

    subscription = this.messageService.getMessage().subscribe(message => {
      if (!(isUndefined(message.text))) {
        this.detailTitle = message.text;
        console.log('ErrorMessageService: ' + JSON.stringify(message.text));
      }

      if (!(isUndefined(message.error))) {
        this.errorMessageComponent.setErrorMessage(message.error);
        console.log('ErrorMessageService: ' + JSON.stringify(message.error));
      }

      if (!(isUndefined(message.success))) {
        this.errorMessageComponent.setSuccessMessage(message.success);
        console.log('ErrorMessageService: ' + JSON.stringify(message.success));
      }
    }
    )

    this.subscriptions.push(subscription);
  }

  setCurrentView(location: Location): void {
    let path: any;
    const pathParts = this.location.path().split(';');
    if (pathParts.length > 1) {
      path = pathParts[0];
    } else {
      path = this.location.path();
    }
    this.currentView = this.viewsMap[path];
  }

  onDetailTitleChanged(event): void {
    // this.detailTitle = event;
  }

  onListTitleChanged(event): void {
    // this.listTitle = event;
  }

}
