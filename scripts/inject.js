//hexo.extend.injector.register('body_end', '<script src="/fireworks.js"></script>', 'default');

hexo.extend.injector.register('head', '<script src="https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js"></script>', 'default');

hexo.extend.injector.register('head', '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome/css/font-awesome.min.css">', 'default');

hexo.extend.injector.register('head', '<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bynotes/texiao/source/css/shubiao.css">', 'default');


hexo.extend.injector.register('body_end', function () {
  const {
      enable,
      btn_icon,
      btn_text,
      comment,
      qrcodes,
  } = hexo.config.reward_button;

  if (!enable) {
      return null;
  }

  return `
  <link defer rel="stylesheet" href="/css/reward-button.css"/>
  <script src="/js/reward-button.js"></script>
  <script>
      new RewardButton({
          btnIcon: ${btn_icon ? `"${btn_icon}"` : "null"},
          btnText: "${btn_text}",
          comment: "${comment}",
          qrcodes: ${JSON.stringify(qrcodes)}
      }).init();
  </script>
  `
}, "post");

//hexo.extend.injector.register('body','<script src="./count.js><\script>"');





