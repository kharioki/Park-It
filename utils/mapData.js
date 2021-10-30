export const markers = [
  {
    coordinate: {
      latitude: 22.6293867,
      longitude: 88.4354486,
    },
    name: 'Sarit Level 1',
    location: 'Westlands',
    price_per_day: 250,
    available_spots: 80,
    total_spots: 120,
    services: ['Parking', 'Wifi', 'Charging', 'Car Wash'],
  },
  {
    coordinate: {
      latitude: 22.6345648,
      longitude: 88.4377279,
    },
    name: 'Sarit Level 2',
    location: 'Westlands',
    price_per_day: 300,
    available_spots: 20,
    total_spots: 120,
    services: ['Parking', 'Wifi', 'Charging', 'Car Wash'],
  },
  {
    coordinate: {
      latitude: 22.6281662,
      longitude: 88.4410113,
    },
    name: 'Sarit Level 3',
    location: 'Westlands',
    price_per_day: 250,
    available_spots: 80,
    total_spots: 120,
    services: ['Parking', 'Wifi', 'Charging', 'Car Wash'],
  },
  {
    coordinate: {
      latitude: 22.6341137,
      longitude: 88.4497463,
    },
    name: 'Sarit Level 4',
    location: 'Westlands',
    price_per_day: 250,
    available_spots: 80,
    total_spots: 120,
    services: ['Parking', 'Wifi', 'Charging', 'Car Wash'],
  },
  {
    coordinate: {
      latitude: 22.6292757,
      longitude: 88.444781,
    },
    name: 'Westgate Level 1',
    location: 'Westlands',
    price_per_day: 300,
    available_spots: 40,
    total_spots: 70,
    services: ['Parking', 'Wifi', 'Charging', 'Car Wash'],
  },
];

export const categories = [
  {
    name: 'Parking',
    icon: 'parking',
  },
  {
    name: 'Wifi',
    icon: 'wifi',
  },
  {
    name: 'Charging',
    icon: 'battery-charging',
  },
  {
    name: 'Car Wash',
    icon: 'car-wash',
  },
  {
    name: 'CCTV',
    icon: 'cctv',
  }
];

export const mapDarkStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#181818',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1b1b1b',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#2c2c2c',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8a8a8a',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#373737',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3c3c3c',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#4e4e4e',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3d3d3d',
      },
    ],
  },
];

export const mapStandardStyle = [
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];