// extensions/ImageComponent.tsx
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import Image from 'next/image';

const ImageComponent = ({ node, updateAttributes }: any) => {
    const { src, alt, width, height, title } = node.attrs;

    return (
        <NodeViewWrapper className="image-component">
            <div className="relative w-full h-auto my-4">
                <Image
                    src={src}
                    alt={alt || ''}
                    width={width === '100%' ? 800 : parseInt(width)}
                    height={height === 'auto' ? 600 : parseInt(height)}
                    style={{ width: '100%', height: 'auto' }}
                    priority={false}
                    quality={80}
                    title={title || ''}
                />
            </div>
        </NodeViewWrapper>
    );
};

export default ImageComponent;