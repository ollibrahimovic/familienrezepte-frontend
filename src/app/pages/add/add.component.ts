import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Category } from 'src/app/model/Category';
import { RecipeService } from 'src/app/services/recipe.service';
import { AlertController} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonImg, IonTitle, IonSelect, IonSelectOption, IonItem, IonInput, IonTextarea, IonListHeader, IonToolbar, IonHeader, IonIcon, IonLabel, IonContent, IonList, IonButton, Platform } from '@ionic/angular/standalone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhotoService } from 'src/app/services/photo.service';
import { Keyboard } from '@capacitor/keyboard';
import { Recipe } from 'src/app/model/Recipe';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, IonHeader, IonItem, IonLabel, IonList, IonListHeader, CommonModule, IonTitle, IonSelect, IonSelectOption, IonInput, IonTextarea, IonToolbar, IonContent, IonList, IonItem, IonButton, IonIcon],

})
export class AddComponent  implements OnInit {

  recipeForm: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private alertController: AlertController,
    private photoService: PhotoService,
    private platform: Platform) {

      this.platform.ready().then(() => {
        //this.keyboardBehavior();
      });

      this.recipeForm = this.fb.group({
        title: ['', Validators.required],
        imageUrl: [''],
        category: ['', Validators.required],
        portionsangabe: [''],
        description: ['', Validators.required],
        ingredients: this.fb.array([this.createIngredientField()], Validators.minLength(1))
      })
    }

  ngOnInit() {
    this.recipeService.getCategories().subscribe((cats) => {
      this.categories = cats;
    });
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  keyboardBehavior() {
    Keyboard.addListener('keyboardWillShow', (info) => {
      document.body.classList.add('keyboard-is-open');
    });

    Keyboard.addListener('keyboardWillHide', () => {
      document.body.classList.remove('keyboard-is-open');
    });
  }

  createIngredientField(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required]
    });
  }

  addIngredientField() {
    this.ingredients.push(this.createIngredientField());
  }

  removeIngredientField(index: number) {
    this.ingredients.removeAt(index);
  }

  async takePicture() {
    await this.photoService.selectImage();   
  }

  lastPhoto() {
    if(this.photoService.lastSelected && this.photoService.lastSelected.base64) {    
      return `${this.photoService.lastSelected.base64}`;
    }
    return `/assets/platzhalter.png`;
  }

  async presentCancelAlert() {
    const alert = await this.alertController.create({
      header: 'Abbrechen',
      message: 'Wollen Sie die Eingabe wirklich abbrechen?',
      buttons: [
        {
          text: 'Nein',
          role: 'cancel'
        },
        {
          text: 'Ja',
          handler: () => {            
            this.router.navigate(['/']);
          }
        }
      ]
    });
    await alert.present();
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const formData = this.recipeForm.value;
      const recipe:Recipe = {
        title: formData.title,
        image: this.photoService.lastSelected?.base64,
        category: formData.category,
        description: formData.description,
        ingredients: formData.ingredients.map((ingredient: any) => ingredient.name),
        servings: formData.portionsangabe,
        preparationTime: 0,
        isFavorite: false
      };

      this.recipeService.addRecipe(recipe).subscribe((d) => {
        this.recipeForm.reset();
        this.photoService.removeLastSelected();
        this.router.navigate(['/app/detail/', d._id]);
      });
    }
  }
}
