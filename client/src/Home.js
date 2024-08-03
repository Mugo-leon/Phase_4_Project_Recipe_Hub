import React from 'react';
import hand from './hand.jpg';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <header>
        <section
          className="hero-section flex items-center justify-center px-6 lg:px-16 py-12 bg-rose-950"
          style={{
            backgroundImage: `url(${hand})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            margin: '0',
            padding: '0',
            boxSizing: 'border-box',
          }}
        >
          <div className="hero-content text-center max-w-lg mx-auto">
            <h1 className="text-[52px] font-semibold mb-8 leading-normal italic text-rose-950"
            style={{ marginTop: '-250px' }}>
              Cooking Made Easy{' '}
              <span className="text-[52px] font-semibold mb-8 leading-normal text-rose-300">
                One Recipe at a Time
              </span>
            </h1>
          
          
          </div>
        </section>
      </header>



      {/* Popular Recipes Section */}
      <section className="popular-recipes-section px-6 py-12 bg-rose-300">
        <h2 className="text-5xl font-bold mb-8 italic text-rose-950 text-center">Popular Recipes</h2>
        <div className="recipe-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="recipe-card bg-rose-300 rounded-lg shadow-lg overflow-hidden  border-rose-950 b_glow">
            <img src="https://weeatatlast.com/wp-content/uploads/2022/03/mishkaki-recipe.jpg" alt="Recipe" className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Mishkaki</h3>
              <p>
                Mishkaki, also known as mshakiki, refers to kabobs (cubed pieces of meat such as chicken, beef, or mutton that are marinated, skewered, and then roasted in a grill).
                It is a popular dish in East African countries, especially in Kenya and Tanzania, as well as in Middle Eastern countries such as Yemen.
              </p>
            </div>
          </div>
          <div className="recipe-card bg-rose-300 rounded-lg shadow-lg overflow-hidden  border-rose-950 b_glow">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW_Ia_NV_DwCkT7E1O_QaRXrAcHPsbdYkZdyK9Ro4yEA&s" alt="Recipe" className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Kenyan Style Stew</h3>
              <p>
                Kenyan stew is a favorite dish for many Kenyans and is easy to prepare. Many different types of meat can be used, including goat, chicken, or beef.
                The aroma of Kenyan stew will delight your senses, and many restaurants in Kenya use it to tempt customers to enter, especially at lunchtime.
              </p>
            </div>
          </div>
          <div className="recipe-card bg-rose-300 rounded-lg shadow-lg overflow-hidden  border-rose-950 b_glow">
            <img src="https://www.willflyforfood.net/wp-content/uploads/2021/06/kenyan-food-pilau.jpg" alt="Recipe" className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Kenyan Pilau</h3>
              <p>
                It seems that rice meals run aplenty in Kenya, and one of the best-tasting is pilau. It’s a Kenyan staple dish that’s widespread in Eastern Africa.
                Considered as the Kenyan and more celebrated version of Nigeria’s jollof rice.
                What makes the pilau in Kenya rich in flavor are the spices, which include cinnamon, cardamom, and cloves. Chicken and beef can be used as protein, with a bottle of ice-cold Tusker to wash down this delectable Kenyan dish.
              </p>
            </div>
          </div>
          <div className="recipe-card bg-rose-300 rounded-lg shadow-lg overflow-hidden  border-rose-950 b_glow">
            <img src="https://i.pinimg.com/736x/02/2e/21/022e21cd2998695421a53b0d831d0349.jpg" alt="Recipe" className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Githeri</h3>
              <p>
                This is a cheap and well-balanced meal. Get githeri and the vegetables of your choice from the kibanda and go make a delicious meal. Of course, githeri is never complete without avocado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section px-6 py-12 bg-rose-300">
        <h2 className="text-5xl font-bold mb-8 text-rose-950 text-center">About Us</h2>
        <p>
          Welcome to our Recipe Hub, where culinary enthusiasts and professional chefs come together to share their passion for cooking and discover new flavors. Our platform provides a vibrant community for chefs to showcase their expertise by posting mouth-watering recipes and culinary creations.
          Whether you're a seasoned chef looking to share your signature dishes or a cooking novice eager to explore the world of gastronomy, our app offers a diverse range of recipes for every skill level and taste preference.
        </p>
        <p>Join our community to:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Explore a vast collection of recipes from talented chefs around the world.</li>
          <li>Discover new cooking techniques, ingredients, and flavor combinations.</li>
          <li>Connect with fellow food enthusiasts, share cooking tips, and exchange culinary experiences.</li>
          <li>Showcase your culinary creations and receive feedback from a supportive community of chefs and food lovers.</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="footer bg-rose-950 text-rose-200 py-6">
        <div className="footer-content px-6">
          <div className="footer-section contact">
            <h3 className="text-xl font-semibold mb-4 text-center">Contact Us</h3>
            <ul>
              <li><b>Email:</b> info@recipehub.com</li>
              
              <li><b>Phone:</b> +254-456-7890</li>
              <li><b>Address:</b> 123 Nairobi Street, Nairobi, KENYA</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom text-center py-4">
          <p>&copy; 2024 The Recipe Corner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
