import { useEffect, useMemo, useState } from 'react';
import { MenuItem } from '@mui/material';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAllRecordsPatient } from '~entities/doctor';
import {
  TemplateStatus,
  useTemplateGetOne,
  useTreatmentAnswerCreate,
  useTreatmentId,
} from '~features/draggable-list';
import { Api } from '~shared/api/realworld';
import { errorHandler } from '~shared/lib/react-query';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
import { FileLoader, FileValues } from '~shared/ui/file-loader';
import { SelectField } from '~shared/ui/select-field';
import { TechInfo } from '~shared/ui/tech-info';
import { UnderlineText } from '~shared/ui/underline-text';
import { AnswerValueT, ChangeBlock } from '~widgets/reception-table';
import s from './styles.module.scss';

type Params = {
  id: string;
  patientId: string;
  doctorId: string;
  treatmentId: string;
};

type AnswerT = {
  id: number;
  answer: string;
};

export function CreateReceptionPage() {
  const params = useParams<Params>();
  const [statusId, setStatusId] = useState<string | number>(1);
  const [template, setTemplate] = useState<
    Api.SubTemplateEntityDto | undefined
  >(undefined);
  const [visitSummary, setVisitSummary] = useState({
    completed: '',
    comment: '',
    plan: '',
    files: undefined,
  });
  const [subTemplateId, setSubTemplateId] = useState<
    string | number | undefined
  >(undefined);
  const [answers, setAnswers] = useState<AnswerT[]>([]);

  const { data: dataTreatment } = useTreatmentId(params.treatmentId!);
  const { data: dataTemplate } = useTemplateGetOne(params.id!);
  const { data: recordsPatient } = useAllRecordsPatient(params.patientId!);

  const { mutate } = useTreatmentAnswerCreate();

  const selectOptions = [
    {
      value: 1,
      label: 'В процессе',
      type: 'ACTIVE',
    },
    {
      value: 2,
      label: 'Закончено',
      type: 'END',
    },
  ];

  const subTemplateOptions = useMemo(
    () =>
      dataTemplate?.subTemplates.map(({ id, name }) => ({
        value: id,
        label: name,
      })) ?? [],
    [dataTemplate],
  );

  const handleAnswer = ({ id, value }: AnswerValueT) => {
    const updatedAnswers = answers.some((answer) => answer.id === id)
      ? answers.map((answer) =>
          answer.id === id ? { ...answer, answer: value } : answer,
        )
      : [...answers, { id, answer: value }];

    setAnswers(updatedAnswers);
  };

  const onCreate = () => {
    const selectTemplate = dataTemplate?.subTemplates.find(
      ({ id }) => id === subTemplateId,
    );
    setTemplate(selectTemplate);
  };

  const onSave = () => {
    if (Object.values(visitSummary).some((value) => value === '')) {
      toast('Краткое резюме посещения обязательно к заполнению!', {
        type: 'warning',
      });
      return;
    }

    if (!recordsPatient) {
      throw new Error('recordsPatient of undefined');
    }

    const recordId = recordsPatient[recordsPatient.length - 1]?.id;
    console.log('answers', answers);

    const createData = {
      recordId,
      treatmentId: Number(params.treatmentId),
      subTemplateId: Number(subTemplateId),
      completed: visitSummary.completed,
      comment: visitSummary.comment,
      plan: visitSummary.plan,
      blocks: JSON.stringify(answers),
      ...(visitSummary?.files ? { files: visitSummary.files } : {}),
    };

    mutate(createData, {
      onSuccess: async (resp) => {
        console.log('/treatment/answer-create', JSON.parse(resp.data));
        toast('Success!', { type: 'success' });
      },
      onSettled: () => {},
      onError: (error) => {
        toast(errorHandler(error), { type: 'error' });
      },
    });
  };

  const handleVisitSummary = (
    key: 'completed' | 'comment' | 'plan' | 'files',
    value: string | FileValues,
  ) => {
    setVisitSummary((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    setSubTemplateId(subTemplateOptions[0]?.value);
  }, [subTemplateOptions]);

  return (
    <div className={s.root}>
      <BackButton title="Создание приема" link="" className={s.backButton} />

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

        <div>
          <TechInfo
            techInfo={{
              fullName: dataTreatment?.patient.fullName,
              cardNumber: '',
              info: dataTemplate?.techInfo ?? '',
            }}
          />
        </div>

        <div className={s.submitBlock}>
          {subTemplateOptions.length ? (
            <SelectField
              value={subTemplateId ?? subTemplateOptions[0].value}
              onChange={(event) => setSubTemplateId(event?.target?.value!)}
              className={classNames(
                'form-input buttons-header',
                s.selectTemplate,
              )}
              selectNavigate
              selectOptions={subTemplateOptions}
            >
              {subTemplateOptions.map(({ label, value: link }) => (
                <MenuItem
                  key={link}
                  value={link}
                  className="select-link"
                  onClick={() => false}
                >
                  {label}
                </MenuItem>
              ))}
            </SelectField>
          ) : null}

          <Button
            className={classNames(s.selectTemplate, s.submit)}
            onClick={onCreate}
          >
            Создать прием
          </Button>
        </div>

        {template?.bodyBlocks.map((bodyBlock) => (
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
                      isEditValue
                      subTemplateId={bodyBlock.subTemplateId}
                      bodyBlockId={lineBlock.id}
                      status={block.status as TemplateStatus}
                      handleChange={(data) => handleAnswer(data)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
        {template && (
          <>
            <div className={classNames(s.draggable)}>
              <div className={s.headBlock}>Краткое резюме посещения</div>
              <div className={s.visitSummary}>
                <li className={s.name}>План: </li>
                <UnderlineText
                  value={visitSummary.plan}
                  name=""
                  onChange={(event) =>
                    typeof event === 'object'
                      ? handleVisitSummary('plan', event.target.value)
                      : false
                  }
                  className={s.visitSummaryText}
                />
              </div>

              <div className={s.visitSummary}>
                <li className={s.name}>Выполнили: </li>
                <UnderlineText
                  value={visitSummary.completed}
                  name=""
                  onChange={(event) =>
                    typeof event === 'object'
                      ? handleVisitSummary('completed', event.target.value)
                      : false
                  }
                  className={s.visitSummaryText}
                />
              </div>
              <div className={s.visitSummary}>
                <li className={s.name}>Комментарий: </li>
                <UnderlineText
                  value={visitSummary.comment}
                  name=""
                  onChange={(event) =>
                    typeof event === 'object'
                      ? handleVisitSummary('comment', event.target.value)
                      : false
                  }
                  className={s.visitSummaryText}
                />
              </div>

              <div className={s.visitSummary}>
                <FileLoader
                  id="pdf-files"
                  title="Загрузить"
                  onChange={(event) => handleVisitSummary('files', event)}
                  onDownload={() => undefined}
                  onDelete={() => undefined}
                  className={s.visitSummaryFiles}
                />
              </div>
            </div>
            <Button className={s.save} onClick={onSave}>
              Сохранить
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
