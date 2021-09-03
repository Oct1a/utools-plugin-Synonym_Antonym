const { clipboard } = require('electron')

// 写入剪切板
const handleResult = function(itemData) {
  if (itemData.title) {
    clipboard.writeText(itemData.title, 'selection');
  }
};

// 保存数据库
const saveOrUpdateDb = function(key, data) {
  if (!data) {
    return
  }
  let keyData = window.utools.db.get(key);
  if (!keyData) {
    window.utools.db.put({
      _id: key,
      data: data
    })
    return
  }
  utools.db.put({
    _id: key,
    data: data,
    _rev: keyData._rev
  })
};
// (——|--|—|――|―) 添加历史记录
const addHistory = item => {
  if (!item) {
    return
  }
  let title = item.title;
  let history = getHistory() || [];
  let index = -1;
  for (let i = 0; i < history.length; i++) {
    if (history[i].title === title) {
      index = i;
    }
  }
  if (index !== -1) {
    history.splice(index, 1);
  }
  history.unshift(item);
  if (history.length > 20) {
    history = history.slice(0, 20);
  }
  saveOrUpdateDb('history', history);
};

// 获取历史记录
const getHistory = function() {
    let history = window.utools.db.get("history");
    if (history) {
      return history.data
    }
    return history;
  }
  //同义词筛选,后面改成二分查找法或者广度遍历
const findList = (data, word, callbackSetList) => {
  let res = []
  for (let i = 0; i < data.length; i++) {
    let result = data[i].filter(v => v == word)
    if (result.length > 0) {
      for (const iterator of data[i]) {
        res.push({
          title: iterator,
          description: word + "的同义词",
          icon: './logo.png'
        })
      }
      break
    }
  }
  if (res.length == 0) {
    callbackSetList([{
      title: "暂未收录该词",
      description: "查询结果为空",
      icon: './logo.png'
    }])
  } else {
    callbackSetList(res)
  }
  return
}

window.exports = {
  "synonyms": {
    mode: "list",
    args: {
      // 进入插件时调用（可选）
      enter: (action, callbackSetList) => {
        callbackSetList(getHistory())
      },
      // 子输入框内容变化时被调用 可选 (未设置则无搜索)
      search: (action, searchWord, callbackSetList) => {
        if (searchWord) {
          const synonyms = require('./dict_synonyms.js')
          findList(synonyms, searchWord, callbackSetList)
        }
      },
      // 用户选择列表中某个条目时被调用
      select: (action, itemData, callbackSetList) => {
        window.utools.hideMainWindow()
        handleResult(itemData)
        addHistory(itemData)
        window.utools.outPlugin()
      },
      placeholder: "输入中文，会自动查询同义词(近义词)"
    }
  },
  "antonyms": {
    mode: "list",
    args: {
      enter: (action, callbackSetList) => {
        callbackSetList(getHistory())
      },
      // 子输入框内容变化时被调用 可选 (未设置则无搜索)
      search: (action, searchWord, callbackSetList) => {
        const antonym = require('./dict_antonym.js')
        let antoym_query_list = []
        if (searchWord) {
          let queryList = antonym.filter(v => v.word.indexOf(searchWord) != -1);
          for (const iterator of queryList) {
            console.log(iterator);
            antoym_query_list.push({
              title: iterator.society,
              description: iterator.word + "的反义词",
              icon: './logo.png'
            })
          }
        }
        if (antoym_query_list.length == 0) {
          callbackSetList([{
            title: "暂未收录该词",
            description: "查询结果为空",
            icon: './logo.png'
          }])
          return
        }
        callbackSetList(antoym_query_list)
        return
      },
      // 用户选择列表中某个条目时被调用
      select: (action, itemData, callbackSetList) => {
        window.utools.hideMainWindow()
        handleResult(itemData)
        addHistory(itemData)
        window.utools.outPlugin()
      },
      placeholder: "输入中文，会自动查询反义词"
    }
  }
}