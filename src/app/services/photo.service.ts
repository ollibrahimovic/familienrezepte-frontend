import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Platform } from '@ionic/angular';
import pica from 'pica';

interface UserPhoto {
    base64:string;
    
}

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
    public lastSelected: UserPhoto | undefined;

    constructor(private platform: Platform) {

    }

    async selectImage() {
        try {
            // Bild aufnehmen oder aus Galerie wählen
            const image = await Camera.getPhoto({
                quality: 80,  // Initiale Qualität für Kameraaufnahme
                allowEditing: false,
                resultType: CameraResultType.Base64, 
                source: CameraSource.Prompt,
                promptLabelPhoto: 'Aus der Galerie',
                promptLabelPicture: 'Kamera starten',
                promptLabelHeader: 'Bild hinzufügen'
            });

            if (!image.base64String) {
                console.error("Kein Bild erhalten.");
                return;
            }
            // Base64 in ein Bild-Element konvertieren
            const img = await this.base64ToImage(image.base64String);
            
            // Bild skalieren und komprimieren
            const resizedBase64 = await this.resizeImage(img, 500);             
            this.lastSelected = {
                 base64: resizedBase64
            };

        } catch (error) {
            console.error("Fehler beim Bildauswahl:", error);
        }
    }

    // Hilfsfunktion: Base64 zu Image-Element
    async base64ToImage(base64: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = `data:image/jpeg;base64,${base64}`;
        });
    }

    // Hilfsfunktion: Bild skalieren mit Pica
    async resizeImage(img: HTMLImageElement, maxWidth: number): Promise<string> {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) throw new Error("Canvas-Kontext nicht verfügbar.");

        const aspectRatio = img.width / img.height;
        canvas.width = Math.min(maxWidth, img.width);
        canvas.height = canvas.width / aspectRatio;

        const picaInstance = pica();
        const resizedCanvas = await picaInstance.resize(img, canvas);

        return resizedCanvas.toDataURL("image/jpeg", 0.7); // Komprimierung auf 70%
    }
}

