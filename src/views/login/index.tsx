import React, {useEffect, useState} from 'react';
import style from './login.module.css'
import bg1 from '../../assets/images/xk_1.jpg'
import bg2 from '../../assets/images/xk_2.jpg'
import bg3 from '../../assets/images/xk_3.jpg'
import bg4 from '../../assets/images/xk_4.jpg'
import bg5 from '../../assets/images/xk_5.jpg'
import {Button} from "antd";
import {userLogin} from "../../api/user";
import {App} from "antd";

const imgList = [bg1, bg2, bg3, bg4, bg5]

function initCode() {
  return process.env.REACT_APP_BASE_URL + '/getCodeImg?t=' + Date.now()
}

const Login = (props: any) => {
  const {message} = App.useApp()
  const [index, setIndex] = useState(0)
  const [show, setShow] = useState(false)
  const [codeImg, setCodeImg] = useState(initCode())
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const set = () => {
    if (index === imgList.length - 1) setIndex(0)
    else setIndex(index + 1)
  }
  useEffect(() => {
    const interval = setInterval(set, 3000)
    return () => clearInterval(interval)
  }, [index])
  const login = () => {
    userLogin({username, password, code}).then((res: any) => {
      message[res.state === 1 ? 'success' : 'error'](res.msg,1.5)
      if (res.state == 1) {
        localStorage.user = JSON.stringify(res.data)
        props.history.push('/')
      }
    })
  }
  return (
      <div className={style.login_page}>
        {imgList.map((item: any, i) =>
            <img key={i} src={item} alt="" onClick={set}
                 className={style.bg_img + ' ' + (index === i ? style.show : style.hide)}/>
        )}
        <div className={style.login_box}>
          <div className={style.left}>
            <h1>新闻发布管理平台</h1>
            <p>
              新闻发布系统(News Release System or Content Management System,CMS)，又叫做内容管理系统，是一个基于新闻和内容管理的全站管理系统。
            </p>
            <p>
              新闻发布系统是基于B/S模式的WEBMIS系统，本系统可以将杂乱无章的信息（包括文字，图片和影音）经过组织，得以合理有序地呈现。当今社会是一个信息化的社会，新闻作为信息的一部分有着信息量大，类别繁多，形式多样的特点，新闻发布系统的概念就此提出。新闻发布系统的提出，使新闻媒体不再是单一的电视媒体，从此网络也充当了一个重要的新闻媒介的功能。
            </p>
          </div>
          <div className={style.right}>
            <div style={{fontSize: 20, color: '#0095ff'}}>账号密码登录</div>

            <div className={style.login_input}>
              <span className={style.icon}>&#xe73f;</span>
              <input placeholder={'请输入用户名'} value={username}
                     onChange={(e) => setUsername(e.target.value)}/>
            </div>

            <div className={style.login_input}>
              <span className={style.icon}>&#xe734;</span>
              <input type={show ? 'text' : 'password'}
                     placeholder={'请输入密码'}
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
              />
              <span className={style.icon}
                    style={{color: '#ccc', cursor: 'pointer'}}
                    title={show ? '取消查看' : '查看密码'}
                    onClick={() => setShow(!show)}>
                {show ? <span>&#xe63c;</span> : <span>&#xe73d;</span>}
              </span>
            </div>

            <div className={style.login_input} style={{
              border: 'none'
            }}>
              <div className={style.login_input} style={{width: 'auto', marginRight: 15, paddingLeft: 20}}>
                <input placeholder={'请输验证码'}
                       style={{width: '100%'}}
                       value={code}
                       onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <img style={{height: '100%', cursor: 'pointer'}}
                   title={'看不清，换一张'} src={codeImg} onClick={() => {
                setCodeImg(initCode())
              }}/>
            </div>

            <Button style={{width: 220}} block type={'primary'} size={'large'} shape={'round'}
                    onClick={login}>登录</Button>
          </div>
        </div>
      </div>
  );
};

export default Login;