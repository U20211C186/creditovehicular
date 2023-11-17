import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './financieras.component.html',
  styleUrls: ['./financieras.component.css']
})
export class FinancierasComponent {
  searchText: string = '';
  filteredProducts: any[] = [];
  products = [
    {
      name: 'Caja Cusco',
      image: 'assets/images/cajacusco.png',
      link: 'http://www.cmac-cusco.com.pe/cr%C3%A9dito-vehicular'

    },
    {
      name: 'Caja Sullana',
      image: 'assets/images/cajasullana.png',
      link: 'https://www.cajasullana.pe/creditos-3/credito-vehicular-personal/'

    },
    {
      name: 'Caja Arequipa',
      image: 'assets/images/cajaarequipa.png',
      link: 'https://www.cajaarequipa.pe/personas/creditos/vehicular/'

    },
    {
      name: 'Caja Ica',
      image: 'assets/images/cajaica.png',
      link: 'https://cajaica.pe/creditos/credito-0-kilometros/'

    },
    {
      name: 'Caja Trujillo',
      image: 'assets/images/cajatrujillo.png',
      link: 'https://www.cajatrujillo.com.pe/portalnew/creditos_creditaxi.html'

    },
    {
      name: 'Caja Huancayo',
      image: 'assets/images/cajahuancayo.png',
      link: 'https://www.cajahuancayo.com.pe/PCM_Noticias/PCM_frmDetNoticia.aspx?cCodNotici=N0789&cCodigo=85'

    }
  ];
  products2 = [
    {
      name: 'BBVA',
      image: 'assets/images/bbva.png',
      link: 'https://www.bbva.pe/personas/productos/prestamos/credito-vehicular.html'

    },
    {
      name: 'Scotiabank',
      image: 'assets/images/scotiabank.png',
      link: 'https://www.scotiabank.com.pe/Personas/Prestamos/Creditos/Vehicular'

    },
    {
      name: 'BCP',
      image: 'assets/images/bcp.png',
      link: 'https://www.viabcp.com/creditos/credito-vehicular'

    },
    {
      name: 'Banco Pichincha',
      image: 'assets/images/pichincha.png',
      link: 'https://www.pichincha.pe/microempresas/productos-y-servicios/credito-mype/credito-vehicular-GNV'
    },
    {
      name: 'Interbank  ',
      image: 'assets/images/interbank.png',
      link: 'https://interbank.pe/centro-de-ayuda/credito-vehicular'

    },
    {
      name: 'Banco Falabella',
      image: 'assets/images/falabella.png',
      link: 'https://www.bancofalabella.cl/creditos/automotriz'

    }
  ];
  
  
  constructor() { }

  ngOnInit() {
  }

  
  
}
