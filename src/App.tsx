import React from 'react';
import './App.css';
import logo from './assets/logo.svg';
const lorenipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas integer eget aliquet nibh praesent. Velit scelerisque in dictum non consectetur a. Ullamcorper sit amet risus nullam. Facilisis volutpat est velit egestas dui id ornare. Ante metus dictum at tempor commodo ullamcorper a. Nibh tortor id aliquet lectus proin nibh nisl condimentum id. Vulputate sapien nec sagittis aliquam. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. Odio tempor orci dapibus ultrices in iaculis. Lacinia at quis risus sed. Consequat interdum varius sit amet mattis vulputate. Integer quis auctor elit sed vulputate mi sit amet mauris. Sed tempus urna et pharetra pharetra massa massa ultricies mi. Nunc sed blandit libero volutpat sed cras ornare arcu. Libero volutpat sed cras ornare. Habitant morbi tristique senectus et netus et malesuada fames. Iaculis eu non diam phasellus vestibulum lorem.'
const App:React.FC = () => {
  return (
    <>
    <div className='header'>
      <div className='logo'>  
        <img className='logo-img' src={logo} alt=''/>
      </div>
      <div className='nav-bar'>
        <div className='nav'>Туры</div>
        <div className='nav'>Контакты</div>
        <div className='nav'>О нас</div> 
      </div>
    </div>
    <div className='body' >
      <div className='about'>
        <div className="title">Lorem ipsum</div>
        <div className="content">{lorenipsum}</div>
      </div>
    </div>
    <div className='footer'  >
    <div className='contacts'>
      Контакты:
      <div className='contact'>
      +7 923 - Адель
    </div>
    <div className='contact'>
      +7 923 - Адель
    </div>
    <div className='contact'>
      +7 923 - Адель
    </div>
    <div className='contact'>
      +7 923 - Адель
    </div>
    </div>
    <div className='rights'>
    © Все права защищены. ООО "Турфирма".
    </div>
    </div>
    </>
  );
}



export default App;
