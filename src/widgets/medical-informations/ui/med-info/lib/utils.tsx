import { PATH_PAGE } from '~shared/lib/react-router';
import DocumentCardICO from '../svg/document-card-ico.svg';

export const cardsNavigate = (patientId: string) => [
  {
    id: 1,
    title: <>Медицинская карта <br /> 043-У</>,
    ico: <DocumentCardICO />,
    link: PATH_PAGE.medInfo.detail(patientId, '1'),
  },
  {
    id: 2,
    title: <>Медицинская карта <br /> 043-1/У</>,
    ico: <DocumentCardICO />,
    link: PATH_PAGE.medInfo.detail(patientId, '2'),
  },
  {
    id: 3,
    title: 'Лист учета дозовых нагрузок',
    ico: <DocumentCardICO />,
    link: PATH_PAGE.medInfo.detail(patientId, '3'),
  },
  {
    id: 4,
    title: 'Гарантийные сроки и сертификат',
    ico: <DocumentCardICO />,
    link: PATH_PAGE.medInfo.detail(patientId, '4'),
  },
  {
    id: 5,
    title: <>Зубная <br /> формула</>,
    ico: <DocumentCardICO />,
    link: PATH_PAGE.medInfo.detail(patientId, '5'),
  },
  {
    id: 6,
    title: <>Таблица <br /> приема</>,
    ico: <DocumentCardICO />,
    link: PATH_PAGE.medInfo.detail(patientId, '6'),
  },
];
