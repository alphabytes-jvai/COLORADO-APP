// app/(screen)/explore-navigate.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StatusBar,
  Alert,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Region,
  Polyline,
} from "react-native-maps";
import * as Location from "expo-location";
import { TranslatedText } from "@/components/ui/TranslatedText";
import {
  MapPin,
  ArrowLeft,
  Search,
  Navigation2,
  Locate,
  RotateCcw,
  Menu,
  X,
  Route,
} from "lucide-react-native";


// Enhanced location data with more details
const mockLocations = [
  {
    id: "1",
    name: "Rocky Mountain National Park",
    address: "1000 US Hwy 36, Estes Park, CO 80517",
    latitude: 40.3428,
    longitude: -105.6836,
    type: "National Park",
    description: "Breathtaking mountain vistas and wildlife",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Garden of the Gods",
    address: "1805 N 30th St, Colorado Springs, CO 80904",
    latitude: 38.8719,
    longitude: -104.8761,
    type: "Park",
    description: "Stunning red rock formations",
    rating: 4.9,
  },
  {
    id: "3",
    name: "Red Rocks Amphitheatre",
    address: "18300 W Alameda Pkwy, Morrison, CO 80465",
    latitude: 39.6654,
    longitude: -105.2057,
    type: "Entertainment",
    description: "World-famous outdoor concert venue",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Mesa Verde National Park",
    address: "Mesa Verde National Park, CO 81330",
    latitude: 37.2308,
    longitude: -108.4618,
    type: "National Park",
    description: "Ancient cliff dwellings and archaeological sites",
    rating: 4.6,
  },
  {
    id: "5",
    name: "Pikes Peak",
    address: "Pikes Peak, Colorado Springs, CO",
    latitude: 38.8405,
    longitude: -105.0442,
    type: "Mountain",
    description: "America's Mountain - 14,115 feet elevation",
    rating: 4.8,
  },
  {
    id: "6",
    name: "Great Sand Dunes National Park",
    address: "11999 State Highway 150, Mosca, CO 81146",
    latitude: 37.7916,
    longitude: -105.5943,
    type: "National Park",
    description: "North America's tallest sand dunes",
    rating: 4.5,
  },
];

interface LocationType {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  type: string;
  description?: string;
  rating?: number;
}

interface DirectionStep {
  latitude: number;
  longitude: number;
}

export default function ExploreNavigateScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLocations, setFilteredLocations] = useState(mockLocations);
  const [selectedLocation, setSelectedLocation] = useState<LocationType>(
    mockLocations[2]
  ); // Red Rocks as default
  const [isSearching, setIsSearching] = useState(false);
  const [userLocation, setUserLocation] =
    useState<Location.LocationObject | null>(null);
  const [mapRegion, setMapRegion] = useState<Region>({
    latitude: 39.6654,
    longitude: -105.2057,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [routeCoordinates, setRouteCoordinates] = useState<DirectionStep[]>([]);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigationDistance, setNavigationDistance] = useState<string>("");
  const [navigationDuration, setNavigationDuration] = useState<string>("");
  const mapRef = useRef<MapView>(null);

  // Request location permissions and get user location
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Location Permission",
            "Permission to access location was denied. Some features may not work properly."
          );
          return;
        }

        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setUserLocation(location);
      } catch (error) {
        console.error("Error getting location:", error);
        Alert.alert("Error", "Unable to get your current location");
      }
    })();
  }, []);

  // Filter locations based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredLocations(mockLocations);
    } else {
      const filtered = mockLocations.filter(
        (location) =>
          location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  }, [searchQuery]);

  // Calculate distance between two points
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Generate mock route coordinates (in real app, use Google Directions API)
  const generateRouteCoordinates = (
    start: { latitude: number; longitude: number },
    end: { latitude: number; longitude: number }
  ): DirectionStep[] => {
    const steps = 10;
    const coordinates: DirectionStep[] = [];

    for (let i = 0; i <= steps; i++) {
      const ratio = i / steps;
      const latitude = start.latitude + (end.latitude - start.latitude) * ratio;
      const longitude =
        start.longitude + (end.longitude - start.longitude) * ratio;
      coordinates.push({ latitude, longitude });
    }

    return coordinates;
  };

  const handleLocationSelect = (location: LocationType) => {
    setSelectedLocation(location);
    setIsSearching(false);
    setSearchQuery("");
    setIsNavigating(false);
    setRouteCoordinates([]);

    // Animate to selected location
    const newRegion = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    };
    setMapRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 1000);
  };

  const handleGetDirections = async () => {
    if (!selectedLocation || !userLocation) {
      Alert.alert(
        "Location Required",
        "Unable to get directions. Please make sure location services are enabled."
      );
      return;
    }

    try {
      setIsNavigating(true);

      const start = {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      };

      const end = {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      };

      // Generate route coordinates (in real app, use Google Directions API)
      const route = generateRouteCoordinates(start, end);
      setRouteCoordinates(route);

      // Calculate distance and estimated duration
      const distance = calculateDistance(
        start.latitude,
        start.longitude,
        end.latitude,
        end.longitude
      );

      setNavigationDistance(`${distance.toFixed(1)} km`);
      setNavigationDuration(`${Math.round(distance * 1.5)} min`); // Rough estimate

      // Fit the route in view
      const coordinates = [start, end];
      mapRef.current?.fitToCoordinates(coordinates, {
        edgePadding: {
          top: 100,
          right: 50,
          bottom: 300, // Account for bottom card
          left: 50,
        },
        animated: true,
      });

      Alert.alert(
        "Navigation Started",
        `Route calculated: ${distance.toFixed(1)} km, estimated ${Math.round(distance * 1.5)} minutes`
      );
    } catch (error) {
      console.error("Error calculating route:", error);
      Alert.alert("Error", "Unable to calculate route");
      setIsNavigating(false);
    }
  };

  const handleStopNavigation = () => {
    setIsNavigating(false);
    setRouteCoordinates([]);
    setNavigationDistance("");
    setNavigationDuration("");

    // Return to selected location view
    if (selectedLocation) {
      const newRegion = {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
      setMapRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 1000);
    }
  };

  const handleMyLocation = async () => {
    try {
      let location = userLocation;

      if (!location) {
        location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setUserLocation(location);
      }

      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
      setMapRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 1000);
    } catch (error) {
      console.log("Error location", error)
      Alert.alert("Error", "Unable to get your current location");
    }
  };

  const handleResetView = () => {
    const defaultRegion = {
      latitude: 39.6654,
      longitude: -105.2057,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    setMapRegion(defaultRegion);
    mapRef.current?.animateToRegion(defaultRegion, 1000);
    setIsNavigating(false);
    setRouteCoordinates([]);
  };

  const handleMarkerPress = (location: LocationType) => {
    handleLocationSelect(location);
  };

  const renderLocationItem = ({ item }: { item: LocationType }) => (
    <TouchableOpacity
      onPress={() => handleLocationSelect(item)}
      className="p-4 border-b border-gray-100 bg-white"
      style={styles.locationItem}
      activeOpacity={0.7}
    >
      <View className="flex-row items-start">
        <View className="bg-green-100 p-2 rounded-lg mr-3">
          <MapPin size={16} color="#22c55e" />
        </View>
        <View className="flex-1">
          <Text
            className="font-semibold text-black text-base"
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text className="text-sm text-gray-600 mt-1" numberOfLines={2}>
            {item.address}
          </Text>
          {item.description && (
            <Text className="text-xs text-gray-500 mt-1" numberOfLines={1}>
              {item.description}
            </Text>
          )}
          <View className="flex-row items-center justify-between mt-2">
            <Text className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
              {item.type}
            </Text>
            {item.rating && (
              <View className="flex-row items-center">
                <Text className="text-xs text-orange-500 mr-1">★</Text>
                <Text className="text-xs text-gray-600">{item.rating}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor="#22c55e" />

      {/* Header */}
      <View className="bg-green-500 pt-4 pb-4 px-4" style={styles.header}>
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-semibold">
            <TranslatedText>Explore & Navigate</TranslatedText>
          </Text>
          <TouchableOpacity className="p-2">
            <Menu size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View
          className="bg-white rounded-lg flex-row items-center px-3 py-2"
          style={styles.searchBar}
        >
          <Search size={20} color="#666" />
          <TextInput
            className="flex-1 ml-3 text-black"
            placeholder="Search places..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsSearching(true)}
            style={styles.searchInput}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <X size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Map Container */}
      <View className="flex-1" style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={mapRegion}
          onRegionChangeComplete={setMapRegion}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsCompass={false}
          showsScale={true}
          showsBuildings={true}
          showsTraffic={false}
          loadingEnabled={true}
          mapType="standard"
          onPress={() => setIsSearching(false)} // Close search when map is pressed
        >
          {/* Location Markers */}
          {mockLocations.map((location) => (
            <Marker
              key={location.id}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={location.name}
              description={location.description || location.address}
              onPress={() => handleMarkerPress(location)}
              pinColor={
                selectedLocation.id === location.id ? "#ef4444" : "#22c55e"
              }
            />
          ))}

          {/* Route Polyline */}
          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeWidth={4}
              strokeColor="#3b82f6"
              lineJoin="round"
              lineCap="round"
            />
          )}
        </MapView>

        {/* Search Results Overlay */}
        {isSearching && (
          <View
            className="absolute left-4 right-4 bg-white rounded-lg shadow-lg"
            style={[styles.searchResults, { top: 20, maxHeight: 300 }]}
          >
            <FlatList
              data={filteredLocations}
              keyExtractor={(item) => item.id}
              renderItem={renderLocationItem}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View className="p-4">
                  <Text className="text-gray-500 text-center">
                    <TranslatedText>No locations found</TranslatedText>
                  </Text>
                </View>
              }
            />
          </View>
        )}

        {/* Map Controls */}
        <View className="absolute right-4 space-y-3" style={styles.mapControls}>
          <TouchableOpacity
            onPress={handleMyLocation}
            className="bg-white p-3 rounded-lg shadow-lg"
            style={styles.controlButton}
          >
            <Locate size={20} color="#22c55e" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleResetView}
            className="bg-white p-3 rounded-lg shadow-lg"
            style={styles.controlButton}
          >
            <RotateCcw size={20} color="#22c55e" />
          </TouchableOpacity>
        </View>

        {/* Navigation Status */}
        {isNavigating && (
          <View
            className="absolute top-4 left-4 right-4"
            style={styles.navigationStatus}
          >
            <View className="bg-blue-500 rounded-lg p-3 flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <Route size={16} color="white" />
                <View className="ml-2">
                  <Text className="text-white font-semibold text-sm">
                    Navigating to {selectedLocation.name}
                  </Text>
                  <Text className="text-blue-100 text-xs">
                    {navigationDistance} • {navigationDuration}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={handleStopNavigation}
                className="bg-blue-600 rounded p-2 ml-2"
              >
                <X size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Location Info Card */}
        {selectedLocation && (
          <View
            className="absolute bottom-4 left-4 right-4"
            style={styles.locationCard}
          >
            <View className="bg-white rounded-xl p-4 shadow-lg">
              <View className="flex-row items-start mb-3">
                <View className="bg-red-100 p-2 rounded-lg mr-3">
                  <MapPin size={16} color="#ef4444" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-black mb-1">
                    {selectedLocation.name}
                  </Text>
                  <Text className="text-sm text-gray-600 mb-2">
                    {selectedLocation.address}
                  </Text>
                  {selectedLocation.description && (
                    <Text className="text-xs text-gray-500 mb-2">
                      {selectedLocation.description}
                    </Text>
                  )}
                  <View className="flex-row items-center">
                    <Text className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded mr-2">
                      {selectedLocation.type}
                    </Text>
                    {selectedLocation.rating && (
                      <View className="flex-row items-center">
                        <Text className="text-xs text-orange-500 mr-1">★</Text>
                        <Text className="text-xs text-gray-600">
                          {selectedLocation.rating}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              {!isNavigating ? (
                <TouchableOpacity
                  onPress={handleGetDirections}
                  className="bg-green-500 rounded-lg py-3 flex-row items-center justify-center"
                  style={styles.directionsButton}
                >
                  <Navigation2 size={16} color="white" />
                  <Text className="text-white font-semibold ml-2">
                    <TranslatedText>Get Directions</TranslatedText>
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleStopNavigation}
                  className="bg-red-500 rounded-lg py-3 flex-row items-center justify-center"
                  style={styles.directionsButton}
                >
                  <X size={16} color="white" />
                  <Text className="text-white font-semibold ml-2">
                    <TranslatedText>Stop Navigation</TranslatedText>
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchBar: {
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInput: {
    fontSize: 16,
  },
  searchResults: {
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    zIndex: 1000,
  },
  locationItem: {
    borderLeftWidth: 3,
    borderLeftColor: "#22c55e",
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  mapControls: {
    top: 20,
  },
  controlButton: {
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  navigationStatus: {
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    zIndex: 999,
  },
  locationCard: {
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  directionsButton: {
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});
