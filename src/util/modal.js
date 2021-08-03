import {Modal} from "antd";

export const confirm = ({icon, title, content, okText, cancelText, onOk, onCancel, width}) => Modal.confirm({
    icon: icon,
    title: title || "警告",
    content: content || "确定执行操作吗？",
    okText: okText || "确定",
    cancelText: cancelText || "取消",
    onOk: onOk,
    onCancel: onCancel,
    width: width
})

export const info = ({icon, title, content, okText, onOk, width}) => Modal.info({
    icon: icon,
    title: title || "提示",
    content: content,
    okText: okText || "确定",
    onOk: onOk,
    width: width
})
