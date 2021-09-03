# utools-plugin-Synonym_Antonym
查询一个词语的同义词和反义词，适合批量替换的场景。



![](http://img.oct1a.cn/202109031045842.png)



![](http://img.oct1a.cn/202109031046214.png)

![](http://img.oct1a.cn/202109031047643.png)



## 🗑 词库的引用与处理

插件词库使用了[funNLP/data/同义词库、反义词库、否定词库](https://github.com/fighting41love/funNLP/tree/master/data/同义词库、反义词库、否定词库)

因词库的格式都不一样，需要对词库进行格式处理，方便node读写。

> 已都处理为JSON格式，可直接使用
>
> dict_antonym.js  反义词库
>
> dict_synonyms.js 近义词库



### 同义词库处理过程

![image-20210818171218785](http://img.oct1a.cn/blog/20210818171219.png)



将前缀使用正则进行光标选择，进行删除，然后直接写个Python脚本把每一行转为数组。

```
data = []
for line in open("同义词库.txt","r",encoding="utf-8"): #设置文件对象并读取每一行文件
    data.append(line.replace("\n", "").split(" ")) #将每一行文件加入到list中

with open("data.txt","w") as f:
    f.write(str(data))
```

### 反义词库处理过程

![image-20210818171311311](http://img.oct1a.cn/blog/20210818171311.png)

也是使用光标快速选择，将“—”选择，进行替换



## 🤝 功能与建议

目前该插件为第一版，如果你对软件有任何功能与建议，欢迎在 Issues 中提出！

或者如果您对本项目感兴趣，非常欢迎一起完善词库，让词库变得更完善！非常感谢您对项目的贡献！🎉



## 👋🏻 感谢

几乎最全的中文NLP资源库词库地址：https://github.com/fighting41love/funNLP



## 🍵Buy us a Milk tea

词库整理不易，或者对你开发其他插件起到帮助，可否请我喝杯奶茶？~😋

![image-20210731153212795](https://camo.githubusercontent.com/f87491cbaf16d5241ee2f974526a5e4b1bb2a94d26e3fcbcbdb6b7d4b0b0c82a/687474703a2f2f696d672e6f637431612e636e2f32303231303733313135333231322e706e67)

