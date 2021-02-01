## message组件

- 可提供成功、警告和错误等反馈信息。

- 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。

``` javascript
message.success(content, [duration], onClose)

message.error(content, [duration], onClose)

message.info(content, [duration], onClose)

message.warning(content, [duration], onClose)

message.warn(content, [duration], onClose) // alias of warning

message.loading(content, [duration], onClose)
```