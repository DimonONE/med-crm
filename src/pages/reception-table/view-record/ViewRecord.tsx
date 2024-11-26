import { useCallback, useEffect, useState } from 'react';
import { MenuItem } from '@mui/material';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TemplateStatus, useTreatmentId } from '~features/draggable-list';
import { Api, API_URL } from '~shared/api/realworld';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
import { SelectField } from '~shared/ui/select-field';
import { downloadPDF } from '~widgets/medical-informations';
import { ChangeBlock, AnswerT } from '~widgets/reception-table';
import s from './styles.module.scss';

type Params = {
  patientId: string;
  treatmentId: string;
  id: string;
};

export function ViewRecord() {
  const params = useParams<Params>();
  const { data } = useTreatmentId(params.treatmentId!);
  const [statusId, setStatusId] = useState<string | number>(1);
  const [hasEdit, setEdit] = useState<boolean>(false);

  const [answers, setAnswers] = useState<AnswerT[]>([]);
  const [subTreatment, setSubTreatment] = useState<
    Api.SubTreatmentEntityDto | undefined
  >(undefined);

  const selectOptions = [
    {
      value: 1,
      label: 'В процессе',
      type: 'ACTIVE',
    },
    {
      value: 2,
      label: 'Закончено',
    },
  ];

  const handleAnswer = ({ id, value }: AnswerT) => {
    const updatedAnswers = answers.some((answer) => answer.id === id)
      ? answers.map((answer) =>
          answer.id === id ? { ...answer, value } : answer,
        )
      : [...answers, { id, value }];

    setAnswers(updatedAnswers);
  };

  const handleEdit = () => {
    setEdit(true);
    toast('Редактирование разрешено!', { type: 'info' });
  };

  const answerBlock = useCallback(() => {
    if (subTreatment?.answerBlock) {
      const answerBlockData: Api.SubTemplateEntityDto | undefined = JSON.parse(
        subTreatment.answerBlock.data,
      );
      return answerBlockData;
    }
    return null;
  }, [subTreatment?.answerBlock]);

  useEffect(() => {
    if (data?.subTreatments) {
      const findTemplate = data.subTreatments.find(
        ({ id }) => id.toString() === params.id,
      );

      setSubTreatment(findTemplate);
    }
  }, [data, params.id]);

  return (
    <div className={s.root}>
      <BackButton title="Прием" link="" className={s.backButton} />
      <div className={s.container}>
        <div className={s.statusBlock}>
          <span>Статус лечения</span>
          <SelectField
            value={statusId}
            onChange={(event) => setStatusId(event?.target?.value!)}
            className={classNames(
              'form-input buttons-header',
              s.selectTemplate,
            )}
            selectNavigate
            selectOptions={selectOptions}
          >
            {selectOptions.map(({ label, value: link }) => (
              <MenuItem key={link} value={link} className="select-link">
                {label}
              </MenuItem>
            ))}
          </SelectField>
        </div>

        <div className={s.template}>
          <div className={s.title}>{answerBlock()?.name}</div>

          {answerBlock()?.bodyBlocks.map((bodyBlock) => (
            <div key={bodyBlock.id} className={classNames(s.draggable)}>
              <div className={s.headBlock}>{bodyBlock.name}</div>
              {bodyBlock.lineBlocks.map((lineBlock) => (
                <div key={lineBlock.id} className={s.itemBlock}>
                  {lineBlock.blocks.map((block) => (
                    <div key={block.id}>
                      <ChangeBlock
                        {...block}
                        key={block.lineId}
                        type="preview"
                        isEditValue={hasEdit}
                        subTemplateId={bodyBlock.subTemplateId}
                        bodyBlockId={lineBlock.id}
                        status={block.status as TemplateStatus}
                        handleChange={(answerData) => handleAnswer(answerData)}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className={s.submitButtons}>
          <Button
            className={classNames(s.submit, s.submitDownload)}
            type="button"
            color="primary"
            onClick={() =>
              downloadPDF(`${API_URL}/${'patientInfo.medInfoPath'}`)
            }
            disabled={hasEdit}
          >
            Скачать PDF
          </Button>
          <Button
            className={classNames(s.submit, s.submitPrint)}
            type="button"
            color="primary"
            onClick={() =>
              window.open(`${API_URL}/${'patientInfo.medInfoPath'}`, '_blank')
            }
            disabled={hasEdit}
          >
            Печатать
          </Button>
          <Button
            className={s.submit}
            type="submit"
            color="secondary"
            onClick={handleEdit}
          >
            Редактировать
          </Button>
          <Button className={s.submit} type="submit" color="primary">
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
}
