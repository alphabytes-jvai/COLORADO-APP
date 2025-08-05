// services/mockDataService.ts
import type { AllDataStructure } from "@/types/homeTypes";

export class MockDataService {
  // Unified data store for all sections with enhanced offline support
  private static getUnifiedData(): AllDataStructure[] {
    return [
      {
        id: "item-1",
        title: "Rocky Mountain Adventure",
        name: "Rocky Mountain National Park",
        address: "1000 US Hwy 36, Estes Park, CO 80517",
        location: "Estes Park",
        latitude: 40.3428,
        longitude: -105.6836,
        eventCount: 12,
        type: "National Park",
        description: "Breathtaking mountain vistas and wildlife viewing",
        rating: 4.8,
        dateRange: "Year-round",
        images: [
          require("@/assets/images/hero1.png"),
          require("@/assets/recommend/recommend1.png"),
        ],
        isFeatured: true,
        phone: "(970) 586-1206",
        socialLinks: {
          facebook: "https://facebook.com/rockymountainnp",
          instagram: "https://instagram.com/rockynps",
          twitter: "https://twitter.com/rockynps",
          youtube: "https://youtube.com/rockymountainnp",
        },
        openingHours: "24 hours",
        priceLevel: 2,
        categories: [
          "Hiking",
          "Wildlife Viewing",
          "Photography",
          "Camping",
          "Nature",
        ],
        offlineSupported: true,
        offlineData: {
          mapTiles: true,
          detailsAvailable: true,
          navigationSupported: true,
        },
      },
      {
        id: "item-2",
        title: "Garden of the Gods Exploration",
        name: "Garden of the Gods",
        address: "1805 N 30th St, Colorado Springs, CO 80904",
        location: "Colorado Springs",
        latitude: 38.8719,
        longitude: -104.8761,
        eventCount: 10,
        type: "Park",
        description: "Stunning red rock formations and scenic trails",
        rating: 4.9,
        dateRange: "Year-round",
        images: [
          require("@/assets/recommend/recommend2.png"),
          require("@/assets/explores/explore1.png"),
        ],
        isFeatured: true,
        phone: "(719) 634-6666",
        socialLinks: {
          facebook: "https://facebook.com/gardenofthegods",
          instagram: "https://instagram.com/gardenofthegods",
          twitter: "https://twitter.com/gardenofthegods",
        },
        openingHours: "5:00 AM - 11:00 PM",
        priceLevel: 1,
        categories: [
          "Hiking",
          "Photography",
          "Free Admission",
          "Visitor Center",
          "Guided Tours",
        ],
        offlineSupported: true,
        offlineData: {
          mapTiles: true,
          detailsAvailable: true,
          navigationSupported: true,
        },
      },
      {
        id: "item-3",
        title: "Red Rocks Concert Experience",
        name: "Red Rocks Amphitheatre",
        address: "18300 W Alameda Pkwy, Morrison, CO 80465",
        location: "Morrison",
        latitude: 39.6654,
        longitude: -105.2057,
        eventCount: 15,
        type: "Entertainment",
        description: "Iconic outdoor concert venue with stunning acoustics",
        rating: 4.7,
        dateRange: "Seasonal",
        images: [
          require("@/assets/recommend/recommend3.png"),
          require("@/assets/explores/explore2.png"),
        ],
        isFeatured: true,
        phone: "(720) 865-2494",
        socialLinks: {
          facebook: "https://facebook.com/redrocksamphitheatre",
          instagram: "https://instagram.com/redrocksamphitheatre",
          twitter: "https://twitter.com/redrocks",
        },
        openingHours: "Varies by event",
        priceLevel: 3,
        categories: ["Concerts", "Hiking", "Museum", "Events", "Photography"],
        offlineSupported: true,
        offlineData: {
          mapTiles: true,
          detailsAvailable: true,
          navigationSupported: true,
        },
      },
      {
        id: "item-4",
        title: "Mesa Verde Cultural Journey",
        name: "Mesa Verde National Park",
        address: "Mesa Verde National Park, CO 81330",
        location: "Mesa Verde",
        latitude: 37.2308,
        longitude: -108.4618,
        eventCount: 8,
        type: "National Park",
        description: "Explore ancient cliff dwellings and archaeological sites",
        rating: 4.6,
        dateRange: "Year-round",
        images: [
          require("@/assets/recommend/recommend4.png"),
          require("@/assets/images/hero2.png"),
        ],
        isFeatured: false,
        phone: "(970) 529-4465",
        socialLinks: {
          facebook: "https://facebook.com/mesaverdenps",
          instagram: "https://instagram.com/mesaverdenps",
          twitter: "https://twitter.com/mesaverdenps",
        },
        openingHours: "8:00 AM - 5:00 PM",
        priceLevel: 2,
        categories: [
          "History",
          "Archaeology",
          "Guided Tours",
          "Museum",
          "Hiking",
        ],
        offlineSupported: true,
        offlineData: {
          mapTiles: true,
          detailsAvailable: true,
          navigationSupported: true,
        },
      },
      {
        id: "item-5",
        title: "Pikes Peak Summit Adventure",
        name: "Pikes Peak",
        address: "Pikes Peak, Colorado Springs, CO",
        location: "Colorado Springs",
        latitude: 38.8405,
        longitude: -105.0442,
        eventCount: 10,
        type: "Mountain",
        description: "Summit America's Mountain for panoramic views",
        rating: 4.8,
        dateRange: "Seasonal",
        images: [
          require("@/assets/recommend/recommend5.png"),
          require("@/assets/explores/explore3.png"),
        ],
        isFeatured: true,
        phone: "(719) 385-7325",
        socialLinks: {
          facebook: "https://facebook.com/pikespeak",
          instagram: "https://instagram.com/pikespeak",
          twitter: "https://twitter.com/pikespeak",
        },
        openingHours: "Seasonal hours vary",
        priceLevel: 3,
        categories: [
          "Hiking",
          "Photography",
          "Cog Railway",
          "Scenic Drive",
          "Adventure",
        ],
        offlineSupported: true,
        offlineData: {
          mapTiles: true,
          detailsAvailable: true,
          navigationSupported: true,
        },
      },
      {
        id: "item-6",
        title: "Great Sand Dunes Exploration",
        name: "Great Sand Dunes National Park",
        address: "11999 State Highway 150, Mosca, CO 81146",
        location: "Mosca",
        latitude: 37.7916,
        longitude: -105.5943,
        eventCount: 7,
        type: "National Park",
        description: "Experience North America's tallest sand dunes",
        rating: 4.5,
        dateRange: "Year-round",
        images: [
          require("@/assets/recommend/recommend6.png"),
          require("@/assets/explores/explore4.png"),
        ],
        isFeatured: false,
        phone: "(719) 378-6395",
        socialLinks: {
          facebook: "https://facebook.com/greatsanddunesnps",
          instagram: "https://instagram.com/greatsanddunesnps",
          twitter: "https://twitter.com/greatsanddunesnps",
        },
        openingHours: "24 hours",
        priceLevel: 2,
        categories: [
          "Sand Surfing",
          "Hiking",
          "Camping",
          "Stargazing",
          "Photography",
        ],
        offlineSupported: true,
        offlineData: {
          mapTiles: true,
          detailsAvailable: true,
          navigationSupported: true,
        },
      },
      {
        id: "item-7",
        title: "Black Canyon Exploration",
        name: "Black Canyon of the Gunnison",
        address: "1 Hwy 347, Montrose, CO 81401",
        location: "Montrose",
        latitude: 38.5753,
        longitude: -107.7416,
        eventCount: 6,
        type: "National Park",
        description: "Discover dramatic canyon walls and geological wonders",
        rating: 4.4,
        dateRange: "Year-round",
        images: [
          require("@/assets/recommend/recommend7.png"),
          require("@/assets/images/hero3.png"),
        ],
        isFeatured: false,
        phone: "(970) 249-1914",
        socialLinks: {
          facebook: "https://facebook.com/blackcanyonnps",
          instagram: "https://instagram.com/blackcanyonnps",
          twitter: "https://twitter.com/blackcanyonnps",
        },
        openingHours: "24 hours",
        priceLevel: 2,
        categories: [
          "Hiking",
          "Rock Climbing",
          "Scenic Drives",
          "Camping",
          "Photography",
        ],
        offlineSupported: true,
        offlineData: {
          mapTiles: true,
          detailsAvailable: true,
          navigationSupported: true,
        },
      },
      {
        id: "item-8",
        title: "Maroon Bells Scenic Tour",
        name: "Maroon Bells",
        address: "Maroon Creek Rd, Aspen, CO 81611",
        location: "Aspen",
        latitude: 39.0708,
        longitude: -106.989,
        eventCount: 9,
        type: "Mountain",
        description: "Most photographed peaks with alpine lakes",
        rating: 4.9,
        dateRange: "Seasonal",
        images: [
          require("@/assets/recommend/recommend8.png"),
          require("@/assets/explores/explore5.png"),
        ],
        isFeatured: true,
        phone: "(970) 925-3445",
        socialLinks: {
          facebook: "https://facebook.com/maroonbells",
          instagram: "https://instagram.com/maroonbells",
          twitter: "https://twitter.com/maroonbells",
        },
        openingHours: "Seasonal access",
        priceLevel: 2,
        categories: [
          "Photography",
          "Hiking",
          "Fishing",
          "Scenic Views",
          "Nature",
        ],
        offlineSupported: true,
        offlineData: {
          mapTiles: true,
          detailsAvailable: true,
          navigationSupported: true,
        },
      },
    ];
  }

  // Get explore data
  static getExploreData(): {
    hiking: AllDataStructure[];
    travels: AllDataStructure[];
  } {
    const data = this.getUnifiedData();
    return {
      hiking: data.filter(
        (item) =>
          item.categories?.includes("Hiking") ||
          item.type === "National Park" ||
          item.type === "Mountain"
      ),
      travels: data.filter(
        (item) =>
          item.categories?.includes("Photography") ||
          item.categories?.includes("Scenic Views") ||
          item.type === "Park"
      ),
    };
  }

  // Get enhanced recommendations
  static getEnhancedRecommendations(): AllDataStructure[] {
    return this.getUnifiedData().filter((item) => item.isFeatured);
  }

  // Get map locations with offline support
  static getMapLocations(): AllDataStructure[] {
    return this.getUnifiedData();
  }

  // Get offline-supported locations only
  static getOfflineSupportedLocations(): AllDataStructure[] {
    return this.getUnifiedData().filter((item) => item.offlineSupported);
  }

  // Get locations by offline region
  static getLocationsByOfflineRegion(regionId: string): AllDataStructure[] {
    const allLocations = this.getUnifiedData();

    // Define region boundaries and categorize locations
    const regionBoundaries: {
      [key: string]: (location: AllDataStructure) => boolean;
    } = {
      denver: (loc) => {
        const name = (loc.location || loc.name || "").toLowerCase();
        const address = (loc.address || "").toLowerCase();
        return (
          name.includes("denver") ||
          address.includes("denver") ||
          name.includes("boulder") ||
          name.includes("aurora") ||
          name.includes("lakewood") ||
          name.includes("morrison")
        );
      },
      "colorado-springs": (loc) => {
        const name = (loc.location || loc.name || "").toLowerCase();
        const address = (loc.address || "").toLowerCase();
        return (
          name.includes("colorado springs") ||
          address.includes("colorado springs") ||
          name.includes("manitou") ||
          name.includes("fountain") ||
          (loc.latitude &&
            loc.latitude >= 38.7 &&
            loc.latitude <= 39.0 &&
            loc.longitude &&
            loc.longitude >= -105.2 &&
            loc.longitude <= -104.6)
        );
      },
      "rocky-mountains": (loc) => {
        const name = (loc.location || loc.name || "").toLowerCase();
        const address = (loc.address || "").toLowerCase();
        return (
          name.includes("estes") ||
          name.includes("rocky mountain") ||
          name.includes("grand lake") ||
          address.includes("rocky mountain") ||
          (loc.latitude &&
            loc.latitude >= 40.1 &&
            loc.latitude <= 40.6 &&
            loc.longitude &&
            loc.longitude >= -106.0 &&
            loc.longitude <= -105.4)
        );
      },
      "western-colorado": (loc) => {
        const name = (loc.location || loc.name || "").toLowerCase();
        return (
          name.includes("aspen") ||
          name.includes("vail") ||
          name.includes("durango") ||
          name.includes("grand junction") ||
          name.includes("montrose") ||
          name.includes("gunnison") ||
          (loc.latitude &&
            loc.longitude &&
            loc.latitude >= 37.0 &&
            loc.latitude <= 40.8 &&
            loc.longitude >= -109.0 &&
            loc.longitude <= -106.0)
        );
      },
      "central-colorado": (loc) => {
        const name = (loc.location || loc.name || "").toLowerCase();
        return (
          name.includes("mesa verde") ||
          name.includes("mosca") ||
          name.includes("great sand dunes") ||
          (loc.latitude &&
            loc.longitude &&
            loc.latitude >= 37.0 &&
            loc.latitude <= 38.5 &&
            loc.longitude >= -109.0 &&
            loc.longitude <= -105.0)
        );
      },
    };

    const filterFunction = regionBoundaries[regionId];
    if (!filterFunction) return [];

    return allLocations.filter(filterFunction);
  }

  // Get category-specific explore items
  static getCategoryExploreItems(categoryId: string): AllDataStructure[] {
    return this.getUnifiedData().filter((item) =>
      item.categories?.some((cat) =>
        cat.toLowerCase().includes(categoryId.toLowerCase())
      )
    );
  }

  // Search functionality with location support
  static searchContent(query: string) {
    const data = this.getUnifiedData();
    const lowercaseQuery = query.toLowerCase();

    return {
      hiking: data.filter(
        (item) =>
          item.categories?.includes("Hiking") &&
          (item.title?.toLowerCase().includes(lowercaseQuery) ||
            item.description?.toLowerCase().includes(lowercaseQuery) ||
            item.location?.toLowerCase().includes(lowercaseQuery) ||
            item.name?.toLowerCase().includes(lowercaseQuery))
      ),
      travels: data.filter(
        (item) =>
          item.categories?.includes("Photography") &&
          (item.title?.toLowerCase().includes(lowercaseQuery) ||
            item.description?.toLowerCase().includes(lowercaseQuery) ||
            item.location?.toLowerCase().includes(lowercaseQuery) ||
            item.name?.toLowerCase().includes(lowercaseQuery))
      ),
      recommendations: data.filter(
        (item) =>
          item.isFeatured &&
          (item.title?.toLowerCase().includes(lowercaseQuery) ||
            item.description?.toLowerCase().includes(lowercaseQuery) ||
            item.location?.toLowerCase().includes(lowercaseQuery) ||
            item.name?.toLowerCase().includes(lowercaseQuery))
      ),
      locations: data.filter(
        (item) =>
          item.name?.toLowerCase().includes(lowercaseQuery) ||
          item.address?.toLowerCase().includes(lowercaseQuery) ||
          item.type?.toLowerCase().includes(lowercaseQuery) ||
          item.description?.toLowerCase().includes(lowercaseQuery)
      ),
    };
  }

  // Get nearby locations based on coordinates
  static getNearbyLocations(
    latitude: number,
    longitude: number,
    radiusKm: number = 50
  ): AllDataStructure[] {
    const locations = this.getMapLocations();

    return locations
      .filter((location) => {
        if (!location.latitude || !location.longitude) return false;
        const distance = this.calculateDistance(
          latitude,
          longitude,
          location.latitude,
          location.longitude
        );
        return distance <= radiusKm;
      })
      .sort((a, b) => {
        const distanceA = this.calculateDistance(
          latitude,
          longitude,
          a.latitude || 0,
          a.longitude || 0
        );
        const distanceB = this.calculateDistance(
          latitude,
          longitude,
          b.latitude || 0,
          b.longitude || 0
        );
        return distanceA - distanceB;
      });
  }

  // Calculate distance between two coordinates using Haversine formula
  static calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Get location by ID
  static getLocationById(id: string): AllDataStructure | undefined {
    return this.getMapLocations().find((location) => location.id === id);
  }

  // Get random featured locations
  static getFeaturedLocations(count: number = 3): AllDataStructure[] {
    const locations = this.getMapLocations().filter((item) => item.isFeatured);
    const shuffled = locations.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Get locations by type
  static getLocationsByType(type: string): AllDataStructure[] {
    return this.getMapLocations().filter(
      (location) => location.type?.toLowerCase() === type.toLowerCase()
    );
  }

  // Get locations by category
  static getLocationsByCategory(category: string): AllDataStructure[] {
    return this.getMapLocations().filter((location) =>
      location.categories?.some((cat) =>
        cat.toLowerCase().includes(category.toLowerCase())
      )
    );
  }

  // Get locations by rating range
  static getLocationsByRating(
    minRating: number,
    maxRating: number = 5
  ): AllDataStructure[] {
    return this.getMapLocations().filter(
      (location) =>
        location.rating &&
        location.rating >= minRating &&
        location.rating <= maxRating
    );
  }

  // Get locations by price level
  static getLocationsByPriceLevel(priceLevel: number): AllDataStructure[] {
    return this.getMapLocations().filter(
      (location) => location.priceLevel === priceLevel
    );
  }

  // Get explore items by category
  static getExploreItemsByCategory(category: string): AllDataStructure[] {
    return this.getUnifiedData().filter((item) =>
      item.categories?.some((cat) =>
        cat.toLowerCase().includes(category.toLowerCase())
      )
    );
  }

  // Get featured recommendations
  static getFeaturedRecommendations(): AllDataStructure[] {
    return this.getEnhancedRecommendations();
  }

  // Get recommendations by price range
  static getRecommendationsByPriceRange(
    minPrice: number,
    maxPrice: number
  ): AllDataStructure[] {
    return this.getEnhancedRecommendations().filter(
      (item) =>
        item.priceLevel !== undefined &&
        item.priceLevel >= minPrice &&
        item.priceLevel <= maxPrice
    );
  }

  // Get all unique categories from locations
  static getAllLocationCategories(): string[] {
    const locations = this.getMapLocations();
    const categories = new Set<string>();

    locations.forEach((location) => {
      location.categories?.forEach((category) => categories.add(category));
    });

    return Array.from(categories).sort();
  }

  // Get all unique types from locations
  static getAllLocationTypes(): string[] {
    const locations = this.getMapLocations();
    const types = new Set<string>();

    locations.forEach((location) => types.add(location.type || "Unknown"));

    return Array.from(types).sort();
  }

  // Get statistics about locations
  static getLocationStatistics() {
    const locations = this.getMapLocations();
    const recommendations = this.getEnhancedRecommendations();
    const exploreData = this.getExploreData();

    return {
      totalLocations: locations.length,
      totalRecommendations: recommendations.length,
      totalHikingItems: exploreData.hiking.length,
      totalTravelItems: exploreData.travels.length,
      averageRating:
        locations.reduce((sum, loc) => sum + (loc.rating || 0), 0) /
        locations.length,
      locationsByType: this.getAllLocationTypes().map((type) => ({
        type,
        count: this.getLocationsByType(type).length,
      })),
      locationsByPriceLevel: [1, 2, 3].map((level) => ({
        level,
        count: this.getLocationsByPriceLevel(level).length,
      })),
    };
  }

  // Get random items for discovery
  static getRandomDiscoveryItems(count: number = 5): AllDataStructure[] {
    const allItems = this.getUnifiedData();
    const shuffled = allItems.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Filter items by multiple criteria
  static filterItems(criteria: {
    category?: string;
    minRating?: number;
    maxPrice?: number;
    location?: string;
    type?: string;
  }) {
    let filteredItems = this.getUnifiedData();

    // Apply filters
    if (criteria.category) {
      filteredItems = filteredItems.filter((item) =>
        item.categories?.some((cat) =>
          cat.toLowerCase().includes(criteria.category!.toLowerCase())
        )
      );
    }

    if (criteria.minRating) {
      filteredItems = filteredItems.filter(
        (item) => item.rating && item.rating >= criteria.minRating!
      );
    }

    if (criteria.maxPrice) {
      filteredItems = filteredItems.filter(
        (item) => item.priceLevel && item.priceLevel <= criteria.maxPrice!
      );
    }

    if (criteria.location) {
      filteredItems = filteredItems.filter(
        (item) =>
          item.location
            ?.toLowerCase()
            .includes(criteria.location!.toLowerCase()) ||
          item.name?.toLowerCase().includes(criteria.location!.toLowerCase()) ||
          item.address?.toLowerCase().includes(criteria.location!.toLowerCase())
      );
    }

    if (criteria.type) {
      filteredItems = filteredItems.filter(
        (item) => item.type?.toLowerCase() === criteria.type!.toLowerCase()
      );
    }

    return {
      hiking: filteredItems.filter((item) =>
        item.categories?.includes("Hiking")
      ),
      travels: filteredItems.filter((item) =>
        item.categories?.includes("Photography")
      ),
      recommendations: filteredItems.filter((item) => item.isFeatured),
      locations: filteredItems,
    };
  }
}
