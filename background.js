/**
 * 拡張機能インストール時の処理
 * インストール時のイベント関数で、コンテキストメニューを登録します。
 */
 chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    type: "normal",
    id: "changeEnvironment",
    title: "環境変更"
  });
  chrome.contextMenus.create({
    id: 'production',
    parentId: 'changeEnvironment',
    title: '本番'
  });
  chrome.contextMenus.create({
    id: 'staging',
    parentId: 'changeEnvironment',
    title: 'ステージング'
  });
  chrome.contextMenus.create({
    id: 'remote',
    parentId: 'changeEnvironment',
    title: 'リモート開発'
  });
  chrome.contextMenus.create({
    id: 'local',
    parentId: 'changeEnvironment',
    title: 'ローカル開発'
  });
});

const domain = {
  production: 'https://comic.iowl.jp',
  staging: 'https://comicstg.iowl.jp',
  remote: 'https://spicadevhs.iowl.jp',
  local: 'https://spicalocal.iowl.jp',
};

/**
  * メニューが選択されたときの処理
  * 選択されたメニューが関数の引数に渡される。
  * 複数のメニューを登録した場合は、item.menuItemIdでクリックされたメニューが取得できる
  */
 chrome.contextMenus.onClicked.addListener((item, tab) => {
  console.log(item)
  console.log(tab)
  const urlObj = new URL(item.pageUrl);
  const url = `${domain[item.menuItemId]}${urlObj.pathname}`;

  // Background Scirptからはコンテストメニュー表示元の要素を直接取得できないため、
  // Message通知機能を使って、Content Scirpt側にメッセージを送信する
  chrome.tabs.sendMessage(tab.id, url);
});

