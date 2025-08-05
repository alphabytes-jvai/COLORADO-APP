// // app\(screen)\explore-navigate.tsx
// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   FlatList,
//   StatusBar,
//   Alert,
//   StyleSheet,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { router } from "expo-router";
// import MapView, {
//   Marker,
//   PROVIDER_GOOGLE,
//   Region,
//   Polyline,
// } from "react-native-maps";
// import * as Location from "expo-location";
// import { TranslatedText } from "@/components/ui/TranslatedText";
// import { MockDataService } from "@/services/mockDataService";
// import type { AllDataStructure } from "@/types/homeTypes";
// import {
//   MapPin,
//   ArrowLeft,
//   Search,
//   Navigation2,
//   Locate,
//   RotateCcw,
//   Menu,
//   X,
//   Route,
//   ArrowUpRight,
// } from "lucide-react-native";

// interface DirectionStep {
//   latitude: number;
//   longitude: number;
// }

// export default function ExploreNavigateScreen() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredLocations, setFilteredLocations] = useState<
//     AllDataStructure[]
//   >([]);
//   const [allLocations, setAllLocations] = useState<AllDataStructure[]>([]);
//   const [, setSelectedLocation] = useState<AllDataStructure | null>(null);
//   const [destinationLocation, setDestinationLocation] =
//     useState<AllDataStructure | null>(null);
//   const [isSearching, setIsSearching] = useState(false);
//   const [userLocation, setUserLocation] =
//     useState<Location.LocationObject | null>(null);
//   const [mapRegion, setMapRegion] = useState<Region>({
//     latitude: 39.5501,
//     longitude: -105.7821,
//     latitudeDelta: 2.5,
//     longitudeDelta: 2.5,
//   });
//   const [routeCoordinates, setRouteCoordinates] = useState<DirectionStep[]>([]);
//   const [isNavigating, setIsNavigating] = useState(false);
//   const [navigationDistance, setNavigationDistance] = useState<string>("");
//   const [navigationDuration, setNavigationDuration] = useState<string>("");
//   const [currentAddress, setCurrentAddress] = useState<string>(
//     "Getting your location..."
//   );
//   const mapRef = useRef<MapView>(null);

//   // Load unified data on component mount
//   useEffect(() => {
//     const loadLocations = async () => {
//       try {
//         const locations = await MockDataService.getMapLocations();
//         setAllLocations(locations);
//         setFilteredLocations(locations);

//         // Set default selected location (first featured location)
//         const defaultLocation =
//           locations.find((loc) => loc.isFeatured) || locations[0];
//         if (defaultLocation) {
//           setSelectedLocation(defaultLocation);
//         }
//       } catch (error) {
//         console.error("Error loading locations:", error);
//         Alert.alert("Error", "Unable to load locations");
//       }
//     };

//     loadLocations();
//   }, []);

//   // Request location permissions and get user location
//   useEffect(() => {
//     const getUserLocation = async () => {
//       try {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== "granted") {
//           Alert.alert(
//             "Location Permission",
//             "Permission to access location was denied. Some features may not work properly."
//           );
//           return;
//         }

//         let location = await Location.getCurrentPositionAsync({
//           accuracy: Location.Accuracy.High,
//         });
//         setUserLocation(location);

//         // Get current address
//         try {
//           const reverseGeocode = await Location.reverseGeocodeAsync({
//             latitude: location.coords.latitude,
//             longitude: location.coords.longitude,
//           });

//           if (reverseGeocode.length > 0) {
//             const address = reverseGeocode[0];
//             const formattedAddress =
//               `${address.streetNumber || ""} ${address.street || ""}, ${address.city || ""} ${address.postalCode || ""}`.trim();
//             setCurrentAddress(formattedAddress || "Current Location");
//           }
//         } catch (error) {
//           console.error("Error getting address:", error);
//           setCurrentAddress("Current Location");
//         }
//       } catch (error) {
//         console.error("Error getting location:", error);
//         setCurrentAddress("Location unavailable");
//         Alert.alert("Error", "Unable to get your current location");
//       }
//     };

//     getUserLocation();
//   }, []);

//   // Filter locations based on search query
//   useEffect(() => {
//     const filterLocations = async () => {
//       if (searchQuery.trim() === "") {
//         setFilteredLocations(allLocations);
//       } else {
//         try {
//           const searchResults =
//             await MockDataService.searchContent(searchQuery);
//           const allResults = [
//             ...searchResults.locations,
//             ...searchResults.recommendations,
//             ...searchResults.hiking,
//             ...searchResults.travels,
//           ];

//           // Remove duplicates based on ID
//           const uniqueResults = allResults.filter(
//             (item, index, self) =>
//               self.findIndex((t) => t.id === item.id) === index
//           );

//           setFilteredLocations(uniqueResults);
//         } catch (error) {
//           console.error("Error searching locations:", error);
//           setFilteredLocations([]);
//         }
//       }
//     };

//     filterLocations();
//   }, [searchQuery, allLocations]);

//   // Calculate distance between two points
//   const calculateDistance = (
//     lat1: number,
//     lon1: number,
//     lat2: number,
//     lon2: number
//   ): number => {
//     return MockDataService.calculateDistance(lat1, lon1, lat2, lon2);
//   };

//   // Generate mock route coordinates
//   const generateRouteCoordinates = (
//     start: { latitude: number; longitude: number },
//     end: { latitude: number; longitude: number }
//   ): DirectionStep[] => {
//     const steps = 20;
//     const coordinates: DirectionStep[] = [];

//     for (let i = 0; i <= steps; i++) {
//       const ratio = i / steps;
//       // Add some curve to the route to make it look more realistic
//       const curveFactor = Math.sin(ratio * Math.PI) * 0.01;
//       const latitude =
//         start.latitude + (end.latitude - start.latitude) * ratio + curveFactor;
//       const longitude =
//         start.longitude +
//         (end.longitude - start.longitude) * ratio +
//         curveFactor;
//       coordinates.push({ latitude, longitude });
//     }

//     return coordinates;
//   };

//   const handleLocationSelect = (location: AllDataStructure) => {
//     setDestinationLocation(location);
//     setSelectedLocation(location);
//     setIsSearching(false);
//     setSearchQuery("");

//     // Animate to selected location
//     if (location.latitude && location.longitude) {
//       const newRegion = {
//         latitude: location.latitude,
//         longitude: location.longitude,
//         latitudeDelta: 0.05,
//         longitudeDelta: 0.05,
//       };
//       setMapRegion(newRegion);
//       mapRef.current?.animateToRegion(newRegion, 1000);
//     }
//   };

//   const handleSetDirection = async () => {
//     if (!destinationLocation || !userLocation) {
//       Alert.alert(
//         "Location Required",
//         "Please select a destination and make sure location services are enabled."
//       );
//       return;
//     }

//     if (!destinationLocation.latitude || !destinationLocation.longitude) {
//       Alert.alert(
//         "Error",
//         "Selected destination doesn't have valid coordinates."
//       );
//       return;
//     }

//     try {
//       setIsNavigating(true);

//       const start = {
//         latitude: userLocation.coords.latitude,
//         longitude: userLocation.coords.longitude,
//       };

//       const end = {
//         latitude: destinationLocation.latitude,
//         longitude: destinationLocation.longitude,
//       };

//       // Generate route coordinates
//       const route = generateRouteCoordinates(start, end);
//       setRouteCoordinates(route);

//       // Calculate distance and estimated duration
//       const distance = calculateDistance(
//         start.latitude,
//         start.longitude,
//         end.latitude,
//         end.longitude
//       );

//       setNavigationDistance(`${distance.toFixed(1)} km`);
//       setNavigationDuration(`${Math.round(distance * 1.2)} min`);

//       // Fit the route in view
//       const coordinates = [start, end];
//       mapRef.current?.fitToCoordinates(coordinates, {
//         edgePadding: {
//           top: 100,
//           right: 50,
//           bottom: 400,
//           left: 50,
//         },
//         animated: true,
//       });

//       Alert.alert(
//         "Navigation Started",
//         `Route to ${destinationLocation.name}: ${distance.toFixed(1)} km, estimated ${Math.round(distance * 1.2)} minutes`
//       );
//     } catch (error) {
//       console.error("Error calculating route:", error);
//       Alert.alert("Error", "Unable to calculate route");
//       setIsNavigating(false);
//     }
//   };

//   const handleStopNavigation = () => {
//     setIsNavigating(false);
//     setRouteCoordinates([]);
//     setNavigationDistance("");
//     setNavigationDuration("");

//     // Return to Colorado overview
//     const defaultRegion = {
//       latitude: 39.5501,
//       longitude: -105.7821,
//       latitudeDelta: 2.5,
//       longitudeDelta: 2.5,
//     };
//     setMapRegion(defaultRegion);
//     mapRef.current?.animateToRegion(defaultRegion, 1000);
//   };

//   const handleMyLocation = async () => {
//     try {
//       let location = userLocation;

//       if (!location) {
//         location = await Location.getCurrentPositionAsync({
//           accuracy: Location.Accuracy.High,
//         });
//         setUserLocation(location);
//       }

//       const newRegion = {
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.02,
//         longitudeDelta: 0.02,
//       };
//       setMapRegion(newRegion);
//       mapRef.current?.animateToRegion(newRegion, 1000);
//     } catch (error) {
//       console.error("Error getting location:", error);
//       Alert.alert("Error", "Unable to get your current location");
//     }
//   };

//   const handleResetView = () => {
//     const defaultRegion = {
//       latitude: 39.5501,
//       longitude: -105.7821,
//       latitudeDelta: 2.5,
//       longitudeDelta: 2.5,
//     };
//     setMapRegion(defaultRegion);
//     mapRef.current?.animateToRegion(defaultRegion, 1000);
//     setIsNavigating(false);
//     setRouteCoordinates([]);
//   };

//   const handleMarkerPress = (location: AllDataStructure) => {
//     setDestinationLocation(location);
//     setSelectedLocation(location);
//     if (location.latitude && location.longitude) {
//       const newRegion = {
//         latitude: location.latitude,
//         longitude: location.longitude,
//         latitudeDelta: 0.05,
//         longitudeDelta: 0.05,
//       };
//       setMapRegion(newRegion);
//       mapRef.current?.animateToRegion(newRegion, 1000);
//     }
//   };

//   const renderLocationItem = ({ item }: { item: AllDataStructure }) => (
//     <TouchableOpacity
//       onPress={() => handleLocationSelect(item)}
//       className="p-4 border-b border-gray-100 bg-white"
//       style={styles.locationItem}
//       activeOpacity={0.7}
//     >
//       <View className="flex-row items-start">
//         <View className="bg-green-100 p-2 rounded-lg mr-3">
//           <MapPin size={16} color="#22c55e" />
//         </View>
//         <View className="flex-1">
//           <Text
//             className="font-semibold text-black text-base"
//             numberOfLines={1}
//           >
//             {item.name || item.title}
//           </Text>
//           <Text className="text-sm text-gray-600 mt-1" numberOfLines={2}>
//             {item.address || item.location}
//           </Text>
//           {item.description && (
//             <Text className="text-xs text-gray-500 mt-1" numberOfLines={1}>
//               {item.description}
//             </Text>
//           )}
//           <View className="flex-row items-center justify-between mt-2">
//             <Text className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
//               {item.type}
//             </Text>
//             {item.rating && (
//               <View className="flex-row items-center">
//                 <Text className="text-xs text-orange-500 mr-1">★</Text>
//                 <Text className="text-xs text-gray-600">{item.rating}</Text>
//               </View>
//             )}
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
//       <StatusBar barStyle="dark-content" backgroundColor="white" />

//       {/* Map Container */}
//       <View className="flex-1" style={styles.mapContainer}>
//         <MapView
//           ref={mapRef}
//           provider={PROVIDER_GOOGLE}
//           style={styles.map}
//           region={mapRegion}
//           onRegionChangeComplete={setMapRegion}
//           showsUserLocation={true}
//           showsMyLocationButton={false}
//           showsCompass={false}
//           showsScale={false}
//           showsBuildings={true}
//           showsTraffic={false}
//           loadingEnabled={true}
//           mapType="standard"
//           onPress={() => setIsSearching(false)}
//         >
//           {/* Location Markers */}
//           {allLocations.map((location) => (
//             <Marker
//               key={location.id}
//               coordinate={{
//                 latitude: location.latitude || 0,
//                 longitude: location.longitude || 0,
//               }}
//               title={location.name || location.title}
//               description={location.description || location.address}
//               onPress={() => handleMarkerPress(location)}
//               pinColor={
//                 destinationLocation?.id === location.id ? "#BF0600" : "#BF0600"
//               }
//             />
//           ))}

//           {/* Route Polyline */}
//           {routeCoordinates.length > 0 && (
//             <Polyline
//               coordinates={routeCoordinates}
//               strokeWidth={6}
//               strokeColor="#22c55e"
//               lineJoin="round"
//               lineCap="round"
//             />
//           )}
//         </MapView>

//         {/* Header - Transparent overlay on top of map */}
//         <View style={styles.headerOverlay}>
//           <View className="flex-row items-center justify-between mb-4">
//             <TouchableOpacity
//               onPress={() => router.back()}
//               className="p-2 bg-white rounded-full shadow-md"
//             >
//               <ArrowLeft size={24} color="#1f2937" />
//             </TouchableOpacity>
//             <Text className="text-gray-900 text-lg font-semibold">
//               <TranslatedText>Navigate</TranslatedText>
//             </Text>
//             <TouchableOpacity className="p-2 bg-white rounded-full shadow-md">
//               <Menu size={24} color="#1f2937" />
//             </TouchableOpacity>
//           </View>

//           {/* Search Bar */}
//           <View className="bg-white rounded-lg flex-row items-center px-3 py-3 shadow-sm border border-gray-200">
//             <Search size={20} color="#666" />
//             <TextInput
//               className="flex-1 ml-3 text-black"
//               placeholder="Search destinations..."
//               placeholderTextColor="#999"
//               value={searchQuery}
//               onChangeText={setSearchQuery}
//               onFocus={() => setIsSearching(true)}
//               style={styles.searchInput}
//             />
//             {searchQuery.length > 0 && (
//               <TouchableOpacity onPress={() => setSearchQuery("")}>
//                 <X size={20} color="#666" />
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>

//         {/* Search Results Overlay */}
//         {isSearching && (
//           <View style={styles.searchResults}>
//             <FlatList
//               data={filteredLocations}
//               keyExtractor={(item) => item.id}
//               renderItem={renderLocationItem}
//               showsVerticalScrollIndicator={false}
//               ListEmptyComponent={
//                 <View className="p-4">
//                   <Text className="text-gray-500 text-center">
//                     <TranslatedText>No locations found</TranslatedText>
//                   </Text>
//                 </View>
//               }
//             />
//           </View>
//         )}

//         {/* Map Controls */}
//         <View style={styles.mapControls}>
//           <TouchableOpacity
//             onPress={handleMyLocation}
//             className="bg-white p-3 rounded-full shadow-lg border border-gray-200 mb-3"
//             style={styles.controlButton}
//           >
//             <Locate size={20} color="#22c55e" />
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={handleResetView}
//             className="bg-white p-3 rounded-full shadow-lg border border-gray-200"
//             style={styles.controlButton}
//           >
//             <RotateCcw size={20} color="#22c55e" />
//           </TouchableOpacity>
//         </View>

//         {/* Navigation Status */}
//         {isNavigating && (
//           <View style={styles.navigationStatus}>
//             <View className="bg-green-500 rounded-lg p-3 flex-row items-center justify-between shadow-lg">
//               <View className="flex-row items-center flex-1">
//                 <Route size={16} color="white" />
//                 <View className="ml-2">
//                   <Text className="text-white font-semibold text-sm">
//                     Navigating to {destinationLocation?.name}
//                   </Text>
//                   <Text className="text-green-100 text-xs">
//                     {navigationDistance} • {navigationDuration}
//                   </Text>
//                 </View>
//               </View>
//               <TouchableOpacity
//                 onPress={handleStopNavigation}
//                 className="bg-green-600 rounded p-2 ml-2"
//               >
//                 <X size={16} color="white" />
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}

//         {/* Bottom Navigation Card - Matching the image design */}
//         <View style={styles.bottomCard}>
//           <View className="bg-white rounded-t-3xl px-4 pt-6 pb-8 shadow-2xl">
//             {/* Current Location with orange pin */}
//             <View className="flex-row items-center mb-4 p-3 bg-gray-50 rounded-lg">
//               <View className="bg-orange-500 p-2 rounded-full mr-3">
//                 <MapPin size={16} color="white" />
//               </View>
//               <Text
//                 className="flex-1 text-gray-900 font-medium"
//                 numberOfLines={1}
//               >
//                 {currentAddress}
//               </Text>
//             </View>

//             {/* Destination with green pin */}
//             <TouchableOpacity
//               onPress={() => setIsSearching(true)}
//               className="flex-row items-center mb-6 p-3 border border-gray-200 rounded-lg"
//             >
//               <View className="bg-green-500 p-2 rounded-full mr-3">
//                 <MapPin size={16} color="white" />
//               </View>
//               <View className="flex-1">
//                 {destinationLocation ? (
//                   <Text className="text-gray-900 font-medium" numberOfLines={1}>
//                     {destinationLocation.name || destinationLocation.title}
//                   </Text>
//                 ) : (
//                   <Text className="text-gray-500">
//                     <TranslatedText>Destination</TranslatedText>
//                   </Text>
//                 )}
//               </View>
//               <ArrowUpRight size={20} color="#666" />
//             </TouchableOpacity>

//             {/* Set Direction Button */}
//             <TouchableOpacity
//               onPress={handleSetDirection}
//               disabled={!destinationLocation || !userLocation}
//               className={`rounded-xl py-4 flex-row items-center justify-center ${
//                 destinationLocation && userLocation
//                   ? "bg-green-500"
//                   : "bg-gray-300"
//               }`}
//               style={styles.setDirectionButton}
//             >
//               <Navigation2 size={20} color="white" />
//               <Text className="text-white font-semibold text-lg ml-2">
//                 <TranslatedText>Set Direction</TranslatedText>
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   mapContainer: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
//   headerOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     paddingTop: 16,
//     paddingBottom: 16,
//     paddingHorizontal: 16,
//     backgroundColor: "rgba(255, 255, 255, 0.95)",
//     zIndex: 1000,
//   },
//   searchInput: {
//     fontSize: 16,
//   },
//   searchResults: {
//     position: "absolute",
//     top: 140,
//     left: 16,
//     right: 16,
//     maxHeight: 300,
//     backgroundColor: "white",
//     borderRadius: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.15,
//     shadowRadius: 8,
//     elevation: 8,
//     zIndex: 999,
//   },
//   locationItem: {
//     borderLeftWidth: 3,
//     borderLeftColor: "#22c55e",
//   },
//   mapControls: {
//     position: "absolute",
//     right: 16,
//     top: 200,
//     zIndex: 998,
//   },
//   controlButton: {
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   navigationStatus: {
//     position: "absolute",
//     top: 160,
//     left: 16,
//     right: 16,
//     elevation: 5,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     zIndex: 997,
//   },
//   bottomCard: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     elevation: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -4 },
//     shadowOpacity: 0.15,
//     shadowRadius: 10,
//   },
//   setDirectionButton: {
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
// });

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
import { MockDataService } from "@/services/mockDataService";
import type { AllDataStructure } from "@/types/homeTypes";
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
  ArrowUpRight,
} from "lucide-react-native";

// Import custom pin images
const pinRegular = require("@/assets/images/pin_green.png"); // Green pin (#22c55e) with transparent center
const pinDestination = require("@/assets/images/pin_regular.png"); // Red pin (#BF0600) with transparent center

interface DirectionStep {
  latitude: number;
  longitude: number;
}

export default function ExploreNavigateScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLocations, setFilteredLocations] = useState<
    AllDataStructure[]
  >([]);
  const [allLocations, setAllLocations] = useState<AllDataStructure[]>([]);
  const [, setSelectedLocation] = useState<AllDataStructure | null>(null);
  const [destinationLocation, setDestinationLocation] =
    useState<AllDataStructure | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [userLocation, setUserLocation] =
    useState<Location.LocationObject | null>(null);
  const [mapRegion, setMapRegion] = useState<Region>({
    latitude: 39.5501,
    longitude: -105.7821,
    latitudeDelta: 2.5,
    longitudeDelta: 2.5,
  });
  const [routeCoordinates, setRouteCoordinates] = useState<DirectionStep[]>([]);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigationDistance, setNavigationDistance] = useState<string>("");
  const [navigationDuration, setNavigationDuration] = useState<string>("");
  const [currentAddress, setCurrentAddress] = useState<string>(
    "Getting your location..."
  );
  const mapRef = useRef<MapView>(null);

  // Load unified data on component mount
  useEffect(() => {
    const loadLocations = async () => {
      try {
        const locations = await MockDataService.getMapLocations();
        setAllLocations(locations);
        setFilteredLocations(locations);

        // Set default selected location (first featured location)
        const defaultLocation =
          locations.find((loc) => loc.isFeatured) || locations[0];
        if (defaultLocation) {
          setSelectedLocation(defaultLocation);
        }
      } catch (error) {
        console.error("Error loading locations:", error);
        Alert.alert("Error", "Unable to load locations");
      }
    };

    loadLocations();
  }, []);

  // Request location permissions and get user location
  useEffect(() => {
    const getUserLocation = async () => {
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

        // Get current address
        try {
          const reverseGeocode = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });

          if (reverseGeocode.length > 0) {
            const address = reverseGeocode[0];
            const formattedAddress =
              `${address.streetNumber || ""} ${address.street || ""}, ${address.city || ""} ${address.postalCode || ""}`.trim();
            setCurrentAddress(formattedAddress || "Current Location");
          }
        } catch (error) {
          console.error("Error getting address:", error);
          setCurrentAddress("Current Location");
        }
      } catch (error) {
        console.error("Error getting location:", error);
        setCurrentAddress("Location unavailable");
        Alert.alert("Error", "Unable to get your current location");
      }
    };

    getUserLocation();
  }, []);

  // Filter locations based on search query
  useEffect(() => {
    const filterLocations = async () => {
      if (searchQuery.trim() === "") {
        setFilteredLocations(allLocations);
      } else {
        try {
          const searchResults =
            await MockDataService.searchContent(searchQuery);
          const allResults = [
            ...searchResults.locations,
            ...searchResults.recommendations,
            ...searchResults.hiking,
            ...searchResults.travels,
          ];

          // Remove duplicates based on ID
          const uniqueResults = allResults.filter(
            (item, index, self) =>
              self.findIndex((t) => t.id === item.id) === index
          );

          setFilteredLocations(uniqueResults);
        } catch (error) {
          console.error("Error searching locations:", error);
          setFilteredLocations([]);
        }
      }
    };

    filterLocations();
  }, [searchQuery, allLocations]);

  // Calculate distance between two points
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    return MockDataService.calculateDistance(lat1, lon1, lat2, lon2);
  };

  // Generate mock route coordinates
  const generateRouteCoordinates = (
    start: { latitude: number; longitude: number },
    end: { latitude: number; longitude: number }
  ): DirectionStep[] => {
    const steps = 20;
    const coordinates: DirectionStep[] = [];

    for (let i = 0; i <= steps; i++) {
      const ratio = i / steps;
      // Add some curve to the route to make it look more realistic
      const curveFactor = Math.sin(ratio * Math.PI) * 0.01;
      const latitude =
        start.latitude + (end.latitude - start.latitude) * ratio + curveFactor;
      const longitude =
        start.longitude +
        (end.longitude - start.longitude) * ratio +
        curveFactor;
      coordinates.push({ latitude, longitude });
    }

    return coordinates;
  };

  const handleLocationSelect = (location: AllDataStructure) => {
    setDestinationLocation(location);
    setSelectedLocation(location);
    setIsSearching(false);
    setSearchQuery("");

    // Animate to selected location
    if (location.latitude && location.longitude) {
      const newRegion = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
      setMapRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 1000);
    }
  };

  const handleSetDirection = async () => {
    if (!destinationLocation || !userLocation) {
      Alert.alert(
        "Location Required",
        "Please select a destination and make sure location services are enabled."
      );
      return;
    }

    if (!destinationLocation.latitude || !destinationLocation.longitude) {
      Alert.alert(
        "Error",
        "Selected destination doesn't have valid coordinates."
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
        latitude: destinationLocation.latitude,
        longitude: destinationLocation.longitude,
      };

      // Generate route coordinates
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
      setNavigationDuration(`${Math.round(distance * 1.2)} min`);

      // Fit the route in view
      const coordinates = [start, end];
      mapRef.current?.fitToCoordinates(coordinates, {
        edgePadding: {
          top: 100,
          right: 50,
          bottom: 400,
          left: 50,
        },
        animated: true,
      });

      Alert.alert(
        "Navigation Started",
        `Route to ${destinationLocation.name}: ${distance.toFixed(1)} km, estimated ${Math.round(distance * 1.2)} minutes`
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

    // Return to Colorado overview
    const defaultRegion = {
      latitude: 39.5501,
      longitude: -105.7821,
      latitudeDelta: 2.5,
      longitudeDelta: 2.5,
    };
    setMapRegion(defaultRegion);
    mapRef.current?.animateToRegion(defaultRegion, 1000);
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
      console.error("Error getting location:", error);
      Alert.alert("Error", "Unable to get your current location");
    }
  };

  const handleResetView = () => {
    const defaultRegion = {
      latitude: 39.5501,
      longitude: -105.7821,
      latitudeDelta: 2.5,
      longitudeDelta: 2.5,
    };
    setMapRegion(defaultRegion);
    mapRef.current?.animateToRegion(defaultRegion, 1000);
    setIsNavigating(false);
    setRouteCoordinates([]);
  };

  const handleMarkerPress = (location: AllDataStructure) => {
    setDestinationLocation(location);
    setSelectedLocation(location);
    if (location.latitude && location.longitude) {
      const newRegion = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
      setMapRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 1000);
    }
  };

  const renderLocationItem = ({ item }: { item: AllDataStructure }) => (
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
            {item.name || item.title}
          </Text>
          <Text className="text-sm text-gray-600 mt-1" numberOfLines={2}>
            {item.address || item.location}
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
      <StatusBar barStyle="dark-content" backgroundColor="white" />

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
          showsScale={false}
          showsBuildings={true}
          showsTraffic={false}
          loadingEnabled={true}
          mapType="standard"
          onPress={() => setIsSearching(false)}
        >
          {/* Location Markers with Custom Images */}
          {allLocations.map((location) => (
            <Marker
              key={location.id}
              coordinate={{
                latitude: location.latitude || 0,
                longitude: location.longitude || 0,
              }}
              title={location.name || location.title}
              description={location.description || location.address}
              onPress={() => handleMarkerPress(location)}
              image={
                destinationLocation?.id === location.id
                  ? pinDestination // #BF0600 with transparent center for destination
                  : pinRegular // #22c55e with transparent center for others
              }
            />
          ))}

          {/* Route Polyline */}
          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeWidth={6}
              strokeColor="#22c55e"
              lineJoin="round"
              lineCap="round"
            />
          )}
        </MapView>

        {/* Header - Transparent overlay on top of map */}
        <View style={styles.headerOverlay}>
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2 bg-white rounded-full shadow-md"
            >
              <ArrowLeft size={24} color="#1f2937" />
            </TouchableOpacity>
            <Text className="text-gray-900 text-lg font-semibold">
              <TranslatedText>Navigate</TranslatedText>
            </Text>
            <TouchableOpacity className="p-2 bg-white rounded-full shadow-md">
              <Menu size={24} color="#1f2937" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="bg-white rounded-lg flex-row items-center px-3 py-3 shadow-sm border border-gray-200">
            <Search size={20} color="#666" />
            <TextInput
              className="flex-1 ml-3 text-black"
              placeholder="Search destinations..."
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

        {/* Search Results Overlay */}
        {isSearching && (
          <View style={styles.searchResults}>
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
        <View style={styles.mapControls}>
          <TouchableOpacity
            onPress={handleMyLocation}
            className="bg-white p-3 rounded-full shadow-lg border border-gray-200 mb-3"
            style={styles.controlButton}
          >
            <Locate size={20} color="#22c55e" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleResetView}
            className="bg-white p-3 rounded-full shadow-lg border border-gray-200"
            style={styles.controlButton}
          >
            <RotateCcw size={20} color="#22c55e" />
          </TouchableOpacity>
        </View>

        {/* Navigation Status */}
        {isNavigating && (
          <View style={styles.navigationStatus}>
            <View className="bg-green-500 rounded-lg p-3 flex-row items-center justify-between shadow-lg">
              <View className="flex-row items-center flex-1">
                <Route size={16} color="white" />
                <View className="ml-2">
                  <Text className="text-white font-semibold text-sm">
                    Navigating to {destinationLocation?.name}
                  </Text>
                  <Text className="text-green-100 text-xs">
                    {navigationDistance} • {navigationDuration}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={handleStopNavigation}
                className="bg-green-600 rounded p-2 ml-2"
              >
                <X size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Bottom Navigation Card - Matching the image design */}
        <View style={styles.bottomCard}>
          <View className="bg-white rounded-t-3xl px-4 pt-6 pb-8 shadow-2xl">
            {/* Current Location with orange pin */}
            <View className="flex-row items-center mb-4 p-3 bg-gray-50 rounded-lg">
              <View className="bg-orange-500 p-2 rounded-full mr-3">
                <MapPin size={16} color="white" />
              </View>
              <Text
                className="flex-1 text-gray-900 font-medium"
                numberOfLines={1}
              >
                {currentAddress}
              </Text>
            </View>

            {/* Destination with green pin */}
            <TouchableOpacity
              onPress={() => setIsSearching(true)}
              className="flex-row items-center mb-6 p-3 border border-gray-200 rounded-lg"
            >
              <View className="bg-green-500 p-2 rounded-full mr-3">
                <MapPin size={16} color="white" />
              </View>
              <View className="flex-1">
                {destinationLocation ? (
                  <Text className="text-gray-900 font-medium" numberOfLines={1}>
                    {destinationLocation.name || destinationLocation.title}
                  </Text>
                ) : (
                  <Text className="text-gray-500">
                    <TranslatedText>Destination</TranslatedText>
                  </Text>
                )}
              </View>
              <ArrowUpRight size={20} color="#666" />
            </TouchableOpacity>

            {/* Set Direction Button */}
            <TouchableOpacity
              onPress={handleSetDirection}
              disabled={!destinationLocation || !userLocation}
              className={`rounded-xl py-4 flex-row items-center justify-center ${
                destinationLocation && userLocation
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
              style={styles.setDirectionButton}
            >
              <Navigation2 size={20} color="white" />
              <Text className="text-white font-semibold text-lg ml-2">
                <TranslatedText>Set Direction</TranslatedText>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    zIndex: 1000,
  },
  searchInput: {
    fontSize: 16,
  },
  searchResults: {
    position: "absolute",
    top: 140,
    left: 16,
    right: 16,
    maxHeight: 300,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 999,
  },
  locationItem: {
    borderLeftWidth: 3,
    borderLeftColor: "#22c55e",
  },
  mapControls: {
    position: "absolute",
    right: 16,
    top: 200,
    zIndex: 998,
  },
  controlButton: {
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  navigationStatus: {
    position: "absolute",
    top: 160,
    left: 16,
    right: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    zIndex: 997,
  },
  bottomCard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  setDirectionButton: {
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});
