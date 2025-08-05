// services/mockDataService.ts
import type { ExploreItem, RecommendedItem } from "@/types/homeTypes";

export interface MapLocation {
  id: string;
  name: string;
  address?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  type?: string;
  description?: string;
  rating?: number;
  dateRange?: string;
  images?: any[];
  phone?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    linkedin?: string;
    [key: string]: any;
  };
  openingHours?: string;
  priceLevel?: number;
  categories?: string[];
  [key: string]: any;
}

export class MockDataService {
  // Enhanced explore data with more realistic content
  static getExploreData() {
    return {
      hiking: [
        {
          id: "hiking-1",
          title: "Explore Colorado with the best and good locations here.",
          description:
            "Discover the most breathtaking hiking trails in Colorado with stunning mountain views and pristine wilderness. Perfect for all skill levels.",
          date: "Jun 30 2025",
          images: [
            require("@/assets/images/hero1.png"),
            require("@/assets/images/hero2.png"),
          ],
          rating: 4.8,
          location: "Rocky Mountain National Park",
          difficulty: "Moderate",
          duration: "3-4 hours",
          coordinates: { latitude: 40.3428, longitude: -105.6836 },
          phone: "(970) 586-1206",
          socialLinks: {
            facebook: "https://facebook.com/rockymountainnp",
            instagram: "https://instagram.com/rockynps",
            twitter: "https://twitter.com/rockynps",
            youtube: "https://youtube.com/rockymountainnp",
            linkedin: "https://linkedin.com/company/nps-rocky-mountain",
          },
          openingHours: "24 hours",
          priceLevel: 2,
          categories: [
            "Hiking Trails",
            "Wildlife Viewing",
            "Visitor Center",
            "Restrooms",
            "Parking",
          ],
        },
        {
          id: "hiking-2",
          title: "Find the finest and greatest places",
          description:
            "Experience the beauty of Colorado's natural landscapes with guided tours to the most scenic locations and hidden gems.",
          date: "Jun 30 2025",
          images: [
            require("@/assets/images/hero2.png"),
            require("@/assets/images/hero3.png"),
            require("@/assets/images/hero1.png"),
          ],
          rating: 4.9,
          location: "Garden of the Gods",
          difficulty: "Easy",
          duration: "2-3 hours",
          coordinates: { latitude: 38.8719, longitude: -104.8761 },
          phone: "(719) 634-6666",
          socialLinks: {
            facebook: "https://facebook.com/gardenofthegods",
            instagram: "https://instagram.com/gardenofthegods",
            twitter: "https://twitter.com/gardenofthegods",
            youtube: "https://youtube.com/gardenofthegods",
          },
          openingHours: "5:00 AM - 11:00 PM",
          priceLevel: 1,
          categories: [
            "Free Admission",
            "Visitor Center",
            "Gift Shop",
            "Guided Tours",
            "Photography",
          ],
        },
        {
          id: "hiking-3",
          title:
            "The best sunset and sky view from the top of the hill of Colorado!",
          description:
            "Witness spectacular sunsets from Colorado's highest peaks with panoramic views that will take your breath away.",
          date: "Jun 30 2025",
          images: [require("@/assets/images/hero3.png")],
          rating: 4.7,
          location: "Mount Evans",
          difficulty: "Challenging",
          duration: "5-6 hours",
          coordinates: { latitude: 39.5883, longitude: -105.6438 },
          phone: "(303) 567-3000",
          socialLinks: {
            facebook: "https://facebook.com/mountevans",
            instagram: "https://instagram.com/mountevans",
            twitter: "https://twitter.com/mountevans",
          },
          openingHours: "Seasonal hours vary",
          priceLevel: 3,
          categories: [
            "Summit Views",
            "Photography",
            "Wildlife",
            "Scenic Drive",
            "Hiking",
          ],
        },
      ],
      travels: [
        {
          id: "travels-1",
          title: "Explore Colorado with the best and good locations here.",
          description:
            "Complete travel guide to Colorado's most iconic destinations, from bustling cities to serene mountain towns.",
          date: "Jun 30 2025",
          images: [
            require("@/assets/recommend/recommend1.png"),
            require("@/assets/recommend/recommend2.png"),
          ],
          rating: 4.6,
          location: "Statewide",
          type: "Cultural Tour",
          duration: "Full Day",
          coordinates: { latitude: 39.7392, longitude: -104.9903 },
          phone: "(303) 892-1112",
          socialLinks: {
            facebook: "https://facebook.com/visitcolorado",
            instagram: "https://instagram.com/visitcolorado",
            twitter: "https://twitter.com/visitcolorado",
            youtube: "https://youtube.com/visitcolorado",
            linkedin: "https://linkedin.com/company/colorado-tourism",
          },
          openingHours: "Varies by location",
          priceLevel: 2,
          categories: [
            "Cultural Sites",
            "Museums",
            "Historic Towns",
            "Guided Tours",
            "Local Cuisine",
          ],
        },
        {
          id: "travels-2",
          title:
            "The best sunset and sky view from the top of the hill of Colorado!",
          description:
            "Experience Colorado's majestic mountain ranges and pristine wilderness areas with expert local guides.",
          date: "Jun 30 2025",
          images: [
            require("@/assets/recommend/recommend2.png"),
            require("@/assets/recommend/recommend3.png"),
            require("@/assets/recommend/recommend1.png"),
          ],
          rating: 4.8,
          location: "Colorado Rockies",
          type: "Scenic Tour",
          duration: "Half Day",
          coordinates: { latitude: 40.3428, longitude: -105.6836 },
          phone: "(970) 586-1206",
          socialLinks: {
            facebook: "https://facebook.com/coloradorockies",
            instagram: "https://instagram.com/coloradorockies",
            twitter: "https://twitter.com/coloradorockies",
            youtube: "https://youtube.com/coloradorockies",
          },
          openingHours: "8:00 AM - 6:00 PM",
          priceLevel: 3,
          categories: [
            "Mountain Views",
            "Wildlife Viewing",
            "Photography",
            "Hiking",
            "Nature Tours",
          ],
        },
        {
          id: "travels-3",
          title: "Historic Colorado Adventures",
          description:
            "Discover Colorado's rich cultural heritage and historic landmarks throughout the state.",
          date: "Jun 30 2025",
          images: [require("@/assets/recommend/recommend3.png")],
          rating: 4.5,
          location: "Various Historic Sites",
          type: "Historical Tour",
          duration: "Full Day",
          coordinates: { latitude: 38.8719, longitude: -104.8761 },
          phone: "(719) 685-5444",
          socialLinks: {
            facebook: "https://facebook.com/coloradohistory",
            instagram: "https://instagram.com/coloradohistory",
            twitter: "https://twitter.com/coloradohistory",
            linkedin:
              "https://linkedin.com/company/colorado-historical-society",
          },
          openingHours: "9:00 AM - 5:00 PM",
          priceLevel: 2,
          categories: [
            "Historic Sites",
            "Museums",
            "Guided Tours",
            "Educational",
            "Cultural Heritage",
          ],
        },
      ],
    };
  }

  // Enhanced recommendations with more variety
  static getEnhancedRecommendations(): RecommendedItem[] {
    return [
      {
        id: "rec-1",
        title: "Explore Colorado",
        dateRange: "12 Feb - 30 Mar",
        images: [
          require("@/assets/recommend/recommend1.png"),
          require("@/assets/recommend/recommend2.png"),
        ],
        description:
          "Complete Colorado adventure guide with insider tips and hidden gems",
        location: "Statewide",
        price: 0,
        rating: 4.9,
        isFeatured: true,
        coordinates: { latitude: 39.7392, longitude: -104.9903 },
        phone: "(303) 892-1112",
        socialLinks: {
          facebook: "https://facebook.com/explorecolorado",
          instagram: "https://instagram.com/explorecolorado",
          twitter: "https://twitter.com/explorecolorado",
          youtube: "https://youtube.com/explorecolorado",
          linkedin: "https://linkedin.com/company/explore-colorado",
        },
        openingHours: "24/7 Access",
        priceLevel: 1,
        categories: [
          "Adventure",
          "Sightseeing",
          "Photography",
          "Nature",
          "Culture",
        ],
      },
      {
        id: "rec-2",
        title: "Hiking & Moving",
        dateRange: "12 Feb - 30 Mar",
        images: [
          require("@/assets/recommend/recommend2.png"),
          require("@/assets/recommend/recommend3.png"),
          require("@/assets/recommend/recommend1.png"),
        ],
        description:
          "Active lifestyle experiences in Colorado's great outdoors",
        location: "Mountain Region",
        price: 25,
        rating: 4.7,
        isFeatured: false,
        coordinates: { latitude: 40.3428, longitude: -105.6836 },
        phone: "(970) 586-1500",
        socialLinks: {
          facebook: "https://facebook.com/hikingcolorado",
          instagram: "https://instagram.com/hikingcolorado",
          twitter: "https://twitter.com/hikingcolorado",
          youtube: "https://youtube.com/hikingcolorado",
        },
        openingHours: "Dawn to Dusk",
        priceLevel: 2,
        categories: [
          "Hiking",
          "Trail Running",
          "Mountain Biking",
          "Rock Climbing",
          "Fitness",
        ],
      },
      {
        id: "rec-3",
        title: "Travels with family",
        dateRange: "12 Feb - 30 Mar",
        images: [
          require("@/assets/recommend/recommend3.png"),
          require("@/assets/recommend/recommend4.png"),
        ],
        description:
          "Family-friendly adventures and activities across Colorado",
        location: "Family Destinations",
        price: 35,
        rating: 4.8,
        isFeatured: true,
        coordinates: { latitude: 38.8719, longitude: -104.8761 },
        phone: "(719) 634-6700",
        socialLinks: {
          facebook: "https://facebook.com/coloradofamilies",
          instagram: "https://instagram.com/coloradofamilies",
          twitter: "https://twitter.com/coloradofamilies",
          youtube: "https://youtube.com/coloradofamilies",
          linkedin: "https://linkedin.com/company/colorado-family-adventures",
        },
        openingHours: "9:00 AM - 8:00 PM",
        priceLevel: 2,
        categories: [
          "Family Fun",
          "Kids Activities",
          "Educational",
          "Safe Adventures",
          "Group Tours",
        ],
      },
      {
        id: "rec-4",
        title: "The Mountain",
        dateRange: "12 Feb - 30 Mar",
        images: [require("@/assets/recommend/recommend4.png")],
        description:
          "Conquer Colorado's majestic peaks and mountain adventures",
        location: "High Country",
        price: 45,
        rating: 4.6,
        isFeatured: false,
        coordinates: { latitude: 38.8405, longitude: -105.0442 },
        phone: "(719) 385-7325",
        socialLinks: {
          facebook: "https://facebook.com/coloradomountains",
          instagram: "https://instagram.com/coloradomountains",
          twitter: "https://twitter.com/coloradomountains",
          youtube: "https://youtube.com/coloradomountains",
        },
        openingHours: "Seasonal hours vary",
        priceLevel: 3,
        categories: [
          "Mountain Climbing",
          "Alpine Tours",
          "Summit Adventures",
          "Photography",
          "Extreme Sports",
        ],
      },
      {
        id: "rec-5",
        title: "More you can",
        dateRange: "12 Feb - 30 Mar",
        images: [
          require("@/assets/recommend/recommend5.png"),
          require("@/assets/recommend/recommend6.png"),
          require("@/assets/recommend/recommend1.png"),
        ],
        description:
          "Unlimited possibilities for adventure in the Centennial State",
        location: "Various",
        price: 20,
        rating: 4.5,
        isFeatured: false,
        coordinates: { latitude: 37.7916, longitude: -105.5943 },
        phone: "(719) 378-6400",
        socialLinks: {
          facebook: "https://facebook.com/coloradoadventures",
          instagram: "https://instagram.com/coloradoadventures",
          twitter: "https://twitter.com/coloradoadventures",
          linkedin: "https://linkedin.com/company/colorado-adventures",
        },
        openingHours: "Varies by activity",
        priceLevel: 2,
        categories: [
          "Multi-Activity",
          "Adventure Sports",
          "Outdoor Recreation",
          "Seasonal Activities",
          "Custom Tours",
        ],
      },
      {
        id: "rec-6",
        title: "Start with the rock",
        dateRange: "12 Feb - 30 Mar",
        images: [
          require("@/assets/recommend/recommend6.png"),
          require("@/assets/recommend/recommend5.png"),
        ],
        description: "Rock climbing and geological wonders of Colorado",
        location: "Rock Formations",
        price: 30,
        rating: 4.7,
        isFeatured: true,
        coordinates: { latitude: 39.6654, longitude: -105.2057 },
        phone: "(720) 865-2494",
        socialLinks: {
          facebook: "https://facebook.com/coloradorocks",
          instagram: "https://instagram.com/coloradorocks",
          twitter: "https://twitter.com/coloradorocks",
          youtube: "https://youtube.com/coloradorocks",
        },
        openingHours: "6:00 AM - 10:00 PM",
        priceLevel: 3,
        categories: [
          "Rock Climbing",
          "Bouldering",
          "Geology Tours",
          "Photography",
          "Adventure Training",
        ],
      },
    ];
  }

  // Get detailed map locations
  static getMapLocations(): MapLocation[] {
    return [
      {
        id: "1",
        name: "Rocky Mountain National Park",
        address: "1000 US Hwy 36, Estes Park, CO 80517",
        latitude: 40.3428,
        longitude: -105.6836,
        type: "National Park",
        description:
          "Breathtaking mountain vistas and wildlife viewing opportunities",
        rating: 4.8,
        images: [
          require("@/assets/images/hero1.png"),
          require("@/assets/images/hero2.png"),
          require("@/assets/images/hero3.png"),
        ],
        phone: "(970) 586-1206",
        socialLinks: {
          facebook: "https://facebook.com/rockymountainnationalpark",
          instagram: "https://instagram.com/rockynps",
          twitter: "https://twitter.com/rockynps",
          youtube: "https://youtube.com/nps",
          linkedin: "https://linkedin.com/company/national-park-service",
        },
        openingHours: "24 hours",
        priceLevel: 2,
        categories: [
          "Hiking Trails",
          "Wildlife Viewing",
          "Visitor Center",
          "Restrooms",
          "Parking",
        ],
      },
      {
        id: "2",
        name: "Garden of the Gods",
        address: "1805 N 30th St, Colorado Springs, CO 80904",
        latitude: 38.8719,
        longitude: -104.8761,
        type: "Park",
        description: "Stunning red rock formations and easy walking trails",
        rating: 4.9,
        images: [
          require("@/assets/recommend/recommend1.png"),
          require("@/assets/recommend/recommend2.png"),
        ],
        phone: "(719) 634-6666",
        socialLinks: {
          facebook: "https://facebook.com/gardenofthegods",
          instagram: "https://instagram.com/gardenofthegods",
          twitter: "https://twitter.com/gardenofthegods",
          youtube: "https://youtube.com/gardenofthegods",
        },
        openingHours: "5:00 AM - 11:00 PM",
        priceLevel: 1,
        categories: [
          "Free Admission",
          "Visitor Center",
          "Gift Shop",
          "Guided Tours",
          "Photography",
        ],
      },
      {
        id: "3",
        name: "Red Rocks Amphitheatre",
        address: "18300 W Alameda Pkwy, Morrison, CO 80465",
        latitude: 39.6654,
        longitude: -105.2057,
        type: "Entertainment",
        description:
          "World-famous outdoor concert venue with stunning acoustics",
        rating: 4.7,
        images: [
          require("@/assets/recommend/recommend3.png"),
          require("@/assets/recommend/recommend4.png"),
          require("@/assets/recommend/recommend5.png"),
        ],
        phone: "(720) 865-2494",
        socialLinks: {
          facebook: "https://facebook.com/redrocksamphitheatre",
          instagram: "https://instagram.com/redrocksamphitheatre",
          twitter: "https://twitter.com/redrocks",
          youtube: "https://youtube.com/redrocks",
          linkedin: "https://linkedin.com/company/red-rocks-amphitheatre",
        },
        openingHours: "Varies by event",
        priceLevel: 3,
        categories: [
          "Concerts",
          "Museum",
          "Trading Post",
          "Hiking Trails",
          "Parking",
        ],
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
        images: [require("@/assets/recommend/recommend6.png")],
        phone: "(970) 529-4465",
        socialLinks: {
          facebook: "https://facebook.com/mesaverdenps",
          instagram: "https://instagram.com/mesaverdenps",
          twitter: "https://twitter.com/mesaverdenps",
          youtube: "https://youtube.com/nps",
        },
        openingHours: "8:00 AM - 5:00 PM",
        priceLevel: 2,
        categories: [
          "Guided Tours",
          "Museum",
          "Research Center",
          "Camping",
          "Hiking",
        ],
      },
      {
        id: "5",
        name: "Pikes Peak",
        address: "Pikes Peak, Colorado Springs, CO",
        latitude: 38.8405,
        longitude: -105.0442,
        type: "Mountain",
        description:
          "America's Mountain - 14,115 feet elevation with panoramic views",
        rating: 4.8,
        images: [
          require("@/assets/images/hero1.png"),
          require("@/assets/recommend/recommend1.png"),
        ],
        phone: "(719) 385-7325",
        socialLinks: {
          facebook: "https://facebook.com/pikespeak",
          instagram: "https://instagram.com/pikespeak",
          twitter: "https://twitter.com/pikespeak",
          youtube: "https://youtube.com/pikespeak",
        },
        openingHours: "Seasonal hours vary",
        priceLevel: 3,
        categories: [
          "Summit House",
          "Cog Railway",
          "Highway Access",
          "Gift Shop",
          "Dining",
        ],
      },
      {
        id: "6",
        name: "Great Sand Dunes National Park",
        address: "11999 State Highway 150, Mosca, CO 81146",
        latitude: 37.7916,
        longitude: -105.5943,
        type: "National Park",
        description:
          "North America's tallest sand dunes reaching over 750 feet",
        rating: 4.5,
        images: [
          require("@/assets/recommend/recommend2.png"),
          require("@/assets/recommend/recommend3.png"),
          require("@/assets/images/hero2.png"),
        ],
        phone: "(719) 378-6395",
        socialLinks: {
          facebook: "https://facebook.com/greatsanddunesnps",
          instagram: "https://instagram.com/greatsanddunesnps",
          twitter: "https://twitter.com/greatsanddunesnps",
          youtube: "https://youtube.com/nps",
        },
        openingHours: "24 hours",
        priceLevel: 2,
        categories: [
          "Sand Surfing",
          "Medano Creek",
          "Camping",
          "Visitor Center",
          "Stargazing",
        ],
      },
      {
        id: "7",
        name: "Black Canyon of the Gunnison",
        address: "1 Hwy 347, Montrose, CO 81401",
        latitude: 38.5753,
        longitude: -107.7416,
        type: "National Park",
        description:
          "Dark, steep canyon walls and dramatic geological formations",
        rating: 4.4,
        images: [
          require("@/assets/recommend/recommend4.png"),
          require("@/assets/images/hero3.png"),
        ],
        phone: "(970) 249-1914",
        socialLinks: {
          facebook: "https://facebook.com/blackcanyonnps",
          instagram: "https://instagram.com/blackcanyonnps",
          twitter: "https://twitter.com/blackcanyonnps",
          youtube: "https://youtube.com/nps",
        },
        openingHours: "24 hours",
        priceLevel: 2,
        categories: [
          "Scenic Drives",
          "Hiking Trails",
          "Rock Climbing",
          "Camping",
          "Visitor Center",
        ],
      },
      {
        id: "8",
        name: "Maroon Bells",
        address: "Maroon Creek Rd, Aspen, CO 81611",
        latitude: 39.0708,
        longitude: -106.989,
        type: "Mountain",
        description:
          "Most photographed peaks in North America with alpine lakes",
        rating: 4.9,
        images: [
          require("@/assets/recommend/recommend5.png"),
          require("@/assets/recommend/recommend6.png"),
          require("@/assets/images/hero1.png"),
          require("@/assets/images/hero2.png"),
        ],
        phone: "(970) 925-3445",
        socialLinks: {
          facebook: "https://facebook.com/maroonbells",
          instagram: "https://instagram.com/maroonbells",
          twitter: "https://twitter.com/maroonbells",
          youtube: "https://youtube.com/maroonbells",
        },
        openingHours: "Seasonal access",
        priceLevel: 2,
        categories: [
          "Photography",
          "Hiking",
          "Fishing",
          "Shuttle Service",
          "Interpretive Trail",
        ],
      },
    ];
  }

  // Category-specific explore items
  static getCategoryExploreItems(categoryId: string): ExploreItem[] {
    const baseItems = [
      {
        id: `${categoryId}-1`,
        title: "Local Favorites",
        eventCount: 12,
        images: [
          require("@/assets/explores/explore1.png"),
          require("@/assets/explores/explore2.png"),
        ],
        category: categoryId,
        description: "Discover local favorites and hidden gems",
        location: "Colorado",
        rating: 4.7,
        coordinates: { latitude: 39.7392, longitude: -104.9903 },
        phone: "(303) 892-1100",
        socialLinks: {
          facebook: "https://facebook.com/localfavorites",
          instagram: "https://instagram.com/localfavorites",
          twitter: "https://twitter.com/localfavorites",
          youtube: "https://youtube.com/localfavorites",
        },
        openingHours: "Varies by location",
        priceLevel: 2,
        categories: [
          "Local Culture",
          "Hidden Gems",
          "Authentic Experience",
          "Community Tours",
          "Local Cuisine",
        ],
      },
      {
        id: `${categoryId}-2`,
        title: "Popular Destinations",
        eventCount: 8,
        images: [require("@/assets/explores/explore2.png")],
        category: categoryId,
        description: "Most popular destinations in this category",
        location: "Statewide",
        rating: 4.5,
        coordinates: { latitude: 38.8719, longitude: -104.8761 },
        phone: "(719) 634-6600",
        socialLinks: {
          facebook: "https://facebook.com/populardestinations",
          instagram: "https://instagram.com/populardestinations",
          twitter: "https://twitter.com/populardestinations",
        },
        openingHours: "9:00 AM - 6:00 PM",
        priceLevel: 2,
        categories: [
          "Top Attractions",
          "Must-See Places",
          "Tourist Favorites",
          "Iconic Locations",
          "Scenic Views",
        ],
      },
    ];

    return baseItems;
  }

  // Search functionality with location support
  static searchContent(query: string) {
    const exploreData = this.getExploreData();
    const recommendations = this.getEnhancedRecommendations();
    const locations = this.getMapLocations();

    const results = {
      hiking: exploreData.hiking.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.location.toLowerCase().includes(query.toLowerCase())
      ),
      travels: exploreData.travels.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.location.toLowerCase().includes(query.toLowerCase())
      ),
      recommendations: recommendations.filter(
        (item) =>
          (item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description?.toLowerCase().includes(query.toLowerCase()) ||
            item.location?.toLowerCase().includes(query.toLowerCase())) ??
          false
      ),
      locations: locations.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.address.toLowerCase().includes(query.toLowerCase()) ||
          item.type.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase())
      ),
    };

    return results;
  }

  // Get nearby locations based on coordinates
  static getNearbyLocations(
    latitude: number,
    longitude: number,
    radiusKm: number = 50
  ): MapLocation[] {
    const locations = this.getMapLocations();

    return locations
      .filter((location) => {
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
          a.latitude,
          a.longitude
        );
        const distanceB = this.calculateDistance(
          latitude,
          longitude,
          b.latitude,
          b.longitude
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
  static getLocationById(id: string): MapLocation | undefined {
    return this.getMapLocations().find((location) => location.id === id);
  }

  // Get random featured locations
  static getFeaturedLocations(count: number = 3): MapLocation[] {
    const locations = this.getMapLocations();
    const shuffled = locations.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Get locations by type
  static getLocationsByType(type: string): MapLocation[] {
    return this.getMapLocations().filter(
      (location) => location.type.toLowerCase() === type.toLowerCase()
    );
  }

  // Get locations by category
  static getLocationsByCategory(category: string): MapLocation[] {
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
  ): MapLocation[] {
    return this.getMapLocations().filter(
      (location) =>
        location.rating &&
        location.rating >= minRating &&
        location.rating <= maxRating
    );
  }

  // Get locations by price level
  static getLocationsByPriceLevel(priceLevel: number): MapLocation[] {
    return this.getMapLocations().filter(
      (location) => location.priceLevel === priceLevel
    );
  }

  // Get explore items by category
  static getExploreItemsByCategory(category: string): any[] {
    const exploreData = this.getExploreData();
    return exploreData[category as keyof typeof exploreData] || [];
  }

  // Get featured recommendations
  static getFeaturedRecommendations(): RecommendedItem[] {
    return this.getEnhancedRecommendations().filter((item) => item.isFeatured);
  }

  // Get recommendations by price range
  static getRecommendationsByPriceRange(
    minPrice: number,
    maxPrice: number
  ): RecommendedItem[] {
    return this.getEnhancedRecommendations().filter(
      (item) =>
        item.price !== undefined &&
        item.price >= minPrice &&
        item.price <= maxPrice
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

    locations.forEach((location) => types.add(location.type));

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
      locationsByPriceLevel: [1, 2, 3, 4].map((level) => ({
        level,
        count: this.getLocationsByPriceLevel(level).length,
      })),
    };
  }

  // Get random items for discovery
  static getRandomDiscoveryItems(count: number = 5): any[] {
    const allItems = [
      ...this.getExploreData().hiking,
      ...this.getExploreData().travels,
      ...this.getEnhancedRecommendations(),
      ...this.getMapLocations(),
    ];

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
    const exploreData = this.getExploreData();
    const recommendations = this.getEnhancedRecommendations();
    const locations = this.getMapLocations();

    let filteredHiking = exploreData.hiking;
    let filteredTravels = exploreData.travels;
    let filteredRecommendations = recommendations;
    let filteredLocations = locations;

    // Apply filters
    if (criteria.minRating) {
      filteredHiking = filteredHiking.filter(
        (item) => item.rating >= criteria.minRating!
      );
      filteredTravels = filteredTravels.filter(
        (item) => item.rating >= criteria.minRating!
      );
      filteredRecommendations = filteredRecommendations.filter(
        (item) => item.rating && item.rating >= criteria.minRating!
      );
      filteredLocations = filteredLocations.filter(
        (item) => item.rating && item.rating >= criteria.minRating!
      );
    }

    if (criteria.maxPrice) {
      filteredRecommendations = filteredRecommendations.filter(
        (item) => item.price && item.price <= criteria.maxPrice!
      );
      filteredLocations = filteredLocations.filter(
        (item) => item.priceLevel && item.priceLevel <= criteria.maxPrice!
      );
    }

    if (criteria.location) {
      const locationFilter = (item: any) =>
        item.location?.toLowerCase().includes(criteria.location!.toLowerCase());

      filteredHiking = filteredHiking.filter(locationFilter);
      filteredTravels = filteredTravels.filter(locationFilter);
      filteredRecommendations = filteredRecommendations.filter(locationFilter);
      filteredLocations = filteredLocations.filter(
        (item) =>
          item.name.toLowerCase().includes(criteria.location!.toLowerCase()) ||
          item.address.toLowerCase().includes(criteria.location!.toLowerCase())
      );
    }

    if (criteria.type) {
      filteredLocations = filteredLocations.filter((item) =>
        item.type.toLowerCase().includes(criteria.type!.toLowerCase())
      );
    }

    return {
      hiking: filteredHiking,
      travels: filteredTravels,
      recommendations: filteredRecommendations,
      locations: filteredLocations,
    };
  }
}
