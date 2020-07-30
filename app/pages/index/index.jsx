import Head from 'next/head';
import style from './style.module.scss';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={style.test}>
        x
      </div>
    </div>
  );
}
