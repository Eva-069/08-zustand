import css from "./page.module.css";
import type { Metadata } from "next";

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
export default NotFound;

export const metadata: Metadata = {
  title: "404 - Page not found",
  description: "Sorry, the page you are looking for does not exis",
  openGraph: {
    title: '404 - Page not found',
    description: "Sorry, the page you are looking for does not exist",
    url: 'https://notehub.com/not-found',
    images: [{
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 1200,
      height: 630,
      alt:'404 - Page not found'
    },],
    type:'website',
  },
};