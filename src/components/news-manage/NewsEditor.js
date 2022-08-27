/* 富文本编辑器 */
import React, { useState } from 'react'
import { Editor } from "react-draft-wysiwyg";  //富文本编辑器
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function NewsEditor(props) {
    const [editorState, setEditorState] = useState('') //当前输入内容
    return (
        <div>
            <Editor
                editorState={editorState}
                toolbarClassName="aaaaa"
                wrapperClassName="bbbbb"
                editorClassName="ccccc"
                onEditorStateChange={(editorState) => setEditorState(editorState)}
                onBlur={() => {
                    props.getContent(draftToHtml(convertToRaw(editorState.getCurrentContent()))) //将内容传给NewsAdd组件
                }}
            />
        </div>
    )
}
export default NewsEditor
