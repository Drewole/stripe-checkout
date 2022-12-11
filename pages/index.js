import Head from 'next/head';
import Image from 'next/image';
import CardForm from '../components/CardForm/CardForm';
import { CreditCardCheckout } from '../components/CreditCardCheckout/CreditCardCheckout';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Drew Olsen - Credit card component demonstration</title>
        <meta
          name="description"
          content="credit card component demonstration"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1>Credit Card Checkout Component</h1>
      </header>

      <main>
        <CreditCardCheckout />
      </main>

      <footer>
        <p>
          Built By{' '}
          <a
            href="https://drewolsen.design"
            target="_blank"
            rel="noopener noreferrer"
          >
            Drew Olsen
          </a>
        </p>
      </footer>
    </div>
  );
}
