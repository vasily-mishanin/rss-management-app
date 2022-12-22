import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          create: 'Create New Board',
          boards: 'All Boards',
          signout: 'Sign Out',
          signin: 'Sign In',
          signup: 'Sign Up',
          profile: 'Here you can change your profile data',
          deleteCurrent: 'Delete Current User',
          submitChanges: 'Submit Changes',
          yes: 'Yes',
          cancel: 'Cancel',
          addNewBoard: 'Add New Board',
          updateBoard: 'Update this board',
          addNewColumn: 'Add new column',
          updateColumn: 'Update this column',
          add: 'Add',
          update: 'Update',
          delete: 'Delete',
          addNewTask: 'Add New Task',
          aboutApp:
            'This is <1>GirAff</1>. <br/>The App will help you to organize work and increase productivity of your team. <br /> It is useful for self organizing too.',
          hi: "Hi! I'm Vasily",
          frontentdDeveloper: 'Frontend developer',
          wasUsing: 'In this app I was using:',
        },
      },
      ru: {
        translations: {
          create: 'Создать новую доску',
          boards: 'Все доски',
          signout: 'Выйти',
          signin: 'Вход',
          signup: 'Регистрация',
          profile: 'Здесь вы можете изменить данные своего профиля',
          deleteCurrent: 'Удалить текущего пользователя',
          submitChanges: 'Сохранить изменения',
          yes: 'Да',
          cancel: 'Отмена',
          addNewBoard: 'Добавить новую доску',
          updateBoard: 'Обновить эту доску',
          addNewColumn: 'Добавить новую колонку',
          updateColumn: 'Обновить эту колонку',
          add: 'Добавить',
          update: 'Обновить',
          delete: 'Удалить',
          addNewTask: 'Новое задание',
          aboutApp:
            'Это <1>GirAff</1>. <br/>  Приложение поможет организовать работу и повысить продуктивность вашей команды.  <br /> Оно также полезно для самоорганизации ',
          hi: 'Привет! Я Василий',
          frontentdDeveloper: 'Фронтенд разработчик',
          wasUsing: 'В этом приложении я использовал:',
        },
      },
    },
    fallbackLng: 'en',
    debug: true,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
