import classes from './AppLogo.module.scss';
import Logo from '../../assets/logo.png';

function AppLogo({ text }: { text?: string }) {
  return (
    <div className={classes.logo}>
      <img src={Logo} alt='GirAff app logo' />
      <span>{text}</span>
    </div>
  );
}

export default AppLogo;
