import { Grid } from '@mui/material';
import { Checkbox } from '~shared/ui/checkbox';
import s from '../styles.module.scss';

export type MedInfoData = {
  name: string
  type: 'string' | 'array' | 'image' | 'checkboks' | 'boks'
  value: string | boolean
};

export const downloadPDF = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const name = url.split('files/')[1];

  link.href = downloadUrl;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
};

function dataInfoRecurs(dataInfo: MedInfoData) {
  const dataArray = JSON.parse(dataInfo.value as string);

  return (
    <ul className={s.ul}> {dataArray.map((list: MedInfoData) => {
      if (list.type === 'array') {
        return <li className={s.li}>
          <Grid marginBlock={2} className={s.filterOptions}>
            {list.name}
          </Grid>
          {dataInfoRecurs(list)}
        </li>;
      }

      if (list.type === 'checkboks') {
        return <li className={s.li}>
          <Grid marginBlock={2} className={s.filterOptions}>
            {list.name}
          </Grid>
          {dataInfoRecurs(list)}
        </li>;
      }
      if (list.type === 'boks') {
        return <Grid marginBlock={2} className={s.filterOptions}>
          <Checkbox
            checked={list.value as boolean}
            onChange={() => false}
            disabled
          >
            {list.name}
          </Checkbox>
        </Grid>;
      }

      return list.value && (
        <li className={s.li}>
          <Grid marginBlock={2} className={s.filterOptions}>
            {list.name} {list.value}
          </Grid>
        </li>
      );
    })}
    </ul>
  );
}

export function getDataInfo(dataInfo: MedInfoData) {
  switch (dataInfo?.type) {
    case 'string':
      return dataInfo.value;

    case 'array':
      return dataInfoRecurs(dataInfo);

    case 'checkboks':
      return dataInfoRecurs(dataInfo);

    default:
      return '';
  }
}
