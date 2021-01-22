export interface DatosConJwt{
    jwt:string;
}

export interface ListadoVuelos{
    listadoVuelos: Vuelo[];
    totalVuelos: number;
}

export interface Vuelo{
    id:number;
    origen:Nacionalidad;
    destino:Nacionalidad;
    precio:number;
    fecha:Date;
}

export interface Nacionalidad{
    id:  number;
    descripcion:string;
}

export interface TipoSexo{
    id: number;
    descripcion:string;
}

export interface Usuario{
    id: number;
    nombre: string;
    usuario: string;
    email :  string;
    password:string;
    fechaNacimiento:Date;
    fechaEliminacion:Date;
    nacionalidad:number;
    sexo:number;
    imagen:string;
}

export interface UsuarioMinimo{
    id : number;
    nombre:string;
}


