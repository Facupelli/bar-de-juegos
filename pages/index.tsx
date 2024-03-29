import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoginInput from "../src/components/LoginInpunt/LoginInput";
import Modal from "../src/components/Modal/Modal";
import Nav from "../src/components/Nav/Nav";

import s from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={s.container}>
      <Head>
        <title>Bar de juegos</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main className={s.main}>
        <h1>JOBS</h1>
        <LoginInput />
      </main>

      <footer className={s.footer}></footer>
    </div>
  );
}
