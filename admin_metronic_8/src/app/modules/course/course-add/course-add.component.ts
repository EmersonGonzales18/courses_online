import { Component, OnInit } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { CourseService } from '../service/course.service';
@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent implements OnInit {

  categories: any = [];
  instructores : any = [];  //Poner fondo de curso aca
  IMAGEN_PREVIEW:any = "./assets/media/avatars/blank.png";
  FILE_AVATAR:any = null;

  isLoading: any;


  constructor(
    public courseService : CourseService,
    public toaster : Toaster
  ) { }

  ngOnInit(): void {
    this.isLoading = this.courseService.isLoading$;
    
    this.courseService.lisConfig().subscribe((resp:any) => {
   
      this.categories = resp.categories;
      this.instructores = resp.instructores;
      
    })
    
  }

  processAvatar($event:any){
    if (!$event.target.files || !$event.target.files[0]) {
      // Handle the case where no file is selected
      return;
    }

    
    if($event.target.files[0].type.indexOf("image") < 0){
      
      this.toaster.open({text : 'Solamente se aceptan imagenes' , caption: 'Error', type: 'danger' })
      return 
    } 
    
    this.FILE_AVATAR = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = () => this.IMAGEN_PREVIEW = reader.result;

    this.courseService.isLoadingSubject.next(true);
    setTimeout(()=>{
      this.courseService.isLoadingSubject.next(false);
    },50);
  }


  store(){

  }
}
