import { Component, OnInit } from '@angular/core';
import { loadModules } from 'esri-loader';
import esri = __esri;


@Component({
  selector: 'ngx-esri-map',
  template: `
    <div #mapViewNode></div>
  `,
  host: {
    class: 'ngx-esri-map'
  },
})
export class EsriMap implements OnInit {
  constructor() { }


  ngOnInit(): void { }

  private async _initializeMap() {
    try {
      const [EsriMap, EsriMapView] = await loadModules([
        'esri/Map',
        'esri/views/MapView'
      ]);

      const mapProperties: esri.MapProperties = {
        //basemap: this._basemap
      };

      const map: esri.Map = new EsriMap(mapProperties);

      // const mapViewProperties: esri.MapViewProperties = {
      //   container: this.mapViewEl.nativeElement,
      //   center: this._center,
      //   zoom: this._zoom,
      //   map: map,
      // };

      // if (!this.zoomControl) {
      //   mapViewProperties.ui = {
      //     components: ['attribution']
      //   };
      // }

      // return new EsriMapView(mapViewProperties);
    } catch (error) {
      console.log('EsriLoader: ', error);
    }
  }

}
