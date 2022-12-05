import classes from './WelcomePage.module.scss';
import { Avatar, Typography, Paper } from '@mui/material';
import AppLogo from '../../components/AppLogo/AppLogo';

const AVA_LINK = 'https://avatars.githubusercontent.com/u/58665427?v=4';

function WelcomePage() {
  return (
    <div className={classes.welcome}>
      <Paper elevation={3} className={classes.personalInfo}>
        <div className={classes.hisection}>
          <Avatar className={classes.avatar} alt='Remy Sharp' src={AVA_LINK} sx={{ width: 80, height: 80 }} />
          <Typography className={classes.title} variant='h4'>
            Hi! I'm Vasily
          </Typography>
        </div>
        <Typography className={classes.title} variant='h5' gutterBottom>
          Frontend developer
        </Typography>
        <Typography className={classes.title} variant='body1' gutterBottom>
          Driven self-taught student leveraging studies in Frontend development seeks real-world experience as
          trainee/junior. Offers strong interpersonal and task prioritization skills, eager to learn new and
          develop cool stuff for all people.
        </Typography>
      </Paper>

      <Paper elevation={2} className={classes.picture}></Paper>

      <Paper elevation={2} className={classes.projectInfo}>
        <AppLogo />

        <Typography className={classes.title} variant='h3' gutterBottom>
          This App will help you to become more productive
        </Typography>

        <Typography className={classes.title} variant='h4'>
          Wait! It'll REALLY help you!
        </Typography>

        <Typography variant='body2' display='block' gutterBottom color='salmon'>
          not like other Apps
        </Typography>

        <Typography className={classes.title} variant='h4'>
          Heh.. I used: Typescript, React, RTK, react-hook-form in this app. <br /> I definetely will finish
          and polish this app for my portfolio.
        </Typography>
      </Paper>
    </div>
  );
}

export default WelcomePage;
