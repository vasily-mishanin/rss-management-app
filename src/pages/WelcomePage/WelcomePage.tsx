import classes from './WelcomePage.module.scss';
import { Avatar, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import KanbanBoardImg from '../../assets/kanbanwork1.jpg';
import EastIcon from '@mui/icons-material/East';
import { useTranslation, Trans } from 'react-i18next';

const AVA_LINK = 'https://avatars.githubusercontent.com/u/58665427?v=4';

function WelcomePage() {
  const { t, i18n } = useTranslation();

  const tools = [
    ['Main', 'React JS', 'https://reactjs.org/'],
    ['Storage', 'Redux Toolkit', 'https://redux-toolkit.js.org/'],
    ['Routing', 'React Router 6.4', 'https://reactrouter.com/en/main'],
    ['Forms', 'React Hook Forms', 'https://react-hook-form.com/'],
    ['Drag And Drop', 'React Beautiful DND', 'https://github.com/atlassian/react-beautiful-dnd'],
    ['Internationalization', 'i18next', 'https://react.i18next.com/'],
    ['UI', 'Material UI', 'https://mui.com/'],
  ];
  return (
    <div className={classes.welcome}>
      <div className={classes.about}>
        <div className={classes.image}>
          <img src={KanbanBoardImg} alt='kanban board' />
        </div>
        <div className={classes.textcontainer}>
          <Typography className={classes.text} variant='subtitle1' align='center'>
            <Trans i18nKey='aboutApp'>
              This is <em className={classes.name}>GirAff</em>. <br /> The App will help you to organize work
              and increase productivity of your team. <br /> It useful for self organizing too.
            </Trans>
          </Typography>
        </div>
      </div>
      <div className={classes.video}>
        <iframe title='how to use the app' src='https://www.youtube.com/embed/MsJsml8baFA'></iframe>
      </div>

      <Paper elevation={3} className={classes.personalInfo}>
        <div className={classes.hisection}>
          <Avatar className={classes.avatar} alt='Remy Sharp' src={AVA_LINK} sx={{ width: 80, height: 80 }} />
          <Typography className={classes.title} variant='h4'>
            <Trans i18nKey='hi'>Hi! I'm Vasily</Trans>
          </Typography>

          <Typography className={classes.title} variant='h5'>
            <Trans i18nKey='frontentdDeveloper'>Frontend developer</Trans>
          </Typography>

          <Typography className={classes.title} variant='h6'>
            <Trans i18nKey='wasUsing'>In this app I was using:</Trans>
          </Typography>

          <List dense>
            {tools.map((tool, index) => (
              <ListItem key={index}>
                {tool[0]} <EastIcon style={{ margin: '0 1rem' }} />{' '}
                <a className={classes.link} href={tool[2]}>
                  {tool[1]}
                </a>
              </ListItem>
            ))}
          </List>
        </div>
      </Paper>
    </div>
  );
}

export default WelcomePage;
