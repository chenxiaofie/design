import UnderlineInput from '@/components/UnderlineInput';
import DesignDivider from '@/components/Divider';
import OperationBar from '@/pages/design/header/OperationBar';
import UserMenuSelectt from '@/pages/design/header/UserMenuSelectt';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

const DesignHeader = forwardRef<HTMLDivElement, { height: number }>(
  (props, ref) => {
    const { t } = useTranslation('design/header/index');

    return (
      <div
        className="bg-white flex align-center shadow-md"
        style={{ height: props.height + 'px' }}
        ref={ref}
      >
        <div className="flex w-[320px] items-center overflow-hidden">
          <div className="flex items-center ml-2">
            <img
              src="https://tailornova.com/static/images/logo.svg"
              alt=""
              className="w-[120px]"
            />
            <UnderlineInput placeholder={t('NoTitleDesign')} />
            <div className="h-6 w-[1px] border-l border-dashed border-white/20" />
          </div>
        </div>
        <DesignDivider />
        <OperationBar />
        <DesignDivider />
        <UserMenuSelectt />
      </div>
    );
  }
);

export default DesignHeader;
