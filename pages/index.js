import styles from "../styles/Home.module.css";
import { Toolbar } from "../components/toolbar";

export default function Home() {
  return (
    <div className="page-container">
      <Toolbar />
      <div className={styles.main}>
        <h1>Next.js News</h1>
        <h1>People make complicated and enjoy cái moment này</h1>
      </div>
    </div>
  );
}
