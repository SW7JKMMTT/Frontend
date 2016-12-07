import { Injectable } from '@angular/core';
import { APIServices } from './api.services';
import { EmitterService } from './emitter.service';

@Injectable()
export class IconService {
    constructor(private APIServices: APIServices) {}
    
    GetIcon(userID: number) {
        let imageData;
        this.APIServices.GetUserIcon(userID).subscribe(
            data => {
                imageData = this.CleanBody(data);

                EmitterService.get("usericon" + userID.toString()).emit(imageData)
        })
    }

    CleanBody(body : any){
        return body["_body"].replace(/(\r\n|\n|\r)/gm,"")
    }
}