import { useNavigate } from 'react-router-dom';
import { useTemplateGetAll } from '~features/draggable-list';
import { PATH_PAGE } from '~shared/lib/react-router';
import { SelectWithSubTemplates, SelectWithSubTemplatesOptions } from '~shared/ui/select-sub-templates';
import { Header } from '~widgets/header';

type IProps = {
  children?: React.ReactElement
};

export function HeaderTemplate({ children }: IProps) {
  const navigate = useNavigate();
  const { data } = useTemplateGetAll({
    offset: 0,
    limit: 1000,
    category: '',
  });

  const selectOptions = data?.data.reduce((acc, item) => {
    const existingOption = acc.find(option => option.label === item.category);

    if (existingOption) {
      existingOption.subTemplates?.push({
        value: item.id as number,
        label: item.name as string,
      });
    } else {
      acc.push({
        value: item.id as number,
        label: item.category as string,
        subTemplates: [{
          value: item.id as number,
          label: item.name as string,
        }],
      });
    }

    return acc;
  }, [] as SelectWithSubTemplatesOptions[]) ?? [];

  return (
    <Header>
      <>
        <SelectWithSubTemplates
          title='Свои шаблоны'
          selectOptions={selectOptions}
          onClick={(id, subId) => navigate(PATH_PAGE.template.preview(id, subId))}
        />
        <SelectWithSubTemplates
          title='Шаблоны клиники'
          selectOptions={selectOptions}
          onClick={(id, subId) => navigate(PATH_PAGE.template.preview(id, subId))}
        />
        {children}
      </>
    </Header>
  );
}
