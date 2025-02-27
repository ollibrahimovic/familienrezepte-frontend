import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonTitle, IonSelect, IonSelectOption, IonItem, IonInput, IonTextarea, IonThumbnail, IonButtons, IonListHeader, IonToolbar, IonHeader, IonIcon, IonLabel, IonContent, IonAccordion, IonAccordionGroup, IonList, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, IonHeader, IonItem, IonLabel, IonList, IonListHeader, CommonModule, IonTitle, IonSelect, IonSelectOption, IonInput, IonTextarea, IonToolbar, IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonButtons, IonButton, IonIcon, RouterLink],
})
export class SearchComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
