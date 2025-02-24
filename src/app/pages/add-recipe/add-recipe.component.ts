import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../model/category';
import { Recipe } from '../../model/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class AddRecipeComponent {
  recipeForm: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private alertController: AlertController
  ) {

    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      imageUrl: ['', [Validators.required, Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)]],
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
      const recipe = {
        title: formData.title,
        image: formData.imageUrl,
        category: formData.category,
        description: formData.description,
        ingredients: formData.ingredients.map((ingredient: any) => ingredient.name),
        portionsangabe: formData.portionsangabe,
        isFavorite: false
      };

      this.recipeService.addRecipe(recipe).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
