import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategorieService } from '../service/categorie.service';
import { Toaster } from 'ngx-toast-notifications';



@Component({
  selector: 'app-categorie-edit',
  templateUrl: './categorie-edit.component.html',
  styleUrls: ['./categorie-edit.component.scss']
})
export class CategorieEditComponent implements OnInit {
  @Input() categorie:any;

  @Output() CategorieE: EventEmitter<any> = new EventEmitter();

  name: any = null;
  describ: any = null;
  state: any = 1;

  IMAGEN_PREVIEW:any = "./assets/media/avatars/blank.png";
  FILE_PORTADA:any = null;

  isLoading: any;
  constructor(
    public categorieService : CategorieService,
    public toaster : Toaster,
    public modal: NgbActiveModal,
    
  ) {  }

  ngOnInit(): void {
    this.isLoading = this.categorieService.isLoading$;
    this.name = this.categorie.name;
    this.describ = this.categorie.describ;
    this.state = this.categorie.state;
    this.IMAGEN_PREVIEW = this.categorie.imagen;
    
  }

  processAvatar($event:any){
    if($event.target.files[0].type.indexOf("image") < 0){
      
      this.toaster.open({text : 'Solamente se aceptan imagenes' , caption: 'Error', type: 'danger' })
    
      return 
    } 
    this.FILE_PORTADA = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_PORTADA);
    reader.onloadend = () => this.IMAGEN_PREVIEW = reader.result;
  }

  store(){
    if(!this.name || !this.describ  ){
      this.toaster.open({text : 'Llene todos los campos' , caption: 'Advertencia', type: 'warning' });
      return;
    }
    let formData = new FormData();
    formData.append("name", this.name);
    formData.append("describ", this.describ);
    formData.append("state",this.state);

    if(this.FILE_PORTADA){
      formData.append("portada",  this.FILE_PORTADA);
    }

    this.categorieService.updateCategorie(formData, this.categorie.id).subscribe((resp:any)=>{
      console.log(resp);
      //enviar informacion del back
      this.CategorieE.emit(resp.categorie);

      this.toaster.open({text : 'El usuario se ha modificado' , caption: 'Éxito', type: 'info' });
      this.modal.close();
    });
    
  }



}
