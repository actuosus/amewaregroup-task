const styles = {
  root: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
};

interface LogoProps {
  style?: React.CSSProperties;
}

const Logo = ({ style }: LogoProps) => {
  return (
    <img
      src="https://clinicaltables.nlm.nih.gov/lhncbc.jpg"
      style={{ ...styles.root, ...style }}
      alt="LHNCBC"
    />
  );
};

export default Logo;
