/* 富文本编辑器 */
import React, { useState, useEffect } from 'react'
import { Editor } from "react-draft-wysiwyg";  //富文本编辑器
import { convertToRaw, EditorState, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function NewsEditor(props) {
    const [editorState, setEditorState] = useState('') //当前输入内容
    useEffect(() => {
        //console.log(props.content);
        const html = props.content;
        if (html === undefined) return
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState)
        }
    }, [props.content])
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
