import { AuthTemplateProps } from './AuthTemplate.types';

const AuthTemplate = ({
  children,
}: AuthTemplateProps) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">

        <div className="mt-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthTemplate;