import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: string;
  description: string;
}

const HomePage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('https://apifakedelivery.vercel.app/restaurants');
        if (!response.ok) {
          throw new Error('Failed to fetch restaurants');
        }
        const data = await response.json();
        setRestaurants(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError('Failed to load restaurants. Please try again later.');
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4">
      <h1 className="text-3xl font-bold mb-6 text-white">Restaurantes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id}>
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-white mb-2">{restaurant.name}</h2>
                <p className="text-gray-400 text-sm mb-2">{restaurant.description}</p>
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="text-white">{restaurant.rating}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

