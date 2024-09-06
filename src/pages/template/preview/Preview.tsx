import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTemplateGetOne } from '~features/draggable-list';
import s from './styles.module.scss';

type Params = {
  id: string;
  subTemplateId: string;
};

export function Preview() {
  const params = useParams<Params>();
  const navigate = useNavigate();
  const { data } = useTemplateGetOne(params.id as string);

  // const { templates, handleTemplatesTitle } = useDraggableSlice();

  const subTemplate = useMemo(() => data?.subTemplates.find(({ id }) => params.subTemplateId === id.toString()), [data]);
  console.log('subTemplate', subTemplate);

  if (!data || !subTemplate) {
    navigate(-1);
    return null;
  }

  return (
    <div className={s.wrapper}>
      <div
        className={s.draggable}
      >
        <div className={s.headBlock}>
          {data.name}. {subTemplate.name}
        </div>
      </div>
      <div
        className={s.draggable}
      >
        <div className={s.headBlock}>
          {data.techInfo}
        </div>
      </div>

      {subTemplate.bodyBlocks.map((template) => (
        <div key={template.id}>
          еуіе
        </div>
      ))}
    </div>
  );
}
