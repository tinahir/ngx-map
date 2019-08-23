import { 
  Component, 
  OnInit, 
  ElementRef, 
  Output, 
  EventEmitter 
} from '@angular/core';
import { loadModules } from 'esri-loader';
import esri = __esri;


@Component({
  selector: 'ngx-esri-map',
  template: '<div class="esri-map-container"></div>',
  host: {
    class: 'esri-map'
  },
})
export class EsriMap implements OnInit {

  @Output() mapLoaded = new EventEmitter<esri.MapView>();

  private _mapElement: HTMLDivElement;

  constructor(private readonly _elementRef: ElementRef) { }


  ngOnInit(): void {     
    this._mapElement = this._elementRef.nativeElement.querySelector('.esri-map-container');
    this._initializeMap().then(mapView => () => {
      this.mapLoaded.emit(mapView);
    });
  }

  private async _initializeMap(): Promise<esri.MapView> {
    try {
      const [EsriMap, EsriMapView] = await loadModules([
        'esri/Map',
        'esri/views/MapView'
      ]);

      const mapProperties: esri.MapProperties = {
        //basemap: this._basemap
      };

      const map: esri.Map = new EsriMap(mapProperties);

      const mapViewProperties: esri.MapViewProperties = {
        container: this._mapElement,
        // center: this._center,
        // zoom: this._zoom,
        map: map,
      };

      // if (!this.zoomControl) {
      //   mapViewProperties.ui = {
      //     components: ['attribution']
      //   };
      // }

      return new EsriMapView(mapViewProperties);
    } catch (error) {
      console.log('EsriLoader: ', error);
    }
  }

}
