import classes from './WelcomePage.module.scss';
import { Avatar, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import KanbanBoardImg from '../../assets/kanbanwork1.jpg';
import EastIcon from '@mui/icons-material/East';

const AVA_LINK = 'https://avatars.githubusercontent.com/u/58665427?v=4';

function WelcomePage() {
  const tools = [
    ['Main', 'React JS'],
    ['Storage', 'Redux Toolkit'],
    ['Routing', 'React Router 6.4'],
    ['Forms', 'React Hook Forms'],
    ['Drag And Drop', 'React Beautiful DND'],
    ['Internationalization', 'i18next'],
    ['UI', 'Material UI'],
  ];
  return (
    <div className={classes.welcome}>
      <div className={classes.about}>
        <div className={classes.image}>
          <img src={KanbanBoardImg} alt='kanban board' />
        </div>
        <div className={classes.textcontainer}>
          <Typography className={classes.text} variant='subtitle1' align='center'>
            This App will help you to organize work and increase productivity of your team. <br /> It useful
            for self organizing too.
          </Typography>
        </div>
      </div>
      <div className={classes.video}>
        <iframe src='https://www.youtube.com/embed/S0e_5a2WB60'></iframe>
      </div>

      <Paper elevation={3} className={classes.personalInfo}>
        <div className={classes.hisection}>
          <Avatar className={classes.avatar} alt='Remy Sharp' src={AVA_LINK} sx={{ width: 80, height: 80 }} />
          <Typography className={classes.title} variant='h4'>
            Hi! I'm Vasily
          </Typography>

          <Typography className={classes.title} variant='h5'>
            Frontend developer
          </Typography>

          <Typography className={classes.title} variant='h6'>
            In this app I was using:
          </Typography>

          <List dense>
            {tools.map((tool) => (
              <ListItem>
                {tool[0]} <EastIcon style={{ margin: '0 1rem' }} /> {tool[1]}
              </ListItem>
            ))}
          </List>
        </div>
      </Paper>
    </div>
  );
}

export default WelcomePage;
