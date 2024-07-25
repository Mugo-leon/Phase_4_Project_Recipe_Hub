import React from 'react';
import pancakeImage from './pancake.jpg';
import background from './background.jpg';


const Home = () => {
  return (
    
    <div data-aos='fade-down' className="flex flex-col-reverse lg:flex-row justify-between items-center gap-5 lg:gap-28 w-full px-0 py-0">
      
    <div style={{ backgroundColor: '#4c0519' }} className="h-full lg:py-40 flex flex-col justify-center lg:items-start items-center text-white text-left">
      <header>
        <section
  className="hero-section flex flex-col lg:flex-row items-center justify-between lg:space-x-8 px-6 lg:px-16 py-12 bg-rose-950"
  style={{
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <div className="hero-content w-full lg:w-1/2 text-left">
    <h1 className="text-[52px] font-semibold mb-8 leading-normal italic">
      Cooking Made Easy  <span className="text-[52px] font-semibold mb-8 leading-normal text-slate-950">
        One Recipe at a Time
      </span>
    </h1>
    <p className="text-lg lg:text-xl leading-relaxed">
      From savory main courses to delectable desserts, 
      our recipe collection has something for everyone. 
      Whether you're planning a cozy family dinner, a romantic date night, or a festive gathering with friends, we've got you covered. 
      Get ready to unleash your culinary creativity and delight your taste buds with our irresistible dishes!
    </p>
  </div>
</section>

      </header>

      <section className="popular-recipes-section">
        <h2>Popular Recipes</h2>
        <div className="recipee-cards">
          <div className="recipe-cards">
            <img src="https://weeatatlast.com/wp-content/uploads/2022/03/mishkaki-recipe.jpg" alt="Recipe" />
            <h3>Mishkaki</h3>
            <p>Mishkaki, also known as mshakiki, refers to kabobs (cubed pieces of meat such as chicken, beef, or mutton that are marinated, skewered, and then roasted in a grill). 
              It is a popular dish in East African countries, especially in Kenya and Tanzania, as well as in Middle Eastern countries such as Yemen. </p>
          </div>
          <div className="recipe-cards">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW_Ia_NV_DwCkT7E1O_QaRXrAcHPsbdYkZdyK9Ro4yEA&s" alt="Recipe" />
            <h3>Kenyan Style Stew</h3>
            <p>Kenyan stew is a favorite dish for many Kenyans and is easy to prepare. Many different types of meat can be used, including goat, chicken, or beef. 
              The aroma of Kenyan stew will delight your senses, and many restaurants in Kenya use it to tempt customers to enter, especially at lunchtime.</p>
          </div>
          <div className="recipe-cards">
            <img src="https://www.willflyforfood.net/wp-content/uploads/2021/06/kenyan-food-pilau.jpg" alt="Recipe" />
            <h3>Kenyan Pilau</h3>
            <p>It seems that rice meals run aplenty in Kenya, and one of the best-tasting is pilau. It’s a Kenyan staple dish that’s widespread in Eastern Africa. 
            Considered as the Kenyan and more celebrated version of Nigeria’s jollof rice.
            What makes the pilau in Kenya rich in flavor are the spices, which include cinnamon, cardamom, and cloves. Chicken and beef can be used as protein, with a bottle of ice-cold Tusker to wash down this delectable Kenyan dish.</p>
          </div>
          <div className="recipe-cards">
            <img src="https://i.pinimg.com/736x/02/2e/21/022e21cd2998695421a53b0d831d0349.jpg" alt="Recipe" />
            <h3>Githeri</h3>
            <p>This is a cheap and well-balanced meal. Get githeri and the vegetables of your choice from the kibanda and go make a delicious meal. Of course, githeri is never complete without avocado.</p>
          </div>
        </div>
      </section>

      <section className="about-section">
  <h2>About Recipe Hub</h2>
  <p>Welcome to our Recipe Hub, where culinary enthusiasts and professional chefs come together to share their passion for cooking and discover new flavors. Our platform provides a vibrant community for chefs to showcase their expertise by posting mouth-watering recipes and culinary creations.
  Whether you're a seasoned chef looking to share your signature dishes or a cooking novice eager to explore the world of gastronomy, our app offers a diverse range of recipes for every skill level and taste preference.</p>
  <p>Join our community to:</p>
  <ul>
    <li>Explore a vast collection of recipes from talented chefs around the world.</li>
    <li>Discover new cooking techniques, ingredients, and flavor combinations.</li>
    <li>Connect with fellow food enthusiasts, share cooking tips, and exchange culinary experiences.</li>
    <li>Showcase your culinary creations and receive feedback from a supportive community of chefs and food lovers.</li>
  </ul>

      </section>
      
      <footer class="footer">
  <div class="footer-content">
 
    <div class="footer-section contact">
      <h3>Contact Us</h3>
      <ul>
        <li><b>Email: info@recipehub.com</b></li>
        <li>Phone: +254-456-7890</li>
        <li>Address: 123 Nairobi Street, Nairobi, KENYA</li>
      </ul>
    </div>
    
  </div>
  <div class="footer-bottom">
    <p>&copy; 2024 The Recipe Corner. All rights reserved.</p>
  </div>
</footer>
    </div>
    </div>
  );
};

export default Home;