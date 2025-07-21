const mongoose = require('mongoose');
require('dotenv').config();

const Restaurant = require('./models/Restaurant');
const FoodItem = require('./models/FoodItem');

const MONGO_URI = process.env.MONGO_URI;

const restaurantsData = [
  {
    name: 'Pizza Palace',
    address: '123 Main St',
    category: 'Italian',
  },
  {
    name: 'Sushi World',
    address: '456 Elm St',
    category: 'Japanese',
  },
];

const foodItemsData = [
  {
    restaurantName: 'Pizza Palace',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce and mozzarella cheese',
    price: 12.99,
    category: 'Pizza',
  },
  {
    restaurantName: 'Pizza Palace',
    name: 'Pepperoni Pizza',
    description: 'Pepperoni, tomato sauce, and mozzarella cheese',
    price: 14.99,
    category: 'Pizza',
  },
  {
    restaurantName: 'Sushi World',
    name: 'California Roll',
    description: 'Crab, avocado, and cucumber roll',
    price: 8.99,
    category: 'Sushi',
  },
  {
    restaurantName: 'Sushi World',
    name: 'Spicy Tuna Roll',
    description: 'Tuna with spicy mayo',
    price: 9.99,
    category: 'Sushi',
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for seeding');

    // Clear existing data
    await Restaurant.deleteMany({});
    await FoodItem.deleteMany({});

    // Insert restaurants
    const insertedRestaurants = await Restaurant.insertMany(restaurantsData);
    console.log('Restaurants inserted');

    // Map restaurant names to their IDs
    const restaurantMap = {};
    insertedRestaurants.forEach((rest) => {
      restaurantMap[rest.name] = rest._id;
    });

    // Prepare food items with restaurant ObjectId
    const foodItemsToInsert = foodItemsData.map((item) => ({
      restaurant: restaurantMap[item.restaurantName],
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
    }));

    // Insert food items
    await FoodItem.insertMany(foodItemsToInsert);
    console.log('Food items inserted');

    mongoose.disconnect();
    console.log('Seeding completed and disconnected');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

seed();
