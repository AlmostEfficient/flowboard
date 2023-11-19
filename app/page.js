import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <header>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.93em' font-size='90'>key</text></svg>"
        />
      </header>
      <main className={styles.main}></main>
    </>
  );
}
