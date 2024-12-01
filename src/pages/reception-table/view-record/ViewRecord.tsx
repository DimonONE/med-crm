import { useCallback, useEffect, useRef, useState } from 'react';
import { MenuItem, SelectChangeEvent } from '@mui/material';
import classNames from 'classnames';
import html2canvas from 'html2canvas';
import { jsPDF as JsPDF } from 'jspdf';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import {
  TemplateStatus,
  useTreatmentId,
  useTreatmentUpdate,
} from '~features/draggable-list';
import { Api } from '~shared/api/realworld';
import { errorHandler } from '~shared/lib/react-query';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
import { SelectField } from '~shared/ui/select-field';
import { ChangeBlock } from '~widgets/reception-table';
import s from './styles.module.scss';

type Params = {
  patientId: string;
  treatmentId: string;
  id: string;
};

export function ViewRecord() {
  const params = useParams<Params>();
  const { data, isLoading } = useTreatmentId(params.treatmentId!);
  const { mutate } = useTreatmentUpdate();
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const [statusId, setStatusId] = useState<string | number>(1);
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
      type: 'END',
    },
  ];

  const handleStatus = (event: SelectChangeEvent<string | number>) => {
    const value = event?.target?.value!;
    const status = selectOptions.find((option) => option.value === value);
    const statusData = {
      id: Number(params.treatmentId),
      status: status?.type,
      category: data?.category,
    };

    mutate(statusData, {
      onSuccess: async () => {
        setStatusId(value);
        toast('Success!', { type: 'success' });
      },
      onError: (error) => {
        toast(errorHandler(error), { type: 'error' });
      },
    });
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
    if (!data?.subTreatments) return;

    const findTemplate = data.subTreatments.find(
      ({ id }) => id.toString() === params.id,
    );
    setSubTreatment(findTemplate);

    const status = selectOptions.find(({ type }) => type === data.status);
    if (status) setStatusId(status.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, params.id]);

  useEffect(() => {
    if (!data?.subTreatments) return;

    const findTemplate = data.subTreatments.find(
      ({ id }) => id.toString() === params.id,
    );
    setSubTreatment(findTemplate);

    const status = selectOptions.find(({ type }) => type === data.status);
    if (status) setStatusId(status.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, params.id]);

  const down100dPDF = () => {
    const input = contentRef.current;
    if (!input) {
      console.error(
        'contentRef is not defined or not pointing to a valid element',
      );
      return;
    }

    html2canvas(input).then((canvas) => {
      const pdf = new JsPDF('p', 'px', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const margin = 15;
      const contentWidth = pdfWidth - margin * 2;
      const contentHeight = pdfHeight - margin * 2;

      const ratio = Math.min(
        contentWidth / imgWidth,
        contentHeight / imgHeight,
      );
      const imgX = margin;
      const imgY = margin;

      const imgData = canvas.toDataURL('image/png');

      pdf.addImage(
        imgData,
        'PNG',
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio,
      );

      pdf.save('invoice.pdf');
    });
  };

  return (
    <div className={s.root}>
      <BackButton title="Прием" link="" className={s.backButton} />
      <div className={s.container}>
        <div className={s.statusBlock}>
          <span>Статус лечения</span>
          {!isLoading && (
            <SelectField
              value={statusId}
              onChange={handleStatus}
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
          )}
        </div>

        <div ref={contentRef} className={s.template}>
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
                        subTemplateId={bodyBlock.subTemplateId}
                        bodyBlockId={lineBlock.id}
                        status={block.status as TemplateStatus}
                        handleChange={() => false}
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
            onClick={() => down100dPDF()}
          >
            Скачать PDF
          </Button>
          <Button
            className={classNames(s.submit, s.submitPrint)}
            type="button"
            color="primary"
            onClick={() => reactToPrintFn()}
          >
            Печатать
          </Button>
        </div>
      </div>
    </div>
  );
}
