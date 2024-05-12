import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  //enviar info del padre al hijo
  @Input() user:any;

  //enviar info del hijo al padre
  @Output() UserE: EventEmitter<any> = new EventEmitter();

  name: any = null;
  lastname: any = null;
  email: any = null;
  password: any = null;
  state: any = 1;
  description: any = null;
  profesion: any = null;
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
    this.name = this.user.name;
    this.lastname = this.user.lastname;
    this.email = this.user.email;
    this.state = this.user.state;
    this.profesion = this.user.profesion;
    this.description = this.user.description;
    this.IMAGEN_PREVIEW = this.user.avatar;
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
    if(!this.name || !this.lastname ||  !this.email ){
      this.toaster.open({text : 'Llene todos los campos' , caption: 'Advertencia', type: 'warning' });
      return;
    }
    let formData = new FormData();
    formData.append("name", this.name);
    formData.append("lastname", this.lastname);
    formData.append("email", this.email);
    formData.append("state", this.state);
    formData.append("profesion", this.profesion);
    formData.append("description", this.description);
    if(this.password){
      formData.append("password", this.password);
    }
    if(this.FILE_AVATAR){
      formData.append("imagen",  this.FILE_AVATAR);
    }

    

    this.userService.update(formData, this.user.id).subscribe((resp:any)=>{
      console.log(resp);
      //enviar informacion del back
      this.UserE.emit(resp.user);

      this.toaster.open({text : 'El usuario se ha modificado' , caption: 'Éxito', type: 'info' });
      this.modal.close();
    });
    
  }

}
