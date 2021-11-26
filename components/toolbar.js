import { useRouter } from "next/dist/client/router";
import styles from "../styles/Toolbar.module.css";

export const Toolbar = () => {
  const router = useRouter();

  return (
    <div className={styles.main}>
      <div onClick={() => router.push("/")}>Home</div>
      <div onClick={() => router.push("/feed/1")}>Feed</div>
      <div onClick={() => router.push("/profile")}>Profile</div>
      <div onClick={() => (window.location.href = "https://fb.com/ta.anh99")}>
        Facebook
      </div>
    </div>
  );
};
