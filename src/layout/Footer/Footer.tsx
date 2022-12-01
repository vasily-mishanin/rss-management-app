import classes from './Footer.module.scss';

import GithubLogo from '../../assets/logo-gh.png';

const SCHOOL_LINK = 'https://rs.school/';

const ghLinks = [
  {
    link: 'https://github.com/vasily-mishanin',
    name: 'vasily-mishanin',
  },
];

const Footer = (): JSX.Element => {
  const forbiddenPaths = ['/boards', '/signin'];

  const isPathForbidden = (path: string) => forbiddenPaths.some((p) => p === path);

  return (
    <div>
      {!isPathForbidden(window.location.pathname) && (
        <div className={classes.footer_wrapper}>
          <div className={classes.footer_copyrights}>
            {ghLinks.map((el) => (
              <a key={el.link} href={el.link} target='_blank' rel='noreferrer'>
                <img src={GithubLogo} alt='Github' />
                <span>{el.name}</span>
              </a>
            ))}
          </div>

          <div className={classes.footer_year}>&copy; 2022</div>

          <div className={classes.footer_rss_link}>
            <a href={SCHOOL_LINK} target='_blank' rel='noreferrer'></a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
