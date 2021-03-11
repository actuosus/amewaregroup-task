import useDarkMode from "../../lib/hooks/useDarkMode";

const styles = {
  root: {
    display: "flex",
    height: 60,
    minHeight: 60,
    marginTop: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
};

const Footer = () => {
  const isDarkMode = useDarkMode();

  return (
    <div
      className={`footer App-footer ${isDarkMode ? "bg-dark" : "bg-light"}`}
      style={styles.root}
    >
      <div className={`${isDarkMode ? "text-light" : "text-dark"}`}>
        Developed by <a href="https://github.com/actuosus">Arthur Chafonov</a>{" "}
        using <a href="https://reactjs.org/">React.js</a> and <a href="https://getbootstrap.com/">Bootstrap</a>.
      </div>
    </div>
  );
};

export default Footer;
