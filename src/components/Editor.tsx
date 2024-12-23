import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlock from "@tiptap/extension-code-block";

const Editor = ({onContentChange}: any) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Hellow World</p>',
        onUpdate: ({ editor }) => {
            if (onContentChange) {
                onContentChange(editor.getHTML());
            }
        }
    });

    if(!editor) {
        return null;
    }

    return (
        <div className="bg-white text-neutral-800 p-2 rounded-md">
            <EditorContent editor={editor} className="prose max-w-none dark:prose-invert" />
        </div>
    )
}

export default Editor;