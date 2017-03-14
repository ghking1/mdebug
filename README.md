# mdebug
a useful debugger for mobile

## 使用情景

移动端浏览器不方便调试，使用该插件可以快速定位发生错误的位置，输出调试信息，交互执行js代码。

## 特色

1. 可以在移动端使用，当然PC端也可以用，但没这个必要


## 示例展示

1. 将mdebug克隆到本地
2. 打开example/demo.html
3. 操作按钮进行使用

![image](https://github.com/ghking1/mdebug/raw/master/example/demo.jpg)

## 快速入门

1. 引入脚本\<script type="text/javascript" src="../clipimg.js"\>\</script\>

## API详解

1. mdebug.log() 或者 console.log()
    
    输出调试信息，就像chrome浏览器的cosole.log()一样，只不过这里是输出到我们的调试窗口，同时也会输出到控制台。

## 注意事项

1. 请尽量在其他代码引入之前引入该插件，方便mdebug捕获错误。
