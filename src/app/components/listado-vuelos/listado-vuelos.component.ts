import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VuelosService } from 'src/app/services/vuelos.service';
import { MatDialog } from '@angular/material/dialog';
import { ListadoVuelos , Vuelo , Usuario } from '../../interfaces/interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections'
@Component({
  selector: 'app-listado-vuelos',
  templateUrl: './listado-vuelos.component.html',
  styleUrls: ['./listado-vuelos.component.scss']
})
export class ListadoVuelosComponent implements OnInit , AfterViewInit{
  usuarioAutenticado !: Usuario;
  nombreDeColumnas : String[]= ['select','Origen','Destino','Fecha','Precio'];
  listadoVuelos : ListadoVuelos = {
    listadoVuelos: [] ,
    totalVuelos : 0 

  }
  selection = new SelectionModel<Vuelo>(true,[]);
  dataSource = new MatTableDataSource<Vuelo>(this.listadoVuelos.listadoVuelos);
@ViewChild(MatPaginator) paginator !: MatPaginator;
  constructor(private vuelosService : VuelosService , 
    private usuarioService : UsuarioService,
    private router : Router,
    private dialog : MatDialog) { }


  ngOnInit(): void {
    this.usuarioService.getUsuarioAutenticado().subscribe(usuario =>{
      if (usuario == null) {
        this.router.navigate(['/login']);
      }
      else{
        this.usuarioAutenticado = usuario;
      }
    });
  }
  ngAfterViewInit(): void {
    this.configurarEtiquetasDelPaginator();
    this.actualizarListadoVuelos();
  }


  private configurarEtiquetasDelPaginator(){
    this.paginator._intl.itemsPerPageLabel="Vuelos por página";
    this.paginator._intl.nextPageLabel="Siguiente";
    this.paginator._intl.previousPageLabel="Anterior";
    this.paginator._intl.firstPageLabel="Primera";
    this.paginator._intl.lastPageLabel="Última";
    this.paginator._intl.getRangeLabel =(page: number, pageSize:number,length: number)=>{
      const start = page * pageSize +1;
      const end = (page +1 ) * pageSize;
      return `${start} - ${end} de  ${length}`;
    }
  }

  actualizarListadoVuelos(){
    //abrir dialogo

    this.vuelosService.getListadoVuelos(this.paginator.pageIndex , this.paginator.pageSize).subscribe(data=>{
      if(data["result"]=="fail"){
        //abrir dialogo
      }
      else{
        this.listadoVuelos = data;
        this.dataSource = new MatTableDataSource<Vuelo>(this.listadoVuelos.listadoVuelos);
        // cerrar dialogo
      }
    });


  }


//metodos  checkbox
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Vuelo): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

// filtro
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


  

}
