import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { error } from 'jquery';
import { PagosService } from 'src/app/services/pagos.service';

@Component({
  selector: 'app-eliminar-registro-modal',
  templateUrl: './eliminar-registro-modal.component.html',
  styleUrls: ['./eliminar-registro-modal.component.scss']
})
export class EliminarRegistroModalComponent implements OnInit{

  constructor(
    private pagosService: PagosService,
    private dialogRef: MatDialogRef<EliminarRegistroModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}

  ngOnInit(): void {

  }

  public eliminarPago(){
    this.pagosService.eliminarPago(this.data.id).subscribe(
      (response)=>{
        console.log(response);
        this.dialogRef.close({isDelete:true})
      },(error)=>{
        this.dialogRef.close({isDelete:false})
      }
    )
  }

  public cerrar_modal(){
    this.dialogRef.close({isDelete:false})
  }

}
