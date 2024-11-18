declare module "leaflet" {
  export interface MapOptions {
    center?: LatLngExpression;
    zoom?: number;
  }

  export interface CircleOptions {
    radius?: number;
  }
}
