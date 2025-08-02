// services/mapService.ts
import { Platform, Linking } from "react-native";

const GOOGLE_MAPS_API_KEY = "AIzaSyC5wfq4QCcnPJIDW5_m6QB72nlrUkjTYAw";

export interface Location {
  latitude: number;
  longitude: number;
  name?: string;
  address?: string;
}

export interface DirectionsResponse {
  routes: Array<{
    legs: Array<{
      distance: { text: string; value: number };
      duration: { text: string; value: number };
      steps: Array<{
        html_instructions: string;
        distance: { text: string; value: number };
        duration: { text: string; value: number };
        start_location: { lat: number; lng: number };
        end_location: { lat: number; lng: number };
      }>;
    }>;
    overview_polyline: { points: string };
  }>;
  status: string;
}

export class MapService {
  // Get directions between two points
  static async getDirections(
    origin: Location,
    destination: Location,
    mode: "driving" | "walking" | "transit" = "driving"
  ): Promise<DirectionsResponse> {
    const originStr = `${origin.latitude},${origin.longitude}`;
    const destinationStr = `${destination.latitude},${destination.longitude}`;
    
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originStr}&destination=${destinationStr}&mode=${mode}&key=${GOOGLE_MAPS_API_KEY}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status !== "OK") {
        throw new Error(`Directions API error: ${data.status}`);
      }
      
      return data;
    } catch (error) {
      console.error("Error getting directions:", error);
      throw error;
    }
  }

  // Open external navigation app
  static async openExternalNavigation(destination: Location): Promise<void> {
    const { latitude, longitude, name } = destination;
    
    try {
      if (Platform.OS === "ios") {
        // Try Apple Maps first
        const appleMapsUrl = `maps:0,0?q=${latitude},${longitude}`;
        const canOpenAppleMaps = await Linking.canOpenURL(appleMapsUrl);
        
        if (canOpenAppleMaps) {
          await Linking.openURL(appleMapsUrl);
          return;
        }
      }
      
      // Fallback to Google Maps
      const googleMapsUrl = Platform.select({
        ios: `comgooglemaps://?q=${latitude},${longitude}&center=${latitude},${longitude}&zoom=14`,
        android: `google.navigation:q=${latitude},${longitude}`,
        default: `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
      });
      
      if (googleMapsUrl) {
        const canOpen = await Linking.canOpenURL(googleMapsUrl);
        if (canOpen) {
          await Linking.openURL(googleMapsUrl);
        } else {
          // Final fallback to web Google Maps
          const webUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
          await Linking.openURL(webUrl);
        }
      }
    } catch (error) {
      console.error("Error opening navigation:", error);
      throw error;
    }
  }

  // Geocode address to coordinates
  static async geocodeAddress(address: string): Promise<Location> {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_API_KEY}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status !== "OK" || !data.results.length) {
        throw new Error(`Geocoding failed: ${data.status}`);
      }
      
      const result = data.results[0];
      return {
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
        name: result.formatted_address,
        address: result.formatted_address,
      };
    } catch (error) {
      console.error("Error geocoding address:", error);
      throw error;
    }
  }

  // Reverse geocode coordinates to address
  static async reverseGeocode(location: Location): Promise<string> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${GOOGLE_MAPS_API_KEY}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status !== "OK" || !data.results.length) {
        throw new Error(`Reverse geocoding failed: ${data.status}`);
      }
      
      return data.results[0].formatted_address;
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      throw error;
    }
  }

  // Search for places
  static async searchPlaces(
    query: string,
    location?: Location,
    radius: number = 50000
  ): Promise<Array<Location & { place_id: string; types: string[] }>> {
    let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_MAPS_API_KEY}`;
    
    if (location) {
      url += `&location=${location.latitude},${location.longitude}&radius=${radius}`;
    }
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status !== "OK") {
        throw new Error(`Places search failed: ${data.status}`);
      }
      
      return data.results.map((place: any) => ({
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
        name: place.name,
        address: place.formatted_address,
        place_id: place.place_id,
        types: place.types,
      }));
    } catch (error) {
      console.error("Error searching places:", error);
      throw error;
    }
  }

  // Get place details
  static async getPlaceDetails(placeId: string): Promise<any> {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_MAPS_API_KEY}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status !== "OK") {
        throw new Error(`Place details failed: ${data.status}`);
      }
      
      return data.result;
    } catch (error) {
      console.error("Error getting place details:", error);
      throw error;
    }
  }

  // Calculate distance between two points
  static calculateDistance(point1: Location, point2: Location): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(point2.latitude - point1.latitude);
    const dLon = this.toRadians(point2.longitude - point1.longitude);
    
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(point1.latitude)) *
        Math.cos(this.toRadians(point2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  }

  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}