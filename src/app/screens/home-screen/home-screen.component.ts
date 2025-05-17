import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FacadeService } from 'src/app/services/facade.service';
import { PagosService } from '../../services/pagos.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EliminarRegistroModalComponent } from 'src/app/modals/eliminar-registro-modal/eliminar-registro-modal.component';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {
  public name_user: string = "";
  public token: string = "";
  public lista_pagos: any[] = [];
  public displayedColumns: string[] = ['monto', 'fecha', 'tipo', 'eliminar'];

  dataSource = new MatTableDataSource<Pago>(this.lista_pagos as Pago[]);

  @ViewChild(MatPaginator) paginator! : MatPaginator;

  constructor(
    public facadeService: FacadeService,
    private pagosService: PagosService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.name_user = this.facadeService.getUserCompleteName();
    this.token = this.facadeService.getSessionToken();

    if (!this.token) {
      this.router.navigate([""]);
    }

    this.obtenerPagos();
    this.initPaginator();
  }



  // Paginación en español
  public initPaginator() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) return `0 / ${length}`;
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
      };
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
    }, 500);
  }

  // Obtener pagos
  public obtenerPagos() {
    this.pagosService.obtenerListaPagos().subscribe(
      (response) => {
        this.lista_pagos = response;
        this.dataSource.data = this.lista_pagos;
      },
      (error) => {
        console.error("Error al obtener pagos:", error);
      }
    );
  }

  public delete(idUser: number){
    const dialogRef = this.dialog.open(EliminarRegistroModalComponent, {
      data: {
        id: idUser,
        title: "Eliminar registro"},
        height: '288px',
        width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Registro eliminado");
        //Recargar la pagina
        window.location.reload();
      }else{
        alert("Error al eliminar el registro");
        console.log("Error al eliminar el registro");
      }
    })


  }

}

// Interface para tipos
export interface Pago {
  id: number;
  monto: number;
  fecha: string | Date;
  tipo: string;
}
