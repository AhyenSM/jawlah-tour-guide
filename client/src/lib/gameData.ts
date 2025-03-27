export interface GameScenario {
  id: number;
  title: string;
  description: string;
  choices: {
    id: string;
    text: string;
    description: string;
    points: number;
  }[];
}

export const gameScenarios: GameScenario[] = [
  {
    id: 1,
    title: "You just landed in Doha",
    description: "After a long flight, you've arrived in Qatar's capital. It's your first time in the country and you're excited to explore. How would you like to discover the city?",
    choices: [
      {
        id: "A",
        text: "Hire a private guide",
        description: "Get personalized attention and customize your experience",
        points: 7
      },
      {
        id: "B",
        text: "Join a group tour",
        description: "Meet other travelers while exploring key attractions",
        points: 5
      },
      {
        id: "C",
        text: "Explore solo",
        description: "Wander at your own pace with no fixed schedule",
        points: 3
      },
      {
        id: "D",
        text: "Ask hotel concierge",
        description: "Get recommendations and then decide your plan",
        points: 4
      }
    ]
  },
  {
    id: 2,
    title: "Traditional Qatari Cuisine",
    description: "Your guide suggests stopping for lunch at a local restaurant serving authentic Qatari dishes you've never tried before, including Machboos and Madrouba.",
    choices: [
      {
        id: "A",
        text: "Try everything enthusiastically",
        description: "Fully embrace the culinary adventure",
        points: 8
      },
      {
        id: "B",
        text: "Ask for small samples first",
        description: "Cautiously explore the new flavors",
        points: 6
      },
      {
        id: "C",
        text: "Stick to familiar options",
        description: "Look for international dishes on the menu",
        points: 2
      },
      {
        id: "D",
        text: "Ask for recommendations",
        description: "Let the guide suggest beginner-friendly dishes",
        points: 4
      }
    ]
  },
  {
    id: 3,
    title: "Desert Safari Booking",
    description: "You're eager to experience a desert safari, but it's peak tourist season. The best tours are filling up quickly and prices are higher than normal.",
    choices: [
      {
        id: "A",
        text: "Pay premium for priority",
        description: "Book the best experience regardless of cost",
        points: 7
      },
      {
        id: "B",
        text: "Book an early morning tour",
        description: "Less popular time slot but same experience",
        points: 5
      },
      {
        id: "C",
        text: "Wait for another day",
        description: "Adjust your schedule to find better rates",
        points: 3
      },
      {
        id: "D",
        text: "Ask a local for alternatives",
        description: "Find a less touristy option with insider help",
        points: 6
      }
    ]
  },
  {
    id: 4,
    title: "Cultural Etiquette Challenge",
    description: "You're visiting a traditional area and notice different cultural practices. Your guide mentions some local customs that visitors should respect.",
    choices: [
      {
        id: "A",
        text: "Ask detailed questions",
        description: "Learn and follow all customs carefully",
        points: 8
      },
      {
        id: "B",
        text: "Observe locals first",
        description: "Follow their example before acting",
        points: 6
      },
      {
        id: "C",
        text: "Maintain your normal behavior",
        description: "They should understand you're a tourist",
        points: 2
      },
      {
        id: "D",
        text: "Stay back and just observe",
        description: "Avoid interaction to prevent mistakes",
        points: 4
      }
    ]
  },
  {
    id: 5,
    title: "Unexpected Schedule Change",
    description: "Your planned visit to a major attraction has been cancelled due to an unexpected closure. You have a free afternoon in your itinerary now.",
    choices: [
      {
        id: "A",
        text: "Ask your guide for alternatives",
        description: "Trust their expertise to find something equally interesting",
        points: 7
      },
      {
        id: "B",
        text: "Research quickly online",
        description: "Find your own replacement activity",
        points: 5
      },
      {
        id: "C",
        text: "Ask locals for recommendations",
        description: "Find authentic experiences off the tourist path",
        points: 6
      },
      {
        id: "D",
        text: "Take the time to relax",
        description: "Enjoy some downtime at your hotel",
        points: 3
      }
    ]
  }
];
