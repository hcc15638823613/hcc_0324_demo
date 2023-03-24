import { PageLoading } from '@ant-design/pro-layout';
import { SelectLang } from 'umi';
import './mock/index';

export const initialStateConfig = {
  loading: <PageLoading size="small" />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout = ({ initialState }: any) => {
  console.log(initialState, 'initialState---+++');
  let breadcrumbName = [] as any;
  return {
    contentStyle: {
      height: '100%',
    },
    iconfontUrl: '//at.alicdn.com/t/c/font_2530099_1evuxaeyq8l.js',
    // 在header生成面包屑
    breadcrumbRender: (routers: any) => {
      breadcrumbName = routers;
    },
    headerContentRender: () => {
      if (breadcrumbName.length) {
        return (
          <>
            <span style={{ color: breadcrumbName[1] ? 'gray' : 'black' }}>
              {breadcrumbName[0].breadcrumbName}
            </span>
            {breadcrumbName[1] && (
              <>
                <span>{' > '}</span>
                <span style={{ color: breadcrumbName[2] ? 'gray' : 'black' }}>
                  {breadcrumbName[1].breadcrumbName}
                </span>
              </>
            )}
            {breadcrumbName[2] && (
              <>
                <span>{' > '}</span>
                <span>{breadcrumbName[2].breadcrumbName}</span>
              </>
            )}
          </>
        );
      }
    },
    rightContentRender: () => (
      <>
        切换语言
        <SelectLang />
      </>
    ),
    disableContentMargin: false,
    waterMarkProps: {
      content: 'SUPCON',
    },
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};
