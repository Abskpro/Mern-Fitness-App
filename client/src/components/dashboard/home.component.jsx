import React, {Component} from 'react';
import NavbarComp from '../layout/navbar.component.js';
import banner from '../../assets/woman-fitness.jpg';
import '../../styles/Home.css';
import arnold from '../../assets/arnold.jpg';

const Home = () => {
  return (
    <div>
      <NavbarComp />
      <main>
        <section class="banner">
          <img src={banner} alt="#" />
        </section>
        <section class="review">
          <article>
            <h2>See what our user have to say?</h2>
            <div id="user">
              <img src={arnold} alt="#" />
              <div>
                <p>
                  This app is really amazing , I 100% recommends it to you.Since
                  I started using this app i was able to win Mr Olympia 7 time.
                </p>
              </div>
            </div>
          </article>
        </section>
        <footer></footer>
      </main>
    </div>
  );
};

export default Home;
