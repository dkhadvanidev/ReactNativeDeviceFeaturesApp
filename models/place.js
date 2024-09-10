export class Place {
  constructor({ title, imageUri, location, id }) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng }; //{lat: 0.15415654, lng : 232.254654};
    // this.lat = location.lat;
    // this.lng = location.lng;
    this.id = id;
    // this.id = new Date().toString() + Math.random().toString();
  }
}
