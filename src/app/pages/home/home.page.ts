import { Component, ViewChild } from '@angular/core';
import {  IonAccordionGroup, IonIcon,IonLabel, AlertController, IonItem, IonAccordion, IonList, IonContent, IonTitle, IonToolbar, IonHeader } from '@ionic/angular/standalone';
import { Category } from '../../model/category';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Hier hinzufügen
import { map } from 'rxjs';
import { RecipeListComponent } from 'src/app/recipe-list/recipe-list.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, RecipeListComponent, IonIcon, IonLabel, IonItem, IonAccordionGroup, IonAccordion, IonList, IonContent, IonTitle, IonHeader, IonToolbar],
})
export class HomeComponent {
  @ViewChild('accordionGroup', { static: true }) accordionGroup!: IonAccordionGroup;

  categories: Category[] = [];
  openAccordion: string=''; // Array zur Speicherung der geöffneten Akkordeons
  isLoading: boolean = true;

  constructor(private recipeService: RecipeService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
  }

  ionViewWillLeave() {
    this.saveAccordionState();    
    const nativeEl = this.accordionGroup;
    nativeEl.value = undefined;
  }

  ionViewWillEnter() {
    this.reloadData();
  }

  saveAccordionState() {
    if (this.accordionGroup && typeof this.accordionGroup?.value === 'string') {
      this.openAccordion = this.accordionGroup?.value;
    } else {
      this.openAccordion = '';
    }
    console.log('save state:',  this.openAccordion);
  }

  restoreAccordionState() {
    const nativeEl = this.accordionGroup;
    nativeEl.value = this.openAccordion;
   
    console.log('restore state:',  this.accordionGroup?.value);

  }

  reloadData() {
    this.recipeService.getCategories()
      .pipe(
        map(data=>{
          this.categories = data;
          this.isLoading = false;
          return this.categories;
        }), 
        map(data=>{
          console.log('reset start');
          setTimeout(()=>this.restoreAccordionState(),100);
        })     
      )
      .subscribe();
  }
}
