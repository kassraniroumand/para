import React,{ useEffect, useState} from 'react';
import NextImage from 'next/image'
import parse from 'html-react-parser';

const EditorPreview = ({ htmlContent }) => {
    const [sanitizedContent, setSanitizedContent] = useState(htmlContent);
    const options = {
        replace: (domNode: any) => {
            if (domNode.name === 'img') {
                const { src, alt, width, height } = domNode.attribs;
                return (
                    <div className="relative w-full aspect-video rounded-3xl overflow-hidden">
                        <NextImage
                            src={src}
                            alt={alt || ''}
                            fill={true}
                            objectFit={"contain"}
                            sizes={"100"}
                            // width={parseInt(width) || 800}
                            // height={parseInt(height) || 600}
                            // style={{ width: '100%', height: 'auto' }}
                            priority={false}
                            quality={80}
                        />
                    </div>
                );
            }
        },
    };

    useEffect(() => {
        const sanitizeHtml = (html) => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            tempDiv.querySelectorAll('ul').forEach(ul =>
                ul.classList.add('list-disc', 'pl-5', 'my-2', 'space-y-1')
            );
            tempDiv.querySelectorAll('ol').forEach(ol =>
                ol.classList.add('list-decimal', 'pl-5', 'my-2', 'space-y-1')
            );
            tempDiv.querySelectorAll('blockquote').forEach(quote =>
                quote.classList.add('border-l-4', 'border-slate-300', 'pl-4', 'italic', 'my-3')
            );
            tempDiv.querySelectorAll('pre').forEach(pre =>
                pre.classList.add('bg-slate-100', 'dark:bg-slate-800', 'p-3', 'rounded-md', 'font-mono', 'my-3', 'overflow-auto')
            );
            tempDiv.querySelectorAll('code').forEach(code => {
                // @ts-ignore
                if (code?.parentElement.tagName !== 'PRE') {
                    code.classList.add('bg-slate-100', 'dark:bg-slate-800', 'px-1', 'py-0.5', 'rounded');
                }
            });
            tempDiv.querySelectorAll('h1').forEach(h1 =>
                h1.classList.add('text-2xl', 'font-bold', 'mt-6', 'mb-4')
            );
            tempDiv.querySelectorAll('h2').forEach(h2 =>
                h2.classList.add('text-xl', 'font-bold', 'mt-5', 'mb-3')
            );
            tempDiv.querySelectorAll('h3').forEach(h3 =>
                h3.classList.add('text-lg', 'font-bold', 'mt-4', 'mb-2')
            );
            tempDiv.querySelectorAll('p').forEach(p =>
                p.classList.add('my-2')
            );
            tempDiv.querySelectorAll('li').forEach(li =>
                li.classList.add('pl-1')
            );

            return tempDiv.innerHTML;
        };

        setSanitizedContent(sanitizeHtml(htmlContent));
    }, [htmlContent]);

    return (
        <div className="max-w-4xl mx-auto border rounded-md p-4 min-h-64 overflow-auto">
            {parse(sanitizedContent, options)}
        </div>
    );
};

export default EditorPreview;
