import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormServiceService } from 'src/app/Services/form-service.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
infoClients: any[]=[];
form: FormGroup;
id: number| undefined;


  constructor(private fb:FormBuilder,
   private ClientService: FormServiceService,
   private toastr: ToastrService,) 
  {
this.form= this.fb.group({
nombre:["", Validators.required],
correo:["", Validators.required],
ciudad:["", Validators.required],
celular:["",[Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
asunto:["",[Validators.required, Validators.maxLength(25), Validators.minLength(1)]],

})

   }

   

  ngOnInit(): void {
    this.obtenerClients();
  }

  obtenerClients(){
    this.ClientService.GetLista().subscribe(data => {
     console.log(data);
     this.infoClients=data;
    }, error =>{
      console.log(error);
    })
 }
 agregar(){
  // console.log(this.form)

  const getinfo: any={
    nombre: this.form.get("nombre")?.value,
    correo: this.form.get("correo")?.value,
    ciudad: this.form.get("ciudad")?.value.replace("20","").replace("-","/"),
    celular: this.form.get("celular")?.value,
    asunto: this.form.get("asunto")?.value
  }
  if(this.id== undefined){
this.ClientService.PostLista(getinfo).subscribe(data =>{
  this.toastr.success("Agregaste una tarjeta","Tarjeta Registrada")
  this.obtenerClients();
  this.form.reset()

}, error=>{
  this.toastr.error("No se pudo realizar la accion","Upps Error")
  console.log(error)
})
  }
else{
  getinfo.id=this.id
 this.ClientService.PutLista(this.id,getinfo).subscribe(data =>{
  this.form.reset();
  // this.accion="Agregar";
  this.id=undefined;
  this.toastr.info("se ha actualizado la informacion","Se ha actualizado")
  this.obtenerClients();
},error=>{
  console.log(error)
} ) 
}
}

borrar(index:number){
  this.ClientService.DeleteLista(index).subscribe(data =>{
// this.ListTarjeta.splice(index,1)
this.toastr.error("Eliminaste una tarjeta", "Tarjeta Elminada")
this.obtenerClients();
}, error=>{
    console.log(error);
  })
}


editar(cliente: any){
  console.log(cliente);
  // this.accion="editar"
  this.id= cliente.id;

  this.form.patchValue({
    nombre:cliente.nombre,
    correo:cliente.correo,
    ciudad:cliente.ciudad,
    celular:cliente.celular,
    asunto:cliente.asunto
  })

}

}


