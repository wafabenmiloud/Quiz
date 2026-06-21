const questions = [
  {
    id: 1,
    question: "What's your ideal weekend plan?",
    options: [
      "An adventure trip or trying something bold and new",
      "Relaxing at home with great food and comfort",
      "Hanging out with a big, fun group of friends",
      "Quiet time alone — reflecting, journaling, or dreaming",
    ],
  },
  {
    id: 2,
    question: "When you face a big decision, you...",
    options: [
      "Trust your gut and act fast",
      "Carefully weigh every pro and con",
      "Ask everyone around you for their opinion",
      "Wait until something feels emotionally right",
    ],
  },
  {
    id: 3,
    question: "Your friends would describe you as...",
    options: [
      "Energetic, fearless, and always up for a challenge",
      "Reliable, grounded, and someone they can count on",
      "Witty, curious, and great at conversation",
      "Warm, empathetic, and deeply caring",
    ],
  },
  {
    id: 4,
    question: "How do you handle conflict?",
    options: [
      "Face it head-on — I say what I think immediately",
      "Stay calm, take time, then resolve it practically",
      "Talk it through — words are my best tool",
      "Withdraw until my emotions settle, then reconnect",
    ],
  },
  {
    id: 5,
    question: "What motivates you most in life?",
    options: [
      "Winning, achieving goals, and being the best",
      "Security, comfort, and long-term stability",
      "Ideas, learning, and intellectual growth",
      "Deep, meaningful connections with others",
    ],
  },
  {
    id: 6,
    question: "Your perfect first date would be...",
    options: [
      "A spontaneous road trip with no plan",
      "A cozy homemade dinner by candlelight",
      "An art gallery, book fair, or live music",
      "A walk along the beach or lake at sunset",
    ],
  },
  {
    id: 7,
    question: "When you're stressed, you tend to...",
    options: [
      "Channel it into physical activity or action",
      "Stick to routines and comfort food",
      "Vent to friends or scroll through social media",
      "Cry it out, journal, or listen to emotional music",
    ],
  },
  {
    id: 8,
    question: "Which element do you feel most connected to?",
    options: [
      "Fire — transformative, passionate, and powerful",
      "Earth — solid, stable, and nurturing",
      "Wind — free, ever-changing, and curious",
      "Water — deep, mysterious, and emotional",
    ],
  },
  {
    id: 9,
    question: "Your biggest personal strength is...",
    options: [
      "Courage and sheer determination",
      "Patience and unwavering dependability",
      "Curiosity and quick adaptability",
      "Intuition and deep compassion",
    ],
  },
  {
    id: 10,
    question: "In a group project, you usually...",
    options: [
      "Step up and take charge — you lead the team",
      "Handle the detailed, hands-on practical work",
      "Generate creative ideas and keep energy high",
      "Make sure everyone feels heard and included",
    ],
  },
  {
    id: 11,
    question: "What do you value most in a close friendship?",
    options: [
      "Unwavering loyalty through thick and thin",
      "Honesty and complete trustworthiness",
      "Fun, stimulating, and wide-ranging conversations",
      "Emotional depth and unconditional support",
    ],
  },
  {
    id: 12,
    question: "Your dream home would be...",
    options: [
      "A loft in a vibrant, fast-paced city",
      "A cozy cottage surrounded by nature",
      "A sleek modern penthouse with city views",
      "A peaceful house right beside the ocean or a lake",
    ],
  },
];

// answers[i] maps each option index → element: 0=Fire, 1=Earth, 2=Air, 3=Water
const answers = [
  [0, 1, 2, 3],
  [0, 1, 2, 3],
  [0, 1, 2, 3],
  [0, 1, 2, 3],
  [0, 1, 2, 3],
  [0, 1, 2, 3],
  [0, 1, 2, 3],
  [0, 1, 2, 3],
  [0, 1, 2, 3],
  [0, 1, 2, 3],
  [0, 1, 2, 3],
  [0, 1, 2, 3],
];

module.exports = { questions, answers };
