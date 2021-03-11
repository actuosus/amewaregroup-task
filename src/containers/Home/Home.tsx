import { useEffect } from "react";
import useDarkMode from "../../lib/hooks/useDarkMode";

function Home() {
  const isDarkMode = useDarkMode();

  useEffect(() => {
    document.title = 'Ameware Group Task';
  }, [])

  return (
    <div>
      <h2 className={`${isDarkMode ? 'text-light' : 'text-dark'}`}>Ameware Group Task React.js application</h2>
    </div>
  );
}

export default Home;
