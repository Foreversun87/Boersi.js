import React from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// https://www.youtube.com/watch?v=PDdZB83_Nrs
// https://github.com/gauti123456/ReactWysiwygEditor
// https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp

export default function WYSIWYG({ editorState, setEditorState }) {
    function onContentStateChange(editorState) {
        setEditorState(editorState);
    };

    return (
        <div className='editor'>
            <Editor
                initialContentState={editorState}
                onContentStateChange={onContentStateChange}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                toolbar={{
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    // image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
                }}
            />
        </div>
    )
}