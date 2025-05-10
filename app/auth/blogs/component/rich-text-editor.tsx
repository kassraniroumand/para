"use client"
import React, {useState, useEffect} from 'react';
import {useEditor, EditorContent, ReactNodeViewRenderer} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import Image from '@tiptap/extension-image';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle, CardFooter} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {
    Bold,
    Italic,
    List,
    ImageIcon,
    ListOrdered,
    Heading1,
    Heading2,
    Heading3,
    Code,
    Quote,
    Undo,
    Redo,
    Scissors,
    Eraser, Save
} from 'lucide-react';
import ImageUploader from "@/components/ui/image-uploader";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import ImageComponent from "@/app/auth/blogs/component/ImageComponent";
import {toast} from "sonner";
import EditorPreview from "@/app/auth/blogs/component/EditorPreview.jsx";


export const CustomImage = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            src: {
                default: null,
            },
            alt: {
                default: null,
            },
            width: {
                default: '100%',
            },
            height: {
                default: 'auto',
            },
            title: {
                default: null,
            },
        };
    },

    addNodeView() {
        return ReactNodeViewRenderer(ImageComponent);
    },
});

// Define a toolbar button component
const ToolbarButton = ({icon, isActive = false, onClick, tooltip}) => {
    return (
        <Button
            variant="ghost"
            size="sm"
            className={`p-1 ${isActive ? 'bg-slate-200 dark:bg-slate-700' : ''}`}
            onClick={onClick}
            title={tooltip}
        >
            {icon}
        </Button>
    );
};
interface TiptapEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    name?: string;
}
const TiptapEditor = ({ value, onChange, name }: TiptapEditorProps) => {
    const [content, setContent] = useState(`
    <h1>Tiptap Editor</h1>  
    <p>This is a rich text editor built with Tiptap, React, and styled with Tailwind CSS.</p>
    <h2>Features</h2>
    <p>Here are some features:</p>
    <ul>
      <li>Text formatting with <strong>bold</strong> and <em>italic</em></li>
      <li>Different heading levels</li>
      <li>Bullet points like this one</li>
      <li>And nested lists:
        <ul>
          <li>Nested item 1</li>
          <li>Nested item 2</li>
        </ul>
      </li>
    </ul>
    <h3>Code blocks</h3>
    <pre><code>console.log('Hello world!');</code></pre>
    <h3>Ordered lists</h3>
    <ol>
      <li>First item</li>
      <li>Second item</li>
      <li>Third item</li>
    </ol>
    <blockquote>This is a blockquote that can be used for quotes or important notes.</blockquote>
  `);
    const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const editor = useEditor({
        extensions: [
            CustomImage,
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: 'list-disc pl-5 [&_ul]:pl-5 [&_ul]:list-disc [&_ul]:my-1 space-y-1 my-2',
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: 'list-decimal pl-5 [&_ol]:pl-5 [&_ol]:list-decimal [&_ol]:my-1 space-y-1 my-2',
                    },
                },
                listItem: {
                    HTMLAttributes: {
                        class: 'pl-1',
                    },
                },
                heading: {
                    levels: [1, 2, 3],
                    HTMLAttributes: {
                        class: 'font-bold',
                    },
                },
                paragraph: {
                    HTMLAttributes: {
                        class: 'my-2',
                    },
                },
                blockquote: {
                    HTMLAttributes: {
                        class: 'border-l-4 border-slate-300 dark:border-slate-600 pl-4 italic my-3',
                    },
                },
                code: {
                    HTMLAttributes: {
                        class: 'bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded',
                    },
                },
                codeBlock: {
                    HTMLAttributes: {
                        class: 'bg-slate-100 dark:bg-slate-800 p-3 rounded-md font-mono my-3',
                    },
                },
            }),
            Placeholder.configure({
                placeholder: 'Write something...',
                emptyEditorClass: 'before:content-[attr(data-placeholder)] before:text-slate-400 before:float-left before:h-0 before:pointer-events-none',
            }),
            CharacterCount.configure({
                limit: 10000
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-md my-4',
                },
            })
        ],
        content: value || content,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onChange?.(html);
        },
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-48',
            },
        }
    });

    const addImage = (url) => {
        if (url && editor) {
            editor.chain().focus().setImage({src: url}).run();
            setIsImageDialogOpen(false);
            setImageUrl('');
        }
    };

    if (!editor) {
        return <div className="w-full h-40 bg-slate-100 animate-pulse"></div>;
    }

    const handleSave = async () => {
        if (!editor) return;

        setIsSaving(true);

        try {
            // If onSave is provided as a prop, use it


            // Default save behavior
            console.log('Saving content:', content);
            // Mock save operation
            // await new Promise(resolve => setTimeout(resolve, 800));
            toast("Blog saved successfully");

        } catch (error) {
            console.error('Error saving blogs:', error);
            toast("Failed to save blogs");
        } finally {
            setIsSaving(false);
        }
    };


    return (
        <Card className="w-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-xl">Rich Text Editor</CardTitle>
            </CardHeader>

            <CardContent>
                {/* Toolbar */}
                <div className="flex flex-wrap gap-1 p-1 mb-2 border rounded-md bg-slate-50 dark:bg-slate-900">
                    <ToolbarButton
                        icon={<Bold size={18}/>}
                        isActive={editor.isActive('bold')}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        tooltip="Bold"
                    />
                    <ToolbarButton
                        icon={<Italic size={18}/>}
                        isActive={editor.isActive('italic')}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        tooltip="Italic"
                    />
                    <ToolbarButton
                        icon={<Heading1 size={18}/>}
                        isActive={editor.isActive('heading', {level: 1})}
                        onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                        tooltip="Heading 1"
                    />
                    <ToolbarButton
                        icon={<Heading2 size={18}/>}
                        isActive={editor.isActive('heading', {level: 2})}
                        onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                        tooltip="Heading 2"
                    />
                    <ToolbarButton
                        icon={<Heading3 size={18}/>}
                        isActive={editor.isActive('heading', {level: 3})}
                        onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                        tooltip="Heading 3"
                    />
                    <ToolbarButton
                        icon={<List size={18}/>}
                        isActive={editor.isActive('bulletList')}
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        tooltip="Bullet List"
                    />
                    <ToolbarButton
                        icon={<ListOrdered size={18}/>}
                        isActive={editor.isActive('orderedList')}
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        tooltip="Ordered List"
                    />
                    <ToolbarButton
                        icon={<Code size={18}/>}
                        isActive={editor.isActive('codeBlock')}
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        tooltip="Code Block"
                    />
                    <ToolbarButton
                        icon={<Quote size={18}/>}
                        isActive={editor.isActive('blockquote')}
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        tooltip="Blockquote"
                    />
                    <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-1" title="Insert Image">
                                <ImageIcon size={18}/>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Upload Image</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <ImageUploader
                                    value={imageUrl}
                                    onChange={setImageUrl}
                                />
                                {imageUrl && (
                                    <div className="mt-2">
                                        <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded">
                                            <img
                                                src={imageUrl}
                                                alt="Preview"
                                                className="max-h-40 mx-auto"
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsImageDialogOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={() => addImage(imageUrl)}
                                        disabled={!imageUrl}
                                    >
                                        Insert Image
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <div className="w-px h-6 mx-1 bg-slate-300 dark:bg-slate-700"></div>
                    <ToolbarButton
                        icon={<Undo size={18}/>}
                        onClick={() => editor.chain().focus().undo().run()}
                        tooltip="Undo"
                    />
                    <ToolbarButton
                        icon={<Redo size={18}/>}
                        onClick={() => editor.chain().focus().redo().run()}
                        tooltip="Redo"
                    />
                    <ToolbarButton
                        icon={<Scissors size={18}/>}
                        onClick={() => {
                            if (window.confirm('Do you want to clear the editor?')) {
                                editor.chain().focus().clearContent().run();
                            }
                        }}
                        tooltip="Clear Content"
                    />
                    <ToolbarButton
                        icon={<Eraser size={18}/>}
                        onClick={() => editor.chain().focus().unsetAllMarks().run()}
                        tooltip="Clear Formatting"
                    />
                </div>

                <Tabs defaultValue="editor" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="editor">Editor</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>

                    <TabsContent value="editor" className="mt-2">
                        {/* Editor Content */}
                        <div
                            className="border rounded-md p-3 min-h-64 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                            <EditorContent
                                editor={editor}
                                className="outline-none [&_.is-editor-empty]:text-slate-400 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:my-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:my-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:my-2"
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="preview" className="mt-2">
                        {/* Rendered HTML Preview */}
                        <EditorPreview htmlContent={content}/>
                    </TabsContent>
                </Tabs>
            </CardContent>

            <CardFooter className="flex justify-between items-center pt-0">
                <div className={"flex flex-row justify-end"}>
                    <Button
                        variant="outline"
                        size="sm"
                        className="p-1 ml-auto flex items-center gap-1"
                        title="Save Blog"
                        onClick={handleSave}
                        disabled={isSaving}
                    >
                        <Save size={18}/>
                        <span>{isSaving ? 'Saving...' : 'Save'}</span>
                    </Button>
                    {/*<details className="text-xs">*/}
                    {/*    <summary className="cursor-pointer text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">*/}
                    {/*        Show HTML*/}
                    {/*    </summary>*/}
                    {/*    <pre className="mt-2 p-2 bg-slate-100 dark:bg-slate-800 rounded-md overflow-x-auto max-h-32">*/}
                    {/*        {content}*/}
                    {/*    </pre>*/}
                    {/*</details>*/}

                </div>
                <div className="text-xs text-right text-slate-500">
                    {/*{editor.storage.characterCount?.characters() ?? 0} /*/}
                    {/*{editor.storage.characterCount?.options.limit ?? '∞'} characters*/}
                </div>
            </CardFooter>
        </Card>
    );
};

export default TiptapEditor;