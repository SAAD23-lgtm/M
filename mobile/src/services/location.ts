import * as Location from 'expo-location';

export type LocationDraft = {
  lat: number;
  lng: number;
  address?: string;
};

export async function getCurrentDeviceLocation(): Promise<LocationDraft> {
  const permission = await Location.requestForegroundPermissionsAsync();

  if (permission.status !== 'granted') {
    throw new Error('LOCATION_PERMISSION_DENIED');
  }

  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  const address = await reverseGeocode(
    position.coords.latitude,
    position.coords.longitude
  );

  return {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
    address,
  };
}

export async function reverseGeocode(lat: number, lng: number) {
  try {
    const candidates = await Location.reverseGeocodeAsync({
      latitude: lat,
      longitude: lng,
    });

    const best = candidates[0];
    if (!best) {
      return '';
    }

    return [
      best.name,
      best.street,
      best.city,
      best.region,
      best.country,
    ]
      .filter(Boolean)
      .join(', ');
  } catch {
    return '';
  }
}
