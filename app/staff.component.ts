import { Router }      from '@angular/router';
import { Component }   from '@angular/core';
import { APIServices } from './api.services';

@Component({
  selector: 'staff-container',
  providers: [APIServices],
  templateUrl: "html/modules/_staff_container.html",
})


export class StaffContainerComponent {
    constructor(private APIServices: APIServices, private router: Router) {}
}

