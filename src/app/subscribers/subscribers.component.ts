import { Component } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent {

  subscribersArray: Array<{id:string, data:any}> = [];
  constructor(private subservice: SubscribersService)
  {

  }

  ngOnInit()
  {
    this.subservice.loadData().subscribe(val =>{
      this.subscribersArray = val;
    })
  }

  onDelete(id: string)
  {
    this.subservice.deleteData(id);
  }
}
