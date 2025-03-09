import { Injectable } from '@angular/core';
import { signInAnonymously, signOut, Auth, user } from '@angular/fire/auth';
import { RecipeService } from './recipe.service';
import { UserService } from './user.service';
import { AnonUser } from '../model/AnonUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USER_ID_KEY = 'firebaseUserId';

  public currentUser: AnonUser | null = null;
  constructor(private auth: Auth, 
    private userSerivce: UserService) {}

  async signInAnonymously(): Promise<string | null> {

    let userId:string|null = localStorage.getItem(this.USER_ID_KEY);
    //console.log("USER_ID", userId);
    if (!userId) {
      try {
        const userCredential = await signInAnonymously(this.auth);
        if (userCredential.user) {
          userId = userCredential.user.uid;  
        }
      } catch (error) {
        console.error('Fehler beim anonymen Login:', error);
      }
    }

    if(userId) {
     // console.log("USER ZUR DB HINZUFÜGEN?",this.currentUser);
      this.userSerivce.addUser({
          userId: userId,
          favorites: []
        }).subscribe(d=> {
          if(d._id) {
            this.currentUser = {userId: userId, dbId: d._id};
          }          
        });
    } else {

    }
    return null;
  }

  async signOut(): Promise<void> {
    await this.signOut();
    localStorage.removeItem(this.USER_ID_KEY); // Entferne die gespeicherte User-ID
  }
}
