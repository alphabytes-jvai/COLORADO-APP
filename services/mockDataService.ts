// services/mockDataService.ts
import type { Category, ExploreItem, RecommendedItem } from "@/types/homeTypes";

export class MockDataService {
  // Enhanced explore data with more realistic content
  static getExploreData() {
    return {
      hiking: [
        {
          id: "hiking-1",
          title: "Explore Colorado with the best and good locations here.",
          description: "Discover the most breathtaking hiking trails in Colorado with stunning mountain views and pristine wilderness. Perfect for all skill levels.",
          date: "Jun 30 2025",
          image: require("@/assets/images/hero1.png"),
          rating: 4.8,
          location: "Rocky Mountain National Park",
          difficulty: "Moderate",
          duration: "3-4 hours"
        },
        {
          id: "hiking-2",
          title: "Find the finest and greatest places",
          description: "Experience the beauty of Colorado's natural landscapes with guided tours to the most scenic locations and hidden gems.",
          date: "Jun 30 2025", 
          image: require("@/assets/images/hero2.png"),
          rating: 4.9,
          location: "Garden of the Gods",
          difficulty: "Easy",
          duration: "2-3 hours"
        },
        {
          id: "hiking-3",
          title: "The best sunset and sky view from the top of the hill of Colorado!",
          description: "Witness spectacular sunsets from Colorado's highest peaks with panoramic views that will take your breath away.",
          date: "Jun 30 2025",
          image: require("@/assets/images/hero3.png"),
          rating: 4.7,
          location: "Mount Evans",
          difficulty: "Challenging", 
          duration: "5-6 hours"
        }
      ],
      travels: [
        {
          id: "travels-1",
          title: "Explore Colorado with the best and good locations here.",
          description: "Complete travel guide to Colorado's most iconic destinations, from bustling cities to serene mountain towns.",
          date: "Jun 30 2025",
          image: require("@/assets/recommend/recommend1.png"),
          rating: 4.6,
          location: "Statewide",
          type: "Cultural Tour",
          duration: "Full Day"
        },
        {
          id: "travels-2", 
          title: "The best sunset and sky view from the top of the hill of Colorado!",
          description: "Experience Colorado's majestic mountain ranges and pristine wilderness areas with expert local guides.",
          date: "Jun 30 2025",
          image: require("@/assets/recommend/recommend2.png"),
          rating: 4.8,
          location: "Colorado Rockies",
          type: "Scenic Tour",
          duration: "Half Day"
        },
        {
          id: "travels-3",
          title: "Historic Colorado Adventures",
          description: "Discover Colorado's rich cultural heritage and historic landmarks throughout the state.",
          date: "Jun 30 2025", 
          image: require("@/assets/recommend/recommend3.png"),
          rating: 4.5,
          location: "Various Historic Sites",
          type: "Historical Tour",
          duration: "Full Day"
        }
      ]
    };
  }

  // Enhanced recommendations with more variety
  static getEnhancedRecommendations(): RecommendedItem[] {
    return [
      {
        id: "rec-1",
        title: "Explore Colorado",
        dateRange: "12 Feb - 30 Mar",
        image: require("@/assets/recommend/recommend1.png"),
        description: "Complete Colorado adventure guide with insider tips and hidden gems",
        location: "Statewide",
        price: 0,
        rating: 4.9,
        isFeatured: true,
      },
      {
        id: "rec-2",
        title: "Hiking & Moving", 
        dateRange: "12 Feb - 30 Mar",
        image: require("@/assets/recommend/recommend2.png"),
        description: "Active lifestyle experiences in Colorado's great outdoors",
        location: "Mountain Region",
        price: 25,
        rating: 4.7,
        isFeatured: false,
      },
      {
        id: "rec-3",
        title: "Travels with family",
        dateRange: "12 Feb - 30 Mar", 
        image: require("@/assets/recommend/recommend3.png"),
        description: "Family-friendly adventures and activities across Colorado",
        location: "Family Destinations",
        price: 35,
        rating: 4.8,
        isFeatured: true,
      },
      {
        id: "rec-4",
        title: "The Mountain",
        dateRange: "12 Feb - 30 Mar",
        image: require("@/assets/recommend/recommend4.png"),
        description: "Conquer Colorado's majestic peaks and mountain adventures",
        location: "High Country",
        price: 45,
        rating: 4.6,
        isFeatured: false,
      },
      {
        id: "rec-5",
        title: "More you can",
        dateRange: "12 Feb - 30 Mar",
        image: require("@/assets/recommend/recommend5.png"),
        description: "Unlimited possibilities for adventure in the Centennial State",
        location: "Various",
        price: 20,
        rating: 4.5,
        isFeatured: false,
      },
      {
        id: "rec-6",
        title: "Start with the rock",
        dateRange: "12 Feb - 30 Mar",
        image: require("@/assets/recommend/recommend6.png"),
        description: "Rock climbing and geological wonders of Colorado",
        location: "Rock Formations",
        price: 30,
        rating: 4.7,
        isFeatured: true,
      }
    ];
  }

  // Category-specific explore items
  static getCategoryExploreItems(categoryId: string): ExploreItem[] {
    const baseItems = [
      {
        id: `${categoryId}-1`,
        title: "Local Favorites",
        eventCount: 12,
        image: require("@/assets/explores/explore1.png"),
        category: categoryId,
        description: "Discover local favorites and hidden gems",
        location: "Colorado",
        rating: 4.7,
      },
      {
        id: `${categoryId}-2`, 
        title: "Popular Destinations",
        eventCount: 8,
        image: require("@/assets/explores/explore2.png"),
        category: categoryId,
        description: "Most popular destinations in this category",
        location: "Statewide",
        rating: 4.5,
      }
    ];

    return baseItems;
  }

  // Search functionality
  static searchContent(query: string) {
    const exploreData = this.getExploreData();
    const recommendations = this.getEnhancedRecommendations();
    
    const results = {
      hiking: exploreData.hiking.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      ),
      travels: exploreData.travels.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      ),
      recommendations: recommendations.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase())
      )
    };

    return results;
  }
}