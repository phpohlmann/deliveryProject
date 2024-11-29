import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface FoodItem {
  id: string;
  name: string;
  price: number;
  time: string;
  delivery: number;
  rating: number;
  image: string;
  restaurantId: string;
  description: string;
}

const RestaurantPage: React.FC = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch('https://apifakedelivery.vercel.app/foods');
        if (!response.ok) {
          throw new Error('Failed to fetch foods');
        }
        const data: FoodItem[] = await response.json();
        const filteredFoods = data.filter(food => food.restaurantId === id);
        setFoods(filteredFoods);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError('Failed to load foods. Please try again later.');
        setLoading(false);
      }
    };

    fetchFoods();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Carregando...</div>
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
      <h1 className="text-3xl font-bold mb-6 text-white">Cardápio do Restaurante</h1>
      {foods.length === 0 ? (
        <p className="text-white text-xl">Nenhum item encontrado para este restaurante.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map((food) => (
            <div key={food.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-white mb-2">{food.name}</h2>
                <p className="text-gray-400 text-sm mb-2">{food.description}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-bold">R$ {food.price.toFixed(2)}</span>
                  <span className="text-gray-400 text-sm">{food.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="text-white">{food.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-400 text-sm">Entrega: R$ {food.delivery.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;

