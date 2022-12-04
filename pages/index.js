import Head from 'next/head';
import Image from 'next/image';
import CardForm from '../components/CardForm';
import styles from '../styles/Home.module.css';

export default function Home() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('Submitted');
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Drew Olsen - Credit card component demonstration</title>
        <meta
          name="description"
          content="credit card component demonstration"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1>Pay Us</h1>
      </header>

      <main className={styles.main}>
        <section className={styles.card_container}>
          <div className={styles.card}>
            <div className={styles.card_icon}>Card Icon</div>
            <div className={styles.card_numbers}>
              <span>1234</span>
              <span>5678</span>
              <span>9012</span>
              <span>3456</span>
            </div>
            <div className={styles.lower_wrapper}>
              <div className={styles.name}>
                <span>Card Holder</span>
                <p>Full Name</p>
              </div>
              <div className={styles.expiration}>
                <span>Expires</span>
                <p>MM/YY</p>
              </div>
            </div>
          </div>
        </section>
        <CardForm />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://drewolsen.design"
          target="_blank"
          rel="noopener noreferrer"
        >
          Drew Olsen
        </a>
      </footer>
    </div>
  );
}
