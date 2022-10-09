import Head from "next/head";
import React from "react";
import { WEBSITE_URL } from "../lib/constants";

export default function Meta({
  title = "Annonces airsoft d'occasion | Upgear | Première marketplace d'airsoft en France",
  description = "Achetez et vendez des équipements d'airsoft de façon simple et sécurisée. Créez des annonces pour revendre vos répliques d'airsoft d'occasion.",
  image = `${WEBSITE_URL}/images/previews/website-preview.png`
}) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={title} />
      <meta name="og:description" property="og:description" content={description} />
      <meta property="og:site_name" content="Upgear airsoft" />
      <meta property="og:url" content="" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="upgear.fr" />
      <meta name="twitter:creator" content="" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/static/images/favicon.ico" />
      <meta property="og:image" content={image} />
      <meta name="twitter:image" content="" />
      <link rel="canonical" href="" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
}
