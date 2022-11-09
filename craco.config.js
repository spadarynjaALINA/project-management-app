import CracoLessPlugin from '/craco-less';
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars:	{ '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
// все переменные стилей тут:
// https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less