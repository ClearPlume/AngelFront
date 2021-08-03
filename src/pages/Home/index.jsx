import React, {Component} from 'react';
import {Typography, Divider} from "antd";

const {Paragraph} = Typography

const dividerStyle = {
    borderColor: "#1890ff",
    borderWidth: "2px",
    color: "rgba(0,0,0,0.85)",
    fontWeight: 600,
    fontSize: "20px"
}

class Home extends Component {
    render() {
        return (
            <div>
                <Divider orientation="left" style={dividerStyle}>关于我</Divider>
                <Paragraph>
                    我的目标是成为一名 Java 开发工程师，完成以前接触编程时定下的第二目标。
                </Paragraph>
                <Paragraph>
                    为什么不是第一？因为第一目标是手机游戏(选择编程语言时百度对比的结果是Java，看到C++就能睡着)，
                    却在工作时最终发现游戏永远绕不开C++。
                </Paragraph>
                <Paragraph>专注后端技术，喜欢写代码(在代码风格和逻辑实现上有点强迫症)，擅长逻辑分析。</Paragraph>
                <Paragraph>
                    于是很合乎情理的，审美方面的天负从来达不到0，所以...这个网站就长现在这个样子了
                    ——在Ant Design的布局(Layout)页找了个大体符合我需求的布局模板，然后修修补补，再调整一下需求...
                </Paragraph>
                <Paragraph>坚持学习最新的技术，努力跟上最前沿的开发理念。</Paragraph>

                <Divider orientation="left" style={dividerStyle}>关于“折翼天使”</Divider>
                <Paragraph>
                    它是一次尝试，把自已所学、所会的知识做成实实在在的东西...成果，就是这个网站了。它将作为我在面试时的作品，也会在最终开发完成后用做个人使用的博客、网盘。
                    至于音乐和聊天...就纯粹是尝鲜，和以后面试时的谈资了。现在？还没到那一步。
                </Paragraph>
                <Paragraph>
                    但由于时间有限——另外，如上所述，为了面试——网站从设计到实现有很多地方都是“为了设计而设计”，为了用某种技术而用它，但并非没有考虑到合理性...
                    只是现在的我没有那样的底蕴支撑，能做出来确实需要某种架构的设计，重点是，这个网站对于此刻的我而言，更多的还是作为自身能力的证明...
                    我会在工作稳定，有了充足的时间、足够的经验以后，再慢慢改善这一点。
                </Paragraph>
                <Paragraph>
                    最开始的时候，“折翼天使”只是一个基于SpringBoot的单机博客项目，在大体框架接近完成只用了不到一周时我就发现...它太简单了。
                    于是做出调整：基于SpringCloud实现微服务架构，整体上借鉴常见的微服务项目，再加上一点个人特色，最初的设计是这样：
                </Paragraph>
                <Paragraph>
					<pre>
{`部分实现微服务，用Ajax模拟前后端分离，用OpenFeign做为服务间RPC调用框架

Angel
  ├─Angel 项目(依赖管理)
  │   ├─公共项目
  │   │    └─数据库实体类
  │   ├─OAuth 验证服务(当时并不知道，我其实完全不需要那么复杂的认证系统，浪费了我半个月，正常情况下的五天时间。)
  │   ├─数据服务
  │   │    ├─博客部分(JPA)
  │   │    ├─网盘部分(Mybatis)
  │   │    └─音乐部分(Mybatis Plus)
  │   ├─控制层(除去页面跳转的部分，所有action都接收/返回JSON数据)
  │   │   ├─博客部分
  │   │   ├─网盘部分
  │   │   └─音乐部分
  │   ├─视图层(除去页面跳转的部分，所有请求都以Ajax的形式发送JSON数据)
  │   └─聊天服务
  │        ├─服务端
  │        └─网页客户端
  └─聊天客户端
        ├─Android
        └─PC`}
                    </pre>
                </Paragraph>
                <Paragraph>
                    在其后的开发中发现这种设计的不合理之处(太杂乱了)，遂不断做出调整，现在(因为截至此刻，都在一直完善、调整)是这样的：
                </Paragraph>
                <Paragraph>
                    <pre>
{`Angel 前端部分：用React实现页面架构，用nginx搭建静态服务器
Angel
  ├─index(App)
  ├─components
  │     ├─common
  │     │    ├─Navigator(页面左侧的路由导航组件)
  │     │    └─others(一些官方组件的自定义封装)
  │     └─user
  │        ├─UserInfo(页面右上角的个人信息展示/登录)
  │        ├─UserRegister(用户管理页的“注册”按钮)
  │        └─UserModifier(用户管理页的用户列表中，右侧的“删除”按钮)
  └─pages
      ├─Home(主页，会展示一些个人信息和网站的基本架构信息)
      ├─User(用户页，全部用户信息的增删改查)
      └─Auth(权限管理页，暂未实现前端页面的设计但后端接口已经完成)

Angel 后端部分：用SpringCloud搭建微服务，用Zuul做为网关，用OpenFeign做为服务间RPC调用框架
Angel(依赖管理)
  ├─公共项目(通用工具类、后端的数据返回公共类)
  ├─Zuul网关
  │   ├─基于SpringSecurity的动态权限管理、JWT Token SSO单点登录
  │   └─用户系统
  ├─博客项目
  │    ├─控制层
  │    ├─服务层
  │    └─数据层(MyBatis Plus)
  ├─网盘项目
  │    ├─控制层
  │    ├─服务层
  │    └─数据层(MyBatis)
  ├─音乐项目
  │    ├─控制层
  │    ├─服务层
  │    └─数据层(MyBatis)
  └─聊天服务端(暂时没有任何规划)

这种架构有一个很明显但是现在的我无力解决的缺陷：
    博客、网盘、音乐的微服务过于耦合，它们应该每个都是一个独立的项目，在其中还会再进行服务划分。
    网关的服务也是，它应该只包含一个动态的权限管理，用户系统应该也是一个独立的项目(或者只是一个服务？不清楚，我的设计还没到那里)。
    但这意味着更高配置的服务器，现在...我无力负担，就只能这样了。`}
                    </pre>
                </Paragraph>
            </div>
        );
    }
}

export default Home;