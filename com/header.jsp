<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

    <link rel="stylesheet" href="<%=request.getContextPath()%>>/css/header.css" />
    <!-- Boostrap 導入程式 -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
      crossorigin="anonymous"
    />
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4"
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
    <header class="header">
      <div class="fl_left">
        <h1 id="logo_h1"><a href="＃" id="logo">Bar.Jar.Jo</a></h1>
      </div>

      <nav class="fl_right">
        <ul class="nav_ul">
          <li><a href="#">HOME</a></li>
          <li><a href="#">地圖</a></li>
          <li><a href="#">討論區</a></li>
          <li>
            <a href="#" data-bs-toggle="modal" data-bs-target="#loginModal"
              >廠商專區</a
            >
          </li>
          <li>
            <a href="#" class="icon">店家主題</a>
            <ul id="store">
              <li><a href="#">Bistro</a></li>
              <li><a href="#">Cocktail bar</a></li>
              <li><a href="#">Whisky bar</a></li>
            </ul>
          </li>
          <li>
            <a href="#" class="icon">會員專區</a>
            <ul id="store">
              <li><a href="#">我的最愛</a></li>
              <li><a href="#">修改會員資料</a></li>
              <li><a href="#">修改密碼</a></li>
              <li><a href="#">訂單管理</a></li>
            </ul>
          </li>

          <li><a href="#">購物商城</a></li>
          <li><a href="#">登入註冊</a></li>
        </ul>
      </nav>
    </header>

    <!-- 跳出廠商視窗 -->

    <div class="modal fade" id="loginModal">
      <div class="modal-dialog">
        <div class="modal-content" style="background-color:rgb(198, 176, 152)">
          <!-- header -->
          <div class="modal-header">
            <h3>廠商登入</h3>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <!-- body -->
          <div class="modal-body"></div>
          <!-- 登入表單 -->
          <form action="">
            <!-- email -->
            <div class="form-group">
              <input type="account" class="account form-control" placeholder="帳號" />
            </div>
            <!-- password -->
            <div class="form-group">
            <input type="password" class="password form-control" placeholder="密碼">
          </div>
          <!-- checkbox -->
          <div class="form-group">
            <input type="checkbox" class="remember" placeholder="密碼" style="margin-bottom:20px ;margin-left:30px">記住密碼
          </div>
          <!-- 送出按鈕 -->
          <button type="button" class="btn btn-info" style="  width: 80%;
          font-size: 25px;
          color: white;
          margin-left: 50px;
          background-color: rgb(68, 48, 43);
          ">登入</button>
          </form>
          <!-- Footer -->
          <div class="modal-footer">
            <div class="sigup">
              <span>尚加入廠商</span>
              <a href="" type="button" class="member" style="   text-decoration: none;">立即加入</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

