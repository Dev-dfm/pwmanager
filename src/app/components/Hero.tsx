import React from 'react';
import styles from './Hero.module.css';

type HeroProps = {
  title: string;
  imgSrc: string;
};

function Hero({ title, imgSrc }: HeroProps): JSX.Element {
  return (
    <header className={styles.hero}>
      <h1 className={styles.hero_title}> {title} </h1>
      <img className={styles.hero_image} src={imgSrc} alt="" />
    </header>
  );
}

export default Hero;
