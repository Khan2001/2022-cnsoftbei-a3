# README

本项目是中软杯赛题 [A3-视障人士友好的咨询辅助软件](http://www.cnsoftbei.com/plus/view.php?aid=708) 的服务端前端项目代码，主要是基于 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 的二次开发。

Node.js 等环境配置参考 vue-element-admin [官方文档](https://panjiachen.github.io/vue-element-admin-site/zh/guide/) ，详细介绍见 `ouput` 文件夹中的文档。

将上传的作品中的对应压缩包解压后（名称为 `platform` ，已和文档一起放在 `output` 文件夹）放在tomcat里的webapps文件夹下，再用docker执行重启指令，通过访问"服务器IP地址:端口号/platform"即可访问。

接口可参照Apifox的在线Mock环境，配置文件也放在 `output` 文件夹内。