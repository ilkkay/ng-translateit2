import { isUndefined } from 'util';
import { Component, OnInit, OnDestroy, AfterViewInit, AfterContentInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

import { ErrorMessageComponent } from '../shared/error-message/error-message.component';
import { ErrorMessageService } from '../shared/error-message.service';
import { ContainerStateService } from '../shared/container-state.service';

// https://juristr.com/blog/2016/01/learning-ng2-dynamic-styles/

// https://stackoverflow.com/questions/36527605/how-to-style-child-components-from-parent-components-css-file
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [],
})
export class ProjectsComponent implements OnInit, OnDestroy {

  leftColumn = 'col-md-12';
  rightColumn = 'col-md-5'; // in two column mode left is 7

  viewsMap = {
    '/projects': 'Project',
    '/works': 'Work',
    '/units': 'Unit'
  };

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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.setCurrentView(this.location);
    // this.setCurrentView2();
    this.detailTitle = 'Detail title';
    this.listTitle = 'List title';


    this.subscribeMessages();
    this.subscribeContainerState();
    this.containerState.hideDetail();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  subscribeContainerState(): void {
    let subscription: Subscription;

    subscription = this.containerState.isDetailHidden.subscribe(
      isDetailHidden => {
        this.isDetailHidden = isDetailHidden;
        if (this.isDetailHidden) {
          this.leftColumn = 'col-md-12';
        } else {
          this.leftColumn = 'col-md-7';
        }
      });

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
    );

    this.subscriptions.push(subscription);
  }

  setCurrentView2(): void {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(event => {
        let currentRoute = this.route.root;
        while (currentRoute.children[0] !== undefined) {
          currentRoute = currentRoute.children[0];
        }
        console.log(currentRoute.snapshot.data);
        const routeName: string = currentRoute.snapshot.data.name;
        this.currentView = this.viewsMap[routeName];
      });
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
