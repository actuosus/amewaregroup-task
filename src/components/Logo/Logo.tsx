const styles = {
  root: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
};

const Logo = () => {
  return (
    <img
      src="https://clinicaltables.nlm.nih.gov/lhncbc.jpg"
      style={styles.root}
      alt="LHNCBC"
    />
  );
};

export default Logo;
