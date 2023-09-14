export const createLogin = (url: string) => {
  const dualScreenLeft = window.screenLeft ?? window.screenX;
  const dualScreenTop = window.screenTop ?? window.screenY;

  const width = window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;
  const height = window.innerHeight ?? document.documentElement.clientHeight ?? screen.height;
  const systemZoom = width / window.screen.availWidth;

  const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
  const top = (height - 670) / 2 / systemZoom + dualScreenTop;

  const newWindow = window.open(
    url,
    'Lovver | Login',
    `width=${500 / systemZoom},height=${670 / systemZoom},top=${top},left=${left}`
  );

  newWindow?.focus();
};
