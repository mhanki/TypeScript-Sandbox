/// <reference types="@types/google.maps" />

import { User } from './User';
import { Company } from './Company';

const user = new User();
const company = new Company();

const mapDiv = document.getElementById('map') as HTMLElement;

new google.maps.Map(mapDiv, {
  zoom: 1,
  center: {lat: 0, lng: 0}
});