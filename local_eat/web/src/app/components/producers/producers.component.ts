import { Component } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Producer } from 'src/app/models/producer.model';
import { ProducersService } from 'src/app/services/producers.service';
import { Unsub } from 'src/app/utils/unsub';

@Component({
  selector: 'app-producers',
  templateUrl: './producers.component.html',
  styleUrls: ['./producers.component.scss']
})
export class ProducersComponent {
}
