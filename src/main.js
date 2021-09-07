import './assets/style.css'
import './assets/main.css'
import $ from 'jquery'
import {useDark} from "./hooks/useDark";

const {modeState, setModeState} = useDark()
document.documentElement.setAttribute("data-theme", modeState);

const site = localStorage.getItem("site");
const siteObject = JSON.parse(site);
const hashMap = siteObject || [
    {url: "https://www.bilibili.com/", urlName: "哔哩哔哩"},
    {url: "https://www.zhihu.com/", urlName: "知乎"},
    {url: "https://www.baidu.com/", urlName: "百度"},
];

// 遍历hashmap, 添加siteList到页面
const render = () => {
    $(".siteList").find("li").remove();
    hashMap.forEach((node) => {
        $(`
      <li>
          <a href="${node.url}">
              <div class="logo">
                  <img src="${node.url}/favicon.ico">
              </div>
              <div class="link">${node.urlName}</div>
          </a>
      </li>
        `).appendTo(".siteList");
    });
};
render();
//点击打开add弹出层
$("#add").on("click", () => {
    $(".popUp").addClass("show");
});
//点击关闭add弹出层
$("#cancel").on("click", () => {
    $(".popUp").removeClass("show");
});

$("#darkMode").on("click", () => {
    $(".dark-switch").toggleClass('dark-switch-checked')
    const $svg = $(".dark-switch use")
    if ($(".dark-switch").hasClass('dark-switch-checked')) {
        $svg.attr("xlink:href", '#icon-dark')
    } else {
        $svg.attr("xlink:href", '#icon-light')
    }
    setModeState()
})

//点击添加网站
$("#addSite").on("click", () => {
    let $urlName = $("#urlName").val();
    let $url = $("#addUrl").val();
    if ($urlName === "" || $url === "") {
        $(".popUp").find(".input").addClass("red");
    } else {
        if ($url.indexOf("https://") === -1) {
            $url = "https://" + $url;
        }
        hashMap.push({
            url: $url,
            urlName: $urlName,
        });
        render();
        $(".popUp").removeClass("show");
    }
});

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap);
    localStorage.setItem("site", string);
};
