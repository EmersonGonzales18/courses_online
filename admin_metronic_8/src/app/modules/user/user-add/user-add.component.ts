import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { Toaster } from 'ngx-toast-notifications';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
  
})


export class UserAddComponent implements OnInit {

  @Output() UserC: EventEmitter<any> = new EventEmitter();
  mostrarInputsAdicionales: boolean = false;
  userRole: number = 1;
  name: any = null;
  lastname: any = null;
  email: any = null;
  password: any = null;
  profesion: any = null;
  description: any = null;


  IMAGEN_PREVIEW:any = "./assets/media/avatars/blank.png";
  FILE_AVATAR:any = null;

  isLoading: any;
  constructor(
    public userService : UserService,
    public toaster : Toaster,
    public modal: NgbActiveModal,
    
  ) {  }

  ngOnInit(): void {
    this.isLoading = this.userService.isLoading$;
  }

  imprimirValorSeleccionado(){
    console.log('Valor seleccionado:', this.userRole);
    this.mostrarInputsAdicionales = (this.userRole == 2);
  }
  
  processAvatar($event:any){
    if($event.target.files[0].type.indexOf("image") < 0){
      
      this.toaster.open({text : 'Solamente se aceptan imagenes' , caption: 'Error', type: 'danger' })
    
      return 
    } 
    this.FILE_AVATAR = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = () => this.IMAGEN_PREVIEW = reader.result;
  }
  //Almacenamiento de la informacion
  store(){
    if(!this.name || !this.lastname ||  !this.email || !this.password  || !this.FILE_AVATAR){
      this.toaster.open({text : 'Llene todos los campos' , caption: 'Advertencia', type: 'warning' });
      return;
    }
    let formData = new FormData();
    formData.append("name", this.name);
    formData.append("lastname", this.lastname);
    formData.append("email", this.email);
    formData.append("password", this.password);
    formData.append("role_id", this.userRole.toString());
    formData.append("profesion", this.profesion);
    formData.append("description", this.description);
    formData.append("type_user", "2");
    formData.append("imagen",  this.FILE_AVATAR);



    this.userService.register(formData).subscribe((resp:any)=>{
      console.log(resp);
      this.UserC.emit(resp.user);
      this.toaster.open({text : 'El usuario se ha registrado' , caption: 'Éxito', type: 'success' });
      this.modal.close();
    });
    
  }
}
