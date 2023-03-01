import React from 'react';
import {Button} from "antd";
import axios from "axios";

const Home = () => {
  return (
      <div>
        <Button onClick={() => {
          // 单表查询  get 条件查询：?id=1
          // axios.get('http://localhost:5000/posts').then(({data})=> {
          //   console.log(data)
          // })

          // 新增数据  post
          // axios.post('http://localhost:5000/posts',{
          //   "title": "新增的",
          //   "content": "aaa"
          // })

          // 修改数据  put 替换全部数据
          // axios.put('http://localhost:5000/posts/1', {
          //   "title": "111-修改"
          // })

          // 修改数据  patch 替换部分数据
          // axios.patch('http://localhost:5000/posts/1', {
          //   "title": "111-修改"
          // })

          // 删除数据  delete
          // axios.delete('http://localhost:5000/posts/3')

          //向下联表查询 _embed
          // axios('http://localhost:5000/posts?_embed=comments').then(({data}) => {
          //   console.log(data)
          // })

          //向上查询  _expand
          // axios('http://localhost:5000/comments?_expand=post').then(({data}) => {
          //   console.log(data)
          // })

        }} type={"primary"}>按钮</Button>
      </div>
  );
};

export default Home;