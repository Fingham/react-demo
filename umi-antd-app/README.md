## 说明
基于React 和 Antd 前端CURD示例
## 运行
yarn init
yarn start
## mock 服务json数据
    json-server 使用说明
        https://blog.csdn.net/lhjuejiang/article/details/81475993
        
    知识点总结如下： 
        1、http://localhost:3000/db 访问的是db.json文件下的所有内容； 
        2、http://localhost:3000/layoutList?categoryName= 模拟接口参数可筛选该目录下内容 
        3、分页查询 参数为 _start, _end, _limit，并可添加其它参数筛选条件 
        如：http://localhost:3000/posts?_start=6&_limit=3 
        http://localhost:3000/posts?_start=3&_end=6 
        4、排序 参数为_sort, _order 
        如：http://localhost:3000/posts?_sort=id&_order=asc 
        http://localhost:3000/posts?_sort=user,views&_order=desc,asc 
        5、操作符 _gte, _lte, _ne, _like 
        _gte大于，_lte小于， _ne非， _like模糊查询 
        6、q全局搜索（模糊查询） 


    npm i json-server@^0.16.1 --save-dev
    node_modules\.bin\json-server --watch mock\mockdb.json --port 3005


    umi 版本过低 升级到 3 的版本
    