import { Component, ViewChild } from '@angular/core';
import { IonItem, IonTitle, IonTab, IonTabButton, IonButtons, IonTabBar, IonTabs, IonToolbar, IonHeader, IonIcon, IonLabel, IonContent, IonAccordion, IonAccordionGroup, IonList, IonButton } from '@ionic/angular/standalone';
import { Category } from '../../model/category';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../model/recipe';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Hier hinzufügen
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs';
import { Share } from '@capacitor/share';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonButtons, IonTab, IonTabBar, IonTabButton, IonTabs, IonButton, IonTitle, IonToolbar, IonHeader, IonIcon,  IonItem, IonIcon, IonLabel, IonContent, IonList, IonAccordion, IonAccordionGroup, IonButton, RouterLink],
})
export class HomePage {
  @ViewChild('accordionGroup', { static: true }) accordionGroup!: IonAccordionGroup;

  categories: Category[] = [];
  openAccordion: string=''; // Array zur Speicherung der geöffneten Akkordeons

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

  async share(recipe:Recipe) {
    await Share.share({
      title: recipe?.title,
      text: 'Schau dir dieses Rezept von Familienrezepte an!',
      url: `${environment.frontend}/app/detail/${recipe?._id}`,
      dialogTitle: 'Rezept teilen',
    });
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
          return this.categories;
        }), 
        map(data=>{
          console.log('reset start');
          setTimeout(()=>this.restoreAccordionState(),100);
        })     
      )
      .subscribe();
  }

  async deleteRecipe(recipe: Recipe, category: Category) {
      const alert = await this.alertController.create({
        header: 'Rezept löschen',
        message: 'Wollen Sie das Rezept wirklich löschen?',
        buttons: [
          {
            text: 'Nein',
            role: 'cancel'
          },
          {
            text: 'Ja',
            handler: () => {
              category.recipes = category.recipes.filter((element) => {
                return element._id !== recipe._id;
              });;
              this.recipeService.deleteRecipe(recipe._id!).subscribe(updatedRecipe => {
                console.log(recipe.title,'wird gelöscht!');
              });             
            }
          }
        ]
      });
      await alert.present();
  }

  toggleFavorite(recipe: Recipe) {
    recipe.isFavorite = !recipe.isFavorite;
    this.recipeService.toggleFavorite(recipe._id!).subscribe(updatedRecipe => {
      recipe.isFavorite = updatedRecipe.isFavorite;
    });
  }
}
